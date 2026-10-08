# 사이버보안 커리어 위키

한국어로 보안 직무, 핵심 지식, 학습 경로, 직무 간 차이를 탐색하는 공개 위키입니다. 고전 위키의 폴더 탐색기처럼 왼쪽 문서 트리나 첫 화면의 폴더를 펼쳐 글을 찾을 수 있습니다. 직무 이름과 도구 이름을 구분하고, 공식 프레임워크와 확인 가능한 국내 채용공고를 근거로 설명합니다. 경로와 요구 역량은 참고용이며 채용 요건을 보증하지 않습니다.

**공개 사이트:** [사이버보안 커리어 위키 바로 열기](https://taehyeon-git.github.io/cybersecurity-career-wiki/)

## 실행

Node.js와 npm을 준비한 뒤 저장소 루트에서 실행합니다.

```bash
npm ci
npm run dev
```

로컬 개발 서버 주소는 터미널 출력에서 확인합니다. 배포용 정적 파일은 `npm run build`가 `out/`에 만듭니다. 서버, 데이터베이스, 로그인 기능은 필요하지 않습니다.

## 콘텐츠와 검증

| 위치 | 내용 |
| --- | --- |
| `src/content/roles/` | 직무 상세 |
| `src/content/topics/` | 지식과 기술 |
| `src/content/roadmaps/` | 학습 경로 |
| `src/content/comparisons/` | 두 직무 비교 |
| `src/data/sources.json` | 출처 ID와 공식 URL |
| `docs/research/` | 분류 근거와 국내 공고 표본의 한계 |

각 문서는 MDX와 YAML frontmatter로 작성합니다. 필수 필드와 연결 규칙은 [콘텐츠 모델](docs/CONTENT_MODEL.md), 사실 확인 기준은 [콘텐츠 작성 지침](docs/CONTENT_GUIDELINES.md)에 있습니다. `published` 문서만 공개 목록과 검색 색인에 포함됩니다.

```bash
npm run typecheck
npm run lint
npm test
npm run content:check
npm run build
```

`npm run build`는 콘텐츠 검사 → `public/search-index.json` 생성 → Next.js 정적 내보내기 → RSC 호환 파일 생성 → 필수 출력 확인 순서로 실행됩니다. 자세한 검증 범위는 [테스트 안내](docs/TESTING.md)를 참조하세요.

## 배포 설정

`main` 브랜치에 변경 사항을 푸시하면 GitHub Actions가 검사와 정적 빌드를 거쳐 GitHub Pages에 배포합니다. 다른 GitHub Pages 프로젝트 사이트라면 `NEXT_PUBLIC_BASE_PATH=/저장소명`, `NEXT_PUBLIC_SITE_URL=https://계정.github.io/저장소명`을 빌드 환경에 지정합니다. 루트 도메인 사이트는 base path를 비웁니다. 사이트 URL은 하위 경로까지 포함한 공개 기준 주소입니다. 설정 절차와 배포 전 확인 항목은 [배포 안내](docs/DEPLOYMENT.md)에 있습니다.

## 참여와 라이선스

[기여 안내](CONTRIBUTING.md)와 [행동 강령](CODE_OF_CONDUCT.md)을 읽고 이슈 또는 풀 리퀘스트를 남겨주세요. 코드 라이선스는 [MIT](LICENSE)입니다. 자체 제작 설명문에 권장하는 CC BY 4.0 적용 범위와 외부 자료의 권리 구분은 [콘텐츠 라이선스](CONTENT_LICENSE.md)에 정리했습니다.
