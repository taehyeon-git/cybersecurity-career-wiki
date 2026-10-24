import assert from "node:assert/strict";
import test from "node:test";
import { validateCitationSourceIds, validateCitationUrls, validateGlossaryAnchors, validateGlossaryReferences, validateReferences, type ReferenceDocument } from "../src/lib/validation";

const role: ReferenceDocument = {
  kind: "role", id: "soc-analyst", slug: "soc-analyst", publicationStatus: "published",
  sourceIds: ["nist-nice"], relatedRoleIds: ["incident-responder"],
};

test("published cross references must point to known documents and sources", () => {
  const docs: ReferenceDocument[] = [
    role,
    { kind: "role", id: "incident-responder", slug: "incident-responder", publicationStatus: "published", sourceIds: [], relatedRoleIds: [] },
  ];
  assert.deepEqual(validateReferences(docs, new Set(["nist-nice"])), []);
  assert.match(validateReferences(docs, new Set())[0], /nist-nice/);
});

test("glossary references reject missing sources and duplicate names", () => {
  const terms = [
    { term: "보안관제", english: "Security Monitoring", sourceIds: ["ncs-sqf"] },
    { term: "관제", english: "Security Monitoring", sourceIds: ["missing"] },
  ];
  const errors = validateGlossaryReferences(terms, new Set(["ncs-sqf"]));
  assert.ok(errors.some((error) => error.includes("duplicate glossary English term")));
  assert.ok(errors.some((error) => error.includes("missing source missing")));
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

test("external article citations must appear in the source registry", () => {
  const docs = [{ id: "iam-engineer", body: "[공고](https://example.org/jobs/42?b=2&a=1)와 [다른 공고](https://example.org/jobs/43)" }];
  const sources = [{ id: "job-42", url: "https://example.org/jobs/42/?a=1&b=2" }];
  assert.deepEqual(validateCitationUrls(docs, sources), ["iam-engineer: unregistered citation URL https://example.org/jobs/43"]);
});

test("citation audit reports a repeated missing URL once per article", () => {
  const docs = [{ id: "soc-analyst", body: "[첫 인용](https://example.org/job) [반복](https://example.org/job)" }];
  assert.deepEqual(validateCitationUrls(docs, []), ["soc-analyst: unregistered citation URL https://example.org/job"]);
});

test("article glossary links must point to a term that exists", () => {
  const docs = [{ id: "soc-analyst", body: "[CSIRT](/glossary/#computersecurityincidentresponseteam) [unknown](/glossary/#missingterm)" }];
  const terms = [{ english: "Computer Security Incident Response Team" }];
  assert.deepEqual(validateGlossaryAnchors(docs, terms), ["soc-analyst: unknown glossary anchor missingterm"]);
});

test("a linked official source also appears in that article's references", () => {
  const docs = [{ id: "soc-analyst", body: "[채용 사례](https://example.org/jobs/42)", sourceIds: [] }];
  const sources = [{ id: "example-job", url: "https://example.org/jobs/42" }];
  assert.deepEqual(validateCitationSourceIds(docs, sources), ["soc-analyst: cited source example-job missing from sourceIds"]);
  assert.deepEqual(validateCitationSourceIds([{ ...docs[0], sourceIds: ["example-job"] }], sources), []);
});
