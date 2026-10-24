import { expect, test } from "@playwright/test";

const searchShortcut = process.platform === "darwin" ? "Meta+k" : "Control+k";

test("home shows six job folders and opens a role article", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "사이버보안 커리어 위키", exact: true })).toBeVisible();
  await expect(page.locator(".wiki-home-subfolder")).toHaveCount(6);

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

test("career index finds a role by its work output", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).fill("평가 계획과 결과");
  await expect(page.locator('.wiki-index a[href*="/careers/ai-security-engineer/"]')).toBeVisible();
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

test("keyboard focus is visible in both search inputs", async ({ page }) => {
  await page.goto("./careers/");
  await page.getByRole("textbox", { name: "직무 검색" }).focus();
  await expect(page.locator(".wiki-search")).toHaveCSS("outline-style", "solid");
  await page.keyboard.press(searchShortcut);
  await expect(page.locator(".search-modal-top")).toHaveCSS("outline-style", "solid");
});
