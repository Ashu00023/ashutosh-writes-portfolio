const SAMPLE_URLS = [
  "/static-blogs/ai-authenticity-premium-2026.html",
  "/static-blogs/ai-personal-finance-2026.html",
  "/static-scripts/middle-class-trap.html",
  "/static-scripts/reboot-human.html",
  "/static-scripts/style.css",
];

let warmed = false;
const prefetchedHrefs = new Set<string>();

/** Prefetch a single URL on demand (e.g. on card hover). Idempotent. */
export function prefetchOne(href: string) {
  if (typeof document === "undefined") return;
  if (prefetchedHrefs.has(href)) return;
  prefetchedHrefs.add(href);
  if (document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = href.endsWith(".css") ? "style" : "document";
  document.head.appendChild(link);
}

/**
 * Quietly prefetches the portfolio sample HTML files into the browser's HTTP
 * cache so that when the user clicks a sample card, the iframe loads instantly
 * with no network round-trip. Fires on idle so it never competes with the
 * homepage's initial paint.
 */
export function prefetchSamples() {
  if (warmed || typeof document === "undefined") return;
  warmed = true;

  const run = () => {
    for (const href of SAMPLE_URLS) {
      // Skip if already requested
      if (document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) continue;
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = href.endsWith(".css") ? "style" : "document";
      document.head.appendChild(link);
    }
  };

  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 1200);
  }
}