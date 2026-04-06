import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ScrollReveal from "./ScrollReveal";

import aiFinanceImg from "@/assets/portfolio-ai-finance.jpg";
import spendingPsychImg from "@/assets/portfolio-spending-psychology.jpg";
import salaryTrapImg from "@/assets/portfolio-salary-trap.jpg";
import spendingYtImg from "@/assets/portfolio-spending-yt.jpg";

const seoBlogs = [
  {
    title: "AI and Finance",
    description: "A long-form, keyword-optimized blog post exploring the intersection of artificial intelligence and finance, ranked on page 1 for competitive SaaS keywords.",
    tag: "SEO Blog",
    image: aiFinanceImg,
    embedUrl: "https://drive.google.com/file/d/1TBhZ-AC6YgITO7_V0XAqCueOreMdxLWC/preview",
  },
  {
    title: "Spending Psychology",
    description: "Comprehensive SEO blog on spending psychology driving organic visits. Also available as a YouTube script version below.",
    tag: "SEO Blog",
    note: "Also the SEO Blog version of YouTube Script: Spending Psychology",
    image: spendingPsychImg,
    embedUrl: "https://drive.google.com/file/d/1DwGNoNbyV4f6asn-lEBDgOxOYhphsXH5/preview",
  },
];

const ytScripts = [
  {
    title: "Salary and its Trap",
    description: "A high-retention Hindi YouTube script uncovering the psychology behind salary traps, achieving 85%+ average view duration.",
    tag: "YouTube Script · Hindi",
    image: salaryTrapImg,
    embedUrl: "https://drive.google.com/file/d/1DwGNoNbyV4f6asn-lEBDgOxOYhphsXH5/preview",
  },
  {
    title: "Spending Psychology",
    description: "Storytelling-driven YouTube script on spending psychology that boosted subscriber conversions.",
    tag: "YouTube Script",
    image: spendingYtImg,
    embedUrl: "https://drive.google.com/file/d/16euJ5_o8zrkSfToHZA7VagzOKMc6iOO6/preview",
  },
];

const allProjects = [...seoBlogs, ...ytScripts];

type Project = (typeof allProjects)[0];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const renderCard = (p: Project, i: number, compact: boolean) => (
    <div
      className={`rounded-2xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 group cursor-pointer h-full`}
      onClick={() => setActiveProject(p)}
    >
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
        <span className={`absolute top-3 left-3 font-bold text-accent-foreground bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider ${compact ? "text-[8px] px-2" : "text-[10px]"}`}>
          {p.tag}
        </span>
      </div>

      <div className={compact ? "p-3" : "p-6"}>
        <h3 className={`font-bold text-foreground mb-2 tracking-tight ${compact ? "text-sm" : "text-base"}`}>{p.title}</h3>
        {!compact && (
          <>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
            {"note" in p && p.note && (
              <p className="text-xs text-muted-foreground/70 italic mb-3">{p.note}</p>
            )}
          </>
        )}
        <button className={`inline-flex items-center gap-2 font-semibold text-accent group-hover:gap-3 transition-all duration-200 ${compact ? "text-xs" : "text-sm"}`}>
          View Project <ExternalLink size={compact ? 11 : 13} />
        </button>
      </div>
    </div>
  );

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
        </div>
      </section>

      <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0">
          <DialogHeader className="p-4 pb-2 border-b border-border">
            <DialogTitle className="text-lg font-bold tracking-tight">
              {activeProject?.title}
              {activeProject?.tag && (
                <span className="ml-3 text-[10px] font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                  {activeProject.tag}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 p-0">
            {activeProject && (
              <iframe
                src={activeProject.embedUrl}
                className="w-full h-full border-0"
                style={{ height: "calc(85vh - 60px)" }}
                allow="autoplay"
                title={activeProject.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioSection;
