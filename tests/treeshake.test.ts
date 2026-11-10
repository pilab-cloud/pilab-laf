// @vitest-environment node
import { build } from "esbuild";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");

async function bundle(code: string) {
  const res = await build({
    stdin: { contents: code, resolveDir: root, loader: "ts" },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    external: ["react", "react-dom", "react/jsx-runtime"],
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "silent",
  });
  const text = res.outputFiles[0]!.text;
  return { text, gzip: gzipSync(text).length };
}

const entry = 'from "./lib/index.ts"';

describe("tree-shaking (design §2.2)", () => {
  it("Button-only bundle stays small and drags in no heavy engines", async () => {
    const { text, gzip } = await bundle(`import { Button } ${entry}; console.log(Button);`);
    expect(gzip).toBeLessThanOrEqual(13 * 1024);
    for (const marker of ["DialogContent", "DropdownMenu", "cmdk-", "tanstack", "RowModel", "@visx", "codemirror", "dnd-kit"]) {
      expect(text, marker).not.toContain(marker);
    }
  });

  it.each([
    ["Badge", 11],
    ["Spinner", 14], // pulls in the inlined en catalogue + formatters via useLaf
    ["Kbd", 11],
  ])("%s ≤ %i kB gzip", async (name, kb) => {
    const { gzip } = await bundle(`import { ${name} } ${entry}; console.log(${name});`);
    expect(gzip).toBeLessThanOrEqual(kb * 1024);
  });

  it("everything stays below the full-kit budget", async () => {
    const { gzip } = await bundle(`import * as L from "./lib/index.ts"; console.log(Object.keys(L).length, L);`);
    expect(gzip).toBeLessThanOrEqual(220 * 1024);
  });
});
