import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "accelbia.design",
    favicon: "./public/favicon.ico",
    meta: {
      description:
        "We are an India-based digital studio delivering expert full-stack web design and AI-powered automations to help businesses and events thrive.",
      "theme-color": "#c41d50",
      "mobile-web-app-capable": "yes",
      "mobile-web-app-status-bar-style": "default",
      // Open Graph / Facebook Meta Tags
      "og:url": "https://accelbia.design",
      "og:type": "website",
      "og:title": "accelbia.design",
      "og:description":
        "We are an India-based digital studio delivering expert full-stack web design and AI-powered automations to help businesses and events thrive.",
      "og:image": "https://accelbia.design/ogiibs.png",
      // Twitter Meta Tags
      "twitter:card": "summary_large_image",
      "twitter:domain": "accelbia.design",
      "twitter:url": "https://accelbia.design",
      "twitter:title": "accelbia.design",
      "twitter:description":
        "We are an India-based digital studio delivering expert full-stack web design and AI-powered automations to help businesses and events thrive.",
      "twitter:image": "https://accelbia.design/ogiibs.png",
    },
  },
  source: {
    entry: {
      index: "./src/index.tsx",
    },
  },
  output: {
    assetPrefix: process.env.NODE_ENV === "production" ? "/" : "/",
  },
});
