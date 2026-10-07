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
    id: "core",
    name: "Core Asset",
    kicker: "1 fully coded web page",
    price: "$1,200–2,400",
    unit: "per page",
    blurb: "Test the full workflow on a single hero asset before committing to a larger campaign.",
    features: ["Strategy and copywriting", "Custom HTML/CSS", "Technical SEO built into the code", "Responsive on every screen"],
  },
  {
    id: "flagship",
    name: "Flagship Series",
    kicker: "4-part fully coded web series",
    price: "$4,500–9,000",
    unit: "per month, four pages",
    perPage: "Works out to $1,125–2,250 per page",
    blurb: "Four complete, interactive pages, ready to deploy.",
    features: [
      "Strategy and copywriting for all four pages",
      "Custom HTML/CSS",
      "Schema.org JSON-LD",
      "Responsive design",
      "Interactive UI elements such as sticky tables of contents",
    ],
    featured: true,
  },
  {
    id: "pilot",
    name: "Pilot",
    kicker: "4-part text & strategy",
    price: "$1,600–2,000",
    unit: "per month, four articles",
    perPage: "Single article: $500–600",
    blurb: "Research, strategy and copywriting, delivered as a Google Doc.",
    features: ["Primary-source research", "Content strategy", "Copywriting", "Delivered in a Google Doc"],
  },
];

export const usualRoute = [
  "A writer delivers an article",
  "An SEO manager maps the meta tags and Schema markup",
  "A web developer formats the headings, codes the tables and builds the interactive elements",
  "A QA tester checks it on mobile",
];

export const pricingNote =
  "Final pricing depends on scope: word count, research depth and interactivity. Tell us about your project and we will send a scoped quote. Plans can be adjusted per client.";
