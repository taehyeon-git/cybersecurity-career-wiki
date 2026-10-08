import type { MetadataRoute } from "next";
import { publishedComparisons, publishedRoadmaps, publishedRoles, publishedTopics } from "@/lib/content";
import { canonicalUrl, } from "@/lib/urls";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/start/", "/careers/", "/knowledge/", "/roadmaps/", "/comparisons/", "/knowledge-map/", "/glossary/",
    ...publishedRoles().map((item) => `/careers/${item.slug}/`),
    ...publishedTopics().map((item) => `/knowledge/${item.slug}/`),
    ...publishedRoadmaps().map((item) => `/roadmaps/${item.slug}/`),
    ...publishedComparisons().map((item) => `/comparisons/${item.slug}/`),
  ];
  return paths.map((route) => ({ url: canonicalUrl(route), changeFrequency: "monthly" as const }));
}
