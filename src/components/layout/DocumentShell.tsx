import Link from "next/link";
import { ArrowLeft, ArrowRight, FilePenLine, Info, ListTree } from "lucide-react";
import { ArticleBody } from "@/components/content/ArticleBody";
import { SourceReferences } from "@/components/content/SourceReferences";
import { ExternalLinkCue } from "@/components/content/ExternalLinkCue";
import { MobileDocumentToc } from "@/components/layout/MobileDocumentToc";
import { PageIllustration } from "@/components/illustration/PageIllustration";
import { tableOfContents, type Source } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type NavItem = { label: string; href: string; group?: string };
type RelatedItem = { label: string; href: string; eyebrow?: string };
type DocumentShellProps = {
  parentSection?: { label: string; href: string };
  navLabel?: string;
  section: string;
  sectionHref: string;
  title: string;
  english: string;
  summary: string;
  body: string;
  reviewedAt: string;
  reviewStatus?: "reviewed" | "needs-review";
  sourceIds: string[];
  sources: Source[];
  navItems: NavItem[];
  currentHref: string;
  related?: RelatedItem[];
  previous?: RelatedItem;
  next?: RelatedItem;
  filePath?: string;
  badge?: string;
  editorialNote?: string;
};

export function DocumentShell(props: DocumentShellProps) {
  const toc = tableOfContents(props.body);
  const navLabel = props.navLabel ?? props.section;
  const reviewEvidence = props.reviewStatus === "needs-review"
    ? toc.find((item) => item.title.includes("근거")) ?? toc.find((item) => item.title.includes("원문"))
    : undefined;
  const illustrationKind = props.currentHref.startsWith("/fields/") ? "field" : props.currentHref.startsWith("/roadmaps/") ? "roadmap" : "role";
  const illustrationId = props.currentHref.split("/").filter(Boolean).at(-1);
  const careerPaths = props.related?.filter((item) => item.eyebrow === "커리어 경로") ?? [];
  const relatedGroups = new Map<string, RelatedItem[]>();
  for (const item of props.related ?? []) {
    if (item.eyebrow === "커리어 경로") continue;
    const group = item.eyebrow ?? "관련 문서";
    relatedGroups.set(group, [...(relatedGroups.get(group) ?? []), item]);
  }
  const repository = process.env.NEXT_PUBLIC_REPOSITORY_URL;
  const relativeFile = props.filePath?.replace(/\\/g, "/").split("/src/")[1];
  const editUrl = repository && relativeFile ? `${repository.replace(/\/$/, "")}/edit/main/src/${relativeFile}` : "";
  const issueUrl = repository ? `${repository.replace(/\/$/, "")}/issues/new?template=content-correction.yml` : "";
  const breadcrumbs = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    ...(props.parentSection ? [{ name: props.parentSection.label, path: props.parentSection.href }] : []),
    { name: props.section, path: props.sectionHref },
    { name: props.title, path: props.currentHref },
  ]);
  return <div className="document-wrap">
    <aside className="document-sidebar" aria-label={`${navLabel} 목록`}><div className="sidebar-title"><ListTree size={16} /> {navLabel}</div><div className="sidebar-links">{props.navItems.map((item) => <Link key={item.href} href={item.href} className={item.href === props.currentHref ? "current" : ""} aria-current={item.href === props.currentHref ? "page" : undefined}><span>{item.label}</span></Link>)}</div></aside>
    <main className="document-main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbs }} /><details className="mobile-document-nav"><summary><ListTree size={17} /> {navLabel} 문서 목록</summary><nav aria-label={`${navLabel} 모바일 목록`}>{props.navItems.map((item) => <Link key={item.href} href={item.href} className={item.href === props.currentHref ? "current" : ""} aria-current={item.href === props.currentHref ? "page" : undefined}>{item.label}</Link>)}</nav></details><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span>{props.parentSection && <><Link href={props.parentSection.href}>{props.parentSection.label}</Link><span>/</span></>}<Link href={props.sectionHref}>{props.section}</Link><span>/</span><span>{props.title}</span></nav><div className="document-header"><div className="document-kicker">{props.badge ?? props.section}</div><h1>{props.title}</h1><p className="document-english">{props.english}</p><p className="document-summary">{props.summary}</p><div className="document-meta"><span>{props.reviewStatus === "reviewed" ? "마지막 내용 검토" : "내용 갱신"} {props.reviewedAt}</span>{props.reviewStatus === "needs-review" && (reviewEvidence ? <a href={`#${reviewEvidence.id}`}>근거·범위 검토 중 · 확인 범위로 이동</a> : <span>근거·범위 검토 중</span>)}<span>선정한 참고자료 {props.sourceIds.length}개</span></div><PageIllustration kind={illustrationKind} id={illustrationId} title={props.title} /></div>{careerPaths.length > 0 && <nav className="document-career-paths" aria-label="이 직무의 커리어 경로"><span>이 직무 준비하기</span>{careerPaths.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>}<div className="editorial-note"><Info size={18} /><span>{props.editorialNote ?? "직무·커리어 해설입니다. 실제 업무와 채용 요건은 조직·공고마다 다릅니다."}{props.reviewStatus === "needs-review" && <> 이 검토 표시는 국내 직접 채용 근거와 업무 범위를 더 확인하는 편집 상태입니다. 직무가 없거나 글의 모든 근거가 미확인이라는 뜻은 아닙니다. <Link href="/start/">검토 표시 읽는 법</Link></>}</span></div><MobileDocumentToc items={toc} related={relatedGroups.size > 0} /><ArticleBody body={props.body} /><SourceReferences ids={props.sourceIds} sources={props.sources} />{relatedGroups.size > 0 && <section className="related-section" id="related-documents" aria-labelledby="related-heading"><div className="section-eyebrow">KEEP EXPLORING</div><h2 id="related-heading">함께 읽으면 좋은 문서</h2>{Array.from(relatedGroups, ([group, items]) => <div className="related-group" key={group}><h3>{group}</h3><div className="related-grid">{items.map((item) => <Link key={item.href} href={item.href} className="related-card"><small>{item.eyebrow}</small><strong>{item.label}</strong><ArrowRight size={16} /></Link>)}</div></div>)}</section>}<div className="document-actions">{editUrl && <a href={editUrl} target="_blank" rel="noopener noreferrer"><FilePenLine size={16} /> GitHub에서 수정 제안<ExternalLinkCue /></a>}{issueUrl && <a href={issueUrl} target="_blank" rel="noopener noreferrer">문서 오류 제보<ExternalLinkCue /></a>}</div><nav className="document-pager" aria-label="인접 문서">{props.previous ? <Link href={props.previous.href}><ArrowLeft size={17} /><span><small>이전 문서</small><strong>{props.previous.label}</strong></span></Link> : <span />}{props.next && <Link href={props.next.href}><span><small>다음 문서</small><strong>{props.next.label}</strong></span><ArrowRight size={17} /></Link>}</nav></main>
    <aside className="document-toc" aria-label="이 문서의 목차"><div>이 문서에서</div><nav>{toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}<a href="#references">참고자료</a>{relatedGroups.size > 0 && <a href="#related-documents">관련 문서</a>}</nav></aside>
  </div>;
}
