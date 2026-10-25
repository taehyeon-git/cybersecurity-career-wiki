import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { PageIllustration } from "@/components/illustration/PageIllustration";
import { loadSources, publishedFields } from "@/lib/content";
import { fieldDomains, roleCategories, routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...publishedFields().map((field) => ({ slug: field.slug })),
    ...roleCategories.map((category) => ({ slug: category.id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const field = publishedFields().find((item) => item.slug === slug);
  if (!field) {
    return roleCategories.some((category) => category.id === slug)
      ? { title: "새 보안 분야 안내", description: "보안 분야 분류가 보호 대상과 기술 환경 기준으로 바뀌었습니다.", robots: { index: false, follow: true }, alternates: { canonical: canonicalUrl("/fields/") } }
      : {};
  }
  return {
    title: field.titleKo,
    description: field.summary,
    alternates: { canonical: canonicalUrl(routeFor.field(slug)) },
    openGraph: { title: `${field.titleKo} — ${field.titleEn}`, description: field.summary, url: canonicalUrl(routeFor.field(slug)) },
  };
}

export default async function FieldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allFields = publishedFields();
  const fields = fieldDomains.map((domainId) => allFields.find((field) => field.id === domainId)).filter((field) => field !== undefined);
  const field = fields.find((item) => item.slug === slug);
  if (!field) {
    if (!roleCategories.some((category) => category.id === slug)) notFound();
    return <main className="wiki-page">
      <header className="wiki-page-header">
        <div className="wiki-page-kicker">위키 / 보안 분야</div>
        <h1 className="wiki-page-title">보안 분야 안내가 바뀌었습니다</h1>
        <p className="wiki-page-intro">이전에 사용하던 업무 유형별 분야 안내를 보호 대상별 안내로 다시 구성했습니다. 시스템, 웹, 클라우드, OT 등 관심 있는 환경을 새 분야 목록에서 선택해 주세요.</p>
        <div className="wiki-page-meta"><Link href="/fields/">새 보안 분야 목록 보기</Link><Link href="/careers/">직무군별 직무 보기</Link></div>
        <PageIllustration kind="fields" id={`legacy-${slug}`} title="보안 분야 안내가 바뀌었습니다" />
      </header>
    </main>;
  }
  const index = fields.findIndex((item) => item.id === field.id);
  return <DocumentShell
    section="보안 분야"
    sectionHref="/fields/"
    title={field.titleKo}
    english={field.titleEn}
    summary={field.summary}
    body={field.body}
    reviewedAt={field.reviewedAt}
    sourceIds={field.sourceIds}
    sources={loadSources()}
    navItems={fields.map((item) => ({ label: item.titleKo, href: routeFor.field(item.slug) }))}
    currentHref={routeFor.field(slug)}
    previous={fields[index - 1] ? { label: fields[index - 1].titleKo, href: routeFor.field(fields[index - 1].slug) } : undefined}
    next={fields[index + 1] ? { label: fields[index + 1].titleKo, href: routeFor.field(fields[index + 1].slug) } : undefined}
    filePath={field.filePath}
    badge="분야 안내"
    editorialNote="보호 대상과 기술 환경을 기준으로 읽는 커리어 안내입니다. 실제 담당 범위와 채용 요건은 조직과 공고마다 다르므로 해당 직무 글과 공고를 함께 확인하세요."
  />;
}
