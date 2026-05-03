## Goal

Add a public blog to the site. Visitors read posts at `/blog` and `/blog/:slug`. **You hand Lovable an HTML file of the blog post; Lovable inserts it into the database and it goes live.** No writing on Lovable's side, no admin UI, no public signup.

## Will it work on Vercel?

Yes. Lovable Cloud runs on hosted infrastructure and is reachable over HTTPS from any frontend host. After Cloud is enabled I'll give you the env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) to paste into Vercel → Settings → Environment Variables, then redeploy.

## What gets built

**1. Lovable Cloud + database**
- Enable Lovable Cloud.
- `posts` table: `id`, `slug` (unique), `title`, `excerpt`, `cover_image_url`, `content_html` (raw HTML), `published` (bool, default true), `published_at`, `created_at`, `updated_at`.
- Storage bucket `blog-images` (public read) for cover images / inline images you reference in the HTML.
- RLS: anyone can `SELECT` rows where `published = true`. No public write.

**2. Public blog pages (styled to match site)**
- `/blog` — list of published posts (cover, title, excerpt, date), dark theme + accent color + ScrollReveal animations matching the rest of the site.
- `/blog/:slug` — full post page rendering your HTML inside a Tailwind Typography (`prose prose-invert`) container so headings/lists/links/images look polished without you styling each post.
- SEO per post: `<title>`, meta description (from excerpt), canonical URL, OpenGraph + Twitter card, JSON-LD `BlogPosting`. Uses `react-helmet-async`.
- Adds "Blog" link to `Navbar`.

**3. Your publishing flow**
You upload the HTML file into the Lovable chat and say "publish this." I will:
1. Read the file.
2. Extract title / excerpt / cover image (from `<title>`, first `<p>`, and `<meta>` if present — or you tell me).
3. Generate a URL-safe slug from the title.
4. Insert the row directly into the `posts` table via the database tool. Done — it's live.

For updates: send me the new HTML + the slug, I update the row.
For unpublish: tell me the slug, I flip `published` to false.

## HTML safety

Raw HTML from a trusted source (you) is fine, but I'll still sanitize on render with `dompurify` to strip `<script>` and event handlers. Keeps the site safe even if a post contains pasted third-party embeds. Common embeds (YouTube iframes, images) will still work via an allowlist.

## Out of scope (easy to add later)

Categories/tags, search, RSS feed, comments, an admin UI for you to publish without going through chat.

## Technical notes

- New routes in `src/App.tsx`: `/blog`, `/blog/:slug`.
- New files: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/components/BlogCard.tsx`, `src/lib/sanitize.ts`.
- Add deps: `react-helmet-async`, `dompurify`, `@types/dompurify`, `@tailwindcss/typography`.
- SEO note: this is a Vite SPA, so meta tags are set client-side. Google indexes this fine; some social scrapers prefer SSR. If rich social previews matter heavily later, we can prerender just the blog routes — flag it and we'll plan separately.
- Vercel env vars to add after Cloud is enabled: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
