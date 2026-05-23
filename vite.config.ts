import { defineConfig } from "vitest/config";

export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
    port: 1420
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: "es2022",
    minify: "esbuild",
    sourcemap: true
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
