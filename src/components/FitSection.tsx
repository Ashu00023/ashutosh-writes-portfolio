const builtFor = [
  "Fintech, payments and AI-security teams",
  "B2B SaaS companies selling into those markets",
  "Teams where a wrong number in an article is a liability",
  "A content or marketing lead who needs articles an expert, or a compliance team, will read closely",
];
const notFor = [
  "Full-site SEO audits or technical SEO programmes. We work at article level",
  "Volume content or bulk listicles",
  "Guaranteed rankings or guaranteed AI citations. We test and report, and never promise",
  "Articles written without sources",
];
const shapes = [
  { title: "One article", text: "A single finished article and its ledger. The simplest way to see the whole workflow." },
  { title: "A series", text: "Four or more connected articles built around one topic, so they support each other." },
  { title: "A programme", text: "New articles every month plus quarterly re-verification of the ones already live." },
];

const FitSection = () => (
  <section id="fit" className="rd-sec">
    <div className="rd-wrap">
      <div className="rd-hd">
        <h2 className="rd-big">Who this is for</h2>
        <p>We would rather be the right fit for a few teams than a loose fit for many.</p>
      </div>

      <div className="st-two">
        <div>
          <h3>Built for</h3>
          <ul className="rd-hl">
            {builtFor.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Not for</h3>
          <ul className="rd-hl">
            {notFor.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="st-eng">
        {shapes.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
      <p className="st-small" style={{ marginTop: 28, maxWidth: "44em" }}>
        Every engagement is scoped to your goals and quoted after your Article Check. Monthly plans run month to month, with 14 days’ notice. We are taking on a small number of founding clients, with terms agreed in writing before any work starts.
      </p>
    </div>
  </section>
);

export default FitSection;
