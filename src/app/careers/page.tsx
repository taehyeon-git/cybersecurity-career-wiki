import type { Metadata } from "next";
import Link from "next/link";
import { RoleExplorer } from "@/components/careers/RoleExplorer";
import { publishedRoles } from "@/lib/content";

export const metadata: Metadata = { title: "보안 직무", description: "보안 직무를 실제 업무 범주와 책임, 산출물, 채용 근거로 살펴봅니다.", alternates: { canonical: "/careers/" } };

export default function CareersPage() {
  const roles = publishedRoles();
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 보안 직무</div>
      <h1 className="wiki-page-title">보안 직무</h1>
      <p className="wiki-page-intro">전략·개발·운영·진단·대응·고객지원의 실제 업무 영역에서 직무를 찾고, 책임과 산출물, 채용 근거를 확인하세요.</p>
      <div className="wiki-page-meta"><span>직무 {roles.length}개</span><span>업무 범주별 폴더</span><Link href="/start/">분류 기준</Link></div>
    </header>
    <RoleExplorer roles={roles.map(({ id, slug, titleKo, titleEn, summary, category, aliases, keyDeliverables }) => ({ id, slug, titleKo, titleEn, summary, category, aliases, keyDeliverables }))} />
    <p className="wiki-index-note">상위 폴더는 <a href="https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&amp;iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8" target="_blank" rel="noopener noreferrer">NCS 정보보호 SQF</a>의 업무 분야를 바탕으로 구성했습니다. 세부 문서명은 실제 채용 직함과 업무를 함께 반영했으며, 한 공고가 여러 역할을 묶을 수 있습니다.</p>
  </main>;
}
