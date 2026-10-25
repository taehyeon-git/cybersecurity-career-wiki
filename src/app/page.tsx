import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, FileText, Folder, Info } from "lucide-react";
import { publishedFields, publishedRoadmaps, publishedRoles } from "@/lib/content";
import { PageIllustration } from "@/components/illustration/PageIllustration";
import { fieldDomainGroups, roleCategories, routeFor } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "사이버보안 커리어 위키",
  description: "사이버보안 분야와 직무의 실제 업무, 채용 근거, 진입 경로를 폴더별로 찾아보는 한국어 위키입니다.",
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
  const fields = publishedFields();
  const roles = publishedRoles().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const roadmaps = publishedRoadmaps().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));

  return <main className="wiki-home">
    <nav className="wiki-home-breadcrumb" aria-label="현재 위치"><span>위키</span><ChevronRight size={14} aria-hidden="true" /><strong>전체 문서</strong></nav>

    <header className="wiki-home-intro">
      <p className="wiki-home-kicker">CYBERSECURITY CAREER WIKI / INDEX</p>
      <h1>사이버보안 커리어 위키</h1>
      <p className="wiki-home-lede">시스템·웹·OT처럼 보호하는 대상별 분야를 살펴보고, 실제 직무의 책임과 채용 근거로 이어 가세요. 폴더를 펼쳐 관심 있는 일을 찾을 수 있습니다.</p>
      <div className="wiki-home-meta"><span>분야 <strong>{fields.length}</strong></span><span>직무 <strong>{roles.length}</strong></span><span>커리어 경로 <strong>{roadmaps.length}</strong></span></div>
      <PageIllustration kind="home" title="사이버보안 커리어 위키" />
    </header>

    <aside className="wiki-home-notice"><Info size={18} aria-hidden="true" /><p><strong>처음 방문했다면</strong> <Link href="/start/">직무 찾는 방법</Link>을 읽고, 먼저 분야 폴더에서 하는 일을 살펴보세요. 개별 채용 사례는 시장 전체의 공통 요건을 뜻하지 않습니다.</p></aside>

    <section className="wiki-home-index" aria-labelledby="wiki-home-index-title">
      <div className="wiki-home-index-head"><div><span>ROOT /</span><h2 id="wiki-home-index-title">전체 문서</h2></div><span>폴더를 눌러 펼치기</span></div>

      <details className="wiki-home-folder" open>
        <FolderSummary name="처음 읽기" description="이용 안내 · 용어 사전" count={2} />
        <div className="wiki-home-folder-contents"><div className="wiki-home-file-list">
          <FileRow href="/start/" name="직무 찾는 방법" description="업무 범주와 채용 근거를 읽는 방법을 안내합니다." type="안내" />
          <FileRow href="/glossary/" name="보안 용어집" description="직무 글과 공고에 등장하는 약어와 용어를 짧게 확인합니다." type="사전" />
        </div></div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="보안 분야" description="보호 대상 · 실제 일 · 관련 직무" count={fields.length} />
        <div className="wiki-home-folder-contents">
          <p className="wiki-home-folder-help">시스템, 웹 서비스, 데이터, 산업 설비 등 무엇을 보호하는지에 따라 읽을 수 있습니다. 분야 설명은 기술 강의 대신 해당 환경에서 일하는 사람의 책임과 진입 방법에 집중합니다.</p>
          {fieldDomainGroups.map((group) => <details className="wiki-home-subfolder" key={group.id}>
            <summary className="wiki-home-subfolder-summary"><span><ChevronRight size={14} className="wiki-home-chevron" aria-hidden="true" /><Folder size={17} aria-hidden="true" /><strong>{group.ko}</strong></span><small>{group.domainIds.length}개 분야</small></summary>
            <div className="wiki-home-file-list">{group.domainIds.map((domainId) => {
              const field = fields.find((item) => item.id === domainId);
              return field ? <FileRow key={field.id} href={routeFor.field(field.slug)} name={field.titleKo} description={field.summary} type="분야" /> : null;
            })}</div>
          </details>)}
          <Link className="wiki-home-folder-footer" href="/fields/">분야 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="보안 직무" description="직무군 · 책임 · 산출물 · 채용 근거" count={roles.length} />
        <div className="wiki-home-folder-contents">
          <p className="wiki-home-folder-help">국내 정보보호 직무역량체계의 업무 영역을 바탕으로 묶었습니다. 세부 직함은 조직과 채용 공고마다 달라질 수 있습니다.</p>
          {roleCategories.map((category) => {
            const items = roles.filter((role) => role.category === category.id);
            return <details className="wiki-home-subfolder" key={category.id}>
              <summary className="wiki-home-subfolder-summary"><span><ChevronRight size={14} className="wiki-home-chevron" aria-hidden="true" /><Folder size={17} aria-hidden="true" /><strong>{category.ko}</strong></span><small>{items.length}개 문서</small></summary>
              <div className="wiki-home-file-list">{items.map((role) => <FileRow key={role.id} href={routeFor.role(role.slug)} name={role.titleKo} description={role.summary} type="직무" />)}</div>
            </details>;
          })}
          <Link className="wiki-home-folder-footer" href="/careers/">직무 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </details>

      <details className="wiki-home-folder">
        <FolderSummary name="커리어 경로" description="직무 선택 · 준비물 · 지원 과정" count={roadmaps.length} />
        <div className="wiki-home-folder-contents"><div className="wiki-home-file-list">{roadmaps.map((roadmap) => <FileRow key={roadmap.id} href={routeFor.roadmap(roadmap.slug)} name={roadmap.titleKo} description={roadmap.summary} type="경로" />)}</div><Link className="wiki-home-folder-footer" href="/roadmaps/">경로 전체 보기 <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
      </details>
    </section>
  </main>;
}
