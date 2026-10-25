import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { publishedFields, publishedRoles, publishedRoadmaps, loadSources } from "../src/lib/content";
import { fieldDomains, roleCategories, mainNav } from "../src/lib/site-data";
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

test("fifteen asset-based guides have explicit many-to-many job links", () => {
  const fields = publishedFields();
  const roles = publishedRoles();
  const roleById = new Map(roles.map((role) => [role.id, role]));
  assert.equal(fields.length, 15);
  assert.deepEqual(new Set(fields.map((field) => field.id)), new Set(fieldDomains));
  assert.equal(new Set(fields.map((field) => field.slug)).size, fields.length);
  assert.ok(fields.some((field) => field.roleIds.some((id) => roleById.get(id)?.category === "assessment")), "field guides should connect roles across job groups");
  for (const domainId of fieldDomains) {
    const field = fields.find((item) => item.id === domainId);
    assert.ok(field, `${domainId} has no field guide`);
    assert.equal(field.slug, domainId);
    assert.ok(field.body.length >= 1800, `${domainId} guide is too short to explain the field`);
    assert.ok(field.sourceIds.length > 0, `${domainId} guide has no sources`);
    assert.ok(field.roleIds.length > 0, `${domainId} guide has no related job`);
    assert.equal(field.roleIds.length, new Set(field.roleIds).size, `${domainId} repeats roleIds`);
    for (const id of field.roleIds) assert.ok(roleById.has(id), `${domainId} has an unpublished job ${id}`);
    const linkedRoleSlugs = [...field.body.matchAll(/\]\(\/careers\/([a-z0-9-]+)\/\)/g)].map((match) => match[1]);
    assert.equal(linkedRoleSlugs.length, new Set(linkedRoleSlugs).size, `${domainId} repeats a job link`);
    assert.deepEqual(new Set(linkedRoleSlugs), new Set(field.roleIds.map((id) => roleById.get(id)!.slug)), `${domainId} body links must match explicit roleIds`);
  }
  assert.ok(fields.find((field) => field.id === "system")?.roleIds.includes("infrastructure-security-engineer"));
  assert.ok(fields.find((field) => field.id === "web")?.roleIds.includes("web-penetration-tester"));
  assert.ok(fields.find((field) => field.id === "ot")?.roleIds.includes("ot-security-engineer"));
  assert.ok(fields.find((field) => field.id === "web")?.roleIds.includes("application-security-engineer"));
  assert.ok(fields.find((field) => field.id === "mobile")?.roleIds.includes("application-security-engineer"));
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
  for (const article of [...publishedFields(), ...publishedRoles(), ...publishedRoadmaps()]) {
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
  const articles = [...publishedFields(), ...publishedRoles(), ...publishedRoadmaps()];
  assert.deepEqual(validateCitationUrls(articles, loadSources()), []);
});

test("generated search index includes field guides, career pages and glossary", () => {
  execFileSync(process.execPath, ["--import", "tsx", "scripts/build-search.ts"], { cwd: process.cwd() });
  const documents = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "search-index.json"), "utf8")) as Array<{ type: string; href: string }>;
  assert.ok(documents.length >= 50);
  const fieldHrefs = documents.filter((item) => item.type === "field").map((item) => item.href);
  assert.equal(fieldHrefs.length, 15);
  assert.deepEqual(new Set(fieldHrefs), new Set(fieldDomains.map((id) => `/fields/${id}/`)));
  for (const category of roleCategories) assert.ok(!fieldHrefs.includes(`/fields/${category.id}/`), `${category.id} legacy field is still searchable`);
  for (const item of documents) {
    assert.ok(["field", "role", "roadmap", "glossary"].includes(item.type), `unexpected search type: ${item.type}`);
    assert.doesNotMatch(item.href, /^\/(?:knowledge|comparisons|knowledge-map)\//);
  }
});
