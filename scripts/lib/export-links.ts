export function validateExportedLinks(
  pages: Map<string, string>,
  files: Set<string>,
  basePath: string,
): string[] {
  const errors: string[] = [];
  const prefix = basePath.replace(/\/+$/, "");
  const idsByPage = new Map<string, Set<string>>();
  for (const [file, html] of pages) {
    idsByPage.set(file, new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])));
  }

  for (const [file, html] of pages) {
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replace(/&amp;/g, "&");
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      if (href.startsWith("//")) continue;

      const url = new URL(href, "https://wiki.example/");
      const path = href.startsWith("#") ? "" : url.pathname;
      if (path && prefix && path !== prefix && !path.startsWith(`${prefix}/`)) {
        errors.push(`${file}: link outside site base path ${href}`);
        continue;
      }

      const relative = path ? path.slice(prefix.length).replace(/^\//, "") : "";
      const target = path
        ? (!relative || relative.endsWith("/") ? `${relative}index.html` : relative)
        : file;
      if (!files.has(target)) {
        errors.push(`${file}: missing local target ${href}`);
        continue;
      }

      if (!url.hash) continue;
      const fragment = decodeURIComponent(url.hash.slice(1));
      if (fragment && !idsByPage.get(target)?.has(fragment)) {
        errors.push(`${file}: missing fragment #${fragment} in ${path || file}`);
      }
    }
  }
  return [...new Set(errors)];
}
