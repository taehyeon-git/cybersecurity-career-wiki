import type { Metadata } from "next";
import terms from "@/content/glossary/terms.json";
import { GlossaryBrowser } from "@/components/content/GlossaryBrowser";
import { loadSources } from "@/lib/content";

export const metadata: Metadata = { title: "보안 용어집", description: "보안 직무 글과 채용 공고에 등장하는 용어를 한국어와 영어로 짧게 풀이합니다.", alternates: { canonical: "/glossary/" } };

export default function GlossaryPage() {
  return <main className="wiki-page">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 참고 자료</div>
      <h1 className="wiki-page-title">보안 용어집</h1>
      <p className="wiki-page-intro">직무 글이나 채용 공고에서 낯선 말이 나오면 여기서 짧은 뜻과 출처를 확인하세요.</p>
      <div className="wiki-page-meta"><span>용어 {terms.length}개</span><span>한국어·영어로 검색</span></div>
    </header>
    <GlossaryBrowser terms={terms} sources={loadSources().map(({ id, title, url }) => ({ id, title, url }))} />
  </main>;
}
