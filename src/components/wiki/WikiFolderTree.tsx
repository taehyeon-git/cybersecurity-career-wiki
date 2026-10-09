import { publishedRoadmaps, publishedRoles } from "@/lib/content";
import { roleCategories, routeFor } from "@/lib/site-data";
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
  const roadmaps = publishedRoadmaps();
  const roleFolders = roleCategories.map((category) => {
    const entries = roles.filter((role) => role.category === category.id)
      .sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));
    return folder(`roles-${category.id}`, category.ko, entries.length,
      entries.map((role) => page(`role-${role.id}`, role.titleKo, routeFor.role(role.slug))));
  });

  const nodes: WikiTreeNode[] = [
    page("home", "홈", "/"),
    page("start", "처음 시작하기", "/start/"),
    folder("roles", "보안 직무", roles.length, [page("roles-index", "직무 전체 보기", "/careers/"), ...roleFolders]),
    folder("roadmaps", "커리어 경로", roadmaps.length, [
      page("roadmaps-index", "경로 전체 보기", "/roadmaps/"),
      ...roadmaps.sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"))
        .map((roadmap) => page(`roadmap-${roadmap.id}`, roadmap.titleKo, routeFor.roadmap(roadmap.slug))),
    ]),
    page("glossary", "보안 용어집", "/glossary/"),
  ];

  return <WikiFolderNavigation nodes={nodes} />;
}
