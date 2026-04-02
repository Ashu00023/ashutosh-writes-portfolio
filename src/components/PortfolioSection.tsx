import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import aiFinanceImg from "@/assets/portfolio-ai-finance.jpg";
import spendingPsychImg from "@/assets/portfolio-spending-psychology.jpg";
import salaryTrapImg from "@/assets/portfolio-salary-trap.jpg";
import spendingYtImg from "@/assets/portfolio-spending-yt.jpg";

const projects = [
  {
    title: "AI and Finance",
    description: "A long-form, keyword-optimized blog post exploring the intersection of artificial intelligence and finance, ranked on page 1 for competitive SaaS keywords.",
    tag: "SEO Blog",
    image: aiFinanceImg,
    embedUrl: "https://drive.google.com/file/d/17YuXGbKU2Qt_yFVn0owwCl-_t0vxL1mb/preview",
  },
  {
    title: "Spending Psychology",
    description: "Comprehensive SEO blog on spending psychology driving organic visits. Also available as a YouTube script version below.",
    tag: "SEO Blog",
    note: "Also the SEO Blog version of YouTube Script: Spending Psychology",
    image: spendingPsychImg,
    embedUrl: "https://drive.google.com/file/d/1dDUPzY4ClwXu9mbaWv8mWZC7qUK234hd/preview",
  },
  {
    title: "Salary and its Trap",
    description: "A high-retention Hindi YouTube script uncovering the psychology behind salary traps, achieving 85%+ average view duration.",
    tag: "YouTube Script · Hindi",
    image: salaryTrapImg,
    embedUrl: "https://drive.google.com/file/d/1DCUYZ1f7YmBFM4tukg7QPwdF5_tJjpvy/preview",
  },
  {
    title: "Spending Psychology",
    description: "Storytelling-driven YouTube script on spending psychology that boosted subscriber conversions.",
    tag: "YouTube Script",
    image: spendingYtImg,
    embedUrl: "https://drive.google.com/file/d/10omV5-yKjRZkUbAhGC_on6_6fdqEvBMs/preview",
  },
];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <>
      <section id="portfolio" className="py-28 bg-card/40">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Selected Work</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.map((p, i) => (
              <motion.div
                key={`${p.tag}-${p.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveProject(p)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={512}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent text-accent-foreground rounded-full p-3 shadow-lg">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-accent-foreground bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
                  {p.note && (
                    <p className="text-xs text-muted-foreground/70 italic mb-3">{p.note}</p>
                  )}
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-200">
                    View Project <ExternalLink size={13} />
                  </button>
                </div>
              </motion.div>
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
