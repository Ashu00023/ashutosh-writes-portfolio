import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import PortfolioSection from "@/components/PortfolioSection";
import CloseSection from "@/components/CloseSection";

const Work = () => (
  <>
    <PageMeta route="work" crumb="Work" />
    <Navbar startDark />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top st-onstage" style={{ paddingBottom: 0 }}>
        <div className="rd-wrap">
          <p className="st-eyebrow">Work</p>
          <h1>Four articles, written the way we would write yours.</h1>
          <p className="st-lede">
            Self-directed writing samples in fintech and AI security. None was commissioned: each was written without a client brief, built with on-page SEO, GEO and AEO, and sourced to primary documents, so you can judge the work before you brief us.
          </p>
        </div>
      </section>

      <PortfolioSection
        fromTop
        title="Selected work"
        intro="Each sample shows the problem it took on, how it was researched, and what it demonstrates. Open the article to read it in full."
      />

      <section className="rd-sec">
        <div className="rd-wrap st-center">
          <h2 className="rd-big">See the research behind the work.</h2>
          <p className="st-lede" style={{ margin: "20px auto 0" }}>
            The Research page lists every article we have published, and shows how we audited our own site for AI-crawler visibility.
          </p>
          <div className="rd-btns">
            <a className="rd-b1" href="/research">See the research</a>
            <a className="rd-b2" href="/author/ashutosh-mahapatra">Read the author page</a>
          </div>
        </div>
      </section>

      <CloseSection />
    </main>
    <Footer />
  </>
);

export default Work;
