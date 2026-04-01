import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import aiFinanceImg from "@/assets/portfolio-ai-finance.jpg";
import spendingPsychImg from "@/assets/portfolio-spending-psychology.jpg";
import salaryTrapImg from "@/assets/portfolio-salary-trap.jpg";
import spendingYtImg from "@/assets/portfolio-spending-yt.jpg";

const projects = [
  {
    title: "AI and Finance",
    description:
      "A long-form, keyword-optimized blog post exploring the intersection of artificial intelligence and finance, ranked on page 1 for competitive SaaS keywords.",
    tag: "SEO Blog",
    image: aiFinanceImg,
    embedUrl:
      "https://drive.google.com/file/d/17YuXGbKU2Qt_yFVn0owwCl-_t0vxL1mb/preview",
  },
  {
    title: "Spending Psychology",
    description:
      "Comprehensive SEO blog on spending psychology driving organic visits. Also available as a YouTube script version below.",
    tag: "SEO Blog",
    note: "Also the SEO Blog version of YouTube Script: Spending Psychology",
    image: spendingPsychImg,
    embedUrl:
      "https://drive.google.com/file/d/1dDUPzY4ClwXu9mbaWv8mWZC7qUK234hd/preview",
  },
  {
    title: "Salary and its Trap",
    description:
      "A high-retention Hindi YouTube script uncovering the psychology behind salary traps, achieving 85%+ average view duration.",
    tag: "YouTube Script · Hindi",
    image: salaryTrapImg,
    embedUrl:
      "https://drive.google.com/file/d/1DCUYZ1f7YmBFM4tukg7QPwdF5_tJjpvy/preview",
  },
  {
    title: "Spending Psychology",
    description:
      "Storytelling-driven YouTube script on spending psychology that boosted subscriber conversions.",
    tag: "YouTube Script",
    image: spendingYtImg,
    embedUrl:
      "https://drive.google.com/file/d/10omV5-yKjRZkUbAhGC_on6_6fdqEvBMs/preview",
  },
];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <>
      <section id="portfolio" className="py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Selected Work
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((p, i) => (
              <motion.div
                key={`${p.tag}-${p.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-background border border-border overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                onClick={() => setActiveProject(p)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={512}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground rounded-full p-3">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 text-xs font-bold text-primary-foreground bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{p.description}</p>
                  {p.note && (
                    <p className="text-xs text-accent-foreground/70 italic mb-3">
                      {p.note}
                    </p>
                  )}
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    View Project <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In-site PDF Viewer Dialog */}
      <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0">
          <DialogHeader className="p-4 pb-2 border-b border-border">
            <DialogTitle className="text-lg font-bold">
              {activeProject?.title}
              {activeProject?.tag && (
                <span className="ml-3 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
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
