/** NCS 정보보호 SQF를 참고한 위키의 편집 분류. SQF의 운영·관리는 전략·관리와 구축·운영으로 나눈다. */
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
