import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
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
          <Sparkles size={12} />
          Freelance Content Writer
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-6">
          Top 0.1% SEO Blog &{" "}
          <span className="text-accent">YouTube Script</span> Writer
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-4 leading-relaxed">
          I am Ashutosh (ashutoshw), helping creators and brands get traffic from Google & YouTube through high-converting content.
        </p>

        <div className="inline-flex items-center gap-2 text-sm font-medium text-accent/80 mb-10">
          <Shield size={14} />
          All content is 100% human-written. No AI used.
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground hover:bg-muted/60 transition-all duration-200"
          >
            Hire Me
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-all duration-200 shadow-sm"
          >
            Fill Contact Form <ArrowRight size={15} />
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
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent/10 to-accent/5 blur-3xl" />
          <img
            src={profileImg}
            alt="Ashutosh Mahapatra — Freelance SEO Blog Writer & YouTube Script Writer"
            className="relative w-60 h-60 md:w-72 md:h-72 rounded-full object-cover ring-1 ring-border shadow-2xl"
          />
          <h2 className="mt-5 text-lg font-bold text-foreground relative tracking-tight">Ashutosh Mahapatra</h2>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
