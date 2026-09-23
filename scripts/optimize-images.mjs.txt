import sharp from "sharp";

const jobs = [
  // [source, output, width, height]
  ["public/ai-finance-blog-thumbnail.png", "public/ai-finance-blog-thumbnail.webp", 800, 450],
  ["public/byoa-shadow-ai-blog-thumbnail.png", "public/byoa-shadow-ai-blog-thumbnail.webp", 800, 450],
  ["public/visa-agentic-commerce-dispute-seo-thumbnail", "public/visa-agentic-commerce-dispute-seo-thumbnail.webp", 800, 450],
  ["public/ai-content-blog-thumbnail.jpg", "public/ai-content-blog-thumbnail.webp", 800, 450],
  ["src/assets/logo-new.png", "src/assets/logo-new.webp", 96, 96],
  ["src/assets/profile.jpg", "public/profile.webp", 576, 576],
];

for (const [src, dst, w, h] of jobs) {
  await sharp(src).resize(w, h, { fit: "cover" }).webp({ quality: 80 }).toFile(dst);
  console.log(`${src} -> ${dst}`);
}