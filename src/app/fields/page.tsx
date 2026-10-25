import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLinkCue } from "@/components/content/ExternalLinkCue";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedFields } from "@/lib/content";
import { fieldDomainGroups, routeFor } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "보안 분야",
  description: "시스템·웹·OT 등 보호 대상과 기술 환경별 보안 분야를 실제 일, 관련 직무와 진입 경로로 설명합니다.",
  alternates: { canonical: "/fields/" },
};

export default function FieldsPage() {
  const fields = publishedFields();
  const relatedRoleCount = new Set(fields.flatMap((field) => field.roleIds)).size;

  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 보안 분야</div>
      <h1 className="wiki-page-title">보안 분야</h1>
      <p className="wiki-page-intro">시스템, 웹, 데이터, 산업 설비처럼 <strong>무엇을 보호하는지</strong> 골라 보세요. 각 문서에 실제 업무와 관련 직무, 진입 방법을 담았습니다.</p>
      <div className="wiki-page-meta"><span>분야 {fields.length}개</span><span>분야에 직접 연결된 직무 {relatedRoleCount}개</span><Link href="/careers/">직무 목록 보기</Link></div>
    </header>
    <p className="wiki-index-note"><span><strong>분야와 직무군의 차이</strong> 분야는 보호 대상, 직무군은 맡는 책임으로 나눕니다. 한 직무가 여러 분야에서 일할 수 있습니다. 관제·대응·정책처럼 분야를 가로지르는 역할은 <Link href="/careers/">직무 목록</Link>에서도 찾아보세요. 실제 범위는 공고에서 확인하세요.</span></p>
    <div className="wiki-folder-list">
      {fieldDomainGroups.map((group) => {
        const entries = group.domainIds.flatMap((domainId) => {
          const field = fields.find((item) => item.id === domainId);
          return field ? [field] : [];
        });
        return <WikiFolder key={group.id} name={group.ko} description={group.description} count={`${entries.length}개 분야`} defaultOpen>
          {entries.map((field) => <WikiFileRow key={field.id} href={routeFor.field(field.slug)} title={field.titleKo} subtitle={field.titleEn} description={field.summary} meta={`${field.roleIds.length}개 직무 연결`} />)}
        </WikiFolder>;
      })}
    </div>
    <p className="wiki-index-note"><span>이 폴더는 직무를 찾기 위한 보호 대상별 안내입니다. 국내 <a href="https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&amp;iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8" target="_blank" rel="noopener noreferrer">NCS 정보보호 SQF<ExternalLinkCue /></a>의 직무 분류와는 다른 축입니다. 데이터 보안과 개인정보의 법적 책임은 겹치지만 같지 않으며, 영상정보 시스템 보안이 물리 경비 전체를 뜻하지는 않습니다. 인접 직군의 채용 범위는 공고에서 확인하세요.</span></p>
  </main>;
}
