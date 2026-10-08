"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { useState } from "react";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { roleCategories, routeFor } from "@/lib/site-data";

type MapRole = { id: string; slug: string; titleKo: string; titleEn: string; summary: string; category: string; domainIds: string[]; relatedRoleIds: string[]; roadmapIds: string[] };
type MapItem = { id: string; slug: string; titleKo: string };

export function KnowledgeMapExplorer({ roles, topics, roadmaps }: { roles: MapRole[]; topics: MapItem[]; roadmaps: MapItem[] }) {
  const [activeId, setActiveId] = useState(roles[0]?.id ?? "");
  const active = roles.find((role) => role.id === activeId);
  if (!active) return null;
  const linkedTopics = active.domainIds.map((id) => topics.find((topic) => topic.id === id)).filter((topic) => !!topic);
  const linkedRoles = active.relatedRoleIds.map((id) => roles.find((role) => role.id === id)).filter((role) => !!role);
  const linkedRoadmaps = active.roadmapIds.map((id) => roadmaps.find((roadmap) => roadmap.id === id)).filter((roadmap) => !!roadmap);
  return <div className="wiki-map-layout">
    <aside className="wiki-map-tree" aria-label="직무 선택">
      <div className="wiki-map-tree-heading">직무 폴더 <span>{roles.length}</span></div>
      <div className="wiki-folder-list">{roleCategories.map((category, index) => {
        const members = roles.filter((role) => role.category === category.id);
        if (!members.length) return null;
        return <WikiFolder key={category.id} name={category.ko} count={members.length} defaultOpen={index === 0}>
          {members.map((role) => <button type="button" className={`wiki-map-role-row${active.id === role.id ? " active" : ""}`} aria-pressed={active.id === role.id} key={role.id} onClick={() => setActiveId(role.id)}><FileText size={15} aria-hidden="true" /><span>{role.titleKo}</span></button>)}
        </WikiFolder>;
      })}</div>
    </aside>
    <article className="wiki-map-article" aria-live="polite">
      <div className="wiki-map-article-header"><div className="wiki-page-kicker">선택한 직무 / {roleCategories.find((item) => item.id === active.category)?.ko}</div><h2>{active.titleKo}</h2><small>{active.titleEn}</small><p>{active.summary}</p><Link href={routeFor.role(active.slug)}>직무 상세 문서 읽기 <ArrowRight size={16} /></Link></div>
      <div className="wiki-folder-list">
        <WikiFolder name="이 직무에서 쓰는 기술" count={`${linkedTopics.length}개`} defaultOpen>{linkedTopics.map((topic) => <WikiFileRow key={topic.id} href={routeFor.topic(topic.slug)} title={topic.titleKo} />)}</WikiFolder>
        <WikiFolder name="관련 직무" count={`${linkedRoles.length}개`}>{linkedRoles.map((role) => <button type="button" key={role.id} className="wiki-map-role-row" onClick={() => setActiveId(role.id)}><FileText size={15} aria-hidden="true" /><span>{role.titleKo}</span><ArrowRight size={15} aria-hidden="true" /></button>)}</WikiFolder>
        <WikiFolder name="연결된 학습 로드맵" count={`${linkedRoadmaps.length}개`}>{linkedRoadmaps.map((roadmap) => <WikiFileRow key={roadmap.id} href={routeFor.roadmap(roadmap.slug)} title={roadmap.titleKo} />)}</WikiFolder>
      </div>
    </article>
  </div>;
}
