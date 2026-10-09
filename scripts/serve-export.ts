import { createReadStream, existsSync, realpathSync, statSync } from "node:fs";
import { createServer, type ServerResponse } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exportRoot = path.join(projectRoot, "out");
const host = "127.0.0.1";
const port = Number(process.env.PORT ?? "4187");

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be a valid TCP port");
if (!existsSync(exportRoot)) throw new Error(`Static export not found: ${exportRoot}. Run npm run build first.`);

const realExportRoot = realpathSync(exportRoot);

function parseBasePath(raw: string): string[] {
  const trimmed = raw.replace(/\/+$/, "");
  if (!trimmed || trimmed === "/") return [];
  if (!trimmed.startsWith("/") || trimmed.includes("\\") || trimmed.includes("%")) throw new Error("Invalid NEXT_PUBLIC_BASE_PATH");
  const segments = trimmed.slice(1).split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) throw new Error("Invalid NEXT_PUBLIC_BASE_PATH");
  return segments;
}

const baseSegments = parseBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
const basePath = baseSegments.length ? `/${baseSegments.join("/")}` : "";

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".wasm": "application/wasm",
};

function isWithinExport(candidate: string): boolean {
  const relative = path.relative(realExportRoot, candidate);
  return relative === "" || (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function existingFile(candidate: string): string | null {
  try {
    const realPath = realpathSync(candidate);
    return isWithinExport(realPath) && statSync(realPath).isFile() ? realPath : null;
  } catch {
    return null;
  }
}

function sendFile(response: ServerResponse, file: string, status: number, method: string) {
  const stat = statSync(file);
  response.writeHead(status, {
    "Content-Type": mimeTypes[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Content-Length": stat.size,
    "X-Content-Type-Options": "nosniff",
  });
  if (method === "HEAD") response.end();
  else createReadStream(file).on("error", () => response.destroy()).pipe(response);
}

function sendNotFound(response: ServerResponse, method: string) {
  const fallback = existingFile(path.join(realExportRoot, "404.html"));
  if (fallback) sendFile(response, fallback, 404, method);
  else {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(method === "HEAD" ? undefined : "Not found");
  }
}

const server = createServer((request, response) => {
  const method = request.method ?? "GET";
  if (method !== "GET" && method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const rawPath = (request.url ?? "/").split(/[?#]/, 1)[0];
  if (!rawPath.startsWith("/")) {
    response.writeHead(400);
    response.end();
    return;
  }

  let segments: string[];
  try {
    segments = rawPath.slice(1).split("/").filter(Boolean).map((segment) => decodeURIComponent(segment));
    if (segments.some((segment) => segment === "." || segment === ".." || segment.includes("/") || segment.includes("\\") || segment.includes("\0"))) throw new Error("Invalid path");
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  if (baseSegments.some((segment, index) => segments[index] !== segment)) {
    sendNotFound(response, method);
    return;
  }

  const relativeSegments = segments.slice(baseSegments.length);
  const candidate = path.resolve(realExportRoot, ...relativeSegments);
  if (!isWithinExport(candidate)) {
    sendNotFound(response, method);
    return;
  }

  const requestedFile = rawPath.endsWith("/") || !relativeSegments.length
    ? path.join(candidate, "index.html")
    : candidate;
  const file = existingFile(requestedFile) ?? existingFile(path.join(candidate, "index.html"));
  if (file) sendFile(response, file, 200, method);
  else sendNotFound(response, method);
});

server.listen(port, host, () => {
  process.stdout.write(`Serving ${exportRoot} at http://${host}:${port}${basePath}/\n`);
});
