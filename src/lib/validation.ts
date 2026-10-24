import { normalizeSearchText } from "./search";

export type ReferenceDocument = {
  kind: "role" | "roadmap";
  id: string;
  slug: string;
  publicationStatus: string;
  sourceIds: string[];
  relatedRoleIds: string[];
};

export type GlossaryReference = {
  term: string;
  english: string;
  sourceIds: string[];
};

export function validateReferences(documents: ReferenceDocument[], sources: Set<string>): string[] {
  const errors: string[] = [];
  const unique = new Set<string>();
  const uniqueIds = new Set<string>();
  const roleIds = new Set(documents.filter((doc) => doc.kind === "role").map((doc) => doc.id));
  for (const doc of documents) {
    const key = `${doc.kind}/${doc.slug}`;
    if (unique.has(key)) errors.push(`duplicate slug: ${key}`);
    unique.add(key);
    const idKey = `${doc.kind}/${doc.id}`;
    if (uniqueIds.has(idKey)) errors.push(`duplicate id: ${idKey}`);
    uniqueIds.add(idKey);
    if (doc.publicationStatus !== "published") continue;
    for (const sourceId of doc.sourceIds) if (!sources.has(sourceId)) errors.push(`${key}: missing source ${sourceId}`);
    for (const roleId of doc.relatedRoleIds) if (!roleIds.has(roleId)) errors.push(`${key}: missing role ${roleId}`);
  }
  return errors;
}

export function validateGlossaryReferences(terms: GlossaryReference[], sources: Set<string>): string[] {
  const errors: string[] = [];
  const englishNames = new Set<string>();
  const koreanNames = new Set<string>();
  for (const term of terms) {
    const english = term.english.toLocaleLowerCase();
    if (englishNames.has(english)) errors.push(`duplicate glossary English term: ${term.english}`);
    if (koreanNames.has(term.term)) errors.push(`duplicate glossary Korean term: ${term.term}`);
    englishNames.add(english);
    koreanNames.add(term.term);
    if (!/^[a-z]/i.test(term.english)) errors.push(`glossary English term must start A-Z: ${term.english}`);
    if (!term.sourceIds.length) errors.push(`glossary term has no source: ${term.term}`);
    for (const sourceId of term.sourceIds) if (!sources.has(sourceId)) errors.push(`glossary ${term.term}: missing source ${sourceId}`);
  }
  return errors;
}

function canonicalCitationUrl(value: string): string {
  const url = new URL(value);
  url.hash = "";
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  url.searchParams.sort();
  return url.toString();
}

export function validateCitationUrls(
  documents: Array<{ id: string; body: string }>,
  sources: Array<{ id: string; url: string }>,
): string[] {
  const registered = new Set(sources.map((source) => canonicalCitationUrl(source.url)));
  const errors: string[] = [];
  for (const document of documents) {
    const missing = new Set<string>();
    for (const match of document.body.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
      const url = match[1];
      if (!registered.has(canonicalCitationUrl(url))) missing.add(url);
    }
    for (const url of missing) errors.push(`${document.id}: unregistered citation URL ${url}`);
  }
  return errors;
}

export function validateCitationSourceIds(
  documents: Array<{ id: string; body: string; sourceIds: string[] }>,
  sources: Array<{ id: string; url: string }>,
): string[] {
  const idsByUrl = new Map<string, string[]>();
  for (const source of sources) {
    const url = canonicalCitationUrl(source.url);
    idsByUrl.set(url, [...(idsByUrl.get(url) ?? []), source.id]);
  }
  const errors: string[] = [];
  for (const document of documents) {
    const missing = new Set<string>();
    for (const match of document.body.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
      const ids = idsByUrl.get(canonicalCitationUrl(match[1])) ?? [];
      if (ids.length && !ids.some((id) => document.sourceIds.includes(id))) missing.add(ids[0]);
    }
    for (const id of missing) errors.push(`${document.id}: cited source ${id} missing from sourceIds`);
  }
  return errors;
}

export function validateGlossaryAnchors(
  documents: Array<{ id: string; body: string }>,
  terms: Array<{ english: string }>,
): string[] {
  const anchors = new Set(terms.map((term) => normalizeSearchText(term.english)));
  const errors: string[] = [];
  for (const document of documents) {
    for (const match of document.body.matchAll(/\]\(\/glossary\/#([^)\s]+)\)/g)) {
      if (!anchors.has(match[1])) errors.push(`${document.id}: unknown glossary anchor ${match[1]}`);
    }
  }
  return errors;
}

export function validateInternalDocumentLinks(
  documents: Array<{ id: string; body: string }>,
  roleSlugs: Set<string>,
  roadmapSlugs: Set<string>,
): string[] {
  const errors: string[] = [];
  for (const document of documents) {
    const missing = new Set<string>();
    for (const match of document.body.matchAll(/\]\((\/(?:careers|roadmaps)\/[^\s)]+)\)/g)) {
      const href = match[1];
      const path = href.split(/[?#]/, 1)[0];
      if (/^\/(?:careers|roadmaps)\/$/.test(path)) continue;
      const route = /^\/(careers|roadmaps)\/([^/]+)\/$/.exec(path);
      const valid = route && (route[1] === "careers" ? roleSlugs.has(route[2]) : roadmapSlugs.has(route[2]));
      if (!valid) missing.add(href);
    }
    for (const href of missing) errors.push(`${document.id}: unknown internal link ${href}`);
  }
  return errors;
}
