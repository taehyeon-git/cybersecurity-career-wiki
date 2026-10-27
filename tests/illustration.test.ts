import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PageIllustration, type PageIllustrationKind } from "../src/components/illustration/PageIllustration";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";
import { roleCategories } from "../src/lib/site-data";

type PhotoPage = { kind: PageIllustrationKind; id?: string; title: string };

const pages: PhotoPage[] = [
  { kind: "home", title: "Cybersecurity Career Wiki" },
  { kind: "start", title: "직무 찾는 방법" },
  { kind: "fields", title: "보안 분야" },
  { kind: "careers", title: "보안 직무" },
  { kind: "roadmaps", title: "커리어 경로" },
  { kind: "glossary", title: "보안 용어집" },
  ...publishedFields().map((page) => ({ kind: "field" as const, id: page.slug, title: page.titleKo })),
  ...publishedRoles().map((page) => ({ kind: "role" as const, id: page.slug, title: page.titleKo })),
  ...publishedRoadmaps().map((page) => ({ kind: "roadmap" as const, id: page.slug, title: page.titleKo })),
  { kind: "start", id: "not-found", title: "문서를 찾지 못했습니다" },
  ...roleCategories.map((category) => ({ kind: "fields" as const, id: `legacy-${category.id}`, title: "보안 분야 안내가 바뀌었습니다" })),
];

function attribute(markup: string, name: string): string | undefined {
  return markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function photoMarkup(page: PhotoPage) {
  return renderToStaticMarkup(createElement(PageIllustration, page));
}

test("a career article renders its own local photograph", () => {
  const markup = photoMarkup({ kind: "role", id: "soc-analyst", title: "보안관제 분석가" });
  assert.match(markup, /<img\b[^>]*data-wiki-photo="role:soc-analyst"/);
  assert.match(markup, /src="[^"]*\/images\/pages\/role\/soc-analyst\.webp"/);
  assert.match(markup, /alt="[^"]*보안관제 분석가[^"]*"/);
  assert.doesNotMatch(markup, /<svg\b/);
});

test("index and missing pages use their explicit photo identities", () => {
  assert.match(photoMarkup({ kind: "start", title: "직무 찾는 방법" }), /data-wiki-photo="index:start"/);
  assert.match(photoMarkup({ kind: "start", id: "not-found", title: "문서를 찾지 못했습니다" }), /data-wiki-photo="index:not-found"/);
});

test("every public, legacy, and missing page renders a distinct described photograph", () => {
  assert.equal(pages.length, 106);
  const sources = new Set<string>();
  const descriptions = new Set<string>();

  for (const page of pages) {
    const markup = photoMarkup(page);
    const source = attribute(markup, "src");
    const description = attribute(markup, "data-photo-description");
    const alt = attribute(markup, "alt");
    assert.match(markup, /<img\b/, `${page.kind}:${page.id ?? page.title} must render an image`);
    assert.doesNotMatch(markup, /<svg\b/, `${page.kind}:${page.id ?? page.title} still renders drawn artwork`);
    assert.ok(source, `${page.kind}:${page.id ?? page.title} needs a local photo source`);
    assert.ok(source.endsWith(".webp"), `${page.kind}:${page.id ?? page.title} needs a local WebP`);
    assert.ok(source.startsWith("/images/"), `${page.kind}:${page.id ?? page.title} must be served locally`);
    assert.ok(description && description.length >= 20 && /[가-힣]/.test(description), `${page.kind}:${page.id ?? page.title} needs a specific Korean photo description`);
    assert.ok(alt?.includes(page.title.replaceAll("&", "&amp;")) && alt.includes(description), `${page.kind}:${page.id ?? page.title} needs a descriptive alt`);
    assert.equal(attribute(markup, "width"), page.kind === "home" ? "1993" : "960");
    assert.equal(attribute(markup, "height"), page.kind === "home" ? "789" : "600");
    assert.ok(!sources.has(source), `${page.kind}:${page.id ?? page.title} shares a photo path`);
    assert.ok(!descriptions.has(description), `${page.kind}:${page.id ?? page.title} repeats a photo description`);
    sources.add(source);
    descriptions.add(description);
  }
});

test("every page photo is a distinct, local WebP asset", () => {
  const hashes = new Set<string>();
  for (const page of pages) {
    const source = attribute(photoMarkup(page), "src");
    assert.ok(source);
    const file = path.join(process.cwd(), "public", source.replace(/^\//, ""));
    assert.ok(existsSync(file), `${page.kind}:${page.id ?? page.title} is missing ${file}`);
    const bytes = readFileSync(file);
    assert.ok(bytes.length >= 20_000, `${file} is too small for a useful photograph`);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF", `${file} is not a WebP RIFF image`);
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP", `${file} is not a WebP image`);
    const digest = createHash("sha256").update(bytes).digest("hex");
    assert.ok(!hashes.has(digest), `${file} repeats another page's photograph`);
    hashes.add(digest);
  }
});
