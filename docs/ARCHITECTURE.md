# 구조

## 요청부터 페이지까지

이 프로젝트는 Next.js 16 App Router와 TypeScript를 사용합니다. `next.config.ts`의 `output: "export"`와 `trailingSlash: true`가 빌드 시 각 경로의 `index.html`을 `out/`에 생성합니다. GitHub Pages는 생성된 정적 파일을 제공하며 실행 중인 Next.js 서버는 없습니다. Next.js의 [정적 내보내기 안내](https://nextjs.org/docs/app/guides/static-exports)에 따라 서버 액션, 요청별 렌더링, 쿠키 의존 기능은 이 구조에 넣지 않습니다.

```text
src/content/{roles,topics,roadmaps,comparisons}/*.mdx
  → gray-matter로 frontmatter 분리
  → Zod 필드 검사와 출처·문서 ID 검사
  → App Router에서 빌드 시 정적 페이지 생성
  → out/ 에 HTML·자산 출력

published 문서 → scripts/build-search.ts → public/search-index.json → out/search-index.json
```

| 구성 | 책임 |
| --- | --- |
| `src/lib/content.ts` | 컬렉션 로드, Zod 스키마, 게시 상태 필터 |
| `src/lib/validation.ts` | 출처와 문서 연결, 슬러그·ID 중복 검사 |
| `src/lib/search.ts` | 한국어·영어·별칭 검색용 정규화와 점수 계산 |
| `src/lib/urls.ts` | 하위 경로 자산 URL과 공개 기준 URL 생성 |
| `src/data/sources.json` | 재사용 가능한 출처 레지스트리 |
| `scripts/` | 콘텐츠 검사, 검색 색인 생성, 내보내기 확인 |

검색은 공개 문서를 빌드 시 JSON으로 만들고 브라우저에서 조회합니다. 새 콘텐츠가 게시되면 재빌드가 필요합니다. 검색 결과와 페이지는 서버 API나 실시간 색인에 의존하지 않습니다.

Next.js 16의 정적 내보내기에서 일부 링크가 폴더로 출력된 RSC 조각을 점으로 이어진 파일명으로 요청하는 [공개 이슈](https://github.com/vercel/next.js/issues/85374)가 있습니다. `scripts/fix-rsc-export.ts`는 빌드된 RSC 파일의 동일한 별칭을 `out/`에 추가하여 일반 정적 호스트에서도 이 요청이 200으로 응답하게 합니다.

탐색 UI는 서버 컴포넌트 `WikiFolderTree`가 공개 문서를 폴더 데이터로 만들고, 클라이언트 컴포넌트 `WikiFolderNavigation`이 펼침 상태와 현재 문서 표시를 담당합니다. 첫 화면과 목록의 폴더는 기본 HTML `details` 요소를 사용하므로 JavaScript가 늦게 로드되어도 폴더를 열 수 있습니다. 문서 본문과 검색·비교 데이터는 기존 콘텐츠 모델을 공유합니다.

## URL과 배포 경로

`NEXT_PUBLIC_BASE_PATH`는 GitHub Pages 프로젝트 사이트의 경로 접두사입니다(예: `/cybersecurity-career-wiki`). `NEXT_PUBLIC_SITE_URL`은 정규 URL의 기준이 되는 **하위 경로까지 포함한 전체 공개 주소**입니다(예: `https://example.github.io/cybersecurity-career-wiki`). 두 값은 빌드 시 결정되므로 배포 주소가 바뀌면 다시 빌드합니다. 정적 자산과 검색 색인의 경로에는 base path를 적용합니다. 자세한 예시는 [배포 안내](DEPLOYMENT.md)를 참조하세요.

## 콘텐츠 경계

역할은 직무, 토픽은 지식·기술, 로드맵은 학습 순서의 제안, 비교는 두 역할의 차이를 다룹니다. 분류는 [연구 기록](research/classification-decisions.md)의 편집 결정이며 NICE 또는 ECSF의 명칭과 완전히 같다는 뜻이 아닙니다. 관계는 문자열 ID로 연결하고 [콘텐츠 검사](TESTING.md)로 유효성을 확인합니다.
