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
  <section id="services" className="py-28 bg-card/40">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">What I Offer</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl bg-background border border-border/60 p-8 hover:shadow-xl hover:border-accent/20 transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <s.icon size={20} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-5 tracking-tight">{s.title}</h3>
            <ul className="space-y-2.5 mb-8">
              {s.points.map((p) => (
                <li key={p} className="text-sm text-muted-foreground flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={s.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-200"
            >
              {s.cta} <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
