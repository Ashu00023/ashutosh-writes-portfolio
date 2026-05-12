import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// Signal to the prerenderer that the page is ready
setTimeout(() => {
  document.dispatchEvent(new Event("custom-render-trigger"));
}, 1000);
