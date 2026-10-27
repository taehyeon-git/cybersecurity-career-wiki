import type { CSSProperties } from "react";
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
  { accent: "#965036", soft: "#f0d6c7", line: "#bf9887" },
  { accent: "#426c63", soft: "#dce9df", line: "#9eb9ac" },
  { accent: "#8b6b34", soft: "#f1e4c6", line: "#c9b486" },
  { accent: "#755b70", soft: "#ebe0e9", line: "#baa3b5" },
  { accent: "#4a6a7c", soft: "#dee9ed", line: "#a4bac2" },
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
  const sceneHash = hash(identity);
  const colors = palette[sceneHash % palette.length];
  const description = sceneDescription(sceneKind, id);
  const rootClass = ["page-illustration", className].filter(Boolean).join(" ");
  const graphicId = sceneHash.toString(36);
  const paperGradient = `paper-${graphicId}`;
  const lightGradient = `light-${graphicId}`;
  const grainPattern = `grain-${graphicId}`;
  // The drawings use --surface for their paper and screen details. Keep those
  // surfaces light even when the surrounding wiki is shown in dark mode.
  const sceneSurface = { "--surface": "#fffaf3" } as CSSProperties;

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
    <defs>
      <linearGradient id={paperGradient} gradientUnits="userSpaceOnUse" x1="9" y1="5" x2="309" y2="198">
        <stop stopColor="#fffaf1" />
        <stop offset=".56" stopColor="#f5eee3" />
        <stop offset="1" stopColor="#e9ddcc" />
      </linearGradient>
      <radialGradient id={lightGradient} gradientUnits="userSpaceOnUse" cx="263" cy="37" r="150">
        <stop stopColor={colors.soft} stopOpacity=".82" />
        <stop offset="1" stopColor={colors.soft} stopOpacity="0" />
      </radialGradient>
      <pattern id={grainPattern} width="19" height="19" patternUnits="userSpaceOnUse">
        <path d="M0 19H19M19 0V19" fill="none" stroke="#836b58" strokeOpacity=".045" strokeWidth=".7" />
        <circle cx="2.5" cy="2.5" r=".55" fill="#735943" opacity=".17" />
      </pattern>
    </defs>
    <rect width="320" height="200" rx="13" fill="#302a25" />
    <rect x="5.5" y="5.5" width="309" height="189" rx="9" fill={`url(#${paperGradient})`} />
    <rect x="5.5" y="5.5" width="309" height="189" rx="9" fill={`url(#${lightGradient})`} />
    <rect x="5.5" y="5.5" width="309" height="189" rx="9" fill={`url(#${grainPattern})`} />
    <path d="M20 25h35M20 25v20M300 25h-35M300 25v20M20 175h35M20 175v-20M300 175h-35M300 175v-20" fill="none" stroke={colors.accent} strokeOpacity=".3" strokeWidth=".8" />
    <circle cx="268" cy="42" r="59" fill="none" stroke={colors.accent} strokeOpacity=".095" strokeWidth="1" />
    <circle cx="268" cy="42" r="81" fill="none" stroke={colors.accent} strokeOpacity=".07" strokeWidth="1" />
    <path d="M8 184h304" stroke={colors.accent} strokeOpacity=".16" strokeWidth=".7" />
    <g data-scene-focus="true" fill="none" style={sceneSurface}>
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
