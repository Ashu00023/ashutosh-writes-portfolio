import seo from "@/data/seo-data.json";

export type Post = {
  /** Route path — never change these; they are indexed URLs. */
  href: string;
  title: string;
  label: string;
  summary: string;
  image: string;
  /** True for posts that live outside the SPA (raw static HTML) — needs a plain <a>, not <Link>. */
  external?: boolean;
};

/**
 * Single source of truth for every published article.
 * The research page, the author archive, and the sitemap all read from here, so a
 * new post appears everywhere the moment it is added to this array.
 */
export const posts: Post[] = [
  {
    href: seo.routes.aiPersonalFinance2026.path,
    title: seo.routes.aiPersonalFinance2026.title,
    label: "AI + Finance",
    summary:
      "Sourced statistics, structural trends and the risks most AI finance coverage misses, built for readers who want signal over noise.",
    image: "/ai-finance-blog-thumbnail.webp",
    external: true,
  },
  {
    href: seo.routes.humanCreativityVsAi.path,
    title: seo.routes.humanCreativityVsAi.title,
    label: "AI + Content",
    summary:
      "Why human creativity is winning in 2026 and how creators can turn authenticity into a durable competitive advantage.",
    image: "/ai-content-blog-thumbnail.webp",
    external: true,
  },
  {
    href: seo.routes.byoaShadowAi.path,
    title: seo.routes.byoaShadowAi.title,
    label: "Cybersecurity",
    summary:
      "AI agents aren't sneaking in through shadow IT anymore. They inherit OAuth scope from platforms you already approved.",
    image: "/byoa-shadow-ai-blog-thumbnail.webp",
    external: true,
  },
  {
    href: seo.routes.visaAgenticCommerceDisputes.path,
    title: seo.routes.visaAgenticCommerceDisputes.title,
    label: "Fintech & AI",
    summary:
      "Visa's April 2026 Core Rules update routed agent purchases into existing card-not-present dispute rules. Checked against primary sources.",
    image: "/visa-agentic-commerce-dispute-seo-thumbnail.webp",
    external: true,
  },
];

/** Posts per page on the author archive. */
export const POSTS_PER_PAGE = 9;
