import { expect, test } from "@playwright/test";

test("field articles give a direct route to their related jobs", async ({ page }) => {
  await page.goto("./fields/system/");
  const related = page.locator(".related-section");
  await expect(related.getByRole("heading", { name: "관련 직무" })).toBeVisible();
  await expect(related.locator('a[href*="/careers/infrastructure-security-engineer/"]')).toBeVisible();
});

test("field articles browse within their protective environment folder", async ({ page }) => {
  await page.goto("./fields/system/");
  await expect(page.locator(".document-sidebar .sidebar-title")).toContainText("인프라·접근");
  await expect(page.locator(".document-sidebar .sidebar-links a")).toHaveCount(5);
  await expect(page.locator('.document-sidebar a[href*="/fields/web/"]')).toHaveCount(0);
  await expect(page.locator(".document-pager a")).toHaveCount(1);
  await expect(page.locator(".document-pager a")).toHaveAttribute("href", /\/fields\/network\/$/);
});

test("the article table of contents reaches related career documents", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./fields/system/");
  const toc = page.locator(".mobile-document-toc");
  await toc.locator("summary").click();
  await toc.getByRole("link", { name: "관련 문서" }).click();
  await expect(page.locator("#related-documents")).toBeInViewport();
  await expect(page.locator("#related-documents").getByRole("heading", { name: "관련 직무" })).toBeVisible();
});

test("role breadcrumbs show the job index and its real responsibility group", async ({ page }) => {
  await page.goto("./careers/soc-analyst/");
  const crumbs = page.getByRole("navigation", { name: "현재 위치" });
  await expect(crumbs.getByRole("link")).toHaveText(["홈", "보안 직무", "보안 관제·사고 대응"]);
  await expect(crumbs.getByRole("link", { name: "보안 직무" })).toHaveAttribute("href", /\/careers\/$/);
  await expect(crumbs.getByRole("link", { name: "보안 관제·사고 대응" })).toHaveAttribute("href", /\/careers\/\?category=response$/);
});

test("preparation paths appear once and further reading is grouped by document type", async ({ page }) => {
  await page.goto("./careers/soc-analyst/");
  const path = page.getByRole("navigation", { name: "이 직무의 커리어 경로" });
  await expect(path.getByRole("link")).not.toHaveCount(0);
  await expect(page.locator('.related-section a[href*="/roadmaps/"]')).toHaveCount(0);
  await expect(page.locator(".related-section .related-group")).not.toHaveCount(0);
});

test("review badges lead to the article's specific evidence limits", async ({ page }) => {
  for (const [slug, heading] of [
    ["ot-security-engineer", "근거와 공고 해석"],
    ["soc-manager", "직접 채용 원문과 해석 한계"],
  ]) {
    await page.goto(`./careers/${slug}/`);
    const review = page.locator(".document-meta a").filter({ hasText: "근거·범위 검토 중" });
    await expect(review).toBeVisible();
    await review.click();
    await expect(page.getByRole("heading", { level: 2, name: heading })).toBeInViewport();
  }
});
