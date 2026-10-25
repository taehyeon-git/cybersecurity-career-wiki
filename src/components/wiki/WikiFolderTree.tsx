import { publishedFields, publishedRoadmaps, publishedRoles } from "@/lib/content";
import { fieldDomainGroups, roleCategories, routeFor } from "@/lib/site-data";
import { WikiFolderNavigation, type WikiTreeNode } from "./WikiFolderNavigation";

function page(key: string, label: string, href: string): WikiTreeNode {
  return { kind: "page", key, label, href };
}

function folder(key: string, label: string, count: number, children: WikiTreeNode[]): WikiTreeNode {
  return { kind: "folder", key, label, count, children };
}

/** Keeps filesystem-backed content loading on the server side of the layout. */
export function WikiFolderTree() {
  const fields = publishedFields();
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
    folder("fields", "보안 분야", fields.length, [
      page("fields-index", "분야 전체 보기", "/fields/"),
      ...fieldDomainGroups.map((group) => {
        const entries = group.domainIds.flatMap((domainId) => {
          const field = fields.find((item) => item.id === domainId);
          return field ? [page(`field-${field.id}`, field.titleKo, routeFor.field(field.slug))] : [];
        });
        return folder(`fields-${group.id}`, group.ko, entries.length, entries);
      }),
    ]),
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
