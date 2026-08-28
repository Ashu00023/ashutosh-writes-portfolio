# SEO & GEO Strategy — ashutoshwrites.online

## Root cause (confirmed, not guessed)

Fetching `https://ashutoshwrites.online/` with a plain HTTP request (no JS execution — i.e.
exactly how GPTBot, ClaudeBot, PerplexityBot, and most other AI crawlers actually browse)
returned an empty `<div id="root"></div>` and nothing else. No headline, no bio, no nav,
no portfolio. That is the entire problem in one sentence:

**This site is a 100% client-side-rendered (CSR) React SPA. The raw HTML delivered to any
non-JS HTTP client is an empty shell.**

- Google still indexes you because Googlebot runs a real headless Chrome before indexing
  (which is why Search Console looked "fine").
- ChatGPT, Gemini, Perplexity, and most LLM tools do a plain HTTP fetch — no JS execution —
  so they see nothing.

A Puppeteer-based prerender step already existed in `scripts/prerender.mjs`, but it was
written to **silently exit 0** if Chromium failed to launch — a very common failure mode in
CI/serverless build environments like Vercel's without extra binary configuration. The build
was "succeeding" while quietly shipping the empty shell. This is the single biggest fix in
this pass.

### Secondary issues found

1. **Content fragmented across up to 4 URLs per article** — `/blog/[slug]` (React route),
   `/static-blogs/[slug].html`, and `/[slug]-blog-human.html` — none fully listed in the
   sitemap, and internally linked inconsistently (the `/blog` index page linked to a
   different URL than the homepage portfolio cards). This splits ranking/citation signal
   across near-duplicate pages instead of consolidating it onto one authoritative URL.
2. **Host inconsistency** — the `*-human.html` pages self-canonicalized to
   `www.ashutoshwrites.online` while everything else (sitemap, robots.txt, llms.txt, other
   canonical tags) used the non-`www` host.
3. **Sitemap had no `<lastmod>`** — a minor freshness signal, now fixed.
4. robots.txt and llms.txt were **already well set up** (AI crawlers explicitly allowed,
   llms.txt present) — no change needed there. Good prior work, just undermined by #1.

## What was fixed in this pass

- **`scripts/prerender.mjs`** — completely replaced. The new version uses only Node's
  built-in `fs`/`path` — no headless browser, so it cannot fail to launch and cannot
  silently no-op. It writes a real static HTML file per route into `dist/` after
  `vite build`, with the correct `<title>`, meta description, canonical, OG/Twitter tags,
  JSON-LD, and actual visible article/page text. It includes a **self-check**: if any
  generated file doesn't contain its expected title or still has an empty `#root`, the
  build **fails loudly** instead of shipping broken output. This was tested end-to-end
  against a simulated build output in this session and confirmed working (real content,
  no duplicate meta tags, valid JSON-LD, one `<title>` per file).
- **`src/data/seo-data.json`** — new single source of truth for title/description/canonical
  per route, consumed by both the React Helmet components (what real users' browsers update
  to) and the prerender script (what crawlers see first). This removes the risk of the two
  ever drifting apart again.
- **Consolidated every article to one canonical URL** (`/blog/[slug]`) — updated
  `PortfolioSection.tsx`, `LatestBlogsSection.tsx`, and `Blog.tsx` to all link to the same
  URL. Removed the redundant "View Live Article" vs "Read Clean Transcript" split.
- **Retired the duplicate `-human.html` pages** — deleted the files, added 301 redirects
  in `vercel.json` so any existing backlinks/bookmarks still resolve correctly to the
  canonical URL instead of 404ing.
- **Fixed the OG image mismatch** — blog posts now reference the dedicated thumbnail PNG/JPG
  (with explicit dimensions) instead of a `.webp` asset, which has broader compatibility
  with social/LLM preview renderers.
- **`sitemap.xml`** — added `<lastmod>`, confirmed it now matches the final canonical URL set.
- **Removed the `puppeteer` devDependency** — no longer needed, shrinks install size and
  removes a source of build fragility entirely.

## What you still need to do manually

1. **Pick one host and stick to it.** Check your Vercel project's Domains settings — decide
   whether `ashutoshwrites.online` or `www.ashutoshwrites.online` is primary, and make sure
   the other one 301-redirects to it. Everything in this codebase now assumes the non-`www`
   version, since that's what your sitemap/robots.txt/llms.txt already use.
2. **Deploy and verify** (checklist below) — I could not run `npm install` or a real
   `vite build` in this environment (no network access), so the script was verified with a
   simulated build output, not the real one. Run it for real before trusting it in
   production.

## Verification checklist (do this after deploying)

1. `npm install && npm run build` locally — confirm you see `[prerender] done — 4 route(s)
   prerendered successfully.` in the output, with no `FAIL` lines. If it fails, the build
   will now exit non-zero (on purpose) — read the error, it will name the exact route.
2. `curl -s https://ashutoshwrites.online/ | grep -i "Ashutosh Mahapatra"` — should return a
   match. If it returns nothing, the fix isn't live yet.
3. View-source (not DevTools "Elements" — actual "View Page Source") on the homepage and one
   blog post — you should see your real headline and article text in the raw HTML, not an
   empty `<div id="root"></div>`.
4. Google's Rich Results Test (`search.google.com/test/rich-results`) against the homepage
   and both blog posts — confirms the JSON-LD is present and valid in the raw HTML.
5. Re-submit `sitemap.xml` in Google Search Console and request indexing for the two blog
   post URLs directly (not the retired `-human.html` ones).
6. Ask ChatGPT, Perplexity, or Gemini directly to browse `ashutoshwrites.online` and
   summarize it — this is the real end-to-end test for the GEO problem you reported.

## Ongoing / lower-priority items (not done in this pass)

- **Soft-404s**: unmatched routes currently return HTTP 200 (via the SPA fallback rewrite)
  instead of 404. Low priority, but worth fixing later with Vercel Edge Middleware if you
  add many more routes.
- **New blog posts**: follow the pattern documented at the top of `scripts/prerender.mjs` —
  add the route to `seo-data.json`, drop the static HTML source in
  `public/static-blogs/`, add the React route, add it to `sitemap.xml`. The prerender step
  picks it up automatically.
