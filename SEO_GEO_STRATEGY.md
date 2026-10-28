# SEO & GEO notes — ashutoshwrites.online

Current state of how the site is built so crawlers (Google and AI bots) see real content. Update this file when the setup changes.

## How pages reach crawlers

- The app is a client-rendered React SPA (Vite). Non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot) would see an empty `<div id="root">`.
- `npm run build` runs `vite build`, then `scripts/prerender.mjs`. It writes real HTML into `dist/` for 10 routes (home, services, method, work, research, about, contact, author, privacy-policy, terms-of-use) plus `dist/404.html` (noindex). The build fails if any file lacks its title or still has an empty root.
- Copy for the prerendered pages is mirrored by hand in `scripts/page-bodies.mjs`. Change visible copy in a React page and you change the matching string there in the same edit.
- Exception: the privacy and terms text is read straight from `src/pages/legal/*.tsx` by `scripts/legal-html.mjs`. The build fails if those files use JSX the converter does not understand.
- Articles are hand-built HTML files (`public/static-blogs/*.html` and `public/visa-agentic-commerce-disputes-seo.html`). They are served as they are and are not prerendered.

## Article URLs

Every article has one canonical URL, `/blog/<slug>`. `vercel.json` rewrites it to the static file. The old file URLs, and the older `/blog/` slugs, return a 308 to the canonical one.

| Canonical URL | Static file |
| --- | --- |
| `/blog/ai-personal-finance-2026` | `public/static-blogs/ai-personal-finance-2026.html` |
| `/blog/ai-vs-human-content-2026` | `public/static-blogs/ai-authenticity-premium-2026.html` |
| `/blog/shadow-ai-inside-approved-saas` | `public/static-blogs/byoa-shadow-ai-blog.html` |
| `/blog/visa-agentic-commerce-disputes` | `public/visa-agentic-commerce-disputes-seo.html` |

Never rename a canonical URL. If you must, add a 308 from the old one.

## Headlines

Each article has one headline. The H1, `og:title`, `twitter:title`, schema `headline`, the `title` in `src/data/seo-data.json` (which feeds `posts.ts`, `work.ts` and the prerendered lists), `public/llms.txt` and every related-link text are identical. The `<title>` tag is a shortened version of 60 characters or less.

## Adding an article

1. Put the HTML in `public/static-blogs/`. Use absolute URLs for every asset.
2. Add `{ path: "/blog/<slug>", title: "<H1>" }` to `routes` in `src/data/seo-data.json`.
3. Add the key to `ARTICLE_KEYS` in `scripts/page-bodies.mjs` and a rewrite (with and without trailing slash) in `vercel.json`.
4. Add it to `src/data/posts.ts`, `src/data/work.ts`, `public/sitemap.xml` and `public/llms.txt`.
5. Link it from the related-reading blocks of the other articles.

## Other rules

- Unknown URLs return a real 404 (`dist/404.html`).
- `sitemap.xml` `lastmod` changes only when the content really changed, and matches the article's `dateModified`.
- `Content-Security-Policy-Report-Only` is set in `vercel.json`. It blocks nothing. Check the browser console on each page, then rename the header to `Content-Security-Policy` once it shows no violations.
- Local `npm run dev` has no Vercel rewrites, so `/blog/<slug>` shows the 404 page there. Test article URLs on a Vercel preview deployment.
