# 검증 안내

저장소 루트에서 `npm ci` 후 실행합니다. 로컬 성공은 실제 GitHub Pages 공개 주소의 동작까지 보증하지 않으므로 배포 후 확인도 필요합니다.

| 명령 | 확인 범위 |
| --- | --- |
| `npm run typecheck` | TypeScript 정적 검사 |
| `npm run lint` | ESLint 검사 |
| `npm test` | `tests/*.test.ts` 단위 테스트(참조·검색·URL 등) |
| `npm run content:check` | MDX frontmatter Zod 스키마, 출처 ID, 문서 참조, 슬러그·ID 중복 |
| `npm run search:build` | 게시 문서에서 `public/search-index.json` 생성 |
| `npm run build` | 콘텐츠 검사, 검색 색인 생성, Next.js 정적 내보내기, RSC 별칭 생성, 필수 출력 확인 |
| `npm run build:verify` | `out/`의 필수 파일과 게시된 역할·토픽 상세 HTML 검사 |

`npm run build`가 검증의 마지막 관문입니다. `search:build`와 `build:verify`는 단독 실행할 수 있지만 각각 이전 단계의 입력·출력이 준비되어 있어야 합니다. `public/search-index.json`과 `out/`은 생성 결과이므로 수정 후 직접 고치지 말고 빌드를 다시 실행합니다.

## 변경 종류별 점검

- **콘텐츠:** `content:check`와 `build` 결과, 새 문서의 목록·상세·연결 링크, 출처가 실제 문장을 뒷받침하는지 확인합니다.
- **경로·검색:** 루트 및 하위 경로 빌드에서 검색 색인 요청과 결과 이동을 확인합니다. 공백·한글·영문 별칭 검색도 살핍니다.
- **UI:** 키보드 탐색, 초점 표시, 모바일 너비, 대비, 외부 링크 식별을 수동 확인합니다.
- **배포:** GitHub Actions 로그, 공개 URL의 홈·상세·검색·404·사이트맵·정적 자산을 확인합니다. 배포 절차는 [DEPLOYMENT.md](DEPLOYMENT.md)에 있습니다.

테스트가 실패하면 첫 오류 메시지와 재현 명령을 기록합니다. 콘텐츠 오류는 파일 경로와 필드, 참조 오류는 ID와 대상 컬렉션부터 확인합니다. 검증을 실행하지 못한 경우 성공했다고 적지 않습니다.
