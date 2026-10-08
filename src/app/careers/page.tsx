import type { Metadata } from "next";
import Link from "next/link";
import { RoleExplorer } from "@/components/careers/RoleExplorer";
import { publishedRoles, publishedTopics } from "@/lib/content";

export const metadata: Metadata = { title: "보안 직무 탐색", description: "실제 업무와 산출물, 필요한 기술을 기준으로 사이버보안 직무를 탐색합니다.", alternates: { canonical: "/careers/" } };

export default function CareersPage() {
  const roles = publishedRoles();
  const topicNames = Object.fromEntries(publishedTopics().map((topic) => [topic.id, topic.titleKo]));
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 직무 탐색</div>
      <h1 className="wiki-page-title">보안 직무 탐색</h1>
      <p className="wiki-page-intro">어떤 문제를 맡고, 하루 동안 무엇을 하며, 어떤 결과물을 남기는지 기준으로 직무를 찾습니다.</p>
      <div className="wiki-page-meta"><span>문서 {roles.length}개</span><span>분야별 폴더를 눌러 펼치세요</span><Link href="/start/">이 위키의 분류 방식</Link></div>
    </header>
    <RoleExplorer roles={roles.map(({ id, slug, titleKo, titleEn, summary, category, aliases, domainIds }) => ({ id, slug, titleKo, titleEn, summary, category, aliases, domainIds }))} topicNames={topicNames} />
    <p className="wiki-index-note">이 위키의 직무 폴더는 탐색을 위한 편집 분류이며 공식 NICE 직무 범주와 다릅니다.</p>
  </main>;
}
