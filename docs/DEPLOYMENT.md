# GitHub Pages 배포 안내

이 문서는 배포 절차입니다. 현재 사이트가 배포되었다는 기록은 아닙니다. 이 저장소는 Next.js 정적 내보내기를 사용하며 결과물은 `out/`입니다.

## 1. 공개 주소 결정

| 사이트 형태 | `NEXT_PUBLIC_BASE_PATH` | `NEXT_PUBLIC_SITE_URL` |
| --- | --- | --- |
| 프로젝트 사이트 | `/저장소명` | `https://계정.github.io/저장소명` |
| 사용자·조직 루트 사이트 | 빈 문자열 | `https://계정.github.io` |
| 루트 경로의 별도 도메인 | 빈 문자열 | `https://example.org` |

두 값은 **빌드 환경 변수**입니다. `NEXT_PUBLIC_SITE_URL`은 도메인뿐 아니라 프로젝트 사이트의 경로까지 포함하고 마지막 `/`는 붙이지 않습니다. `NEXT_PUBLIC_BASE_PATH`는 `/`로 시작하고 마지막 `/`는 붙이지 않습니다. 주소가 바뀌면 다시 빌드해야 합니다. [Next.js basePath 문서](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath)는 이 값이 빌드 시 번들에 반영된다고 설명합니다.

PowerShell 로컬 예시:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/cybersecurity-career-wiki"
$env:NEXT_PUBLIC_SITE_URL = "https://example.github.io/cybersecurity-career-wiki"
npm ci
npm run build
```

이 예시 주소를 실제 계정과 저장소 주소로 바꾸세요. 환경 변수가 비어 있으면 루트 경로에서 빌드됩니다.

## 2. 저장소 설정과 워크플로

저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다. `.github/workflows/`의 배포 워크플로가 기본 브랜치에서 빌드하고 `out/`을 Pages 아티팩트로 업로드하도록 확인합니다. 배포 작업에는 `pages: write`, `id-token: write` 권한과 `github-pages` 환경이 필요합니다. [GitHub 공식 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)의 `configure-pages`, `upload-pages-artifact`, `deploy-pages` 흐름을 따릅니다.

포함된 워크플로는 저장소 이름에서 프로젝트 사이트의 base path와 공개 주소를 자동 계산합니다. `계정.github.io` 저장소는 루트 사이트로 계산합니다. 별도 도메인을 쓴다면 저장소 변수 `SITE_URL`에 전체 공개 주소를, `BASE_PATH`에 경로 부분(루트라면 빈 문자열)을 넣고 Pages 저장소 설정에서 도메인을 지정합니다. 저장소 안의 `CNAME` 파일만으로 도메인이 설정되지는 않습니다([GitHub 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)). 풀 리퀘스트 검증과 기본 브랜치 배포를 구분하고, 배포 권한은 기본 브랜치 작업에만 부여합니다.

## 3. 배포 전후 확인

로컬 또는 CI에서 `npm run build`가 완료되면 `out/index.html`, `out/404.html`, `out/search-index.json`, `out/sitemap.xml`, `out/robots.txt`, `out/.nojekyll`과 게시된 직무·토픽 페이지가 있는지 확인합니다. `scripts/verify-build.ts`가 이 필수 파일을 검사합니다.

배포 작업이 성공한 뒤 실제 공개 주소에서 첫 화면, 직무 상세, 검색, 404, CSS·이미지, `sitemap.xml`을 열어 보세요. 프로젝트 사이트에서 자산이 404라면 base path와 site URL의 경로 부분을 먼저 비교합니다. 실패한 워크플로의 로그와 [테스트 안내](TESTING.md)를 함께 확인합니다.
