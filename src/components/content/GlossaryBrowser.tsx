"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { WikiFolder } from "@/components/wiki/Directory";
import { matchesAllTerms, normalizeSearchText } from "@/lib/search";

export type GlossaryTerm = { term: string; english: string; definition: string; sourceIds: string[] };
type GlossarySource = { id: string; title: string; url: string };

const groupLabels = ["ㄱ–ㅁ", "ㅂ–ㅇ", "ㅈ–ㅎ", "영문 약어"] as const;

function koreanTermGroup(term: string): typeof groupLabels[number] {
  const code = term.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return "영문 약어";
  const initial = Math.floor((code - 0xac00) / 588);
  return initial <= 6 ? "ㄱ–ㅁ" : initial <= 11 ? "ㅂ–ㅇ" : "ㅈ–ㅎ";
}

export function GlossaryBrowser({ terms, sources }: { terms: GlossaryTerm[]; sources: GlossarySource[] }) {
  const [query, setQuery] = useState("");
  const [hashToReveal, setHashToReveal] = useState<string | null>(null);
  useEffect(() => {
    function queueReveal(hash: string) {
      if (!hash) return;
      let id: string;
      try { id = decodeURIComponent(hash); } catch { return; }
      if (!terms.some((term) => normalizeSearchText(term.english) === id)) return;
      setQuery("");
      setHashToReveal(id);
    }
    function onHashChange() { queueReveal(window.location.hash.slice(1)); }
    function onLinkClick(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.pathname === window.location.pathname && url.hash) queueReveal(url.hash.slice(1));
    }
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onLinkClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [terms]);
  useEffect(() => {
    if (!hashToReveal) return;
    const target = document.getElementById(hashToReveal);
    if (!target) return;
    target.closest("details")?.setAttribute("open", "");
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView();
      setHashToReveal(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [hashToReveal, query]);
  const filtered = useMemo(() => terms.filter((item) => matchesAllTerms(query, [item.term, item.english, item.definition])), [terms, query]);
  const groups = groupLabels.map((label) => ({
    label,
    entries: filtered.filter((item) => koreanTermGroup(item.term) === label)
      .sort((a, b) => a.term.localeCompare(b.term, label === "영문 약어" ? "en" : "ko")),
  })).filter((group) => group.entries.length > 0);
  const sourceById = new Map(sources.map((source) => [source.id, source]));

  return <section className="wiki-index" aria-label="용어 목록">
    <div className="wiki-toolbar"><label className="wiki-search"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="용어 또는 영문 약어 검색" aria-label="용어 검색" /></label><span className="wiki-toolbar-count" role="status" aria-live="polite" aria-atomic="true">{filtered.length}개 용어</span></div>
    <div className="wiki-folder-list">{groups.map((group, index) => <WikiFolder key={`${group.label}-${query}`} name={group.label === "영문 약어" ? group.label : `${group.label} 용어`} description={group.label === "영문 약어" ? "영문 약어·표기" : "한국어 표제어 기준"} count={`${group.entries.length}개`} defaultOpen={Boolean(query) || index === 0}>
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
