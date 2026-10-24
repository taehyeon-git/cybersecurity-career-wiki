import assert from "node:assert/strict";
import test from "node:test";
import { matchesAllTerms, normalizeSearchText, searchDocuments, searchMatchContext, type SearchDocument } from "../src/lib/search";

const docs: SearchDocument[] = [
  { id: "role-appsec", type: "role", title: "애플리케이션 보안 엔지니어", english: "Application Security Engineer", aliases: ["앱섹", "AppSec"], summary: "소프트웨어의 보안 결함을 줄입니다.", body: "위협 모델링과 코드 검토", href: "/careers/application-security-engineer/" },
  { id: "role-soc", type: "role", title: "보안관제 분석가", english: "SOC Analyst", aliases: ["보안 관제"], summary: "로그를 분석하고 경보를 분류합니다.", body: "SIEM과 탐지", href: "/careers/soc-analyst/" },
];

test("Korean spacing and English case do not block alias searches", () => {
  assert.equal(normalizeSearchText(" 앱 섹 "), "앱섹");
  assert.equal(searchDocuments("APPSEC", docs)[0]?.id, "role-appsec");
  assert.equal(searchDocuments("보안 관제", docs)[0]?.id, "role-soc");
});

test("body terms are searchable and no match returns an empty list", () => {
  assert.equal(searchDocuments("위협 모델링", docs)[0]?.id, "role-appsec");
  assert.deepEqual(searchDocuments("존재하지않는직무", docs), []);
});

test("search combines distinct concepts across document fields", () => {
  assert.equal(searchDocuments("보안관제 SIEM", docs)[0]?.id, "role-soc");
  assert.equal(searchDocuments("보안관제/SIEM", docs)[0]?.id, "role-soc");
  assert.deepEqual(searchDocuments("보안관제 모델링", docs), []);
  assert.equal(searchDocuments("보안 관제", docs)[0]?.id, "role-soc");
});

test("an exact document title outranks a neighboring role's alias", () => {
  const policy: SearchDocument = { ...docs[0], id: "policy", title: "정보보호 정책 담당자", aliases: [], english: "Policy Manager" };
  const broader: SearchDocument = { ...docs[1], id: "grc", title: "보안 GRC 분석가", aliases: ["정보보호 정책 담당자"], english: "GRC Analyst" };
  assert.equal(searchDocuments("정보보호 정책 담당자", [broader, policy])[0]?.id, "policy");
});

test("short English acronyms match words rather than fragments inside other words", () => {
  const aiRole: SearchDocument = { ...docs[0], id: "ai", title: "AI 보안 엔지니어", english: "AI Security Engineer", aliases: [], summary: "", body: "" };
  const supplyChain: SearchDocument = { ...docs[1], id: "supply-chain", title: "공급망 위험 관리자", english: "Cybersecurity Supply Chain Risk Manager", aliases: [], summary: "", body: "Cybersecurity Supply Chain Risk Management" };
  assert.deepEqual(searchDocuments("AI Security", [supplyChain, aiRole]).map((item) => item.id), ["ai"]);
  assert.deepEqual(searchDocuments("OT", [{ ...docs[0], id: "iot", english: "IoT Security", title: "기기 보안", summary: "", aliases: [], body: "" }]), []);
});

test("the specific final concept beats a broad title with that concept only in body", () => {
  const auditor: SearchDocument = { ...docs[0], id: "auditor", title: "보안 감사자", english: "Security Auditor", aliases: ["정보보안 감사 담당자"], summary: "", body: "독립적인 내부 감사를 수행한다." };
  const insider: SearchDocument = { ...docs[1], id: "insider", title: "내부자 위협 분석가", english: "Insider Threat Analyst", aliases: [], summary: "", body: "내부 감사 경험에서 옮겨올 수 있다." };
  assert.equal(searchDocuments("내부 감사", [insider, auditor])[0]?.id, "auditor");
});

test("multiple terms together in one title outrank terms scattered across fields", () => {
  const together: SearchDocument = { ...docs[0], id: "together", title: "클라우드 보안 담당자", english: "Cloud Security Engineer", aliases: [], summary: "", body: "" };
  const scattered: SearchDocument = { ...docs[1], id: "scattered", title: "보안 엔지니어", english: "Security Engineer", aliases: [], summary: "클라우드 업무도 지원", body: "" };
  assert.equal(searchDocuments("보안 클라우드", [scattered, together])[0]?.id, "together");
});

test("a body-only match has a short, visible explanation", () => {
  const body = "이 직무는 공공기관 한국농수산식품유통공사의 개인정보 처리 업무를 검토한 사례와 연결된다.";
  assert.match(searchMatchContext("한국농수산식품유통공사", ["개인정보보호 담당자", "개인정보 업무"], body) ?? "", /한국농수산식품유통공사/);
  assert.equal(searchMatchContext("개인정보", ["개인정보보호 담당자"], body), undefined);
  assert.equal(searchMatchContext("AI", ["다른 직무"], "supply chain risk"), undefined);
});

test("folder filters share word and abbreviation matching rules", () => {
  assert.equal(matchesAllTerms("보안관제/SIEM", ["보안관제 분석가", "SIEM과 탐지"]), true);
  assert.equal(matchesAllTerms("AI Security", ["Cybersecurity Supply Chain Risk Manager"]), false);
  assert.equal(matchesAllTerms("", ["보안관제 분석가"]), true);
});
