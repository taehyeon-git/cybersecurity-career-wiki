"use client";

import Link from "next/link";
import { ArrowRight, GitCompareArrows } from "lucide-react";
import { useMemo, useState } from "react";
import { routeFor } from "@/lib/site-data";

type ComparableRole = {
  id: string; slug: string; titleKo: string; titleEn: string; summary: string;
  responsibilities: string[]; keyDeliverables: string[]; coreSkillIds: string[];
  prerequisiteTopicIds: string[]; domainIds: string[]; toolIds: string[];
  programmingUse: string; projects: string[]; newbiePrep: string;
};

const labels: Array<{ key: keyof ComparableRole; label: string }> = [
  { key: "summary", label: "주요 목적" },
  { key: "responsibilities", label: "실제 업무" },
  { key: "keyDeliverables", label: "대표 산출물" },
  { key: "prerequisiteTopicIds", label: "필요 기반 지식" },
  { key: "coreSkillIds", label: "핵심 기술" },
  { key: "toolIds", label: "사용 도구 범주" },
  { key: "programmingUse", label: "프로그래밍 활용" },
  { key: "projects", label: "실습 프로젝트" },
  { key: "newbiePrep", label: "신입 준비" },
];

function displayTool(value: string): string {
  const abbreviations = new Set(["sast", "dast", "sca", "siem", "edr", "xdr", "soar", "iam", "pam", "sbom", "cicd"]);
  return value.split("-").map((part) => abbreviations.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function formatValue(value: string | string[], key: keyof ComparableRole, topicNames: Record<string, string>): string {
  if (!Array.isArray(value)) return value;
  if (key === "coreSkillIds" || key === "prerequisiteTopicIds") return value.map((item) => topicNames[item] ?? item).join(" · ");
  if (key === "toolIds") return value.map(displayTool).join(" · ");
  return value.join(" · ");
}

export function RoleComparePicker({ roles, topicNames }: { roles: ComparableRole[]; topicNames: Record<string, string> }) {
  const defaultLeft = roles.find((role) => role.id === "application-security-engineer")?.id ?? roles[0]?.id ?? "";
  const defaultRight = roles.find((role) => role.id === "devsecops-engineer")?.id ?? roles[1]?.id ?? "";
  const [leftId, setLeftId] = useState(defaultLeft);
  const [rightId, setRightId] = useState(defaultRight);
  const left = roles.find((role) => role.id === leftId);
  const right = roles.find((role) => role.id === rightId);
  const shared = useMemo(() => {
    if (!left || !right) return [];
    const first = new Set([...left.coreSkillIds, ...left.prerequisiteTopicIds, ...left.domainIds]);
    const second = new Set([...right.coreSkillIds, ...right.prerequisiteTopicIds, ...right.domainIds]);
    return [...first].filter((topic) => second.has(topic));
  }, [left, right]);
  return <section className="compare-picker" aria-label="직무 직접 비교"><div className="compare-picker-heading"><div><div className="section-eyebrow">INTERACTIVE COMPARISON</div><h2>직무를 직접 비교해 보세요</h2><p>같은 직무 데이터에서 목적과 산출물을 나란히 보여줍니다.</p></div><GitCompareArrows size={27} /></div><div className="compare-selectors"><label>첫 번째 직무<select value={leftId} onChange={(event) => setLeftId(event.target.value)}>{roles.map((role) => <option key={role.id} value={role.id}>{role.titleKo}</option>)}</select></label><span>VS</span><label>두 번째 직무<select value={rightId} onChange={(event) => setRightId(event.target.value)}>{roles.map((role) => <option key={role.id} value={role.id}>{role.titleKo}</option>)}</select></label></div>{left && right && <>{left.id === right.id ? <p className="compare-same">서로 다른 직무를 선택하면 차이를 확인할 수 있습니다.</p> : <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th scope="col">비교 기준</th><th scope="col">{left.titleKo}<small>{left.titleEn}</small></th><th scope="col">{right.titleKo}<small>{right.titleEn}</small></th></tr></thead><tbody>{labels.map(({ key, label }) => <tr key={key}><th scope="row">{label}</th><td>{formatValue(left[key], key, topicNames) || "자료 부족"}</td><td>{formatValue(right[key], key, topicNames) || "자료 부족"}</td></tr>)}</tbody></table></div>}<div className="compare-insight"><strong>공통 기반 기술</strong><p>{shared.length ? shared.map((skill) => topicNames[skill] ?? skill).join(" · ") : "구조화된 기술 목록에 공통 항목이 없습니다. 상세 문서의 실제 업무를 함께 확인하세요."}</p><div><Link href={routeFor.role(left.slug)}>{left.titleKo} 자세히 <ArrowRight size={15} /></Link><Link href={routeFor.role(right.slug)}>{right.titleKo} 자세히 <ArrowRight size={15} /></Link></div></div></>}</section>;
}
