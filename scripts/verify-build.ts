import fs from "node:fs";
import path from "node:path";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";
import { fieldDomains, roleCategories } from "../src/lib/site-data";
import { validateExportedLinks } from "./lib/export-links";

const out = path.join(process.cwd(), "out");
const required = ["index.html", "404.html", "icon.svg", "images/security-operations-hero.webp", "search-index.json", "sitemap.xml", "robots.txt", ".nojekyll", "fields/index.html"];
for (const field of publishedFields()) required.push(`fields/${field.slug}/index.html`, `fields/${field.slug}/__next.fields.$d$slug.__PAGE__.txt`);
for (const category of roleCategories) required.push(`fields/${category.id}/index.html`, `fields/${category.id}/__next.fields.$d$slug.__PAGE__.txt`);
for (const role of publishedRoles()) required.push(`careers/${role.slug}/index.html`, `careers/${role.slug}/__next.careers.$d$slug.__PAGE__.txt`);
for (const roadmap of publishedRoadmaps()) required.push(`roadmaps/${roadmap.slug}/index.html`, `roadmaps/${roadmap.slug}/__next.roadmaps.$d$slug.__PAGE__.txt`);
const removed = ["knowledge", "comparisons", "knowledge-map"];
for (const section of removed) {
  if (fs.existsSync(path.join(out, section))) {
    console.error(`Removed route still exported: ${section}`);
    process.exitCode = 1;
  }
}
const searchIndex = JSON.parse(fs.readFileSync(path.join(out, "search-index.json"), "utf8")) as Array<{ href: string; type: string }>;
const fieldEntries = searchIndex.filter((item) => item.type === "field");
const expectedFieldHrefs = new Set(fieldDomains.map((id) => `/fields/${id}/`));
if (fieldEntries.length !== expectedFieldHrefs.size || new Set(fieldEntries.map((item) => item.href)).size !== expectedFieldHrefs.size || fieldEntries.some((item) => !expectedFieldHrefs.has(item.href))) {
  console.error("Search index field guides do not match the fifteen asset-based domains");
  process.exitCode = 1;
}
for (const item of searchIndex) {
  if (removed.some((section) => item.href.startsWith(`/${section}/`))) {
    console.error(`Removed route still indexed: ${item.href}`);
    process.exitCode = 1;
  }
}
const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
for (const domainId of fieldDomains) {
  if (!sitemap.includes(`/fields/${domainId}/`)) {
    console.error(`Domain missing from sitemap: ${domainId}`);
    process.exitCode = 1;
  }
}
for (const category of roleCategories) {
  const legacyUrl = `/fields/${category.id}/`;
  if (fieldEntries.some((item) => item.href === legacyUrl) || sitemap.includes(legacyUrl)) {
    console.error(`Legacy field remains indexed: ${legacyUrl}`);
    process.exitCode = 1;
  }
  const legacyPath = path.join(out, "fields", category.id, "index.html");
  if (fs.existsSync(legacyPath)) {
    const html = fs.readFileSync(legacyPath, "utf8");
    if (!/<meta\b(?=[^>]*name=["']robots["'])(?=[^>]*content=["'][^"']*noindex)[^>]*>/i.test(html) || !html.includes("보안 분야 안내가 바뀌었습니다")) {
      console.error(`Legacy field must show migration guidance and noindex: ${legacyUrl}`);
      process.exitCode = 1;
    }
  }
}
const missing = required.filter((file) => !fs.existsSync(path.join(out, file)));
if (missing.length) {
  console.error(`Missing static export files:\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Static export verified: ${required.length} required files`);
}

const exportedFiles = new Set<string>();
const htmlPages = new Map<string, string>();
function collectExportedFiles(directory: string) {
  for (const entry of fs.readdirSync(path.join(out, directory), { withFileTypes: true })) {
    const relative = path.posix.join(directory.replace(/\\/g, "/"), entry.name);
    if (entry.isDirectory()) {
      collectExportedFiles(relative);
    } else {
      exportedFiles.add(relative);
      if (relative.endsWith(".html")) htmlPages.set(relative, fs.readFileSync(path.join(out, relative), "utf8"));
    }
  }
}
collectExportedFiles("");
const illustratedPages = [
  "index.html", "start/index.html", "fields/index.html", "careers/index.html", "roadmaps/index.html", "glossary/index.html",
  ...publishedFields().map((field) => `fields/${field.slug}/index.html`),
  ...publishedRoles().map((role) => `careers/${role.slug}/index.html`),
  ...publishedRoadmaps().map((roadmap) => `roadmaps/${roadmap.slug}/index.html`),
];
const illustrationIds = new Set<string>();
const illustrationScenes = new Set<string>();
let homePhotoVerified = false;
for (const file of illustratedPages) {
  const html = htmlPages.get(file);
  if (file === "index.html") {
    const photos = html ? [...html.matchAll(/<img\b[^>]*\bsrc="[^"]*\/images\/security-operations-hero\.webp"[^>]*>/g)] : [];
    const alt = photos[0]?.[0].match(/\balt="([^"]+)"/)?.[1];
    if (photos.length !== 1 || !alt || alt.length < 12 || !alt.includes("보안")) {
      console.error(`Expected one descriptive career-wiki hero photo in ${file}; found ${photos.length}`);
      process.exitCode = 1;
    } else homePhotoVerified = true;
    continue;
  }
  const images = html ? [...html.matchAll(/<svg\b[^>]*\bdata-wiki-illustration="([^"]+)"[^>]*>/g)] : [];
  const imageTag = images[0]?.[0] ?? "";
  const scene = imageTag.match(/\bdata-scene-description="([^"]+)"/)?.[1];
  const label = imageTag.match(/\baria-label="([^"]+)"/)?.[1];
  if (images.length !== 1 || !/\brole="img"/.test(imageTag) || !scene || scene.length < 12 || !label?.includes(scene) || !html?.includes("data-scene-focus")) {
    console.error(`Expected one descriptive wiki scene in ${file}; found ${images.length} illustration(s)`);
    process.exitCode = 1;
    continue;
  }
  const id = images[0][1];
  if (illustrationIds.has(id)) {
    console.error(`Illustration identity repeated across pages: ${id}`);
    process.exitCode = 1;
  }
  illustrationIds.add(id);
  if (illustrationScenes.has(scene)) {
    console.error(`Illustration scene description repeated across pages: ${file}`);
    process.exitCode = 1;
  }
  illustrationScenes.add(scene);
}
if (homePhotoVerified && illustrationIds.size === illustratedPages.length - 1 && illustrationScenes.size === illustratedPages.length - 1) console.log(`Descriptive visuals verified across ${illustratedPages.length} public pages`);
const brokenLinks = validateExportedLinks(htmlPages, exportedFiles, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
if (brokenLinks.length) {
  console.error(`Broken static links (${brokenLinks.length}):\n${brokenLinks.slice(0, 20).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Static links verified across ${htmlPages.size} HTML files`);
}
