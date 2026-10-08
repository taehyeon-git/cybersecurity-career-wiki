import fs from "node:fs";
import path from "node:path";
import { publishedComparisons, publishedRoadmaps, publishedRoles, publishedTopics } from "../src/lib/content";

const out = path.join(process.cwd(), "out");
const required = ["index.html", "404.html", "icon.svg", "search-index.json", "sitemap.xml", "robots.txt", ".nojekyll"];
for (const role of publishedRoles()) required.push(`careers/${role.slug}/index.html`, `careers/${role.slug}/__next.careers.$d$slug.__PAGE__.txt`);
for (const topic of publishedTopics()) required.push(`knowledge/${topic.slug}/index.html`, `knowledge/${topic.slug}/__next.knowledge.$d$slug.__PAGE__.txt`);
for (const roadmap of publishedRoadmaps()) required.push(`roadmaps/${roadmap.slug}/index.html`, `roadmaps/${roadmap.slug}/__next.roadmaps.$d$slug.__PAGE__.txt`);
for (const comparison of publishedComparisons()) required.push(`comparisons/${comparison.slug}/index.html`, `comparisons/${comparison.slug}/__next.comparisons.$d$slug.__PAGE__.txt`);
const missing = required.filter((file) => !fs.existsSync(path.join(out, file)));
if (missing.length) {
  console.error(`Missing static export files:\n${missing.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Static export verified: ${required.length} required files`);
}
