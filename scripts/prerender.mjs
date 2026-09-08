// Postbuild static-HTML generator.
//
// WHY THIS EXISTS
// This app is a client-rendered (CSR) React SPA. The HTML that Vite builds
// (dist/index.html) contains an empty `<div id="root"></div>` — all real
// content is injected by JavaScript after the browser downloads and runs the
// bundle. That's fine for human visitors and for Googlebot (which renders JS
// before indexing), but most AI/LLM crawlers (GPTBot, ClaudeBot,
// PerplexityBot, etc.) fetch raw HTML and do NOT execute JavaScript — they
// see nothing but an empty page.
//
// This script fixes that by writing a real, complete, static HTML file for
// every known route directly into dist/, containing the actual title, meta
// tags, JSON-LD, and visible body content for that route. No browser, no
// Puppeteer, no Chromium — just Node's built-in fs/path modules — so this
// cannot fail the way headless-browser prerendering does in CI/serverless
// build environments (missing Chromium binary, sandbox restrictions, etc).
//
// Real users still get the exact same interactive experience: the client JS
// bundle loads as normal and React's createRoot() replaces the prerendered
// markup with the live app on mount. This script only changes what a
// non-JS HTTP client (a crawler, curl, an LLM fetch tool) sees on first load.
//
// HOW TO EXTEND THIS WHEN YOU ADD A NEW BLOG POST
// 1. Add the post's route to src/data/seo-data.json under "routes".
// 2. Add its source HTML file to public/static-blogs/ (same pattern as the
//    existing two posts) and reference it via "staticSource".
// 3. Add the matching React route in src/App.tsx and a <url> entry in
//    public/sitemap.xml.
// That's it — this script reads seo-data.json, so no code change is needed
// here for a new blog-post route. Non-blog routes (like "work" below) need
// a hand-written *BodyHtml() function and a push() in buildRoutes().
//
// HOW TO EXTEND THIS WHEN A BLOG POST GAINS NEW ON-PAGE FRAMING COPY
// If you add/change the Challenge/Approach/Craft Notes text passed into
// <CaseStudyFrame> in src/pages/blog-posts/*.tsx, update the matching entry
// in caseStudyFrames below so crawlers see the same thing real visitors do.
//
// HOW TO EXTEND THIS WHEN HOMEPAGE COPY CHANGES
// homeBodyHtml() below is a hand-written mirror of what Index.tsx actually
// renders (HeroSection, TrustStrip, PortfolioSection, ConvergenceSection,
// ProcessSection, AboutSection, ServicesSection, ContactSection, Footer).
// It does NOT update itself — if you edit visible text in any of those
// components, edit the matching string in homeBodyHtml() in the same PR.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const PUBLIC = resolve(ROOT, "public");

function fail(message) {
  console.error(`[prerender] FATAL: ${message}`);
  process.exit(1);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Mirrors the extraction logic in src/components/StaticHtmlPage.tsx so the
 * prerendered output matches exactly what real users see once React
 * hydrates the page: strips <script> tags (they're irrelevant to a
 * non-JS crawler and would just be dead weight/risk in the static file),
 * but keeps <style> blocks and promotes any JSON-LD to the returned list.
 */
function extractStaticBlogParts(raw) {
  const headMatch = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const head = headMatch ? headMatch[1] : "";
  const bodyRaw = bodyMatch ? bodyMatch[1] : raw;

  const styles = Array.from(head.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi))
    .map((m) => m[0])
    .join("\n");

  const jsonLd = Array.from(
    head.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  )
    .map((m) => m[1].trim())
    .filter(Boolean);

  const bodyNoScripts = bodyRaw.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/gi,
    (_full, attrs, code) => {
      const typeMatch = attrs.match(/type=["']([^"']+)["']/i);
      const type = typeMatch ? typeMatch[1] : undefined;
      if (type && type.toLowerCase() === "application/ld+json" && code.trim()) {
        jsonLd.push(code.trim());
      }
      return "";
    },
  );

  return { styles, body: bodyNoScripts, jsonLd };
}

function buildHeadTags({ title, description, canonical, ogType, ogImage, jsonLdList }) {
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="index, follow">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="${escapeHtml(ogType)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
  ];
  if (ogImage) lines.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
  lines.push(
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
  );
  if (ogImage) lines.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}">`);
  for (const ld of jsonLdList) {
    lines.push(`<script type="application/ld+json">${ld}</script>`);
  }
  return lines.join("\n    ");
}

/** Strips the *default* homepage title/description/OG/Twitter tags that ship
 * in the built index.html template, so per-route tags can be inserted
 * without leaving duplicate/conflicting <title> or <meta> elements. */
function stripDefaultMeta(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
    .replace(/<meta\s+property="og:[a-zA-Z:]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[a-zA-Z:]+"[^>]*>\s*/gi, "");
}

function stampTemplate(template, { headHtml, bodyHtml }) {
  let html = stripDefaultMeta(template);
  html = html.replace(/<\/head>/i, `    ${headHtml}\n  </head>`);
  html = html.replace(
    /<div id="root">\s*<\/div>/i,
    `<div id="root">${bodyHtml}</div>`,
  );
  return html;
}

// ---------------------------------------------------------------------------
// Route content — body copy is sourced verbatim from the live component text
// so it never drifts from what real visitors see. If you edit on-page copy,
// update the matching string below in the same change.
// ---------------------------------------------------------------------------

function homeBodyHtml(seo) {
  return `
<nav aria-label="Primary">
  <a href="/">ashutoshwrites.online</a>
  <ul>
    <li><a href="/#home">Home</a></li>
    <li><a href="/#about">About</a></li>
    <li><a href="/#services">Services</a></li>
    <li><a href="/#portfolio">Portfolio</a></li>
    <li><a href="/work">Work</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/#contact">Contact</a></li>
  </ul>
</nav>
<main>
  <section id="home">
    <p>SEO Blog Writing</p>
    <h1>Long-form content that earns attention &mdash; not chases it.</h1>
    <p>I write deeply researched SEO blogs for founders and brands who want readers to finish the article &mdash; and search engines to rank it.</p>
    <p>Human-Written / Research-Led</p>
    <p>Topics: AI &amp; Cybersecurity, Fintech, Creator Economy</p>
    <p><strong>Ashutosh Mahapatra</strong> &mdash; Freelance Writer &middot; Bhubaneswar, IN</p>
    <p><a href="/#portfolio">View Portfolio</a> <a href="/#contact">Hire Me</a></p>
  </section>

  <section id="trust">
    <ul>
      <li>18+ verified stats &mdash; research-backed</li>
      <li>1 CVE cited &mdash; fully sourced and verified</li>
      <li>3 niches &mdash; fintech, AI, cybersecurity</li>
      <li>100% &mdash; human-written, zero spun copy</li>
    </ul>
  </section>

  <section id="portfolio">
    <h2>Featured Writing Samples</h2>
    <p>Self-directed samples across AI, fintech, and creator-economy topics &mdash; researched, structured, and written exactly as I'd deliver for a client, engineered for ranking, retention, and revenue.</p>
    <article>
      <h3><a href="${seo.routes.humanCreativityVsAi.path}">Winning the Authenticity Premium in the AI-Slop Era</a></h3>
      <p>Audiences were tuning out AI-generated content but the niche had no anchor article. I produced a research-backed analysis on why human creators are winning in 2026 &mdash; built to rank and to convert.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.aiPersonalFinance2026.path}">Scaling Trust for an AI-Powered Personal Finance Audience</a></h3>
      <p>AI finance content was crowded with surface-level listicles and zero verified data. I built a long-form authority piece with 18 verified stats, 5 trends, and the risks most coverage misses.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.byoaShadowAi.path}">Why BYOA Is B2B SaaS's Next Data Nightmare</a></h3>
      <p>Shadow AI coverage was stuck describing 2019-era shadow IT. I wrote a threat brief on how agents ship pre-embedded inside approved platforms, inheriting OAuth scope nobody reviewed, backed by CVE-2025-32711 and a three-pillar governance framework.</p>
    </article>
    <p><a href="/work">View all work</a></p>
    <p><em>Every piece starts with search intent and primary research - then gets written by hand, line by line.</em></p>
  </section>

  <section id="approach">
    <h2>Where rankings meet retention</h2>
    <p>Every piece I ship sits at the intersection of three things:</p>
    <article>
      <h3>Research</h3>
      <p>Primary sources, verified data, no AI-hallucinated
