import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? "4187");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const baseURL = `http://127.0.0.1:${port}${basePath}/`;

const chromeCandidates = process.platform === "win32" ? [
  path.join(process.env.PROGRAMFILES ?? "C:\\Program Files", "Google/Chrome/Application/chrome.exe"),
  path.join(process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)", "Google/Chrome/Application/chrome.exe"),
  path.join(process.env.LOCALAPPDATA ?? "", "Google/Chrome/Application/chrome.exe"),
] : process.platform === "darwin" ? [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  path.join(process.env.HOME ?? "", "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
] : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/opt/google/chrome/chrome"];

const localChromeAvailable = !process.env.CI && chromeCandidates.some((candidate) => existsSync(candidate));

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  outputDir: "./node_modules/.cache/playwright-results",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{
    name: "chromium",
    use: { ...devices["Desktop Chrome"], channel: localChromeAvailable ? "chrome" : undefined },
  }],
  webServer: {
    command: "node --import tsx scripts/serve-export.ts",
    url: baseURL,
    env: { ...process.env, PORT: String(port) },
    timeout: 15_000,
    reuseExistingServer: false,
  },
});
