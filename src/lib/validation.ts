export type ReferenceDocument = {
  kind: "role" | "topic" | "roadmap" | "comparison";
  id: string;
  slug: string;
  publicationStatus: string;
  sourceIds: string[];
  relatedRoleIds: string[];
  topicIds: string[];
};

export function validateReferences(documents: ReferenceDocument[], sources: Set<string>): string[] {
  const errors: string[] = [];
  const unique = new Set<string>();
  const uniqueIds = new Set<string>();
  const roleIds = new Set(documents.filter((doc) => doc.kind === "role").map((doc) => doc.id));
  const topicIds = new Set(documents.filter((doc) => doc.kind === "topic").map((doc) => doc.id));
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
    for (const topicId of doc.topicIds) if (!topicIds.has(topicId)) errors.push(`${key}: missing topic ${topicId}`);
  }
  return errors;
}
