import seo from "@/data/seo-data.json";

export type Post = {
  /** Route path — never change these; they are indexed URLs. */
  href: string;
  title: string;
  label: string;
  summary: string;
  image: string;
};

/**
 * Single source of truth for every published article.
 * The blog index, the author archive, and the sitemap all read from here, so a
 * new post appears everywhere the moment it is added to this array.
 */
export const posts: Post[] = [
  {
    href: seo.routes.aiPersonalFinance2026.path,
    title: "AI Personal Finance 2026",
    label: "AI + Finance",
    summary:
      "Verified stats, structural trends, and the risks most AI finance coverage misses — built for readers who want signal over noise.",
    image: "/ai-finance-blog-thumbnail.png",
  },
  {
    href: seo.routes.humanCreativityVsAi.path,
    title: "The Authenticity Premium in the AI-Slop Era",
    label: "AI + Content",
    summary:
      "Why human creativity is winning in 2026 and how creators can turn authenticity into a durable competitive advantage.",
    image: "/ai-content-blog-thumbnail.jpg",
  },
  {
    href: seo.routes.byoaShadowAi.path,
    title: "The Shadow AI Crisis: Why BYOA Is B2B SaaS's Next Data Nightmare",
    label: "Cybersecurity",
    summary:
      "AI agents aren't sneaking in through shadow IT anymore — they're inheriting OAuth scope from platforms you already approved.",
    image: "/byoa-shadow-ai-blog-thumbnail.png",
  },
];

/** Posts per page on the blog index and author archive. */
export const POSTS_PER_PAGE = 9;
