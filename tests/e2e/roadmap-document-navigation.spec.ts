import { expect, test } from "@playwright/test";

test("roadmap articles keep their list and previous or next links inside one folder", async ({ page }) => {
  await page.goto("./roadmaps/security-operations/");
  const documentList = page.locator(".document-sidebar .sidebar-links a");
  await expect(page.locator(".document-sidebar .sidebar-title")).toContainText("운영·현장 경로");
  await expect(documentList).toHaveCount(2);
  await expect(documentList.nth(0)).toHaveAttribute("href", /\/roadmaps\/security-operations\/$/);
  await expect(documentList.nth(1)).toHaveAttribute("href", /\/roadmaps\/industrial-mobility-security\/$/);
  await expect(page.locator(".document-pager a")).toHaveCount(1);
  await expect(page.locator(".document-pager a")).toHaveAttribute("href", /\/roadmaps\/industrial-mobility-security\/$/);

  await page.goto("./roadmaps/industrial-mobility-security/");
  await expect(page.locator(".document-sidebar .sidebar-links a")).toHaveCount(2);
  await expect(page.locator(".document-pager a")).toHaveCount(1);
  await expect(page.locator(".document-pager a")).toHaveAttribute("href", /\/roadmaps\/security-operations\/$/);

  await page.goto("./roadmaps/cloud-security/");
  await expect(page.locator(".document-sidebar .sidebar-title")).toContainText("설계·개발 경로");
  await expect(page.locator(".document-sidebar .sidebar-links a")).toHaveCount(5);
  await expect(page.locator('.document-sidebar a[href*="/roadmaps/security-operations/"]')).toHaveCount(0);
});
