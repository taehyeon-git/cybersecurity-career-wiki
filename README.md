# 사이버보안 커리어 위키

보안 분야에서 어떤 일을 하는지, 어떻게 진입하고 경력을 넓힐지 살펴보는 한국어 위키입니다. 고전 위키처럼 폴더를 펼쳐 **46개 직무**, **11개 커리어 준비 경로**, **69개 용어**를 탐색할 수 있습니다. 직무는 국내 정보보호 SQF를 참고해 실제 업무에 가까운 여섯 범주로 정리했습니다. 독립적인 기술 강의, 직무 비교, 지식 지도는 제공하지 않습니다.

**공개 사이트:** [사이버보안 커리어 위키](https://taehyeon-git.github.io/cybersecurity-career-wiki/)

이 위키는 [NCS 정보보호 SQF](https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8), [NIST NICE](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions), [ENISA ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf)와 기업의 공식 채용공고를 참고합니다. 프레임워크의 업무 역할과 기업의 채용 직함은 같지 않습니다. 국내 공고 표본도 시장 전체를 대표하지 않으므로, 개별 기업의 경력·자격 요건을 업계 공통 조건으로 제시하지 않습니다.

## 탐색 범위

| 폴더 | 내용 |
| --- | --- |
| 보안 전략·관리 | 보안 리더십, 정책·관리체계, GRC, 개인정보, 교육·프로그램 운영 |
| 보안 설계·개발 | 서비스·제품의 보안 설계, AppSec, DevSecOps, 제품 개발·품질 |
| 보안 구축·운영 | 인프라, 클라우드, 네트워크, IAM, 단말, 산업 환경 등의 보안 운영 |
| 보안 진단·평가 | 모의해킹, 취약점 관리·연구, 감사, 컨설팅, 제품 인증평가 |
| 보안 관제·사고 대응 | SOC, 탐지, 사고 대응, 포렌식, 위협 분석 |
| 보안 기술영업·고객지원 | 고객 요구 검증, 보안제품 도입 제안과 기술지원 |

분류의 출처와 편집상 판단은 [분류 결정 기록](docs/research/classification-decisions.md)에, 46개 직무의 전체 목록은 [직무 인벤토리](docs/research/role-inventory.md)에 있습니다.

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
| `src/content/roles/` | 46개 직무 MDX |
| `src/content/roadmaps/` | 11개 커리어 준비 경로 MDX |
| `src/content/glossary/terms.json` | 출처가 연결된 용어집 |
| `src/data/sources.json` | 공식 출처와 확인일 |
| `docs/research/` | 분류 근거와 국내 공고 표본의 한계 |

`published` 상태의 직무·경로와 용어집이 검색 색인에 들어갑니다. `npm run build`는 콘텐츠 검사, 검색 색인 생성, Next.js 정적 내보내기, RSC 호환 파일 생성, 출력 검사를 차례로 실행합니다. `npm run test:e2e`는 생성된 `out/`을 Playwright로 확인합니다. 스키마는 [콘텐츠 모델](docs/CONTENT_MODEL.md), 사실 확인 규칙은 [작성 지침](docs/CONTENT_GUIDELINES.md), 검증 범위는 [테스트 안내](docs/TESTING.md)를 참조하세요.

## 배포와 기여

`main`에 푸시하면 GitHub Actions가 검사와 빌드를 거쳐 GitHub Pages에 배포합니다. 프로젝트 사이트의 경로 접두사와 기준 URL은 빌드 환경에서 결정됩니다. 설정과 배포 후 점검은 [배포 안내](docs/DEPLOYMENT.md)에 있습니다.

[기여 안내](CONTRIBUTING.md), [행동 강령](CODE_OF_CONDUCT.md), [유지보수 절차](docs/MAINTENANCE.md)를 읽고 이슈나 풀 리퀘스트를 남겨주세요. 코드는 [MIT](LICENSE), 자체 제작 설명문의 권장 적용 범위는 [콘텐츠 라이선스](CONTENT_LICENSE.md)에 설명되어 있습니다.
