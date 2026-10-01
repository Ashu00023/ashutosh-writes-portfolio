import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import seo from "@/data/seo-data.json";

const { home } = seo.routes;
const canonical = `${seo.siteUrl}${home.path}`;

const Index = () => (
  <>
    <Helmet>
      <title>{home.title}</title>
      <meta name="description" content={home.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={home.title} />
      <meta property="og:description" content={home.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={home.ogType} />
      <meta property="og:image" content={home.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={home.title} />
      <meta name="twitter:description" content={home.description} />
      <meta name="twitter:image" content={home.ogImage} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            seo.person,
            seo.professionalService,
            {
              "@type": "WebSite",
              "@id": `${seo.siteUrl}/#website`,
              url: `${seo.siteUrl}/`,
              name: "Ashutosh Writes",
              publisher: { "@id": seo.person["@id"] },
            },
            {
              "@type": "Organization",
              "@id": `${seo.siteUrl}/#organization`,
              name: "Ashutosh Writes",
              url: `${seo.siteUrl}/`,
              founder: { "@id": seo.person["@id"] },
            },
          ],
        })}
      </script>
    </Helmet>
    <Navbar />
    <main className="rd-page">
      <HeroSection />
      <PortfolioSection />
      <ProcessSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;