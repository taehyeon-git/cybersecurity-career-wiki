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
