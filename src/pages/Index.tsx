import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { getPersonSchema, getServiceSchema } from "@/lib/seo-schema";

const Index = () => {
  const personSchema = getPersonSchema();
  const serviceSchema = getServiceSchema();

  return (
    <>
      <Helmet>
        <title>Ashutosh Mahapatra — Freelance SEO Blog Writer & YouTube Script Writer | High Converting Content</title>
        <meta name="description" content="Hire Ashutosh Mahapatra, a top 0.1% freelance SEO blog and YouTube script writer. 100% human-written, high-converting content for Google & YouTube growth. No AI used." />
        <link rel="canonical" href="https://www.ashutoshwrites.online" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Ashutosh Mahapatra — Freelance SEO Blog Writer & YouTube Script Writer" />
        <meta property="og:description" content="100% human-written SEO blogs and YouTube scripts that drive traffic and conversions. Top 0.1% content quality." />
        <meta property="og:url" content="https://www.ashutoshwrites.online" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ashutoshwrites.online/profile.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ashutosh Mahapatra — Freelance SEO Blog Writer & YouTube Script Writer" />
        <meta name="twitter:description" content="100% human-written SEO blogs and YouTube scripts that drive traffic and conversions." />
        <meta name="twitter:image" content="https://www.ashutoshwrites.online/profile.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
