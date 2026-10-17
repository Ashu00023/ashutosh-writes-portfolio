// Run from the project root:  node convert-images.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const files = [
  "public/static-blogs/charts/authenticity-premium.png",
  "public/static-blogs/charts/engagement.png",
  "public/static-blogs/charts/jobs-risk.png",
  "public/static-blogs/charts/market-growth.png",
  "public/hero-authorization-confirmed.png",
  "public/signature-verification-comparison.png",
  "public/cnp-vs-x402-flow.png",
];

for (const f of files) {
  if (!fs.existsSync(f)) { console.log("missing, skipped:", f); continue; }
  const out = f.replace(/\.png$/, ".webp");
  await sharp(f).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  console.log(path.basename(out), Math.round(fs.statSync(f).size / 1024), "KB ->", Math.round(fs.statSync(out).size / 1024), "KB");
}

// Point the <img> tags at the WebP files.
function patch(file, fn) {
  const s = fs.readFileSync(file, "utf8");
  const n = fn(s);
  if (n !== s) { fs.writeFileSync(file, n, "utf8"); console.log("updated", file); } else console.log("no change", file);
}
patch("public/static-blogs/ai-authenticity-premium-2026.html", (s) =>
  s.replace(/\/static-blogs\/charts\/([a-z-]+)\.png/g, "/static-blogs/charts/$1.webp"));
patch("public/visa-agentic-commerce-disputes-seo.html", (s) =>
  s.replace(/src="\/(hero-authorization-confirmed|signature-verification-comparison|cnp-vs-x402-flow)\.png"/g, 'src="/$1.webp"'));
console.log("Done. Keep the original PNGs: social tags still point at one of them.");
