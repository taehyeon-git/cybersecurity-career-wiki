"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { matchesAllTerms, searchDocuments, searchMatchContext } from "@/lib/search";
import { roleCategories, routeFor } from "@/lib/site-data";

type RoleSummary = { id: string; slug: string; titleKo: string; titleEn: string; summary: string; category: string; aliases: string[]; responsibilities: string[]; typicalTasks: string[]; keyDeliverables: string[]; body?: string };

export function RoleExplorer({ roles }: { roles: RoleSummary[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [folderOverrides, setFolderOverrides] = useState<Record<string, boolean>>({});
  const syncFromUrl = useCallback((queryString: string) => {
    const params = new URLSearchParams(queryString);
    const categoryParam = params.get("category");
    const overrides: Record<string, boolean> = {};
    for (const id of params.getAll("open")) if (roleCategories.some((item) => item.id === id)) overrides[id] = true;
    for (const id of params.getAll("closed")) if (roleCategories.some((item) => item.id === id)) overrides[id] = false;
    setCategory(categoryParam && roleCategories.some((item) => item.id === categoryParam) ? categoryParam : "all");
    setQuery(params.get("q") ?? "");
    setFolderOverrides(overrides);
  }, []);
  useEffect(() => {
    const update = () => syncFromUrl(window.location.search);
    const navigation = (window as Window & { navigation?: EventTarget }).navigation;
    const history = window.history;
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    let patchedPushState: typeof history.pushState | undefined;
    let patchedReplaceState: typeof history.replaceState | undefined;

    if (navigation) {
      navigation.addEventListener("currententrychange", update);
    } else {
      patchedPushState = (data, unused, url) => {
        originalPushState.call(history, data, unused, url);
        update();
      };
      patchedReplaceState = (data, unused, url) => {
        originalReplaceState.call(history, data, unused, url);
        update();
      };
      history.pushState = patchedPushState;
      history.replaceState = patchedReplaceState;
    }
    window.addEventListener("popstate", update);
    update();
    return () => {
      navigation?.removeEventListener("currententrychange", update);
      window.removeEventListener("popstate", update);
      if (patchedPushState && history.pushState === patchedPushState) history.pushState = originalPushState;
      if (patchedReplaceState && history.replaceState === patchedReplaceState) history.replaceState = originalReplaceState;
    };
  }, [syncFromUrl]);

  const groups = useMemo(() => {
    const ranked = query.trim() ? searchDocuments(query, roles.map((role) => ({
      id: role.id,
      type: "role" as const,
      title: role.titleKo,
      english: role.titleEn,
      aliases: role.aliases,
      summary: role.summary,
      body: [role.body, ...role.responsibilities, ...role.typicalTasks, ...role.keyDeliverables].join(" "),
      href: routeFor.role(role.slug),
    }))) : [];
    const rankById = new Map(ranked.map((role, index) => [role.id, index]));
    const rankOf = (id: string) => rankById.get(id) ?? Number.MAX_SAFE_INTEGER;
    const groups = roleCategories
      .filter((item) => category === "all" || item.id === category)
      .map((item) => ({
        ...item,
        entries: roles
          .filter((role) => role.category === item.id && matchesAllTerms(query, [role.titleKo, role.titleEn, role.summary, ...role.aliases, ...role.responsibilities, ...role.typicalTasks, ...role.keyDeliverables, role.body ?? ""]))
          .sort((a, b) => rankOf(a.id) - rankOf(b.id)),
      }))
      .filter((item) => item.entries.length > 0);
    return query.trim() ? groups.sort((a, b) => rankOf(a.entries[0].id) - rankOf(b.entries[0].id)) : groups;
  }, [roles, category, query]);
  const count = groups.reduce((sum, item) => sum + item.entries.length, 0);
  const expandMatches = category !== "all" || (Boolean(query.trim()) && count <= 20);

  function changeQuery(value: string) {
    setQuery(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function changeCategory(value: string) {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function changeFolderState(id: string, open: boolean) {
    if ((folderOverrides[id] ?? expandMatches) === open) return;
    const next = { ...folderOverrides, [id]: open };
    setFolderOverrides(next);
    const url = new URL(window.location.href);
    url.searchParams.delete("open");
    url.searchParams.delete("closed");
    for (const item of roleCategories) {
      if (next[item.id] === true) url.searchParams.append("open", item.id);
      else if (next[item.id] === false) url.searchParams.append("closed", item.id);
    }
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return <section className="wiki-index" aria-label="직무 문서 목록">
    <div className="wiki-toolbar">
      <label className="wiki-search"><Search size={17} aria-hidden="true" /><input value={query} onChange={(event) => changeQuery(event.target.value)} placeholder="직무명이나 키워드로 찾기" aria-label="직무 검색" /></label>
      <label className="wiki-filter">직무군 <select value={category} onChange={(event) => changeCategory(event.target.value)}><option value="all">전체 직무군</option>{roleCategories.map((item) => <option key={item.id} value={item.id}>{item.ko}</option>)}</select></label>
      <span className="wiki-toolbar-count" role="status" aria-live="polite" aria-atomic="true">{count}개 문서</span>
    </div>
    <div className="wiki-folder-list" onClickCapture={(event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const details = target.closest("summary")?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || details.parentElement !== event.currentTarget) return;
      const group = groups[Array.from(event.currentTarget.children).indexOf(details)];
      if (group) requestAnimationFrame(() => changeFolderState(group.id, details.open));
    }}>{groups.map((group) => <WikiFolder key={`${group.id}-${category}-${query}`} name={group.ko} description={group.description} count={`${group.entries.length}개 문서`} defaultOpen={folderOverrides[group.id] ?? expandMatches}>
      {group.entries.map((role) => <WikiFileRow key={role.id} href={routeFor.role(role.slug)} title={role.titleKo} subtitle={role.titleEn} description={role.summary} context={query ? searchMatchContext(query, [role.titleKo, role.titleEn, role.summary, ...role.aliases, ...role.responsibilities, ...role.typicalTasks, ...role.keyDeliverables], role.body ?? "") : undefined} meta={role.keyDeliverables[0]} />)}
    </WikiFolder>)}</div>
    {count === 0 && <div className="wiki-empty">조건에 맞는 문서가 없습니다. 다른 검색어 또는 직무군을 선택해 보세요.</div>}
  </section>;
}
