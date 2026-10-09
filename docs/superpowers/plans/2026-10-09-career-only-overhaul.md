# Career-only wiki overhaul Implementation Plan

> **For agentic workers:** Use subagent-driven development for independent article sets and native implementation for shared code. Check each task after integration.

**Goal:** Ship a clean, career-only Korean cybersecurity wiki with 46 evidence-calibrated role pages and 11 career paths.

**Architecture:** Retain the static Next.js export and MDX collections for roles and career paths. Remove topic and comparison collections and all public routes to them. Use six NCS-informed work categories as the single taxonomy across home, sidebar and role index.

**Tech Stack:** Next.js 16, React 19, TypeScript, MDX, Node test runner, Playwright, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-09-career-only-overhaul-design.md`

## Global constraints

- Career content only; glossary definitions are the sole concise technical reference.
- Official hiring examples have company, title, URL, check date and evidence limit.
- Removed `/knowledge/`, `/comparisons/`, and `/knowledge-map/` routes must not enter search or sitemap.
- Public site remains a static GitHub Pages export under the configured project base path.

## Review focus

- A role without a matching official posting must say so instead of inventing requirements.
- A posting combining jobs must not be presented as one role's exclusive remit.
- Topic links inside role, roadmap, glossary or search must not survive removal.
- Dialog and mobile drawer focus must return correctly on close.
- Static export must contain all 46 role pages and no removed route pages.

### Task 1: Scope and taxonomy contract

**Files:** `src/lib/content.ts`, `src/lib/validation.ts`, `src/lib/site-data.ts`, `tests/validation.test.ts`, `tests/content-scope.test.ts`.

- [ ] Write failing tests for six categories, role and roadmap references, and absence of topic/comparison collection types.
- [ ] Run tests and confirm the expected failures.
- [ ] Implement the narrowed content schema and taxonomy.
- [ ] Run unit tests and content validation.

### Task 2: Content expansion

**Files:** `src/content/roles/*.mdx`, `src/content/roadmaps/*.mdx`, `src/data/sources.json`, research documentation.

- [ ] Add the NCS SQF source and reconcile official job-posting evidence.
- [ ] Rework the original 20 pages and add 26 distinct role pages using the content contract.
- [ ] Rewrite seven existing roadmap pages and add four career preparation paths.
- [ ] Validate all frontmatter and internal links.

### Task 3: Career-only UI and navigation

**Files:** `src/app/**`, `src/components/**`, `src/lib/search.ts`, `scripts/build-search.ts`, `scripts/verify-build.ts`, `public/search-index.json`, `tests/content-search.test.ts`.

- [ ] Write failing scope tests for public routes and search.
- [ ] Remove old route trees, page components, links and CSS; update home, start, role index/detail, career paths, sidebar, footer and metadata.
- [ ] Rebuild search and validate results contain roles, career paths and glossary only.
- [ ] Test keyboard focus, mobile layout and removed URL behavior in a browser.

### Task 4: Quality and deployment

**Files:** glossary component/data, README, docs, CI workflow and browser tests as needed.

- [ ] Validate glossary source IDs and show source links.
- [ ] Run lint, typecheck, unit tests, content check, production build and Playwright E2E; inspect export for stale routes.
- [ ] Review changes independently and fix material findings.
- [ ] Commit, push, wait for GitHub Pages deployment, and verify the live site.
