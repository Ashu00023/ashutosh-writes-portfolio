import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import ServicesSection from "@/components/ServicesSection";
import CloseSection from "@/components/CloseSection";

const blocks = [
  {
    id: "articles",
    title: "Editorial articles",
    lede: "Long-form fintech, payments and AI-security articles, researched to primary sources and edited by a person, delivered ready to publish.",
    get: [
      "Primary-source research and a source ledger for every claim",
      "An original angle that adds information other articles lack",
      "Written and edited by a person, with AI used only for research support",
      "Delivered as a Google Doc, or as a coded HTML/CSS page with Schema",
      "Terms, scope and revisions agreed in writing before work starts",
    ],
    note: "Available as a single article or a monthly series.",
  },
  {
    id: "search",
    title: "Article-level search: SEO, AEO and GEO",
    lede: "For the articles we write and the ones you already have. We make each article rankable in Google and quotable by AI engines.",
    get: [
      "Search-intent mapping and heading architecture",
      "Answer-first blocks, FAQ and definition structure for answer engines",
      "Schema.org JSON-LD that mirrors the visible article",
      "Primary sources, dates and author signals that make an article citable",
      "Citation checks across ChatGPT, Perplexity, Gemini and Claude, with prompts and dates recorded",
    ],
    note: "We work one article at a time. We do not do full-site audits or technical SEO programmes.",
  },
  {
    id: "strategy",
    title: "Content strategy",
    lede: "Which articles to publish, in what order, and why. Built around what your buyers search and what AI engines already cite.",
    get: [
      "A topic map tied to search intent in your niche",
      "A gap review of what already ranks and what AI engines already quote",
      "An editorial calendar built around claims you can back with evidence",
      "Briefs that any writer can follow, ours or yours",
    ],
    note: "Available as a standalone plan or as the first step of a monthly series.",
  },
  {
    id: "article-check",
    title: "Article Check",
    lede: "Free, and the easiest way to start. Send one article and see the work before you commit to anything.",
    get: [
      "Every statistic, date and quote in the article checked against primary sources",
      "A test of whether ChatGPT, Perplexity, Gemini and Claude cite it, with prompts and dates recorded",
      "A check that your Schema matches the visible article",
      "A one-page written report, yours to keep",
    ],
    note: "We take a few each month, because each one is done by hand.",
  },
];

const faqs = [
  { q: "What is a source ledger?", a: "A list of every statistic, date and quote in an article, with its primary source, the date of that source and what it does and does not prove. It ships with the article, so anyone can check it." },
  { q: "Do you do full-site SEO audits?", a: "No. We work at article level: the article, its structure, its Schema and whether it gets cited. If you need a full-site technical audit, we will say so and point you to a specialist." },
  { q: "Do you guarantee rankings or AI citations?", a: "No. Search results and AI answers depend on factors nobody controls, and AI answers change from run to run. We build articles to be rankable and quotable, then test and report what we see, including the misses." },
  { q: "Do you use AI to write the articles?", a: "We use AI tools for research support and workflow efficiency. The argument, structure and final wording are written and edited by a person, and every claim is checked against its source before it goes in." },
  { q: "What do you need from us to start?", a: "A topic or an existing article, who it is for, and anything proprietary you want us to cite. For an Article Check, one URL is enough." },
  { q: "How is pricing set?", a: "Every engagement is scoped to your goals and quoted after your Article Check. We do not publish a price list because the work varies with research depth, delivery format and the number of articles." },
  { q: "Is there a long contract?", a: "No. Monthly plans run month to month, with 14 days' written notice to stop. Terms are agreed in writing before any work starts." },
  { q: "Who owns the finished articles?", a: "You do. Ownership of the deliverables transfers to you once the final payment has cleared." },
];

const Services = () => (
  <>
    <PageMeta route="services" crumb="Services" />
    <Navbar />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top">
        <div className="rd-wrap">
          <p className="st-eyebrow">Services</p>
          <h1>Editorial articles, built to rank and to be cited.</h1>
          <p className="st-lede">
            Three services and one free way to start, all at article level. Fintech, payments and AI-security teams are our focus.
          </p>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap">
          {blocks.map((b) => (
            <div key={b.id} id={b.id} className="st-blk">
              <div>
                <h2>{b.title}</h2>
                <p className="st-lede">{b.lede}</p>
              </div>
              <div>
                <h3>What you get</h3>
                <ul className="rd-hl">
                  {b.get.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <p className="st-small">{b.note}</p>
                <div className="rd-btns" style={{ margin: "20px 0 0" }}>
                  <a className="rd-b1" href="/contact">Get a free Article Check</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServicesSection title="The techniques behind the work" />

      <section className="rd-sec rd-sand">
        <div className="rd-wrap">
          <h2 className="rd-big" style={{ marginBottom: 40 }}>Questions, answered</h2>
          <div className="st-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CloseSection />
    </main>
    <Footer />
  </>
);

export default Services;
