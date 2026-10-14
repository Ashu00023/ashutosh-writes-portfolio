const items = [
  {
    tag: "Optimise",
    title: "On-page SEO, GEO & AEO",
    text: "Search, generative-engine and answer-engine optimisation built into each article, not bolted on: intent-matched headings, answer-first blocks, Schema that mirrors the page, and refreshes for older articles that deserve to rank or be cited.",
    href: "/services#search",
    link: "See how it works",
  },
  {
    tag: "Write",
    title: "Research-led articles",
    text: "Long-form articles researched to primary sources and written to a publishable standard, each with its on-page SEO, GEO and AEO already in place. Thought leadership and search-led pieces for fintech and AI-security buyers.",
    href: "/services#articles",
    link: "See what is included",
  },
  {
    tag: "Plan",
    title: "Content strategy",
    text: "Topic and angle strategy for your niche, a content calendar, and a brief for every article, so each one earns its place.",
    href: "/services#strategy",
    link: "See what you get",
  },
];

const BuildSection = () => (
  <section id="build" className="rd-sec">
    <div className="rd-wrap">
      <div className="rd-hd">
        <h2 className="rd-big">What we do, at article level</h2>
        <p>Three things, done well. We do not do full-site audits or volume content.</p>
      </div>
      <div className="st-cards">
        {items.map((it) => (
          <article key={it.title} className="st-card">
            <span className="st-tag">{it.tag}</span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            <a className="st-go" href={it.href}>{it.link}</a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BuildSection;
