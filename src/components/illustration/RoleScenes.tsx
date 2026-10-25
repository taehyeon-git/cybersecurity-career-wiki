import {
  BookOpen, BrainCircuit, Bug, CarFront, ClipboardCheck, Cloud, Cpu,
  Database, Factory, FileText, Fingerprint, FlaskConical, FolderOpen,
  Globe, GraduationCap, Handshake, Headset, KeyRound, Laptop, Network,
  Package, Radar, Route, ScanSearch, Server, ShieldCheck, Siren,
  Smartphone, Users, Video, Wrench, GitBranch,
  type LucideIcon,
} from "lucide-react";

type SymbolName =
  | "book" | "brain" | "bug" | "car" | "check" | "cloud" | "chip"
  | "data" | "factory" | "file" | "fingerprint" | "research" | "folder"
  | "web" | "learn" | "sales" | "support" | "key" | "laptop"
  | "network" | "product" | "radar" | "route" | "search" | "server"
  | "shield" | "incident" | "phone" | "people" | "video" | "work"
  | "source";

type SceneName =
  | "dashboard" | "evidence" | "incident" | "assessment" | "workbench"
  | "pipeline" | "blueprint" | "meeting" | "privacy" | "industrial"
  | "vehicle" | "video" | "product" | "customer" | "classroom"
  | "research" | "support" | "network-policy" | "product-development"
  | "product-planning" | "product-testing" | "legal-options"
  | "grc-matrix" | "server-assessment" | "certification-ledger"
  | "audit-report" | "policy-exceptions";

type RoleSceneSpec = {
  scene: SceneName;
  subject: SymbolName;
  result: SymbolName;
  detail: 0 | 1 | 2 | 3;
  description: string;
};

const symbols: Record<SymbolName, LucideIcon> = {
  book: BookOpen, brain: BrainCircuit, bug: Bug, car: CarFront,
  check: ClipboardCheck, cloud: Cloud, chip: Cpu, data: Database,
  factory: Factory, file: FileText, fingerprint: Fingerprint,
  research: FlaskConical, folder: FolderOpen, web: Globe,
  learn: GraduationCap, sales: Handshake, support: Headset, key: KeyRound,
  laptop: Laptop, network: Network, product: Package, radar: Radar,
  route: Route, search: ScanSearch, server: Server, shield: ShieldCheck,
  incident: Siren, phone: Smartphone, people: Users, video: Video,
  work: Wrench, source: GitBranch,
};

// These are editorial scene directions, not aliases for job titles. Every
// published role has its own work object, activity, outcome and description.
const roleScenes: Record<string, RoleSceneSpec> = {
  "ai-security-engineer": { scene: "workbench", subject: "brain", result: "check", detail: 0, description: "AI 서비스 평가 화면에서 실패 사례를 확인하고 보호 요구를 정리하는 장면" },
  "application-security-engineer": { scene: "blueprint", subject: "web", result: "work", detail: 1, description: "웹 서비스 설계도와 코드 검토 결과를 개발 작업에 연결하는 장면" },
  "automotive-security-engineer": { scene: "vehicle", subject: "car", result: "check", detail: 0, description: "차량과 연결 서비스의 보안 요구를 점검표로 검증하는 장면" },
  "chief-privacy-officer": { scene: "meeting", subject: "data", result: "people", detail: 0, description: "개인정보 보호 현황과 자원을 경영진 회의에서 결정하는 장면" },
  ciso: { scene: "meeting", subject: "shield", result: "route", detail: 1, description: "조직 위험 지도와 투자 우선순위를 경영진과 논의하는 장면" },
  "cloud-security-engineer": { scene: "blueprint", subject: "cloud", result: "key", detail: 2, description: "클라우드 계정과 워크로드 연결도에서 접근 권한을 조정하는 장면" },
  "cryptography-engineer": { scene: "workbench", subject: "key", result: "check", detail: 1, description: "제품의 암호 기능과 키 생애주기를 설계하고 검증하는 장면" },
  "cyber-threat-intelligence-analyst": { scene: "evidence", subject: "radar", result: "route", detail: 0, description: "여러 위협 정보의 출처를 대조해 조직의 대응 우선순위를 정리하는 장면" },
  "cybersecurity-policy-researcher": { scene: "research", subject: "book", result: "file", detail: 0, description: "법과 정책 자료를 비교해 공공 의사결정용 연구 보고서를 만드는 장면" },
  "cybersecurity-privacy-legal-counsel": { scene: "legal-options", subject: "book", result: "check", detail: 0, description: "법령과 계약 문서를 검토해 정보보호 선택지를 제시하는 장면" },
  "cybersecurity-researcher": { scene: "research", subject: "research", result: "file", detail: 1, description: "보안 연구 질문을 실험으로 검증하고 결과를 기록하는 장면" },
  "cybersecurity-training-program-manager": { scene: "classroom", subject: "learn", result: "route", detail: 0, description: "학습자와 강사, 교육 일정을 연결해 보안 교육과정을 운영하는 장면" },
  "data-security-engineer": { scene: "privacy", subject: "data", result: "shield", detail: 0, description: "저장과 공유를 오가는 중요 데이터의 접근 범위를 보호하는 장면" },
  "detection-engineer": { scene: "dashboard", subject: "radar", result: "check", detail: 0, description: "로그 신호를 검토해 탐지 규칙과 경보의 정확도를 다듬는 장면" },
  "devsecops-engineer": { scene: "pipeline", subject: "source", result: "check", detail: 0, description: "개발과 배포 사이에 보안 검사와 예외 처리를 연결하는 장면" },
  "digital-forensics-specialist": { scene: "evidence", subject: "file", result: "route", detail: 1, description: "봉인된 디지털 증거를 분석해 사건의 시간순 기록을 재구성하는 장면" },
  "endpoint-security-engineer": { scene: "workbench", subject: "laptop", result: "shield", detail: 2, description: "여러 업무 단말의 보호 상태와 변경 기록을 관리하는 장면" },
  "firmware-security-engineer": { scene: "pipeline", subject: "chip", result: "shield", detail: 1, description: "기기 펌웨어의 출시와 업데이트 단계를 따라 보호 요구를 관리하는 장면" },
  "grc-analyst": { scene: "grc-matrix", subject: "shield", result: "file", detail: 1, description: "조직의 위험, 통제와 증거를 한 평가표에서 연결하는 장면" },
  "iam-engineer": { scene: "privacy", subject: "fingerprint", result: "key", detail: 1, description: "입사부터 퇴사까지 계정 권한의 부여와 회수를 관리하는 장면" },
  "incident-responder": { scene: "incident", subject: "incident", result: "shield", detail: 0, description: "보안 사건의 범위를 파악하고 격리와 복구를 이어가는 장면" },
  "infrastructure-security-assessor": { scene: "server-assessment", subject: "server", result: "check", detail: 2, description: "승인된 서버와 네트워크의 보안 상태를 검증하고 재점검하는 장면" },
  "infrastructure-security-engineer": { scene: "blueprint", subject: "server", result: "shield", detail: 0, description: "서버 묶음에 공통 보안 기준을 설계하고 운영하는 장면" },
  "insider-threat-analyst": { scene: "evidence", subject: "fingerprint", result: "file", detail: 2, description: "내부 접근 흔적을 절차에 따라 평가하고 대응 부서에 전달하는 장면" },
  "isms-p-certification-auditor": { scene: "certification-ledger", subject: "check", result: "file", detail: 3, description: "ISMS-P 심사 기준과 운영 증빙을 대조해 결함을 기록하는 장면" },
  "malware-analyst": { scene: "research", subject: "bug", result: "radar", detail: 2, description: "격리된 의심 파일의 행동을 관찰하고 분석 결과를 남기는 장면" },
  "mobile-security-engineer": { scene: "workbench", subject: "phone", result: "check", detail: 3, description: "모바일 앱의 출시와 업데이트 화면을 검증하는 장면" },
  "network-security-engineer": { scene: "network-policy", subject: "network", result: "key", detail: 3, description: "네트워크 경계와 통신 경로의 접근 정책을 설계하는 장면" },
  "open-source-security-engineer": { scene: "pipeline", subject: "source", result: "product", detail: 2, description: "오픈소스 구성요소의 제보와 수정 버전 배포를 이어가는 장면" },
  "ot-security-engineer": { scene: "industrial", subject: "factory", result: "shield", detail: 0, description: "가동 중인 공장 설비의 안전과 연속성을 고려해 보호 조치를 점검하는 장면" },
  "police-cybercrime-investigator": { scene: "evidence", subject: "search", result: "file", detail: 3, description: "사이버범죄 사건 파일에 디지털 증거와 조사 기록을 연결하는 장면" },
  "privacy-engineer": { scene: "privacy", subject: "web", result: "work", detail: 2, description: "제품의 개인정보 처리 흐름을 설계 변경과 검증에 반영하는 장면" },
  "privacy-impact-assessment-specialist": { scene: "privacy", subject: "data", result: "check", detail: 3, description: "개인정보 처리 흐름의 침해 위험을 표시하고 개선 계획을 만드는 장면" },
  "privacy-manager": { scene: "privacy", subject: "people", result: "file", detail: 0, description: "개인정보의 수집부터 파기까지 처리 책임과 이용자 권리를 관리하는 장면" },
  "product-security-engineer": { scene: "pipeline", subject: "product", result: "shield", detail: 3, description: "제품 설계와 출시, 취약점 처리를 하나의 보안 책임으로 연결하는 장면" },
  "red-team-operator": { scene: "incident", subject: "route", result: "radar", detail: 1, description: "승인된 모의 공격 경로로 조직의 탐지와 대응 능력을 시험하는 장면" },
  "security-account-manager": { scene: "customer", subject: "sales", result: "file", detail: 0, description: "고객의 보안 과제와 제안, 계약, 갱신 일정을 조율하는 장면" },
  "security-architect": { scene: "blueprint", subject: "network", result: "route", detail: 1, description: "여러 시스템을 가로지르는 공통 보안 구조를 설계도에 그리는 장면" },
  "security-auditor": { scene: "audit-report", subject: "file", result: "check", detail: 0, description: "보안 통제의 운영 증거를 독립적으로 확인해 감사 보고를 만드는 장면" },
  "security-awareness-specialist": { scene: "classroom", subject: "book", result: "check", detail: 1, description: "직원의 실제 업무 상황을 교육 사례로 바꾸고 행동 변화를 확인하는 장면" },
  "security-certification-evaluator": { scene: "product", subject: "shield", result: "check", detail: 0, description: "보안제품 기능을 정해진 기준으로 시험해 인증 기록을 남기는 장면" },
  "security-consultant": { scene: "customer", subject: "shield", result: "route", detail: 1, description: "고객 조직의 현재 상태를 듣고 개선 우선순위를 제안하는 장면" },
  "security-policy-manager": { scene: "policy-exceptions", subject: "book", result: "people", detail: 1, description: "법과 계약 요구를 사내 보안 정책과 운영 예외에 연결하는 장면" },
  "security-product-developer": { scene: "product-development", subject: "product", result: "work", detail: 1, description: "고객이 쓰는 보안제품 기능을 구현하고 유지보수하는 장면" },
  "security-product-manager": { scene: "product-planning", subject: "product", result: "route", detail: 2, description: "고객 요구를 제품 우선순위와 출시 결정으로 연결하는 장면" },
  "security-product-qa": { scene: "product-testing", subject: "product", result: "check", detail: 3, description: "고객 환경과 비슷한 조건에서 보안제품의 실패 사례를 시험하는 장면" },
  "security-product-technical-writer": { scene: "product", subject: "book", result: "file", detail: 0, description: "보안제품 화면 옆에 고객용 도움말과 설명서를 작성하는 장면" },
  "security-program-manager": { scene: "meeting", subject: "route", result: "people", detail: 2, description: "여러 팀의 보안 과제 일정과 책임을 진행판에서 조율하는 장면" },
  "security-sales-engineer": { scene: "customer", subject: "product", result: "check", detail: 2, description: "고객 요구에 맞춘 보안제품 시연과 적용 가능성을 검증하는 장면" },
  "security-solution-engineer": { scene: "workbench", subject: "shield", result: "work", detail: 1, description: "보안제품 설정을 실제 조직의 운영 절차에 맞춰 적용하는 장면" },
  "security-supply-chain-risk-manager": { scene: "assessment", subject: "source", result: "sales", detail: 2, description: "공급업체와 외부 기술 서비스의 도입부터 종료까지 위험을 추적하는 장면" },
  "security-support-engineer": { scene: "support", subject: "support", result: "check", detail: 0, description: "고객의 보안제품 장애 티켓을 조사하고 해결 과정을 기록하는 장면" },
  "siem-platform-engineer": { scene: "dashboard", subject: "server", result: "work", detail: 1, description: "여러 로그 공급원을 분석 플랫폼에 연결하고 데이터 품질을 점검하는 장면" },
  "soc-analyst": { scene: "dashboard", subject: "radar", result: "file", detail: 2, description: "보안 경보를 로그와 자산 정보에 대조해 사고 여부를 분류하는 장면" },
  "soc-manager": { scene: "dashboard", subject: "people", result: "route", detail: 3, description: "관제 인력의 교대표와 경보 승격 기준을 운영하는 장면" },
  "threat-hunter": { scene: "evidence", subject: "network", result: "radar", detail: 1, description: "기존 경보 밖의 공격 흔적을 가설과 데이터 탐색으로 찾는 장면" },
  "video-security-specialist": { scene: "video", subject: "video", result: "key", detail: 0, description: "카메라 영상의 저장과 열람 권한, 이용 기록을 관리하는 장면" },
  "vulnerability-management-specialist": { scene: "assessment", subject: "bug", result: "route", detail: 3, description: "자산별 취약점의 담당자와 수정 기한, 재검증을 추적하는 장면" },
  "vulnerability-researcher": { scene: "research", subject: "bug", result: "file", detail: 3, description: "소프트웨어 결함을 재현해 원인과 수정 근거를 설명하는 장면" },
  "web-penetration-tester": { scene: "assessment", subject: "web", result: "file", detail: 0, description: "허가된 웹 서비스 범위에서 공격 가능성을 검증해 수정 보고서를 만드는 장면" },
};

export const roleSceneDescriptions: Record<string, string> = Object.fromEntries(
  Object.entries(roleScenes).map(([id, spec]) => [id, spec.description]),
);

type DrawProps = {
  spec: RoleSceneSpec;
  accent: string;
  soft: string;
  line: string;
};

function Symbol({ name, x, y, size, color }: { name: SymbolName; x: number; y: number; size: number; color: string }) {
  const Icon = symbols[name];
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
    <Icon width={24} height={24} stroke={color} strokeWidth={1.5} fill="none" aria-hidden="true" />
  </g>;
}

function WorkSurface({ line }: { line: string }) {
  return <g stroke={line} strokeWidth="1.5" fill="none" strokeLinecap="round">
    <path d="M22 161h276M49 161l-7 22M271 161l7 22" />
    <path d="M24 187h272" strokeDasharray="2 6" />
  </g>;
}

function ResultCard({ name, x = 235, y = 50, accent, soft, line }: { name: SymbolName; x?: number; y?: number; accent: string; soft: string; line: string }) {
  return <g>
    <rect x={x} y={y} width="61" height="79" rx="3" fill="var(--surface)" stroke={line} strokeWidth="1.5" />
    <path d={`M${x + 8} ${y + 58}h45M${x + 8} ${y + 66}h30`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    <rect x={x + 8} y={y + 9} width="44" height="41" rx="2" fill={soft} />
    <Symbol name={name} x={x + 17} y={y + 17} size={26} color={accent} />
  </g>;
}

function DashboardScene({ spec, accent, soft, line }: DrawProps) {
  const isManager = spec.detail === 3;
  return <g>
    <WorkSurface line={line} />
    <rect x="28" y="34" width="197" height="119" rx="5" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M28 53h197M40 44h34" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <rect x="40" y="64" width="86" height="72" rx="2" fill={soft} />
    {isManager ? <g stroke={accent} strokeWidth="2" fill="none">
      <circle cx="62" cy="89" r="8" /><circle cx="103" cy="89" r="8" />
      <path d="M47 112q15-23 30 0M88 112q15-23 30 0M48 124h67" />
    </g> : <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M49 109h12l7-18 10 32 9-23 7 9h24" />
      <circle cx={69 + spec.detail * 10} cy={91 - spec.detail * 5} r="4" fill={accent} stroke="none" />
    </g>}
    <path d="M141 71h70M141 84h53M141 97h63M141 110h45" stroke={line} strokeWidth="3" strokeLinecap="round" />
    <circle cx="201" cy="126" r="6" fill={accent} />
    <path d="M116 153v9m-27 0h54" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <ResultCard name={spec.result} x={238} y={63} accent={accent} soft={soft} line={line} />
    <Symbol name={spec.subject} x={249} y={18} size={34} color={accent} />
  </g>;
}

function EvidenceScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M45 53h95l11 13h39v91H45z" fill={soft} stroke={line} strokeWidth="1.8" strokeLinejoin="round" />
    <rect x="67" y="70" width="106" height="71" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.6" />
    <path d="M81 114h78M81 126h56" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <circle cx="124" cy="91" r="16" fill={soft} stroke={line} />
    <Symbol name={spec.subject} x={112} y={79} size={24} color={accent} />
    <path d="M176 93l34 17 14-23 30 31 26-23" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="210" cy="110" r="5" fill={accent} /><circle cx="254" cy="118" r="5" fill={accent} />
    <circle cx="211" cy="72" r="24" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="m226 88 18 18" stroke={accent} strokeWidth="5" strokeLinecap="round" />
    <Symbol name={spec.result} x={199} y={60} size={24} color={accent} />
    {spec.detail % 2 === 1 && <path d="M56 46h43M276 139h27" stroke={line} strokeWidth="2" strokeLinecap="round" />}
  </g>;
}

function IncidentScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M25 145h270" stroke={line} strokeWidth="6" strokeLinecap="round" />
    <path d="M35 145h221" stroke={accent} strokeWidth="2" strokeDasharray="5 6" />
    {[64, 160, 256].map((x, index) => <g key={x}>
      <circle cx={x} cy="145" r="18" fill="var(--surface)" stroke={accent} strokeWidth="2" />
      <circle cx={x} cy="145" r="5" fill={index === spec.detail % 3 ? accent : soft} stroke={accent} />
    </g>)}
    <path d="M61 117V67h70v50M153 117V42h72v75M235 117V67h60v50" fill={soft} stroke={line} strokeWidth="1.5" />
    <Symbol name={spec.subject} x={82} y={76} size={29} color={accent} />
    <path d="M165 54h47M165 65h37M165 76h45M165 87h31" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    <Symbol name={spec.result} x={251} y={79} size={28} color={accent} />
    <path d="m126 102 16 7-16 7M226 102l12 7-12 7" fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
  </g>;
}

function AssessmentScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="39" y="39" width="150" height="119" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="2" transform="rotate(-3 114 98)" />
    <path d="M91 40v-9h46v9" fill={soft} stroke={accent} strokeWidth="1.5" />
    {[74, 98, 122].map((y, index) => <g key={y}>
      <rect x="60" y={y} width="13" height="13" rx="1" fill={index === spec.detail % 3 ? soft : "var(--surface)"} stroke={accent} strokeWidth="1.5" />
      {index !== 1 && <path d={`m63 ${y + 6} 3 3 5-6`} fill="none" stroke={accent} strokeWidth="1.5" />}
      <path d={`M82 ${y + 4}h76M82 ${y + 10}h${45 + index * 7}`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    </g>)}
    <circle cx="207" cy="78" r="31" fill={soft} stroke={accent} strokeWidth="2" />
    <Symbol name={spec.subject} x={187} y={58} size={40} color={accent} />
    <path d="m226 99 21 19" stroke={accent} strokeWidth="5" strokeLinecap="round" />
    <ResultCard name={spec.result} x={246} y={87} accent={accent} soft={soft} line={line} />
  </g>;
}

function LegalOptionsScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M34 45h110l15 15v94H34z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M144 45v15h15M47 104h97m-97 13h83m-83 13h91" fill="none" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
    <rect x="48" y="57" width="42" height="37" rx="2" fill={soft} />
    <Symbol name="book" x={57} y={63} size={26} color={accent} />
    <path d="M102 65h34m-34 12h27m-27 12h34" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M160 102h28m0 0 23-29m-23 29 23 29" fill="none" stroke={accent} strokeWidth="1.8" />
    <circle cx="188" cy="102" r="5" fill={soft} stroke={accent} strokeWidth="1.5" />
    <rect x="214" y="45" width="73" height="54" rx="2" fill={soft} stroke={accent} strokeWidth="1.5" />
    <Symbol name="shield" x={223} y={53} size={25} color={accent} />
    <path d="M253 62h25m-25 10h20M223 87h55" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="214" y="106" width="73" height="48" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <Symbol name="check" x={223} y={113} size={24} color={accent} />
    <path d="M253 120h25m-25 10h20M223 143h55" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
  </g>;
}

function GrcMatrixScene({ accent, soft, line }: DrawProps) {
  return <g>
    <rect x="26" y="36" width="268" height="131" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M26 70h268M115 36v131m92-131v131M26 102h268M26 134h268" stroke={line} strokeWidth="1.5" />
    <path d="M27 37h266v32H27z" fill={soft} />
    <Symbol name="shield" x={57} y={42} size={22} color={accent} />
    <Symbol name="check" x={150} y={42} size={22} color={accent} />
    <Symbol name="file" x={241} y={42} size={22} color={accent} />
    {[86, 118, 150].map((y, index) => <g key={y}>
      <circle cx="45" cy={y} r="7" fill={index === 1 ? soft : "var(--surface)"} stroke={accent} strokeWidth="1.4" />
      <path d={`M59 ${y - 3}h42M59 ${y + 4}h31`} stroke={line} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="131" y={y - 8} width="15" height="15" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.3" />
      <path d={`m134 ${y - 1} 4 4 6-7M153 ${y - 3}h39M153 ${y + 4}h29`} fill="none" stroke={index === 1 ? accent : line} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M222 ${y - 9}h16l5 5v19h-21zM237 ${y - 9}v5h6M251 ${y - 2}h29M251 ${y + 5}h21`} fill="none" stroke={line} strokeWidth="1.3" strokeLinejoin="round" />
    </g>)}
  </g>;
}

function ServerAssessmentScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="27" y="42" width="159" height="116" rx="3" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="5 4" />
    <rect x="39" y="59" width="57" height="83" rx="2" fill={soft} stroke={accent} strokeWidth="1.7" />
    <rect x="108" y="59" width="57" height="83" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    {[76, 98, 120].map((y) => <g key={y}>
      <rect x="46" y={y} width="43" height="14" rx="1" fill="var(--surface)" stroke={line} strokeWidth="1.1" />
      <circle cx="54" cy={y + 7} r="2" fill={accent} />
      <path d={`M64 ${y + 7}h17`} stroke={line} strokeWidth="1.4" />
      <rect x="115" y={y} width="43" height="14" rx="1" fill={soft} stroke={line} strokeWidth="1.1" />
      <circle cx="123" cy={y + 7} r="2" fill={accent} />
      <path d={`M133 ${y + 7}h17`} stroke={line} strokeWidth="1.4" />
    </g>)}
    <circle cx="187" cy="91" r="24" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="m202 109 16 17M175 91h25m-13-12v24" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M217 91h16" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
    <rect x="236" y="53" width="57" height="94" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <path d="M245 68h39M245 80h29" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    {[101, 119].map((y) => <g key={y}><rect x="245" y={y - 6} width="11" height="11" fill={soft} stroke={accent} strokeWidth="1.2" /><path d={`m247 ${y - 1} 3 3 5-6M263 ${y}h21`} fill="none" stroke={accent} strokeWidth="1.4" /></g>)}
  </g>;
}

function CertificationLedgerScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M33 43h169v111H33z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M52 43v111M65 56h123" stroke={line} strokeWidth="1.6" />
    {[67, 89, 111, 133].map((y) => <g key={y}>
      <circle cx="43" cy={y} r="3" fill={soft} stroke={accent} strokeWidth="1.2" />
      <rect x="68" y={y - 7} width="12" height="12" fill={soft} stroke={accent} strokeWidth="1.2" />
      <path d={`M88 ${y - 3}h91M88 ${y + 4}h${y === 111 ? 52 : 71}`} stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    </g>)}
    <path d="m70 67 3 3 5-6m-8 25 3 3 5-6m-8 47 3 3 5-6" fill="none" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
    <path d="M203 59h11v22h-11m0 8h11v22h-11m0 8h11v22h-11" fill={soft} stroke={accent} strokeWidth="1.3" />
    <path d="M211 103h18" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
    <path d="M232 57h46l13 13v75h-59z" fill={soft} stroke={line} strokeWidth="1.4" />
    <path d="M224 49h47l12 12v88h-59z" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <path d="M271 49v12h12M235 81h37m-37 12h37m-37 12h26" fill="none" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="253" cy="125" r="13" fill={soft} stroke={accent} strokeWidth="1.4" />
    <path d="m247 125 4 4 8-9" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function AuditReportScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="27" y="52" width="132" height="101" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M27 70h132M40 61h53" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <rect x="40" y="83" width="57" height="54" rx="2" fill={soft} />
    <Symbol name="shield" x={53} y={93} size={31} color={accent} />
    <path d="M108 91h37m-37 13h28m-28 13h37m-37 12h24" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="170" cy="111" r="25" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="m187 128 18 17M160 111h20m-10-10v20" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M199 100h15" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
    <path d="M218 39h61l14 14v107h-75z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M279 39v14h14M229 67h49m-49 12h49m-49 12h39m-39 12h49" fill="none" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M231 125q12-16 19-1 7-13 16-1" fill="none" stroke={accent} strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="274" cy="133" r="11" fill={soft} stroke={accent} strokeWidth="1.4" />
    <path d="m269 133 4 4 6-8" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
  </g>;
}

function PolicyExceptionsScene({ accent, soft, line }: DrawProps) {
  return <g>
    <rect x="26" y="36" width="268" height="129" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M26 56h268M39 46h63m149 0h29" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="42" cy="46" r="2" fill={accent} />
    <path d="M43 73h97v75H43z" fill={soft} stroke={accent} strokeWidth="1.6" />
    <Symbol name="book" x={51} y={82} size={28} color={accent} />
    <path d="M87 86h43m-43 11h34M53 121h76m-76 12h60" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M141 110h29m0 0 23-25m-23 25 23 24" fill="none" stroke={accent} strokeWidth="1.7" />
    <circle cx="170" cy="110" r="4" fill={soft} stroke={accent} strokeWidth="1.3" />
    <rect x="197" y="67" width="80" height="41" rx="2" fill={soft} stroke={accent} strokeWidth="1.5" />
    <Symbol name="check" x={206} y={74} size={25} color={accent} />
    <path d="M239 78h29m-29 11h23" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="197" y="115" width="80" height="39" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" />
    <Symbol name="people" x={206} y={122} size={23} color={accent} />
    <path d="M239 126h29m-29 11h23" stroke={line} strokeWidth="1.5" strokeLinecap="round" />
  </g>;
}

function WorkbenchScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M45 52h166v89H45z" fill="var(--surface)" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <path d="M45 72h166M36 142h184l-8 12H44z" fill={soft} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="58" y="82" width="74" height="48" rx="3" fill={soft} />
    <Symbol name={spec.subject} x={77} y={88} size={38} color={accent} />
    <path d="M143 87h55M143 99h38M143 111h50M143 123h33" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M221 124c20-33 29-35 43-29" fill="none" stroke={line} strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="269" cy="89" r="24" fill={soft} stroke={accent} strokeWidth="1.8" />
    <Symbol name={spec.result} x={255} y={75} size={28} color={accent} />
    {spec.detail === 3 && <path d="M258 50h30M263 57h22" stroke={line} strokeWidth="2" strokeLinecap="round" />}
  </g>;
}

function PipelineScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M28 162h262" stroke={line} strokeWidth="2" strokeDasharray="3 5" />
    {[36, 118, 200].map((x, index) => <g key={x}>
      <rect x={x} y={63 + (index % 2) * 12} width="70" height="75" rx="4" fill={index === 1 ? "var(--surface)" : soft} stroke={accent} strokeWidth="1.7" />
      <circle cx={x + 35} cy={89 + (index % 2) * 12} r="18" fill="var(--surface)" stroke={line} />
      <Symbol name={index === 0 ? spec.subject : index === 1 ? "check" : spec.result} x={x + 22} y={76 + (index % 2) * 12} size={26} color={accent} />
      <path d={`M${x + 13} ${123 + (index % 2) * 12}h44`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    </g>)}
    <path d="m108 103 10 0m-5-5 5 5-5 5m77-5h10m-5-5 5 5-5 5" fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <path d={`M${40 + spec.detail * 11} 46h78M199 48h52`} stroke={line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function BlueprintScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M44 32h228v136H44z" fill={soft} stroke={accent} strokeWidth="1.8" />
    {[76, 108, 140, 172, 204, 236].map((x) => <path key={x} d={`M${x} 33v134`} stroke={line} strokeWidth=".7" />)}
    {[62, 92, 122, 152].map((y) => <path key={y} d={`M45 ${y}h226`} stroke={line} strokeWidth=".7" />)}
    <circle cx="148" cy="98" r="46" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <Symbol name={spec.subject} x={120} y={70} size={56} color={accent} />
    <circle cx="68" cy="56" r="14" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <circle cx="246" cy="143" r="14" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d="M82 56h25l16 24M193 116l38 27" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="4 4" />
    <Symbol name={spec.result} x={237} y={134} size={18} color={accent} />
    <path d={`M56 ${146 - spec.detail * 7}h39M210 ${52 + spec.detail * 6}h45`} stroke={accent} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function NetworkPolicyScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M28 74 67 51l39 23v78H28zM214 74l39-23 39 23v78h-78z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M38 76h58M224 76h58" stroke={line} strokeWidth="1.5" />
    <rect x="42" y="89" width="22" height="46" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.4" />
    <rect x="70" y="89" width="22" height="46" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.4" />
    <path d="M48 99h10m-10 11h10m-10 11h10m18-22h10m-10 11h10m-10 11h10" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="243" cy="101" r="10" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <circle cx="267" cy="101" r="10" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d="M232 128h46m-35-17v17m24-17v17" fill="none" stroke={accent} strokeWidth="1.6" />
    <path d="M106 104h25m58 0h25" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    <path d="M130 42h60v113h-60z" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M138 53h44M138 131h44" stroke={line} strokeWidth="1.7" />
    <path d="M145 72h30v37l-15 11-15-11z" fill={soft} stroke={accent} strokeWidth="1.7" strokeLinejoin="round" />
    <Symbol name="key" x={148} y={80} size={24} color={accent} />
  </g>;
}

function MeetingScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <rect x="101" y="29" width="119" height="75" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <rect x="112" y="39" width="97" height="54" rx="2" fill={soft} />
    <Symbol name={spec.subject} x={121} y={48} size={34} color={accent} />
    <path d="M160 73h37M160 83h27" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    <path d="M56 143h210l-25 20H81z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    {[86, 157, 230].map((x, index) => <g key={x}>
      <circle cx={x} cy={116 + (index % 2) * 3} r="13" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <path d={`M${x - 20} 143q3-19 20-19 17 0 20 19`} fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    </g>)}
    <rect x="142" y="137" width="38" height="19" rx="1" fill="var(--surface)" stroke={line} />
    <Symbol name={spec.result} x={151} y={139} size={16} color={accent} />
    {spec.detail === 2 && <path d="M263 52v37m-13-18h26" stroke={line} strokeWidth="2" />}
  </g>;
}

function PrivacyScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <circle cx="62" cy="104" r="26" fill={soft} stroke={accent} strokeWidth="1.7" />
    <Symbol name={spec.subject} x={45} y={87} size={34} color={accent} />
    <path d="M91 104h52m-10-5 10 5-10 5M180 104h49m-10-5 10 5-10 5" fill="none" stroke={accent} strokeWidth="2" />
    <ellipse cx="162" cy="75" rx="24" ry="8" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d="M138 75v62c0 12 48 12 48 0V75" fill={soft} stroke={accent} strokeWidth="1.5" />
    <ellipse cx="162" cy="137" rx="24" ry="8" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M148 99h28M148 110h28" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <rect x="232" y="75" width="55" height="64" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <Symbol name={spec.result} x={244} y={87} size={30} color={accent} />
    <path d="M242 129h34M46 146h37" stroke={line} strokeWidth="2" strokeLinecap="round" />
    {spec.detail > 1 && <path d="M128 39h68M136 47h43" stroke={line} strokeWidth="2" strokeLinecap="round" />}
  </g>;
}

function IndustrialScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M25 159V83l46 22V83l48 22V69h58v90z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M135 69V44h21v25M40 128h18m17 0h18m20 0h18m17 0h18" stroke={line} strokeWidth="3" strokeLinecap="round" />
    <path d="M185 129h41l13-18h43v48h-97z" fill="var(--surface)" stroke={accent} strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="214" cy="145" r="7" fill={soft} stroke={accent} /><circle cx="258" cy="145" r="7" fill={soft} stroke={accent} />
    <path d="M188 69h90v24h-90z" fill="var(--surface)" stroke={line} />
    <Symbol name={spec.subject} x={196} y={72} size={18} color={accent} />
    <Symbol name={spec.result} x={246} y={71} size={18} color={accent} />
    <path d="M195 102h69" stroke={line} strokeWidth="2" strokeDasharray="4 4" />
  </g>;
}

function VehicleScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M32 119h31l22-45h120l35 45h38v35H32z" fill={soft} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <path d="M87 78h49v39H68zM144 78h56l29 39h-85z" fill="var(--surface)" stroke={line} strokeWidth="1.5" />
    <circle cx="84" cy="154" r="17" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <circle cx="234" cy="154" r="17" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M150 117v-9m0-18V67h55" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    <rect x="207" y="25" width="79" height="61" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <Symbol name={spec.result} x={232} y={36} size={29} color={accent} />
    <path d="M217 76h60" stroke={line} strokeWidth="2" />
  </g>;
}

function VideoScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M28 161h265" stroke={line} strokeWidth="2" />
    <path d="M49 48h127v82H49z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M60 59h105v61H60z" fill={soft} stroke={line} />
    <Symbol name={spec.subject} x={91} y={71} size={42} color={accent} />
    <path d="M112 131v17m-26 0h52M190 56h79l-11 26h-69z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M201 84l14 17h28l14-17M229 101v19" fill="none" stroke={line} strokeWidth="2" />
    <circle cx="229" cy="131" r="20" fill={soft} stroke={accent} strokeWidth="1.5" />
    <Symbol name={spec.result} x={217} y={119} size={24} color={accent} />
    <path d="M190 154h87" stroke={line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function ProductScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M40 53h147v98H40z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M40 72h147M51 62h46" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <rect x="54" y="83" width="76" height="54" rx="2" fill={soft} />
    <Symbol name={spec.subject} x={74} y={92} size={34} color={accent} />
    <path d="M141 91h35M141 103h27M141 115h32" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <path d="M199 72h79v75h-79z" fill={soft} stroke={accent} strokeWidth="1.8" />
    <path d="m199 72 39-21 40 21M238 51v96" fill="none" stroke={accent} strokeWidth="1.8" />
    <circle cx="238" cy="99" r="20" fill="var(--surface)" stroke={line} />
    <Symbol name={spec.result} x={226} y={87} size={24} color={accent} />
    {spec.detail === 3 && <path d="M213 35h51" stroke={line} strokeWidth="2" />}
  </g>;
}

function ProductDevelopmentScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="28" y="43" width="192" height="107" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M28 60h192M42 51h26" stroke={line} strokeWidth="1.7" strokeLinecap="round" />
    <path d="m58 83-10 9 10 9m27-18 10 9-10 9m-9-24-9 31" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M48 120h49M48 130h35" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
    <rect x="115" y="73" width="87" height="59" rx="2" fill={soft} stroke={line} strokeWidth="1.2" />
    <path d="M125 83h52M125 94h34M125 119h66" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M175 99h16v12h-16z" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d="M118 150v12m-24 0h49" stroke={line} strokeWidth="1.8" />
    <path d="M220 101h17" stroke={accent} strokeWidth="1.8" strokeDasharray="4 4" />
    <path d="M238 80h53v69h-53z" fill={soft} stroke={accent} strokeWidth="1.8" />
    <path d="m238 80 26-16 27 16" fill="none" stroke={accent} strokeWidth="1.8" />
    <Symbol name="work" x={249} y={97} size={31} color={accent} />
  </g>;
}

function ProductPlanningScene({ accent, soft, line }: DrawProps) {
  return <g>
    <path d="M26 40h268v122H26z" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M26 59h268M119 59v103m87-103v103M39 49h62m35 0h52m35 0h53" stroke={line} strokeWidth="1.5" />
    <rect x="39" y="72" width="67" height="28" rx="2" fill={soft} stroke={line} strokeWidth="1.2" />
    <rect x="39" y="108" width="67" height="28" rx="2" fill="var(--surface)" stroke={line} strokeWidth="1.2" />
    <path d="M49 81h40m-40 9h29m-29 27h40m-40 9h24" stroke={line} strokeWidth="1.7" strokeLinecap="round" />
    <path d="M129 76h67v50h-67z" fill={soft} stroke={accent} strokeWidth="2" />
    <circle cx="146" cy="93" r="8" fill="var(--surface)" stroke={accent} strokeWidth="1.4" />
    <path d="m142 93 3 3 6-7M161 86h26m-26 10h20m-42 17h47" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M144 137h38m-10-5 10 5-10 5" fill="none" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <rect x="217" y="76" width="65" height="70" rx="2" fill="var(--surface)" stroke={line} strokeWidth="1.3" />
    <Symbol name="product" x={233} y={84} size={34} color={accent} />
    <path d="M228 129h43m-43 8h28" stroke={line} strokeWidth="1.7" strokeLinecap="round" />
  </g>;
}

function ProductTestingScene({ accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <path d="M35 89h86v61H35z" fill={soft} stroke={accent} strokeWidth="1.8" />
    <path d="m35 89 43-22 43 22M78 67v83" fill="none" stroke={accent} strokeWidth="1.8" />
    <Symbol name="product" x={52} y={101} size={32} color={accent} />
    <path d="M126 115h25" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="139" cy="104" r="18" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <path d="m151 117 13 13" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    <rect x="167" y="44" width="124" height="106" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M167 62h124M180 53h25" stroke={line} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="193" cy="87" r="11" fill={soft} stroke={accent} strokeWidth="1.4" />
    <path d="m188 87 4 4 6-8" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M213 82h62m-62 10h43" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="193" cy="120" r="11" fill="var(--surface)" stroke={accent} strokeWidth="1.4" />
    <path d="m189 116 8 8m0-8-8 8" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M213 115h62m-62 10h48" stroke={line} strokeWidth="1.8" strokeLinecap="round" />
  </g>;
}

function CustomerScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <circle cx="72" cy="98" r="18" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M38 160q2-38 34-38 32 0 34 38" fill={soft} stroke={accent} strokeWidth="1.8" />
    <circle cx="247" cy="98" r="18" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M213 160q2-38 34-38 32 0 34 38" fill={soft} stroke={accent} strokeWidth="1.8" />
    <path d="M108 135h103l-14 25h-75z" fill="var(--surface)" stroke={line} strokeWidth="1.5" />
    <rect x="119" y="34" width="81" height="74" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <rect x="127" y="42" width="65" height="48" rx="1" fill={soft} />
    <Symbol name={spec.subject} x={144} y={50} size={31} color={accent} />
    <Symbol name={spec.result} x={146} y={133} size={25} color={accent} />
    <path d="M130 98h59M109 76l-23 14m125-14 22 14" stroke={line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function ClassroomScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <path d="M48 36h224v104H48z" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <path d="M59 47h202v81H59z" fill={soft} stroke={line} strokeWidth="1.2" />
    <Symbol name={spec.subject} x={88} y={61} size={50} color={accent} />
    <path d="M157 69h78M157 82h59M157 95h72M157 108h43" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    <circle cx="65" cy="154" r="12" fill="var(--surface)" stroke={accent} />
    <circle cx="142" cy="154" r="12" fill="var(--surface)" stroke={accent} />
    <circle cx="224" cy="154" r="12" fill="var(--surface)" stroke={accent} />
    <path d="M45 183q1-20 20-20t20 20M122 183q1-20 20-20t20 20M204 183q1-20 20-20t20 20" fill={soft} stroke={line} strokeWidth="1.5" />
    <Symbol name={spec.result} x={257} y={154} size={24} color={accent} />
  </g>;
}

function ResearchScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="45" y="54" width="116" height="91" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <path d="M56 129h92M56 117h68" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <circle cx="101" cy="83" r="24" fill={soft} stroke={line} />
    <Symbol name={spec.subject} x={86} y={68} size={30} color={accent} />
    <path d="M172 61h82l-13 82h-56z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M179 91h68M187 107h54M193 122h42" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <circle cx="259" cy="66" r="28" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <Symbol name={spec.result} x={243} y={50} size={32} color={accent} />
    <path d="M172 60h-13M51 43h49" stroke={line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function SupportScene({ spec, accent, soft, line }: DrawProps) {
  return <g>
    <WorkSurface line={line} />
    <rect x="42" y="64" width="153" height="83" rx="4" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <rect x="53" y="75" width="131" height="57" rx="2" fill={soft} />
    <Symbol name={spec.subject} x={68} y={85} size={35} color={accent} />
    <path d="M117 89h53M117 101h38M117 113h48" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    <path d="M106 147v12m-24 0h48" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <path d="M214 37h81v73h-46l-20 15v-15h-15z" fill="var(--surface)" stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M225 55h59M225 67h46M225 79h54" stroke={line} strokeWidth="2" strokeLinecap="round" />
    <Symbol name={spec.result} x={250} y={127} size={30} color={accent} />
  </g>;
}

const scenes: Record<SceneName, (props: DrawProps) => React.ReactNode> = {
  dashboard: DashboardScene,
  evidence: EvidenceScene,
  incident: IncidentScene,
  assessment: AssessmentScene,
  "legal-options": LegalOptionsScene,
  "grc-matrix": GrcMatrixScene,
  "server-assessment": ServerAssessmentScene,
  "certification-ledger": CertificationLedgerScene,
  "audit-report": AuditReportScene,
  "policy-exceptions": PolicyExceptionsScene,
  workbench: WorkbenchScene,
  pipeline: PipelineScene,
  blueprint: BlueprintScene,
  meeting: MeetingScene,
  privacy: PrivacyScene,
  industrial: IndustrialScene,
  vehicle: VehicleScene,
  video: VideoScene,
  product: ProductScene,
  customer: CustomerScene,
  classroom: ClassroomScene,
  research: ResearchScene,
  support: SupportScene,
  "network-policy": NetworkPolicyScene,
  "product-development": ProductDevelopmentScene,
  "product-planning": ProductPlanningScene,
  "product-testing": ProductTestingScene,
};

export function RoleScene({ id, accent, soft, line }: { id: string; accent: string; soft: string; line: string }) {
  const spec = roleScenes[id];
  if (!spec) return null;
  const Scene = scenes[spec.scene];
  return <g data-role-scene={id}>
    <Scene spec={spec} accent={accent} soft={soft} line={line} />
  </g>;
}
