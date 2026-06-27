import { motion } from "framer-motion";
import { ArrowRight, PenLine, Shield } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background accents */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="order-2 md:order-1"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent mb-8"
        >
          <PenLine size={12} />
          SEO Blogs &middot; YouTube Scripts
        </motion.div>

        <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground mb-6">
          Long-form content that <span className="font-display italic text-accent">earns</span> attention &mdash;{" "}
          <span className="accent-underline">not chases it.</span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-4 leading-relaxed">
          I write deeply researched SEO blogs and YouTube scripts for founders, creators, and brands who want readers to finish the article and viewers to stay till the end.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
            <Shield size={12} /> Human-Written
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/80 bg-muted/60 border border-border/60 px-3 py-1.5 rounded-full">
            Research-Led
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background hover:opacity-90 transition-all duration-200 shadow-sm"
          >
            View Portfolio <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all duration-200 shadow-sm"
          >
            Hire Me <ArrowRight size={15} />
          </a>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="order-1 md:order-2 flex justify-center"
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent blur-3xl" />
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-accent/40 via-border to-accent/20">
            <img
              src={profileImg}
              alt="Ashutosh Mahapatra — SEO Blog and YouTube Script Writer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-60 h-60 md:w-72 md:h-72 rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="mt-5 text-center relative">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Ashutosh Mahapatra</h2>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">Freelance Writer · Bhubaneswar, IN</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
