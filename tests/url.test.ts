import assert from "node:assert/strict";
import test from "node:test";
import { assetUrl, canonicalUrl } from "../src/lib/urls";

test("static asset URLs include a project Pages base path exactly once", () => {
  assert.equal(assetUrl("/search-index.json", "/cybersecurity-wiki"), "/cybersecurity-wiki/search-index.json");
  assert.equal(assetUrl("/search-index.json", ""), "/search-index.json");
});

test("canonical URLs include the configured project path", () => {
  assert.equal(
    canonicalUrl("/careers/soc-analyst/", "https://example.github.io/cybersecurity-wiki"),
    "https://example.github.io/cybersecurity-wiki/careers/soc-analyst/",
  );
});
