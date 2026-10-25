import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedRoadmaps, publishedRoles } from "@/lib/content";
import { roadmapGroups, roleCategories, routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() { return publishedRoadmaps().map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = publishedRoadmaps().find((entry) => entry.slug === slug);
  return item ? { title: item.titleKo, description: item.summary, alternates: { canonical: canonicalUrl(routeFor.roadmap(slug)) } } : {};
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmaps = publishedRoadmaps().sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko")); const roles = publishedRoles();
  const item = roadmaps.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const group = roadmapGroups.find((entry) => entry.roadmapIds.some((id) => id === item.id));
  if (!group) throw new Error(`${item.id}: published roadmap is missing a preparation folder`);
  const groupRoadmaps = roadmaps.filter((entry) => group.roadmapIds.some((id) => id === entry.id));
  const index = groupRoadmaps.findIndex((entry) => entry.id === item.id);
  const related = item.roleIds.map((id) => roles.find((role) => role.id === id)).filter((role) => !!role).map((role) => ({ label: role.titleKo, href: routeFor.role(role.slug), eyebrow: roleCategories.find((category) => category.id === role.category)?.ko ?? "관련 직무" }));
  return <DocumentShell section="커리어 경로" sectionHref="/roadmaps/" navLabel={group.ko} title={item.titleKo} english={item.titleEn} summary={item.summary} body={item.body} reviewedAt={item.reviewedAt} sourceIds={item.sourceIds} sources={loadSources()} navItems={groupRoadmaps.map((entry) => ({ label: entry.titleKo, href: routeFor.roadmap(entry.slug) }))} currentHref={routeFor.roadmap(slug)} related={related} previous={groupRoadmaps[index - 1] ? { label: groupRoadmaps[index - 1].titleKo, href: routeFor.roadmap(groupRoadmaps[index - 1].slug) } : undefined} next={groupRoadmaps[index + 1] ? { label: groupRoadmaps[index + 1].titleKo, href: routeFor.roadmap(groupRoadmaps[index + 1].slug) } : undefined} filePath={item.filePath} badge={group.ko} />;
}
