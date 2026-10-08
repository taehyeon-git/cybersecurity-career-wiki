export type SearchDocument = {
  id: string;
  type: "role" | "topic" | "roadmap" | "comparison" | "glossary";
  title: string;
  english: string;
  aliases: string[];
  summary: string;
  body: string;
  href: string;
};

export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function searchDocuments(query: string, documents: SearchDocument[]): SearchDocument[] {
  const needle = normalizeSearchText(query);
  if (!needle) return [];
  return documents
    .map((document) => {
      const names = [document.title, document.english, ...document.aliases].map(normalizeSearchText);
      let score = names.includes(needle) ? 100 : names.some((name) => name.startsWith(needle)) ? 70 : names.some((name) => name.includes(needle)) ? 55 : 0;
      if (normalizeSearchText(document.summary).includes(needle)) score = Math.max(score, 30);
      if (normalizeSearchText(document.body).includes(needle)) score = Math.max(score, 10);
      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title, "ko"))
    .map(({ document }) => document);
}
