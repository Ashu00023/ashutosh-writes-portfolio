import sharp from "sharp";
import { existsSync } from "node:fs";

// [source name without extension, output, width, height, fit]
// The source can be .png, .jpg or .jpeg. Run from the repo root: node scripts/optimize-images.mjs
const jobs = [
  ["public/ai-finance-blog-thumbnail", "public/ai-finance-blog-thumbnail.webp", 800, 450, "cover"],
  ["public/byoa-shadow-ai-blog-thumbnail", "public/byoa-shadow-ai-blog-thumbnail.webp", 800, 450, "cover"],
  ["public/visa-agentic-commerce-dispute-seo-thumbnail", "public/visa-agentic-commerce-dispute-seo-thumbnail.webp", 800, 450, "cover"],
  ["public/ai-content-blog-thumbnail", "public/ai-content-blog-thumbnail.webp", 800, 450, "cover"],
  ["src/assets/logo-new", "src/assets/logo-new.webp", 96, 96, "contain"],
  ["src/assets/profile", "public/profile.webp", 576, 576, "cover"],
];

for (const [base, dst, w, h, fit] of jobs) {
  const src = [".png", ".jpg", ".jpeg"].map((ext) => base + ext).find(existsSync);
  if (!src) {
    console.warn(`SKIPPED, no source found: ${base}.png / .jpg / .jpeg`);
    continue;
  }
  await sharp(src)
    .resize(w, h, { fit, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 80 })
    .toFile(dst);
  console.log(`${src} -> ${dst}`);
}