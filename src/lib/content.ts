import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { validateGlossaryReferences, validateReferences, type ReferenceDocument } from "./validation";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const baseSchema = z.object({
  id: slug,
  slug,
  titleKo: z.string().min(2),
  titleEn: z.string().min(2),
  aliases: z.array(z.string()).default([]),
  summary: z.string().min(20),
  sourceIds: z.array(slug).min(1),
  reviewedAt: z.string(),
  publicationStatus: z.enum(["draft", "needs-review", "published", "outdated"]),
});
const roleSchema = baseSchema.extend({
  category: z.enum(["management", "development", "operations", "assessment", "response", "customer"]),
  responsibilities: z.array(z.string()).min(1),
  typicalTasks: z.array(z.string()).min(1),
  keyDeliverables: z.array(z.string()).min(1),
  relatedRoleIds: z.array(slug).default([]),
  roadmapIds: z.array(slug).default([]),
  reviewStatus: z.enum(["reviewed", "needs-review"]).default("needs-review"),
}).strict();
const roadmapSchema = baseSchema.extend({
  roleIds: z.array(slug).default([]),
}).strict();

export type Role = z.infer<typeof roleSchema> & { body: string; filePath: string };
export type Roadmap = z.infer<typeof roadmapSchema> & { body: string; filePath: string };
export type Source = {
  id: string;
  title: string;
  organization: string;
  url: string;
  version?: string;
  checkedAt: string;
  kind: string;
  notes?: string;
};
export type Collection = "roles" | "roadmaps";

const schemas = { roles: roleSchema, roadmaps: roadmapSchema };

function readMdxFiles(kind: Collection): Array<{ data: unknown; body: string; filePath: string }> {
  const directory = path.join(process.cwd(), "src", "content", kind);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .sort()
    .map((name) => {
      const filePath = path.join(directory, name);
      const parsed = matter(fs.readFileSync(filePath, "utf8"));
      return { data: parsed.data, body: parsed.content.trim(), filePath };
    });
}

export function loadCollection(kind: "roles"): Role[];
export function loadCollection(kind: "roadmaps"): Roadmap[];
export function loadCollection(kind: Collection): Array<Role | Roadmap> {
  return readMdxFiles(kind).map(({ data, body, filePath }) => {
    const parsed = schemas[kind].safeParse(data);
    if (!parsed.success) throw new Error(`${filePath}: ${parsed.error.message}`);
    if (parsed.data.publicationStatus === "published" && body.length < 1800) {
      throw new Error(`${filePath}: published career article must contain at least 1800 characters`);
    }
    return { ...parsed.data, body, filePath } as Role | Roadmap;
  });
}

export function publishedRoles() { return loadCollection("roles").filter((item) => item.publicationStatus === "published"); }
export function publishedRoadmaps() { return loadCollection("roadmaps").filter((item) => item.publicationStatus === "published"); }

export function loadSources(): Source[] {
  const file = path.join(process.cwd(), "src", "data", "sources.json");
  return z.array(z.object({
    id: slug, title: z.string().min(2), organization: z.string().min(2), url: z.url(),
    version: z.string().optional(), checkedAt: z.string(), kind: z.string(), notes: z.string().optional(),
  })).parse(JSON.parse(fs.readFileSync(file, "utf8")));
}

export function validateContent(): string[] {
  const roles = loadCollection("roles");
  const roadmaps = loadCollection("roadmaps");
  const sources = loadSources();
  const sourceIds = new Set(sources.map((source) => source.id));
  const refs: ReferenceDocument[] = [
    ...roles.map((item) => ({ kind: "role" as const, id: item.id, slug: item.slug, publicationStatus: item.publicationStatus, sourceIds: item.sourceIds, relatedRoleIds: item.relatedRoleIds })),
    ...roadmaps.map((item) => ({ kind: "roadmap" as const, id: item.id, slug: item.slug, publicationStatus: item.publicationStatus, sourceIds: item.sourceIds, relatedRoleIds: item.roleIds })),
  ];
  const errors = validateReferences(refs, sourceIds);
  const roadmapIds = new Set(roadmaps.map((item) => item.id));
  for (const role of roles) for (const roadmapId of role.roadmapIds) if (!roadmapIds.has(roadmapId)) errors.push(`${role.id}: missing roadmap ${roadmapId}`);
  for (const source of sources) if (sources.filter((item) => item.id === source.id).length > 1) errors.push(`duplicate source id: ${source.id}`);
  const terms = z.array(z.object({ term: z.string().min(1), english: z.string().min(1), definition: z.string().min(10), sourceIds: z.array(slug).min(1) }).strict()).parse(JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "content", "glossary", "terms.json"), "utf8")));
  errors.push(...validateGlossaryReferences(terms, sourceIds));
  for (const item of [...roles, ...roadmaps]) if (/\/(?:knowledge|comparisons|knowledge-map)\//.test(item.body)) errors.push(`${item.id}: removed section link in body`);
  return [...new Set(errors)];
}

export function tableOfContents(body: string): Array<{ id: string; title: string }> {
  return body.split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const title = line.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
      return { title, id: headingId(title) };
    });
}

export function headingId(text: string): string {
  return text.toLocaleLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}
