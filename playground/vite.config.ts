import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@pilab\/laf\/charts$/, replacement: fileURLToPath(new URL("../lib/charts/index.ts", import.meta.url)) },
      { find: /^@pilab\/laf\/editor$/, replacement: fileURLToPath(new URL("../lib/editor/index.ts", import.meta.url)) },
      { find: /^@pilab\/laf\/dnd$/, replacement: fileURLToPath(new URL("../lib/dnd/index.ts", import.meta.url)) },
      { find: /^@pilab\/laf\/locales\/(.+)$/, replacement: fileURLToPath(new URL("../lib/locales", import.meta.url)) + "/$1.ts" },
      { find: /^@pilab\/laf$/, replacement: fileURLToPath(new URL("../lib/index.ts", import.meta.url)) },
    ],
  },
  server: { port: 5173, open: false, fs: { allow: [fileURLToPath(new URL("..", import.meta.url))] } },
});
