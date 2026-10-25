import fs from "node:fs";
import path from "node:path";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";
import { validateExportedLinks } from "./lib/export-links";

const out = path.join(process.cwd(), "out");
const required = ["index.html", "404.html", "icon.svg", "search-index.json", "sitemap.xml", "robots.txt", ".nojekyll", "fields/index.html"];
for (const field of publishedFields()) required.push(`fields/${field.slug}/index.html`, `fields/${field.slug}/__next.fields.$d$slug.__PAGE__.txt`);
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
for (const item of searchIndex) {
  if (removed.some((section) => item.href.startsWith(`/${section}/`))) {
    console.error(`Removed route still indexed: ${item.href}`);
    process.exitCode = 1;
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
