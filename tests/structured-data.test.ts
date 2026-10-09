import assert from "node:assert/strict";
import test from "node:test";
import { breadcrumbJsonLd } from "../src/lib/structured-data";

test("breadcrumb data uses canonical Pages URLs and escapes markup", () => {
  const json = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "보안 직무", path: "/careers/" },
    { name: "<SOC>", path: "/careers/soc-analyst/" },
  ], "https://example.github.io/wiki");
  assert.doesNotMatch(json, /<SOC>/);
  const parsed = JSON.parse(json) as { itemListElement: Array<{ item: string; name: string; position: number }> };
  assert.deepEqual(parsed.itemListElement.map((item) => item.item), [
    "https://example.github.io/wiki/",
    "https://example.github.io/wiki/careers/",
    "https://example.github.io/wiki/careers/soc-analyst/",
  ]);
  assert.deepEqual(parsed.itemListElement.map((item) => item.position), [1, 2, 3]);
});
