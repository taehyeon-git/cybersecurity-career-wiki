# 분류 결정 기록

기준일: **2026-10-09**. 결정은 위키의 편집 판단이다. NICE/ECSF가 동일한 이름으로 직무를 정의했다는 주장과 구분한다. 공식 매핑과 국내 공고 근거는 [`taxonomy-research.md`](taxonomy-research.md), [`role-inventory.md`](role-inventory.md), [`korean-job-market.md`](korean-job-market.md)를 참조한다.

| ID | 대상 | 결정 | 근거와 유지 조건 |
| --- | --- | --- | --- |
| D01 | 직무·기술·도구 | **별도 엔터티로 분리** | [NICE의 Work Role/TKS/Competency 구분](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions)에 따라 직무, 업무, 역량을 섞지 않는다. 도구와 기술은 여러 직무에 연결한다. |
| D02 | 웹/인프라 모의해킹 | **Penetration Testing 아래 전문 분야로 묶되, 콘텐츠 페이지는 분리 가능** | [ECSF Penetration Tester](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles)는 포괄 프로필이다. 국내 공고 P13/P14는 대상 환경과 기법이 달라 학습 경로를 구별할 가치가 있다. |
| D03 | Penetration Testing / Red Teaming | **분리** | 전자는 합의된 대상의 취약점·공격 경로를 검증해 수정 권고를 내는 데 초점을 두고, 후자는 목표 기반의 다단계 공격 시나리오로 탐지·대응까지 시험한다. [토스 P13/P14](korean-job-market.md)는 일부 업무가 겹침을 보여주므로 경계는 절대적이지 않다. |
| D04 | Vulnerability Research / 취약점 진단 | **분리** | 새로운 결함의 원인·악용 조건을 찾는 연구와, 알려진 기준에 따라 자산을 평가하는 진단은 산출물이 다르다. NICE의 Technology Research and Development 및 Vulnerability Analysis가 각각 인접하지만 한국 공고 표본이 부족해 상세 경력 서술은 보류한다. |
| D05 | Application Security / Product Security | **분리하되 강한 교차 연결** | AppSec는 애플리케이션의 설계·코드·API·테스트에, Product Security는 제품 생명주기와 플랫폼·기본 보호 체계에 더 넓게 초점을 두도록 편집한다. 공식 프레임워크의 엄격한 경계가 아니라 [`NIST SSDF`](https://csrc.nist.gov/pubs/sp/800/218/final)와 토스 P15 업무를 종합한 **편집상 구분**이다. 실제 조직에서 합쳐질 수 있다. |
| D06 | DevSecOps / Cloud Security | **분리하고 다대다로 연결** | DevSecOps는 개발·빌드·배포·운영 흐름에 보안을 넣는 실무 방식이며, 클라우드는 적용 환경의 하나다. NICE v2.2.0은 DevSecOps를 **Competency Area**로 갱신했다([변경 기록](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/current-version/change-logs)). 독립 Work Role로 오인하지 않는다. |
| D07 | Security Engineer / SOC Analyst / Detection Engineer / Incident Responder | **업무 기준으로 분리** | 경보 분류·에스컬레이션, 탐지 규칙·데이터 개선, 실제 사고의 조사·격리·복구는 주 책임이 다르다. 단일 공고에 결합될 수 있으며 LINE P06, 토스 P11/P21/P22가 그런 사례다. 채용명만으로 하나로 합치지 않는다. |
| D08 | Threat Hunting / Threat Intelligence | **분리** | 헌팅은 내부 환경의 침해 가설을 데이터로 검증하고, CTI는 외부·내부 위협 자료를 평가·분석·전파한다. [NICE Threat Analysis/Defensive Cybersecurity](https://niccs.cisa.gov/tools/cyber-career-pathways-tool)와 [MITRE ATT&CK](https://attack.mitre.org/)를 비교해 연결한다. 국내 독립 헌팅 공고 표본은 추가 필요. |
| D09 | Malware Analysis / Digital Forensics | **분리** | 악성코드의 동작·구현 분석과 증거의 수집·보존·사건 재구성은 산출물과 절차가 다르다. NICE의 Digital Forensics, Digital Evidence Analysis, Threat Analysis 및 ECSF Digital Forensics Investigator를 함께 참고한다. |
| D10 | GRC / Security Audit / Consulting | **분리** | GRC는 정책·통제·위험을 운영하고, 감사는 기준에 대한 증거를 평가하며, 컨설팅은 고객 과업에 따라 진단 또는 자문을 제공한다. [ECSF](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles)의 Auditor, Risk Manager, Legal/Policy/Compliance 프로필을 혼합하지 않는다. |
| D11 | Security Researcher / Security Consultant | **단일 상세 업무를 추정하지 않음** | 토스 P13–P15는 `Security Researcher` 아래 서로 다른 전문 분야를 둔다. 안랩 P05의 `보안 컨설팅`도 기술·관리 업무가 섞일 수 있다. 검색 별칭으로 보존하고 업무 태그로 구체화한다. |
| D12 | OT/ICS와 AI/LLM Security | **기술 도메인이면서 전문 직무도 허용** | NICE에는 OT Cybersecurity Engineering Work Role, AI Security Competency Area가 있고, NAVER Cloud P01은 AI 관련 세부 직무를 모집한다. 도메인 이름을 모든 회사의 직함으로 가정하지 않는다. |
| D13 | Software Supply Chain Security / Third-Party Risk | **분리하되 공급망 도메인으로 연결** | 전자는 개발 산출물·의존성·빌드 무결성의 엔지니어링에, 후자는 공급업체·서비스 의존성의 계약·위험 관리에 가깝다. NICE v2.2.0의 C-SCRM Work Role 신설은 관리 역할의 최신 근거이며 기술 역할 전체와 동일하지 않다. |
| D14 | Zero Trust, SAST/DAST/SCA | **직무에서 제외하고 지식 항목으로 유지** | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)은 Zero Trust를 아키텍처로 다룬다. SAST/DAST/SCA는 분석 접근·도구 범주이며 채용 직함이라고 단정할 근거가 없다. |
| D15 | 학습·경력 경로 | **역할 분류와 별도 그래프** | [NICCS 진로 도구](https://niccs.cisa.gov/tools/cyber-career-pathways-tool)는 Work Role 관계를 보여주지만 현재 NICE v2.2.0보다 오래된 v2.0.0 데이터를 사용한다. 경로는 고정 승진 사다리가 아닌 예시로 제시한다. |

## 통합·보류 상태

- **통합:** `Malware Analyst`와 `Reverse Engineer`는 초기에는 하나의 입문 탐색 페이지로 묶는다. 역공학은 악성코드 외 분야에도 쓰이므로 기술 지식 항목은 별도로 둔다.
- **통합:** `IAM Engineer`와 `PAM Engineer`는 초기에는 하나의 직무 페이지로 시작하고 특권 접근을 보조 태그로 둔다. 국내 독립 직함 표본이 쌓이면 분리 검토한다.
- **보류:** `Exploit Developer`, 독립 `Threat Hunter`, `Third-Party Risk Specialist`, `AI/LLM Security Engineer`의 상세 채용시장 설명은 최근 국내 공고 표본이 부족하다. 개념 페이지 또는 제한을 명시한 직무 페이지부터 작성한다.
- **보류:** `Product Security Engineer`의 국내 직함 빈도와 AppSec와의 조직 경계는 검증되지 않았다. 현재 구분은 학습을 위한 편집 판단으로 표시한다.
