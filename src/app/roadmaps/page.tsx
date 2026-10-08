import type { Metadata } from "next";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedRoadmaps } from "@/lib/content";
import { routeFor } from "@/lib/site-data";

export const metadata: Metadata = { title: "학습 로드맵", description: "보안 분야 기초와 직무별 학습 경로를 단계와 실습 기준으로 확인합니다.", alternates: { canonical: "/roadmaps/" } };

export default function RoadmapsPage() {
  const roadmaps = publishedRoadmaps();
  const foundation = roadmaps.filter((item) => item.id === "cybersecurity-fundamentals");
  const specialized = roadmaps.filter((item) => item.id !== "cybersecurity-fundamentals");
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 학습 로드맵</div>
      <h1 className="wiki-page-title">학습 로드맵</h1>
      <p className="wiki-page-intro">기초부터 작은 실습까지 차례로 따라갈 수 있는 학습 경로입니다. 각 단계의 완료 기준을 확인하며 진행하세요.</p>
      <div className="wiki-page-meta"><span>학습 경로 {roadmaps.length}개</span><span>처음이라면 기초 폴더부터</span></div>
    </header>
    <div className="wiki-folder-list">
      <WikiFolder name="처음 시작하는 경로" description="Foundation" count={`${foundation.length}개 문서`} defaultOpen>{foundation.map((item) => <WikiFileRow key={item.id} href={routeFor.roadmap(item.slug)} title={item.titleKo} subtitle={item.titleEn} description={item.summary} meta={`${item.topicIds.length}개 기술`} />)}</WikiFolder>
      <WikiFolder name="분야별 학습 경로" description="Specializations" count={`${specialized.length}개 문서`}>{specialized.map((item) => <WikiFileRow key={item.id} href={routeFor.roadmap(item.slug)} title={item.titleKo} subtitle={item.titleEn} description={item.summary} meta={`${item.topicIds.length}개 기술`} />)}</WikiFolder>
    </div>
  </main>;
}
