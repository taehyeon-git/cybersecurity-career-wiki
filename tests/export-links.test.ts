import assert from "node:assert/strict";
import test from "node:test";
import { validateExportedLinks } from "../scripts/lib/export-links";

test("exported pages resolve site links, queries, and cross-page anchors", () => {
  const pages = new Map([
    ["index.html", '<main id="main-content"><a href="/wiki/careers/?category=response">Roles</a></main>'],
    ["careers/index.html", '<main id="main-content"><a href="/wiki/glossary/#riskacceptance">Risk</a></main>'],
    ["glossary/index.html", '<section id="riskacceptance">Risk</section>'],
  ]);
  assert.deepEqual(validateExportedLinks(pages, new Set(pages.keys()), "/wiki"), []);
});

test("exported pages report missing routes and missing fragments", () => {
  const pages = new Map([
    ["index.html", '<a href="/wiki/careers/missing/">Missing role</a><a href="/wiki/glossary/#absent">Missing term</a>'],
    ["glossary/index.html", '<section id="present">Present</section>'],
  ]);
  assert.deepEqual(validateExportedLinks(pages, new Set(pages.keys()), "/wiki"), [
    "index.html: missing local target /wiki/careers/missing/",
    "index.html: missing fragment #absent in /wiki/glossary/",
  ]);
});
