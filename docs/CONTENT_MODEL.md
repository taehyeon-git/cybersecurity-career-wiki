# 콘텐츠 모델

공개 본문은 `src/content/fields/`, `src/content/roles/`, `src/content/roadmaps/`의 MDX, 용어집은 `src/content/glossary/terms.json`으로 관리합니다. `src/lib/content.ts`가 YAML frontmatter와 JSON 구조를 검사합니다. 현재 게시 콘텐츠는 **보호 대상별 분야 안내 15개, 직무 60개, 커리어 경로 15개, 용어 63개**입니다.

## MDX 공통 필드

| 필드 | 형식과 의미 |
| --- | --- |
| `id`, `slug` | 소문자 영문·숫자·하이픈 식별자와 URL 조각 |
| `titleKo`, `titleEn` | 한국어·영어 제목; 각각 최소 2자 |
| `aliases` | 검색 별칭 배열; 생략하면 빈 배열 |
| `summary` | 최소 20자의 요약 |
| `sourceIds` | `src/data/sources.json`에 등록된 출처 ID 배열; 최소 1개 |
| `reviewedAt` | 문서가 마지막으로 갱신되거나 검토된 날짜 문자열. 편집 검토 완료 여부는 `reviewStatus`로 구분 |
| `publicationStatus` | `draft`, `needs-review`, `published`, `outdated` 중 하나 |

`published` 문서만 목록·상세·검색에 포함됩니다. 게시된 분야·직무·경로 MDX 본문은 frontmatter를 제외하고 최소 1,800자여야 합니다. 현재 검사는 `reviewedAt`의 날짜 형식, 파일명과 `slug`의 일치, 외부 링크의 실제 접속 가능성은 강제하지 않습니다. 다른 게시 상태의 문서도 frontmatter 스키마 검사를 받지만 목록과 검색에는 나타나지 않습니다.

## 분야 안내와 직무 필드

분야 안내 MDX는 공통 필드에 필수 `roleIds` 배열을 추가합니다. `id`와 `slug`는 같은 보호 대상 분야 ID를 사용하며 `category`는 넣지 않습니다. `src/lib/site-data.ts`의 15개 분야 ID마다 게시 안내가 정확히 한 편 있어야 합니다. `roleIds`는 실제로 연결할 게시 직무의 ID를 명시합니다. 하나의 분야가 여러 직무군과 연결될 수 있고, 하나의 직무가 여러 분야에서 언급될 수 있는 **다대다 관계**입니다. 분야 본문에는 보호 대상, 인접 분야와의 경계, 실제 하루의 판단·협업·산출물, 세부 환경, 입문과 공고 확인점을 씁니다. 15개 분야와 네 묶음은 위키의 편집 분류로, NCS·NICE·ECSF의 공식 분류를 그대로 옮긴 것이 아닙니다.

분야 ID는 `system`, `network`, `cloud`, `endpoint`, `identity`(인프라·접근), `web`, `mobile`, `software-supply-chain`, `ai`(서비스·소프트웨어), `data`, `cryptography`(정보·신뢰), `ot`, `iot-embedded`, `automotive`, `video-physical`(산업·기기)입니다. `roleIds`는 관련 직무의 링크를 구성하며, 페이지 본문의 직무 링크도 이 배열과 일치하도록 작성합니다. 분야·직무 상세 화면은 이 연결을 따라 서로 이동할 수 있습니다.

직무 MDX에는 다음 필드를 추가합니다.

| 필드 | 형식과 의미 |
| --- | --- |
| `category` | `management`, `development`, `product`, `operations`, `assessment`, `response`, `investigation`, `research`, `customer` 중 하나 |
| `responsibilities` | 지속해서 책임지는 업무; 비어 있지 않은 문자열 배열 |
| `typicalTasks` | 반복적인 실제 작업; 비어 있지 않은 문자열 배열 |
| `keyDeliverables` | 다른 팀이 사용할 산출물; 비어 있지 않은 문자열 배열 |
| `relatedRoleIds` | 함께 일하거나 이동 경로로 연결되는 직무 ID; 기본값 빈 배열 |
| `roadmapIds` | 해당 직무와 관련된 커리어 경로 ID; 기본값 빈 배열 |
| `reviewStatus` | `reviewed` 또는 `needs-review`; 기본값 `needs-review` |

9개 직무 `category`의 표시명과 순서는 `src/lib/site-data.ts`의 `roleCategories`가 정의합니다. 이는 분야 안내의 15개 `fieldDomains`와 별개의 축입니다. `management`는 법정 개인정보 보호책임자(CPO)와 개인정보 운영 담당자를 서로 다른 책임으로 설명하고, `operations`는 데이터 보호 통제의 설계·운영을 포함합니다. `product`에는 보안제품 기획자·개발자·품질 검증 담당자·기술문서 작성자가 속합니다. `investigation`은 민간 디지털 포렌식과 경찰공무원 사이버수사를 함께 찾되 두 직무의 신분·권한·채용 경로 차이를 각 페이지에 설명합니다. `research`는 기술·정책 연구와 교육 운영을 찾는 폴더입니다. 직무군은 국내 SQF와 실제 공고를 참고해 만든 위키의 탐색 분류이며, NCS의 공식 추가 하위산업분야나 단일 직무를 뜻하지 않습니다. NICE Work Role이나 회사의 부서·직함과도 일대일로 같지 않습니다. `publicationStatus`는 공개 여부, `reviewStatus`는 편집 검토 상태입니다. 게시된 글에도 조사 공백이 있으면 본문과 `reviewStatus`로 표시합니다.

`reviewedAt`은 마지막 내용 갱신 또는 검토 날짜이며, 날짜만으로 편집 검토 완료를 뜻하지 않습니다. 직무 문서는 `reviewStatus: reviewed`일 때 공개 화면에 “마지막 내용 검토”, `needs-review`일 때 “내용 갱신”과 “근거·범위 검토 중”을 표시합니다. 경로 문서에는 `reviewStatus` 필드가 없으므로 “내용 갱신” 날짜를 표시합니다.

## 커리어 경로와 용어집

경로 MDX에는 공통 필드와 `roleIds` 배열이 있습니다. `roleIds`는 관련 직무 ID를 가리키며 생략하면 빈 배열입니다. 경로 본문에는 학습 기술 자체를 강의하지 않고, 목표 직무·준비 활동·작업 결과물·자기 점검 기준을 작성합니다.

용어집 JSON의 각 항목은 `term`(한국어), `english`(영문명), `definition`(최소 10자 설명), `sourceIds`(최소 1개)를 가집니다. 한국어 용어와 영문명은 각각 중복할 수 없고, 영문명은 A–Z로 시작해야 합니다. 모든 출처 ID는 등록되어 있어야 합니다. 용어는 독립 기술 강의 페이지로 연결되지 않으며 용어집 안에서 출처와 함께 표시됩니다.

## 참조·출처 검사

- 같은 종류의 MDX 안에서 `id`와 `slug` 중복을 허용하지 않습니다.
- 게시 분야·직무·경로의 `sourceIds`와 관련 직무 ID는 실제 출처·직무를 가리켜야 합니다. 게시 분야의 `roleIds`는 게시 직무를 가리켜야 하며 중복할 수 없습니다. `roadmapIds`는 모든 직무에서 존재하는 경로 ID를 가리켜야 합니다. 등록된 15개 분야 ID마다 게시 분야 안내가 하나씩 있어야 합니다.
- 용어집의 출처, 한국어·영어 중복, 영문 첫 글자를 검사합니다.
- MDX 본문의 외부 인용 URL이 출처 장부에 등록되고 해당 문서의 `sourceIds`에도 포함되는지 확인합니다.
- MDX의 용어집 앵커가 실제 영문 용어 항목을 가리키는지 확인합니다.
- MDX에서 연결한 분야·직무·경로 URL이 게시된 문서의 슬러그를 가리키는지 확인합니다. 옛 업무 유형별 `/fields/{직무군}/` URL은 독자용 이동 안내만 제공하며 새 콘텐츠의 대상 링크로 사용하지 않습니다.
- MDX 본문에 남은 옛 `/knowledge/`, `/comparisons/`, `/knowledge-map/` 링크를 검사합니다.
- 검사기는 공고가 현재 모집 중인지, 문장의 해석이 올바른지, 외부 링크가 살아 있는지는 자동으로 판단하지 못합니다.

`src/data/sources.json`의 항목은 `id`, `title`, `organization`, `url`, `checkedAt`, `kind`를 포함하고 `version`, `notes`를 선택적으로 가집니다. `checkedAt`은 확인일이지 공고 게시일이 아닙니다.

## 최소 직무 예시

```mdx
---
id: example-security-role
slug: example-security-role
titleKo: 예시 보안 직무
titleEn: Example Security Role
aliases: [Example Role]
summary: 실제 업무 책임과 대표 산출물을 구체화하기 전 사용하는 임시 요약입니다.
category: operations
responsibilities: [보안 운영 범위 확인]
typicalTasks: [공식 직무 자료와 실제 공고의 업무를 대조]
keyDeliverables: [근거가 연결된 직무 설명]
relatedRoleIds: []
roadmapIds: []
sourceIds: [ncs-sqf]
reviewStatus: needs-review
reviewedAt: '2026-10-09'
publicationStatus: draft
---

## 맡는 일

공고 원문과 직무 자료를 확인한 뒤 본문을 채웁니다.
```

새 문서를 게시하기 전 [작성 지침](CONTENT_GUIDELINES.md)과 [검증 안내](TESTING.md)를 따릅니다.
