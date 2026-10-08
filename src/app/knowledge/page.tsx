import type { Metadata } from "next";
import Link from "next/link";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";
import { publishedTopics } from "@/lib/content";
import { routeFor, topicCategories } from "@/lib/site-data";

export const metadata: Metadata = { title: "기술 지식", description: "사이버보안 업무에 쓰이는 핵심 개념과 기술을 기초부터 살펴봅니다.", alternates: { canonical: "/knowledge/" } };

export default function KnowledgePage() {
  const topics = publishedTopics();
  const groups = [...new Set(topics.map((item) => item.category))];
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 기술 지식</div>
      <h1 className="wiki-page-title">기술 지식</h1>
      <p className="wiki-page-intro">직무를 이해할 때 필요한 기술과 개념을 묶었습니다. 폴더를 열어 개념, 사용 장면, 관련 직무를 살펴보세요.</p>
      <div className="wiki-page-meta"><span>폴더 {groups.length}개</span><span>문서 {topics.length}개</span><Link href="/knowledge-map/">직무와 기술의 연결 보기</Link></div>
    </header>
    <div className="wiki-folder-list">{groups.map((group, index) => {
      const items = topics.filter((item) => item.category === group);
      return <WikiFolder key={group} name={topicCategories[group] ?? group} description={group} count={`${items.length}개 문서`} defaultOpen={index === 0}>
        {items.map((topic) => <WikiFileRow key={topic.id} href={routeFor.topic(topic.slug)} title={topic.titleKo} subtitle={topic.titleEn} description={topic.summary} />)}
      </WikiFolder>;
    })}</div>
  </main>;
}
