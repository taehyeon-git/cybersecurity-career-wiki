import { expect, test } from "@playwright/test";

test("home, path index, and explorer expose the same career path folders", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator(".wiki-home-index > .wiki-home-folder").first().locator("summary strong").first()).toHaveText("보안 분야");

  const homePaths = page.locator(".wiki-home-folder").filter({ has: page.locator(".wiki-home-folder-summary strong").filter({ hasText: /^커리어 경로$/ }) });
  await homePaths.locator("summary").first().click();
  await expect(homePaths.locator(".wiki-home-subfolder")).toHaveCount(6);
  await expect(homePaths.locator('a.wiki-home-file[href*="/roadmaps/"]')).toHaveCount(15);

  await page.goto("./roadmaps/");
  await expect(page.locator(".wiki-folder-list .wiki-folder")).toHaveCount(6);
  for (const name of ["처음 시작하는 경로", "설계·개발 경로", "운영·현장 경로", "평가·수사·연구 경로", "기획·관리 경로", "교육·고객 경로"]) {
    await expect(page.locator(".wiki-folder-list .wiki-folder").filter({ has: page.locator("summary").getByText(name, { exact: true }) })).toHaveCount(1);
  }

  const explorer = page.getByRole("navigation", { name: "위키 폴더 탐색" });
  const explorerPaths = explorer.locator(".wiki-tree-root > .wiki-tree-folder").filter({ has: page.locator(".wiki-tree-folder-toggle .wiki-tree-label").filter({ hasText: /^커리어 경로$/ }) });
  await explorerPaths.locator(".wiki-tree-folder-toggle").first().click();
  await expect(explorerPaths.locator(".wiki-tree-children[data-depth='1'] > .wiki-tree-folder")).toHaveCount(6);
});
