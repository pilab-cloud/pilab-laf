import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? 5273);

export default defineConfig({
  testDir: "tests-e2e",
  // Baselines are shared across platforms: the playground ships its own fonts, so only tiny AA differences remain.
  snapshotPathTemplate: "{testDir}/__snapshots__/{projectName}/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 60_000,
  expect: { toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.01 } },
  use: { baseURL: `http://localhost:${port}`, ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" },
  projects: [
    { name: "visual-1x", testMatch: "visual.spec.ts", use: { deviceScaleFactor: 1 } },
    { name: "visual-2x", testMatch: "visual.spec.ts", use: { deviceScaleFactor: 2 } },
    { name: "checks", testMatch: "checks.spec.ts", use: { deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: `bunx vite --config playground/vite.config.ts --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
