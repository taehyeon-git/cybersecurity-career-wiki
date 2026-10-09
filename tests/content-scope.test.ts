import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { publishedRoles, publishedRoadmaps, loadSources } from "../src/lib/content";
import { roleCategories, mainNav } from "../src/lib/site-data";
import terms from "../src/content/glossary/terms.json";

test("career directory represents six work areas and 46 distinct roles", () => {
  assert.deepEqual(roleCategories.map((item) => item.id), ["management", "development", "operations", "assessment", "response", "customer"]);
  const roles = publishedRoles();
  assert.equal(roles.length, 46);
  assert.equal(new Set(roles.map((role) => role.slug)).size, 46);
  for (const category of roleCategories) {
    assert.ok(roles.some((role) => role.category === category.id), `missing ${category.id} roles`);
  }
});

test("each role has a reciprocal career path link", () => {
  const roadmaps = publishedRoadmaps();
  assert.equal(roadmaps.length, 11);
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

test("generated search index contains only career pages and glossary", () => {
  execFileSync(process.execPath, ["--import", "tsx", "scripts/build-search.ts"], { cwd: process.cwd() });
  const documents = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "search-index.json"), "utf8")) as Array<{ type: string; href: string }>;
  assert.ok(documents.length >= 46);
  for (const item of documents) {
    assert.ok(["role", "roadmap", "glossary"].includes(item.type), `unexpected search type: ${item.type}`);
    assert.doesNotMatch(item.href, /^\/(?:knowledge|comparisons|knowledge-map)\//);
  }
});
