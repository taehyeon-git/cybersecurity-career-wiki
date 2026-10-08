import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, FileText, Folder, Info } from "lucide-react";
import { publishedComparisons, publishedRoadmaps, publishedRoles, publishedTopics } from "@/lib/content";
import { roleCategories, routeFor, topicCategories } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "사이버보안 커리어 위키",
  description: "사이버보안 직무, 기술 지식, 학습 경로와 직무 비교를 폴더별로 찾아보는 한국어 위키입니다.",
  alternates: { canonical: "/" },
};

function FileRow({ href, name, description, type }: { href: string; name: string; description: string; type: string }) {
  return <Link className="wiki-home-file" href={href}>
    <span className="wiki-home-file-name"><FileText size={16} aria-hidden="true" /> <strong>{name}</strong></span>
    <span className="wiki-home-file-description">{description}</span>
    <span className="wiki-home-file-type">{type}</span>
  </Link>;
}

function FolderSummary({ name, description, count }: { name: string; description: string; count: number }) {
  return <summary className="wiki-home-folder-summary">
    <span className="wiki-home-folder-symbol"><ChevronRight size={15} className="wiki-home-chevron" aria-hidden="true" /><Folder size={19} aria-hidden="true" /></span>
    <span className="wiki-home-folder-label"><strong>{name}</strong><small>{description}</small></span>
    <span className="wiki-home-folder-count">{count}개</span>
  </summary>;
}

export default function HomePage() {
  const roles = publishedRoles().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const topics = publishedTopics().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const roadmaps = publishedRoadmaps().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const comparisons = publishedComparisons().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const total = roles.length + topics.length + roadmaps.length + comparisons.length + 3;
  const topicGroups = [...new Set(topics.map((topic) => topic.category))];

  return <main className="wiki-home">
    <nav className="wiki-home-breadcrumb" aria-label="현재 위치"><span>위키</span><ChevronRight size={14} aria-hidden="true" /><strong>전체 문서</strong></nav>

    <header className="wiki-home-intro">
      <p className="wiki-home-kicker">CYBERSECURITY CAREER WIKI / INDEX</p>
      <h1>사이버보안 커리어 위키</h1>
      <p className="wiki-home-lede">보안 분야의 일을 이해하는 데 필요한 직무, 기술, 학습 경로를 한곳에 모았습니다. 아래 폴더를 열어 문서를 찾아보세요.</p>
      <div className="wiki-home-meta"><span>공개 문서 <strong>{total}</strong></span><span>직무 <strong>{roles.length}</strong></span><span>기술 <strong>{topics.length}</strong></span><span>로드맵 <strong>{roadmaps.length}</strong></span></div>
    </header>

    <aside className="wiki-home-notice"><Info size={18} aria-hidden="true" /><p><strong>처음 방문했다면</strong> <Link href="/start/">위키 사용 안내</Link>를 먼저 읽어 보세요. 직무 문서의 실제 업무와 산출물부터 살펴보면 학습할 기술을 고르기 쉽습니다.</p></aside>

    <section className="wiki-home-index" aria-labelledby="wiki-home-index-title">
      <div className="wiki-home-index-head"><div><span>ROOT /</span><h2 id="wiki-home-index-title">전체 문서</h2></div><span>폴더를 눌러 펼치기</span></div>

      <details className="wiki-home-folder" open>
        <FolderSummary name="처음 읽기" description="이용 안내 · 지식 지도 · 용어 사전" count={3} />
        <div className="wiki-home-folder-contents"><div className="wiki-home-file-list">
          <FileRow href="/start/" name="위키 사용 안내" description="직무와 기술 문서를 어떤 순서로 읽으면 좋을지 안내합니다." type="안내" />
          <FileRow href="/knowledge-map/" name="직무 지식 지도" description="기술과 직무 사이의 연결 관계를 찾아봅니다." type="지도" />
          <FileRow href="/glossary/" name="용어 사전" description="보안 문서에서 자주 쓰는 말의 뜻을 빠르게 확인합니다." type="사전" />
        </div></div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="보안 직무" description="실제 업무 · 산출물 · 필요 기술" count={roles.length} />
        <div className="wiki-home-folder-contents">
          <p className="wiki-home-folder-help">직무를 공격, 방어, 엔지니어링, 거버넌스, 전문 영역으로 나누었습니다. 각 문서에서 일의 흐름과 시작할 때 필요한 기술을 확인할 수 있습니다.</p>
          {roleCategories.map((category) => {
            const items = roles.filter((role) => role.category === category.id);
            return <details className="wiki-home-subfolder" key={category.id}>
              <summary className="wiki-home-subfolder-summary"><span><ChevronRight size={14} className="wiki-home-chevron" aria-hidden="true" /><Folder size={17} aria-hidden="true" /><strong>{category.ko}</strong></span><small>{items.length}개 문서</small></summary>
              <div className="wiki-home-file-list">{items.map((role) => <FileRow key={role.id} href={routeFor.role(role.slug)} name={role.titleKo} description={role.summary} type="직무" />)}</div>
            </details>;
          })}
          <Link className="wiki-home-folder-footer" href="/careers/">직무 색인 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="기술 지식" description="기초 개념 · 작동 원리 · 업무에서의 활용" count={topics.length} />
        <div className="wiki-home-folder-contents">
          <p className="wiki-home-folder-help">기술 문서는 영역별로 묶었습니다. 낯선 용어는 용어 사전에서 확인하고, 연관된 직무 문서로 이어 읽어 보세요.</p>
          {topicGroups.map((group) => {
            const items = topics.filter((topic) => topic.category === group);
            return <details className="wiki-home-subfolder" key={group}>
              <summary className="wiki-home-subfolder-summary"><span><ChevronRight size={14} className="wiki-home-chevron" aria-hidden="true" /><Folder size={17} aria-hidden="true" /><strong>{topicCategories[group] ?? group}</strong></span><small>{items.length}개 문서</small></summary>
              <div className="wiki-home-file-list">{items.map((topic) => <FileRow key={topic.id} href={routeFor.topic(topic.slug)} name={topic.titleKo} description={topic.summary} type="기술" />)}</div>
            </details>;
          })}
          <Link className="wiki-home-folder-footer" href="/knowledge/">기술 지식 색인 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="학습 로드맵" description="학습 순서 · 실습 · 완료 기준" count={roadmaps.length} />
        <div className="wiki-home-folder-contents"><div className="wiki-home-file-list">{roadmaps.map((roadmap) => <FileRow key={roadmap.id} href={routeFor.roadmap(roadmap.slug)} name={roadmap.titleKo} description={roadmap.summary} type="로드맵" />)}</div><Link className="wiki-home-folder-footer" href="/roadmaps/">로드맵 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="직무 비교" description="비슷한 직무의 목적과 일하는 방식" count={comparisons.length} />
        <div className="wiki-home-folder-contents"><div className="wiki-home-file-list">{comparisons.map((comparison) => <FileRow key={comparison.id} href={routeFor.comparison(comparison.slug)} name={comparison.titleKo} description={comparison.summary} type="비교" />)}</div><Link className="wiki-home-folder-footer" href="/comparisons/">직무 비교 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </details>
    </section>
  </main>;
}
