import { pricingNote, tiers, usualRoute } from "@/data/pricing";

const PricingSection = () => (
  <section id="pricing" className="rd-sec rd-sand">
    <div className="rd-wrap">
      <div className="rd-hd">
        <h2 className="rd-big">Pricing</h2>
        <p>
          Every plan includes strategy and copywriting. The difference is how much of the build, from design and code to
          Schema, we take off your team.
        </p>
      </div>

      <div className="rd-chain">
        <div>
          <h3>An article is only the first step</h3>
          <ol>
            {usualRoute.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="rd-one">
          <h3>With a fully coded page</h3>
          <p>
            One handoff: a zipped file or a clean block of code that looks right on mobile, with technical SEO built into the code.
          </p>
        </div>
      </div>

      <div className="rd-tiers">
        {tiers.map((t) => (
          <article key={t.id} className={`rd-tier${t.featured ? " rd-feat" : ""}`}>
            {t.featured && <span className="rd-rec">Recommended</span>}
            <h3>{t.name}</h3>
            <p className="rd-kick">{t.kicker}</p>
            <p className="rd-price">{t.price}</p>
            <p className="rd-unit">{t.unit}</p>
            {t.perPage && <p className="rd-per">{t.perPage}</p>}
            <p className="rd-blurb">{t.blurb}</p>
            <ul className="rd-tl">
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a className="rd-b1" href="#contact" aria-label={`Request a quote for ${t.name}`}>Request a quote</a>
          </article>
        ))}
      </div>
      <p className="rd-fine">{pricingNote}</p>
    </div>
  </section>
);

export default PricingSection;
