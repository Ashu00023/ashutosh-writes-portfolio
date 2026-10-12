import { workItems } from "@/data/work";

const samples = workItems.filter((w) => w.category !== "Thesis").slice(0, 3);

const ResearchStrip = () => (
  <section id="research" className="rd-sec rd-sand">
    <div className="rd-wrap">
      <div className="rd-hd">
        <h2 className="rd-big">Research we published first</h2>
        <p>
          Independent research samples, not client work. Each is written the way we would deliver it for a client, with its sources in view.
        </p>
      </div>
      <div className="st-rs">
        {samples.map((it) => (
          <article key={it.title} className="st-rc">
            <figure>
              <img src={it.image} alt={it.thumbAlt} width={800} height={450} loading="lazy" decoding="async" />
              <figcaption>{it.stat}</figcaption>
            </figure>
            <span className="st-eyebrow">{it.niche}</span>
            <h3>{it.title}</h3>
            <p>{it.problem}</p>
            <a className="st-go" href={it.liveUrl} target="_blank" rel="noopener noreferrer">Read the article</a>
          </article>
        ))}
      </div>
      <div className="st-more">
        <a className="rd-b1" href="/work">See all research</a>
        <a className="rd-b2" href="/work#audit">How we audited our own site</a>
      </div>
    </div>
  </section>
);

export default ResearchStrip;
