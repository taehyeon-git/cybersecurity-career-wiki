import fs from "node:fs";
import path from "node:path";
import { publishedComparisons, publishedRoadmaps, publishedRoles, publishedTopics } from "../src/lib/content";
import type { SearchDocument } from "../src/lib/search";
import terms from "../src/content/glossary/terms.json";

function textOnly(body: string): string {
  return body.replace(/[#*_`>\[\]()]|https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim().slice(0, 2400);
}

const documents: SearchDocument[] = [
  ...publishedRoles().map((item) => ({ id: item.id, type: "role" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: textOnly(item.body), href: `/careers/${item.slug}/` })),
  ...publishedTopics().map((item) => ({ id: item.id, type: "topic" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: textOnly(item.body), href: `/knowledge/${item.slug}/` })),
  ...publishedRoadmaps().map((item) => ({ id: item.id, type: "roadmap" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: textOnly(item.body), href: `/roadmaps/${item.slug}/` })),
  ...publishedComparisons().map((item) => ({ id: item.id, type: "comparison" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: textOnly(item.body), href: `/comparisons/${item.slug}/` })),
  ...terms.map((item, index) => ({ id: `term-${index}`, type: "glossary" as const, title: item.term, english: item.english, aliases: [], summary: item.definition, body: item.definition, href: `/glossary/#${item.english.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "")}` })),
];
const destination = path.join(process.cwd(), "public", "search-index.json");
fs.writeFileSync(destination, JSON.stringify(documents));
console.log(`Search index: ${documents.length} documents`);
