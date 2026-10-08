import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { flattenedRscAliasPath } from "../src/lib/rsc-export";

test("nested static RSC segments receive the flat filename requested by Next links", () => {
  const root = path.join("site", "out");
  const nested = path.join(root, "careers", "soc-analyst", "__next.careers", "$d$slug", "__PAGE__.txt");
  assert.equal(
    flattenedRscAliasPath(root, nested),
    path.join(root, "careers", "soc-analyst", "__next.careers.$d$slug.__PAGE__.txt"),
  );
});

test("ordinary static files are never duplicated", () => {
  const root = path.join("site", "out");
  assert.equal(flattenedRscAliasPath(root, path.join(root, "careers", "soc-analyst", "index.html")), null);
  assert.equal(flattenedRscAliasPath(root, path.join(root, "careers", "soc-analyst", "__next._tree.txt")), null);
});
