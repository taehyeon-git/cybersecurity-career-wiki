# 미확인 정보와 후속 검토

기준일: **2026-10-09**. 확인되지 않은 내용을 사실처럼 사이트에 게시하지 않기 위한 기록이다. 완료 표시를 하려면 공식 원문 URL, 확인일, 핵심 문장을 함께 남긴다.

| 우선순위 | 항목 | 현재 확인 상태 | 필요한 후속 작업 |
| --- | --- | --- | --- |
| 높음 | NICE Components v2.2.0 출시 연도 표기 충돌 | [현재 버전 페이지](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions)는 `April 28, 2025`라고 적지만 [발표문](https://www.nist.gov/news-events/news/2026/04/nice-releases-nice-framework-components-v220), [변경 기록](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/current-version/change-logs), [Latest Updates](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/about/nice-framework-latest-updates)는 **2026-04-28**이라고 적는다. | NIST 정정 여부를 재확인. 그 전까지 발표문·변경 기록 기준의 2026년 날짜를 사용하고 페이지 오기를 주석으로 둔다. |
| 높음 | NICE 온라인 도구와 최신 컴포넌트 차이 | [NICCS Cyber Career Pathways](https://niccs.cisa.gov/tools/cyber-career-pathways-tool)는 자체 설명에서 **v2.0.0** 데이터를 사용한다고 명시한다. NIST 최신 컴포넌트는 **v2.2.0**이다. | 세부 Work Role 코드·TKS는 NIST v2.2.0 XLSX/JSON으로 재검증한다. NICCS를 최신 구성요소의 유일한 출처로 쓰지 않는다. |
| 높음 | KISIA 2025 채용시장 보고서 본문 | [공식 게시물](https://www.kisia.or.kr/ks/kboard_view.php?PN=71&no=1028&page=1)은 확인했으나 PDF 직접 열람은 불안정했다. 검색 인덱스에 잡힌 머리말은 수집 기간과 일반화 한계만 확인 가능했다. | PDF 원본을 안정적으로 열어 표본 설계·직무별 수치·집계 정의를 확인한 뒤, 필요한 경우에만 조사 연도·표본을 명시해 인용한다. |
| 중간 | KISIA 산업인력현황 자료의 게시 연혁 | [신규 게시물](https://www.kisia.or.kr/ks/kboard_view.php?PN=71&no=1023&page=1)은 2026-08-04, [기존 게시물](https://www.kisia.or.kr/talent_support/isc_reference/28/)은 배포일 2025.07·작성일 2025-08-22로 표시한다. | 두 게시물이 같은 파일·개정본인지 원본 PDF와 메타데이터를 대조한다. |
| 높음 | 채용 표본의 대표성 | [`korean-job-market.md`](korean-job-market.md)에 23개 공고 식별자를 기록했지만 토스 계열 12개로 편중된다. 6개 공고는 상세 내용이 일부 또는 전부 미확인이고, 여러 토스 공고는 게시일이 없다. | 보안 전문기업·컨설팅·제조 OT·공공기관·일반 기업 내부 보안팀에서 2025-10 이후 공식 상세 공고를 추가한다. 표본틀과 검색어를 기록하고 중복·계열사를 표시한다. |
| 높음 | 독립 직함의 국내 근거 | `Threat Hunter`, `Detection Engineer`, `Product Security Engineer`, `Exploit Developer`, `Third-Party Risk Specialist`, `OT/ICS Security Engineer` 등에 정확히 대응하는 최근 국내 공식 공고를 충분히 찾지 못했다. | 직함의 실제 사용과 업무 범위를 공식 공고로 검증. 그 전에는 위키 제목을 편집상 역할이라고 밝히고 수요·진입 난도를 단정하지 않는다. |
| 중간 | 직무별 신입 진입 가능성·연봉·자격증 | 현재 자료로 시장 전체의 신입 비중, 연봉 분포, 자격증 필수 여부를 산출할 수 없다. | 공신력 있는 동일 기간·동일 모집단 자료를 찾기 전에는 수치나 필수 자격 주장을 게시하지 않는다. 개별 공고의 요건만 날짜와 함께 인용한다. |
| 중간 | ENISA ECSF 개정 | [ENISA ECSF 개요](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf)는 현재 개정 중이라고 한다. 확인 가능한 역할 프로필은 2022년판 12개다. | 새 최종본이 공개되면 프로필 수·명칭·업무를 다시 대조한다. 검토 시점에는 미래 개정 내용을 예측하지 않는다. |
| 중간 | 기술 문서 버전 | Kubernetes·클라우드·OWASP Cheat Sheets·ATT&CK·CWE·NVD는 지속 갱신된다. `sources.json`의 허브 확인일은 개별 기술 세부 문장의 버전을 보장하지 않는다. | 기술 페이지마다 구체 문서·버전·검토일을 추가한다. 클라우드 벤더의 개별 서비스 기능은 해당 서비스 문서로 확인한다. |
| 낮음 | NVD 자동 텍스트 추출 | [NVD 홈](https://nvd.nist.gov/)은 확인했으나 자동 추출 결과 본문이 비어 있었다. | CVE·CVSS 등 세부 주장에는 직접 기록 페이지/API 또는 NIST의 설명 문서를 활용한다. |

## 편집상 추론으로 남겨야 하는 구분

- `Application Security`와 `Product Security`의 경계는 공식 단일 정의가 아니다. [SSDF](https://csrc.nist.gov/pubs/sp/800/218/final)의 개발 생명주기 범위와 개별 공고를 비교한 **위키 편집상 구분**이다.
- `Penetration Testing`과 `Red Teaming`, `Threat Hunting`과 `Threat Intelligence`, `Vulnerability Research`와 `Vulnerability Management`는 실무에서 겹칠 수 있다. 위키는 주 산출물과 책임을 설명하는 식으로 구별한다.
- 경력 경로는 한 개인에게 통용되는 필수 순서가 아니다. [NICCS 도구](https://niccs.cisa.gov/tools/cyber-career-pathways-tool)의 관계는 학습 방향을 탐색하는 참고로만 사용한다.
- NICE의 `DevSecOps`는 v2.2.0에서 갱신된 **Competency Area**다. 위키의 `DevSecOps Engineer`는 관찰 가능한 실무를 설명하기 위한 편집상 직무명이며 공식 NICE Work Role이라고 표기하지 않는다.
