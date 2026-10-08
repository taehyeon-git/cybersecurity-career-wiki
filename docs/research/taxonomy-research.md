# 직무·기술 분류 조사

조사 기준일: **2026-10-09**. 이 문서의 사이트 분류는 편집상 탐색 구조다. NICE나 ECSF의 공식 분류라고 표기하지 않는다. 출처 ID는 [`src/data/sources.json`](../../src/data/sources.json)에 등록했다.

## 최초 후보와 검토 결과

초기 후보는 Offensive Security, Defensive Security, Security Engineering, Governance/Risk/Assurance, Specialized Security의 다섯 직무 그룹과 기술 분야를 나열한 트리였다. 이 구조는 입문자에게 유용하지만 다음 문제가 있었다.

1. DevSecOps, Product Security, OT/ICS, AI Security는 한 기술 영역 안에만 들어가지 않는다.
2. `Security Researcher` 같은 채용명은 취약점 연구, 악성코드 분석, 모의해킹 등 서로 다른 업무를 가리킬 수 있다.
3. `Zero Trust`, `SAST`, `SIEM`은 직무명이 아니라 각각 아키텍처 접근, 분석 방식, 기술 범주다.
4. NICE의 Work Role, ECSF의 프로필, 회사가 쓰는 채용명은 범위와 목적이 다르다.

따라서 한 개의 포괄 트리를 만들지 않고 **직무 탐색 그룹**과 **기술 지식 그룹**을 분리하며 다대다 관계로 연결한다. 검색 별칭에도 직무명, 도구명, 기술명을 구분해 넣는다.

## 공식 자료 비교

| 자료 | 확인한 버전·상태 | 분류에 쓰는 방식 | 한계 |
| --- | --- | --- | --- |
| [NIST NICE 현재 버전](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions), [변경 기록](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/current-version/change-logs) | 구조 문서는 **SP 800-181 Rev. 1 (2020)**, 별도 유지되는 Components는 **v2.2.0 (2026-04-28)** | Work Role Category, Work Role, Competency Area, Task/Knowledge/Skill(TKS)을 모델의 근거로 사용 | Work Role은 채용 공고의 직함이 아니며, 한 직무에 여러 Work Role이 결합될 수 있다. |
| [NIST NICE Getting Started](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/getting-started) | 검토 시점에 5개 범주, 42개 Work Role을 명시 | 공식 범주와 사이트 그룹을 대조 | 수량은 개정에 따라 달라지므로 페이지에 고정 수치로 반복하지 않는다. |
| [ENISA ECSF](https://www.enisa.europa.eu/topics/skills-and-competences/skills-development/european-cybersecurity-skills-framework-ecsf), [Role Profiles](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles) | 2022년의 대표 프로필 **12개**; ENISA는 개정 중이라고 안내 | 임무, 산출물, 주요 업무, 대체 직함, 지식·역량을 비교 | 12개는 세부 시장 직함의 전수 목록이 아니다. |
| [CISA/NICCS Cyber Career Pathways Tool](https://niccs.cisa.gov/tools/cyber-career-pathways-tool) | 도구 페이지가 NICE Components **v2.0.0** 데이터를 사용한다고 명시 | 역할 간 TKS 연관성과 경력 이동 아이디어를 검토 | 현재 NICE v2.2.0보다 데이터가 뒤처져 최신 구성요소 확인에는 쓰지 않는다. |
| [KISIA 2025 채용시장 보고서](https://www.kisia.or.kr/ks/kboard_view.php?PN=71&no=1028&page=1), 기업 공고 | 보고서의 검색 가능 본문은 2025년 4–10월 채용 공고 수집과 일반화 한계를 밝힘; 개별 공고는 2026-10-09 확인 | 국내 채용명과 실제 업무가 공식 역할에 어떻게 대응하는지 검토 | 특정 기간·포털·기업 표본이므로 전체 시장 비율을 추정하지 않는다. |

NIST의 [v2.2.0 발표](https://www.nist.gov/news-events/news/2026/04/nice-releases-nice-framework-components-v220)와 [변경 기록](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/current-version/change-logs)은 출시일을 2026-04-28로 기록한다. 현재 버전 페이지는 `April 28, 2025`라고 적어 **연도가 충돌**한다. 변경 기록과 발표문을 우선하여 2026년으로 기록하고, 페이지 오기는 [`research-gaps.md`](research-gaps.md)에 남긴다. v2.2.0의 새 역할은 Cybersecurity Supply Chain Risk Management(OG-WRL-017)이고, Cryptography와 DevSecOps Competency Areas가 갱신됐다. 이는 DevSecOps를 NICE의 독립 Work Role이라고 부를 근거가 되지 않는다.

## 개념 모델

| 개념 | 이 위키에서의 의미 | 예 |
| --- | --- | --- |
| Domain | 지식·기술 또는 문제 영역 | Cloud Security, Application Security, IAM |
| Job Title | 고용주가 공고에 쓰는 이름 | `Security Engineer (클라우드 보안)` |
| Work Role | 책임·업무를 묶은 정의 단위 | NICE `Incident Response`, ECSF `Cyber Incident Responder` |
| Task | 특정 산출물이나 결과를 위한 활동 | 침해 로그를 조사해 범위 판단 |
| Competency | 업무 수행 역량 묶음 | 암호학, DevSecOps, 위협 모델링 |
| Knowledge | 알아야 할 개념 | HTTP, IAM 정책 평가 방식 |
| Tool / Technology | 활동에 사용하는 기법·시스템 | SIEM, SAST, Terraform |
| Career Path | 준비·전환을 위한 학습 순서 | 네트워크 기초 → 로그 분석 → 탐지 규칙 프로젝트 |

[NIST의 직업·일자리·Work Role 구분](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/resources/occupations-jobs-and-work)은 한 채용 직무가 여러 역할을 포함할 수 있음을 설명한다. 따라서 하나의 공고명을 NICE 역할 하나와 1:1로 등치하지 않는다.

## 최종 직무 탐색 그룹

대표 그룹은 탐색을 위한 **단일 표시값**이다. 실제 내용은 여러 기술 도메인 및 보조 태그를 연결한다.

| 대표 그룹 | 대표 직무 | 보조 태그의 예 |
| --- | --- | --- |
| 공격 검증·취약점 연구 (Offensive Security & Assessment) | Web Penetration Tester, Infrastructure Penetration Tester, Red Team Operator, Vulnerability Researcher, Exploit Developer | AppSec, 네트워크, 클라우드, 탐지 검증 |
| 방어·탐지·대응 (Defense & Response) | SOC Analyst, Detection Engineer, Incident Responder, Threat Hunter, Malware Analyst, Digital Forensics Specialist, CTI Analyst, Vulnerability Management Specialist | ATT&CK, SIEM, 포렌식, 위협 인텔리전스 |
| 보안 설계·구현 (Security Engineering) | Application Security Engineer, Product Security Engineer, DevSecOps Engineer, Cloud Security Engineer, Infrastructure/Network/Endpoint/IAM Engineer, Security Automation Engineer, Security Architect, Software Supply Chain Security Engineer, OT/ICS Security Engineer, AI/LLM Security Engineer | Secure SDLC, Zero Trust, Kubernetes, OT, AI |
| 거버넌스·위험·보증 (Governance, Risk & Assurance) | GRC Analyst, Security Auditor, Security Consultant, Security Risk Manager, Privacy/Data Protection Specialist, Third-Party Risk Specialist | 규제, 감사, 위험평가, 공급망 |
| 연구·교육·리더십 (Research, Education & Leadership) | Security Researcher, Cybersecurity Educator, CISO/Security Leader | 주제별 교차 태그 필수 |

`Security Researcher`는 수행 업무가 확인된 경우 취약점·악성코드·AI 등 구체 분야를 별칭 또는 보조 태그로 표현한다. 직무 자체를 모호한 만능 역할로 설명하지 않는다. `Security Consultant` 역시 과업이 기술 진단인지, 관리체계·위험 자문인지 구분해 기술한다.

## 최종 기술 지식 그룹

기술 트리는 직무 트리와 독립적으로 유지한다. 아래 13개는 탐색 묶음이며 서로 겹칠 수 있다.

1. Security Fundamentals: 운영체제, 네트워크, 프로그래밍, HTTP, 데이터베이스, Git.
2. Network & Infrastructure Security: 분할, 방화벽, IDS/IPS, 하드닝, 네트워크 모니터링.
3. Application & API Security: 웹/API/모바일 보안, 인증·인가, 위협 모델링.
4. Secure Software Development & Supply Chain: SSDF, SAST/DAST/SCA, SBOM, CI/CD, 아티팩트 무결성.
5. Cloud & Platform Security: 클라우드 IAM, 워크로드, 컨테이너, Kubernetes, IaC.
6. Identity & Access Security: IAM/PAM, MFA, 연합 인증, [Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final).
7. Security Operations & Detection: 로깅, SIEM, 탐지 엔지니어링, SOAR, 엔드포인트 탐지.
8. Incident Response & Digital Forensics: 대응 절차, 증거 보존, 디스크·메모리·로그 분석.
9. Threat Intelligence & Malware: CTI 생명주기, ATT&CK, 악성코드 분석, 역공학.
10. Vulnerability & Offensive Methods: 스캐닝, 검증, 모의해킹, 레드팀, 익스플로잇 연구.
11. Governance, Risk, Privacy & Assurance: 정책, 위험평가, 감사, 프라이버시, 제3자 위험.
12. OT/ICS & Emerging Systems: 산업제어 환경, IoT/임베디드, 안전·가용성 제약.
13. AI & LLM Security: AI 시스템 위협 모델, 모델·데이터·애플리케이션 보안.

예를 들어 DevSecOps Engineer는 3·4·5·7그룹과, Cloud Security Engineer는 5·6·7·11그룹과 연결될 수 있다. `Zero Trust`는 [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)에 근거한 아키텍처 접근이며 제품 자체가 아니다. SAST/DAST/SCA는 보안 분석 방법·기술 범주이며 직무명이 아니다. SSDF는 소프트웨어 개발 실무의 구조를 설명하며 [NIST SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final)을 기준으로 연결한다.

## 적용 규칙

- 직무 페이지는 실제 책임·산출물을 먼저 설명하고, 공고명을 별칭으로 저장한다.
- NICE/ECSF 매핑은 `동일`, `부분 일치`, `인접` 등 근거 수준을 텍스트로 설명한다. 사이트 자체 직무명을 공식 프레임워크 용어로 위장하지 않는다.
- 기술 페이지는 관련 직무를 여러 개 연결한다. 직무 페이지도 필요한 기술을 여러 개 연결한다.
- 채용 공고는 확인일 또는 게시일을 함께 보관하고, 공고 종료 후에도 역사적 표본으로만 사용한다.
- 신규 역할/기술이 등장하면 그룹에 억지로 끼워 넣기보다 실제 업무와 근거를 보고 [`classification-decisions.md`](classification-decisions.md)에 결정 기록을 추가한다.
