# 국내 보안 채용공고 표본

조사 기준일: **2026-10-09**. 기업이 운영하는 공식 채용 사이트의 공고명·본문을 우선했다. 한 URL의 모집 분야가 여러 개여도 **하나의 공고**로 센다. 게시일이 없는 공고는 `확인 10-09`라고 썼다. `상세 제한`은 제목·기간은 확인했지만 기업 원문에서 실제 업무나 요건을 충분히 확인하지 못했다는 뜻이다. 아래 표본은 시장 점유율이나 채용 가능성 추정에 쓰지 않는다.

## 확인한 공고

| ID | 회사·실제 공고명과 URL | 게시·확인 / 경력 | 확인된 업무·필수 역량 | 우대·기술 및 확인 한계 |
| --- | --- | --- | --- | --- |
| P01 | NAVER Cloud — [AI Security 분야 채용 (경력)](https://recruit.navercorp.com/rcrt/view.do?annoId=30005520&lang=ko) | 2026-09-30 / 경력 | 한 공고에 **학습데이터 엔지니어, RL 환경 엔지니어, Offensive·Defensive AI 보안 엔지니어, Security for AI 엔지니어, FDE**의 5개 세부 분야를 명시. 보안 데이터·검증 환경·AI 에이전트·AI 모델/서비스 평가 등 각기 다른 업무; 세부 분야별 3년 이상. | Python, IaC, AI Agent, LLM 보안, AI Red Teaming 등은 **세부 분야별** 요건이다. 5개 독립 공고로 집계하지 않았다. |
| P02 | NAVER Cloud — [보안 솔루션 운영 담당자 (Junior Talent)](https://recruit.navercloudcorp.com/rcrt/list.do) | 2026-10-02 / 사이트 분류는 `경력`, 제목은 `Junior Talent` | 공식 목록에서 제목·기간·Security 직군 확인. | 목록 메타데이터는 EPP/EDR, PMS, CCE, AI Engineering을 제시하지만 상세 페이지를 확인하지 못했다. **상세 제한**; 신입 허용이라고 단정하지 않음. |
| P03 | 안랩 — [디지털 포렌식 (신입/경력)](https://ahnlab-cms.recruiter.co.kr/appsite/company/index) | 2026-10-07 / 신입·경력 | 공식 채용 목록에서 제목·마감일(10-25) 확인. | **상세 제한**: 담당업무·필수·우대·도구를 기업 원문에서 확인하지 못함. |
| P04 | 안랩 — [네트워크 보안 엔지니어 (신입/경력)](https://ahnlab-cms.recruiter.co.kr/appsite/company/index) | 2026-10-02 / 신입·경력 | 공식 채용 목록에서 제목·마감일(10-11) 확인. | **상세 제한**: 기술지원인지 내부 보안 운영인지 제목만으로 확정하지 않음. |
| P05 | 안랩 — [보안 컨설팅 (경력)](https://ahnlab-cms.recruiter.co.kr/appsite/company/index) | 2026-10-02 / 경력 | 공식 채용 목록에서 제목·마감일(10-11) 확인. | **상세 제한**: 기술 진단과 관리체계 자문의 비중을 기업 원문에서 확인하지 못함. |
| P06 | LINE Plus — [Senior Security Operations & Incident Response Engineer (SOC/CSIRT)](https://careers.linecorp.com/jobs/3053/) | 2026-08-07 / Senior | 외부 Tier 1 SOC 기준·에스컬레이션 관리, Tier 2 심층 분석, 내부 CSIRT 대응. 탐지 품질·사고 판단·증거 분석 역량 요구. | 로그·보안 이벤트·탐지 시나리오. 독립 SOC Analyst 하나만의 업무로 축소할 수 없다. |
| P07 | LINE Plus — [Senior Cloud Security Engineer](https://careers.linecorp.com/ko/jobs/3052/) | 2026-08-07 / 7년 이상 | AWS 보안 기준·표준 아키텍처 수립, IAM·네트워크·데이터 보호·로깅 통제 설계, 설정 오류·과도 권한 개선. 개발·SRE 협업 필요. | AWS, IAM, 자동 점검, DevSecOps 협업. 클라우드·보안 아키텍처 경험을 요구. |
| P08 | LINE studio — [Senior Security Professional (게임서비스 분야)](https://careers.linecorp.com/ko/jobs/3111/) | 2026-09-11 / 7년 이상 | 게임 서비스의 ISMS/ISO 27001 관리체계, 정책·규제·개인정보, 외부 SOC 품질·사고 대응 조율을 한 직무에서 수행. | AWS·Ncloud 위험 점검, PIA, Python/GenAI 증적 자동화. GRC와 기술 감독이 결합된 사례. |
| P09 | LINE Pay Plus — [LINE Pay Information Security Officer](https://careers.linecorp.com/jobs/2991/) | 2026-04-08 / 공고 분류 Full-time | 서비스 출시·시스템 변경 보안 요구사항·리뷰, 정보보호 관리체계·규제 준수·서비스 보안 업무를 검색 가능 공식 본문에서 확인. | 금융 규제·정보보호·개인정보보호 이해. **부분 확인**: 상세 페이지가 조회 시 간헐적으로 오류를 반환해 세부 우대사항은 미기록. |
| P10 | 토스 — [Security Engineer (보안 분석 플랫폼 운영)](https://toss.im/career/job-detail?job_id=7411162003) | 확인 10-09 / 정규직, 경력 연수 미표기 | SIEM 설계·구축·운영, 여러 환경의 로그 수집 아키텍처와 데이터 표준화. SIEM 성능·안정성 및 로그 ETL 경험 요구. | Splunk, OpenSearch, Elasticsearch, NiFi, Kafka, Hadoop, On-Prem, AWS, Kubernetes. `SOC Analyst`보다 플랫폼 엔지니어링에 가까움. |
| P11 | 토스 — [Security Engineer (이벤트 분석 / 사고 대응)](https://toss.im/career/job-detail?job_id=7411370003) | 확인 10-09 / 정규직, 경력 연수 미표기 | 침해 탐지·분석·대응, SIEM 로그 기반 위협 시나리오·탐지 체계 설계, 대응 자동화. 실제 사고 대응과 클라우드/K8s 보안 경험 요구. | SIEM, K8s, Public Cloud, Detection Engineering, LLM 활용 경험을 공고에서 언급. 한 직함에 탐지·IR이 함께 들어간다. |
| P12 | 토스 — [Security Engineer (클라우드 보안)](https://toss.im/career/job-detail?job_id=6960856003) | 확인 10-09 / 5년 이상 | 멀티 클라우드 보안 아키텍처, IAM 기반 권한, 네트워크·데이터 보호와 로깅 자동화. AWS/GCP/Azure 실무 경험 요구. | IAM, VPC, WAF, KMS, GuardDuty, Terraform/Python. 컨테이너·Kubernetes, 금융 인증·규제 경험은 공고에서 추가 우대. |
| P13 | 토스 — [Security Researcher (모의해킹/취약점 분석)](https://toss.im/career/job-detail?job_id=4076085003) | 확인 10-09 / 정규직, 상세 경력 연수 미확인 | 웹·모바일·API·내부 시스템 취약점 진단, 서비스 출시 전 보안 평가, 위협 모델링과 수정 권고. | 공고 UI가 토스 계열사 여러 포지션을 함께 보여주므로 **토스의 해당 세부 포지션** 내용만 사용. 도구·우대의 전체 목록은 미추출. |
| P14 | 토스 — [Security Researcher (APT/인프라 모의해킹)](https://toss.im/career/job-detail?job_id=4555752003) | 확인 10-09 / 정규직, 상세 경력 연수 미확인 | 내부 침투·보안 평가와 실제 공격자 TTP를 반영한 시나리오로 방어 공백 검증. | LLM/AI Agent를 활용한 진단·분석 자동화 경험을 공고에서 언급. `Red Team`과 인접하나 제목 자체는 다르다. |
| P15 | 토스 — [Security Researcher (모바일보안)](https://toss.im/career/job-detail?job_id=7780944003) | 확인 10-09 / 정규직, 상세 경력 연수 미확인 | Android/iOS 취약점·소스·의존성 점검을 CI/CD에 통합하고, 위변조 방지·난독화·암호화 모듈 개발. 모바일 역공학과 하나 이상의 개발 언어 경험 요구. | Kotlin/Java/Swift/C/C++/Go/Python 등, CI/CD; 버그바운티·CVE·발표 경력은 전문성 입증 예시로 제시. |
| P16 | 토스 — [Information Security Manager (보안정책)](https://toss.im/career/job-detail?job_id=7711619003) | 확인 10-09 / 정규직, 경력 연수 미확인 | 금융·개인정보 규제를 내부 정책·통제로 해석, 인증·점검 증적과 개선을 관리, 신규 서비스 보안 리뷰. | 전자금융거래법·개인정보보호법·신용정보법을 공고가 명시. 기술 도구보다 정책 설계·조정 역량을 강조. |
| P17 | 토스 — [IT Security Specialist (신입 / 2년 이하)](https://toss.im/career/job-detail?job_id=8000384003) | 확인 10-09 / 신입 또는 2년 이하, 1년 계약 | 사내 IT 기기·SW 운영과 문제 해결, 계정·권한 관리. Windows/Mac/Linux 경험과 IT 기초 관심 요구. | 공고의 IAM·MDM 설명은 **향후 성장 경로** 예시이지 이 직무의 현재 전체 업무가 아니다. |
| P18 | 토스 — [Privacy Manager (3년이하)](https://toss.im/career/job-detail?job_id=7805637003) | 확인 10-09 / 3년 이하, 정규직 | 개인정보의 수집–이용–제공–파기 검토, 동의·계약, 오남용 위험·수탁사 점검. | 개인정보 관련 법·내부 관리체계 이해. 보안 엔지니어링과 다른 프라이버시 실무 사례. |
| P19 | 토스증권 — [Security Engineer (보안 인프라)](https://toss.im/career/job-detail?job_id=8011230003) | 확인 10-09 / 정규직, 상세 연수 미확인 | 온프레미스·클라우드 위험, 계정·워크로드 기준, 네트워크 분할과 아키텍처 수준 개선. | AWS/Azure/GCP, Kubernetes, Micro segmentation, ZTNA/SSE 등을 공고가 언급. Zero Trust는 설계 접근 맥락이다. |
| P20 | 시큐아이 — [경력사원 모집_개발 (Windows 응용 개발)](https://secui-recruit.recruiter.co.kr/app/jobnotice/view?jobnoticeSn=257255&systemKindCode=MRS2) | 2026-06-17 / Windows 개발 6년 이상 | SSL VPN·단말 점검 등 보안 제품 에이전트 개발·유지보수; C/C++, Windows 내부 구조·네트워크·파일시스템 이해. | 커널/드라이버, Endpoint 보안 제품, 취약점 분석 경험을 우대. **보안 제품 개발자** 사례이며 SOC/보안운영 직무와 구분한다. |
| P21 | 토스증권 — [Security Engineer (이벤트 분석/사고 대응)](https://toss.im/career/job-detail?job_id=4299403003) | 확인 10-09 / 정규직, 상세 연수 미확인 | SIEM 기반 자체 관제 체계, 로그 수집·상관 규칙, 침해사고 분석·대응과 자동화. | Splunk, ELK, Kafka, Public Cloud/Kubernetes 경험을 공고가 명시. |
| P22 | 토스플레이스 — [Security Engineer (이벤트 분석/사고 대응)](https://toss.im/career/job-detail?job_id=7719336003) | 확인 10-09 / 정규직, 상세 연수 미확인 | 클라우드 SIEM 로그, 탐지 규칙, 이상행위·침해사고 대응, CTI를 활용한 헌팅. | AWS 등 클라우드 탐지·대응 경험을 요구. 탐지·IR·헌팅이 한 공고에 결합된다. |
| P23 | NAVER Cloud — [Cloud Native Security 플랫폼 BE 엔지니어 (경력)](https://recruit.navercloudcorp.com/rcrt/list.do) | 2026-09-29 / 경력 | 공식 목록에서 제목·기간·Security 직군 확인. | 목록 키워드는 BE, Cloud Native Security, Developer Tools. **상세 제한**: 기업 원문 상세를 검증하지 못했으므로 제3자 재게시글의 기술 요건을 옮기지 않았다. |

## 표본 해석

- **23개 서로 다른 공고 식별자**, 그중 **17개는 업무 본문까지 확인**, **6개는 제목·기간 등 메타데이터만 또는 일부만 확인**했다. 한 공고(P01)의 5개 세부 분야는 5개 공고로 부풀리지 않았다.
- 법인 기준으로는 NAVER Cloud, 안랩, LINE Plus, LINE studio, LINE Pay Plus, 토스, 토스증권, 토스플레이스, 시큐아이의 9개 기업·계열사다. 기업집단 기준으로는 NAVER, 안랩, LINE, 토스, 시큐아이 **5개 집단**에 집중된다. 금융·플랫폼 공고 비중이 높고 공공기관·제조업·중소 보안 컨설팅사의 본문 공고가 부족하다.
- **토스 계열 공고 12개**로 표본 내 비중이 크다. 이것은 채용시장 점유율이 아니라 접근 가능한 공식 상세 페이지가 많은 결과다.
- 날짜가 없는 토스 공고의 게시 시점은 알 수 없다. 2026-10-09에 접근 가능하다는 사실만 기록했고 `최근 12개월 이내 게시`라고 주장하지 않는다. 회사가 공고를 수정·종료할 수 있다.
- 관찰된 공통 주제는 일부 공고의 로그/SIEM·클라우드·자동화·협업 요구다. **모든 기업·모든 직무의 필수 조건으로 일반화할 수 없다.** P06, P11, P21, P22에서는 관제·탐지·사고 대응이 한 채용 직무에 묶이며, P08은 정책·프라이버시·기술 감독을 함께 요구한다.

## KISIA 자료와의 관계

KISIA는 [2025년 정보보호 채용시장 조사·분석 보고서](https://www.kisia.or.kr/ks/kboard_view.php?PN=71&no=1028&page=1)와 [2025년 산업인력현황 보고서](https://www.kisia.or.kr/ks/kboard_view.php?PN=71&no=1023&page=1)를 게시했다. 채용시장 보고서의 검색 인덱스에 잡힌 머리말은 2025년 4–10월 채용 사이트 공고를 수집했으며 수집 시점 때문에 시장 전체 일반화에 한계가 있다고 명시한다. 직접 PDF 열람은 이 조사에서 안정적으로 되지 않았고, 표본 수치나 직무 비율을 인용하지 않았다. 위 표의 2026년 개별 공고와 보고서의 2025년 집계는 기간·수집 방법이 달라 합산하지 않는다.

## 후속 조사 방식

1. 공고 URL, 법인, 제목, 게시일/확인일, 상태, 담당업무, 필수·우대, 기술을 분리 보관한다.
2. 같은 그룹의 계열사를 무작정 독립적인 시장 표본으로 해석하지 않는다.
3. 이미 종료된 공고는 채용 현황이 아니라 **과거의 업무 예시**로만 제시한다.
4. 보안 전문기업·컨설팅·제조 OT·공공기관·일반 기업 사내 조직의 공식 원문을 추가해 기업집단 편중을 낮춘다.
