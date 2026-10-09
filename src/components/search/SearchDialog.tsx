"use client";

import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { assetUrl } from "@/lib/urls";
import { normalizeSearchText, searchDocuments, type SearchDocument } from "@/lib/search";

const typeNames: Record<SearchDocument["type"], string> = {
  role: "직무", roadmap: "커리어 경로", glossary: "용어",
};

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const results = useMemo(() => searchDocuments(query, documents).slice(0, 10), [query, documents]);
  const activeIndex = Math.min(selected, Math.max(0, results.length - 1));

  function openDialog() {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
    <button type="button" className="search-trigger" onClick={openDialog} aria-label="보안 직무 검색" aria-haspopup="dialog" aria-expanded={open}>
      <Search size={18} /><span>직무, 경로, 용어 검색</span><kbd>Ctrl K</kbd>
    </button>
    {open && createPortal(<div ref={overlayRef} className="search-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog(); }} onKeyDown={onModalKey}>
      <div ref={modalRef} className="search-modal" role="dialog" aria-modal="true" aria-label="보안 직무 검색">
        <div className="search-modal-top"><Search size={21} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={onInputKey} placeholder="직무, 커리어 경로 또는 용어를 검색하세요" aria-label="검색어" /><button type="button" className="icon-button" aria-label="검색 닫기" onClick={() => closeDialog()}><X size={18} /></button></div>
        <span className="sr-only" role="status" aria-live="polite">{query && results.length ? `${results.length}개 결과. ${activeIndex + 1}번째 ${results[activeIndex].title}` : query && documents.length ? "검색 결과 없음" : ""}</span>
        <div className="search-results" role="region" aria-label="검색 결과">
          {error ? <p className="search-message">검색 색인을 불러오지 못했습니다. 페이지를 새로고침해 주세요.</p> : !query ? <div className="search-hint"><span>추천 검색어</span><button type="button" onClick={() => setQuery("보안관제")}>보안관제</button><button type="button" onClick={() => setQuery("개인정보")}>개인정보</button><button type="button" onClick={() => setQuery("보안 제품")}>보안 제품</button></div> : !documents.length ? <p className="search-message">검색 자료를 불러오는 중입니다…</p> : !results.length ? <p className="search-message">검색 결과가 없습니다. 다른 직무명이나 영어 약어를 시도해 보세요.</p> : results.map((item, index) => <Link className={`search-result ${index === activeIndex ? "selected" : ""}`} key={`${item.type}-${item.id}`} href={item.href} onClick={() => closeDialog(false)}>
            <span className="search-result-main"><strong>{highlighted(item.title, query)}</strong><small>{highlighted(item.english, query)}{matchingAlias(item, query) && <> · {highlighted(matchingAlias(item, query)!, query)}</>}</small><em>{highlighted(item.summary, query)}</em></span><span className="search-result-side"><span>{typeNames[item.type]}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
          </Link>)}
        </div>
        <div className="search-footer"><span>Tab 결과 탐색</span><span>입력창에서 ↑ ↓ 이동 · Enter 열기</span><span>Esc 닫기</span></div>
      </div>
    </div>, document.body)}
  </>;
}
