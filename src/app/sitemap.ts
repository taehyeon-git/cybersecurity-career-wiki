import type { MetadataRoute } from "next";
import { publishedRoadmaps, publishedRoles } from "@/lib/content";
import { canonicalUrl, } from "@/lib/urls";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/start/", "/careers/", "/roadmaps/", "/glossary/",
    ...publishedRoles().map((item) => `/careers/${item.slug}/`),
    ...publishedRoadmaps().map((item) => `/roadmaps/${item.slug}/`),
  ];
  return paths.map((route) => ({ url: canonicalUrl(route), changeFrequency: "monthly" as const }));
}
