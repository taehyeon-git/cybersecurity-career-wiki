import fs from "node:fs";
import path from "node:path";
import { publishedRoadmaps, publishedRoles } from "../src/lib/content";

const out = path.join(process.cwd(), "out");
const required = ["index.html", "404.html", "icon.svg", "search-index.json", "sitemap.xml", "robots.txt", ".nojekyll"];
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
