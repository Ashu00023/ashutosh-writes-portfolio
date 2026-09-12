import seo from "@/data/seo-data.json";

export type WorkItem = {
  niche: string;
  category: string;
  format: string;
  stat: string;
  title: string;
  summary: string;
  image: string;
  liveUrl: string;
  transcriptHref: string;
};

export const workItems: WorkItem[] = [
  {
    niche: "Creator Economy",
    category: "Creator Economy",
    format: "SEO Blog",
    stat: "research-backed anchor article",
    title: "Winning the Authenticity Premium in the AI-Slop Era",
    summary:
      "Audiences were tuning out AI-generated content but the niche had no anchor article. I produced a research-backed analysis on why human creators are winning in 2026 - built to rank and to convert.",
    image: "/ai-content-blog-thumbnail.jpg",
    liveUrl: "/static-blogs/ai-authenticity-premium-2026.html",
    transcriptHref: seo.routes.humanCreativityVsAi.path,
  },
  {
    niche: "AI Fintech",
    category: "Fintech",
    format: "SEO Blog",
    stat: "18 verified stats",
    title: "Scaling Trust for an AI-Powered Personal Finance Audience",
    summary:
      "AI finance content was crowded with surface-level listicles and zero verified data. I built a long-form authority piece with 18 verified stats, 5 trends, and the risks most coverage misses.",
    image: "/ai-finance-blog-thumbnail.png",
    liveUrl: "/static-blogs/ai-personal-finance-2026.html",
    transcriptHref: seo.routes.aiPersonalFinance2026.path,
  },
  {
    niche: "Cybersecurity",
    category: "AI & Cybersecurity",
    format: "SEO Blog",
    stat: "CVE-2025-32711 cited",
    title: "Why BYOA Is B2B SaaS's Next Data Nightmare",
    summary:
      "Shadow AI coverage was stuck describing 2019-era shadow IT. I wrote a threat brief on how agents ship pre-embedded inside approved platforms, inheriting OAuth scope nobody reviewed, backed by CVE-2025-32711 and a three-pillar governance framework.",
    image: "/byoa-shadow-ai-blog-thumbnail.png",
        liveUrl: "/static-blogs/byoa-shadow-ai-blog.html",
    transcriptHref: seo.routes.byoaShadowAi.path,
  },
  {
    niche: "Fintech & AI",
    category: "Fintech",
    format: "SEO Blog",
    stat: "12 primary sources cited",
    title: "Untangling Liability in Visa's New Agentic Commerce Dispute Rules",
    summary:
      "Visa quietly routed AI-agent purchases into its existing card-not-present dispute rules, and most coverage skipped the actual liability question. I wrote a fact-checked breakdown of who eats the loss when an agent buys the wrong thing, sourced against Visa and Mastercard's own rule text.",
    image: "/visa-agentic-commerce-dispute-seo-thumbnail",
    liveUrl: "/visa-agentic-commerce-disputes-seo.html",
    transcriptHref: seo.routes.visaAgenticCommerceDisputes.path,
  },
];

export const nicheFilters = ["All", "AI & Cybersecurity", "Fintech", "Creator Economy"];
export const formatFilters = ["All formats", "SEO Blog"];
