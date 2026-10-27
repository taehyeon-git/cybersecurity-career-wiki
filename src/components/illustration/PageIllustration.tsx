import Image from "next/image";
import { assetUrl } from "@/lib/urls";
import { pagePhotoManifest } from "./PagePhotoManifest";

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

function photoIdentity(kind: PageIllustrationKind, id?: string): string {
  if (kind === "start" && id === "not-found") return "index:not-found";
  if (kind === "fields" && id?.startsWith("legacy-")) return `legacy:${id.slice("legacy-".length)}`;
  if (kind === "field" || kind === "role" || kind === "roadmap") {
    if (!id) throw new Error(`Missing photo identifier for ${kind}`);
    return `${kind}:${id}`;
  }
  return kind === "home" ? "home" : `index:${kind}`;
}

export function PageIllustration({ kind, id, title, className }: PageIllustrationProps) {
  const identity = photoIdentity(kind, id);
  const photo = pagePhotoManifest[identity];
  if (!photo) throw new Error(`Missing wiki photo: ${identity}`);
  const isHome = identity === "home";

  return <Image
    className={["page-illustration", className].filter(Boolean).join(" ")}
    data-wiki-photo={identity}
    data-photo-description={photo.description}
    src={assetUrl(photo.src)}
    alt={`${title}: ${photo.description}`}
    width={isHome ? 1993 : 960}
    height={isHome ? 789 : 600}
    sizes="(max-width: 650px) 320px, (max-width: 1070px) 340px, 320px"
    unoptimized
    loading="eager"
  />;
}
