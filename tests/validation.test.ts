import assert from "node:assert/strict";
import test from "node:test";
import { validateReferences, type ReferenceDocument } from "../src/lib/validation";

const role: ReferenceDocument = {
  kind: "role", id: "soc-analyst", slug: "soc-analyst", publicationStatus: "published",
  sourceIds: ["nist-nice"], relatedRoleIds: ["incident-responder"],
  topicIds: ["logging-siem"],
};

test("published cross references must point to known documents and sources", () => {
  const docs: ReferenceDocument[] = [
    role,
    { kind: "role", id: "incident-responder", slug: "incident-responder", publicationStatus: "published", sourceIds: [], relatedRoleIds: [], topicIds: [] },
    { kind: "topic", id: "logging-siem", slug: "logging-siem", publicationStatus: "published", sourceIds: [], relatedRoleIds: [], topicIds: [] },
  ];
  assert.deepEqual(validateReferences(docs, new Set(["nist-nice"])), []);
  assert.match(validateReferences(docs, new Set())[0], /nist-nice/);
});

test("duplicate slugs and missing linked documents are rejected", () => {
  const duplicate = { ...role, id: "another-role" };
  const errors = validateReferences([role, duplicate], new Set(["nist-nice"]));
  assert.ok(errors.some((error) => error.includes("duplicate")));
  assert.ok(errors.some((error) => error.includes("incident-responder")));
});

test("duplicate IDs within a collection are rejected even with distinct slugs", () => {
  const duplicate = { ...role, slug: "soc-operations" };
  const errors = validateReferences([role, duplicate], new Set(["nist-nice"]));
  assert.ok(errors.some((error) => error.includes("duplicate id: role/soc-analyst")));
});
