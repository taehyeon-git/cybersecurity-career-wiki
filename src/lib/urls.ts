export function assetUrl(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""): string {
  const prefix = basePath === "/" ? "" : `/${basePath.replace(/^\/+|\/+$/g, "")}`;
  const cleanPrefix = prefix === "/" ? "" : prefix;
  const cleanPath = `/${path.replace(/^\/+/, "")}`;
  return cleanPath.startsWith(`${cleanPrefix}/`) && cleanPrefix ? cleanPath : `${cleanPrefix}${cleanPath}`;
}

export function canonicalUrl(path: string, siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"): string {
  const site = siteUrl.replace(/\/+$/, "");
  const route = `/${path.replace(/^\/+/, "")}`;
  return `${site}${route}`;
}
