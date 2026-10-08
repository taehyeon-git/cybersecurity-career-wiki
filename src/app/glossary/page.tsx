import type { Metadata } from "next";
import terms from "@/content/glossary/terms.json";
import { GlossaryBrowser } from "@/components/content/GlossaryBrowser";
import { publishedTopics } from "@/lib/content";

export const metadata: Metadata = { title: "보안 용어 사전", description: "사이버보안 직무와 기술 문서에 등장하는 핵심 용어를 한국어와 영어로 풀이합니다.", alternates: { canonical: "/glossary/" } };

export default function GlossaryPage() {
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 참고 자료</div>
      <h1 className="wiki-page-title">보안 용어 사전</h1>
      <p className="wiki-page-intro">문서를 읽다가 낯선 용어를 만났을 때 짧은 풀이를 찾아보세요. 관련 기술 문서에서 더 자세히 읽을 수 있습니다.</p>
      <div className="wiki-page-meta"><span>용어 {terms.length}개</span><span>한국어·영어로 검색</span></div>
    </header>
    <GlossaryBrowser terms={terms} topicIds={publishedTopics().map((topic) => topic.id)} />
  </main>;
}
