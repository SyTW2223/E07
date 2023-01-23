/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vuetify()],
  base: "/E07/",
  build: {
    outDir: "./docs",
  },
  test: {
    exclude: [...configDefaults.exclude],
    coverage: {
      reporter: ["lcov"],
      reportsDirectory: "./coverage",
      exclude: ["**/helpers/*", "**/__tests__/*"],
    },
    // setupFiles: "vuetify.config.js",
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
