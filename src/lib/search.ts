export type SearchDocument = {
  id: string;
  type: "role" | "roadmap" | "glossary";
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

export function textOnlySearchBody(body: string): string {
  return body.replace(/[#*_`>\[\]()]|https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim();
}

export function searchTerms(query: string): string[] {
  return query.trim().split(/[\s/]+/u).map(normalizeSearchText).filter(Boolean);
}

function containsTerm(value: string, normalizedValue: string, term: string): boolean {
  if (!normalizedValue.includes(term)) return false;
  if (!/^[a-z0-9]{1,3}$/.test(term)) return true;
  // AI, OT and similar abbreviations should not match inside "chain" or "IoT".
  return new RegExp(`(^|[^a-z0-9])${term}(?=$|[^a-z0-9])`, "u")
    .test(value.normalize("NFKC").toLocaleLowerCase());
}

export function matchesAllTerms(query: string, fields: string[]): boolean {
  const terms = searchTerms(query);
  if (!terms.length) return true;
  const text = fields.join(" ");
  const normalizedText = normalizeSearchText(text);
  return terms.every((term) => containsTerm(text, normalizedText, term));
}

function originalRangeForNormalizedTerm(body: string, term: string): { start: number; end: number } | undefined {
  let normalized = "";
  const starts: number[] = [];
  const ends: number[] = [];
  let offset = 0;
  for (const character of body) {
    const part = normalizeSearchText(character);
    normalized += part;
    for (let index = 0; index < part.length; index++) {
      starts.push(offset);
      ends.push(offset + character.length);
    }
    offset += character.length;
  }
  let position = normalized.indexOf(term);
  while (position >= 0) {
    const start = starts[position];
    const end = ends[position + term.length - 1];
    if (!/^[a-z0-9]{1,3}$/.test(term) || (!/[a-z0-9]/i.test(body[start - 1] ?? "") && !/[a-z0-9]/i.test(body[end] ?? ""))) {
      return { start, end };
    }
    position = normalized.indexOf(term, position + 1);
  }
  return undefined;
}

export function searchMatchContext(query: string, visibleFields: string[], body: string): string | undefined {
  const visible = visibleFields.join(" ");
  const normalizedVisible = normalizeSearchText(visible);
  const normalizedBody = normalizeSearchText(body);
  for (const term of searchTerms(query)) {
    if (containsTerm(visible, normalizedVisible, term) || !containsTerm(body, normalizedBody, term)) continue;
    const range = originalRangeForNormalizedTerm(body, term);
    if (!range) continue;
    const start = Math.max(0, range.start - 45);
    const end = Math.min(body.length, range.end + 75);
    return `${start ? "…" : ""}${body.slice(start, end).trim()}${end < body.length ? "…" : ""}`;
  }
  return undefined;
}

export function searchDocuments(query: string, documents: SearchDocument[]): SearchDocument[] {
  const needle = normalizeSearchText(query);
  if (!needle) return [];
  const terms = searchTerms(query);
  return documents
    .map((document) => {
      const title = normalizeSearchText(document.title);
      const english = normalizeSearchText(document.english);
      const aliases = document.aliases.map(normalizeSearchText);
      const summary = normalizeSearchText(document.summary);
      const body = normalizeSearchText(document.body);
      function termScore(term: string): number {
        if (title === term) return 120;
        if (english === term) return 110;
        if (aliases.includes(term)) return 100;
        if (title.startsWith(term) && containsTerm(document.title, title, term)) return 85;
        if (english.startsWith(term) && containsTerm(document.english, english, term)) return 80;
        if (aliases.some((name, index) => name.startsWith(term) && containsTerm(document.aliases[index], name, term))) return 70;
        if (containsTerm(document.title, title, term)) return 65;
        if (containsTerm(document.english, english, term)) return 60;
        if (aliases.some((name, index) => containsTerm(document.aliases[index], name, term))) return 55;
        if (containsTerm(document.summary, summary, term)) return 30;
        if (containsTerm(document.body, body, term)) return 10;
        return 0;
      }
      const phraseScore = termScore(needle);
      const termScores = terms.map(termScore);
      const allTermsFound = terms.length > 1 && termScores.every(Boolean);
      const inSameName = allTermsFound && [
        [document.title, title],
        [document.english, english],
        ...document.aliases.map((alias, index) => [alias, aliases[index]]),
      ].some(([value, normalized]) => terms.every((term) => containsTerm(value, normalized, term)));
      // In a multiword role query, the final word is usually the role or work area.
      const combinedScore = allTermsFound
        ? (termScores.reduce((sum, value) => sum + value, 0) + termScores[termScores.length - 1]) / (termScores.length + 1) + (inSameName ? 15 : 0)
        : 0;
      const score = Math.max(phraseScore, combinedScore);
      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.document.title.localeCompare(b.document.title, "ko"))
    .map(({ document }) => document);
}
