type Colors = { accent: string; soft: string; line: string };
type SceneProps = Colors & { id: string };
type IndexProps = Colors & { kind: string };

export const fieldSceneDescriptions: Record<string, string> = {
  ai: "AI 서비스 화면과 평가 기록을 함께 검토하는 장면",
  automotive: "차량의 전자 장치와 연결 서비스를 함께 살피는 장면",
  cloud: "클라우드 안의 계정, 서비스, 저장소 책임을 나누는 장면",
  cryptography: "암호 키를 보관하고 교체하며 사용을 확인하는 장면",
  data: "데이터 보관과 승인된 공유 경로를 살피는 장면",
  endpoint: "직원의 업무용 단말 여러 대를 관리하는 장면",
  identity: "직원 계정의 접근 신청과 만료를 확인하는 장면",
  "iot-embedded": "연결 기기의 회로와 소프트웨어 갱신을 살피는 장면",
  mobile: "모바일 앱의 배포와 갱신, 서비스 연결을 살피는 장면",
  network: "두 업무 공간 사이 통신 경로와 경계 장치를 살피는 장면",
  ot: "가동 중인 공장 설비와 현장 제어 화면을 함께 살피는 장면",
  "software-supply-chain": "외부 코드가 제작과 출시 과정으로 들어오는 흐름을 확인하는 장면",
  system: "서버실의 여러 시스템과 점검 일정을 관리하는 장면",
  "video-physical": "카메라 촬영 구역과 영상 보관, 열람 기록을 확인하는 장면",
  web: "웹 화면과 서비스 연결, 데이터 취급을 검토하는 장면",
};

export const roadmapSceneDescriptions: Record<string, string> = {
  "ai-security-career": "AI 제품 기획, 평가, 출시 판단의 업무 기록을 준비하는 경로",
  "application-security": "서비스 설계 검토에서 평가와 수정 인계로 이어지는 경로",
  "cloud-security": "클라우드 책임 구분에서 운영 기록과 판단 자료로 이어지는 경로",
  "cybersecurity-fundamentals": "채용 공고를 읽고 작은 업무 샘플과 지원서를 만드는 경로",
  devsecops: "개발 흐름의 경고를 검토하고 예외와 출시를 조율하는 경로",
  "grc-security-management": "정책, 통제 증거, 위험 판단 자료를 이어 만드는 경로",
  "industrial-mobility-security": "산업 설비와 차량 중 목표 환경을 골라 안전과 변경 기록을 준비하는 경로",
  "penetration-testing": "허가된 평가 범위를 정하고 결과 보고서를 인계하는 경로",
  "police-cybercrime-career": "경찰 채용 공고와 자격 서류, 전형을 확인하는 경로",
  "privacy-security-leadership": "개인정보 처리 검토에서 조직 운영과 리더십 판단으로 이어지는 경로",
  "security-customer-career": "고객 과제 확인에서 제안, 도입, 지원으로 이어지는 경로",
  "security-education-career": "교육 대상을 정하고 과정을 운영한 뒤 피드백을 반영하는 경로",
  "security-operations": "경보 판단, 사고 인계, 사후 개선으로 이어지는 경로",
  "security-product-customer": "보안 제품 요구, 구현, 품질 검증과 사용 설명으로 이어지는 경로",
  "security-research-career": "연구 질문, 근거 정리, 발표와 공유로 이어지는 경로",
};

export const indexSceneDescriptions: Record<string, string> = {
  home: "보안 커리어 위키의 펼쳐진 자료 서랍과 읽을 문서",
  start: "직무 공고, 업무 샘플, 지원 자료를 차례로 살피는 책상",
  fields: "서버, 웹, 클라우드, 산업 현장 등 보호 환경별 자료 서랍",
  careers: "여러 보안 직무의 업무 기록을 펼쳐 놓은 게시판",
  roadmaps: "다른 목적지로 갈라지는 커리어 경로와 이정표",
  glossary: "보안 직무 용어를 찾는 색인 카드와 돋보기",
  "not-found": "찾는 문서가 비어 있는 서랍과 되돌아가는 길을 보여주는 장면",
  legacy: "옛 폴더의 문서가 새 분야 폴더로 옮겨진 장면",
};

function Ground({ line, soft }: Pick<Colors, "line" | "soft">) {
  return <g>
    <path d="M18 175H302" stroke={line} strokeWidth="1.5" />
    <path d="M28 181h19m219 0h27" stroke={line} strokeWidth="1" />
    <path d="M21 172h278" stroke={soft} strokeWidth="5" opacity=".6" />
  </g>;
}

function Paper({ x, y, w = 48, h = 63, accent, soft, line, checked = false }: Colors & { x: number; y: number; w?: number; h?: number; checked?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d={`M${w - 13} 0v13h13`} fill={soft} stroke={accent} strokeWidth="1.2" />
    <path d={`M8 18h${Math.max(13, w - 24)}M8 27h${Math.max(9, w - 19)}M8 36h${Math.max(11, w - 26)}`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    {checked && <path d={`m${w - 19} ${h - 15} 4 4 8-9`} fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
  </g>;
}

function Window({ x, y, w = 110, h = 82, accent, line, children }: Colors & { x: number; y: number; w?: number; h?: number; children?: React.ReactNode }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="4" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <path d={`M0 15h${w}`} stroke={line} strokeWidth="1.4" />
    <circle cx="8" cy="8" r="2" fill={accent} />
    <circle cx="16" cy="8" r="2" fill={line} />
    {children}
  </g>;
}

function Laptop({ x, y, accent, soft, line, w = 70 }: Colors & { x: number; y: number; w?: number }) {
  const h = w * .58;
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
    <rect x="7" y="7" width={w - 14} height={h - 14} rx="1" fill={soft} />
    <path d={`M-6 ${h + 4}h${w + 12}l-5 5H-1z`} fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d={`M${w * .36} ${h + 6}h${w * .28}`} stroke={line} strokeWidth="1" />
  </g>;
}

function ServerRack({ x, y, accent, soft, line, w = 72, h = 112 }: Colors & { x: number; y: number; w?: number; h?: number }) {
  const rows = Math.min(4, Math.max(1, Math.floor((h - 8) / 24)));
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    {Array.from({ length: rows }, (_, i) => <g key={i}>
      <rect x="8" y={10 + i * 24} width={w - 16} height="17" rx="2" fill={i === 2 ? soft : "var(--surface)"} stroke={line} strokeWidth="1.3" />
      <circle cx="17" cy={18 + i * 24} r="2.5" fill={accent} />
      <path d={`M${w - 29} ${18 + i * 24}h12`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    </g>)}
  </g>;
}

function Person({ x, y, accent, soft, line, scale = 1 }: Colors & { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx="13" cy="11" r="9" fill={soft} stroke={accent} strokeWidth="1.6" />
    <path d="M1 48V35c0-10 5-16 12-16s12 6 12 16v13" fill="var(--surface)" stroke={accent} strokeWidth="1.6" />
    <path d="M7 33h12" stroke={line} strokeWidth="1.5" />
  </g>;
}

function Connector({ x1, y1, x2, y2, accent, dashed = false }: { x1: number; y1: number; x2: number; y2: number; accent: string; dashed?: boolean }) {
  return <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? "4 4" : undefined}>
    <path d={`M${x1} ${y1} ${x2} ${y2}`} />
    <path d={`m${x2 - 7} ${y2 - 4} 7 4-7 4`} transform={`rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI} ${x2} ${y2})`} />
  </g>;
}

function Cloud({ x, y, accent, soft, line }: Colors & { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M14 49c-10 0-14-7-14-15 0-8 6-14 14-15C18 7 27 0 41 0c13 0 21 7 24 16 12-1 20 8 20 18 0 8-6 15-16 15z" fill={soft} stroke={accent} strokeWidth="1.8" />
    <path d="M17 36h50" stroke={line} strokeWidth="1.3" />
  </g>;
}

function ShieldCheck({ x, y, accent, soft }: Pick<Colors, "accent" | "soft"> & { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M15 0 29 5v14c0 11-6 17-14 22C7 36 1 30 1 19V5z" fill={soft} stroke={accent} strokeWidth="1.7" />
    <path d="m9 19 5 5 8-9" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function Magnifier({ x, y, accent, soft, scale = 1 }: Pick<Colors, "accent" | "soft"> & { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round">
    <circle cx="14" cy="14" r="12" fill={soft} opacity=".65" />
    <path d="m24 24 16 16" />
  </g>;
}

function Briefcase({ x, y, accent, soft, line }: Colors & { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="2" y="11" width="64" height="41" rx="3" fill={soft} stroke={accent} strokeWidth="1.7" />
    <path d="M23 11V3h22v8M2 28h64M29 27v6h10v-6" fill="none" stroke={accent} strokeWidth="1.5" />
    <path d="M9 43h14m21 0h13" stroke={line} strokeWidth="1.5" />
  </g>;
}

function Factory({ x, y, accent, soft, line, scale = 1 }: Colors & { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 81V32l25 13V30l26 14V15h11v66z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 57h8v10h-8zm23 0h8v10h-8zm20 0h8v10h-8" fill="var(--surface)" stroke={line} strokeWidth="1.2" />
    <path d="M51 15V2h11v13" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
  </g>;
}

function Car({ x, y, accent, soft, line, scale = 1 }: Colors & { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M5 40 17 17c3-5 7-7 14-7h54c7 0 11 2 14 7l13 23 6 4v24H0V45z" fill={soft} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
    <path d="m26 18-9 23h86L93 18z" fill="var(--surface)" stroke={line} strokeWidth="1.4" />
    <path d="M58 18v23M8 52h16m70 0h16" stroke={line} strokeWidth="1.3" />
    <circle cx="25" cy="68" r="9" fill="var(--surface)" stroke={accent} strokeWidth="2" />
    <circle cx="92" cy="68" r="9" fill="var(--surface)" stroke={accent} strokeWidth="2" />
  </g>;
}

function Camera({ x, y, accent, soft, line }: Colors & { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M9 0v22h23" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 21 80 32 68 50 18 34z" fill={soft} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="70" cy="38" r="6" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
    <path d="m26 37-9 8m61 12 16 18m-27-11 8 12" stroke={line} strokeWidth="1.5" strokeDasharray="3 4" />
  </g>;
}

function Phone({ x, y, accent, soft, line, w = 60, h = 108 }: Colors & { x: number; y: number; w?: number; h?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="9" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
    <rect x="6" y="13" width={w - 12} height={h - 27} rx="2" fill={soft} />
    <path d={`M${w / 2 - 9} 7h18`} stroke={line} strokeWidth="2" strokeLinecap="round" />
    <circle cx={w / 2} cy={h - 7} r="2" fill={accent} />
  </g>;
}

function CheckMark({ x, y, accent, soft }: Pick<Colors, "accent" | "soft"> & { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle cx="15" cy="15" r="15" fill={soft} stroke={accent} strokeWidth="1.7" />
    <path d="m7 15 5 5 11-12" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

export function FieldScene({ id, accent, soft, line }: SceneProps) {
  const c = { accent, soft, line };
  const base = <Ground line={line} soft={soft} />;
  switch (id) {
    case "ai": return <g>{base}
      <Window {...c} x={30} y={38} w={141} h={119}>
        <path d="M27 40h53l18 20-18 20H27L9 60z" transform="translate(14 4)" fill={soft} stroke={accent} strokeWidth="1.8" />
        <circle cx="48" cy="64" r="4" fill={accent} /><circle cx="89" cy="64" r="4" fill={accent} /><circle cx="68" cy="96" r="4" fill={accent} />
        <path d="m48 64 20 32 21-32" stroke={accent} strokeWidth="1.5" />
      </Window>
      <Paper {...c} x={202} y={42} w={69} h={91} checked />
      <Person {...c} x={255} y={126} scale={.8} />
      <Connector x1={174} y1={95} x2={195} y2={95} accent={accent} />
    </g>;
    case "automotive": return <g>{base}
      <path d="M24 157h272" stroke={line} strokeWidth="3" strokeDasharray="18 11" />
      <Car {...c} x={59} y={67} scale={1.42} />
      <rect x="157" y="91" width="36" height="28" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <path d="M162 100h26m-26 6h18m-18 6h22" stroke={line} strokeWidth="1.5" />
      <Cloud {...c} x={210} y={24} />
      <path d="M192 88q33-31 63-28" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
    </g>;
    case "cloud": return <g>{base}
      <Cloud {...c} x={112} y={24} />
      <path d="M154 75v22m-65 0h131M89 97v17m66-17v17m65-17v17" fill="none" stroke={accent} strokeWidth="1.8" />
      <ServerRack {...c} x={58} y={113} w={63} h={55} />
      <rect x="139" y="115" width="34" height="45" rx="3" fill={soft} stroke={accent} strokeWidth="1.6" />
      <path d="M144 125h24m-24 8h24m-24 8h24" stroke={line} strokeWidth="1.4" />
      <Briefcase {...c} x={201} y={112} />
    </g>;
    case "cryptography": return <g>{base}
      <rect x="52" y="55" width="216" height="109" rx="5" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M52 88h216M125 88v76m74-76v76" stroke={line} strokeWidth="1.5" />
      <circle cx="89" cy="118" r="14" fill="var(--surface)" stroke={accent} strokeWidth="2" />
      <path d="M102 118h14v7h-6v6h-7" fill="none" stroke={accent} strokeWidth="2.2" />
      <rect x="144" y="105" width="36" height="39" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      <path d="M153 105v-7a9 9 0 0 1 18 0v7" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M217 122a16 16 0 1 1 20 15" fill="none" stroke={accent} strokeWidth="2.2" />
      <path d="m233 131 5 7 5-7" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M74 38h33m44 0h33m44 0h26" stroke={line} strokeWidth="2" strokeLinecap="round" />
    </g>;
    case "data": return <g>{base}
      <path d="M48 64v75c0 16 72 16 72 0V64" fill={soft} stroke={accent} strokeWidth="1.8" />
      <ellipse cx="84" cy="64" rx="36" ry="13" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      <path d="M48 88c0 17 72 17 72 0m-72 25c0 17 72 17 72 0" fill="none" stroke={line} strokeWidth="1.4" />
      <path d="M133 111h48" stroke={accent} strokeWidth="2" strokeDasharray="5 5" />
      <rect x="174" y="71" width="24" height="72" rx="2" fill={soft} stroke={accent} strokeWidth="1.7" />
      <path d="M180 84h12m-12 10h12m-12 10h12" stroke={line} strokeWidth="1.5" />
      <Paper {...c} x={221} y={80} w={55} h={69} checked />
      <Connector x1={202} y1={111} x2={216} y2={111} accent={accent} />
    </g>;
    case "endpoint": return <g>{base}
      <path d="M39 146h237" stroke={accent} strokeWidth="2" />
      <Laptop {...c} x={29} y={78} w={70} />
      <Laptop {...c} x={112} y={61} w={76} />
      <Laptop {...c} x={202} y={84} w={66} />
      <path d="M67 144v19m84-19v19m84-19v19" stroke={line} strokeWidth="1.4" />
      <CheckMark x={136} y={82} accent={accent} soft="var(--surface)" />
    </g>;
    case "identity": return <g>{base}
      <Person {...c} x={36} y={81} scale={1.25} />
      <rect x="102" y="64" width="54" height="82" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <circle cx="129" cy="89" r="11" fill={soft} stroke={accent} strokeWidth="1.3" />
      <path d="M113 124h32m-24-16h16" stroke={line} strokeWidth="2" />
      <path d="M160 97h34" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
      <rect x="191" y="52" width="75" height="104" rx="3" fill={soft} stroke={accent} strokeWidth="1.7" />
      <path d="M200 67h57M200 81h57M200 95h57" stroke={line} strokeWidth="1.4" />
      <circle cx="231" cy="123" r="15" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
      <path d="M231 113v10l7 5" stroke={accent} strokeWidth="1.6" fill="none" />
    </g>;
    case "iot-embedded": return <g>{base}
      <rect x="48" y="45" width="132" height="109" rx="12" fill={soft} stroke={accent} strokeWidth="2" />
      <rect x="75" y="72" width="78" height="55" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <rect x="99" y="86" width="29" height="25" rx="2" fill={soft} stroke={accent} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((n) => <g key={n} stroke={line} strokeWidth="2"><path d={`M${83 + n * 17} 72V62`} /><path d={`M${83 + n * 17} 127v10`} /></g>)}
      <path d="M186 98h48" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
      <rect x="229" y="68" width="50" height="60" rx="4" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <path d="M238 80h32m-32 8h20m-19 17 11 10 21-22" fill="none" stroke={accent} strokeWidth="1.8" />
    </g>;
    case "mobile": return <g>{base}
      <Phone {...c} x={40} y={36} w={73} h={125} />
      <rect x="59" y="72" width="35" height="35" rx="6" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
      <path d="M63 113h27m-27 7h19" stroke={line} strokeWidth="1.5" />
      <path d="M132 79h35" stroke={accent} strokeWidth="1.8" strokeDasharray="4 4" />
      <rect x="166" y="51" width="109" height="96" rx="4" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      <path d="M166 67h109M178 84h41m-41 11h67m-67 11h52" stroke={line} strokeWidth="1.5" />
      <path d="m240 124 9 9 15-17" fill="none" stroke={accent} strokeWidth="2" />
    </g>;
    case "network": return <g>{base}
      <rect x="32" y="75" width="79" height="87" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M32 75 71 52l40 23M48 92h14v13H48zm32 0h14v13H80zM48 117h14v13H48zm32 0h14v13H80z" fill="var(--surface)" stroke={line} strokeWidth="1.4" />
      <rect x="210" y="75" width="79" height="87" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="m210 75 40-23 39 23m-62 17h14v13h-14zm31 0h14v13h-14zm-31 25h14v13h-14zm31 0h14v13h-14z" fill="var(--surface)" stroke={line} strokeWidth="1.4" />
      <path d="M111 118h35m28 0h36" stroke={accent} strokeWidth="2.4" />
      <rect x="144" y="97" width="34" height="42" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      <path d="M153 107h16m-16 8h16m-16 8h16" stroke={line} strokeWidth="1.4" />
    </g>;
    case "ot": return <g>{base}
      <Factory {...c} x={25} y={59} scale={1.13} />
      <path d="M107 137h103m-96 0v23m20-23v23m19-23v23m19-23v23m19-23v23" stroke={accent} strokeWidth="1.8" />
      {[118, 145, 172].map((x) => <rect key={x} x={x} y="122" width="21" height="14" rx="2" fill={soft} stroke={accent} strokeWidth="1.2" />)}
      <Window {...c} x={212} y={46} w={82} h={82}>
        <path d="M11 55h60M11 38l13-10 12 10 12-15 19 11" stroke={accent} strokeWidth="1.6" fill="none" />
      </Window>
      <path d="M253 129v32" stroke={line} strokeWidth="2" />
      <circle cx="276" cy="148" r="10" fill={soft} stroke={accent} strokeWidth="1.5" />
    </g>;
    case "software-supply-chain": return <g>{base}
      <path d="M35 139h251" stroke={accent} strokeWidth="2" />
      {[41, 132, 224].map((x) => <rect key={x} x={x} y="79" width="53" height="52" rx="2" fill={soft} stroke={accent} strokeWidth="1.7" />)}
      <path d="M41 94h53m38 0h53m39 0h53" stroke={line} strokeWidth="1.2" />
      <path d="m61 111 9-10 9 10m71-1 9-9 9 9m70-2 10 9 10-9" fill="none" stroke={accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <Connector x1={95} y1={105} x2={126} y2={105} accent={accent} />
      <Connector x1={186} y1={105} x2={217} y2={105} accent={accent} />
      <Paper {...c} x={262} y={36} w={39} h={49} checked />
    </g>;
    case "system": return <g>{base}
      <ServerRack {...c} x={40} y={37} w={76} h={126} />
      <ServerRack {...c} x={124} y={54} w={69} h={109} />
      <Paper {...c} x={219} y={47} w={67} h={93} checked />
      <path d="M226 59h54m-54 9h54m-54 9h42" stroke={line} strokeWidth="1.3" />
      <path d="M198 105h17" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
    </g>;
    case "video-physical": return <g>{base}
      <Camera {...c} x={35} y={38} />
      <path d="M35 154h84m-67 0v-56m50 56v-38" stroke={line} strokeWidth="1.5" />
      <path d="M130 161V93l26-18 26 18v68" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M146 122h21v39h-21z" fill="var(--surface)" stroke={line} strokeWidth="1.4" />
      <Window {...c} x={204} y={50} w={84} h={92}>
        <path d="M10 50h66M10 63h66M10 76h52" stroke={line} strokeWidth="1.5" />
        <circle cx="20" cy="35" r="8" fill={soft} stroke={accent} strokeWidth="1.2" />
      </Window>
    </g>;
    case "web": return <g>{base}
      <Window {...c} x={30} y={38} w={153} h={117}>
        <rect x="12" y="27" width="53" height="56" rx="2" fill={soft} stroke={line} strokeWidth="1.2" />
        <path d="M74 31h65m-65 13h65m-65 13h47m-47 13h57" stroke={line} strokeWidth="1.6" />
        <circle cx="38" cy="49" r="12" fill="var(--surface)" stroke={accent} strokeWidth="1.2" />
      </Window>
      <path d="M187 93h36" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
      <rect x="224" y="59" width="64" height="76" rx="3" fill={soft} stroke={accent} strokeWidth="1.7" />
      <path d="M233 77h45m-45 15h45m-45 15h45" stroke={line} strokeWidth="1.5" />
      <ShieldCheck x={248} y={125} accent={accent} soft="var(--surface)" />
    </g>;
    default: return <g>{base}<Briefcase {...c} x={125} y={76} /></g>;
  }
}

export function RoadmapScene({ id, accent, soft, line }: SceneProps) {
  const c = { accent, soft, line };
  const base = <Ground line={line} soft={soft} />;
  switch (id) {
    case "ai-security-career": return <g>{base}
      <Window {...c} x={24} y={57} w={103} h={91}>
        <circle cx="29" cy="48" r="9" fill={soft} stroke={accent} strokeWidth="1.4" />
        <circle cx="69" cy="48" r="9" fill={soft} stroke={accent} strokeWidth="1.4" />
        <path d="M38 48h22M29 57l20 18 20-18" fill="none" stroke={accent} strokeWidth="1.4" />
      </Window>
      <Paper {...c} x={146} y={38} w={66} h={100} checked />
      <Person {...c} x={259} y={104} scale={.95} />
      <path d="M215 91h37m-123 0h13" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <path d="M242 67h48v29h-48z" fill={soft} stroke={accent} strokeWidth="1.4" />
      <path d="m252 81 8 8 18-18" fill="none" stroke={accent} strokeWidth="2" />
    </g>;
    case "application-security": return <g>{base}
      <Paper {...c} x={26} y={49} w={66} h={95} />
      <path d="M95 99h23m104 0h14" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Window {...c} x={120} y={53} w={101} h={89}>
        <rect x="11" y="28" width="43" height="40" rx="2" fill={soft} stroke={line} strokeWidth="1.3" />
        <path d="M17 38h29m-29 9h20M63 34h28m-28 12h20m-20 12h27" stroke={line} strokeWidth="1.5" />
        <path d="m71 68 5 5 10-11" fill="none" stroke={accent} strokeWidth="2" />
      </Window>
      <Magnifier x={170} y={119} accent={accent} soft={soft} scale={.52} />
      <Briefcase {...c} x={237} y={90} />
      <CheckMark x={251} y={46} accent={accent} soft={soft} />
    </g>;
    case "cloud-security": return <g>{base}
      <Cloud {...c} x={27} y={34} />
      <path d="M67 85v36m0 0h35" fill="none" stroke={accent} strokeWidth="1.7" />
      <Paper {...c} x={114} y={48} w={79} h={102} checked />
      <path d="M132 107v25m-10-34h60m-10 0v34" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M197 101h23" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Briefcase {...c} x={226} y={88} />
      <CheckMark x={245} y={47} accent={accent} soft={soft} />
    </g>;
    case "cybersecurity-fundamentals": return <g>{base}
      <path d="M30 149h263" stroke={line} strokeWidth="2" />
      <rect x="24" y="52" width="77" height="90" rx="2" fill={soft} stroke={accent} strokeWidth="1.7" />
      <Paper {...c} x={37} y={62} w={51} h={69} />
      <path d="M100 102h25" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Window {...c} x={126} y={67} w={78} h={69}>
        <path d="M11 31h53M11 40h45M11 49h31" stroke={line} strokeWidth="1.5" />
      </Window>
      <path d="M207 102h24" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Briefcase {...c} x={228} y={81} />
      <CheckMark x={248} y={42} accent={accent} soft={soft} />
    </g>;
    case "devsecops": return <g>{base}
      <Paper {...c} x={28} y={51} w={68} h={96} />
      <path d="M100 99h19m100 0h18" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Window {...c} x={121} y={53} w={96} h={87}>
        <path d="M12 35h38m-38 10h44m-44 10h31" stroke={line} strokeWidth="1.5" />
        <path d="m70 33 10 18H60z" fill={soft} stroke={accent} strokeWidth="1.5" />
        <path d="M61 63h20m-14 9 5 5 9-11" fill="none" stroke={accent} strokeWidth="1.7" />
      </Window>
      <Briefcase {...c} x={238} y={91} />
      <CheckMark x={252} y={48} accent={accent} soft={soft} />
    </g>;
    case "grc-security-management": return <g>{base}
      <rect x="35" y="42" width="66" height="113" rx="2" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M47 58h43M47 73h34M47 88h43M47 103h33" stroke={line} strokeWidth="1.7" />
      <rect x="126" y="59" width="73" height="96" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      {[77, 96, 115].map((y) => <g key={y}><rect x="138" y={y} width="9" height="9" fill={soft} stroke={accent} strokeWidth="1" /><path d={`M154 ${y + 5}h32`} stroke={line} strokeWidth="1.4" /></g>)}
      <Paper {...c} x={224} y={48} w={62} h={92} checked />
      <path d="M102 109h20m81 0h16" stroke={accent} strokeWidth="1.7" strokeDasharray="3 4" />
    </g>;
    case "industrial-mobility-security": return <g>{base}
      <path d="M141 100 196 54m-55 46 54 46" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="137" cy="100" r="11" fill={soft} stroke={accent} strokeWidth="1.6" />
      <Factory {...c} x={26} y={36} scale={.73} />
      <Car {...c} x={31} y={123} scale={.7} />
      <Paper {...c} x={215} y={54} w={63} h={88} checked />
      <path d="M195 54h18m-18 92h18" stroke={line} strokeWidth="1.5" />
    </g>;
    case "penetration-testing": return <g>{base}
      <Paper {...c} x={28} y={45} w={70} h={99} checked />
      <path d="M102 98h30" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Window {...c} x={139} y={52} w={67} h={82}>
        <path d="M11 31h45M11 42h35m-35 11h43" stroke={line} strokeWidth="1.4" />
      </Window>
      <Magnifier x={165} y={105} accent={accent} soft={soft} scale={.72} />
      <path d="M210 98h19" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Paper {...c} x={236} y={39} w={50} h={72} checked />
      <Briefcase {...c} x={231} y={107} />
    </g>;
    case "police-cybercrime-career": return <g>{base}
      <rect x="30" y="42" width="90" height="103" rx="3" fill={soft} stroke={accent} strokeWidth="1.8" />
      <Paper {...c} x={46} y={52} w={59} h={81} />
      <path d="M120 96h23" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <rect x="145" y="54" width="65" height="84" rx="3" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <circle cx="177" cy="81" r="11" fill={soft} stroke={accent} strokeWidth="1.5" />
      <path d="M158 109h39m-31 9h23" stroke={line} strokeWidth="1.5" />
      <path d="M214 96h17" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <ShieldCheck x={246} y={69} accent={accent} soft={soft} />
      <path d="M235 124h48" stroke={line} strokeWidth="1.5" />
    </g>;
    case "privacy-security-leadership": return <g>{base}
      <path d="M37 75h57v57H37z" fill={soft} stroke={accent} strokeWidth="1.7" />
      <path d="M48 88h35m-35 12h28m-28 12h35" stroke={line} strokeWidth="1.5" />
      <path d="M96 104h24" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <ellipse cx="162" cy="113" rx="42" ry="20" fill={soft} stroke={accent} strokeWidth="1.7" />
      <Person {...c} x={139} y={52} scale={.52} /><Person {...c} x={176} y={54} scale={.52} />
      <path d="M205 103h21" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Paper {...c} x={230} y={65} w={58} h={82} checked />
    </g>;
    case "security-customer-career": return <g>{base}
      <Person {...c} x={28} y={73} scale={1.05} /><Person {...c} x={83} y={73} scale={1.05} />
      <path d="M59 111h23" stroke={accent} strokeWidth="2" />
      <Paper {...c} x={136} y={53} w={63} h={93} checked />
      <path d="M201 97h24" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Briefcase {...c} x={229} y={84} />
      <path d="M243 73c8-13 28-13 37 0m-34 0v13m31-13v13" fill="none" stroke={accent} strokeWidth="1.8" />
    </g>;
    case "security-education-career": return <g>{base}
      <Window {...c} x={31} y={34} w={164} h={95}>
        <path d="M20 31h114m-114 13h92m-92 13h103" stroke={line} strokeWidth="1.6" />
        <circle cx="135" cy="64" r="13" fill={soft} stroke={accent} strokeWidth="1.5" />
      </Window>
      <Person {...c} x={49} y={130} scale={.55} /><Person {...c} x={87} y={130} scale={.55} /><Person {...c} x={125} y={130} scale={.55} />
      <Paper {...c} x={224} y={60} w={65} h={91} checked />
      <path d="M199 104h20" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
    </g>;
    case "security-operations": return <g>{base}
      <Window {...c} x={24} y={44} w={113} h={93}>
        <path d="M12 62h18l10-19 11 26 10-14h39" fill="none" stroke={accent} strokeWidth="1.8" />
      </Window>
      <path d="M141 99h21" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Paper {...c} x={165} y={49} w={60} h={93} checked />
      <path d="M229 99h16" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Briefcase {...c} x={238} y={88} />
      <CheckMark x={250} y={45} accent={accent} soft={soft} />
    </g>;
    case "security-product-customer": return <g>{base}
      <Paper {...c} x={28} y={42} w={67} h={91} />
      <path d="M99 94h24" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <Laptop {...c} x={129} y={64} w={86} />
      <path d="M217 94h17" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <rect x="235" y="55" width="56" height="86" rx="3" fill={soft} stroke={accent} strokeWidth="1.7" />
      {[72, 90, 108].map((y) => <g key={y}><path d={`m245 ${y + 3} 4 4 5-7`} fill="none" stroke={accent} strokeWidth="1.5" /><path d={`M260 ${y + 3}h22`} stroke={line} strokeWidth="1.5" /></g>)}
    </g>;
    case "security-research-career": return <g>{base}
      <Paper {...c} x={24} y={55} w={63} h={83} />
      <Magnifier x={64} y={98} accent={accent} soft={soft} scale={.75} />
      <path d="M106 98h18" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <rect x="129" y="48" width="70" height="97" rx="2" fill={soft} stroke={accent} strokeWidth="1.7" />
      <path d="M141 65h46m-46 13h46m-46 13h33m-33 13h46m-46 13h32" stroke={line} strokeWidth="1.6" />
      <path d="M202 98h17" stroke={accent} strokeWidth="1.7" strokeDasharray="4 4" />
      <rect x="224" y="41" width="72" height="79" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <path d="M232 104V84l12-14 12 7 16-24 15 16" fill="none" stroke={accent} strokeWidth="1.8" />
      <path d="M258 121v26m-21 0h42" stroke={accent} strokeWidth="1.6" />
    </g>;
    default: return <g>{base}<Briefcase {...c} x={122} y={75} /></g>;
  }
}

export function IndexScene({ kind, accent, soft, line }: IndexProps) {
  const c = { accent, soft, line };
  const base = <Ground line={line} soft={soft} />;
  switch (kind) {
    case "home": return <g>{base}
      <rect x="43" y="54" width="206" height="104" rx="3" fill={soft} stroke={accent} strokeWidth="1.9" />
      <path d="M43 100h206m-206 5h206" stroke={accent} strokeWidth="1.6" />
      <path d="M106 74h80m-80 49h80" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <rect x="74" y="105" width="146" height="57" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.8" />
      <path d="M91 105V85h32v20m13 0V79h37v26m14 0V90h19v15" fill={soft} stroke={accent} strokeWidth="1.5" />
      <Paper {...c} x={226} y={32} w={62} h={88} checked />
    </g>;
    case "start": return <g>{base}
      <path d="M24 151h268m-246 0v20m225-20v20" stroke={accent} strokeWidth="2" />
      <Paper {...c} x={39} y={53} w={69} h={88} />
      <Window {...c} x={125} y={56} w={96} h={78}>
        <path d="M11 34h74m-74 11h50m-50 11h67" stroke={line} strokeWidth="1.5" />
      </Window>
      <Briefcase {...c} x={224} y={76} />
      <path d="M110 103h12m102 0h-1" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
    </g>;
    case "fields": return <g>{base}
      <path d="M35 60h251v96H35z" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M35 98h251M35 124h251" stroke={line} strokeWidth="1.4" />
      <ServerRack {...c} x={52} y={66} w={46} h={56} />
      <Window {...c} x={111} y={68} w={57} h={45} />
      <Cloud {...c} x={185} y={67} />
      <Factory {...c} x={93} y={110} scale={.53} />
      <path d="M45 38h66l10 12h64" fill="none" stroke={accent} strokeWidth="1.8" />
    </g>;
    case "careers": return <g>{base}
      <rect x="33" y="34" width="254" height="119" rx="3" fill={soft} stroke={accent} strokeWidth="1.9" />
      <Paper {...c} x={47} y={48} w={56} h={77} />
      <Paper {...c} x={117} y={43} w={66} h={89} checked />
      <Paper {...c} x={198} y={48} w={72} h={78} />
      <circle cx="94" cy="49" r="3" fill={accent} /><circle cx="170" cy="44" r="3" fill={accent} /><circle cx="256" cy="49" r="3" fill={accent} />
      <Person {...c} x={132} y={140} scale={.55} /><Person {...c} x={158} y={140} scale={.55} />
    </g>;
    case "roadmaps": return <g>{base}
      <path d="M40 164c34-3 44-37 69-55 18-13 33-13 48-13m0 0c38 0 52-35 100-55m-100 55c29 16 55 50 112 58" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="164" r="10" fill="var(--surface)" stroke={accent} strokeWidth="2" />
      <circle cx="158" cy="96" r="11" fill={soft} stroke={accent} strokeWidth="2" />
      <rect x="244" y="25" width="38" height="35" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
      <rect x="251" y="140" width="38" height="29" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.5" />
      <path d="M253 38h20m-13 9h13m-15 104h21m-13 8h13" stroke={line} strokeWidth="1.5" />
      <path d="M107 108V58m-8 0h52m-44 0 8-9" fill="none" stroke={accent} strokeWidth="1.6" />
    </g>;
    case "glossary": return <g>{base}
      <rect x="39" y="63" width="151" height="85" rx="3" fill={soft} stroke={accent} strokeWidth="1.8" />
      <path d="M49 63V49h35v14m12 0V43h35v20m12 0V54h35v9" fill="var(--surface)" stroke={accent} strokeWidth="1.4" />
      <path d="M54 83h120m-120 14h120m-120 14h120m-120 14h93" stroke={line} strokeWidth="1.7" />
      <Magnifier x={177} y={82} accent={accent} soft={soft} scale={1.75} />
      <Paper {...c} x={256} y={50} w={44} h={63} />
    </g>;
    case "not-found": return <g>{base}
      <rect x="71" y="59" width="174" height="94" rx="3" fill={soft} stroke={accent} strokeWidth="1.8" />
      <rect x="89" y="86" width="137" height="54" rx="2" fill="var(--surface)" stroke={accent} strokeWidth="1.7" />
      <path d="M122 87V70h72v17M102 114h110" fill="none" stroke={line} strokeWidth="1.6" />
      <path d="M102 114h109" stroke={accent} strokeWidth="1.6" strokeDasharray="4 5" />
      <path d="M74 41H33v41m0 0 12-12M33 82 21 70" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Paper {...c} x={243} y={36} w={48} h={59} />
    </g>;
    case "legacy": return <g>{base}
      <path d="M25 79h105l10 13v58H25z" fill="var(--surface)" stroke={line} strokeWidth="1.8" strokeDasharray="5 4" />
      <path d="M170 79h109l12 13v59H170z" fill={soft} stroke={accent} strokeWidth="1.9" />
      <path d="M177 103h105m-245 0h94" stroke={line} strokeWidth="1.4" />
      <Paper {...c} x={76} y={38} w={53} h={73} />
      <path d="M133 64c21-25 44-25 65 0" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 4" />
      <path d="m191 57 7 7-9 4" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <Paper {...c} x={198} y={55} w={59} h={82} checked />
    </g>;
    default: return <g>{base}<Briefcase {...c} x={122} y={74} /></g>;
  }
}
