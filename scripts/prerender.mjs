// Postbuild static-HTML generator.
//
// The app is a client-rendered React SPA, so dist/index.html is an empty <div id="root"></div>.
// Googlebot runs JavaScript and copes. Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not,
// and would see nothing. This script writes a real HTML file for every route into dist/, with the
// title, meta tags, JSON-LD and visible text, using only Node's fs and path (no headless browser).
// It fails the build if any file comes out without its title or still has an empty root.
//
// WHEN YOU CHANGE THE SITE
// - New page: add a route block to src/data/seo-data.json (with "outFile"), add a body function to
//   scripts/page-bodies.mjs, add one entry to PAGES below, and add the URL to public/sitemap.xml and
//   public/llms.txt.
// - Changed visible copy on a page: change the matching text in scripts/page-bodies.mjs. The privacy and terms
//   pages are the exception: their text is read straight from src/pages/legal/*.tsx (scripts/legal-html.mjs).
// - New article: put the HTML in public/static-blogs/ (it is served as-is, not prerendered), add an entry
//   {path, title} to seo-data.json, add a rewrite and an entry in ARTICLE_KEYS (page-bodies.mjs), add it to
//   src/data/posts.ts, src/data/work.ts, public/sitemap.xml and public/llms.txt. See SEO_GEO_STRATEGY.md.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  homeBodyHtml,
  servicesBodyHtml,
  methodBodyHtml,
  workBodyHtml,
  researchBodyHtml,
  aboutBodyHtml,
  contactBodyHtml,
  authorBodyHtml,
  legalBodyHtml,
  ARTICLE_KEYS,
} from "./page-bodies.mjs";
import { readLegalPage } from "./legal-html.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");

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

function buildHeadTags({ title, description, canonical, ogType, ogImage, jsonLdList }) {
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<meta property="og:site_name" content="Ashutosh Writes">`,
    `<meta property="og:locale" content="en_US">`,
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

const crumbs = (seo, label, path) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${seo.siteUrl}${path}` },
    ],
  });

async function buildRoutes(seo) {
  const routes = [];
  const add = (key, bodyHtml, jsonLdList) => {
    const meta = seo.routes[key];
    routes.push({ key, ...meta, canonical: `${seo.siteUrl}${meta.canonicalPath || meta.path}`, jsonLdList, bodyHtml });
  };

  add("home", homeBodyHtml(seo), [
    JSON.stringify({ "@context": "https://schema.org", "@graph": [seo.person, seo.professionalService, seo.website] }),
  ]);

  // [seo-data key, breadcrumb label, body function]
  const PAGES = [
    ["services", "Services", servicesBodyHtml],
    ["method", "Method", methodBodyHtml],
    ["work", "Work", workBodyHtml],
    ["research", "Research", researchBodyHtml],
    ["about", "About", aboutBodyHtml],
    ["contact", "Contact", contactBodyHtml],
  ];
  for (const [key, label, body] of PAGES) {
    add(key, body(seo), [crumbs(seo, label, seo.routes[key].path)]);
  }

  const authorUrl = `${seo.siteUrl}${seo.routes.author.path}`;
  add("author", authorBodyHtml(seo), [
    JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { ...seo.person, mainEntityOfPage: authorUrl },
        {
          "@type": "ProfilePage",
          "@id": authorUrl,
          url: authorUrl,
          name: seo.routes.author.title,
          description: seo.routes.author.description,
          mainEntity: { "@id": seo.person["@id"] },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Author", item: authorUrl },
          ],
        },
        {
          "@type": "ItemList",
          name: "Articles by Ashutosh Mahapatra",
          itemListElement: ARTICLE_KEYS.map((key, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: seo.routes[key].title,
            url: `${seo.siteUrl}${seo.routes[key].path}`,
          })),
        },
      ],
    }),
  ]);

  const LEGAL = { privacyPolicy: "PrivacyPolicy.tsx", termsOfUse: "TermsOfUse.tsx" };
  for (const [key, file] of Object.entries(LEGAL)) {
    const meta = seo.routes[key];
    const page = await readLegalPage(ROOT, file);
    add(key, legalBodyHtml(page), [crumbs(seo, meta.title.split("|")[0].trim(), meta.path)]);
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
  // dist/404.html: Vercel serves this with a real 404 status for any URL that matches no file or rewrite.
  try {
    const notFoundHead = [
      `<title>Page not found | Ashutosh Writes</title>`,
      `<meta name="robots" content="noindex, follow">`,
    ].join("\n    ");
    const notFoundBody =
      `<main id="main"><h1>Page not found</h1><p>That address does not exist on this site.</p>` +
      `<p><a href="/">Home</a> · <a href="/research">Research</a> · <a href="/services">Services</a> · <a href="/contact">Contact</a></p></main>`;
    const notFoundHtml = stampTemplate(template, { headHtml: notFoundHead, bodyHtml: notFoundBody });
    await writeFile(join(DIST, "404.html"), notFoundHtml, "utf8");
    console.log("[prerender] OK   404 -> dist/404.html (noindex)");
  } catch (err) {
    failures += 1;
    console.error(`[prerender] FAIL 404.html: ${err?.message ?? err}`);
  }
  if (failures > 0) {
    fail(`${failures} of ${routes.length} route(s) failed to prerender. Build should not be treated as SEO-safe.`);
  }

  console.log(`[prerender] done — ${routes.length} route(s) prerendered successfully.`);
}

main().catch((err) => fail(err?.stack ?? String(err)));
