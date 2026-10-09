import type { Metadata } from "next";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedRoadmaps } from "@/lib/content";
import { routeFor } from "@/lib/site-data";

export const metadata: Metadata = { title: "커리어 경로", description: "보안 직무 선택부터 업무 포트폴리오와 지원 준비까지 이어지는 경로입니다.", alternates: { canonical: "/roadmaps/" } };

export default function RoadmapsPage() {
  const roadmaps = publishedRoadmaps();
  const foundation = roadmaps.filter((item) => item.id === "cybersecurity-fundamentals");
  const specialized = roadmaps.filter((item) => item.id !== "cybersecurity-fundamentals");
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 커리어 경로</div>
      <h1 className="wiki-page-title">커리어 경로</h1>
      <p className="wiki-page-intro">관심 직무를 고르고, 공고를 읽고, 업무 결과물로 역량을 보여주기까지의 준비 순서입니다.</p>
      <div className="wiki-page-meta"><span>경로 {roadmaps.length}개</span><span>처음이라면 입문 경로부터</span></div>
    </header>
    <div className="wiki-folder-list">
      <WikiFolder name="처음 시작하는 경로" description="직무 선택과 공고 읽기" count={`${foundation.length}개 문서`} defaultOpen>{foundation.map((item) => <WikiFileRow key={item.id} href={routeFor.roadmap(item.slug)} title={item.titleKo} subtitle={item.titleEn} description={item.summary} meta={`${item.roleIds.length}개 관련 직무`} />)}</WikiFolder>
      <WikiFolder name="분야별 준비 경로" description="업무 사례와 포트폴리오" count={`${specialized.length}개 문서`}>{specialized.map((item) => <WikiFileRow key={item.id} href={routeFor.roadmap(item.slug)} title={item.titleKo} subtitle={item.titleEn} description={item.summary} meta={`${item.roleIds.length}개 관련 직무`} />)}</WikiFolder>
    </div>
  </main>;
}
