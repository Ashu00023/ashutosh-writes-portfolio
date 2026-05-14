import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    mode === "production" && prerender({
      staticDir: path.join(__dirname, "dist"),
      routes: ["/"],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?) src="\/src\/main\.tsx" (.*?)><\/script>/, '<script $1 src="/assets/index.js" $2></script>')
          .replace(/(<title>)(.*?)(<\/title>)/, "$1$2$3");
        return renderedRoute;
      },
      rendererConfig: {
        maxConcurrentRoutes: 1,
        renderAfterDocumentEvent: "custom-render-trigger",
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
