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
