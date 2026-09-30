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
  <section id="services" className="border-t border-border pt-[clamp(4.5rem,9vw,7rem)] pb-[clamp(3rem,6vw,4.5rem)]">
    <div className="wrap grid grid-cols-12 gap-x-8">
      <h2 className="col-span-12 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] md:col-span-4">
        What I offer
      </h2>

      <div className="col-span-12 mt-10 border-t border-border md:col-span-8 md:mt-0">
        {services.map((s, i) => (
          <div key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-border py-8">
            <span className="folio pt-1.5">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-xl font-normal leading-snug text-foreground">{s.title}</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {s.points.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground">
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="link-seal mt-5 text-accent">
                Start a project <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;