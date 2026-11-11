// @vitest-environment node
import { build } from "esbuild";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { siUbuntu } from "simple-icons";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");

async function bundle(code: string, extra: string[] = []) {
  const res = await build({
    stdin: { contents: code, resolveDir: root, loader: "ts" },
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    external: ["react", "react-dom", "react/jsx-runtime", ...extra],
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "silent",
  });
  const text = res.outputFiles[0]!.text;
  return { text, gzip: gzipSync(text).length };
}

const BUDGET_KB = 36; // charts entry (was 30; animation + tooltip pipeline added ~4 kB)
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
    expect(gzip).toBeLessThanOrEqual(230 * 1024);
  });

  it("dnd entry stays within its 30 kB gzip budget and the core never pulls in dnd-kit", async () => {
    // tsup externalises @dnd-kit (optional peer), so the budget measures our own code
    const dnd = await bundle(`import * as D from "./lib/dnd/index.ts"; console.log(D);`, ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"]);
    expect(dnd.gzip).toBeLessThanOrEqual(30 * 1024);
    const core = await bundle(`import * as L from "./lib/index.ts"; console.log(L);`);
    expect(core.text).not.toContain("dnd-kit");
    expect(core.text).not.toContain("@dnd-kit");
  });

  it("@pilab/laf/editor own code stays within budget and the core entry never pulls the engines in", async () => {
    // CodeMirror / react-markdown / remark / rehype are peers, so they are external to the measurement.
    const peers = ["@codemirror/*", "react-markdown", "remark-gfm", "rehype-sanitize"];
    const all = await bundle(`export * from "./lib/editor/index.ts";`, peers);
    expect(all.gzip).toBeLessThanOrEqual(24 * 1024); // ~14 kB of that is the shared catalogue + formatters via useLaf
    const md = await bundle(`import { Markdown } from "./lib/editor/index.ts"; console.log(Markdown);`, peers);
    expect(md.text).not.toContain("@codemirror");
    const core = await bundle(`import * as L from "./lib/index.ts"; console.log(L);`);
    for (const marker of ["@codemirror", "react-markdown", "rehype-sanitize"]) expect(core.text, marker).not.toContain(marker);
  });

  it("@pilab/laf/topology own code stays within budget and the core never pulls in xyflow", async () => {
    const topo = await bundle('import * as T from "./lib/topology/index.ts"; console.log(T);', ["@xyflow/react", "@xyflow/react/*"]);
    expect(topo.gzip).toBeLessThanOrEqual(20 * 1024);
    const core = await bundle('import * as L from "./lib/index.ts"; console.log(L);');
    expect(core.text).not.toContain("xyflow");
  });

  it("@pilab/laf/os-icons stays within budget (simple-icons paths included) and the core never pulls it in", async () => {
    const os = await bundle('import * as O from "./lib/os-icons/index.ts"; console.log(O);');
    expect(os.gzip).toBeLessThanOrEqual(52 * 1024); // ~14 kB shared catalogue via useLaf + ~30 kB of brand path data
    // only the named brand marks are bundled, not the whole simple-icons set
    expect(os.text.length).toBeLessThan(400 * 1024);
    const core = await bundle('import * as L from "./lib/index.ts"; console.log(L);');
    expect(core.text).not.toContain("simple-icons");
    expect(core.text).not.toContain(siUbuntu.path);
    expect(os.text).toContain(siUbuntu.path);
  });

  it("charts entry (third-party deps external) stays within its size budget and the core stays visx-free", async () => {
    const charts = await bundle('import * as C from "./lib/charts/index.ts"; console.log(Object.keys(C).length, C);', ["@visx/*", "@radix-ui/*", "cmdk", "lucide-react", "@tanstack/*"]);
    expect(charts.gzip).toBeLessThanOrEqual(BUDGET_KB * 1024);
    const core = await bundle('import * as L from "./lib/index.ts"; console.log(L);');
    expect(core.text).not.toContain("@visx");
  });
});
