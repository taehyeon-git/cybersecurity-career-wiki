"use client";

import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { assetUrl } from "@/lib/urls";
import { normalizeSearchText, searchDocuments, type SearchDocument } from "@/lib/search";

const typeNames: Record<SearchDocument["type"], string> = {
  role: "직무", topic: "기술", roadmap: "로드맵", comparison: "비교", glossary: "용어",
};

function highlighted(value: string, query: string) {
  const clean = query.trim();
  const index = value.toLocaleLowerCase().indexOf(clean.toLocaleLowerCase());
  if (!clean || index < 0) return value;
  return <>{value.slice(0, index)}<mark>{value.slice(index, index + clean.length)}</mark>{value.slice(index + clean.length)}</>;
}

function matchingAlias(item: SearchDocument, query: string): string | undefined {
  const needle = normalizeSearchText(query);
  return item.aliases.find((alias) => normalizeSearchText(alias).includes(needle));
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchDocuments(query, documents).slice(0, 10), [query, documents]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setOpen((value) => !value);
      } else if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open || documents.length || error) return;
    fetch(assetUrl("/search-index.json"))
      .then((response) => { if (!response.ok) throw new Error("검색 색인 로딩 실패"); return response.json(); })
      .then((data: SearchDocument[]) => setDocuments(data))
      .catch(() => setError(true));
  }, [open, documents.length, error]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 0); }, [open]);

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") { event.preventDefault(); setSelected((value) => Math.min(value + 1, results.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
    if (event.key === "Enter" && results[selected]) { window.location.assign(assetUrl(results[selected].href)); }
  }

  return <>
    <button type="button" className="search-trigger" onClick={() => setOpen(true)} aria-label="전체 문서 검색">
      <Search size={18} /><span>직무, 기술, 용어 검색</span><kbd>Ctrl K</kbd>
    </button>
    {open && <div className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="search-modal" role="dialog" aria-modal="true" aria-label="전체 검색">
        <div className="search-modal-top"><Search size={21} /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={onInputKey} placeholder="직무, 기술 또는 궁금한 개념을 검색하세요" aria-label="검색어" /><button type="button" className="icon-button" aria-label="검색 닫기" onClick={() => setOpen(false)}><X size={18} /></button></div>
        <div className="search-results" role="listbox" aria-label="검색 결과">
          {error ? <p className="search-message">검색 색인을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p> : !query ? <div className="search-hint"><span>추천 검색어</span><button onClick={() => setQuery("앱섹")}>앱섹</button><button onClick={() => setQuery("보안관제")}>보안관제</button><button onClick={() => setQuery("DevSecOps")}>DevSecOps</button></div> : !documents.length ? <p className="search-message">검색 자료를 불러오는 중입니다…</p> : !results.length ? <p className="search-message">검색 결과가 없습니다. 다른 명칭이나 영어 약어를 시도해 보세요.</p> : results.map((item, index) => <Link role="option" aria-selected={index === selected} className={`search-result ${index === selected ? "selected" : ""}`} key={`${item.type}-${item.id}`} href={item.href} onClick={() => setOpen(false)}>
            <span className="search-result-main"><strong>{highlighted(item.title, query)}</strong><small>{highlighted(item.english, query)}{matchingAlias(item, query) && <> · {highlighted(matchingAlias(item, query)!, query)}</>}</small><em>{highlighted(item.summary, query)}</em></span><span className="search-result-side"><span>{typeNames[item.type]}</span><ArrowUpRight size={15} /></span>
          </Link>)}
        </div>
        <div className="search-footer"><span>↑ ↓ 이동</span><span>Enter 열기</span><span>Esc 닫기</span></div>
      </div>
    </div>}
  </>;
}
