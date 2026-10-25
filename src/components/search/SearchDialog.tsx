"use client";

import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { assetUrl } from "@/lib/urls";
import { normalizeSearchText, searchDocuments, searchMatchContext, searchTerms, type SearchDocument } from "@/lib/search";

const typeNames: Record<SearchDocument["type"], string> = {
  role: "직무", roadmap: "커리어 경로", glossary: "용어",
};

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function highlighted(value: string, query: string) {
  const spans: Array<{ start: number; end: number }> = [];
  let normalized = "";
  let offset = 0;
  for (const character of value) {
    const clean = normalizeSearchText(character);
    for (let index = 0; index < clean.length; index++) spans.push({ start: offset, end: offset + character.length });
    normalized += clean;
    offset += character.length;
  }
  const lower = value.toLocaleLowerCase();
  const ranges: Array<{ start: number; end: number }> = [];
  for (const term of searchTerms(query)) {
    let from = 0;
    while (from < normalized.length) {
      const index = normalized.indexOf(term, from);
      if (index < 0) break;
      const start = spans[index].start;
      const end = spans[index + term.length - 1].end;
      const shortLatin = /^[a-z0-9]{1,3}$/.test(term);
      if (!shortLatin || ((start === 0 || !/[a-z0-9]/.test(lower[start - 1])) && (end === lower.length || !/[a-z0-9]/.test(lower[end])))) {
        ranges.push({ start, end });
      }
      from = index + term.length;
    }
  }
  if (!ranges.length) return value;
  ranges.sort((a, b) => a.start - b.start || b.end - a.end);
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start < cursor) continue;
    if (range.start > cursor) parts.push(value.slice(cursor, range.start));
    parts.push(<mark key={`${range.start}-${range.end}`}>{value.slice(range.start, range.end)}</mark>);
    cursor = range.end;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));
  return <>{parts}</>;
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
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const allResults = useMemo(() => searchDocuments(query, documents), [query, documents]);
  const results = allResults.slice(0, 10);
  const activeIndex = Math.min(selected, Math.max(0, results.length - 1));

  function openDialog() {
    const sidebarClose = document.querySelector<HTMLElement>('#wiki-sidebar[aria-modal="true"] .wiki-sidebar-close');
    openerRef.current = sidebarClose ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    restoreFocusRef.current = true;
    setOpen(true);
  }

  function closeDialog(restoreFocus = true) {
    restoreFocusRef.current = restoreFocus;
    setOpen(false);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) closeDialog(); else openDialog();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || documents.length || error) return;
    const controller = new AbortController();
    fetch(assetUrl("/search-index.json"), { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("검색 색인 로딩 실패"); return response.json(); })
      .then((data: SearchDocument[]) => setDocuments(data))
      .catch((reason: unknown) => { if (!(reason instanceof DOMException && reason.name === "AbortError")) setError(true); });
    return () => controller.abort();
  }, [open, documents.length, error]);

  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const overlay = overlayRef.current;
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child !== overlay);
    const previousInert = siblings.map((element) => ({ element, inert: element.inert }));
    siblings.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      previousInert.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = previousOverflow;
      if (restoreFocusRef.current) requestAnimationFrame(() => openerRef.current?.focus());
      restoreFocusRef.current = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !query || !results.length) return;
    const container = resultsRef.current;
    const active = container?.querySelector<HTMLElement>(".search-result.selected");
    if (!container || !active) return;
    const viewport = container.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    const padding = 8;
    if (item.top < viewport.top + padding) container.scrollTop -= viewport.top + padding - item.top;
    else if (item.bottom > viewport.bottom - padding) container.scrollTop += item.bottom - viewport.bottom + padding;
  }, [open, query, activeIndex, results.length]);

  function onInputKey(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setSelected((value) => Math.min(value + 1, results.length - 1)); }
    if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setSelected((value) => Math.max(value - 1, 0)); }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      restoreFocusRef.current = false;
      window.location.assign(assetUrl(results[activeIndex].href));
    }
  }

  function onModalKey(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeDialog();
      return;
    }
    if (event.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    const current = document.activeElement;
    if (event.shiftKey && (current === first || !modalRef.current.contains(current))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (current === last || !modalRef.current.contains(current))) { event.preventDefault(); first.focus(); }
  }

  return <>
    <button type="button" className="search-trigger" onClick={openDialog} title="직무, 경로, 용어 검색" aria-haspopup="dialog" aria-expanded={open}>
      <Search size={18} aria-hidden="true" /><span>직무, 경로, 용어 검색</span><kbd aria-hidden="true">Ctrl K</kbd>
    </button>
    {open && createPortal(<div ref={overlayRef} className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog(); }} onKeyDown={onModalKey}>
      <div ref={modalRef} className="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title">
        <h2 className="search-modal-heading" id="search-dialog-title">직무·경로·용어 검색</h2>
        <div className="search-modal-top"><Search size={21} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={onInputKey} placeholder="검색어를 입력하세요" aria-label="검색어" /><button type="button" className="icon-button" aria-label="검색 닫기" onClick={() => closeDialog()}><X size={18} /></button></div>
        <span className="sr-only" role="status" aria-live="polite">{query && results.length ? `전체 ${allResults.length}개 결과 중 ${results.length}개 표시. ${activeIndex + 1}번째 ${results[activeIndex].title}` : query && documents.length ? "검색 결과 없음" : ""}</span>
        <div ref={resultsRef} className="search-results" role="region" aria-label="검색 결과">
          {error ? <p className="search-message">검색 색인을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p> : !query ? <div className="search-hint"><span>추천 검색어</span><button type="button" onClick={() => setQuery("보안관제")}>보안관제</button><button type="button" onClick={() => setQuery("개인정보")}>개인정보</button><button type="button" onClick={() => setQuery("보안 제품")}>보안 제품</button></div> : !documents.length ? <p className="search-message">검색 자료를 불러오는 중입니다…</p> : !results.length ? <p className="search-message">검색 결과가 없습니다. 다른 직무명이나 영어 약어를 시도해 보세요.</p> : <>
            <p className="search-count">{allResults.length}개 결과{allResults.length > results.length ? ` 중 관련도 높은 ${results.length}개를 보여줍니다. 검색어를 더 구체적으로 입력해 보세요.` : ""}</p>
            {results.map((item, index) => {
              const alias = matchingAlias(item, query);
              const context = searchMatchContext(query, [item.title, item.english, ...item.aliases, item.summary], item.body);
              return <Link className={`search-result ${index === activeIndex ? "selected" : ""}`} key={`${item.type}-${item.id}`} href={item.href} onClick={() => closeDialog(false)}>
                <span className="search-result-main"><strong>{highlighted(item.title, query)}</strong><small>{highlighted(item.english, query)}{alias && <> · {highlighted(alias, query)}</>}</small><em>{highlighted(item.summary, query)}</em>{context && <span className="search-result-context">본문: {highlighted(context, query)}</span>}</span><span className="search-result-side"><span>{typeNames[item.type]}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
              </Link>;
            })}
          </>}
        </div>
        <div className="search-footer"><span>입력창에서 ↑ ↓ 선택 · Enter 열기</span><span>Tab: 닫기 버튼 다음 {results.length ? "결과" : query ? "입력창" : "추천 검색어"}</span><span>Esc 닫기</span></div>
      </div>
    </div>, document.body)}
  </>;
}
