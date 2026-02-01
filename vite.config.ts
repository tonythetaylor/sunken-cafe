import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/sunken-cafe/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/maskable-512.png",
        "og.png"
      ],
      manifest: {
        name: "Sunken Cafe",
        short_name: "SunkenCafe",
        description: "A garden coffee shop experience. Mobile-first PWA demo (no backend).",
        theme_color: "#0f2e1f",
        background_color: "#fbf7ef",
        display: "standalone",
        start_url: "/sunken-cafe/",
        scope: "/sunken-cafe/",
        icons: [
          {
            src: "/sunken-cafe/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/sunken-cafe/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/sunken-cafe/icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});
