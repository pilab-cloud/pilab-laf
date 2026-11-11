import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "lib/index.ts",
    charts: "lib/charts/index.ts",
    editor: "lib/editor/index.ts",
    dnd: "lib/dnd/index.ts",
    topology: "lib/topology/index.ts",
    "os-icons": "lib/os-icons/index.ts",
    "locales/hu": "lib/locales/hu.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  splitting: true, // shared chunks between entries; ESM keeps statements shakeable
  treeshake: true,
  clean: false, // dist/ also holds the built CSS
  external: [/^react($|\/)/, /^react-dom($|\/)/, /^@visx\//, /^@codemirror\//, /^@dnd-kit\//, /^@xyflow\//, /^simple-icons$/, /^react-markdown$/, /^remark-/, /^rehype-/],
  banner: { js: '"use client";' },
});
