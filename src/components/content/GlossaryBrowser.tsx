"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { WikiFolder } from "@/components/wiki/Directory";
import { normalizeSearchText } from "@/lib/search";

export type GlossaryTerm = { term: string; english: string; definition: string; sourceIds: string[] };
type GlossarySource = { id: string; title: string; url: string };

const ranges = [
  { label: "A–F", first: "A", last: "F" },
  { label: "G–L", first: "G", last: "L" },
  { label: "M–R", first: "M", last: "R" },
  { label: "S–Z", first: "S", last: "Z" },
];

export function GlossaryBrowser({ terms, sources }: { terms: GlossaryTerm[]; sources: GlossarySource[] }) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const target = document.getElementById(hash);
    target?.closest("details")?.setAttribute("open", "");
    target?.scrollIntoView();
  }, []);
  const filtered = useMemo(() => terms.filter((item) => normalizeSearchText(`${item.term} ${item.english} ${item.definition}`).includes(normalizeSearchText(query)))
    .sort((a, b) => a.english.localeCompare(b.english, "en")), [terms, query]);
  const groups = ranges.map((range) => ({ ...range, entries: filtered.filter((item) => {
    const letter = item.english.charAt(0).toUpperCase();
    return letter >= range.first && letter <= range.last;
  }) })).filter((group) => group.entries.length > 0);
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  return <section className="wiki-index" aria-label="용어 목록">
    <div className="wiki-toolbar"><label className="wiki-search"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="용어 또는 영문 약어 검색" aria-label="용어 검색" /></label><span className="wiki-toolbar-count">{filtered.length}개 용어</span></div>
    <div className="wiki-folder-list">{groups.map((group, index) => <WikiFolder key={`${group.label}-${query ? "search" : "browse"}`} name={`${group.label} 용어`} description="영문 명칭 기준" count={`${group.entries.length}개`} defaultOpen={Boolean(query) || index === 0}>
      {group.entries.map((item) => <article className="wiki-glossary-row" key={`${item.term}-${item.english}`} id={normalizeSearchText(item.english)}>
        <div className="wiki-glossary-heading"><h2>{item.term}</h2><span>{item.english}</span></div>
        <p>{item.definition}</p>
        <div className="wiki-glossary-sources">출처: {item.sourceIds.map((id, index) => {
          const source = sourceById.get(id);
          return source ? <span key={id}>{index > 0 ? " · " : ""}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></span> : null;
        })}</div>
      </article>)}
    </WikiFolder>)}</div>
    {filtered.length === 0 && <div className="wiki-empty">검색 결과가 없습니다. 다른 용어를 입력해 보세요.</div>}
  </section>;
}
