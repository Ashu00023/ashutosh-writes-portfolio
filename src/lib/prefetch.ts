const SAMPLE_URLS = [
  "/static-blogs/ai-authenticity-premium-2026.html",
  "/static-blogs/ai-personal-finance-2026.html",
  "/static-blogs/byoa-shadow-ai-blog.html",
];

let warmed = false;
const prefetchedHrefs = new Set<string>();

const addPrefetch = (href: string) => {
  if (typeof document === "undefined" || prefetchedHrefs.has(href)) return;
  prefetchedHrefs.add(href);
  if (document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  link.as = href.endsWith(".css") ? "style" : "document";
  document.head.appendChild(link);
};

/** Prefetch a single URL on demand (hover, focus or touch on a card). Idempotent. */
export function prefetchOne(href: string) {
  addPrefetch(href);
}

/** True on data-saver or slow cellular connections, where background downloads cost the visitor. */
const isConstrained = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /^(slow-2g|2g|3g)$/.test(c.effectiveType ?? ""));
};

/**
 * Warms the portfolio sample HTML files into the HTTP cache so a sample opens instantly.
 * It waits until the page has fully loaded plus a few quiet seconds, so it can never compete
 * with the first paint, and it is skipped on constrained connections (hover/touch/focus
 * prefetching via prefetchOne still works there).
 */
export function prefetchSamples() {
  if (warmed || typeof window === "undefined") return;
  warmed = true;
  if (isConstrained()) return;

  const run = () => SAMPLE_URLS.forEach(addPrefetch);
  const whenIdle = () => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(run, { timeout: 6000 });
    else setTimeout(run, 4000);
  };

  if (document.readyState === "complete") setTimeout(whenIdle, 3000);
  else window.addEventListener("load", () => setTimeout(whenIdle, 3000), { once: true });
}
