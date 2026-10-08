# 콘텐츠 모델

콘텐츠는 `src/content/{roles,topics,roadmaps,comparisons}/`의 `.mdx` 파일입니다. `src/lib/content.ts`가 YAML frontmatter를 Zod로 검사합니다. 파일명은 `slug.mdx`로 맞추는 것을 권장하지만 현재 검사기는 파일명과 `slug`의 일치를 강제하지 않습니다.

## 공통 필드

| 필드 | 형식과 의미 |
| --- | --- |
| `id`, `slug` | 소문자 영문·숫자·하이픈으로 된 고유 식별자와 URL 조각 |
| `titleKo`, `titleEn` | 한국어·영어 제목, 각각 두 글자 이상 |
| `aliases` | 검색 별칭 배열; 생략 시 빈 배열 |
| `summary` | 20자 이상의 요약 |
| `sourceIds` | `src/data/sources.json`에 등록한 출처 ID 배열, 최소 1개 |
| `reviewedAt` | 검토일 문자열; `YYYY-MM-DD` 형식 권장 |
| `publicationStatus` | `draft`, `needs-review`, `published`, `outdated` 중 하나 |

현재 검사는 `reviewedAt`의 날짜 형식이나 출처 URL 접속 가능 여부까지 검증하지 않습니다. `published` 문서는 MDX 본문 길이가 최소 450자여야 합니다. 다른 상태의 문서도 스키마 검사는 받지만 공개 목록과 검색 색인에는 나타나지 않습니다.

## 종류별 필드

| 종류 | 필수 추가 필드 | 선택 필드와 연결 |
| --- | --- | --- |
| `roles` | `category` (`offensive`, `defensive`, `engineering`, `governance`, `specialized`), `responsibilities`, `typicalTasks`, `keyDeliverables` (각각 비어 있지 않은 문자열 배열) | `domainIds`, `prerequisiteTopicIds`, `coreSkillIds`, `toolIds`, `relatedRoleIds`, `roadmapIds`, `reviewStatus` (`reviewed` 또는 `needs-review`) |
| `topics` | `category` (문자열) | `prerequisiteTopicIds`, `relatedTopicIds`, `relatedRoleIds` |
| `roadmaps` | 공통 필드만 | `roleIds`, `topicIds` |
| `comparisons` | `roleIds` (정확히 두 역할 ID) | 공통 필드 외 별도 연결 없음 |

선택 배열은 생략하면 빈 배열로 처리합니다. `reviewStatus`의 기본값은 `needs-review`입니다. `publicationStatus`와 `reviewStatus`는 다릅니다. 게시 여부와 사람의 내용 검토 상태를 각각 표현합니다.

## 연결 규칙

- 게시 문서의 `sourceIds`는 등록된 출처를 가리켜야 합니다.
- 게시 문서가 참조하는 역할·토픽 ID는 해당 컬렉션에 존재해야 합니다. 역할의 `domainIds`, `prerequisiteTopicIds`, `coreSkillIds`는 현재 검사기에서 모두 토픽 ID로 확인합니다.
- 역할의 `roadmapIds`는 로드맵 ID를 가리켜야 합니다. 이 검사는 게시 상태와 무관하게 적용됩니다.
- 동일 컬렉션 안의 `slug` 중복은 허용하지 않습니다. 출처 ID도 중복할 수 없습니다.
- `sourceIds`는 근거 링크이고, 분류 ID는 콘텐츠 간 관계입니다. 기술명이나 도구명을 역할 ID로 대신 넣지 않습니다.

## 최소 작성 예시

```mdx
---
id: example-security-role
slug: example-security-role
titleKo: 예시 보안 직무
titleEn: Example Security Role
summary: 직무 문서를 시작하기 위한 임시 요약이며 검토 후 실제 업무 범위를 구체화합니다.
sourceIds: [nist-nice]
reviewedAt: 2026-10-09
publicationStatus: draft
category: defensive
responsibilities: [보안 업무 범위 확인]
typicalTasks: [공식 자료와 공고를 대조해 업무 정리]
keyDeliverables: [근거가 연결된 직무 설명]
---

## 개요

초안을 작성한 뒤 근거와 본문을 충분히 보강합니다.
```

출처 항목은 `{id,title,organization,url,version,checkedAt,kind,notes}` 형식의 JSON 객체입니다. `version`, `notes`는 선택이며 `url`은 유효한 URL이어야 합니다. 공식 명칭·버전·확인일을 기록하되, 확인일이 원문 발행일을 뜻하지 않음을 유의합니다.
