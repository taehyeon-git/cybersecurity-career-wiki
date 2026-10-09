/** NCS 정보보호 SQF의 하위 산업 분야를 실제 채용 직무에 맞게 풀어 쓴 업무 범주. */
export const roleCategories = [
  { id: "management", ko: "보안 전략·관리", en: "Strategy & Governance", description: "보안 전략, 정책, 위험, 개인정보와 조직 운영을 책임집니다.", tone: "amber" },
  { id: "development", ko: "보안 설계·개발", en: "Design & Development", description: "서비스와 제품의 안전한 설계·개발을 맡습니다.", tone: "teal" },
  { id: "operations", ko: "보안 구축·운영", en: "Implementation & Operations", description: "조직의 보안 통제와 인프라를 구축하고 운영합니다.", tone: "blue" },
  { id: "assessment", ko: "보안 진단·평가", en: "Assessment & Evaluation", description: "위험과 취약점을 검증하고 독립적으로 평가합니다.", tone: "rose" },
  { id: "response", ko: "보안 관제·사고 대응", en: "Monitoring & Response", description: "위협을 탐지·분석하고 사고의 영향을 줄입니다.", tone: "violet" },
  { id: "customer", ko: "보안 기술영업·고객지원", en: "Sales & Customer Support", description: "보안 제품의 도입 판단과 고객 운영을 돕습니다.", tone: "slate" },
] as const;

export const mainNav = [
  { href: "/start/", label: "처음 시작" },
  { href: "/careers/", label: "보안 직무" },
  { href: "/roadmaps/", label: "커리어 경로" },
  { href: "/glossary/", label: "용어집" },
];

export const routeFor = {
  role: (slug: string) => `/careers/${slug}/`,
  roadmap: (slug: string) => `/roadmaps/${slug}/`,
};
