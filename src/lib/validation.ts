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
