# 구조

## 공개 화면과 데이터 흐름

이 프로젝트는 Next.js 16 App Router와 TypeScript를 사용합니다. `next.config.ts`의 `output: "export"`와 `trailingSlash: true`에 따라 빌드가 각 경로의 `index.html`을 `out/`에 만듭니다. GitHub Pages는 정적 파일만 제공합니다. 실행 중인 Next.js 서버, 계정, 데이터베이스, 사용자별 저장 기능은 없습니다.

2026-10-25 공개 콘텐츠 스냅샷은 보호 대상별 분야 안내 **15개**, 직무 **60개**, 커리어 준비 경로 **15개**, 용어 **62개**입니다. 분야는 네 묶음의 15개 보호 대상·기술 환경으로, 직무는 별도의 9개 업무 직무군으로 표시됩니다.

```text
src/content/fields/*.mdx ─┐
src/content/roles/*.mdx ──┤
src/content/roadmaps/*.mdx ├─ gray-matter → Zod 및 참조 검사 → 정적 페이지
src/content/glossary/terms.json ┘                   │
                                                    └─ 검색 색인 → out/search-index.json

src/data/sources.json → 분야·직무·경로·용어의 출처 ID 검증과 화면 출처 링크
```

공개 경로는 `/`, `/start/`, `/fields/`, `/fields/[slug]/`, `/careers/`, `/careers/[slug]/`, `/roadmaps/`, `/roadmaps/[slug]/`, `/glossary/`입니다. 새 분야 상세 URL은 `/fields/system/`, `/fields/web/`, `/fields/ot/`처럼 보호 대상 ID를 사용합니다. 예전 직무군 기반 `/fields/management/` 등 9개 주소에는 새 분야·직무 목록으로 연결하는 이동 안내를 두고 색인 제외 메타데이터를 지정합니다. 새 검색 색인·사이트맵에서는 이 주소들을 제외합니다. 그 외 문서가 없는 주소는 404 화면으로 갑니다. 이전 기술 지식 문서, 직무 비교, 지식 지도 경로도 제거됐고 검색 색인과 사이트맵에 포함되지 않습니다.

## 주요 모듈

| 구성 | 책임 |
| --- | --- |
| `src/lib/content.ts` | 분야·직무·경로 MDX 로드, Zod 스키마, 게시 상태 필터, 용어·출처 검증 |
| `src/lib/validation.ts` | ID·슬러그·출처·직무 연결과 용어집 출처 검사 |
| `src/lib/site-data.ts` | 15개 분야와 네 묶음, 별도의 9개 직무군, 주요 탐색 경로와 상세 URL |
| `src/lib/search.ts` | 한국어·영어·별칭·요약·본문 검색 정규화와 순위 |
| `src/lib/urls.ts` | GitHub Pages 하위 경로 자산 URL과 공개 기준 URL |
| `scripts/build-search.ts` | 게시 분야·직무·경로와 용어를 브라우저용 JSON으로 생성 |
| `scripts/verify-build.ts` | 필수 정적 출력과 삭제된 경로·검색 항목 확인 |
| `src/data/sources.json` | 출처의 URL, 버전, 확인일과 사용 맥락 |

검색은 빌드 때 생성한 `public/search-index.json`을 브라우저에서 읽습니다. 게시된 15개 분야·직무·경로는 제목, 영문명, 별칭, 요약, 본문 앞부분이 검색 대상이며 용어집은 용어·영문명·뜻으로 검색됩니다. 옛 직무군 기반 분야 안내는 검색 문서로 다시 넣지 않습니다. 새로운 글이나 별칭을 게시하면 재빌드가 필요합니다. 검색 순위는 이름의 정확한 일치, 접두사, 부분 일치, 요약, 본문 순서입니다.

왼쪽 폴더 탐색과 첫 화면에는 **보안 분야** 폴더와 **보안 직무** 폴더가 있습니다. 분야는 인프라·접근(5), 서비스·소프트웨어(4), 정보·신뢰(2), 산업·기기(4)의 네 묶음으로 15개 환경을 찾습니다. 직무는 공개 역할 60개를 주 책임에 따른 9개 직무군으로 찾습니다. 각 분야 MDX의 `roleIds`는 연결할 게시 직무를 명시합니다. 분야와 직무는 다대다로 연결되어 분야 상세에서 여러 직무군의 역할로, 직무 상세에서 여러 보호 대상 분야로 이동할 수 있습니다. 분야 ID는 `src/lib/site-data.ts`의 `fieldDomains`, 직무군 ID는 같은 파일의 `roleCategories`가 정의합니다. 두 축 모두 위키의 편집 분류이며 NCS 정보보호 SQF, NIST NICE, ENISA ECSF의 공식 분류와 동일하다고 주장하지 않습니다. 공식 체계와 채용 사례는 개별 책임과 경계를 검토하는 근거입니다. 경찰 임용과 민간 취업, 연구직과 교육 운영의 지원 조건은 각 직무·경로 문서에서 구분합니다. 경로는 직무에 진입하기 위한 준비 예시이며 정해진 승진 사다리가 아닙니다.

## 정적 내보내기와 URL

`NEXT_PUBLIC_BASE_PATH`는 프로젝트 사이트의 경로 접두사(예: `/cybersecurity-career-wiki`)이고, `NEXT_PUBLIC_SITE_URL`은 그 접두사까지 포함한 공개 기준 주소입니다. 두 값은 빌드 시 결정됩니다. `src/app/sitemap.ts`는 새로 게시된 15개 분야·직무·경로와 고정 화면을 열거합니다. 옛 `/fields/{직무군}/` 이동 안내는 사이트맵에 넣지 않습니다.

Next.js 정적 내보내기에서 일부 링크가 점으로 이어진 RSC 파일명을 요청하는 [공개 이슈](https://github.com/vercel/next.js/issues/85374)에 대응해 `scripts/fix-rsc-export.ts`가 빌드된 RSC 파일의 별칭을 `out/`에 추가합니다. 이 단계와 `scripts/verify-build.ts`의 파일 존재 검사는 브라우저의 모든 이동을 자동으로 증명하지 않습니다. 공개 주소의 실제 동작은 [테스트 안내](TESTING.md)에 따라 따로 확인합니다.

## 콘텐츠 경계

분야 페이지는 보호 대상의 범위와 인접 분야의 경계, 실제 하루의 판단·협업·산출물, 연관 직무와 진입 방법을 설명합니다. 직무 페이지는 일의 책임, 업무 흐름, 산출물, 협업, 채용 근거와 진입 방법을 설명합니다. 경로 페이지는 목표 직무에 도달하기 위한 준비 활동과 포트폴리오 예시를 제시합니다. 용어집은 글을 읽는 데 필요한 용어를 간결하게 풉니다. 독립적인 기술 개념 강의는 공개하지 않습니다. 모든 주요 주장에 맞는 출처를 연결하고, 국내 채용 표본의 제한은 [조사 기록](research/korean-job-market.md)에 남깁니다.
