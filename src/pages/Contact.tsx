import { lazy, Suspense } from "react";
import { Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { EMAIL, LINKEDIN } from "@/data/site";

const ArticleCheckForm = lazy(() => import("@/components/forms/ArticleCheckForm"));

const gets = [
  "Every statistic, date and quote checked against primary sources",
  "A test of whether AI engines cite the article, with prompts and dates recorded",
  "A check that your Schema matches the visible article",
  "A one-page written report, yours to keep",
];

const Contact = () => (
  <>
    <PageMeta route="contact" crumb="Contact" />
    <Navbar />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top">
        <div className="rd-wrap">
          <p className="st-eyebrow">Free Article Check</p>
          <h1>Send us one article.</h1>
          <p className="st-lede">
            We check every claim in it and test whether AI engines cite it. A few each month, each one done by hand.
          </p>
        </div>
      </section>

      <section className="rd-sec" style={{ paddingTop: 40 }}>
        <div className="rd-wrap st-cc">
          <div className="st-form">
            <Suspense fallback={<div style={{ minHeight: 420 }} />}>
              <ArticleCheckForm />
            </Suspense>
          </div>
          <aside className="st-side">
            <h3>What you get</h3>
            <ul className="rd-hl">
              {gets.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <h3>Prefer email?</h3>
            <p className="st-small" style={{ marginBottom: 14 }}>Send the link to your article and we will take it from there.</p>
            <div className="st-soc" style={{ justifyContent: "flex-start", marginTop: 0 }}>
              <a className="st-ic" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Ashutosh Mahapatra on LinkedIn">
                <Linkedin size={17} aria-hidden="true" />
              </a>
              <a className="st-mail" href={`mailto:${EMAIL}`}>
                <Mail size={15} aria-hidden="true" />
                {EMAIL}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Contact;
