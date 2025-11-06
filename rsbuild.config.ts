import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    favicon: "./public/favicon.ico",
    meta: {
      "theme-color": "#c41d50",
      "mobile-web-app-capable": "yes",
      "mobile-web-app-status-bar-style": "default",
    },
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
  },
});
