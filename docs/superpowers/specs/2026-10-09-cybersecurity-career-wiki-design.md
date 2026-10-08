# Cybersecurity Career Wiki — design

## Purpose

Build a Korean, freely readable cybersecurity career wiki. A first-time reader should find a role, understand its work and artifacts, follow connected technical topics and a staged learning path, compare nearby roles, and inspect evidence. The supplied master prompt is the project brief; its GitHub Pages, Next.js App Router, TypeScript, Tailwind, MDX, and static-export constraints are binding.

## Reader journey and visual direction

The home page introduces five navigation paths: start here, careers, knowledge, roadmaps, and comparisons. A concise search is available throughout. Career pages are the editorial center, with a left navigation, readable main column, and right table of contents on wide screens. On phones the navigation becomes a drawer and the article fills the width. Typography, spacing, restrained blue accents, and clear source labels take priority over effects.

## Content architecture

Each article is a repository-owned MDX file with YAML metadata. Roles, topics, roadmaps, and comparisons have separate schemas and independent URL spaces. IDs link them many-to-many. A source registry stores inspected official references, their version and checking date. Published pages alone enter navigation, search, sitemap, and comparisons. A build-time validator rejects missing references, duplicate slugs, invalid status, and thin published articles. Data unavailable from a verifiable source remains explicit as an evidence gap.

## Static application architecture

Next.js pre-renders every MDX route with `generateStaticParams`. Server components read local files at build time; browser interactions are limited to search, filters, compare selection, menu and theme. A build script emits a small JSON search index from published content. `basePath` is configured once for Next links; plain static-file fetch URLs use a separate helper. The same build supports root and project GitHub Pages URLs. There is no server, API route, database, or account.

## QA and operations

CI validates source and content references, types, lint, unit tests, static build, and exported file presence before Pages artifact upload. PRs only verify. Pushes to main deploy through the official GitHub Pages artifact flow. Documentation covers source policy, editorial review, local use, and repository setup. A local build proves buildability, while actual publication needs a user-owned GitHub repository and Pages setting.

## Scope judgment

The requested 20 roles, 24 topics, seven roadmaps, nine comparisons and glossary are targets. Each published page needs specific useful information and traceable sources. A smaller grounded set is preferable to filler. Domestic job-market claims are restricted to verified public samples and their limitations.
