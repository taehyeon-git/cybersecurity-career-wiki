import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSearchText, searchDocuments, type SearchDocument } from "../src/lib/search";

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
