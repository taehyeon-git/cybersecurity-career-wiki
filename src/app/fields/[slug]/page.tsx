import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedFields } from "@/lib/content";
import { roleCategories, routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedFields().map((field) => ({ slug: field.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const field = publishedFields().find((item) => item.slug === slug);
  if (!field) return {};
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
  const fields = roleCategories.map((category) => allFields.find((field) => field.category === category.id)).filter((field) => field !== undefined);
  const field = fields.find((item) => item.slug === slug);
  if (!field) notFound();
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
    editorialNote="비슷한 업무를 묶어 설명한 분야 안내입니다. 조직에 따라 명칭과 책임 범위가 달라지므로 지원할 직무의 공고를 함께 확인하세요."
  />;
}
