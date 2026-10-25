import fs from "node:fs";
import path from "node:path";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";
import { fieldDomains, roleCategories } from "../src/lib/site-data";
import { validateExportedLinks } from "./lib/export-links";

const out = path.join(process.cwd(), "out");
const required = ["index.html", "404.html", "icon.svg", "search-index.json", "sitemap.xml", "robots.txt", ".nojekyll", "fields/index.html"];
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
const brokenLinks = validateExportedLinks(htmlPages, exportedFiles, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
if (brokenLinks.length) {
  console.error(`Broken static links (${brokenLinks.length}):\n${brokenLinks.slice(0, 20).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Static links verified across ${htmlPages.size} HTML files`);
}
