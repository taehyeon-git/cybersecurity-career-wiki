import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedComparisons, publishedRoles } from "@/lib/content";
import { routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() { return publishedComparisons().map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = publishedComparisons().find((entry) => entry.slug === slug);
  return item ? { title: item.titleKo, description: item.summary, alternates: { canonical: canonicalUrl(routeFor.comparison(slug)) } } : {};
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparisons = publishedComparisons(); const roles = publishedRoles();
  const item = comparisons.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const index = comparisons.findIndex((entry) => entry.id === item.id);
  const related = item.roleIds.map((id) => roles.find((role) => role.id === id)).filter((role) => !!role).map((role) => ({ label: role.titleKo, href: routeFor.role(role.slug), eyebrow: "비교 대상" }));
  return <DocumentShell section="직무 비교" sectionHref="/comparisons/" title={item.titleKo} english={item.titleEn} summary={item.summary} body={item.body} reviewedAt={item.reviewedAt} sourceIds={item.sourceIds} sources={loadSources()} navItems={comparisons.map((entry) => ({ label: entry.titleKo, href: routeFor.comparison(entry.slug) }))} currentHref={routeFor.comparison(slug)} related={related} previous={comparisons[index - 1] ? { label: comparisons[index - 1].titleKo, href: routeFor.comparison(comparisons[index - 1].slug) } : undefined} next={comparisons[index + 1] ? { label: comparisons[index + 1].titleKo, href: routeFor.comparison(comparisons[index + 1].slug) } : undefined} filePath={item.filePath} badge="직무의 공통점과 차이" />;
}
