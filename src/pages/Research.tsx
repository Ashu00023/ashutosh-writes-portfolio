import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import PortfolioSection from "@/components/PortfolioSection";
import CloseSection from "@/components/CloseSection";
import { posts } from "@/data/posts";

const Research = () => (
  <>
    <PageMeta route="research" crumb="Research" />
    <Navbar startDark />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top st-onstage" style={{ paddingBottom: 0 }}>
        <div className="rd-wrap">
          <p className="st-eyebrow">Research</p>
          <h1>Independent articles, researched like client work.</h1>
          <p className="st-lede">
            Fintech and AI-security articles written without a client brief. Each one is sourced to primary documents, built with on-page SEO, GEO and AEO, and written as we would deliver it for you.
          </p>
        </div>
      </section>

      <PortfolioSection fromTop />

      <section id="audit" className="rd-sec">
        <div className="rd-wrap st-split">
          <div>
            <p className="st-eyebrow">Our own articles, checked first</p>
            <h2 className="rd-big" style={{ marginTop: 14 }}>An article that AI crawlers cannot read cannot be cited.</h2>
          </div>
          <div>
            <p>
              Our site is built with React. When we fetched it the way most AI crawlers do, with a plain request that does not run JavaScript, it came back as an empty shell: no headline and no article text.
            </p>
            <p>
              Google still indexed it, because Googlebot renders JavaScript. Most AI crawlers do not. So the articles ranked, and the engines that answer questions could not see them.
            </p>
            <p>
              <strong>The fix.</strong> Every page now ships as real HTML, generated at build time, and the build fails if any page comes out empty. Each article also has one canonical address, and the sitemap carries last-modified dates.
            </p>
            <p>
              We have not yet measured the effect on AI citations. When we have, we will publish the result here, including if it is zero.
            </p>
            <p className="st-small">
              Check it yourself: <code>curl -s https://ashutoshwrites.online/ | grep -c "Fintech and AI-security articles that rank"</code>. This is the same check we run on your article in a free Article Check.
            </p>
            <div className="rd-btns" style={{ margin: "20px 0 0" }}>
              <a className="rd-b1" href="/contact">Get a free Article Check</a>
            </div>
          </div>
        </div>
      </section>

      <section className="rd-sec rd-sand">
        <div className="rd-wrap">
          <h2 className="rd-big">All articles</h2>
          <ul className="st-list">
            {posts.map((p) => (
              <li key={p.href}>
                <a href={p.href}>
                  <small>{p.label}</small>
                  <div>
                    <b>{p.title}</b>
                    <span>{p.summary}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseSection />
    </main>
    <Footer />
  </>
);

export default Research;
