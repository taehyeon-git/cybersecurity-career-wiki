import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLinkCue } from "@/components/content/ExternalLinkCue";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedFields } from "@/lib/content";
import { roleCategories, routeFor } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "보안 분야",
  description: "사이버보안의 주요 업무 분야를 처음 보는 사람도 이해할 수 있도록 실제 일, 세부 영역, 직무와 진입 경로로 설명합니다.",
  alternates: { canonical: "/fields/" },
};

export default function FieldsPage() {
  const fields = publishedFields();
  const ordered = roleCategories.map((category) => fields.find((field) => field.category === category.id)).filter((field) => field !== undefined);

  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 보안 분야</div>
      <h1 className="wiki-page-title">보안 분야</h1>
      <p className="wiki-page-intro">보안 업무의 큰 갈래를 먼저 살펴보세요. 각 문서에서 실제로 하는 일과 세부 영역, 함께 일하는 사람, 입문 방법, 공고를 읽을 때 확인할 점을 설명합니다.</p>
      <div className="wiki-page-meta"><span>분야 {ordered.length}개</span><span>연결된 직무 {fields.reduce((count, field) => count + field.roleIds.length, 0)}개</span><Link href="/careers/">직무 목록 보기</Link></div>
    </header>
    <p className="wiki-index-note"><span><strong>분야와 직무의 차이</strong> 분야는 비슷한 책임을 묶은 큰 업무 영역이고, 직무는 채용 공고에서 찾을 수 있는 구체적인 역할입니다. 한 사람이 둘 이상의 분야와 관련된 일을 맡을 수 있으므로 실제 업무 범위는 공고 본문에서 확인하세요.</span></p>
    <div className="wiki-folder-list">
      <WikiFolder name="보안 분야" description="큰 업무 영역부터 살펴보기" count={`${ordered.length}개 문서`} defaultOpen>
        {ordered.map((field) => <WikiFileRow key={field.id} href={routeFor.field(field.slug)} title={field.titleKo} subtitle={field.titleEn} description={field.summary} meta={`${field.roleIds.length}개 직무`} />)}
      </WikiFolder>
    </div>
    <p className="wiki-index-note"><span>이 폴더는 위키에서 직무를 찾기 위한 안내입니다. 국내 <a href="https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&amp;iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8" target="_blank" rel="noopener noreferrer">NCS 정보보호 SQF<ExternalLinkCue /></a>의 하위산업분야와 위키의 폴더 수는 같지 않습니다. 금융 이상거래 탐지, 물리 보안, 일반 IT 운영·서비스 신뢰성, 일반 품질·안전, 군 사이버 직군은 보안과 맞닿아 있지만 조직과 임무에 따라 별도 직군으로 채용될 수 있습니다.</span></p>
  </main>;
}
