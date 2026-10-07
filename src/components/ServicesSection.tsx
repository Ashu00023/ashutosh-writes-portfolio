import { useState } from "react";

const services = [
  {
    title: "Research-Driven Authority Articles",
    points: ["Search-intent research", "Competitor and content-gap analysis", "Primary-source research", "Original angle and thesis", "SEO architecture", "Long-form writing and editing", "Citations and source list", "Tables and visuals when useful"],
  },
  {
    title: "B2B Technical & Thought-Leadership Content",
    points: ["Industry analysis for AI, SaaS, fintech and cybersecurity", "Technical explainers", "Emerging-trend analysis", "Regulatory and market developments", "Founder and executive thought leadership"],
  },
  {
    title: "Content Strategy & Research",
    points: ["Keyword research", "Search intent mapping", "Topic clusters", "Content-gap analysis", "Editorial roadmap", "Research-backed briefs"],
  },
];

const ServicesSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="services" className="rd-sec">
      <div className="rd-wrap">
        <h2 className="rd-big" style={{ marginBottom: 56 }}>What we offer</h2>
        {services.map((s, i) => (
          <div key={s.title} className={`rd-sv${open === i ? " rd-o" : ""}`}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              <h3>{s.title}</h3>
              <i className="rd-pm" />
            </button>
            <div className="rd-sb">
              <div>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <a href="#contact" aria-label={`Start a project: ${s.title}`}>Start a project</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
