import { canonicalUrl } from "./urls";

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>, siteUrl?: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path, siteUrl),
    })),
  };
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
