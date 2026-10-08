import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedRoles, publishedTopics } from "@/lib/content";
import { roleCategories, routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() { return publishedRoles().map((role) => ({ slug: role.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = publishedRoles().find((item) => item.slug === slug);
  if (!role) return {};
  return { title: role.titleKo, description: role.summary, alternates: { canonical: canonicalUrl(routeFor.role(slug)) }, openGraph: { title: `${role.titleKo} — ${role.titleEn}`, description: role.summary, url: canonicalUrl(routeFor.role(slug)) } };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roles = publishedRoles();
  const topics = publishedTopics();
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  const index = roles.findIndex((item) => item.id === role.id);
  const related = [
    ...role.relatedRoleIds.map((id) => roles.find((item) => item.id === id)).filter((item) => !!item).slice(0, 3).map((item) => ({ label: item.titleKo, href: routeFor.role(item.slug), eyebrow: "관련 직무" })),
    ...role.domainIds.map((id) => topics.find((item) => item.id === id)).filter((item) => !!item).slice(0, 3).map((item) => ({ label: item.titleKo, href: routeFor.topic(item.slug), eyebrow: "연관 기술" })),
  ];
  return <DocumentShell section="직무 탐색" sectionHref="/careers/" title={role.titleKo} english={role.titleEn} summary={role.summary} body={role.body} reviewedAt={role.reviewedAt} sourceIds={role.sourceIds} sources={loadSources()} navItems={roles.map((item) => ({ label: item.titleKo, href: routeFor.role(item.slug) }))} currentHref={routeFor.role(slug)} related={related} previous={roles[index - 1] ? { label: roles[index - 1].titleKo, href: routeFor.role(roles[index - 1].slug) } : undefined} next={roles[index + 1] ? { label: roles[index + 1].titleKo, href: routeFor.role(roles[index + 1].slug) } : undefined} filePath={role.filePath} badge={roleCategories.find((item) => item.id === role.category)?.ko} />;
}
