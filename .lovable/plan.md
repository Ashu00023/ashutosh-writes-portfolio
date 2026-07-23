## Problem

The "Human Creativity vs AI" article is designed for a **dark theme** — its own CSS sets `body { background: #080808; color: #e8e6e0 }` and body paragraphs use `--silver #b8b8b8`.

But `HumanCreativityVsAi.tsx` renders it inside `StaticHtmlPage` without passing a `background` prop, so the wrapper falls back to the default `#f5f0e8` (light cream). The wrapper's inline background sits above/around the article, so light-grey silver text ends up on a near-white surface → the "faint / low contrast" text you see.

The finance article looks fine because it was designed for a light paper background, matching the default.

## Fix

Single-line change in `src/pages/blog-posts/HumanCreativityVsAi.tsx`:

- Pass `background="#080808"` to `<StaticHtmlPage />` so the outer wrapper matches the article's dark canvas.

That's it — no changes to the HTML file, no changes to `StaticHtmlPage`, no changes to the finance article.

## Verify

After the change, reload `/blog/human-creativity-vs-ai-authenticity-premium-2026` and confirm body copy renders with normal contrast on the dark background. Finance sample should be unchanged.
