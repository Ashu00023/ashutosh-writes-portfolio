## Why /blog returns 404

Your custom domain is on Vercel. The app is a React SPA — only `index.html` exists as a real file. When Google (or any visitor) requests `/blog` directly, Vercel looks for a file at that path, finds none, and returns 404 before React Router ever runs.

Lovable's own hosting (`*.lovable.app`) handles SPA fallback automatically, which is why the preview works. Vercel does not — it needs an explicit rewrite rule.

## Changes

### 1. Add `vercel.json` (the actual fix)

Create at the project root:

```json
{
  "rewrites": [
    { "source": "/((?!assets/|.*\\..*).*)", "destination": "/index.html" }
  ]
}
```

This tells Vercel: for any path that isn't a static asset (no file extension, not under `/assets/`), serve `index.html` so React Router can take over. After redeploying on Vercel, `/blog`, `/blog/human-creativity-vs-ai-authenticity-premium-2026`, etc. will load instead of 404'ing.

### 2. Fix `public/robots.txt`

Replace the `//` lines with proper `#` comments and add a sitemap reference:

```
# Allow all crawlers
User-agent: *
Allow: /

Sitemap: https://www.ashutoshwrites.online/sitemap.xml
```

### 3. Add a static `public/sitemap.xml`

A small, hand-maintained sitemap listing `/`, `/blog`, and your published blog post URL(s). This gives Google a reliable discovery path while the site is JS-rendered.

## After the fix — what you must do

1. Push to Vercel (re-deploy). The `vercel.json` only takes effect on the next deploy.
2. In Google Search Console, click **Request Indexing** again for `/blog` and the blog post URL.
3. Submit the sitemap under **Sitemaps** in GSC.

## Heads up — not in this plan, ask me if you want it

Client-side rendered Supabase content can be slow to index even after the 404 is fixed. If `/blog` and posts still don't get indexed after a couple of weeks, the next step is to add server-side rendering or pre-rendering for blog routes — that's a bigger refactor and I'd rather wait to see if the simple fix is enough.

## Files

- **Add:** `vercel.json`
- **Edit:** `public/robots.txt`
- **Add:** `public/sitemap.xml`
