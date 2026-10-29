import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import ProcessSection from "@/components/ProcessSection";
import CloseSection from "@/components/CloseSection";

const ledgerFields = [
  "The claim, exactly as it appears in the article",
  "The primary source, with a link",
  "The date of that source",
  "What the source proves",
  "What it does not prove, stated as a limit",
  "The date we last verified it",
];

const tests = [
  { t: "Claims", d: "Every statistic, date and quote is checked against its source before it goes in." },
  { t: "Structure", d: "Schema.org JSON-LD mirrors what is visible in the article, nothing more and nothing less." },
  { t: "Citations", d: "A fixed set of prompts is asked across ChatGPT, Perplexity, Gemini and Claude, with the engine, prompt and date recorded. AI answers vary between runs, so each prompt is repeated several times and we report how many runs cited the article, misses included. We record whether the article's URL was cited, the brand was mentioned or the brand was recommended. We measure whether an article is cited, not how much traffic AI search sends." },
  { t: "Crawlability", d: "The raw HTML contains the content, because most AI crawlers do not run JavaScript." },
];

const Method = () => (
  <>
    <PageMeta route="method" crumb="Method" />
    <Navbar />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top">
        <div className="rd-wrap">
          <p className="st-eyebrow">Method</p>
          <h1>How a source-verified article gets made.</h1>
          <p className="st-lede">
            Research comes first and writing second. Every article ships with a ledger, so the evidence travels with the work.
          </p>
        </div>
      </section>

      <ProcessSection />

      <section className="rd-sec">
        <div className="rd-wrap st-split">
          <div>
            <h2 className="rd-big">The source ledger standard</h2>
          </div>
          <div>
            <p>Each entry in the ledger carries six fields, so an editor can check any claim in under a minute.</p>
            <ul className="rd-hl">
              {ledgerFields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rd-sec rd-sand">
        <div className="rd-wrap">
          <div className="rd-hd">
            <h2 className="rd-big">What we test instead of promising</h2>
            <p>We never guarantee rankings or citations. We test four things and report what we see.</p>
          </div>
          <div className="st-eng" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {tests.map((x) => (
              <div key={x.t}>
                <h3>{x.t}</h3>
                <p>{x.d}</p>
              </div>
            ))}
          </div>
          <p className="st-small" style={{ marginTop: 36, maxWidth: "44em" }}>
            We use AI tools for research support and workflow efficiency. The argument, structure and final decisions stay with a person.
          </p>
        </div>
      </section>

      <CloseSection />
    </main>
    <Footer />
  </>
);

export default Method;
