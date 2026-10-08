import { publishedComparisons, publishedRoadmaps, publishedRoles, publishedTopics } from "@/lib/content";
import { roleCategories, routeFor, topicCategories } from "@/lib/site-data";
import { WikiFolderNavigation, type WikiTreeNode } from "./WikiFolderNavigation";

function page(key: string, label: string, href: string): WikiTreeNode {
  return { kind: "page", key, label, href };
}

function folder(key: string, label: string, count: number, children: WikiTreeNode[]): WikiTreeNode {
  return { kind: "folder", key, label, count, children };
}

/** Keeps filesystem-backed content loading on the server side of the layout. */
export function WikiFolderTree() {
  const roles = publishedRoles();
  const topics = publishedTopics();
  const roadmaps = publishedRoadmaps();
  const comparisons = publishedComparisons();

  const roleFolders = roleCategories
    .map((category) => {
      const entries = roles
        .filter((role) => role.category === category.id)
        .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
      return folder(
        `roles-${category.id}`,
        category.ko,
        entries.length,
        entries.map((role) => page(`role-${role.id}`, role.titleKo, routeFor.role(role.slug))),
      );
    })
    .filter((group) => group.kind === "folder" && group.count > 0);

  const knownTopicCategories = Object.entries(topicCategories);
  const unknownTopicCategories = [...new Set(topics.map((topic) => topic.category))]
    .filter((category) => !(category in topicCategories))
    .sort()
    .map((category) => [category, category] as const);
  const topicFolders = [...knownTopicCategories, ...unknownTopicCategories]
    .map(([categoryId, label]) => {
      const entries = topics
        .filter((topic) => topic.category === categoryId)
        .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
      return folder(
        `topics-${categoryId}`,
        label,
        entries.length,
        entries.map((topic) => page(`topic-${topic.id}`, topic.titleKo, routeFor.topic(topic.slug))),
      );
    })
    .filter((group) => group.kind === "folder" && group.count > 0);

  const nodes: WikiTreeNode[] = [
    page("home", "홈", "/"),
    page("start", "처음 시작하기", "/start/"),
    folder("roles", "보안 직무", roles.length, [
      page("roles-index", "직무 전체 보기", "/careers/"),
      ...roleFolders,
    ]),
    folder("topics", "기술 지식", topics.length, [
      page("topics-index", "기술 전체 보기", "/knowledge/"),
      ...topicFolders,
    ]),
    folder("roadmaps", "학습 로드맵", roadmaps.length, [
      page("roadmaps-index", "로드맵 전체 보기", "/roadmaps/"),
      ...roadmaps
        .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"))
        .map((roadmap) => page(`roadmap-${roadmap.id}`, roadmap.titleKo, routeFor.roadmap(roadmap.slug))),
    ]),
    folder("comparisons", "직무 비교", comparisons.length, [
      page("comparisons-index", "비교 전체 보기", "/comparisons/"),
      ...comparisons
        .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"))
        .map((comparison) => page(`comparison-${comparison.id}`, comparison.titleKo, routeFor.comparison(comparison.slug))),
    ]),
    page("glossary", "보안 용어집", "/glossary/"),
    page("knowledge-map", "지식 지도", "/knowledge-map/"),
  ];

  return <WikiFolderNavigation nodes={nodes} />;
}
