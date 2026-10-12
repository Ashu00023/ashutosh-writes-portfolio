const items = [
  {
    tag: "Write",
    title: "Editorial articles",
    text: "Long-form articles researched to primary sources and edited to a publishable standard. Thought leadership and search-led pieces for fintech and AI-security buyers.",
    href: "/services#articles",
    link: "See what is included",
  },
  {
    tag: "Optimise",
    title: "Article-level search",
    text: "SEO, GEO and AEO built into each article, not bolted on: answer-first structure, Schema, and refreshes for older articles that deserve to rank or be cited.",
    href: "/services#search",
    link: "See how it works",
  },
  {
    tag: "Plan",
    title: "Content strategy",
    text: "Topic and angle strategy for your niche, an editorial calendar, and a brief for every article, so each one earns its place.",
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
