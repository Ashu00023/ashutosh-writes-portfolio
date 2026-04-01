import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "SEO Blog: SaaS Growth Strategy",
    description: "A long-form, keyword-optimized blog post that ranked on page 1 for competitive SaaS keywords.",
    tag: "SEO Blog",
  },
  {
    title: "SEO Blog: E-commerce SEO Guide",
    description: "Comprehensive guide driving 10K+ monthly organic visits for an e-commerce brand.",
    tag: "SEO Blog",
  },
  {
    title: "YouTube Script: Tech Explainer",
    description: "A high-retention script for a tech channel, achieving 85%+ average view duration.",
    tag: "YouTube Script",
  },
  {
    title: "YouTube Script: Brand Story",
    description: "Storytelling-driven brand narrative script that boosted subscriber conversions.",
    tag: "YouTube Script",
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-24 bg-muted/50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Portfolio</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected Work</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl bg-background border border-border overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">{p.tag}</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                View Project <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
