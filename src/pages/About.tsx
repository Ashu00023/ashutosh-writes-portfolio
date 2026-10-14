import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import CloseSection from "@/components/CloseSection";

const About = () => (
  <>
    <PageMeta route="about" crumb="About" />
    <Navbar />
    <main id="main" tabIndex={-1} className="rd-page focus:outline-none">
      <section className="st-top" style={{ paddingBottom: 0 }}>
        <div className="rd-wrap">
          <p className="st-eyebrow">About</p>
          <h1>The editors behind the articles.</h1>
          <p className="st-lede">
            Ashutosh Mahapatra leads a three-person writing and engineering team in Bhubaneswar, India. Read his{" "}
            <Link to="/author/ashutosh-mahapatra" className="text-accent underline underline-offset-4">author page</Link>{" "}
            for the full article archive.
          </p>
        </div>
      </section>
      <AboutSection />
      <TeamSection />
      <CloseSection />
    </main>
    <Footer />
  </>
);

export default About;
