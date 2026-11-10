import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const dir = join(__dirname, "../lib/components");
const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));

// Named radii are clamped to ≤ 4px by the theme; arbitrary values bypass it.
describe("design rules (COMPONENTS.md §0)", () => {
  it.each(files)("%s has no radius above 4px", (f) => {
    const src = readFileSync(join(dir, f), "utf8");
    expect(src).not.toMatch(/rounded(-[a-z]+)?-\[(\d{2,}|[5-9])(px|rem)?\]/);
    expect(src).not.toMatch(/border-radius\s*:/);
  });

  it.each(files)("%s hardcodes no colours", (f) => {
    const src = readFileSync(join(dir, f), "utf8");
    expect(src).not.toMatch(/#[0-9a-fA-F]{6}\b/);
  });
});

// i18n: user-visible strings go through the catalogue (or a `labels` prop), never literal attributes.
describe("i18n rules (design F1)", () => {
  // Allow-list: template-literal aria-labels still to be moved into the catalogue.
  const pendingTemplates = ["datagrid.tsx"];
  it.each(files)("%s has no literal aria-label/placeholder/title strings", (f) => {
    const src = readFileSync(join(dir, f), "utf8");
    expect(src).not.toMatch(/\b(aria-label|placeholder|title)="[^"]*[A-Za-z]/);
    if (!pendingTemplates.includes(f)) expect(src).not.toMatch(/\baria-label=\{?["'`][A-Za-z]/);
  });

  // Components migrated to the catalogue must not reintroduce English defaults on label-like props.
  const migrated = ["advanced", "audit", "auth", "calendar", "display", "extras", "helpers", "inventory", "more", "overlay", "pickers", "screens", "studio", "virtual", "feedback", "form", "data", "button"];
  it.each(migrated.filter((m) => files.includes(`${m}.tsx`)))("%s.tsx has no English default label props", (m) => {
    const src = readFileSync(join(dir, `${m}.tsx`), "utf8");
    expect(src).not.toMatch(/^\s+(\w*[lL]abel|title|placeholder|\w*[mM]essage|empty\w*|\w*Title)\s*=\s*"[A-Za-z]/m);
  });

  it("hu defines every catalogue key with the same shape", async () => {
    const { en } = await import("../lib/i18n");
    const { hu } = await import("../lib/locales/hu");
    expect(Object.keys(hu).sort()).toEqual(Object.keys(en).sort());
    for (const k of Object.keys(en) as (keyof typeof en)[]) {
      expect(typeof hu[k], k).toBe(typeof en[k]);
      if (Array.isArray(en[k])) expect((hu[k] as string[]).length, k).toBe((en[k] as string[]).length);
    }
  });
});

// Label palette (ADR-11): every -fg/-bg pair must reach WCAG AA for text; base slots 3:1 for non-text on --bg.
describe("label palette tokens (design F4)", () => {
  const css = readFileSync(join(__dirname, "../src/app.css"), "utf8");
  const tok = (n: string) => css.match(new RegExp(`--${n}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  const lum = (hex: string) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
  };
  const ratio = (a: string, b: string) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi! + 0.05) / (lo! + 0.05);
  };
  const slots = Array.from({ length: 12 }, (_, i) => i + 1);

  it.each(slots)("--label-%i has base, bg and fg tokens and utilities", (n) => {
    for (const s of ["", "-bg", "-fg"]) {
      expect(tok(`label-${n}${s}`), `--label-${n}${s}`).toBeDefined();
      expect(css).toContain(`--color-label-${n}${s}: var(--label-${n}${s})`);
    }
  });
  it.each(slots)("--label-%i-fg on -bg ≥ 4.5:1", (n) => {
    expect(ratio(tok(`label-${n}-fg`)!, tok(`label-${n}-bg`)!)).toBeGreaterThanOrEqual(4.5);
  });
  it.each(slots)("--label-%i on --bg ≥ 3:1", (n) => {
    expect(ratio(tok(`label-${n}`)!, tok("bg")!)).toBeGreaterThanOrEqual(3);
  });
});
