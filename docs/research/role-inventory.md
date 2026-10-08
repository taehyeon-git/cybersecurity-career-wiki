# 직무 인벤토리

조사 기준일: **2026-10-09**. 아래 직무명은 **위키의 탐색 단위**이며 NICE Work Role이나 ENISA ECSF 프로필을 그대로 복제한 목록이 아니다. 각 매핑은 동일 직함이라는 뜻이 아니라 **업무가 겹치는 공식 역할**을 뜻한다. NICE 기준은 [Components v2.2.0](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions), ECSF 기준은 [2022 Role Profiles](https://www.enisa.europa.eu/publications/european-cybersecurity-skills-framework-role-profiles)다. 공고 번호 `Pxx`는 [`korean-job-market.md`](korean-job-market.md)에 있다. 공고가 없는 행의 한국어 표현은 **검색용 번역·별칭**일 뿐 채용 빈도의 근거가 아니다.

## 공격 검증·취약점 연구

| 위키 직무 / 한국어 별칭 | 핵심 업무 | 공식 프레임워크 대응(부분 일치) | 국내 채용명 관계 |
| --- | --- | --- | --- |
| Web Penetration Tester / 웹 모의해킹 담당 | 허가된 웹·API 서비스의 공격 경로 검증, 영향·재현 절차·수정 권고 기록 | NICE Software Security Assessment, Vulnerability Analysis; ECSF Penetration Tester | 토스 `Security Researcher (모의해킹/취약점 분석)` P13, 안랩 `보안 컨설팅` P05에 관련 업무 확인. |
| Infrastructure Penetration Tester / 인프라 모의해킹 담당 | 서버·네트워크·인증 경계의 침투 가능성 검증, 권한 상승·측면 이동 범위 평가 | NICE Vulnerability Analysis, Systems Security Analysis; ECSF Penetration Tester | 토스 `Security Researcher (APT/인프라 모의해킹)` P14. |
| Red Team Operator / 레드팀 수행자 | 합의된 목표와 범위에 따른 다단계 공격 모의, 방어 탐지·대응 능력 검증 | NICE 단일 대응 없음; ECSF Penetration Tester와 인접 | 토스 P14의 공고명은 APT/인프라 모의해킹. `레드팀`은 업무 방식으로도 쓰이므로 공고명과 동일시하지 않음. |
| Vulnerability Researcher / 취약점 연구원 | 새 취약점의 원인·악용 조건·영향을 분석하고 재현·책임 있는 공개를 준비 | NICE Technology Research and Development, Vulnerability Analysis; ECSF Cybersecurity Researcher | 직접 일치하는 최근 국내 공고 표본 미확인. 토스 P15의 모바일 취약점 분석은 인접 업무. |
| Exploit Developer / 익스플로잇 개발자 | 승인된 연구·검증을 위한 취약점 증명 코드와 완화 검증 도구 개발 | NICE Technology Research and Development와 인접; ECSF Cybersecurity Researcher와 인접 | 직접 일치 공고 미확인. 일반 모의해킹 공고와 분리 유지하되 상세 기술은 추가 검증 필요. |

## 방어·탐지·대응

| 위키 직무 / 한국어 별칭 | 핵심 업무 | 공식 프레임워크 대응(부분 일치) | 국내 채용명 관계 |
| --- | --- | --- | --- |
| SOC Analyst / 보안관제 분석가 | 경보 분류, 로그 확인, 사건 에스컬레이션, 관제 절차 운영 | NICE Defensive Cybersecurity; ECSF Cybersecurity Implementer와 일부 인접 | LINE Plus `SOC/CSIRT` P06는 외부 Tier 1 SOC 관리와 Tier 2 심층 분석을 함께 요구. |
| Detection Engineer / 탐지 엔지니어 | 위협 가설·시나리오를 탐지 규칙과 데이터 요건으로 전환, 오탐·미탐 개선 | NICE Defensive Cybersecurity, Threat Analysis | 토스 P11·P21에서 탐지 시나리오·규칙 설계 요구; 독립 직함 공고 표본은 부족. |
| Incident Responder / 침해사고 대응 담당 | 사고 범위 분석, 격리·제거·복구 조율, 재발 방지와 보고 | NICE Incident Response; ECSF Cyber Incident Responder | 토스 P11·P21, LINE Plus P06. |
| Threat Hunter / 위협 헌터 | 알려진 경보 밖에서 가설·행위 증거를 이용해 잠재 침해 탐색 | NICE Defensive Cybersecurity, Threat Analysis | 독립 직함 표본 미확인; 토스 P11의 선제 탐지 요구와 인접. |
| Malware Analyst / Reverse Engineer / 악성코드 분석가 | 악성 파일·행위 역분석, 지표·탐지·대응 정보 생산 | NICE Threat Analysis, Digital Forensics, Technology Research and Development 중 업무별 대응 | 독립 공고 표본 미확인. 포렌식과 협업 가능하지만 증거 조사와 동일 업무는 아님. |
| Digital Forensics Specialist / 디지털 포렌식 전문가 | 증거 수집·보존·분석, 사건 경위 재구성, 검증 가능한 조사 보고 | NICE Digital Forensics 및 Digital Evidence Analysis; ECSF Digital Forensics Investigator | 안랩 `디지털 포렌식` P03 공고명 확인. 상세 요건은 기업 원문 접근 한계로 미검증. |
| Cyber Threat Intelligence Analyst / 위협 인텔리전스 분석가 | 위협 자료 수집·평가·분석·전파, 방어 우선순위 지원 | NICE Threat Analysis; ECSF Cyber Threat Intelligence Specialist | 독립 공고 표본 미확인. |
| Vulnerability Management Specialist / 취약점 관리 담당 | 자산 취약점 식별, 맥락별 우선순위, 조치 추적·검증 | NICE Vulnerability Analysis | 토스 P13·P19에 진단·개선 업무 확인. 독립 직함으로 보기에는 근거 부족. |

## 보안 설계·구현

| 위키 직무 / 한국어 별칭 | 핵심 업무 | 공식 프레임워크 대응(부분 일치) | 국내 채용명 관계 |
| --- | --- | --- | --- |
| Application Security Engineer / 애플리케이션 보안 엔지니어 | 설계 검토, 코드·API 보안 평가, 개발팀과 취약점 수정 | NICE Software Security Assessment, Secure Software Development | 토스 P13·P15에 관련 업무. `Security Researcher`라는 회사 직함 아래 포함될 수 있음. |
| Product Security Engineer / 프로덕트 보안 엔지니어 | 제품 생명주기 전반의 위협 모델, 제품·플랫폼 보안 설계, 개발자 보안 지원 | NICE Cybersecurity Architecture, Software Security Assessment와 인접 | 토스 P15의 모바일 보안 플랫폼 업무와 인접. 독립 직함 공고는 표본 부족. |
| DevSecOps Engineer / 데브섹옵스 엔지니어 | CI/CD·IaC·컨테이너 등 개발·배포 과정에 보안 통제 자동화 | NICE Secure Software Development와 일부 Work Role의 업무; **DevSecOps는 NICE Competency Area NF-COM-008** | LINE Cloud P07의 DevSecOps 협업, 토스 P15의 파이프라인 통합 확인. 독립 직함 표본 미확인. |
| Cloud Security Engineer / 클라우드 보안 엔지니어 | 계정·권한·네트워크·데이터·로그 보안 기준과 자동화된 점검 구축 | NICE Cybersecurity Architecture, Systems Security Analysis | LINE Plus P07, 토스 P12의 정확한 공고명. |
| Infrastructure Security Engineer / 인프라 보안 엔지니어 | 서버·플랫폼·접근 경계의 통제 설계·운영, 구성·로그 개선 | NICE Infrastructure Support, Systems Security Analysis | 토스증권 P19에서 하이브리드 인프라 보안 업무 확인. |
| Network Security Engineer / 네트워크 보안 엔지니어 | 분할, 방화벽·침입 방지, 연결 보안 정책·장애 분석 | NICE Network Operations, Infrastructure Support | 안랩 P04는 같은 명칭의 기술지원형 채용. 직함이 같아도 내부 운영 엔지니어와 업무가 다름. |
| Endpoint Security Engineer / 엔드포인트 보안 엔지니어 | 단말 정책·보호 도구 배포, 탐지와 운영 상태 개선 | NICE Systems Security Analysis, Infrastructure Support와 인접 | 토스 P17은 기기·계정 운영의 입문 직무; 보안 전문 엔지니어 직함과 동일시하지 않음. |
| IAM/PAM Engineer / 인증·권한 엔지니어 | 계정 생명주기, 인증·권한·특권 접근 통제 설계·자동화 | NICE Systems Security Management, Cybersecurity Architecture와 업무별 인접 | 토스 P17의 계정·권한 관리와 관련. 독립 IAM/PAM 공고 표본 미확인. |
| Security Automation Engineer / 보안 자동화 엔지니어 | 반복 탐지·대응·증적 수집 절차를 코드와 워크플로로 자동화 | NICE Defensive Cybersecurity, Infrastructure Support의 업무와 인접 | 토스 P10의 로그 파이프라인, LINE P06의 관제 개선 등에서 수행 업무 확인. |
| Security Architect / 보안 아키텍트 | 사업·시스템 요구를 위협 모델·보안 원칙·통제 구조로 변환 | NICE Cybersecurity Architecture; ECSF Cybersecurity Architect | LINE Plus P07에서 표준 아키텍처 수립. |
| Software Supply Chain Security Engineer / SW 공급망 보안 엔지니어 | 의존성·SBOM·빌드·서명·배포 신뢰성 통제 설계 | NICE Secure Software Development, 새 C-SCRM Work Role과 인접; [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) | 독립 공고 표본 미확인. C-SCRM은 관리·위험 역할도 포함하므로 1:1 매핑하지 않음. |
| OT/ICS Security Engineer / 산업제어 보안 엔지니어 | 제어시스템의 안전·가용성 제약 아래 자산·네트워크·접근 보안 설계 | NICE Operational Technology (OT) Cybersecurity Engineering | 최근 국내 개별 공고 표본 미확인. 기술 분야 태그 OT/ICS와 별도 역할로 유지. |
| AI/LLM Security Engineer / AI·LLM 보안 엔지니어 | AI 모델·데이터·애플리케이션의 위협 평가와 보안 통제 실험·구현 | NICE AI Security Competency Area와 인접; [OWASP GenAI](https://genai.owasp.org/)는 기술 근거 | NAVER Cloud P01에서 `Security for AI` 및 `AI for Security` 세부 직무 확인; 둘은 같은 일이 아님. |

## 거버넌스·위험·보증

| 위키 직무 / 한국어 별칭 | 핵심 업무 | 공식 프레임워크 대응(부분 일치) | 국내 채용명 관계 |
| --- | --- | --- | --- |
| GRC Analyst / 보안 정책·컴플라이언스 담당 | 정책·통제·규제 요구를 조직 절차와 증적으로 연결, 준수 상태 추적 | NICE Cybersecurity Policy and Planning, Security Control Assessment; ECSF Cyber Legal, Policy & Compliance Officer와 인접 | 토스 P16, LINE studio P08의 관리체계 업무. |
| Security Auditor / 보안 감사 담당 | 정의된 기준에 비추어 통제 설계·운영 증거를 독립 평가·보고 | NICE Technology Program Auditing, Security Control Assessment; ECSF Cybersecurity Auditor | LINE studio P08에 내부감사 대응이 있으나 **감사인 직무** 자체와는 다름. 독립 공고 미확인. |
| Security Consultant / 보안 컨설턴트 | 고객의 범위와 계약에 따라 기술 진단 또는 관리체계·위험 자문 수행 | 과업에 따라 ECSF Penetration Tester/Risk Manager/Auditor; NICE 단일 대응 없음 | 안랩 `보안 컨설팅` P05 확인. 세부 과업을 구분해 설명해야 함. |
| Security Risk Manager / 보안 위험관리 담당 | 위험 식별·평가·대응 승인·추적과 경영진 의사결정 지원 | NICE Cybersecurity Policy and Planning 등; ECSF Cybersecurity Risk Manager | 토스 P16, LINE studio P08과 인접. |
| Privacy/Data Protection Specialist / 개인정보보호 담당 | 개인정보 흐름·처리 근거·보호조치·영향평가 검토 | NICE Privacy Compliance; ECSF Cyber Legal, Policy & Compliance Officer와 인접 | 토스 `Privacy Manager` P18, LINE studio P08에서 확인. |
| Third-Party Risk Specialist / 제3자 위험관리 담당 | 공급업체·서비스 의존성의 보안 위험 평가와 계약·개선 추적 | NICE Cybersecurity Supply Chain Risk Management(OG-WRL-017)와 인접; ECSF Risk Manager | LINE studio P08의 위탁사 관리. 독립 직함 공고 미확인. |

## 연구·교육·리더십

| 위키 직무 / 한국어 별칭 | 핵심 업무 | 공식 프레임워크 대응(부분 일치) | 국내 채용명 관계 |
| --- | --- | --- | --- |
| Security Researcher / 보안 연구원 | 연구 주제를 명시해 취약점·공격·방어 기술을 실험·검증·공유 | NICE Technology Research and Development; ECSF Cybersecurity Researcher | 토스 P13–P15는 `Security Researcher`를 각기 다른 전문 업무에 사용. 명칭만으로 단일 업무를 추정하지 않음. |
| Cybersecurity Educator / 보안 교육자 | 대상 수준에 맞춘 교육 설계·실습 운영·평가 | NICE Cybersecurity Instruction, Cybersecurity Curriculum Development; ECSF Cybersecurity Educator | [KISA 교육사업](https://www.kisa.or.kr/402/form?page=11&postSeq=2484)과 [KISIA 과정](https://kice.kisia.or.kr/home/kor/education/security/view.do?idx2=303&menuPos=12&pageIndex=1&tabPos=A)은 교육 영역 근거지만 채용 공고는 아님. |
| CISO / Security Leader / 정보보호 책임자 | 조직 전략·예산·위험 수용·정책·팀 운영과 경영진 보고 | NICE Executive Cybersecurity Leadership; ECSF CISO | LINE studio P08이 CISO 직속 조직이라고 명시. CISO 자체 채용 표본은 미확인. |

## 사용 주의

- 표에서 공식 역할을 제시한 것은 **업무 비교**다. 공식 역할의 모든 TKS가 해당 국내 직무에 필요하다는 뜻이 아니다.
- 입문·경력 요구는 고용주·시기마다 다르다. 이 표로 일률적인 자격증, 학위, 경력연수를 제시하지 않는다.
- `Security Engineer`, `Security Researcher`, `보안 컨설팅`처럼 범위가 넓은 제목은 실제 공고의 담당업무를 읽어 여러 위키 직무에 연결한다.
