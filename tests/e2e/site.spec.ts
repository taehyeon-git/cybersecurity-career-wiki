import { expect, test } from "@playwright/test";

const searchShortcut = process.platform === "darwin" ? "Meta+k" : "Control+k";

test("home shows seven job folders and opens a role article", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "사이버보안 커리어 위키", exact: true })).toBeVisible();
  await expect(page.locator(".wiki-home-subfolder")).toHaveCount(7);
  await expect(page.getByRole("link", { name: "사이트맵" })).toHaveAttribute("href", /\/sitemap\.xml$/);

  const jobsFolder = page.locator(".wiki-home-folder").nth(1);
  await jobsFolder.locator("summary").first().click();
  const category = jobsFolder.locator(".wiki-home-subfolder").first();
  await category.locator("summary").click();
  const article = category.locator("a.wiki-home-file").first();
  const title = await article.locator("strong").innerText();
  await article.click();

  await expect(page).toHaveURL(/\/careers\/[^/]+\/$/);
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
});

test("Ctrl+K search focuses the input and restores the actual opener", async ({ page }) => {
  await page.goto("./");
  const opener = page.getByRole("link", { name: "직무 찾는 방법" }).first();
  await opener.focus();
  await page.keyboard.press(searchShortcut);

  const dialog = page.getByRole("dialog", { name: "보안 직무 검색" });
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

test("global search combines terms from different parts of a career article", async ({ page }) => {
  await page.goto("./");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "직무, 경로, 용어 검색" }).click();
  const dialog = page.getByRole("dialog", { name: "보안 직무 검색" });
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
  await page.getByRole("button", { name: "직무, 경로, 용어 검색" }).click();
  const dialog = page.getByRole("dialog", { name: "보안 직무 검색" });
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

test("career category selection persists in the page URL", async ({ page }) => {
  await page.goto("./careers/");
  const filter = page.getByRole("combobox", { name: "분야" });
  await filter.selectOption("response");
  await expect(page).toHaveURL(/\/careers\/\?category=response$/);
  await page.reload();
  await expect(filter).toHaveValue("response");
  await expect(page.locator('.wiki-index a[href*="/careers/soc-analyst/"]')).toBeVisible();
  await filter.selectOption("all");
  await expect(page).toHaveURL(/\/careers\/$/);
});

test("security product work has its own folder and category breadcrumb", async ({ page }) => {
  await page.goto("./careers/?category=product");
  await expect(page.getByRole("combobox", { name: "분야" })).toHaveValue("product");
  const folder = page.locator(".wiki-index .wiki-folder");
  await expect(folder).toHaveCount(1);
  await expect(folder.locator('a[href*="/careers/security-product-manager/"]')).toBeVisible();
  await expect(folder.locator('a[href*="/careers/product-security-engineer/"]')).toHaveCount(0);
  await folder.locator('a[href*="/careers/security-product-manager/"]').click();
  await expect(page.locator(".breadcrumbs").getByRole("link", { name: "보안제품 기획·개발·품질" })).toBeVisible();
});

test("career index initially shows all seven work folders on a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./careers/");
  const folders = page.locator(".wiki-index .wiki-folder");
  await expect(folders).toHaveCount(7);
  await expect(page.locator(".wiki-index .wiki-folder[open]")).toHaveCount(0);
  await expect(folders.last().locator("summary")).toBeVisible();
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
  const folder = page.locator(".wiki-folder").filter({ has: page.getByText("S–Z 용어", { exact: true }) });
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

test("a narrow career article offers a table of contents for long sections", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("./roadmaps/security-product-customer/");
  const toc = page.locator(".mobile-document-toc");
  await expect(toc.locator("summary")).toBeVisible();
  await toc.locator("summary").click();
  await toc.getByRole("link", { name: "포트폴리오: 하나의 고객 문제를 끝까지 추적하기" }).click();
  await expect(page.getByRole("heading", { name: "포트폴리오: 하나의 고객 문제를 끝까지 추적하기" })).toBeInViewport();
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe("#포트폴리오-하나의-고객-문제를-끝까지-추적하기");
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

test("search opens a glossary term inside its folder", async ({ page }) => {
  await page.goto("./glossary/");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("NCS");
  await page.keyboard.press(searchShortcut);
  const dialog = page.getByRole("dialog", { name: "보안 직무 검색" });
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

test("a broad career path links all of its associated roles", async ({ page }) => {
  await page.goto("./roadmaps/security-product-customer/");
  const cards = page.locator(".related-section .related-card");
  await expect(cards).toHaveCount(9);
  await expect(page.locator('.related-section a[href*="/careers/security-certification-evaluator/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/careers/cryptography-engineer/"]')).toBeVisible();
  await expect(page.locator('.related-section a[href*="/careers/security-certification-evaluator/"] small')).toContainText("보안 진단·평가");
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
