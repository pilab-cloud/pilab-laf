import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "@playwright/test";

/** Demo ids come straight from playground/App.tsx so the e2e suite can't drift from the playground. */
export const DEMO_IDS: string[] = [...readFileSync(join(process.cwd(), "playground/App.tsx"), "utf8").matchAll(/\{ id: "([a-z0-9-]+)", label:/g)].map((m) => m[1]!);

/** 2026-01-15 12:00 UTC — relative times ("5 minutes ago") render identically on every run. */
const FROZEN_NOW = new Date("2026-01-15T12:00:00Z");

export async function openDemo(page: Page, id: string, opts: { lang?: "en" | "hu"; dir?: "ltr" | "rtl" } = {}) {
  await page.clock.setFixedTime(FROZEN_NOW);
  // Live-updating demos (log tails, alarm feeds, countdowns) tick on intervals; freeze those so shots are deterministic.
  await page.addInitScript(() => {
    const real = window.setInterval.bind(window);
    window.setInterval = ((fn: TimerHandler, ms?: number, ...a: unknown[]) => (ms !== undefined && ms < 1000 ? real(fn, ms, ...a) : 0)) as typeof window.setInterval;
  });
  await page.goto(`/?demo=${id}`);
  if (opts.lang) await page.getByLabel("Language").selectOption(opts.lang);
  if (opts.dir) await page.locator("label", { has: page.getByText("Direction", { exact: true }) }).locator("select").selectOption(opts.dir);
  await page.getByLabel("Demo").waitFor();
  await page.getByText("Loading…", { exact: true }).waitFor({ state: "detached" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
}
