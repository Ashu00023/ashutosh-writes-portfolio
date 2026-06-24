# Make the 4 samples open instantly (without lightening them)

The files themselves stay exactly as they are. The delay isn't the file size — it's the **sequence of round-trips** that happens when you click a sample:

```
click → React Router navigates → lazy JS chunk downloads
      → page renders → <iframe> requests the static HTML
      → browser parses HTML/CSS → first paint
```

Each arrow is a fresh network request that only starts *after* the click. Goal: do all of that work *before* the click, while the user is still on the homepage.

## Options (ranked by impact vs. cost)

### 1. Prefetch the sample HTML on idle  ← biggest, safest win
After the homepage finishes loading, quietly fetch all 4 static files in the background using `<link rel="prefetch">` injected at idle time (via `requestIdleCallback`). Browser stores them in the HTTP cache. When the user clicks, the iframe loads from cache → essentially instant, zero network wait.

- Cost: ~4 background requests totalling ~120 KB, fired only after the page is interactive, so no impact on initial paint.
- Works on every modern browser.

### 2. Prefetch the route JS chunks the same way
Same trick for the React route bundles (`SalaryTrap`, `PredictionDrug`, `AiPersonalFinance2026`, `HumanCreativityVsAi`). Vite supports this with a dynamic `import()` warmed at idle, or `<link rel="modulepreload">`. Removes the second round-trip (the JS chunk).

### 3. Use the Speculation Rules API for true prerender
Add a `<script type="speculationrules">` block that tells Chromium-based browsers to **prerender** the four sample routes when the user hovers/touches a card. The browser builds the full page off-screen; click swaps it in with literally 0 ms paint.

- Cost: extra CPU/memory while prerendering. Limited to Chrome/Edge — Safari/Firefox fall back to (1)+(2), which is still near-instant.

### 4. Hover/visible prefetch as a backup trigger
In addition to idle prefetch, trigger a prefetch the moment a sample card scrolls into view or the cursor enters it. Buys an extra 200–800 ms on slower connections.

### 5. Switch the iframe to `srcdoc` with cached HTML (optional refinement)
Fetch the HTML once on idle, keep it in memory, and feed it to the iframe via `srcdoc` instead of `src`. Eliminates the iframe's own network request entirely on click. Adds a small amount of code; only worth doing if (1)–(3) aren't enough.

## What I'd actually implement (recommended bundle)

1. A tiny `src/lib/prefetch.ts` helper that, on `requestIdleCallback`, injects:
   - `<link rel="prefetch" href="/static-blogs/...">` × 2
   - `<link rel="prefetch" href="/static-scripts/...">` × 2
   - `<link rel="modulepreload">` for the 4 route chunks (or warm them via dynamic `import()`).
2. A `<script type="speculationrules">` block in `index.html` listing the 4 sample routes with `eagerness: "moderate"` (fires on hover/touch).
3. Call the helper from `PortfolioSection` once it mounts.

Result: first visit ≈ same homepage speed; clicking any sample feels instantaneous because the HTML + JS are already sitting in the browser cache (and on Chrome, the whole page is pre-rendered).

Nothing in the four sample files is touched. No content removed, no styling stripped, no images compressed.

## Confirm before I build

Want me to ship the full bundle (1 + 2 + 3 + 4)? Or start with just **(1) idle prefetch of the 4 HTML files** — which alone usually makes the click feel instant on a warm network — and add the others if it isn't enough?
