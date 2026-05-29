import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { rmSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function vercelOutputPlugin() {
  return {
    name: "vercel-output",
    closeBundle() {
      const outputDir = join(process.cwd(), ".vercel", "output");
      
      // Clean functions folder and nitro.json to ensure no stale serverless/nitro files remain
      try {
        rmSync(join(outputDir, "functions"), { recursive: true, force: true });
        rmSync(join(outputDir, "nitro.json"), { force: true });
        console.log("Successfully cleaned .vercel/output functions and nitro.json");
      } catch (e) {
        // Ignore
      }

      // Generate config.json for SPA routing
      const config = {
        version: 3,
        routes: [
          {
            src: "/assets/(.*)",
            headers: { "cache-control": "public, max-age=31536000, immutable" },
          },
          { handle: "filesystem" },
          { src: "/(.*)", dest: "/index.html" },
        ],
      };

      try {
        mkdirSync(outputDir, { recursive: true });
        writeFileSync(join(outputDir, "config.json"), JSON.stringify(config, null, 2), "utf-8");
        console.log("Successfully generated .vercel/output/config.json");
      } catch (err) {
        console.error("Error generating .vercel/output/config.json:", err);
      }
    },
  };
}

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
    vercelOutputPlugin(),
  ],
  build: {
    outDir: ".vercel/output/static",
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
  },
});
