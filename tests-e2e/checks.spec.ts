import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { DEMO_IDS, openDemo } from "./helpers";

// Page-level rules that don't apply to a component playground: the demos are fragments, not complete pages, so
// "one main landmark" and "has an h1" are decided by each consuming app (the demos that model full pages do have both).
const PAGE_LEVEL_RULES = ["landmark-one-main", "page-has-heading-one", "region"];

test.describe("axe (WCAG 2.x A/AA + best practices)", () => {
  for (const id of DEMO_IDS) {
    test(id, async ({ page }) => {
      await openDemo(page, id);
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).disableRules(PAGE_LEVEL_RULES).analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
    });
  }
});

/**
 * Elements that scroll horizontally *inside themselves* by design never widen the page. Any demo listed here is
 * allowed to have page-level overflow for the stated reason; keep this empty unless a real exception is justified.
 */
const OVERFLOW_EXCEPTIONS: Record<string, string> = {};

test.describe("320 px sweep", () => {
  test.use({ viewport: { width: 320, height: 700 } });
  for (const id of DEMO_IDS) {
    test(id, async ({ page }) => {
      test.skip(id in OVERFLOW_EXCEPTIONS, OVERFLOW_EXCEPTIONS[id]);
      await openDemo(page, id);
      const m = await page.evaluate(() => {
        const el = document.scrollingElement!;
        // Content inside a self-scrolling/clipping ancestor never widens the page, so it is not an offender.
        const clipped = (e: Element) => {
          for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(n).overflowX) && n.getBoundingClientRect().right <= el.clientWidth + 1) return true;
          return false;
        };
        const offenders = [...document.body.querySelectorAll<HTMLElement>("*")]
          .filter((e) => e.getBoundingClientRect().right > el.clientWidth + 1 && !e.closest("[data-radix-popper-content-wrapper]") && !clipped(e))
          // Report the innermost offenders (the parents merely inherit the overflow) with their ancestry for diagnosis.
          .filter((e, _i, all) => !all.some((o) => o !== e && e.contains(o)))
          .slice(0, 5)
          .map((e) => {
            const chain: string[] = [];
            for (let n: HTMLElement | null = e, i = 0; n && i < 4; n = n.parentElement, i++) chain.push(`${n.tagName.toLowerCase()}.${String(n.getAttribute("class") ?? "").slice(0, 50)}[${Math.round(n.getBoundingClientRect().width)}]`);
            return chain.join(" < ");
          });
        return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, offenders };
      });
      expect(m.scrollWidth, JSON.stringify(m.offenders)).toBeLessThanOrEqual(m.clientWidth);
    });
  }
});
