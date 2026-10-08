import path from "node:path";

/** Next 16 can request a dotted RSC segment path although export emits folders. */
export function flattenedRscAliasPath(outDir: string, sourceFile: string): string | null {
  if (!sourceFile.endsWith(".txt")) return null;
  const relative = path.relative(outDir, sourceFile);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  const segments = relative.split(path.sep);
  const nestedStart = segments.findIndex((segment, index) => index < segments.length - 1 && segment.startsWith("__next."));
  if (nestedStart < 0) return null;
  return path.join(outDir, ...segments.slice(0, nestedStart), segments.slice(nestedStart).join("."));
}
