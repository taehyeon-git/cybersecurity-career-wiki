import fs from "node:fs";
import path from "node:path";
import { pagePhotoManifest } from "../src/components/illustration/PagePhotoManifest";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";
import { fieldDomains, roleCategories } from "../src/lib/site-data";
import { assetUrl } from "../src/lib/urls";
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
const photoPages = [
  { file: "index.html", key: "home" },
  { file: "start/index.html", key: "index:start" },
  { file: "fields/index.html", key: "index:fields" },
  { file: "careers/index.html", key: "index:careers" },
  { file: "roadmaps/index.html", key: "index:roadmaps" },
  { file: "glossary/index.html", key: "index:glossary" },
  ...publishedFields().map((field) => ({ file: `fields/${field.slug}/index.html`, key: `field:${field.slug}` })),
  ...publishedRoles().map((role) => ({ file: `careers/${role.slug}/index.html`, key: `role:${role.slug}` })),
  ...publishedRoadmaps().map((roadmap) => ({ file: `roadmaps/${roadmap.slug}/index.html`, key: `roadmap:${roadmap.slug}` })),
  ...roleCategories.map((category) => ({ file: `fields/${category.id}/index.html`, key: `legacy:${category.id}` })),
  { file: "404.html", key: "index:not-found" },
];
const photoSources = new Set<string>();
let homePhotoVerified = false;
for (const { file, key } of photoPages) {
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
  const images = html ? [...html.matchAll(/<img\b[^>]*\bdata-wiki-photo="([^"]+)"[^>]*>/g)] : [];
  const imageTag = images[0]?.[0] ?? "";
  const photo = pagePhotoManifest[key];
  const description = imageTag.match(/\bdata-photo-description="([^"]+)"/)?.[1];
  const alt = imageTag.match(/\balt="([^"]+)"/)?.[1];
  const src = imageTag.match(/\bsrc="([^"]+)"/)?.[1];
  if (images.length !== 1 || images[0][1] !== key || !photo || !description || description !== photo.description || !alt?.includes(description) || src !== assetUrl(photo.src) || html?.includes("data-wiki-illustration")) {
    console.error(`Expected one descriptive local photograph in ${file}; found ${images.length} photo(s)`);
    process.exitCode = 1;
    continue;
  }
  if (!exportedFiles.has(photo.src.replace(/^\/+/, ""))) {
    console.error(`Missing exported photo for ${file}: ${photo.src}`);
    process.exitCode = 1;
  }
  if (photoSources.has(src)) {
    console.error(`Photo source repeated across pages: ${src}`);
    process.exitCode = 1;
  }
  photoSources.add(src);
}
if (homePhotoVerified && photoSources.size === photoPages.length - 1 && !process.exitCode) console.log(`Photographs verified across ${photoPages.length} public, legacy, and missing pages`);
const brokenLinks = validateExportedLinks(htmlPages, exportedFiles, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
if (brokenLinks.length) {
  console.error(`Broken static links (${brokenLinks.length}):\n${brokenLinks.slice(0, 20).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Static links verified across ${htmlPages.size} HTML files`);
}
