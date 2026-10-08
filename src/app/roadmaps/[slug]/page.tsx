import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedRoadmaps, publishedTopics } from "@/lib/content";
import { routeFor } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() { return publishedRoadmaps().map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = publishedRoadmaps().find((entry) => entry.slug === slug);
  return item ? { title: item.titleKo, description: item.summary, alternates: { canonical: canonicalUrl(routeFor.roadmap(slug)) } } : {};
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmaps = publishedRoadmaps(); const topics = publishedTopics();
  const item = roadmaps.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const index = roadmaps.findIndex((entry) => entry.id === item.id);
  const related = item.topicIds.map((id) => topics.find((topic) => topic.id === id)).filter((topic) => !!topic).slice(0, 6).map((topic) => ({ label: topic.titleKo, href: routeFor.topic(topic.slug), eyebrow: "학습 기술" }));
  return <DocumentShell section="학습 로드맵" sectionHref="/roadmaps/" title={item.titleKo} english={item.titleEn} summary={item.summary} body={item.body} reviewedAt={item.reviewedAt} sourceIds={item.sourceIds} sources={loadSources()} navItems={roadmaps.map((entry) => ({ label: entry.titleKo, href: routeFor.roadmap(entry.slug) }))} currentHref={routeFor.roadmap(slug)} related={related} previous={roadmaps[index - 1] ? { label: roadmaps[index - 1].titleKo, href: routeFor.roadmap(roadmaps[index - 1].slug) } : undefined} next={roadmaps[index + 1] ? { label: roadmaps[index + 1].titleKo, href: routeFor.roadmap(roadmaps[index + 1].slug) } : undefined} filePath={item.filePath} badge="단계별 학습" />;
}
