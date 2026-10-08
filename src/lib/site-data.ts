export const roleCategories = [
  { id: "offensive", ko: "공격 관점의 보안", en: "Offensive Security", description: "허가된 환경에서 약점을 찾고 공격 경로를 검증합니다.", tone: "rose" },
  { id: "defensive", ko: "탐지와 사고 대응", en: "Defensive Security", description: "위협을 발견하고 분석하며 피해를 줄입니다.", tone: "blue" },
  { id: "engineering", ko: "보안 엔지니어링", en: "Security Engineering", description: "제품과 인프라의 설계·개발 과정에 보안을 심습니다.", tone: "teal" },
  { id: "governance", ko: "거버넌스와 보증", en: "Governance & Assurance", description: "위험을 평가하고 정책과 통제가 작동하는지 확인합니다.", tone: "amber" },
  { id: "specialized", ko: "전문·융합 영역", en: "Specialized Security", description: "산업과 신기술의 고유한 보안 문제를 다룹니다.", tone: "violet" },
] as const;

export const topicCategories: Record<string, string> = {
  fundamentals: "보안 기초",
  application: "애플리케이션·API",
  software: "안전한 소프트웨어 개발",
  cloud: "클라우드·플랫폼",
  identity: "계정·접근 제어",
  operations: "보안 운영",
  offensive: "공격·취약점",
  intelligence: "위협 인텔리전스",
  forensics: "포렌식",
  governance: "거버넌스·위험",
  emerging: "신흥 보안",
};

export const mainNav = [
  { href: "/start/", label: "시작하기" },
  { href: "/careers/", label: "직무 탐색" },
  { href: "/knowledge/", label: "기술 지식" },
  { href: "/roadmaps/", label: "로드맵" },
  { href: "/comparisons/", label: "직무 비교" },
];

export const routeFor = {
  role: (slug: string) => `/careers/${slug}/`,
  topic: (slug: string) => `/knowledge/${slug}/`,
  roadmap: (slug: string) => `/roadmaps/${slug}/`,
  comparison: (slug: string) => `/comparisons/${slug}/`,
};
