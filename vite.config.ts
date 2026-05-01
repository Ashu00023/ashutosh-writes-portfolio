import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Only load prerender in production builds (CommonJS-only package, breaks dev ESM).
  let prerenderPlugin: unknown = null;
  if (mode === "production") {
    try {
      const { createRequire } = await import("module");
      const require = createRequire(import.meta.url);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const prerender = require("vite-plugin-prerender");
      prerenderPlugin = (prerender.default || prerender)({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/"],
      });
    } catch (e) {
      console.warn("[vite-plugin-prerender] not loaded:", (e as Error).message);
    }
  }

  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
      prerenderPlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  };
});
