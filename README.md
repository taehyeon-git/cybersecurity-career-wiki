# Cybersecurity Career Wiki

보안 분야에서 어떤 일을 하는지, 어떻게 진입하고 경력을 넓힐지 살펴보는 한국어 위키입니다. 고전 위키처럼 폴더를 펼쳐 **15개 보안 분야 안내**, **60개 직무**, **15개 커리어 준비 경로**, **63개 커리어 용어**를 탐색할 수 있습니다. 분야 안내는 시스템·웹·OT처럼 **무엇을 보호하는지**를 기준으로, 직무 목록은 **어떤 일을 맡는지**를 기준으로 찾습니다. 독립적인 기술 강의, 직무 비교, 지식 지도는 제공하지 않습니다.

**공개 사이트:** [Cybersecurity Career Wiki](https://taehyeon-git.github.io/cybersecurity-career-wiki/)

이 위키는 [NCS 정보보호 SQF](https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8), [NIST NICE](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions), [ENISA ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf), 보호 대상별 공식 자료와 기업의 공식 채용공고를 참고합니다. **15개 분야와 네 묶음은 이 위키의 편집 분류**이며, 어느 한 기관의 공식 분류를 그대로 옮긴 것이 아닙니다. 프레임워크의 업무 역할과 기업의 채용 직함도 같지 않습니다. 국내 공고 표본은 시장 전체를 대표하지 않으므로, 개별 기업의 경력·자격 요건을 업계 공통 조건으로 제시하지 않습니다.

## 보안 분야: 보호 대상과 기술 환경

| 묶음 | 분야 |
| --- | --- |
| 인프라·접근 | 시스템·서버, 네트워크, 클라우드·컨테이너, 단말·엔드포인트, 신원·접근 |
| 서비스·소프트웨어 | 웹·애플리케이션, 모바일, 소프트웨어 공급망·오픈소스, AI 시스템 |
| 정보·신뢰 | 데이터, 암호·키 관리 |
| 산업·기기 | OT·산업제어, IoT·임베디드, 차량·모빌리티, 영상정보 시스템 |

[분야 안내](https://taehyeon-git.github.io/cybersecurity-career-wiki/fields/)는 각 환경에서 무엇을 보호하고 어떤 판단·협업·산출물이 생기는지 설명합니다. 한 분야에는 여러 직무군의 역할이 연결될 수 있고, 한 역할은 여러 분야에서 일할 수 있습니다. 15개 분야는 NCS SQF의 **5개 하위산업분야**나 NIST NICE·ENISA ECSF의 공식 분류와 같은 단위가 아닙니다.

## 보안 직무: 맡는 일

[직무 목록](https://taehyeon-git.github.io/cybersecurity-career-wiki/careers/)의 60개 역할은 보안 전략·관리, 보안 설계·개발, 보안제품 기획·개발·품질, 보안 구축·운영, 보안 진단·평가, 보안 관제·사고 대응, 디지털 조사·사이버 수사, 보안 연구·교육, 보안 기술영업·고객지원의 **9개 직무군**으로 찾습니다. 이는 주 책임을 기준으로 읽기 쉽게 만든 위키 분류입니다. 한 회사의 채용 포지션이 여러 직무군의 일을 결합할 수 있습니다.

이전 `/fields/management/` 등 **업무 유형별 분야 URL**에는 새 분야 목록과 직무 목록으로 가는 이동 안내가 남아 있습니다. 새 분야 상세 주소는 `/fields/system/`, `/fields/web/`, `/fields/ot/` 같은 보호 대상 이름을 사용합니다. 옛 주소는 검색 색인과 사이트맵에서 제외됩니다.

분류의 출처와 편집상 판단은 [분류 결정 기록](docs/research/classification-decisions.md)에, 60개 직무의 전체 목록은 [직무 인벤토리](docs/research/role-inventory.md)에 있습니다.

## 로컬 실행과 검증

Node.js와 npm을 준비하고 저장소 루트에서 실행합니다.

```bash
npm ci
npm run dev
```

`npm run dev`가 출력한 주소에서 확인합니다. 정적 배포 파일은 `npm run build`가 `out/`에 만듭니다. 실행 중인 서버나 데이터베이스 없이 GitHub Pages에서 제공됩니다.

```bash
npm run typecheck
npm run lint
npm test
npm run content:check
npm run build
npx playwright install chromium
npm run test:e2e
```

| 위치 | 내용 |
| --- | --- |
| `src/content/fields/` | 15개 보호 대상별 분야 안내 MDX |
| `src/content/roles/` | 60개 직무 MDX |
| `src/content/roadmaps/` | 15개 커리어 준비 경로 MDX |
| `src/content/glossary/terms.json` | 출처가 연결된 용어집 |
| `src/data/sources.json` | 공식 출처와 확인일 |
| `docs/research/` | 분류 근거와 국내 공고 표본의 한계 |

`published` 상태의 15개 분야·직무·경로와 용어집이 검색 색인에 들어갑니다. 사이트맵은 새 분야의 상세 URL을 열거하고 옛 업무 유형별 분야 URL은 제외합니다. `npm run build`는 콘텐츠 검사, 검색 색인 생성, Next.js 정적 내보내기, RSC 호환 파일 생성, 출력 검사를 차례로 실행합니다. `npm run test:e2e`는 생성된 `out/`을 Playwright로 확인합니다. 스키마는 [콘텐츠 모델](docs/CONTENT_MODEL.md), 사실 확인 규칙은 [작성 지침](docs/CONTENT_GUIDELINES.md), 검증 범위는 [테스트 안내](docs/TESTING.md)를 참조하세요.

## 배포와 기여

`main`에 푸시하면 GitHub Actions가 검사와 빌드를 거쳐 GitHub Pages에 배포합니다. 프로젝트 사이트의 경로 접두사와 기준 URL은 빌드 환경에서 결정됩니다. 설정과 배포 후 점검은 [배포 안내](docs/DEPLOYMENT.md)에 있습니다.

[기여 안내](CONTRIBUTING.md), [행동 강령](CODE_OF_CONDUCT.md), [유지보수 절차](docs/MAINTENANCE.md)를 읽고 이슈나 풀 리퀘스트를 남겨주세요. 코드는 [MIT](LICENSE), 자체 제작 설명문의 권장 적용 범위는 [콘텐츠 라이선스](CONTENT_LICENSE.md)에 설명되어 있습니다.
