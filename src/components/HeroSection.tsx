import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="order-2 md:order-1"
      >
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          SEO Blogs &middot; YouTube Scripts
        </p>

        <h1 className="text-[3rem] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[5.25rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-foreground mb-8">
          Long-form content that <span className="font-display italic font-normal tracking-[-0.02em] text-accent">earns</span> attention &mdash;{" "}
          <span className="accent-underline">not chases it.</span>
        </h1>

        <p className="text-[15px] md:text-base text-muted-foreground max-w-md mb-6 leading-relaxed">
          I write deeply researched SEO blogs and YouTube scripts for founders, creators, and brands who want readers to finish the article and viewers to stay till the end.
        </p>

        <p className="text-xs font-medium tracking-[0.14em] uppercase text-muted-foreground/80 border-l border-border pl-4 mb-10">
          Human-Written <span className="text-border mx-1.5">/</span> Research-Led
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-7 py-3 text-sm font-semibold text-background hover:opacity-90 transition-all duration-200"
          >
            View Portfolio <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-7 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent transition-all duration-200"
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
          <div className="relative p-1 rounded-2xl border border-border bg-card">
            <img
              src={profileImg}
              alt="Ashutosh Mahapatra — SEO Blog and YouTube Script Writer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-60 h-60 md:w-72 md:h-72 rounded-xl object-cover"
            />
          </div>
          <div className="mt-5 text-center relative">
            <h2 className="text-base font-bold text-foreground tracking-tight">Ashutosh Mahapatra</h2>
            <p className="text-[11px] text-muted-foreground mt-1 tracking-[0.18em] uppercase">Freelance Writer · Bhubaneswar, IN</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
