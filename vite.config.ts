import { defineConfig } from "vite";

export default defineConfig({
  base: "/Merken/",
  build: {
    outDir: "docs",
    target: "es2022",
    sourcemap: false
  }
});
