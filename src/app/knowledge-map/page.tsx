import type { Metadata } from "next";
import { KnowledgeMapExplorer } from "@/components/careers/KnowledgeMapExplorer";
import { publishedRoadmaps, publishedRoles, publishedTopics } from "@/lib/content";

export const metadata: Metadata = { title: "직무 지식 지도", description: "직무와 기술, 관련 직무와 학습 로드맵의 관계를 탐색합니다.", alternates: { canonical: "/knowledge-map/" } };

export default function KnowledgeMapPage() {
  const roles = publishedRoles();
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 연결 지도</div>
      <h1 className="wiki-page-title">직무 지식 지도</h1>
      <p className="wiki-page-intro">직무를 하나 선택하면 관련 기술, 가까운 직무, 이어지는 학습 경로를 폴더에서 확인할 수 있습니다.</p>
      <div className="wiki-page-meta"><span>직무 {roles.length}개</span><span>직무를 선택해 관계 탐색</span></div>
    </header>
    <KnowledgeMapExplorer roles={roles.map((role) => ({ id: role.id, slug: role.slug, titleKo: role.titleKo, titleEn: role.titleEn, summary: role.summary, category: role.category, domainIds: role.domainIds, relatedRoleIds: role.relatedRoleIds, roadmapIds: role.roadmapIds }))} topics={publishedTopics().map((topic) => ({ id: topic.id, slug: topic.slug, titleKo: topic.titleKo }))} roadmaps={publishedRoadmaps().map((item) => ({ id: item.id, slug: item.slug, titleKo: item.titleKo }))} />
  </main>;
}
