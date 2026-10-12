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
// - Changed visible copy on a page: change the matching text in scripts/page-bodies.mjs.
// - New article: add the route to seo-data.json (with "staticSource"), put the HTML in public/static-blogs/,
//   add the key to ARTICLES below and the entry to src/data/posts.ts.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  homeBodyHtml,
  servicesBodyHtml,
  methodBodyHtml,
  workBodyHtml,
  aboutBodyHtml,
  contactBodyHtml,
  authorBodyHtml,
  legalBodyHtml,
  legalSections,
} from "./page-bodies.mjs";

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

const ARTICLES = ["aiPersonalFinance2026", "humanCreativityVsAi", "byoaShadowAi"];

const crumbs = (seo, label, path) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: seo.siteUrl },
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
    JSON.stringify({ "@context": "https://schema.org", "@graph": [seo.person, seo.professionalService] }),
  ]);

  // [seo-data key, breadcrumb label, body function]
  const PAGES = [
    ["services", "Services", servicesBodyHtml],
    ["method", "Method", methodBodyHtml],
    ["work", "Research", workBodyHtml],
    ["about", "About", aboutBodyHtml],
    ["contact", "Contact", contactBodyHtml],
  ];
  for (const [key, label, body] of PAGES) {
    add(key, body(seo), [crumbs(seo, label, seo.routes[key].path)]);
  }

  add("author", authorBodyHtml(seo), [
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
  ]);

  for (const key of ["privacyPolicy", "termsOfUse"]) {
    const meta = seo.routes[key];
    add(key, legalBodyHtml(meta, legalSections[key]), [crumbs(seo, meta.title.split("|")[0].trim(), meta.path)]);
  }

  for (const key of ARTICLES) {
    const meta = seo.routes[key];
    const raw = await readFile(join(PUBLIC, meta.staticSource), "utf8");
    const { styles, body, jsonLd } = extractStaticBlogParts(raw);
    add(
      key,
      `${styles}\n<article>${body}</article>`,
      jsonLd.length
        ? jsonLd
        : [JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: meta.title })],
    );
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
