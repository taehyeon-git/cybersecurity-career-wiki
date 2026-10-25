import {
  FieldScene,
  IndexScene,
  RoadmapScene,
  fieldSceneDescriptions,
  indexSceneDescriptions,
  roadmapSceneDescriptions,
} from "./DirectoryScenes";
import { RoleScene, roleSceneDescriptions } from "./RoleScenes";

export type PageIllustrationKind =
  | "home"
  | "start"
  | "fields"
  | "careers"
  | "roadmaps"
  | "glossary"
  | "field"
  | "role"
  | "roadmap";

export type PageIllustrationProps = {
  kind: PageIllustrationKind;
  id?: string;
  title: string;
  className?: string;
};

type SceneKind = PageIllustrationKind | "legacy" | "not-found";

const palette = [
  { accent: "#3d739e", soft: "#dceaf2", line: "#a8c1d2" },
  { accent: "#487e78", soft: "#dfeee8", line: "#aecbc3" },
  { accent: "#9b752f", soft: "#f3e9ce", line: "#d7c698" },
  { accent: "#746c91", soft: "#e9e6f1", line: "#c2bdd6" },
  { accent: "#61798e", soft: "#e3ebf1", line: "#b6c7d2" },
] as const;

function hash(value: string) {
  let result = 0;
  for (const char of value) result = (result * 31 + char.charCodeAt(0)) >>> 0;
  return result;
}

function sceneKindFor(kind: PageIllustrationKind, id?: string): SceneKind {
  if (kind === "start" && id === "not-found") return "not-found";
  if (kind === "fields" && id?.startsWith("legacy-")) return "legacy";
  return kind;
}

function sceneDescription(kind: SceneKind, id?: string): string {
  let description: string | undefined;
  if (kind === "role" && id) description = roleSceneDescriptions[id];
  else if (kind === "field" && id) description = fieldSceneDescriptions[id];
  else if (kind === "roadmap" && id) description = roadmapSceneDescriptions[id];
  else description = indexSceneDescriptions[kind];

  if (!description) throw new Error(`Missing wiki illustration scene: ${kind}:${id ?? ""}`);
  return description;
}

export function PageIllustration({ kind, id, title, className }: PageIllustrationProps) {
  const sceneKind = sceneKindFor(kind, id);
  const identity = `${sceneKind}:${id ?? title}`;
  const colors = palette[hash(identity) % palette.length];
  const description = sceneDescription(sceneKind, id);
  const rootClass = ["page-illustration", className].filter(Boolean).join(" ");

  return <svg
    className={rootClass}
    data-wiki-illustration={identity}
    data-scene-description={description}
    viewBox="0 0 320 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={`${title}: ${description}`}
    focusable="false"
  >
    <rect width="320" height="200" fill="var(--surface-soft)" />
    <path d="M13 13h20M13 13v17M307 13h-20M307 13v17M13 187h20M13 187v-17M307 187h-20M307 187v-17" fill="none" stroke="var(--line)" strokeWidth="1" />
    <g data-scene-focus="true" fill="none">
      {sceneKind === "role" && id
        ? <RoleScene id={id} accent={colors.accent} soft={colors.soft} line={colors.line} />
        : sceneKind === "field" && id
          ? <FieldScene id={id} accent={colors.accent} soft={colors.soft} line={colors.line} />
          : sceneKind === "roadmap" && id
            ? <RoadmapScene id={id} accent={colors.accent} soft={colors.soft} line={colors.line} />
            : <IndexScene kind={sceneKind} accent={colors.accent} soft={colors.soft} line={colors.line} />}
    </g>
  </svg>;
}
