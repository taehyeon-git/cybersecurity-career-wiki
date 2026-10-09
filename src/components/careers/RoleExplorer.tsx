"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { normalizeSearchText } from "@/lib/search";
import { roleCategories, routeFor } from "@/lib/site-data";

type RoleSummary = { id: string; slug: string; titleKo: string; titleEn: string; summary: string; category: string; aliases: string[]; keyDeliverables: string[] };

export function RoleExplorer({ roles }: { roles: RoleSummary[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (value && roleCategories.some((item) => item.id === value)) {
      const frame = requestAnimationFrame(() => setCategory(value));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const groups = useMemo(() => roleCategories
    .filter((item) => category === "all" || item.id === category)
    .map((item) => ({
      ...item,
      entries: roles.filter((role) => role.category === item.id && (!query.trim() || normalizeSearchText([role.titleKo, role.titleEn, role.summary, ...role.aliases].join(" ")).includes(normalizeSearchText(query)))),
    }))
    .filter((item) => item.entries.length > 0), [roles, category, query]);
  const count = groups.reduce((sum, item) => sum + item.entries.length, 0);

  return <section className="wiki-index" aria-label="직무 문서 목록">
    <div className="wiki-toolbar">
      <label className="wiki-search"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="직무명이나 키워드로 찾기" aria-label="직무 검색" /></label>
      <label className="wiki-filter">분야 <select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">전체 분야</option>{roleCategories.map((item) => <option key={item.id} value={item.id}>{item.ko}</option>)}</select></label>
      <span className="wiki-toolbar-count">{count}개 문서</span>
    </div>
    <div className="wiki-folder-list">{groups.map((group, index) => <WikiFolder key={`${group.id}-${query ? "search" : "browse"}`} name={group.ko} description={group.description} count={`${group.entries.length}개 문서`} defaultOpen={Boolean(query) || category !== "all" || index === 0}>
      {group.entries.map((role) => <WikiFileRow key={role.id} href={routeFor.role(role.slug)} title={role.titleKo} subtitle={role.titleEn} description={role.summary} meta={role.keyDeliverables[0]} />)}
    </WikiFolder>)}</div>
    {count === 0 && <div className="wiki-empty">조건에 맞는 문서가 없습니다. 다른 검색어 또는 분야를 선택해 보세요.</div>}
  </section>;
}
