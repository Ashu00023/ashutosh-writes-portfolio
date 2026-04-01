import { motion } from "framer-motion";
import { PenLine, Youtube, ArrowRight } from "lucide-react";

const services = [
  {
    icon: PenLine,
    title: "SEO Blog Writing",
    points: [
      "High-quality, keyword-optimized blog posts",
      "Designed to rank on Google page 1",
      "100% human-written content",
      "Focus on traffic + conversions",
    ],
    cta: "Get SEO Blogs",
    href: "#contact",
  },
  {
    icon: Youtube,
    title: "YouTube Script Writing",
    points: [
      "High-retention, engaging scripts",
      "Optimized for watch time and virality",
      "Storytelling-driven structure",
      "100% human-written scripts",
    ],
    cta: "Get Scripts",
    href: "#contact",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-muted/50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">What I Offer</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl bg-background border border-border p-8 hover:shadow-lg transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <s.icon size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">{s.title}</h3>
            <ul className="space-y-2 mb-8">
              {s.points.map((p) => (
                <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={s.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all"
            >
              {s.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
