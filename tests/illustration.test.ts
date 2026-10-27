import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PageIllustration, type PageIllustrationKind } from "../src/components/illustration/PageIllustration";
import { publishedFields, publishedRoadmaps, publishedRoles } from "../src/lib/content";

type IllustratedPage = { kind: PageIllustrationKind; id?: string; title: string };

const pages: IllustratedPage[] = [
  { kind: "home", title: "Cybersecurity Career Wiki" },
  { kind: "start", title: "직무 찾는 방법" },
  { kind: "fields", title: "보안 분야" },
  { kind: "careers", title: "보안 직무" },
  { kind: "roadmaps", title: "커리어 경로" },
  { kind: "glossary", title: "보안 용어집" },
  ...publishedFields().map((page) => ({ kind: "field" as const, id: page.slug, title: page.titleKo })),
  ...publishedRoles().map((page) => ({ kind: "role" as const, id: page.slug, title: page.titleKo })),
  ...publishedRoadmaps().map((page) => ({ kind: "roadmap" as const, id: page.slug, title: page.titleKo })),
];

function attribute(markup: string, name: string): string | undefined {
  return markup.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

function sceneFocus(markup: string): string | undefined {
  const opening = /<g\b[^>]*\bdata-scene-focus(?:="[^"]*")?[^>]*>/g;
  const match = opening.exec(markup);
  if (!match) return undefined;
  const start = match.index + match[0].length;
  const groups = /<\/?g\b[^>]*>/g;
  groups.lastIndex = start;
  let depth = 1;
  for (const group of markup.matchAll(groups)) {
    depth += group[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      return markup.slice(start, group.index)
        .replace(/\s(?:fill|stroke|opacity|stroke-width|strokeWidth|class|style)="[^"]*"/g, "");
    }
  }
  return undefined;
}

test("all public pages have a specific, uniquely described illustration scene", () => {
  assert.ok(pages.length >= 96, "the published wiki pages should all be checked");
  const descriptions = new Set<string>();

  for (const page of pages) {
    const markup = renderToStaticMarkup(createElement(PageIllustration, page));
    const scene = attribute(markup, "data-scene-description");
    const label = attribute(markup, "aria-label");

    assert.ok(scene && scene.length >= 12, `${page.kind}:${page.id ?? page.title} needs a concrete scene description`);
    assert.match(scene, /[가-힣]/, `${page.kind}:${page.id ?? page.title} needs a Korean scene description`);
    assert.ok(label?.includes(scene), `${page.kind}:${page.id ?? page.title} needs the scene in its image label`);
    assert.ok(sceneFocus(markup), `${page.kind}:${page.id ?? page.title} needs visible focal artwork`);
    assert.ok(!descriptions.has(scene), `${page.kind}:${page.id ?? page.title} repeats an illustration scene`);
    descriptions.add(scene);
  }
});

test("roles that previously shared generic icons have different focal artwork", () => {
  const oldDuplicates = [
    ["soc-analyst", "cyber-threat-intelligence-analyst"],
    ["red-team-operator", "web-penetration-tester"],
    ["chief-privacy-officer", "privacy-manager"],
    ["grc-analyst", "security-auditor"],
  ];

  for (const [first, second] of oldDuplicates) {
    const firstPage = pages.find((page) => page.kind === "role" && page.id === first);
    const secondPage = pages.find((page) => page.kind === "role" && page.id === second);
    assert.ok(firstPage && secondPage);
    const firstFocus = sceneFocus(renderToStaticMarkup(createElement(PageIllustration, firstPage)));
    const secondFocus = sceneFocus(renderToStaticMarkup(createElement(PageIllustration, secondPage)));
    assert.ok(firstFocus && secondFocus, `${first} and ${second} need focal artwork`);
    assert.notEqual(firstFocus, secondFocus, `${first} and ${second} still share the same visual scene`);
  }
});
