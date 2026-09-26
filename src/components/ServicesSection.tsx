import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Research-Driven Authority Articles",
    points: [
      "Search-intent research",
      "Competitor and content-gap analysis",
      "Primary-source research",
      "Original angle and thesis",
      "SEO architecture",
      "Long-form writing and editing",
      "Citations and source list",
      "Tables and visuals when useful",
    ],
  },
  {
    title: "B2B Technical & Thought-Leadership Content",
    points: [
      "Industry analysis for AI, SaaS, fintech and cybersecurity",
      "Technical explainers",
      "Emerging-trend analysis",
      "Regulatory and market developments",
      "Founder and executive thought leadership",
    ],
  },
  {
    title: "Content Strategy & Research",
    points: [
      "Keyword research",
      "Search intent mapping",
      "Topic clusters",
      "Content-gap analysis",
      "Editorial roadmap",
      "Research-backed briefs",
    ],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-14">
        What I offer
      </h2>

      <div className="divide-y divide-border/60 border-t border-border/60">
        {services.map((s) => (
          <div key={s.title} className="py-8">
            <h3 className="font-heading text-xl text-foreground mb-3">{s.title}</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
              {s.points.map((p) => (
                <li key={p} className="text-sm text-muted-foreground">{p}</li>
              ))}
            </ul>
            
              href="#contact"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Start a project <ArrowUpRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;