import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Subtle background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="order-2 md:order-1"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Freelance Content Writer
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
          Top 0.1% SEO Blog &{" "}
          <span className="text-primary">YouTube Script</span> Writer
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mb-4">
          I help creators and brands get traffic from Google & YouTube through high-converting content.
        </p>

        <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-8">
          <Shield size={16} />
          All content is 100% human-written. No AI used.
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Portfolio <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Hire Me
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
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
          <img
            src={profileImg}
            alt="Ashutosh Mahapatra — SEO Blog and YouTube Script Writer"
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-background shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
