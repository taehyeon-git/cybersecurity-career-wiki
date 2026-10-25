import { expect, test } from "@playwright/test";

const searchShortcut = process.platform === "darwin" ? "Meta+k" : "Control+k";

test("home shows nine job folders and opens a role article", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "사이버보안 커리어 위키", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "사이트맵" })).toHaveAttribute("href", /\/sitemap\.xml$/);

  const jobsFolder = page.locator(".wiki-home-folder").filter({ has: page.getByText("보안 직무", { exact: true }) });
  await expect(jobsFolder.locator(".wiki-home-subfolder")).toHaveCount(9);
  await jobsFolder.locator("summary").first().click();
  const category = jobsFolder.locator(".wiki-home-subfolder").first();
  await category.locator("summary").click();
  const article = category.locator("a.wiki-home-file").first();
  const title = await article.locator("strong").innerText();
  await article.click();

  await expect(page).toHaveURL(/\/careers\/[^/]+\/$/);
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
});

test("home field folder opens system security and links back from its job", async ({ page }) => {
  await page.goto("./");
  const fieldFolder = page.locator(".wiki-home-folder").filter({ has: page.getByText("보안 분야", { exact: true }) });
  await expect(fieldFolder).toHaveCount(1);
  await fieldFolder.locator("summary").first().click();
  const infrastructure = fieldFolder.locator(".wiki-home-subfolder").filter({ has: page.getByText("인프라·접근", { exact: true }) });
  await infrastructure.locator("summary").click();
  await expect(fieldFolder.locator("a.wiki-home-file")).toHaveCount(15);
  await infrastructure.locator('a.wiki-home-file[href*="/fields/system/"]').click();
  await expect(page).toHaveURL(/\/fields\/system\/$/);
  await expect(page.locator(".document-main h1")).toHaveText("시스템·서버 보안");
  await page.locator('.document-main a[href*="/careers/infrastructure-security-engineer/"]').first().click();
  await expect(page).toHaveURL(/\/careers\/infrastructure-security-engineer\/$/);
  await expect(page.locator('.related-section a[href*="/fields/system/"]')).toBeVisible();
});

test("field index lists web and OT under protective environments", async ({ page }) => {
  await page.goto("./fields/");
  await expect(page.locator(".wiki-folder-list .wiki-folder")).toHaveCount(4);
  await expect(page.locator(".wiki-folder-list .wiki-folder[open]")).toHaveCount(0);
  await page.locator(".wiki-folder-list .wiki-folder").nth(1).locator("summary").click();
  await expect(page.locator('.wiki-folder-list a[href*="/fields/web/"]')).toBeVisible();
  await page.locator(".wiki-folder-list .wiki-folder").nth(3).locator("summary").click();
  await expect(page.locator('.wiki-folder-list a[href*="/fields/ot/"]')).toBeVisible();
  await expect(page.locator('.wiki-folder-list a[href*="/fields/management/"]')).toHaveCount(0);
});

test("global search finds web security as a distinct field result", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: /검색/ }).first().click();
  const dialog = page.getByRole("dialog", { name: /검색/ });
  await dialog.getByRole("textbox", { name: "검색어" }).fill("웹 보안");
  const field = dialog.locator('a.search-result[href*="/fields/web/"]');
  await expect(field).toBeVisible();
  await expect(field.locator(".search-result-side")).toContainText("분야");
});

test("mobile document explorer opens the OT field from its group", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  await page.getByRole("button", { name: "문서 탐색기 열기" }).click();
  const sidebar = page.locator("#wiki-sidebar");
  await sidebar.getByRole("button", { name: /보안 분야/ }).click();
  await sidebar.getByRole("button", { name: /산업·기기/ }).click();
  await sidebar.locator('a[href*="/fields/ot/"]').click();
  await expect(page).toHaveURL(/\/fields\/ot\/$/);
  await expect(page.locator(".document-main h1")).toContainText("OT");
});

test("jobs show relevant fields without forcing one-to-one categories", async ({ page }) => {
  await page.goto("./careers/application-security-engineer/");
  await expect(page.locator('.related-section a[href*="/fields/web/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/fields/mobile/"]')).toBeVisible();
  await page.goto("./careers/ot-security-engineer/");
  await page.locator('.related-section a[href*="/fields/ot/"]').click();
  await expect(page).toHaveURL(/\/fields\/ot\/$/);
  await page.goto("./careers/web-penetration-tester/");
  await page.locator('.related-section a[href*="/fields/web/"]').click();
  await expect(page).toHaveURL(/\/fields\/web\/$/);
});

test("legacy work-type field URLs explain the new map and are not indexed", async ({ page }) => {
  for (const slug of ["management", "development", "product", "operations", "assessment", "response", "investigation", "research", "customer"]) {
    await page.goto(`./fields/${slug}/`);
    await expect(page.getByRole("heading", { name: "보안 분야 안내가 바뀌었습니다" })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("link", { name: "새 보안 분야 목록 보기" })).toBeVisible();
  }
});

test("five main navigation links fit between the brand and actions", async ({ page }) => {
  for (const width of [901, 1024, 1180, 1440]) {
    await page.setViewportSize({ width, height: 720 });
    await page.goto("./fields/");
    const geometry = await page.evaluate(() => {
      const brand = document.querySelector(".brand")!.getBoundingClientRect();
      const nav = document.querySelector(".desktop-nav")!.getBoundingClientRect();
      const actions = document.querySelector(".header-actions")!.getBoundingClientRect();
      return { brandRight: brand.right, navLeft: nav.left, navRight: nav.right, actionsLeft: actions.left, scrollWidth: document.documentElement.scrollWidth };
    });
    expect(geometry.navLeft, `${width}px brand and navigation overlap`).toBeGreaterThanOrEqual(geometry.brandRight - 1);
    expect(geometry.actionsLeft, `${width}px navigation and actions overlap`).toBeGreaterThanOrEqual(geometry.navRight - 1);
    expect(geometry.scrollWidth, `${width}px horizontal overflow`).toBeLessThanOrEqual(width);
  }
});

test("Ctrl+K search focuses the input and restores the actual opener", async ({ page }) => {
  await page.goto("./");
  const opener = page.getByRole("link", { name: "직무 찾는 방법" }).first();
  await opener.focus();
  await page.keyboard.press(searchShortcut);

  const dialog = page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("textbox", { name: "검색어" });
  await expect(input).toBeFocused();
  await input.fill("보안관제");
  await expect(dialog.locator("a.search-result").first()).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();

  await page.keyboard.press(searchShortcut);
  await expect(dialog).toBeVisible();
  await input.fill("보안관제");
  await dialog.locator('a.search-result[href*="/careers/"]').first().click();
  await expect(page).toHaveURL(/\/careers\/[^/]+\/$/);
});

test("mobile keyboard search keeps the selected result in view", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  await page.getByRole("button", { name: "분야, 직무, 경로, 용어 검색" }).click();
  const dialog = page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" });
  const input = dialog.getByRole("textbox", { name: "검색어" });
  await input.fill("보안");
  await expect(dialog.locator("a.search-result")).toHaveCount(10);
  for (let index = 0; index < 8; index++) await input.press("ArrowDown");

  await expect.poll(() => dialog.locator(".search-results").evaluate((container) => {
    const selected = container.querySelector(".search-result.selected");
    if (!selected) return false;
    const viewport = container.getBoundingClientRect();
    const item = selected.getBoundingClientRect();
    return container.scrollTop > 0 && item.top >= viewport.top && item.bottom <= viewport.bottom;
  })).toBe(true);
  await input.press("ArrowDown");
  await expect(dialog.locator(".search-result.selected")).toHaveCount(1);
  await expect.poll(() => dialog.locator(".search-results").evaluate((container) => {
    const selected = container.querySelector(".search-result.selected");
    if (!selected) return false;
    const viewport = container.getBoundingClientRect();
    const item = selected.getBoundingClientRect();
    return item.top >= viewport.top && item.bottom <= viewport.bottom;
  })).toBe(true);
});

test("global search combines terms from different parts of a career article", async ({ page }) => {
  await page.goto("./");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "분야, 직무, 경로, 용어 검색" }).click();
  const dialog = page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" });
  await dialog.getByRole("textbox", { name: "검색어" }).fill("보안관제 SIEM");
  const result = dialog.locator('a.search-result[href*="/careers/soc-analyst/"]');
  await expect(result).toBeVisible();
  await expect(result.locator(".search-result-context")).toContainText("SIEM");
  await expect(result.locator("mark").filter({ hasText: "보안관제" })).toBeVisible();
  await expect(result.locator("mark").filter({ hasText: "SIEM" })).toBeVisible();
  await dialog.getByRole("textbox", { name: "검색어" }).fill("AI보안");
  await expect(dialog.locator('a.search-result[href*="/careers/ai-security-engineer/"] strong mark')).toContainText("AI 보안");
});

test("global search reports the full result count and indexes late article sections", async ({ page }) => {
  await page.goto("./");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "분야, 직무, 경로, 용어 검색" }).click();
  const dialog = page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" });
  const input = dialog.getByRole("textbox", { name: "검색어" });
  await input.fill("보안");
  await expect(dialog.locator(".search-count")).toContainText(/개 결과 중 관련도 높은 10개/);
  await input.fill("한국농수산식품유통공사");
  const result = dialog.locator('a.search-result[href*="/careers/privacy-manager/"]');
  await expect(result).toBeVisible();
  await expect(result.locator(".search-result-context")).toContainText("한국농수산식품유통공사");
});

test("career index finds a role by its work output", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).fill("평가 계획과 결과");
  await expect(page.locator('.wiki-index a[href*="/careers/ai-security-engineer/"]')).toBeVisible();
});

test("career index finds a role by its day-to-day responsibility", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).fill("사건 승격");
  await expect(page.locator('.wiki-index a[href*="/careers/soc-analyst/"]')).toBeVisible();
});

test("career index puts an exact role title ahead of incidental body matches", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).fill("보안관제");
  const firstFolder = page.locator(".wiki-index .wiki-folder").first();
  await expect(firstFolder.locator("summary")).toContainText("보안 관제·사고 대응");
  await expect(firstFolder.locator(".wiki-file").first()).toHaveAttribute("href", /\/careers\/soc-analyst\/$/);
});

test("specialized career paths are visible without opening another folder", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./roadmaps/");
  const specialized = page.locator(".wiki-folder").filter({ has: page.getByText("분야별 준비 경로", { exact: true }) });
  await expect(specialized).toHaveAttribute("open", "");
  await expect(specialized.locator('a[href*="/roadmaps/ai-security-career/"]')).toBeVisible();
});

test("glossary folders follow Korean terms and keep acronyms easy to find", async ({ page }) => {
  await page.goto("./glossary/");
  const folders = page.locator(".wiki-index .wiki-folder");
  await expect(folders.first().locator("summary")).toContainText("ㄱ–ㅁ 용어");
  await expect(folders.first().locator("#containment")).toBeVisible();
  const acronyms = folders.filter({ has: page.getByText("영문 약어", { exact: true }) });
  await acronyms.locator("summary").click();
  await expect(acronyms.locator("#securityinformationandeventmanagement")).toBeVisible();
  await expect(acronyms.locator("#chiefprivacyofficer")).toBeVisible();
  await expect(acronyms.locator("#datalossprevention")).toBeVisible();
});

test("mobile global search shows its scope and the actual Tab order", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  await page.getByRole("button", { name: "분야, 직무, 경로, 용어 검색" }).click();
  const dialog = page.locator(".search-modal");
  await expect(dialog.getByRole("heading", { name: "분야·직무·경로·용어 검색" })).toBeVisible();
  await dialog.getByRole("textbox", { name: "검색어" }).fill("보안관제");
  await expect(dialog.locator(".search-footer")).toContainText("Tab: 닫기 버튼 다음 결과");
  await dialog.getByRole("textbox", { name: "검색어" }).press("Tab");
  await expect(dialog.getByRole("button", { name: "검색 닫기" })).toBeFocused();
});

test("career category selection persists in the page URL", async ({ page }) => {
  await page.goto("./careers/");
  const filter = page.getByRole("combobox", { name: "직무군" });
  await filter.selectOption("response");
  await expect(page).toHaveURL(/\/careers\/\?category=response$/);
  await page.reload();
  await expect(filter).toHaveValue("response");
  await expect(page.locator('.wiki-index a[href*="/careers/soc-analyst/"]')).toBeVisible();
  await filter.selectOption("all");
  await expect(page).toHaveURL(/\/careers\/$/);
});

test("career search survives opening an article and returning to the index", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/");
  const input = page.getByRole("textbox", { name: "직무 검색" });
  await input.fill("보안관제");
  await expect(page).toHaveURL(/\/careers\/\?q=%EB%B3%B4%EC%95%88%EA%B4%80%EC%A0%9C$/);
  await expect(page.getByRole("status")).toContainText("6개 문서");
  await page.locator('.wiki-index a[href*="/careers/soc-analyst/"]').click();
  await expect(page).toHaveURL(/\/careers\/soc-analyst\/$/);
  await page.goBack();
  await expect(input).toHaveValue("보안관제");
  await expect(page.getByRole("status")).toContainText("6개 문서");
  await expect(page.locator('.wiki-index a[href*="/careers/soc-analyst/"]')).toBeVisible();
});

test("broad career search keeps work folders scannable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/");
  const input = page.getByRole("textbox", { name: "직무 검색" });
  await input.fill("보안");
  await expect(page.getByRole("status")).toContainText("60개 문서");
  await expect(page.locator(".wiki-index .wiki-folder")).toHaveCount(9);
  await expect(page.locator(".wiki-index .wiki-folder[open]")).toHaveCount(0);
  await input.fill("보안관제");
  await expect(page.locator('.wiki-index a[href*="/careers/soc-analyst/"]')).toBeVisible();
});

test("a keyboard-opened career folder survives refining the query and returning from an article", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/");
  const input = page.getByRole("textbox", { name: "직무 검색" });
  await input.fill("보안");
  const folder = page.locator(".wiki-index .wiki-folder").first();
  const summary = folder.locator("summary");
  await summary.focus();
  await summary.press("Enter");
  await expect(folder).toHaveAttribute("open", "");
  await expect(page).toHaveURL(/\bopen=/);
  await input.fill("보안 ");
  await expect(folder).toHaveAttribute("open", "");
  await folder.locator('a[href*="/careers/"]').first().click();
  await expect(page).toHaveURL(/\/careers\/[^/]+\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/careers\/\?q=/);
  await expect(input).toHaveValue("보안 ");
  await expect(folder).toHaveAttribute("open", "");
  await summary.focus();
  await summary.press("Space");
  await expect(folder).not.toHaveAttribute("open", "");
  await expect(page).toHaveURL(/\bclosed=/);
});

test("same-route career navigation keeps the URL and visible filters in sync", async ({ page }) => {
  await page.goto("./careers/");
  const input = page.getByRole("textbox", { name: "직무 검색" });
  const filter = page.getByRole("combobox", { name: "직무군" });
  await input.fill("보안");
  await filter.selectOption("response");
  const folder = page.locator(".wiki-index .wiki-folder");
  await folder.locator("summary").click();
  await expect(folder).not.toHaveAttribute("open", "");
  await expect(page).toHaveURL(/\bclosed=response/);

  await page.getByRole("navigation", { name: "주 탐색" }).getByRole("link", { name: "보안 직무" }).click();
  await expect(page).toHaveURL(/\/careers\/$/);
  await expect(input).toHaveValue("");
  await expect(filter).toHaveValue("all");
  await expect(page.locator(".wiki-index .wiki-folder")).toHaveCount(9);

  await page.goBack();
  await expect(input).toHaveValue("보안");
  await expect(filter).toHaveValue("response");
  await expect(folder).not.toHaveAttribute("open", "");
});

test("security product work has its own folder and category breadcrumb", async ({ page }) => {
  await page.goto("./careers/?category=product");
  await expect(page.getByRole("combobox", { name: "직무군" })).toHaveValue("product");
  const folder = page.locator(".wiki-index .wiki-folder");
  await expect(folder).toHaveCount(1);
  await expect(folder.locator('a[href*="/careers/security-product-manager/"]')).toBeVisible();
  await expect(folder.locator('a[href*="/careers/product-security-engineer/"]')).toHaveCount(0);
  await folder.locator('a[href*="/careers/security-product-manager/"]').click();
  await expect(page.locator(".breadcrumbs").getByRole("link", { name: "보안제품 기획·개발·품질" })).toBeVisible();
});

test("the customer path sends internal solution operators to the operations folder", async ({ page }) => {
  await page.goto("./roadmaps/security-customer-career/");
  await page.getByRole("link", { name: "보안 구축·운영 직무 폴더" }).click();
  await expect(page).toHaveURL(/\/careers\/\?category=operations$/);
  await expect(page.getByRole("combobox", { name: "직무군" })).toHaveValue("operations");
  await expect(page.locator(".wiki-index .wiki-folder")).toHaveCount(1);
});

test("career index shows nine work folders on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/");
  const folders = page.locator(".wiki-index .wiki-folder");
  await expect(folders).toHaveCount(9);
  await expect(page.locator(".wiki-index .wiki-folder[open]")).toHaveCount(0);
  await expect(folders.last().locator("summary")).toBeVisible();
});

test("police cybercrime investigation has a separate folder and career path", async ({ page }) => {
  await page.goto("./careers/?category=investigation");
  await expect(page.getByRole("combobox", { name: "직무군" })).toHaveValue("investigation");
  const folder = page.locator(".wiki-index .wiki-folder");
  await expect(folder).toHaveCount(1);
  await expect(folder.locator('a[href*="/careers/police-cybercrime-investigator/"]')).toBeVisible();
  await expect(folder.locator('a[href*="/careers/digital-forensics-specialist/"]')).toBeVisible();
  await folder.locator('a[href*="/careers/police-cybercrime-investigator/"]').click();
  await expect(page.locator(".breadcrumbs").getByRole("link", { name: "디지털 조사·사이버 수사" })).toBeVisible();
  await expect(page.getByRole("link", { name: "경찰 사이버범죄 수사 커리어 경로", exact: true })).toBeVisible();
});

test("privacy leadership and data security open from their work folders", async ({ page }) => {
  await page.goto("./careers/?category=management");
  await page.locator('.wiki-index a[href*="/careers/chief-privacy-officer/"]').click();
  await expect(page.getByRole("heading", { name: "개인정보 보호책임자(CPO)", exact: true })).toBeVisible();
  await expect(page.locator(".document-career-paths").getByRole("link", { name: "개인정보·보안 기획 커리어 경로", exact: true })).toBeVisible();

  await page.goto("./careers/?category=operations");
  await page.locator('.wiki-index a[href*="/careers/data-security-engineer/"]').click();
  await expect(page.getByRole("heading", { name: "데이터 보안 엔지니어", exact: true })).toBeVisible();
  await expect(page.locator(".document-career-paths").getByRole("link", { name: "클라우드 보안 커리어 경로", exact: true })).toBeVisible();
});

test("the selected color theme persists after a reload", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("button", { name: "다크 모드" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "라이트 모드" })).toBeVisible();
});

test("career index explains a body-only search term and announces the result count", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).fill("보안관제 SIEM");
  const result = page.locator('.wiki-index a[href*="/careers/soc-analyst/"]');
  await expect(result).toBeVisible();
  await expect(result.locator(".wiki-file-context")).toContainText("SIEM");
  await expect(page.getByRole("status")).toContainText(/개 문서/);
});

test("glossary index combines slash-separated terms and announces the result count", async ({ page }) => {
  await page.goto("./glossary/");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("SIEM/관제");
  await expect(page.locator("#securityinformationandeventmanagement")).toBeVisible();
  await expect(page.getByRole("status")).toContainText(/개 용어/);
});

test("changing a career filter reveals matches in a previously collapsed folder", async ({ page }) => {
  await page.goto("./careers/");
  const input = page.getByRole("textbox", { name: "직무 검색" });
  await input.fill("보안");
  const folder = page.locator(".wiki-folder").filter({ has: page.getByText("보안 관제·사고 대응", { exact: true }) });
  await folder.locator("summary").click();
  await input.fill("SOC");
  await expect(folder.locator('a[href*="/careers/soc-analyst/"]')).toBeVisible();
});

test("changing a glossary filter reveals matches in a previously collapsed folder", async ({ page }) => {
  await page.goto("./glossary/");
  const input = page.getByRole("textbox", { name: "용어 검색" });
  await input.fill("Security");
  const folder = page.locator(".wiki-folder").filter({ has: page.getByText("영문 약어", { exact: true }) });
  await folder.locator("summary").click();
  await input.fill("SIEM");
  await expect(folder.locator("#securityinformationandeventmanagement")).toBeVisible();
});

test("mobile document drawer traps focus and Escape restores the trigger", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "문서 탐색기 열기" });
  await trigger.click();

  const drawer = page.getByRole("dialog", { name: "문서 탐색기" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("button", { name: "닫기" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect.poll(() => page.evaluate(() => document.activeElement?.closest('[role="dialog"]')?.id)).toBe("wiki-sidebar");
  await page.keyboard.press("Tab");
  await expect.poll(() => page.evaluate(() => document.activeElement?.closest('[role="dialog"]')?.id)).toBe("wiki-sidebar");

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("closing search restores focus inside an open mobile document drawer", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./");
  await page.getByRole("button", { name: "문서 탐색기 열기" }).click();
  await page.keyboard.press(searchShortcut);
  await expect(page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" })).toBeVisible();
  await page.keyboard.press("Escape");
  const drawer = page.getByRole("dialog", { name: "문서 탐색기" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("button", { name: "닫기" })).toBeFocused();
});

test("document tree scrolls its current article into view", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("./careers/incident-responder/");
  const sidebar = page.locator("#wiki-sidebar");
  const currentIsVisible = () => sidebar.evaluate((element) => {
    const current = element.querySelector('[aria-current="page"]');
    if (!current) return false;
    const viewport = element.getBoundingClientRect();
    const item = current.getBoundingClientRect();
    return item.top >= viewport.top && item.bottom <= viewport.bottom;
  });
  await expect.poll(currentIsVisible).toBe(true);

  await page.setViewportSize({ width: 390, height: 720 });
  await page.getByRole("button", { name: "문서 탐색기 열기" }).click();
  await expect.poll(currentIsVisible).toBe(true);
});

test("a mobile role article lists its work area and links back to that folder", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./careers/soc-analyst/");
  const list = page.locator(".mobile-document-nav");
  await list.locator("summary").click();
  await expect(list.locator('a[href*="/careers/soc-analyst/"]')).toBeVisible();
  await expect(list.locator('a[href*="/careers/ciso/"]')).toHaveCount(0);
  await expect(page.locator(".breadcrumbs").getByRole("link", { name: "보안 관제·사고 대응" })).toBeVisible();
  await page.locator(".breadcrumbs").getByRole("link", { name: "보안 관제·사고 대응" }).click();
  await expect(page).toHaveURL(/\/careers\/\?category=response$/);
});

test("document pagers follow the order shown in their folder lists", async ({ page }) => {
  for (const route of ["./careers/ciso/", "./roadmaps/security-operations/"]) {
    await page.goto(route);
    const links = page.locator(".document-sidebar .sidebar-links a");
    const labels = (await links.allTextContents()).map((label) => label.trim());
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b, "ko")));
    const hrefs = await links.evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    const currentHref = await page.locator(".document-sidebar .sidebar-links a[aria-current='page']").getAttribute("href");
    const currentIndex = hrefs.indexOf(currentHref);
    expect(currentIndex).toBeGreaterThanOrEqual(0);
    const previous = page.locator(".document-pager a").filter({ hasText: "이전 문서" });
    const next = page.locator(".document-pager a").filter({ hasText: "다음 문서" });
    if (currentIndex > 0) await expect(previous).toHaveAttribute("href", hrefs[currentIndex - 1]!);
    else await expect(previous).toHaveCount(0);
    if (currentIndex < hrefs.length - 1) await expect(next).toHaveAttribute("href", hrefs[currentIndex + 1]!);
    else await expect(next).toHaveCount(0);
  }
});

test("a narrow career article offers a table of contents for long sections", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./roadmaps/security-operations/");
  const toc = page.locator(".mobile-document-toc");
  await expect(toc.locator("summary")).toBeVisible();
  await toc.locator("summary").click();
  await toc.getByRole("link", { name: "포트폴리오: 한 사건을 여러 역할로 보기" }).click();
  await expect(page.getByRole("heading", { name: "포트폴리오: 한 사건을 여러 역할로 보기" })).toBeInViewport();
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe("#포트폴리오-한-사건을-여러-역할로-보기");
});

test("skip link moves keyboard focus into the article", async ({ page }) => {
  await page.goto("./careers/red-team-operator/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "본문으로 건너뛰기" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.closest("#main-content") !== null)).toBe(true);
});

test("narrow mobile header stays inside a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of ["./", "./careers/soc-analyst/"]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    const menu = page.getByRole("button", { name: "문서 탐색기 열기" });
    await expect(menu).toBeVisible();
    expect((await menu.boundingBox())!.x + (await menu.boundingBox())!.width).toBeLessThanOrEqual(320);
  }
});

test("footer navigation links have a usable touch target on narrow and wide screens", async ({ page }) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 720 });
    await page.goto("./");
    for (const link of await page.locator(".footer-links a").all()) {
      const box = await link.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(24);
    }
  }
});

test("removed knowledge and comparison routes return 404", async ({ page }) => {
  for (const route of ["knowledge/", "knowledge-map/", "comparisons/"]) {
    const response = await page.goto(`./${route}`);
    expect(response?.status(), route).toBe(404);
    await expect(page.getByRole("heading", { name: "문서를 찾지 못했습니다" })).toBeVisible();
  }
});

test("glossary entries show their sources", async ({ page }) => {
  await page.goto("./glossary/");
  await expect(page.getByRole("heading", { name: "보안 용어집", exact: true })).toBeVisible();
  const source = page.locator(".wiki-glossary-sources a").first();
  await expect(source).toBeVisible();
  await expect(source).toHaveAttribute("href", /^https:\/\//);
});

test("article source links show and announce that they open a new tab", async ({ page }) => {
  await page.goto("./careers/incident-responder/");
  const citation = page.locator('.article-prose a[target="_blank"]').first();
  await expect(citation.locator(".external-link-cue")).toBeVisible();
  await expect(citation).toContainText("새 탭에서 열림");
  const reference = page.locator('.source-section a[target="_blank"]').first();
  await expect(reference).toContainText("새 탭에서 열림");
});

test("new-tab links announce their behavior across the wiki", async ({ page }) => {
  for (const route of ["./", "./start/", "./careers/", "./glossary/", "./careers/privacy-manager/"]) {
    await page.goto(route);
    const links = page.locator('a[target="_blank"]:visible');
    const count = await links.count();
    expect(count, `${route} should expose an external link`).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      await expect(links.nth(index), `${route} external link ${index + 1}`).toHaveAccessibleName(/새 탭에서 열림/);
    }
  }
});

test("search opens a glossary term inside its folder", async ({ page }) => {
  await page.goto("./glossary/");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("NCS");
  await page.keyboard.press(searchShortcut);
  const dialog = page.getByRole("dialog", { name: "분야·직무·경로·용어 검색" });
  await dialog.getByRole("textbox", { name: "검색어" }).fill("SIEM");
  await dialog.locator('a.search-result[href*="/glossary/#"]').first().click();
  await expect(page).toHaveURL(/\/glossary\/#securityinformationandeventmanagement$/);
  const term = page.locator("#securityinformationandeventmanagement");
  await expect(term).toBeVisible();
  await expect(term.locator("h2")).toContainText("SIEM");
});

test("a career article opens its linked glossary term inside a folder", async ({ page }) => {
  await page.goto("./careers/ot-security-engineer/");
  await page.locator('.article-prose a[href*="/glossary/#operationaltechnology"]').click();
  await expect(page).toHaveURL(/\/glossary\/#operationaltechnology$/);
  await expect(page.locator("#operationaltechnology")).toBeVisible();
});

test("references heading remains below the sticky header after TOC navigation", async ({ page }) => {
  await page.goto("./careers/soc-analyst/");
  await page.locator('.document-toc a[href="#references"]').click();
  const header = page.locator(".site-header");
  const heading = page.locator("#source-heading");
  expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual((await header.boundingBox())!.y + (await header.boundingBox())!.height);
});

test("career roadmap has one document title", async ({ page }) => {
  await page.goto("./roadmaps/security-operations/");
  await expect(page.locator("main h1")).toHaveCount(1);
});

test("product and customer career paths keep their distinct role links", async ({ page }) => {
  await page.goto("./roadmaps/security-product-customer/");
  const cards = page.locator(".related-section .related-card");
  await expect(cards).toHaveCount(6);
  await expect(page.locator('.related-section a[href*="/careers/security-account-manager/"]')).toHaveCount(0);
  await expect(page.locator('.related-section a[href*="/careers/security-certification-evaluator/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/careers/cryptography-engineer/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/careers/security-certification-evaluator/"] small')).toContainText("보안 진단·평가");

  await page.goto("./roadmaps/security-customer-career/");
  await expect(page.locator(".related-section .related-card")).toHaveCount(4);
  await expect(page.locator('.related-section a[href*="/careers/security-account-manager/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/careers/security-product-manager/"]')).toHaveCount(0);
});

test("a role offers its preparation path before the long article", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/soc-analyst/");
  const path = page.getByRole("navigation", { name: "이 직무의 커리어 경로" });
  await expect(path.getByRole("link", { name: "보안 운영·사고 대응 커리어 경로" })).toBeVisible();
  expect((await path.boundingBox())!.y).toBeLessThan((await page.locator(".article-prose").boundingBox())!.y);
});

test("a role article exposes every related role in its further reading", async ({ page }) => {
  await page.goto("./careers/ciso/");
  await expect(page.locator('.related-section a[href*="/careers/grc-analyst/"]')).toBeVisible();
});

test("keyboard focus is visible in both search inputs", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).focus();
  await expect(page.locator(".wiki-search")).toHaveCSS("outline-style", "solid");
  await page.keyboard.press(searchShortcut);
  await expect(page.locator(".search-modal-top")).toHaveCSS("outline-style", "solid");
});
