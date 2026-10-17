// Run from the project root:  node fix-static-pages.mjs
import fs from "node:fs";
import path from "node:path";

const P = "public";
const SITE = "https://ashutoshwrites.online";
const has = (f) => fs.existsSync(path.join(P, f));

// Read/write that survives Windows (CRLF) line endings.
function load(file) {
  const raw = fs.readFileSync(path.join(P, file), "utf8");
  return { crlf: raw.includes("\r\n"), s: raw.replace(/\r\n/g, "\n") };
}
function save(file, doc) {
  const out = doc.crlf ? doc.s.replace(/\n/g, "\r\n") : doc.s;
  fs.writeFileSync(path.join(P, file), out, "utf8");
  console.log("edited", file);
}
function swap(doc, file, oldStr, newStr) {
  if (!doc.s.includes(oldStr)) { console.log(`  skip (not found or already done) in ${file}: ${oldStr.slice(0, 60)}`); return; }
  doc.s = doc.s.split(oldStr).join(newStr);
}

// 1) Article pages: point og/twitter/Article image at a file that exists (only if the dedicated cover is still missing).
const articles = [
  ["static-blogs/ai-personal-finance-2026.html", "static-blogs/og-ai-personal-finance-2026.jpg"],
  ["static-blogs/ai-authenticity-premium-2026.html", "static-blogs/og-ai-authenticity-premium-2026.jpg"],
  ["static-blogs/byoa-shadow-ai-blog.html", "static-blogs/og-byoa-shadow-ai-blog.jpg"],
];
for (const [file, cover] of articles) {
  const doc = load(file);
  if (has(cover)) console.log(`  cover exists, keeping og:image in ${file}`);
  else swap(doc, file, `${SITE}/${cover}`, `${SITE}/og-cover.jpg`);
  if (file.includes("personal-finance")) {
    swap(
      doc, file,
      "21 sourced statistics, 6 structural trends, and the risks most coverage misses \u2014 a data-driven look at how AI is reshaping personal finance in 2026. Updated October 2026.",
      "21 sourced statistics, 6 structural trends and the risks most AI finance coverage misses: a data-driven look at AI in personal finance in 2026."
    );
  }
  if (file.includes("authenticity")) {
    // footer headings: h2 -> p (same look via the updated CSS selector)
    doc.s = doc.s
      .replace(/<h2>(Explore|Services|Site|Connect)<\/h2>/g, '<p class="sf-h">$1</p>')
      .replace(".sf-grid h2{", ".sf-grid .sf-h{");
  }
  save(file, doc);
}

// 2) Visa article
const visa = "visa-agentic-commerce-disputes-seo.html";
{
  const doc = load(visa);
  if (!has("visa-agentic-commerce-dispute-seo-thumbnail.png")) {
    swap(doc, visa, `${SITE}/visa-agentic-commerce-dispute-seo-thumbnail.png`, `${SITE}/hero-authorization-confirmed.png`);
    swap(doc, visa, '<meta property="og:image:width" content="1280">', '<meta property="og:image:width" content="1200">');
    swap(doc, visa, '<meta property="og:image:height" content="720">', '<meta property="og:image:height" content="640">');
    swap(doc, visa, '"width": 1280,\n        "height": 720,', '"width": 1200,\n        "height": 640,');
  }
  swap(doc, visa, '<meta property="og:site_name" content="Ashutosh Mahapatra \u2014 Fintech &amp; AI Writing">', '<meta property="og:site_name" content="Ashutosh Writes">');
  swap(doc, visa, '<meta property="article:author" content="https://ashutoshwrites.online">', `<meta property="article:author" content="${SITE}/author/ashutosh-mahapatra">`);

  const authorPublisher = /"author": \{\s*"@type": "Person",\s*"name": "Ashutosh Mahapatra",\s*"url": "https:\/\/ashutoshwrites\.online"\s*\},\s*"publisher": \{[\s\S]*?"height": 512\s*\}\s*\}/;
  if (authorPublisher.test(doc.s)) {
    doc.s = doc.s.replace(authorPublisher, () => `"author": {
        "@type": "Person",
        "@id": "https://ashutoshwrites.online/#person",
        "name": "Ashutosh Mahapatra",
        "url": "https://ashutoshwrites.online/author/ashutosh-mahapatra",
        "sameAs": ["https://linkedin.com/in/ashutosh-mahapatra"]
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://ashutoshwrites.online/#service",
        "name": "Ashutosh Writes",
        "url": "https://ashutoshwrites.online/"
      }`);
  } else console.log("  skip (not found or already done): Visa author/publisher block");

  const faqMarker = '    {\n      "@type": "FAQPage",';
  if (!doc.s.includes('"@type": "BreadcrumbList"') && doc.s.includes(faqMarker)) {
    const crumb = `    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ashutoshwrites.online/" },
        { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://ashutoshwrites.online/research" },
        { "@type": "ListItem", "position": 3, "name": "Visa agentic commerce dispute rules", "item": "https://ashutoshwrites.online/visa-agentic-commerce-disputes-seo.html" }
      ]
    },
`;
    doc.s = doc.s.replace(faqMarker, () => crumb + faqMarker);
  } else console.log("  skip (not found or already done): Visa BreadcrumbList");

  // prove the JSON-LD still parses before saving
  const ld = doc.s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  JSON.parse(ld);
  save(visa, doc);
  console.log("  Visa JSON-LD parses OK");
}

// 3) Fonts for the static articles (skips files that already exist)
const fontDir = path.join(P, "static-blogs", "fonts");
fs.mkdirSync(fontDir, { recursive: true });
const fonts = [
  ["node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2", "newsreader-variable.woff2"],
  ["node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2", "newsreader-variable-italic.woff2"],
  ["node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", "ibm-plex-mono-400.woff2"],
  ["node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", "ibm-plex-mono-500.woff2"],
];
for (const [src, name] of fonts) {
  const dest = path.join(fontDir, name);
  if (fs.existsSync(dest)) { console.log("font exists, skipping", name); continue; }
  if (!fs.existsSync(src)) { console.log("!! font source missing (run `npm install` first):", src); continue; }
  fs.copyFileSync(src, dest);
  console.log("copied font", name);
}
console.log("\nDone.");
