import assert from "node:assert/strict";
import test from "node:test";
import { publishedRoles, publishedTopics } from "../src/lib/content";
import { searchDocuments, type SearchDocument } from "../src/lib/search";

const documents: SearchDocument[] = [
  ...publishedRoles().map((item) => ({ id: item.id, type: "role" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: item.body, href: `/careers/${item.slug}/` })),
  ...publishedTopics().map((item) => ({ id: item.id, type: "topic" as const, title: item.titleKo, english: item.titleEn, aliases: item.aliases, summary: item.summary, body: item.body, href: `/knowledge/${item.slug}/` })),
];

test("common Korean and English career terms find a real published page", () => {
  const cases = [
    ["앱섹", "application-security-engineer"],
    ["AppSec", "application-security-engineer"],
    ["데브섹옵스", "devsecops-engineer"],
    ["모의해킹", "web-penetration-tester"],
    ["보안관제", "soc-analyst"],
    ["침해사고 대응", "incident-responder"],
    ["취약점 연구", "vulnerability-researcher"],
  ];
  for (const [query, expected] of cases) {
    assert.ok(searchDocuments(query, documents).some((item) => item.id === expected), `${query} should find ${expected}`);
  }
});
