import assert from "node:assert/strict";
import test from "node:test";
import { publishedRoadmaps } from "../src/lib/content";
import * as siteData from "../src/lib/site-data";

type RoadmapGroup = { id: string; roadmapIds: readonly string[] };

test("every published career path appears in one preparation folder", () => {
  const groups = (siteData as { roadmapGroups?: readonly RoadmapGroup[] }).roadmapGroups;
  assert.ok(groups, "career path folders are defined in site data");
  const groupedIds = groups.flatMap((group) => group.roadmapIds);
  const publishedIds = publishedRoadmaps().map((roadmap) => roadmap.id);

  assert.equal(new Set(groupedIds).size, groupedIds.length, "one path cannot appear in multiple folders");
  assert.deepEqual([...groupedIds].sort(), [...publishedIds].sort());
  assert.equal(groups.length, 6, "one entry folder and five focused folders");
  assert.deepEqual(groups[0]?.roadmapIds, ["cybersecurity-fundamentals"]);
  assert.ok(groups.slice(1).every((group) => group.roadmapIds.length >= 2), "focused folders have at least two paths");
});
