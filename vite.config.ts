import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Smart Village",
        short_name: "SmartVillage",
        description: "Aplikasi ekosistem sirkular digital.",
        theme_color: "#2E9F6B",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon.svg",
            sizes: "192x192 512x512",
            type: "image/svg+xml",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: "::",
    port: 8080,
  },
});
