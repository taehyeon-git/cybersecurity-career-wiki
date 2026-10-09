import Link from "next/link";
import { ArrowLeft, ArrowRight, FilePenLine, Info, ListTree } from "lucide-react";
import { ArticleBody } from "@/components/content/ArticleBody";
import { SourceReferences } from "@/components/content/SourceReferences";
import { tableOfContents, type Source } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type NavItem = { label: string; href: string; group?: string };
type RelatedItem = { label: string; href: string; eyebrow?: string };
type DocumentShellProps = {
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
};

export function DocumentShell(props: DocumentShellProps) {
  const toc = tableOfContents(props.body);
  const repository = process.env.NEXT_PUBLIC_REPOSITORY_URL;
  const relativeFile = props.filePath?.replace(/\\/g, "/").split("/src/")[1];
  const editUrl = repository && relativeFile ? `${repository.replace(/\/$/, "")}/edit/main/src/${relativeFile}` : "";
  const issueUrl = repository ? `${repository.replace(/\/$/, "")}/issues/new?template=content-correction.yml` : "";
  const breadcrumbs = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: props.section, path: props.sectionHref },
    { name: props.title, path: props.currentHref },
  ]);
  return <div className="document-wrap">
    <aside className="document-sidebar" aria-label={`${props.section} 목록`}><div className="sidebar-title"><ListTree size={16} /> {props.section}</div><div className="sidebar-links">{props.navItems.map((item) => <Link key={item.href} href={item.href} className={item.href === props.currentHref ? "current" : ""} aria-current={item.href === props.currentHref ? "page" : undefined}><span>{item.label}</span></Link>)}</div></aside>
    <main className="document-main"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbs }} /><details className="mobile-document-nav"><summary><ListTree size={17} /> {props.section} 문서 목록</summary><nav aria-label={`${props.section} 모바일 목록`}>{props.navItems.map((item) => <Link key={item.href} href={item.href} className={item.href === props.currentHref ? "current" : ""} aria-current={item.href === props.currentHref ? "page" : undefined}>{item.label}</Link>)}</nav></details><nav className="breadcrumbs" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href={props.sectionHref}>{props.section}</Link><span>/</span><span>{props.title}</span></nav><div className="document-header"><div className="document-kicker">{props.badge ?? props.section}</div><h1>{props.title}</h1><p className="document-english">{props.english}</p><p className="document-summary">{props.summary}</p><div className="document-meta"><span>{props.reviewStatus === "reviewed" ? "최종 검토" : "내용 갱신"} {props.reviewedAt}</span>{props.reviewStatus === "needs-review" && <span>편집 검토 대기</span>}<span>참고 출처 {props.sourceIds.length}개</span></div></div><div className="editorial-note"><Info size={18} /><span>이 글은 직무와 경력 준비를 설명하는 위키의 해설입니다. 조직에 따라 업무 범위와 채용 요건은 달라질 수 있습니다.</span></div><ArticleBody body={props.body} /><SourceReferences ids={props.sourceIds} sources={props.sources} />{props.related && props.related.length > 0 && <section className="related-section"><div className="section-eyebrow">KEEP EXPLORING</div><h2>함께 읽으면 좋은 문서</h2><div className="related-grid">{props.related.map((item) => <Link key={item.href} href={item.href} className="related-card"><small>{item.eyebrow}</small><strong>{item.label}</strong><ArrowRight size={16} /></Link>)}</div></section>}<div className="document-actions">{editUrl && <a href={editUrl} target="_blank" rel="noopener noreferrer"><FilePenLine size={16} /> GitHub에서 수정 제안</a>}{issueUrl && <a href={issueUrl} target="_blank" rel="noopener noreferrer">문서 오류 제보</a>}</div><nav className="document-pager" aria-label="인접 문서">{props.previous ? <Link href={props.previous.href}><ArrowLeft size={17} /><span><small>이전 문서</small><strong>{props.previous.label}</strong></span></Link> : <span />}{props.next && <Link href={props.next.href}><span><small>다음 문서</small><strong>{props.next.label}</strong></span><ArrowRight size={17} /></Link>}</nav></main>
    <aside className="document-toc" aria-label="이 문서의 목차"><div>이 문서에서</div><nav>{toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}<a href="#references">참고자료</a></nav></aside>
  </div>;
}
