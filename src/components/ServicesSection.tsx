import { useState } from "react";

const services = [
  {
    title: "On-page SEO",
    points: ["Search-intent and SERP analysis", "Title, H1 and heading architecture", "Internal linking and canonical hygiene", "Fast, accessible custom HTML/CSS", "Refreshes of existing pages that already rank"],
  },
  {
    title: "AEO: answer engine optimization",
    points: ["Answer-first blocks under every question heading", "FAQ and definition structure for snippets and People Also Ask", "Schema.org JSON-LD that mirrors the visible page", "Tables and step lists in extractable formats"],
  },
  {
    title: "GEO: generative engine optimization",
    points: ["Primary-source research with dates, sample sizes and stated limits", "An original angle that adds information other pages lack", "Author and entity signals: byline, author page, Person schema", "Crawlable raw HTML for AI search bots", "Citation checks across ChatGPT, Perplexity, Gemini and Claude"],
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
