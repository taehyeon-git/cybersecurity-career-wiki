# Page Illustrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one attractive, page-specific illustration to every public wiki page while preserving readable folder navigation.

**Architecture:** A deterministic server-rendered SVG component varies pictorial motifs by page kind and identifier. Shared document and top-level page headers render it once. CSS keeps the illustration secondary to text. Static-output and browser checks enforce coverage and responsive accessibility.

**Tech Stack:** Next.js App Router, React SVG, TypeScript, CSS, Playwright, static GitHub Pages export.

**Spec:** `docs/superpowers/specs/2026-10-26-page-illustrations-design.md`

## Global Constraints

- Keep the existing GitHub Pages project path and static export.
- Preserve the old-style folder wiki layout and Korean career-only content.
- Cover 96 canonical pages and avoid loading external image assets.
- One SVG per page, with a useful Korean `aria-label` and no duplicate image semantics.

## Review Focus

- Missing illustration on a top-level or detail route: assert all 96 exported HTML files contain exactly one marker.
- Repeated identity across unrelated pages: assert identifiers differ for representative routes.
- Mobile overflow: inspect 320px and 390px representative pages.
- Title displacement: ensure the H1 remains visible and precedes the illustration in reading order.
- SVG semantics: assert a single named `role="img"` per representative page.

---

### Task 1: Illustration component

**Files:** Create `src/components/illustration/PageIllustration.tsx` and any focused helper in that directory.

**Interface:** `PageIllustration({ kind, id, title, className })` where `kind` is `home | start | fields | careers | roadmaps | glossary | field | role | roadmap`.

- [ ] Read the applicable local Next.js documentation and existing wiki styling.
- [ ] Build a semantic deterministic SVG composition that varies by kind and identifier.
- [ ] Mark the SVG with `data-wiki-illustration`, `role="img"`, and a Korean `aria-label`.
- [ ] Verify unique identities and lightweight output.

### Task 2: Page integration and responsive styling

**Files:** Modify `src/components/layout/DocumentShell.tsx`, six top-level page components, and `src/app/wiki.css`.

- [ ] Place one illustration in each top-level header and the shared detail header.
- [ ] Pass route-specific kind and identifier for 15 fields, 60 roles, and 15 roadmaps.
- [ ] Cover previous category landing pages rendered by the field route.
- [ ] Add desktop/mobile/dark styling without disrupting text or folder controls.

### Task 3: Coverage and browser verification

**Files:** Modify `scripts/verify-build.ts` and `tests/e2e/site.spec.ts` where useful.

- [ ] Assert every one of the 96 canonical exported HTML files has exactly one named illustration.
- [ ] Run checks against representative mobile and desktop pages.
- [ ] Run lint, typecheck, content check, unit tests, static build, and browser tests.
- [ ] Inspect live deployed pages after GitHub Actions succeeds.
