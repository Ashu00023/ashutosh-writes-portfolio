import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { workItems } from "@/data/work";

const anchorPiece = workItems[0];

const ctaStyles = {
  primary: "bg-foreground text-background hover:bg-accent",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
};

const CtaLink = ({ href, children, variant }: { href: string; children: ReactNode; variant: "primary" | "secondary" }) => (
  
    href={href}
    className={`inline-flex items-center rounded-md px-6 py-3 text-sm font-medium transition-colors duration-200 ${ctaStyles[variant]}`}
  >
    {children}
  </a>
);

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16">
    <div className="container mx-auto px-6 grid md:grid-cols-[1.3fr_1fr] gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-sm text-muted-foreground mb-5">
          Ashutosh Mahapatra — Bhubaneswar, India
        </p>

        <h1 className="font-heading text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] font-medium leading-[1.05] tracking-[-0.02em] text-foreground mb-7 max-w-xl">
          Research-driven content for AI, fintech, and SaaS.
        </h1>

        <p className="text-base text-muted-foreground max-w-md mb-10 leading-relaxed">
          I turn complex industry topics into authoritative long-form content built around search intent, primary research, and editorial judgment — not word count.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <CtaLink href="#portfolio" variant="primary">View Portfolio</CtaLink>
          <CtaLink href="#contact" variant="secondary">Start a Project</CtaLink>
        </div>

        <div className="border-l-2 border-accent/40 pl-5 max-w-md">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5">
            Anchor piece
          </p>
          
            href={anchorPiece.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-lg text-foreground hover:text-accent transition-colors"
          >
            {anchorPiece.title}
          </a>
          <p className="text-sm text-muted-foreground mt-1.5">{anchorPiece.approach}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="flex justify-center md:justify-end"
      >
        <div className="text-center">
          <img
            src="/profile.webp"
            alt="Ashutosh Mahapatra — SEO Blog Writer"
            width={272}
            height={272}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-56 h-56 md:w-64 md:h-64 rounded-lg object-cover border border-border"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Freelance writer — AI, fintech &amp; cybersecurity
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;