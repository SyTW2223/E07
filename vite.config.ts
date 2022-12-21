/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: "/E07/",
  build: {
    outDir: "./docs",
  },
  test: {
    coverage: {
      provider: "istanbul", // or 'c8'
    },
    setupFiles: "../vuetify.config.ts",
    deps: {
      inline: ["vuetify"],
    },
    globals: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
