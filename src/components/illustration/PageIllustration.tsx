import {
  BookOpen,
  BrainCircuit,
  Bug,
  CarFront,
  ClipboardCheck,
  Cloud,
  Cpu,
  Database,
  Factory,
  FileText,
  Fingerprint,
  FlaskConical,
  FolderOpen,
  Globe,
  GraduationCap,
  Handshake,
  Headset,
  KeyRound,
  Laptop,
  Network,
  Package,
  Radar,
  Route,
  ScanSearch,
  Server,
  ShieldCheck,
  Siren,
  Smartphone,
  Users,
  Video,
  Wrench,
  GitBranch,
  type LucideIcon,
} from "lucide-react";

export type PageIllustrationKind =
  | "home"
  | "start"
  | "fields"
  | "careers"
  | "roadmaps"
  | "glossary"
  | "field"
  | "role"
  | "roadmap";

export type PageIllustrationProps = {
  kind: PageIllustrationKind;
  id?: string;
  title: string;
  className?: string;
};

type Motif =
  | "book" | "brain" | "bug" | "car" | "check" | "cloud" | "chip" | "data"
  | "factory" | "file" | "fingerprint" | "research" | "folder" | "web" | "learn"
  | "sales" | "support" | "key" | "laptop" | "network" | "product"
  | "radar" | "route" | "search" | "server" | "shield" | "incident"
  | "phone" | "people" | "video" | "work" | "source";

const icons: Record<Motif, LucideIcon> = {
  book: BookOpen,
  brain: BrainCircuit,
  bug: Bug,
  car: CarFront,
  check: ClipboardCheck,
  cloud: Cloud,
  chip: Cpu,
  data: Database,
  factory: Factory,
  file: FileText,
  fingerprint: Fingerprint,
  research: FlaskConical,
  folder: FolderOpen,
  web: Globe,
  learn: GraduationCap,
  sales: Handshake,
  support: Headset,
  key: KeyRound,
  laptop: Laptop,
  network: Network,
  product: Package,
  radar: Radar,
  route: Route,
  search: ScanSearch,
  server: Server,
  shield: ShieldCheck,
  incident: Siren,
  phone: Smartphone,
  people: Users,
  video: Video,
  work: Wrench,
  source: GitBranch,
};

const fieldMotifs: Record<string, Motif> = {
  ai: "brain",
  automotive: "car",
  cloud: "cloud",
  cryptography: "key",
  data: "data",
  endpoint: "laptop",
  identity: "fingerprint",
  "iot-embedded": "chip",
  mobile: "phone",
  network: "network",
  ot: "factory",
  "software-supply-chain": "source",
  system: "server",
  "video-physical": "video",
  web: "web",
};

// A deliberate pair for every published role: what the work concerns, then
// what the person does. This avoids turning every "engineer" into one image.
export const roleIllustrationMotifs: Record<string, readonly [Motif, Motif]> = {
  "ai-security-engineer": ["brain", "work"],
  "application-security-engineer": ["web", "work"],
  "automotive-security-engineer": ["car", "work"],
  "chief-privacy-officer": ["data", "people"],
  ciso: ["shield", "people"],
  "cloud-security-engineer": ["cloud", "work"],
  "cryptography-engineer": ["key", "work"],
  "cyber-threat-intelligence-analyst": ["radar", "search"],
  "cybersecurity-policy-researcher": ["check", "research"],
  "cybersecurity-privacy-legal-counsel": ["data", "check"],
  "cybersecurity-researcher": ["research", "search"],
  "cybersecurity-training-program-manager": ["learn", "people"],
  "data-security-engineer": ["data", "work"],
  "detection-engineer": ["radar", "work"],
  "devsecops-engineer": ["source", "work"],
  "digital-forensics-specialist": ["search", "file"],
  "endpoint-security-engineer": ["laptop", "work"],
  "firmware-security-engineer": ["chip", "work"],
  "grc-analyst": ["check", "search"],
  "iam-engineer": ["fingerprint", "work"],
  "incident-responder": ["incident", "shield"],
  "infrastructure-security-assessor": ["server", "check"],
  "infrastructure-security-engineer": ["server", "work"],
  "insider-threat-analyst": ["fingerprint", "radar"],
  "isms-p-certification-auditor": ["check", "file"],
  "malware-analyst": ["bug", "search"],
  "mobile-security-engineer": ["phone", "work"],
  "network-security-engineer": ["network", "work"],
  "open-source-security-engineer": ["source", "work"],
  "ot-security-engineer": ["factory", "work"],
  "police-cybercrime-investigator": ["search", "check"],
  "privacy-engineer": ["data", "work"],
  "privacy-impact-assessment-specialist": ["data", "check"],
  "privacy-manager": ["data", "people"],
  "product-security-engineer": ["product", "shield"],
  "red-team-operator": ["web", "search"],
  "security-account-manager": ["sales", "people"],
  "security-architect": ["network", "route"],
  "security-auditor": ["check", "search"],
  "security-awareness-specialist": ["learn", "book"],
  "security-certification-evaluator": ["check", "shield"],
  "security-consultant": ["shield", "check"],
  "security-policy-manager": ["check", "people"],
  "security-product-developer": ["product", "work"],
  "security-product-manager": ["product", "people"],
  "security-product-qa": ["product", "check"],
  "security-product-technical-writer": ["product", "file"],
  "security-program-manager": ["route", "people"],
  "security-sales-engineer": ["sales", "work"],
  "security-solution-engineer": ["network", "work"],
  "security-supply-chain-risk-manager": ["source", "check"],
  "security-support-engineer": ["support", "work"],
  "siem-platform-engineer": ["radar", "server"],
  "soc-analyst": ["radar", "search"],
  "soc-manager": ["radar", "people"],
  "threat-hunter": ["network", "search"],
  "video-security-specialist": ["video", "work"],
  "vulnerability-management-specialist": ["search", "check"],
  "vulnerability-researcher": ["research", "search"],
  "web-penetration-tester": ["web", "search"],
};

export const roadmapIllustrationMotifs: Record<string, Motif> = {
  "ai-security-career": "brain",
  "application-security": "web",
  "cloud-security": "cloud",
  "cybersecurity-fundamentals": "folder",
  devsecops: "source",
  "grc-security-management": "check",
  "industrial-mobility-security": "factory",
  "penetration-testing": "search",
  "police-cybercrime-career": "search",
  "privacy-security-leadership": "data",
  "security-customer-career": "people",
  "security-education-career": "learn",
  "security-operations": "incident",
  "security-product-customer": "product",
  "security-research-career": "research",
};

const palette = [
  { accent: "#3d739e", soft: "#dceaf2", line: "#a8c1d2" },
  { accent: "#487e78", soft: "#dfeee8", line: "#aecbc3" },
  { accent: "#9b752f", soft: "#f3e9ce", line: "#d7c698" },
  { accent: "#746c91", soft: "#e9e6f1", line: "#c2bdd6" },
  { accent: "#61798e", soft: "#e3ebf1", line: "#b6c7d2" },
];

const kindLabels: Record<PageIllustrationKind, string> = {
  home: "위키 홈",
  start: "시작 안내",
  fields: "보안 분야 목록",
  careers: "보안 직무 목록",
  roadmaps: "커리어 경로 목록",
  glossary: "용어집",
  field: "보안 분야",
  role: "보안 직무",
  roadmap: "커리어 경로",
};

function hash(value: string) {
  let result = 0;
  for (const char of value) result = (result * 31 + char.charCodeAt(0)) >>> 0;
  return result;
}

function subjectFor(kind: PageIllustrationKind, id: string): Motif {
  if (kind === "home") return "folder";
  if (kind === "start") return "route";
  if (kind === "fields") return "shield";
  if (kind === "careers") return "people";
  if (kind === "roadmaps") return "route";
  if (kind === "glossary") return "book";
  if (kind === "field" && fieldMotifs[id]) return fieldMotifs[id];

  // Career documents can share a technical domain while doing quite different work.
  // The subject shows the protected environment; the small stamp shows the work.
  if (/police|cybercrime|forensic|investigat/.test(id)) return "search";
  if (/training|awareness|education/.test(id)) return "learn";
  if (/automotive|mobility/.test(id)) return "car";
  if (/industrial|^ot-|ot-security/.test(id)) return "factory";
  if (/video/.test(id)) return "video";
  if (/iot|firmware|embedded/.test(id)) return "chip";
  if (/mobile/.test(id)) return "phone";
  if (/cloud/.test(id)) return "cloud";
  if (/identity|^iam-|cryptograph/.test(id)) return "key";
  if (/privacy|data/.test(id)) return "data";
  if (/network/.test(id)) return "network";
  if (/infrastructure|endpoint|system/.test(id)) return "server";
  if (/open-source|supply-chain|devsecops/.test(id)) return "source";
  if (/application|web|penetration|red-team/.test(id)) return "web";
  if (/^ai-|ai-security/.test(id)) return "brain";
  if (/malware|threat|detection|^soc-|incident/.test(id)) return "radar";
  if (/vulnerabilit/.test(id)) return "search";
  if (/product|solution/.test(id)) return "product";
  if (/sales|account|customer|support/.test(id)) return "sales";
  if (/research/.test(id)) return "research";
  if (/policy|grc|auditor|certification|legal|manager|ciso|chief/.test(id)) return "check";
  return "shield";
}

function workFor(kind: PageIllustrationKind, id: string): Motif {
  if (kind === "home") return "book";
  if (kind === "start") return "search";
  if (kind === "fields") return "folder";
  if (kind === "careers") return "file";
  if (kind === "roadmaps") return "check";
  if (kind === "glossary") return "search";
  if (kind === "field") return "work";
  if (kind === "roadmap") return "route";
  if (/writer/.test(id)) return "file";
  if (/training|awareness|education/.test(id)) return "learn";
  if (/sales|account/.test(id)) return "sales";
  if (/support/.test(id)) return "support";
  if (/researcher|analyst|hunter|forensic|investigat|penetration|red-team/.test(id)) return "search";
  if (/auditor|assessor|evaluator|policy|grc|legal/.test(id)) return "check";
  if (/responder|incident/.test(id)) return "incident";
  if (/manager|ciso|chief|program/.test(id)) return "people";
  if (/architect|engineer|developer/.test(id)) return "work";
  return "file";
}

function Glyph({ motif, x, y, size, color }: { motif: Motif; x: number; y: number; size: number; color: string }) {
  const Icon = icons[motif];
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
    <Icon width={24} height={24} stroke={color} strokeWidth={1.45} fill="none" aria-hidden="true" />
  </g>;
}

function OrbitDots({ seed, accent }: { seed: number; accent: string }) {
  const count = 3 + seed % 3;
  return <g fill={accent} opacity=".7">
    {Array.from({ length: count }, (_, index) => <circle key={index} cx={268 + (index % 2) * 12} cy={40 + index * 13} r={index === count - 1 ? 3 : 2} />)}
  </g>;
}

function CatalogMarks({ seed, colors }: { seed: number; colors: (typeof palette)[number] }) {
  return <g>
    {Array.from({ length: 11 }, (_, index) => <rect
      key={index}
      x={224 + index * 7}
      y={182}
      width={4}
      height={4}
      rx={0.5}
      fill={seed & (1 << index) ? colors.accent : colors.line}
    />)}
  </g>;
}

function DocumentScene({ subject, action, seed, colors }: { subject: Motif; action: Motif; seed: number; colors: (typeof palette)[number] }) {
  const shift = seed % 3;
  return <g>
    <path d="M23 171h274" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
    <path d={`M28 ${124 + shift * 5}h37M254 ${83 + shift * 4}h36`} stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
    <rect x="44" y="34" width="215" height="139" rx="3" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
    <path d="M44 52h215" stroke="var(--line)" strokeWidth="1.5" />
    <circle cx="55" cy="43" r="2.5" fill={colors.accent} /><circle cx="64" cy="43" r="2.5" fill={colors.line} />
    <path d="M72 43h56" stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
    <rect x="60" y="69" width="119" height="86" rx="2" fill={colors.soft} opacity=".8" />
    <Glyph motif={subject} x={83} y={78} size={69} color={colors.accent} />
    <path d="M194 78h45M194 88h33M194 98h39" stroke={colors.line} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="215" cy="130" r="24" fill={colors.soft} stroke={colors.line} strokeWidth="1.5" />
    <Glyph motif={action} x={199} y={114} size={32} color={colors.accent} />
    <path d={`M260 120h${17 + shift * 4}M260 129h${26 - shift * 3}`} stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
    <OrbitDots seed={seed} accent={colors.accent} />
  </g>;
}

function FieldScene({ subject, action, seed, colors }: { subject: Motif; action: Motif; seed: number; colors: (typeof palette)[number] }) {
  return <g>
    <path d="M28 171h262" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
    <path d="M90 140 42 118M212 139l54-32M148 66l-10-35" stroke={colors.line} strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="151" cy="106" r="68" fill={colors.soft} opacity=".8" stroke={colors.line} strokeWidth="1.6" />
    <circle cx="151" cy="106" r="53" fill="var(--surface)" stroke={colors.line} strokeWidth="1.4" />
    <Glyph motif={subject} x={110} y={65} size={82} color={colors.accent} />
    <rect x="21" y="96" width="43" height="43" rx="3" fill="var(--surface)" stroke={colors.line} strokeWidth="1.4" />
    <Glyph motif={action} x={31} y={106} size={23} color={colors.accent} />
    <rect x="247" y="87" width="43" height="43" rx="3" fill="var(--surface)" stroke={colors.line} strokeWidth="1.4" />
    <Glyph motif="shield" x={257} y={97} size={23} color={colors.accent} />
    <circle cx="138" cy="30" r="7" fill={colors.soft} stroke={colors.accent} strokeWidth="1.5" />
    <path d={`M28 ${36 + seed % 8}h28M253 ${161 - seed % 9}h33`} stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
    <OrbitDots seed={seed} accent={colors.accent} />
  </g>;
}

function RoadmapScene({ subject, seed, colors }: { subject: Motif; seed: number; colors: (typeof palette)[number] }) {
  return <g>
    <path d="M21 166c47 0 47-82 93-82 42 0 46 77 87 77 41 0 40-91 91-91" fill="none" stroke={colors.line} strokeWidth="8" strokeLinecap="round" />
    <path d="M21 166c47 0 47-82 93-82 42 0 46 77 87 77 41 0 40-91 91-91" fill="none" stroke={colors.accent} strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" />
    <circle cx="40" cy="148" r="22" fill="var(--surface)" stroke={colors.accent} strokeWidth="2" />
    <Glyph motif="search" x={28} y={136} size={24} color={colors.accent} />
    <circle cx="116" cy="84" r="22" fill="var(--surface)" stroke={colors.accent} strokeWidth="2" />
    <Glyph motif="file" x={104} y={72} size={24} color={colors.accent} />
    <circle cx="208" cy="155" r="22" fill="var(--surface)" stroke={colors.accent} strokeWidth="2" />
    <Glyph motif="check" x={196} y={143} size={24} color={colors.accent} />
    <rect x="241" y="24" width="62" height="62" rx="3" fill={colors.soft} stroke={colors.accent} strokeWidth="1.5" />
    <Glyph motif={subject} x={255} y={38} size={34} color={colors.accent} />
    <path d={`M24 ${34 + seed % 8}h37M157 ${28 + seed % 5}h34M250 103h28`} stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

function IndexScene({ subject, action, seed, colors }: { subject: Motif; action: Motif; seed: number; colors: (typeof palette)[number] }) {
  return <g>
    <path d="M27 170h260" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 5" />
    <path d="M61 46h63l11 13h117v105H61z" fill={colors.soft} stroke={colors.accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M72 72h169M72 84h169" stroke={colors.line} strokeWidth="1.5" />
    <rect x="78" y="97" width="100" height="54" rx="2" fill="var(--surface)" stroke={colors.line} strokeWidth="1.3" />
    <Glyph motif={subject} x={103} y={105} size={44} color={colors.accent} />
    <rect x="186" y="97" width="52" height="54" rx="2" fill="var(--surface)" stroke={colors.line} strokeWidth="1.3" />
    <Glyph motif={action} x={196} y={107} size={32} color={colors.accent} />
    <circle cx="45" cy="104" r="10" fill="var(--surface)" stroke={colors.accent} strokeWidth="1.5" />
    <circle cx="270" cy="128" r="10" fill="var(--surface)" stroke={colors.accent} strokeWidth="1.5" />
    <path d={`M35 ${34 + seed % 7}h36M253 ${47 + seed % 5}h36`} stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
  </g>;
}

export function PageIllustration({ kind, id, title, className }: PageIllustrationProps) {
  const identity = `${kind}:${id ?? title}`;
  const seed = hash(identity);
  const colors = palette[seed % palette.length];
  const rolePair = kind === "role" && id ? roleIllustrationMotifs[id] : undefined;
  const roadmapMotif = kind === "roadmap" && id ? roadmapIllustrationMotifs[id] : undefined;
  const subject = rolePair?.[0] ?? roadmapMotif ?? subjectFor(kind, (id ?? title).toLowerCase());
  const action = rolePair?.[1] ?? workFor(kind, (id ?? title).toLowerCase());
  const rootClass = ["page-illustration", className].filter(Boolean).join(" ");

  return <svg
    className={rootClass}
    data-wiki-illustration={identity}
    viewBox="0 0 320 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={`${title} ${kindLabels[kind]} 삽화`}
    focusable="false"
  >
    {kind === "roadmap" || kind === "roadmaps"
      ? <RoadmapScene subject={subject} seed={seed} colors={colors} />
      : kind === "field"
        ? <FieldScene subject={subject} action={action} seed={seed} colors={colors} />
        : kind === "role"
          ? <DocumentScene subject={subject} action={action} seed={seed} colors={colors} />
          : <IndexScene subject={subject} action={action} seed={seed} colors={colors} />}
    <CatalogMarks seed={seed} colors={colors} />
  </svg>;
}
