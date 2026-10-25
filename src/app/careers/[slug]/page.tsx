import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedFields, publishedRoadmaps, publishedRoles } from "@/lib/content";
import { fieldDomains, roleCategories, routeFor } from "@/lib/site-data";
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
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  const category = roleCategories.find((item) => item.id === role.category);
  if (!category) notFound();
  const categoryRoles = roles.filter((item) => item.category === role.category)
    .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
  const index = categoryRoles.findIndex((item) => item.id === role.id);
  const roadmaps = publishedRoadmaps();
  const fields = publishedFields();
  const relatedFields = fieldDomains.flatMap((domainId) => {
    const field = fields.find((item) => item.id === domainId);
    return field && field.roleIds.includes(role.id) ? [field] : [];
  });
  const related = [
    ...relatedFields.map((field) => ({ label: field.titleKo, href: routeFor.field(field.slug), eyebrow: "보안 분야" })),
    ...role.roadmapIds.map((id) => roadmaps.find((item) => item.id === id)).filter((item) => !!item).map((item) => ({ label: item.titleKo, href: routeFor.roadmap(item.slug), eyebrow: "커리어 경로" })),
    ...role.relatedRoleIds.map((id) => roles.find((item) => item.id === id)).filter((item) => !!item).map((item) => ({ label: item.titleKo, href: routeFor.role(item.slug), eyebrow: "관련 직무" })),
  ];
  return <DocumentShell section={category.ko} sectionHref={`/careers/?category=${role.category}`} title={role.titleKo} english={role.titleEn} summary={role.summary} body={role.body} reviewedAt={role.reviewedAt} reviewStatus={role.reviewStatus} sourceIds={role.sourceIds} sources={loadSources()} navItems={categoryRoles.map((item) => ({ label: item.titleKo, href: routeFor.role(item.slug) }))} currentHref={routeFor.role(slug)} related={related} previous={categoryRoles[index - 1] ? { label: categoryRoles[index - 1].titleKo, href: routeFor.role(categoryRoles[index - 1].slug) } : undefined} next={categoryRoles[index + 1] ? { label: categoryRoles[index + 1].titleKo, href: routeFor.role(categoryRoles[index + 1].slug) } : undefined} filePath={role.filePath} badge={category.ko} />;
}
