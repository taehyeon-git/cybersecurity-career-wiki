import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentShell } from "@/components/layout/DocumentShell";
import { loadSources, publishedRoles, publishedTopics } from "@/lib/content";
import { routeFor, topicCategories } from "@/lib/site-data";
import { canonicalUrl } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() { return publishedTopics().map((topic) => ({ slug: topic.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = publishedTopics().find((item) => item.slug === slug);
  if (!topic) return {};
  return { title: topic.titleKo, description: topic.summary, alternates: { canonical: canonicalUrl(routeFor.topic(slug)) }, openGraph: { title: `${topic.titleKo} — ${topic.titleEn}`, description: topic.summary, url: canonicalUrl(routeFor.topic(slug)) } };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topics = publishedTopics();
  const roles = publishedRoles();
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  const index = topics.findIndex((item) => item.id === topic.id);
  const related = [
    ...topic.relatedRoleIds.map((id) => roles.find((item) => item.id === id)).filter((item) => !!item).slice(0, 3).map((item) => ({ label: item.titleKo, href: routeFor.role(item.slug), eyebrow: "이 기술을 쓰는 직무" })),
    ...topic.relatedTopicIds.map((id) => topics.find((item) => item.id === id)).filter((item) => !!item).slice(0, 3).map((item) => ({ label: item.titleKo, href: routeFor.topic(item.slug), eyebrow: "관련 기술" })),
  ];
  return <DocumentShell section="기술 지식" sectionHref="/knowledge/" title={topic.titleKo} english={topic.titleEn} summary={topic.summary} body={topic.body} reviewedAt={topic.reviewedAt} sourceIds={topic.sourceIds} sources={loadSources()} navItems={topics.map((item) => ({ label: item.titleKo, href: routeFor.topic(item.slug) }))} currentHref={routeFor.topic(slug)} related={related} previous={topics[index - 1] ? { label: topics[index - 1].titleKo, href: routeFor.topic(topics[index - 1].slug) } : undefined} next={topics[index + 1] ? { label: topics[index + 1].titleKo, href: routeFor.topic(topics[index + 1].slug) } : undefined} filePath={topic.filePath} badge={topicCategories[topic.category] ?? "기술 지식"} />;
}
