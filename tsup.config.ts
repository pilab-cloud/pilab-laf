import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "lib/index.ts", "locales/hu": "lib/locales/hu.ts" },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false, // dist/ also holds the built CSS
  external: ["react", "react-dom"],
  banner: { js: '"use client";' },
});
