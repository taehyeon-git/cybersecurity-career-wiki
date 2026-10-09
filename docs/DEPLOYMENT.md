# GitHub Pages 배포 안내

이 저장소는 Next.js 정적 내보내기로 `out/`을 생성합니다. `.github/workflows/pages.yml`은 풀 리퀘스트와 `main` 푸시에서 검증하고, `main` 성공 빌드만 GitHub Pages에 배포합니다. 로컬에서 문서를 수정한 상태는 워크플로가 완료되기 전까지 공개 사이트에 반영되지 않습니다.

## 공개 주소와 빌드 변수

| 사이트 형태 | `NEXT_PUBLIC_BASE_PATH` | `NEXT_PUBLIC_SITE_URL` |
| --- | --- | --- |
| 프로젝트 사이트 | `/저장소명` | `https://계정.github.io/저장소명` |
| 사용자·조직 루트 사이트 | 빈 문자열 | `https://계정.github.io` |
| 루트 경로의 별도 도메인 | 빈 문자열 | `https://example.org` |

`NEXT_PUBLIC_SITE_URL`은 프로젝트 사이트의 경로까지 포함하고 마지막 `/`는 빼야 합니다. `NEXT_PUBLIC_BASE_PATH`는 비어 있거나 `/`로 시작하며 마지막 `/`를 붙이지 않습니다. 값은 빌드에 반영되므로 주소를 바꾸면 다시 빌드합니다. [Next.js basePath 문서](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath)를 참고하세요.

워크플로는 저장소 이름으로 GitHub Pages 주소를 계산합니다. `계정.github.io` 저장소는 루트 경로를 사용합니다. 별도 도메인은 저장소 변수 `SITE_URL`과 `BASE_PATH`를 함께 설정하고 Pages 설정에도 도메인을 등록합니다. `SITE_URL`을 지정하면 `BASE_PATH`의 값이 기본 계산값을 덮습니다. `CNAME` 파일만 추가해서 배포 설정이 끝나는 것은 아닙니다.

로컬에서 프로젝트 사이트 경로를 확인하려면 PowerShell에서 다음과 같이 설정합니다. 예시 계정명은 실제 주소로 바꿉니다.

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/cybersecurity-career-wiki"
$env:NEXT_PUBLIC_SITE_URL = "https://example.github.io/cybersecurity-career-wiki"
npm ci
npm run build
```

## 저장소 설정과 배포 순서

1. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. 풀 리퀘스트에서는 Node 24로 `npm ci`, lint, typecheck, 콘텐츠 검사, 단위 테스트, 빌드, Playwright Chromium E2E가 실행되는지 확인합니다.
3. `main` 푸시에서는 같은 검증 후 `out/`을 Pages 아티팩트로 업로드하고 `github-pages` 환경에 배포합니다. 배포 작업은 `pages: write`, `id-token: write` 권한을 사용합니다.
4. 실제 배포 URL과 배포 시각은 해당 GitHub Actions 실행 및 Pages 설정에서 확인합니다. [GitHub 공식 맞춤 워크플로 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)를 참고하세요.

## 배포 검증

`npm run build`는 `out/index.html`, `out/404.html`, `out/search-index.json`, `out/sitemap.xml`, `out/robots.txt`, `out/.nojekyll`과 게시된 직무·커리어 경로의 상세 출력을 확인합니다. 검색 색인에는 직무·경로·용어만 포함되어야 합니다. 제거된 `/knowledge/`, `/comparisons/`, `/knowledge-map/` 경로가 출력과 색인에 남으면 빌드를 수정합니다.

배포 후 공개 URL에서 홈, 직무 목록·상세, 11개 커리어 경로, 용어집, 검색, 404, 사이트맵, CSS·이미지를 수동 확인합니다. Playwright E2E는 빌드된 `out/`을 검사하며 실제 공개 URL의 상태까지 확인하지는 않습니다. 프로젝트 사이트에서 자산이 404라면 `BASE_PATH`와 `SITE_URL`의 경로를 비교합니다. 자세한 검사 범위는 [검증 안내](TESTING.md)에 있습니다.
