import seo from "@/data/seo-data.json";

export type WorkItem = {
  niche: string;
  category: string;
  format: string;
  stat: string;
  title: string;
  problem: string;
  approach: string;
  demonstrates: string;
  image: string;
  thumbAlt: string;
  liveUrl: string;
  transcriptHref: string;
};

export const workItems: WorkItem[] = [
  {
    niche: "Cybersecurity",
    category: "AI & Cybersecurity",
    format: "SEO Blog",
    stat: "17 sources cited",
    title: "Shadow AI Inside Approved SaaS: How Agents Inherit Access",
    problem: "Shadow AI coverage often centers on employees adopting new tools; the harder case is agents that arrive inside platforms already approved.",
    approach: "Wrote a technical threat brief on inherited OAuth scope nobody reviewed, grounded in CVE-2025-32711, three named incidents with their limits stated, dated EU AI Act obligations and a governance framework.",
    demonstrates: "Researching and explaining a technical security issue with primary-source verification and a usable governance framework.",
    image: "/byoa-shadow-ai-blog-thumbnail.webp",
    thumbAlt: "Cover image for the shadow AI article: the line It's already inside, 150,000 agents by 2028, above a small device on a dark table",
    liveUrl: "/static-blogs/byoa-shadow-ai-blog.html",
    transcriptHref: seo.routes.byoaShadowAi.path,
  },
  {
    niche: "Fintech & AI",
    category: "Fintech",
    format: "SEO Blog",
    stat: "12 primary sources cited",
    title: "Untangling Liability in Visa's New Agentic Commerce Dispute Rules",
    problem: "Visa quietly routed AI-agent purchases into its existing card-not-present dispute rules, and most coverage skipped the actual liability question.",
    approach: "Wrote a fact-checked breakdown of who eats the loss when an agent buys the wrong thing, verified against Visa's and Mastercard's own rule text.",
    demonstrates: "Tracing a regulatory/payments question to primary-source rule text and explaining the liability outcome clearly.",
    image: "/visa-agentic-commerce-dispute-seo-thumbnail.webp",
    thumbAlt: "Cover image for the Visa dispute article: a payment card resting on printed documents beside the title Visa Already Decided Who Eats the Loss",
    liveUrl: "/visa-agentic-commerce-disputes-seo.html",
    transcriptHref: seo.routes.visaAgenticCommerceDisputes.path,
  },
  {
    niche: "AI Fintech",
    category: "Fintech",
    format: "SEO Blog",
    stat: "20+ sourced statistics",
    title: "Scaling Trust for an AI-Powered Personal Finance Audience",
    problem: "AI personal-finance content was crowded with surface-level listicles with little sourced data.",
    approach: "Built a long-form authority piece anchored in 20+ sourced statistics, mapped six structural trends, and added a risk framework most coverage skips.",
    demonstrates: "Turning scattered data points into a structured, evidence-backed trend and risk analysis.",
    image: "/ai-finance-blog-thumbnail.webp",
    thumbAlt: "Cover image for the AI personal finance article: the title The AI Money Gap, a large 52% statistic and a line chart",
    liveUrl: "/static-blogs/ai-personal-finance-2026.html",
    transcriptHref: seo.routes.aiPersonalFinance2026.path,
  },
  {
    niche: "Creator Economy",
    category: "Creator Economy",
    format: "SEO Blog",
    stat: "research-backed anchor article",
    title: "Winning the Authenticity Premium in the AI-Slop Era",
    problem: "Audiences were tuning out AI-generated content, but the creator-economy niche had no anchor article explaining why.",
    approach: "Built an original thesis on why human creators are earning an authenticity premium in 2026, backed by editorial analysis rather than a recycled take.",
    demonstrates: "Originating a point of view in a saturated topic and defending it with structured argument.",
    image: "/ai-content-blog-thumbnail.webp",
    thumbAlt: "Cover image for the Authenticity Premium article: a brass drafting compass on blueprint sketches beside a headline about audiences rejecting AI content",
    liveUrl: "/static-blogs/ai-authenticity-premium-2026.html",
    transcriptHref: seo.routes.humanCreativityVsAi.path,
  },
];

export const nicheFilters = ["All", "AI & Cybersecurity", "Fintech", "Creator Economy"];
export const formatFilters = ["All formats", "SEO Blog"];
