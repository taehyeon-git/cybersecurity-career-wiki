import assert from "node:assert/strict";
import test from "node:test";
import { publishedRoles, tableOfContents } from "../src/lib/content";

test("every role awaiting review names a section that explains its evidence", () => {
  const pending = publishedRoles().filter((role) => role.reviewStatus === "needs-review");
  assert.ok(pending.length > 0);
  for (const role of pending) {
    const headings = tableOfContents(role.body);
    const evidence = headings.find((item) => item.title.includes("근거"))
      ?? headings.find((item) => item.title.includes("원문"));
    assert.ok(evidence, `${role.id} needs an evidence section for its review link`);
  }
});
