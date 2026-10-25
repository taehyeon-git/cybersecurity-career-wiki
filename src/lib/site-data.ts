/** NCS 정보보호 SQF를 참고한 직무군. 분야 안내의 보호 대상 분류와는 별개다. */
export const roleCategories = [
  { id: "management", ko: "보안 전략·관리", en: "Strategy & Governance", description: "보안 전략, 정책, 위험, 개인정보와 조직 운영을 책임집니다.", tone: "amber" },
  { id: "development", ko: "보안 설계·개발", en: "Security Design & Development", description: "서비스와 일반 제품의 보안 설계·개발 지원을 맡습니다.", tone: "teal" },
  { id: "product", ko: "보안제품 기획·개발·품질", en: "Security Product Work", description: "보안제품의 요구, 기능, 품질과 사용 설명을 책임집니다.", tone: "blue" },
  { id: "operations", ko: "보안 구축·운영", en: "Implementation & Operations", description: "조직의 보안 통제와 인프라를 구축하고 운영합니다.", tone: "blue" },
  { id: "assessment", ko: "보안 진단·평가", en: "Assessment & Evaluation", description: "보안 상태와 취약점을 조사·평가하고 결과를 보고합니다.", tone: "rose" },
  { id: "response", ko: "보안 관제·사고 대응", en: "Monitoring & Response", description: "관제팀을 운영하고 위협을 탐지·분석해 사고의 영향을 줄입니다.", tone: "violet" },
  { id: "investigation", ko: "디지털 조사·사이버 수사", en: "Digital Investigation", description: "디지털 증거를 분석하거나 법집행기관에서 사이버범죄를 수사합니다.", tone: "rose" },
  { id: "research", ko: "보안 연구·교육", en: "Security Research & Education", description: "보안 기술·정책을 연구하고 직무 교육 과정을 설계·운영합니다.", tone: "teal" },
  { id: "customer", ko: "보안 기술영업·고객지원", en: "Sales & Customer Support", description: "고객 계약·도입 제안과 보안제품 운영 지원을 맡습니다.", tone: "slate" },
] as const;

/** 보호 대상과 기술 환경으로 탐색하는 분야. 공식 직무 체계의 분류와 일대일로 대응하지 않는다. */
export const fieldDomainGroups = [
  {
    id: "infrastructure-access", ko: "인프라·접근", description: "시스템과 통신망, 클라우드, 단말, 계정의 보호",
    domainIds: ["system", "network", "cloud", "endpoint", "identity"],
  },
  {
    id: "services-software", ko: "서비스·소프트웨어", description: "웹·모바일 서비스와 소프트웨어 공급망, AI 환경의 보호",
    domainIds: ["web", "mobile", "software-supply-chain", "ai"],
  },
  {
    id: "information-trust", ko: "정보·신뢰", description: "데이터와 암호·키를 안전하게 다루는 환경",
    domainIds: ["data", "cryptography"],
  },
  {
    id: "industry-devices", ko: "산업·기기", description: "산업 설비와 연결 기기, 차량, 영상정보 시스템의 보호",
    domainIds: ["ot", "iot-embedded", "automotive", "video-physical"],
  },
] as const;

export const fieldDomains = fieldDomainGroups.flatMap((group) => group.domainIds);

/** 직무 준비 방향으로 찾는 커리어 경로 폴더. 보호 대상별 분야·직무군과는 별개의 탐색 구조다. */
export const roadmapGroups = [
  { id: "start", ko: "처음 시작하는 경로", description: "직무 선택과 공고 읽기", roadmapIds: ["cybersecurity-fundamentals"] },
  { id: "design-development", ko: "설계·개발 경로", description: "서비스·클라우드·보안제품에서 설계하고 만드는 일", roadmapIds: ["application-security", "ai-security-career", "devsecops", "cloud-security", "security-product-customer"] },
  { id: "operations-field", ko: "운영·현장 경로", description: "보안 운영과 산업·모빌리티 현장의 일", roadmapIds: ["security-operations", "industrial-mobility-security"] },
  { id: "assessment-investigation-research", ko: "평가·수사·연구 경로", description: "보안 평가, 사이버 수사와 연구의 일", roadmapIds: ["penetration-testing", "police-cybercrime-career", "security-research-career"] },
  { id: "planning-management", ko: "기획·관리 경로", description: "위험·정책·개인정보를 다루는 일", roadmapIds: ["grc-security-management", "privacy-security-leadership"] },
  { id: "education-customer", ko: "교육·고객 경로", description: "보안 교육과 고객의 도입·활용을 돕는 일", roadmapIds: ["security-education-career", "security-customer-career"] },
] as const;

export const mainNav = [
  { href: "/start/", label: "처음 시작" },
  { href: "/fields/", label: "보안 분야" },
  { href: "/careers/", label: "보안 직무" },
  { href: "/roadmaps/", label: "커리어 경로" },
  { href: "/glossary/", label: "용어집" },
];

export const routeFor = {
  field: (slug: string) => `/fields/${slug}/`,
  role: (slug: string) => `/careers/${slug}/`,
  roadmap: (slug: string) => `/roadmaps/${slug}/`,
};
