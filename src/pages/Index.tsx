import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LatestBlogsSection from "@/components/LatestBlogsSection";
import seo from "@/data/seo-data.json";

const { home } = seo.routes;
const canonical = `${seo.siteUrl}${home.path}`;

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
          "@graph": [seo.person, seo.professionalService],
        })}
      </script>
    </Helmet>
    <Navbar />
    <HeroSection />
    <LatestBlogsSection />
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Suspense>
  </>
);

export default Index;
