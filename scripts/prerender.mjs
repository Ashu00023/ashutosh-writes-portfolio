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
    <img src="/profile.webp" alt="Portrait of Ashutosh Mahapatra" width="288" height="288" fetchpriority="high">
    <p>Ashutosh Writes: a three-person editorial and engineering team in Bhubaneswar, India</p>
    <h1>Fully coded editorial web pages for AI, fintech, and SaaS.</h1>
    <p>We build interactive, fully coded editorial web assets, from deep B2B research and clear copy to front-end design, custom HTML/CSS and Schema markup, ready to publish.</p>
    <p><a href="/#portfolio">View Portfolio</a> <a href="/#pricing">See Pricing</a></p>
  </section>

  <section id="trust">
    <ul>
      <li>4 independent research samples across AI, fintech, cybersecurity &amp; technology</li>
      <li>18+ sourced statistics in the finance authority piece</li>
      <li>Primary-source research: reports, filings, rules &amp; technical sources</li>
      <li>Complex technical and financial topics translated clearly</li>
    </ul>
  </section>

  <section id="portfolio">
    <h2>Featured writing samples</h2>
    <p>Independent research samples across AI, fintech, cybersecurity and technology, researched, structured and written as I would deliver for a client.</p>
    <article>
      <h3><a href="${seo.routes.humanCreativityVsAi.path}">Winning the Authenticity Premium in the AI-Slop Era</a></h3>
      <p>Built an original thesis on why human creators are earning an authenticity premium in 2026, backed by editorial analysis rather than a recycled take.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.aiPersonalFinance2026.path}">Scaling Trust for an AI-Powered Personal Finance Audience</a></h3>
      <p>A long-form authority piece anchored in 18 sourced statistics, five structural trends and a risk framework most coverage skips.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.byoaShadowAi.path}">Why BYOA Is B2B SaaS's Next Data Nightmare</a></h3>
      <p>A technical threat brief on inherited OAuth scope nobody reviewed, grounded in CVE-2025-32711 and a three-pillar governance framework.</p>
    </article>
    <article>
      <h3><a href="${seo.routes.visaAgenticCommerceDisputes.path}">Untangling Liability in Visa's New Agentic Commerce Dispute Rules</a></h3>
      <p>A breakdown of who bears the loss when an AI agent buys the wrong thing, checked against Visa's and Mastercard's own rule text.</p>
    </article>
    <p><a href="/work">View all work</a></p>
  </section>

  <section id="services">
    <h2>What we offer</h2>
    <article>
      <h3>Research-Driven Authority Articles</h3>
      <p>Search-intent research, competitor and content-gap analysis, primary-source research, original angle and thesis, SEO architecture, long-form writing and editing, citations and source list.</p>
    </article>
    <article>
      <h3>B2B Technical &amp; Thought-Leadership Content</h3>
      <p>Industry analysis for AI, SaaS, fintech and cybersecurity, technical explainers, emerging-trend analysis, regulatory and market developments, founder and executive thought leadership.</p>
    </article>
    <article>
      <h3>Content Strategy &amp; Research</h3>
      <p>Keyword research, search intent mapping, topic clusters, content-gap analysis, editorial roadmap and research-backed briefs.</p>
    </article>
  </section>

  <section id="pricing">
    <h2>Pricing</h2>
    <ul>
      <li><strong>Core Asset</strong>: 1 fully coded web page, $1,200&ndash;2,400 per page</li>
      <li><strong>Flagship Series</strong>: 4-part fully coded web series, $4,500&ndash;9,000 per month</li>
      <li><strong>Pilot</strong>: 4-part text &amp; strategy, $1,600&ndash;2,000 per month</li>
    </ul>
    <p>Final pricing depends on scope. See the <a href="/refund-policy">Payment, Refund and Revision Policy</a>.</p>
  </section>

  <section id="contact">
    <h2>Let&rsquo;s Work Together</h2>
    <p>Have a project in mind? Reach out through any channel below.</p>
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
  <nav aria-label="Work">
    <h2>Work</h2>
    <ul>
      <li><a href="/#portfolio">Featured Work</a></li>
      <li><a href="/work">All Work</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </nav>
  <nav aria-label="Services">
    <h2>Services</h2>
    <ul>
      <li><a href="/#services">SEO Blogs</a></li>
      <li><a href="/#services">Content Strategy</a></li>
    </ul>
  </nav>
  <nav aria-label="Connect">
    <h2>Connect</h2>
    <ul>
      <li><a href="mailto:ashutosh@mail.ashutoshwrites.online">Email</a></li>
      <li><a href="https://wa.me/919040451510">WhatsApp</a></li>
      <li><a href="https://linkedin.com/in/ashutosh-mahapatra">LinkedIn</a></li>
      <li><a href="https://instagram.com/ashutosh.writes">@ashutosh.writes</a></li>
    </ul>
  </nav>
  <nav aria-label="Site">
    <h2>Site</h2>
    <ul>
      <li><a href="/#home">Home</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#process">Process</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
  </nav>
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
    <p>Sourced statistics, structural trends and the risks most AI finance coverage misses, built for readers who want signal over noise.</p>
  </article>
  <article>
    <h2><a href="${seo.routes.humanCreativityVsAi.path}">The Authenticity Premium in the AI-Slop Era</a></h2>
    <p>Why human creativity is winning in 2026 and how creators can turn authenticity into a durable competitive advantage.</p>
  </article>
  <article>
    <h2><a href="${seo.routes.byoaShadowAi.path}">The Shadow AI Crisis: Why BYOA Is B2B SaaS's Next Data Nightmare</a></h2>
    <p>AI agents are no longer sneaking in through shadow IT. They inherit OAuth scope from platforms you already approved.</p>
  </article>
</main>`.trim();
}

function authorBodyHtml(seo) {
  const items = ["aiPersonalFinance2026", "humanCreativityVsAi", "byoaShadowAi"]
    .map((key) => `    <li><a href="${seo.routes[key].path}">${seo.routes[key].title}</a></li>`)
    .join("\n");
  return `
<nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; Author</nav>
<main>
  <h1>Ashutosh Mahapatra</h1>
  <p>Technology writer covering AI, cybersecurity and business.</p>
  <p>I write long-form, research-backed articles about technology and money. My work starts with primary sources (filings, CVEs, vendor documentation, published research). I use AI where it helps with research and workflow, but the argument, structure and final wording are mine.</p>
  <h2>Articles by Ashutosh Mahapatra</h2>
  <ul>
${items}
  </ul>
</main>`.trim();
}

function legalBodyHtml(meta, sections) {
  const items = sections.map((section) => `    <li>${section}</li>`).join("\n");
  return `
<nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; ${meta.title.split("|")[0].trim()}</nav>
<main>
  <h1>${meta.title.split("|")[0].trim()}</h1>
  <p>${meta.description}</p>
  <h2>What this page covers</h2>
  <ul>
${items}
  </ul>
  <p>Questions? Email <a href="mailto:ashutosh@mail.ashutoshwrites.online">ashutosh@mail.ashutoshwrites.online</a>.</p>
</main>`.trim();
}

const legalSections = {
  refundPolicy: [
    "Deposits and payment schedule",
    "Revision rounds and acceptance",
    "Refund and cancellation terms",
    "Ownership, AI use and delivery limits",
  ],
  privacyPolicy: [
    "Information collected and how it is used",
    "Service providers: hosting, database, email delivery and fonts",
    "Legal bases, retention, and international transfers",
    "Your privacy rights, and how to exercise them",
  ],
  termsOfUse: [
    "Intellectual property and content ownership",
    "Permitted use, attribution, and republication limits",
    "Acceptable use and third-party links",
    "Limitation of liability and governing law",
  ],
  cookiePolicy: [
    "No analytics or advertising cookies",
    "Third-party fonts and external links",
    "What would change this policy",
    "Consent and browser-level controls",
  ],
  disclaimer: [
    "Educational purpose of all content",
    "No financial, legal, or professional advice",
    "Research, sourcing, and how AI is used",
    "Accuracy, timeliness, and external links",
  ],
};

function workIndexBodyHtml(seo) {
  return `
<nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; Work</nav>
<main>
  <h1>Selected Work</h1>
  <p>Every piece here started with search intent and primary research.</p>
  <article>
    <h2><a href="${seo.routes.humanCreativityVsAi.path}">Winning the Authenticity Premium in the AI-Slop Era</a></h2>
    <p>Creator Economy &middot; SEO Blog &middot; research-backed anchor article</p>
    <p>Audiences were tuning out AI-generated content but the niche had no anchor article. I produced a research-backed analysis on why human creators are winning in 2026.</p>
  </article>
  <article>
    <h2><a href="${seo.routes.aiPersonalFinance2026.path}">Scaling Trust for an AI-Powered Personal Finance Audience</a></h2>
    <p>Fintech &middot; SEO Blog &middot; 18 sourced statistics</p>
    <p>AI finance content was crowded with surface-level listicles with little sourced data. I built a long-form authority piece with 18 sourced statistics, 5 trends, and the risks most coverage misses.</p>
  </article>
  <article>
    <h2><a href="${seo.routes.byoaShadowAi.path}">Why BYOA Is B2B SaaS's Next Data Nightmare</a></h2>
    <p>AI &amp; Cybersecurity &middot; SEO Blog &middot; CVE-2025-32711 cited</p>
    <p>Shadow AI coverage was stuck describing 2019-era shadow IT. I wrote a threat brief on how agents ship pre-embedded inside approved platforms, inheriting OAuth scope nobody reviewed, backed by CVE-2025-32711 and a three-pillar governance framework.</p>
  </article>
</main>`.trim();
}

// Per-post Challenge/Approach/Craft Notes copy, mirrored from the
// <CaseStudyFrame> props in src/pages/blog-posts/*.tsx. Keep in sync with
// those files — if you edit the props there, edit the matching entry here.
const caseStudyFrames = {
  aiPersonalFinance2026: {
    niche: "AI Fintech",
    format: "SEO Blog",
    statHighlight: "18 sourced statistics",
    challenge:
      "AI finance content was crowded with surface-level listicles with little sourced data, so little in the niche earned a reader's trust.",
    approach:
      "I built a long-form authority piece carrying 18 sourced statistics, 5 trends and the risks most coverage skips.",
    craftNotes: [
      "Verified every statistic before it went in, so each number can be traced to a primary source.",
      "Rewrote section headings as the direct questions readers ask, formatted for featured snippets and AI answers.",
      "Added a short standalone summary under the headline and a Key Takeaway line closing each major section.",
    ],
  },
  byoaShadowAi: {
    niche: "Cybersecurity",
    format: "SEO Blog",
    statHighlight: "CVE-2025-32711 cited",
    challenge:
      "Shadow AI coverage was stuck describing 2019-era shadow IT (employees smuggling in unapproved tools), which no longer matches how AI actually enters a company.",
    approach:
      "I wrote it as a threat brief: how agents ship pre-embedded inside already-approved platforms and inherit OAuth scope nobody reviewed, anchored to CVE-2025-32711 and closed with a three-pillar governance framework.",
    craftNotes: [
      "Led with the gap in existing coverage so security readers immediately see why the 2019 shadow-IT frame fails.",
      "Anchored the core claim to a citable CVE rather than vendor commentary, so the piece holds up under scrutiny.",
      "Ended on a three-pillar framework, giving the article a reusable structure teams can act on and other pages can cite.",
    ],
  },
  humanCreativityVsAi: {
    niche: "Creator Economy",
    format: "SEO Blog",
    statHighlight: "research-backed anchor article",
    challenge:
      "Audiences were already tuning out AI-generated content, but the niche had no anchor article explaining what was happening.",
    approach:
      "I produced a research-backed analysis of why human creators are winning in 2026, written to explain the trend and not only describe it.",
    craftNotes: [
      "Positioned the piece as the niche's missing anchor article so it could absorb search demand around the topic.",
      "Supported the argument with original charts instead of restating other people's summaries.",
      "Kept the through-line on why human creators win, so every section pays off the headline promise.",
    ],
  },
};

function caseStudyFrameHtml(meta, frame) {
  const notes = frame.craftNotes.map((n) => `<li>${n}</li>`).join("");
  return `
<section>
  <p>${frame.niche}</p>
  <h1>${meta.title}</h1>
  <h2>Challenge</h2>
  <p>${frame.challenge}</p>
  <h2>Approach</h2>
  <p>${frame.approach}</p>
  <dl>
    <dt>Format</dt><dd>${frame.format}</dd>
    <dt>Niche</dt><dd>${frame.niche}</dd>
    <dt>Key stat</dt><dd>${frame.statHighlight}</dd>
  </dl>
  <h2>Craft Notes</h2>
  <ul>${notes}</ul>
</section>`;
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

  routes.push({
    key: "work",
    ...seo.routes.work,
    canonical: `${seo.siteUrl}${seo.routes.work.path}`,
    jsonLdList: [
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
          { "@type": "ListItem", position: 2, name: "Work", item: `${seo.siteUrl}${seo.routes.work.path}` },
        ],
      }),
    ],
    bodyHtml: workIndexBodyHtml(seo),
  });

  routes.push({
    key: "author",
    ...seo.routes.author,
    canonical: `${seo.siteUrl}${seo.routes.author.path}`,
    jsonLdList: [
      JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { ...seo.person, mainEntityOfPage: `${seo.siteUrl}${seo.routes.author.path}` },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
              { "@type": "ListItem", position: 2, name: "Author", item: `${seo.siteUrl}${seo.routes.author.path}` },
            ],
          },
        ],
      }),
    ],
    bodyHtml: authorBodyHtml(seo),
  });

  for (const key of ["privacyPolicy", "termsOfUse", "cookiePolicy", "disclaimer", "refundPolicy"]) {
    const meta = seo.routes[key];
    routes.push({
      key,
      ...meta,
      canonical: `${seo.siteUrl}${meta.path}`,
      jsonLdList: [
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
            { "@type": "ListItem", position: 2, name: meta.title.split("|")[0].trim(), item: `${seo.siteUrl}${meta.path}` },
          ],
        }),
      ],
      bodyHtml: legalBodyHtml(meta, legalSections[key]),
    });
  }

  for (const key of ["aiPersonalFinance2026", "humanCreativityVsAi", "byoaShadowAi"]) {
    const meta = seo.routes[key];
    const sourcePath = join(PUBLIC, meta.staticSource);
    const raw = await readFile(sourcePath, "utf8");
    const { styles, body, jsonLd } = extractStaticBlogParts(raw);
    const frame = caseStudyFrames[key];
    const frameHtml = frame ? caseStudyFrameHtml(meta, frame) : "";
    routes.push({
      key,
      ...meta,
      canonical: `${seo.siteUrl}${meta.path}`,
      jsonLdList: jsonLd.length
        ? jsonLd
        : [JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: meta.title })],
      bodyHtml: `${frameHtml}\n${styles}\n<article>${body}</article>`,
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
