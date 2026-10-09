# 검증 안내

저장소 루트에서 `npm ci` 후 실행합니다. 이 저장소의 공개 콘텐츠는 직무 46개, 커리어 경로 11개, 용어 69개입니다. 개수는 작성 시점(2026-10-09)의 스냅샷이며 파일 상태가 바뀌면 다시 집계합니다.

| 명령 | 실제 확인 범위 |
| --- | --- |
| `npm run typecheck` | TypeScript 정적 검사 |
| `npm run lint` | ESLint 검사 |
| `npm test` | `tests/*.test.ts`의 URL·검색·콘텐츠 범위 등 코드 검사 |
| `npm run content:check` | MDX frontmatter 스키마, 게시 본문 길이, 출처·직무·경로 참조, 중복 ID·슬러그, 용어 데이터, 제거된 경로 링크 |
| `npm run search:build` | 게시된 직무·커리어 경로와 용어에서 `public/search-index.json` 생성 |
| `npm run build` | 콘텐츠 검사 → 검색 색인 생성 → Next.js 정적 내보내기 → RSC 별칭 생성 → 출력 확인 |
| `npm run build:verify` | `out/` 필수 파일, 게시 직무·경로 HTML, 제거된 경로의 출력·검색 색인 잔존 여부 확인 |
| `npm run test:e2e` | Playwright Chromium으로 빌드된 `out/`을 서빙해 홈·직무 이동, 검색과 초점 복귀, 모바일 탐색기, 제거된 경로의 404, 용어 출처를 확인 |

`search:build`는 유효한 콘텐츠를, `build:verify`는 이미 생성된 `out/`을 필요로 합니다. `public/search-index.json`과 `out/`은 생성물입니다. 직접 수정한 뒤 검증 결과로 취급하지 말고 빌드를 다시 실행합니다.

## 브라우저 E2E 실행

저장소 루트에서 프로덕션 정적 출력을 먼저 만들고 Chromium을 설치한 뒤 실행합니다.

```bash
npm ci
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright 설정은 `scripts/serve-export.ts`로 `out/`을 기본 포트 4187에서 자동 서빙합니다. 별도 개발 서버를 실행할 필요는 없습니다. 프로젝트 하위 경로로 빌드했다면 빌드와 E2E 실행 때 같은 `NEXT_PUBLIC_BASE_PATH`를 유지합니다. GitHub Actions는 빌드 뒤 `npx playwright install --with-deps chromium`과 `npm run test:e2e`를 실행합니다.

## 변경별 확인

- **직무·경로·용어:** `content:check`와 `build`를 실행합니다. 목록과 상세 화면에서 제목, 담당 범위, 산출물, 연관 경로, 용어 출처를 읽고 실제 인용 근거와 대조합니다. 스키마 통과만으로 내용의 정확성이 보장되지는 않습니다.
- **검색·URL:** 검색 색인 유형이 `role`, `roadmap`, `glossary`인지 확인합니다. 한글 직무명, 영문 이름, 별칭, 공백을 넣은 질의를 실제 화면에서 확인합니다. 프로젝트 하위 경로 배포 시 검색 요청과 결과 링크의 base path도 확인합니다.
- **제거된 화면:** `/knowledge/`, `/comparisons/`, `/knowledge-map/`이 생성 출력과 검색 색인에 없는지 확인합니다. 구버전 외부 링크는 별도 수동 점검이 필요합니다.
- **UI:** 폴더 펼침, 키보드 이동과 초점, 모바일 너비, 대비, 외부 링크 식별, 용어집 A–Z 폴더 및 검색을 수동 확인합니다.
- **배포:** GitHub Actions 성공 후 공개 URL의 홈·직무·경로·용어집·검색·404·사이트맵·정적 자산을 열어 봅니다. 절차는 [배포 안내](DEPLOYMENT.md)에 있습니다.

Playwright E2E는 위의 핵심 흐름만 확인합니다. 모든 문서의 내용 정확성, 외부 공고 링크의 생존, 실제 GitHub Pages 배포 환경을 자동으로 보증하지는 않습니다. 실패 시 첫 오류, 재현 명령, 파일 경로와 참조 ID를 기록합니다. 실행하지 않은 검사는 성공으로 보고하지 않습니다.
