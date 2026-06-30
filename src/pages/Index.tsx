import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => (
  <>
    <Helmet>
      <title>Ashutosh Mahapatra — SEO Blog & YouTube Script Writer</title>
      <meta name="description" content="Hire Ashutosh Mahapatra — SEO blog and YouTube script writer specializing in finance and AI. 100% human-written content built to rank on Google and retain on YouTube." />
      <link rel="canonical" href="https://ashutoshwrites.online/" />
      <meta property="og:title" content="Ashutosh Mahapatra — SEO Blog & YouTube Script Writer" />
      <meta property="og:description" content="Hire Ashutosh Mahapatra — SEO blog and YouTube script writer specializing in finance and AI. 100% human-written content built to rank on Google and retain on YouTube." />
      <meta property="og:url" content="https://ashutoshwrites.online/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://ashutoshwrites.online/og-cover.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ashutosh Mahapatra — SEO Blog & YouTube Script Writer" />
      <meta name="twitter:description" content="Hire Ashutosh Mahapatra — SEO blog and YouTube script writer specializing in finance and AI. 100% human-written content built to rank on Google and retain on YouTube." />
      <meta name="twitter:image" content="https://ashutoshwrites.online/og-cover.jpg" />
    </Helmet>
    <Navbar />
    <HeroSection />
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Suspense>
  </>
);

export default Index;
