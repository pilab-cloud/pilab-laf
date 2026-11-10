import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  resolve: { alias: { "@pilab/laf": fileURLToPath(new URL("../lib/index.ts", import.meta.url)) } },
  server: { port: 5173, open: false, fs: { allow: [fileURLToPath(new URL("..", import.meta.url))] } },
});
