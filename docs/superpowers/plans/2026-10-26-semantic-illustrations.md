# Semantic Illustrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace repeated icon-card art with recognizable subject-specific scene illustrations on every published wiki page.

**Architecture:** Keep one inline SVG per page. Split role scenes and directory scenes into focused modules, with a small `PageIllustration` wrapper for visual tokens and accessibility. Explicit Korean scene descriptions drive accessible names and coverage checks.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, SVG, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-26-semantic-illustrations-design.md`

## Global Constraints

- Preserve the existing old-style folder wiki layout and career-only scope.
- Do not add technical tutorials or imply that illustrative scenes prove hiring requirements.
- Keep one named illustration per canonical page and avoid external image requests.
- Keep all exported pages, 404 and legacy routes working on GitHub Pages.

## Review Focus

- Missing or misspelled published slugs must fail a coverage check rather than silently use a generic scene.
- Two roles with the same work environment must still depict different responsibilities.
- Mobile SVG must remain within the viewport at 320px and 390px.
- The accessible name must say what the picture shows, not only repeat the title.
- Dark mode must retain legible foreground and background contrast.

---

### Task 1: Semantic coverage tests

**Files:** `tests/illustration.test.ts`, `scripts/verify-build.ts`, `tests/e2e/site.spec.ts`

**Interfaces:** `PageIllustration({kind,id,title})` renders one `<svg data-scene-description="...">`; scene modules export per-slug description records.

- [ ] Write a source test that renders all 96 published illustrations and asserts a distinct nonempty scene description and actual scene content.
- [ ] Run it to confirm the current icon-only implementation fails the new expectation.
- [ ] Extend exported-page and browser checks to cover one image, accessibility, and responsive layout.

### Task 2: Career role scenes

**Files:** `src/components/illustration/RoleScenes.tsx`

**Interfaces:** `RoleScene({id,accent,soft,line})` returns an SVG `<g>`; `roleSceneDescriptions` maps all 60 published role slugs to Korean descriptions.

- [ ] Define a subject, work action, and output for every role from article content.
- [ ] Draw varied miniature workplace scenes; use icons only as supporting visual details.
- [ ] Run the source coverage test and TypeScript check.

### Task 3: Field, roadmap, and directory scenes

**Files:** `src/components/illustration/DirectoryScenes.tsx`

**Interfaces:** `FieldScene`, `RoadmapScene`, `IndexScene` receive `id` or `kind` and palette props; export corresponding description records.

- [ ] Draw all 15 protected environments, 15 career paths, six index pages, legacy and 404 states.
- [ ] Run the source coverage test and TypeScript check.

### Task 4: Integrate and publish

**Files:** `src/components/illustration/PageIllustration.tsx`, optionally `src/app/wiki.css`.

- [ ] Replace the old repeated template and icon-pair logic with scene-module dispatch.
- [ ] Run lint, typecheck, unit/content checks, static build verification, and representative browser checks.
- [ ] Review real page screenshots for topic recognition in light, dark, and mobile views; fix observed issues.
- [ ] Commit, push, and confirm GitHub Pages deployment.
