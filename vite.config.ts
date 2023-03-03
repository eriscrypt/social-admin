import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dts: true,
      dirs: ["./src/components"],
    }),
    AutoImport({
      dirs: ["./src/stores", "./src/composables", "./common", "./src/services"],
      imports: ["vue", "pinia"],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  define: {
    global: "window",
    "process.env": {},
  },
});
