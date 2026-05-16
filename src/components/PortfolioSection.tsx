import { ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

import aiFinanceImg from "@/assets/portfolio-ai-finance.jpg";
import salaryTrapImg from "@/assets/portfolio-tds-deducted.png";
import spendingYtImg from "@/assets/portfolio-dopamine.png";
import aiAuthenticityImg from "@/assets/portfolio-ai-authenticity.png";

const seoBlogs = [
  {
    title: "AI and Finance",
    description: "A long-form, data-driven blog: 18 verified stats, 5 trends, and the risks most AI-finance coverage misses entirely.",
    tag: "SEO Blog",
    image: aiFinanceImg,
    href: "/blog/ai-personal-finance-2026",
  },
  {
    title: "AI vs Human Creativity 2026",
    description: "A research-backed long-form analysis on the Authenticity Premium Economy — why audiences are rejecting AI slop and human creators are winning in 2026.",
    tag: "SEO Blog",
    image: aiAuthenticityImg,
    href: "/blog/human-creativity-vs-ai-authenticity-premium-2026",
  },
];

const ytScripts = [
  {
    title: "Why 90% of Salaried People Never Build Real Wealth",
    description: "An 8-minute long-form YouTube script for an Indian personal finance channel — structured for retention with pattern interrupts, humor beats, and a six-stage emotional arc.",
    tag: "YouTube Script",
    image: salaryTrapImg,
    href: "/scripts/salary-trap",
  },
  {
    title: "Why Your Brain Can't Stop Craving Things",
    description: "Long-form neuroscience script reframing dopamine as a prediction signal — built on Wolfram Schultz's monkey experiments and structured-boredom retraining.",
    tag: "YouTube Script",
    image: spendingYtImg,
    href: "/scripts/prediction-is-the-drug",
  },
];

const allProjects = [...seoBlogs, ...ytScripts];

type Project = (typeof allProjects)[0];

const PortfolioSection = () => {
  const renderCard = (p: Project, i: number, compact: boolean) => {
    const inner = (
      <>
      <div className="relative overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={800}
          height={512}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${compact ? "h-28" : "h-48"}`}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent text-accent-foreground rounded-full p-3 shadow-lg">
            <Play size={compact ? 14 : 18} fill="currentColor" />
          </span>
        </div>
        {!compact && (
          <span className="absolute top-3 left-3 text-[10px] font-bold text-accent-foreground bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
            {p.tag}
          </span>
        )}
      </div>

      <div className={compact ? "p-3" : "p-6"}>
        <h3 className={`font-bold text-foreground mb-2 tracking-tight ${compact ? "text-sm" : "text-base"}`}>
          {p.title}
          {p.tag.includes("Hindi") && (
            <span className="ml-2 text-[9px] font-semibold bg-accent/15 text-accent px-1.5 py-0.5 rounded-full uppercase align-middle">Hindi</span>
          )}
        </h3>
        {!compact && (
          <>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
            {"note" in p && (p as any).note && (
              <p className="text-xs text-muted-foreground/70 italic mb-3">{(p as any).note}</p>
            )}
          </>
        )}
        <span className={`inline-flex items-center gap-2 font-semibold text-accent group-hover:gap-3 transition-all duration-200 ${compact ? "text-xs" : "text-sm"}`}>
          View Project <ExternalLink size={compact ? 11 : 13} />
        </span>
      </div>
      </>
    );
    const className = `rounded-2xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 group cursor-pointer h-full block`;
    return <Link to={(p as any).href} className={className}>{inner}</Link>;
  };

  return (
    <>
      <section id="portfolio" className="py-28 bg-card/40">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Selected Work</h2>
          </ScrollReveal>

          {/* Mobile layout */}
          <div className="sm:hidden max-w-4xl mx-auto space-y-8">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">SEO Blogs</p>
              <div className="grid grid-cols-2 gap-3">
                {seoBlogs.map((p, i) => (
                  <ScrollReveal key={`${p.tag}-${p.title}`} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                    {renderCard(p, i, true)}
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">YouTube Scripts</p>
              <div className="grid grid-cols-2 gap-3">
                {ytScripts.map((p, i) => (
                  <ScrollReveal key={`${p.tag}-${p.title}`} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                    {renderCard(p, i, true)}
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {allProjects.map((p, i) => (
              <ScrollReveal
                key={`${p.tag}-${p.title}`}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
              >
                {renderCard(p, i, false)}
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground italic">
              We can also turn YouTube scripts into SEO blogs and vice versa — same story, optimized for each format.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
