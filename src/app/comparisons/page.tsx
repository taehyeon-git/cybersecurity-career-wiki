import type { Metadata } from "next";
import { RoleComparePicker } from "@/components/careers/RoleComparePicker";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedComparisons, publishedRoles, publishedTopics } from "@/lib/content";
import { routeFor } from "@/lib/site-data";

export const metadata: Metadata = { title: "직무 비교", description: "혼동하기 쉬운 사이버보안 직무의 목적, 업무, 산출물과 필요한 역량을 비교합니다.", alternates: { canonical: "/comparisons/" } };

function sectionText(body: string, heading: string): string {
  const section = body.split(`## ${heading}`)[1]?.split(/\n## /)[0] ?? "";
  return section.replace(/\[[^\]]+\]\([^)]*\)/g, "").replace(/[*#`]/g, "").replace(/\s+/g, " ").trim().slice(0, 240);
}

export default function ComparisonsPage() {
  const comparisons = publishedComparisons();
  const roles = publishedRoles();
  const topicNames = Object.fromEntries(publishedTopics().map((topic) => [topic.id, topic.titleKo]));
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 직무 비교</div>
      <h1 className="wiki-page-title">직무 비교</h1>
      <p className="wiki-page-intro">비슷해 보이는 직무의 목적, 실제 업무와 산출물을 나란히 확인합니다. 먼저 비교 문서를 읽거나 아래에서 원하는 두 직무를 선택하세요.</p>
      <div className="wiki-page-meta"><span>비교 문서 {comparisons.length}개</span><span>직무 {roles.length}개를 직접 비교 가능</span></div>
    </header>
    <div className="wiki-folder-list">
      <WikiFolder name="직무 비교 문서" description="혼동하기 쉬운 직무 쌍을 풀이한 글" count={`${comparisons.length}개 문서`} defaultOpen>
        {comparisons.map((item) => <WikiFileRow key={item.id} href={routeFor.comparison(item.slug)} title={item.titleKo} subtitle={item.titleEn} description={item.summary} />)}
      </WikiFolder>
    </div>
    <div className="wiki-section-heading"><span>도구</span><h2>직무를 직접 비교하기</h2><p>아래에서 두 직무를 고르면 같은 기준으로 정리된 내용을 볼 수 있습니다.</p></div>
    <RoleComparePicker roles={roles.map((role) => ({ id: role.id, slug: role.slug, titleKo: role.titleKo, titleEn: role.titleEn, summary: role.summary, responsibilities: role.responsibilities, keyDeliverables: role.keyDeliverables, coreSkillIds: role.coreSkillIds, prerequisiteTopicIds: role.prerequisiteTopicIds, domainIds: role.domainIds, toolIds: role.toolIds, programmingUse: role.prerequisiteTopicIds.includes("programming-scripting") ? "코드·스크립트 이해가 기반 지식에 포함됩니다. 활용 수준은 조직과 업무에 따라 다릅니다." : "문서에 명시된 공통 기준 없음", projects: [...role.body.matchAll(/^###\s+(프로젝트[^\n]+)/gm)].map((match) => match[1]), newbiePrep: sectionText(role.body, "신입 준비") }))} topicNames={topicNames} />
  </main>;
}
