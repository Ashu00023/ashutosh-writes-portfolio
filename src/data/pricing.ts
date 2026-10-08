/**
 * Every price and plan on the site lives here.
 * To change a price or a feature, edit this file only — no component changes needed.
 */
export type Tier = {
  id: string;
  name: string;
  kicker: string;
  price: string;
  unit: string;
  perPage?: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "foundation",
    name: "Foundation Sprint",
    kicker: "4 answer-ready articles a month",
    price: "$1,600–2,000",
    unit: "per month, fixed scope",
    blurb:
      "Start here. Four primary-source articles structured for search and AI answers, delivered as a Google Doc. Your first month is credited if you move to Flagship within 60 days.",
    features: [
      "Primary-source research and a source list",
      "Search-intent mapping and heading architecture",
      "Answer-first blocks, FAQ and definition structure",
      "Internal link map",
      "Delivered in a Google Doc",
    ],
  },
  {
    id: "flagship",
    name: "Flagship Series",
    kicker: "4-part fully coded web series",
    price: "From $6,500",
    unit: "per month, four pages",
    perPage: "About $1,625 per page",
    blurb: "Four complete pages built to rank and be cited, ready to deploy.",
    features: [
      "Strategy, research and copywriting for all four pages",
      "On-page SEO architecture and answer-first structure",
      "Custom HTML/CSS, responsive on every screen",
      "Schema.org JSON-LD that mirrors the visible page",
      "Source ledger and stated limits on every claim",
      "Interactive UI elements such as sticky tables of contents",
    ],
    featured: true,
  },
  {
    id: "authority",
    name: "Authority Program",
    kicker: "Fully coded pages plus a quarterly refresh",
    price: "From $12,000",
    unit: "per month",
    blurb: "For teams that want a body of cited pages rather than a single series.",
    features: [
      "Eight fully coded pages a month, or four new pages plus a refresh of your existing top pages",
      "Quarterly re-verification of every statistic and date",
      "AI-citation checks across ChatGPT, Perplexity, Gemini and Claude",
      "Search Console review of which pages rank and which get cited",
      "Priority turnaround",
    ],
  },
];

/** One-off entry point, shown under the three plans rather than beside them. */
export const singlePage = {
  name: "Core Asset",
  price: "$1,200–2,400",
  text: "Need just one page? Core Asset is one fully coded page, a way to test the full workflow before you commit to a series.",
};

export const usualRoute = [
  "A writer delivers an article",
  "An SEO manager maps the meta tags and Schema markup",
  "A web developer formats the headings, codes the tables and builds the interactive elements",
  "A QA tester checks it on mobile",
];

export const pricingNote =
  "Prices in USD. Final pricing depends on scope: word count, research depth and interactivity. Tell us about your project and we will send a scoped quote. Plans can be adjusted per client.";
