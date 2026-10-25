import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { publishedRoles, publishedRoadmaps, loadSources } from "../src/lib/content";
import * as content from "../src/lib/content";
import { roleCategories, mainNav } from "../src/lib/site-data";
import { validateCitationUrls } from "../src/lib/validation";
import terms from "../src/content/glossary/terms.json";

test("career directory separates investigation from incident response", () => {
  assert.deepEqual(roleCategories.map((item) => item.id), ["management", "development", "product", "operations", "assessment", "response", "investigation", "research", "customer"]);
  const roles = publishedRoles();
  assert.equal(roles.length, 60);
  assert.equal(new Set(roles.map((role) => role.slug)).size, roles.length);
  assert.deepEqual(
    roles.filter((role) => role.category === "product").map((role) => role.id).sort(),
    ["security-product-developer", "security-product-manager", "security-product-qa", "security-product-technical-writer"],
  );
  assert.equal(roles.find((role) => role.id === "product-security-engineer")?.category, "development");
  assert.equal(roles.find((role) => role.id === "digital-forensics-specialist")?.category, "investigation");
  assert.equal(roles.find((role) => role.id === "police-cybercrime-investigator")?.category, "investigation");
  assert.equal(roles.find((role) => role.id === "incident-responder")?.category, "response");
  assert.equal(roles.find((role) => role.id === "security-awareness-specialist")?.category, "research");
  assert.equal(roles.find((role) => role.id === "chief-privacy-officer")?.category, "management");
  assert.equal(roles.find((role) => role.id === "data-security-engineer")?.category, "operations");
  for (const category of roleCategories) {
    assert.ok(roles.some((role) => role.category === category.id), `missing ${category.id} roles`);
  }
});

test("field guides cover every published job in its primary work area", () => {
  const fieldCollection = content as typeof content & { publishedFields?: () => Array<{
    id: string; slug: string; category: string; roleIds: string[]; body: string; sourceIds: string[];
  }> };
  assert.ok(fieldCollection.publishedFields, "field guide collection is missing");
  const fields = fieldCollection.publishedFields();
  const roles = publishedRoles();
  assert.equal(fields.length, roleCategories.length);
  assert.deepEqual(new Set(fields.map((field) => field.category)), new Set(roleCategories.map((category) => category.id)));
  for (const category of roleCategories) {
    const field = fields.find((item) => item.category === category.id);
    assert.ok(field, `${category.id} has no field guide`);
    assert.equal(field.slug, category.id);
    assert.ok(field.body.length >= 1800, `${category.id} guide is too short to explain the field`);
    assert.ok(field.sourceIds.length > 0, `${category.id} guide has no sources`);
    assert.deepEqual(new Set(field.roleIds), new Set(roles.filter((role) => role.category === category.id).map((role) => role.id)), `${category.id} must link every job in that work area once`);
    const linkedRoleSlugs = [...field.body.matchAll(/\]\(\/careers\/([a-z0-9-]+)\/\)/g)].map((match) => match[1]);
    assert.equal(linkedRoleSlugs.length, new Set(linkedRoleSlugs).size, `${category.id} repeats a job link`);
    assert.deepEqual(new Set(linkedRoleSlugs), new Set(roles.filter((role) => role.category === category.id).map((role) => role.slug)), `${category.id} guide must link every published job in its area`);
  }
});

test("each role has a reciprocal career path link", () => {
  const roadmaps = publishedRoadmaps();
  assert.equal(roadmaps.length, 15);
  const byId = new Map(roadmaps.map((roadmap) => [roadmap.id, roadmap]));
  for (const role of publishedRoles()) {
    assert.ok(role.roadmapIds.length > 0, `${role.id} has no career path`);
    for (const id of role.roadmapIds) {
      const roadmap = byId.get(id);
      assert.ok(roadmap, `${role.id} references missing career path ${id}`);
      assert.ok(roadmap.roleIds.includes(role.id), `${role.id} and ${id} are not linked both ways`);
    }
  }
});

test("public navigation and content have no removed section paths", () => {
  const root = process.cwd();
  for (const section of ["knowledge", "comparisons", "knowledge-map"]) {
    assert.equal(fs.existsSync(path.join(root, "src", "app", section)), false, `${section} route still exists`);
    assert.ok(mainNav.every((item) => !item.href.startsWith(`/${section}/`)));
  }
  assert.equal(fs.existsSync(path.join(root, "src", "content", "topics")), false);
  assert.equal(fs.existsSync(path.join(root, "src", "content", "comparisons")), false);
  for (const article of [...publishedRoles(), ...publishedRoadmaps()]) {
    assert.doesNotMatch(article.body, /\/(?:knowledge|comparisons|knowledge-map)\//);
  }
});

test("glossary terms retain valid sources without deleted topic links", () => {
  const ids = new Set(loadSources().map((source) => source.id));
  for (const term of terms) {
    assert.ok(term.sourceIds.length > 0, `${term.term} has no sources`);
    for (const id of term.sourceIds) assert.ok(ids.has(id), `${term.term} has missing source ${id}`);
    assert.equal("topicId" in term, false, `${term.term} still links to a topic`);
  }
});

test("every public article's external citation has a registered source", () => {
  const articles = [...publishedRoles(), ...publishedRoadmaps()];
  assert.deepEqual(validateCitationUrls(articles, loadSources()), []);
});

test("generated search index includes field guides, career pages and glossary", () => {
  execFileSync(process.execPath, ["--import", "tsx", "scripts/build-search.ts"], { cwd: process.cwd() });
  const documents = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "search-index.json"), "utf8")) as Array<{ type: string; href: string }>;
  assert.ok(documents.length >= 50);
  assert.equal(documents.filter((item) => item.type === "field").length, roleCategories.length);
  for (const item of documents) {
    assert.ok(["field", "role", "roadmap", "glossary"].includes(item.type), `unexpected search type: ${item.type}`);
    assert.doesNotMatch(item.href, /^\/(?:knowledge|comparisons|knowledge-map)\//);
  }
});
