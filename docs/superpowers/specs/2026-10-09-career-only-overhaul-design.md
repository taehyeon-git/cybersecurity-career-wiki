# Career-only wiki overhaul

## Intent and scope

This site helps a Korean reader understand cybersecurity **jobs and career decisions**. The public site will contain a start guide, a complete role directory, career preparation paths, and a glossary. Standalone technical lessons, role comparison pages, and the knowledge map are removed from navigation, search, sitemap, static export, and source content.

The directory will cover 44 distinct roles: the existing 20 plus 24 supported by the Korean NCS information-security SQF, NICE/ECSF role descriptions, and official company job postings. Avoid splitting a single occupation merely to reach a number. These are descriptions of work, not claims that each label is a universal hiring title.

## Information architecture

The six folders represent actual work areas: security strategy and management (`management`), design and development (`development`), implementation and operation (`operations`), assessment and evaluation (`assessment`), monitoring and incident response (`response`), and security sales and customer support (`customer`). They are based on the NCS information-security SQF subindustry areas, with practical hiring titles under each. Explain this provenance and the fact that a posting can combine several roles.

Routes that remain: `/`, `/start/`, `/careers/`, `/careers/[slug]/`, `/roadmaps/`, `/roadmaps/[slug]/`, `/glossary/`. Removed public routes return the static host's 404. Navigation, search, related links, sitemap, README and metadata use only the remaining routes.

## Content contract

Role articles explain responsibility, recurring work, decisions, concrete outputs and who uses them, collaborators, junior and experienced entry, working conditions where known, portfolio evidence, and a directly linked hiring example when the official posting verifies one. They do not teach underlying technology. The source strength of each hiring example is visible: full posting, title only, or no role-specific posting verified. No general claims about pay, demand, universal certifications, or junior eligibility arise from the small hiring sample. Existing research records its sample bias.

The seven roadmap URLs become **career preparation paths**: choose a role, inspect postings, build a relevant work sample, obtain feedback, and prepare applications/interviews. They contain no standalone technical curriculum or topic links. The glossary remains as short definitions; every displayed source is traceable, and topic links are removed.

## Presentation and behavior

Keep the restrained old-web folder look. Home, sidebar and role index show the same six folders and counts. Keep search and mobile navigation keyboard accessible: focus enters modal/drawer, Tab stays within it, Escape closes it, and focus returns to its trigger. Increase small reading text on mobile. Preserve clear provenance and review dates.

## Verification

Tests cover valid category IDs, live role references and glossary sources, public search scope, and removal of old routes from the static export. Lint, typecheck, content validation, unit tests, static build, and a browser smoke test run before deployment. Verify the live GitHub Pages URL after publishing.
