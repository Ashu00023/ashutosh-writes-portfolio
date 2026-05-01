## Goal
Take the site from "basics done" to "fully SEO-optimized" — crawlable by all engines (Bing, LinkedIn, ChatGPT, Perplexity), rich-result eligible on Google, and branded correctly on social shares.

## Changes

### 1. Prerendering (build-time static HTML)
Install `vite-plugin-prerender` and configure it to render `/` to a static `index.html` at build. This guarantees every crawler — Google, Bing, LinkedIn, Twitter, ChatGPT, Perplexity — sees fully rendered HTML with all headings, copy, and meta tags, not an empty `<div id="root">`.

- Add dev dependency: `vite-plugin-prerender`
- Update `vite.config.ts` to register the plugin for the `/` route
- Strip the module script tag during prerender postProcess to avoid hydration flash
- Verify `dist/index.html` after build contains the H1, H2s, and section copy

### 2. JSON-LD structured data
Add two schema blocks inside `<head>` of `index.html`:

- **Person** schema for Ashutosh Mahapatra (name, jobTitle, url, image, sameAs links to Instagram/WhatsApp, email)
- **ProfessionalService** schema (name, description, areaServed: Worldwide, serviceType: SEO Blog Writing + YouTube Script Writing, contact email, priceRange)

This makes the site eligible for Google rich results and helps AI search engines extract structured info.

### 3. Open Graph / Twitter cleanup
- Replace `og:image` and `twitter:image` (currently `lovable.dev/opengraph-image-p98pqg.png`) with a branded image
- Add `og:url`, `og:site_name`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt`
- Replace `twitter:site` (currently `@Lovable`) with `@ashutosh.writes` or remove
- Add `twitter:title` and `twitter:description`

I'll need either an uploaded OG image (1200×630) or permission to generate one. If neither, I'll keep the current image as a placeholder and flag it.

### 4. Favicon
Replace the default `/favicon.ico` with a branded one. **This requires you to upload an image (square, ideally 512×512) or provide a URL** — I cannot proceed on this step without it. If skipped now, the rest of the SEO work still completes cleanly.

### 5. Additional polish
- Add `<meta name="robots" content="index, follow, max-image-preview:large" />` for richer Google previews
- Add `<meta name="theme-color">` matching brand accent
- Add `<html lang="en">` is already set — confirm

## Technical details

**`vite.config.ts` addition (sketch):**
```ts
import prerender from 'vite-plugin-prerender'
// ...
plugins: [
  react(),
  mode === 'development' && componentTagger(),
  mode !== 'development' && prerender({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/'],
    postProcess(ctx) {
      ctx.html = ctx.html.replace(
        /<script [^>]*?type="module"[^>]*?><\/script>/,
        ''
      )
      return ctx
    },
  }),
].filter(Boolean),
```

**JSON-LD (sketch, embedded in `index.html`):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ashutosh Mahapatra",
  "jobTitle": "Freelance SEO Blog & YouTube Script Writer",
  "url": "https://ashutoshwrites.online/",
  "email": "ashutoshwrites.online@gmail.com",
  "sameAs": ["https://instagram.com/ashutosh.writes"]
}
</script>
```

## Risks / notes
- `vite-plugin-prerender` pulls Puppeteer/Chromium (~150MB). Build time on Vercel will go up by ~30–60s. This is normal and acceptable.
- The Lovable preview environment may not run prerender during dev (it only runs at production build), so the preview will look unchanged — Vercel deploy is where the benefit lands.
- If you don't upload a favicon and OG image now, I'll skip those sub-steps and you can drop them in later without re-touching anything else.

## What I need from you (optional, can proceed without)
- A branded OG image (1200×630 PNG/JPG)
- A favicon source (square PNG, ideally 512×512)

Without these, plan still ships items 1, 2, 3 (partial), 5.
