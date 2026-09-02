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
// here for a new blog-post route. Non-blog routes need a small addition to
// buildRouteContent() below.

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
// Route content — homepage & blog index body copy is sourced verbatim from
// the live component text (src/components/HeroSection.tsx, AboutSection.tsx,
// ServicesSection.tsx, SkillsSection.tsx, TestimonialsSection.tsx,
// ContactSection.tsx, Navbar.tsx) so it never drifts from what real visitors
// see. If you edit that on-page copy, update the matching string below.
// ---------------------------------------------------------------------------

function homeBodyHtml(seo) {
  return `
<nav aria-label="Primary">
  <a href="/">ashutoshwrites.online</a>
  <ul>
    <li><a href="/#home">Home</a></li>
    <li><a href="/#about">About</a></li>
    <li><a href="/#services">Services</a></li>
    <li><a href="/#skills">Skills</a></li>
    <li><a href="/#portfolio">Portfolio</a></li>
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
    <p><strong>Ashutosh Mahapatra</strong> &mdash; Freelance Writer &middot; Bhubaneswar, IN</p>
    <p><a href="/#portfolio">View Portfolio</a> <a href="/#contact">Hire Me</a></p>
  </section>

  <section id="portfolio">
    <h2>Featured Case Studies</h2>
    <p>Selected SEO articles shipped for AI, fintech, and creator-economy clients &mdash; engineered for ranking, retention, and revenue.</p>
    <article>
      <h3><a href="${seo.routes.humanCreativityVsAi.path}">Winning the Authenticity Premium in the AI-Slop Era</a></h3>
      <p>Audiences were tuning out AI-generated content but the niche had no anchor article. I produced a research-backed analysis on why human creators are winning in 2026 &mdash; built to rank and to convert.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.aiPersonalFinance2026.path}">Scaling Trust for an AI-Powered Personal Finance Audience</a></h3>
      <p>AI finance content was crowded with surface-level listicles and zero verified data. I built a long-form authority piece with 18 verified stats, 5 trends, and the risks most coverage misses.</p>
    </article>
  </section>

  <section id="about">
    <h2>I write the kind of content people actually finish.</h2>
    <p>I am Ashutosh &mdash; a freelance writer working with founders, creators, and brands who care more about the reader than the algorithm. Most online content is written to be skimmed. I write to be read.</p>
    <p>My process is slow on purpose: real research, primary sources, a clear argument, and language that respects the reader&rsquo;s time. The result is work that ranks on Google, holds attention to the last line, and sounds like a person &mdash; because a person wrote it.</p>
    <p>Where it helps, I use AI for structural research and SEO &mdash; but every argument, transition, and final line is still written by hand.</p>
    <ul>
      <li>Long-form SEO blogs built around search intent, not word count</li>
      <li>Structured for featured snippets, AI answers, and page-one rankings</li>
      <li>Original research, primary sources, and a clear point of view</li>
      <li>Every line written by hand &mdash; no AI drafts, no spun copy</li>
    </ul>
  </section>

  <section id="services">
    <h2>What I Offer</h2>
    <article>
      <h3>SEO Blog Writing</h3>
      <ul>
        <li>High-quality, keyword-optimized blog posts</li>
        <li>Designed to rank on Google page 1</li>
        <li>100% human-written content</li>
        <li>Focus on traffic + conversions</li>
      </ul>
    </article>
    <article>
      <h3>Search Intent &amp; Content Strategy</h3>
      <ul>
        <li>Keyword and competitor gap research</li>
        <li>Topic clusters mapped to buyer intent</li>
        <li>Briefs built from primary sources</li>
        <li>Structured for featured snippets and AI answers</li>
      </ul>
    </article>
  </section>

  <section id="skills">
    <h2>My Expertise</h2>
    <ul>
      <li>Long-Form SEO Writing</li>
      <li>Keyword Research</li>
      <li>Search Intent Strategy</li>
      <li>Storytelling</li>
    </ul>
  </section>

  <section id="testimonials">
    <h2>What Clients Say</h2>
    <p>Client testimonials coming soon.</p>
  </section>

  <section id="contact">
    <h2>Let&rsquo;s Work Together</h2>
    <p>Ready to grow your traffic with premium, human-written content? Reach out through any channel below.</p>
    <ul>
      <li><a href="mailto:ashutosh@mail.ashutoshwrites.online">ashutosh@mail.ashutoshwrites.online</a></li>
      <li><a href="tel:+919040451510">+91 9040451510</a></li>
      <li><a href="https://wa.me/919040451510">WhatsApp</a></li>
      <li><a href="https://instagram.com/ashutosh.writes">@ashutosh.writes</a></li>
      <li><a href="https://linkedin.com/in/ashutosh-mahapatra">Ashutosh Mahapatra on LinkedIn</a></li>
    </ul>
  </section>
</main>
<footer>
  <p>&copy; ${new Date().getFullYear()} Ashutosh Mahapatra</p>
</footer>`.trim();
}

function blogIndexBodyHtml(seo) {
  return `
<nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; Blog</nav>
<main>
  <h1>Latest Writing</h1>
  <p>Long-form pieces on the ideas shaping AI, finance, and content.</p>
  <article>
    <h2><a href="${seo.routes.aiPersonalFinance2026.path}">AI Personal Finance 2026</a></h2>
    <p>Verified stats, structural trends, and the risks most AI finance coverage misses &mdash; built for readers who want signal over noise.</p>
  </article>
  <article>
    <h2><a href="${seo.routes.humanCreativityVsAi.path}">The Authenticity Premium in the AI-Slop Era</a></h2>
    <p>Why human creativity is winning in 2026 and how creators can turn authenticity into a durable competitive advantage.</p>
  </article>
</main>`.trim();
}

async function buildRoutes(seo) {
  const routes = [];

  routes.push({
    key: "home",
    ...seo.routes.home,
    canonical: `${seo.siteUrl}${seo.routes.home.path}`,
    jsonLdList: [JSON.stringify({ "@context": "https://schema.org", "@graph": [seo.person, seo.professionalService] })],
    bodyHtml: homeBodyHtml(seo),
  });

  routes.push({
    key: "blogIndex",
    ...seo.routes.blogIndex,
    canonical: `${seo.siteUrl}${seo.routes.blogIndex.path}`,
    jsonLdList: [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${seo.siteUrl}${seo.routes.blogIndex.path}` },
        ],
      }),
    ],
    bodyHtml: blogIndexBodyHtml(seo),
  });

  for (const key of ["aiPersonalFinance2026", "humanCreativityVsAi", "byoaShadowAi"]) {
    const meta = seo.routes[key];
    const sourcePath = join(PUBLIC, "static-blogs", meta.staticSource);
    if (!existsSync(sourcePath)) {
      fail(`missing static source for route "${key}": ${sourcePath}`);
    }
    const raw = await readFile(sourcePath, "utf8");
    const { styles, body, jsonLd } = extractStaticBlogParts(raw);
    routes.push({
      key,
      ...meta,
      canonical: `${seo.siteUrl}${meta.path}`,
      jsonLdList: jsonLd.length
        ? jsonLd
        : [JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: meta.title })],
      bodyHtml: `${styles}\n<article>${body}</article>`,
    });
  }

  return routes;
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    fail("dist/index.html not found — run `vite build` before this script (it runs automatically as \"postbuild\").");
  }

  const seoRaw = await readFile(join(ROOT, "src/data/seo-data.json"), "utf8");
  const seo = JSON.parse(seoRaw);
  const template = await readFile(join(DIST, "index.html"), "utf8");
  const routes = await buildRoutes(seo);

  let failures = 0;
  for (const route of routes) {
    try {
      const headHtml = buildHeadTags({
        title: route.title,
        description: route.description,
        canonical: route.canonical,
        ogType: route.ogType,
        ogImage: route.ogImage,
        jsonLdList: route.jsonLdList,
      });
      const html = stampTemplate(template, { headHtml, bodyHtml: route.bodyHtml });

      const outPath = join(DIST, route.outFile);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf8");

      // Sanity check: confirm the write actually contains real content and
      // not an empty shell, so a bug here fails loudly instead of shipping
      // silently-broken output like the old Puppeteer script could.
      if (!html.includes(escapeHtml(route.title)) || html.includes('<div id="root"></div>')) {
        throw new Error("output does not contain expected title/body content (empty-shell check failed)");
      }

      console.log(`[prerender] OK   ${route.path} -> dist/${route.outFile} (${(html.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      failures += 1;
      console.error(`[prerender] FAIL ${route.path}: ${err?.message ?? err}`);
    }
  }

  if (failures > 0) {
    fail(`${failures} of ${routes.length} route(s) failed to prerender. Build should not be treated as SEO-safe.`);
  }

  console.log(`[prerender] done — ${routes.length} route(s) prerendered successfully.`);
}

main().catch((err) => fail(err?.stack ?? String(err)));
