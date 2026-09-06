import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

type Pillar = {
  name: string;
  sub: string;
  specifics: string[];
  fill: string;
};

const pillars: Pillar[] = [
  {
    name: "Research",
    sub: "primary sources, verified data, no AI-hallucinated stats",
    specifics: ["18 verified stats per authority piece", "Primary sources over aggregator lists", "Every claim traceable to a report or CVE"],
    fill: "bg-accent/5",
  },
  {
    name: "SEO Strategy",
    sub: "search intent, structure, featured-snippet ready",
    specifics: ["Question-based headings mapped to real queries", "Answer blocks sized for featured snippets", "Internal-link architecture planned up front"],
    fill: "bg-foreground/5",
  },
  {
    name: "Craft",
    sub: "sentence-level writing, narrative pacing, editing by hand",
    specifics: ["Line-by-line editing passes", "Narrative pacing that holds past 2,000 words", "Zero spun or AI-generated copy"],
    fill: "bg-muted",
  },
];

const ConvergenceSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Approach</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
            Where rankings meet <span className="font-display italic text-accent font-normal">retention</span>
          </h2>
        </ScrollReveal>

        {/* Desktop: Venn diagram */}
        <div className="relative mx-auto hidden md:block h-[380px] w-[480px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] z-10 pointer-events-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Every piece I ship
            </span>
          </div>
          {pillars.map((p, i) => {
            const positions = [
              "left-1/2 top-0 -translate-x-1/2",
              "left-0 bottom-0",
              "right-0 bottom-0",
            ];
            return (
              <motion.button
                key={p.name}
                type="button"
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                onClick={() => setActive(i)}
                animate={{ scale: active === i ? 1.05 : 1 }}
                transition={{ duration: 0.25 }}
                className={`absolute h-[220px] w-[220px] rounded-full border border-border/60 ${p.fill} ${positions[i]} flex items-center justify-center mix-blend-multiply cursor-pointer`}
              >
                <span className="text-sm font-bold text-foreground tracking-tight mix-blend-normal px-6 text-center">
                  {p.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Desktop caption */}
        <div className="hidden md:block max-w-md mx-auto text-center min-h-[64px] mt-8">
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold text-accent uppercase tracking-[0.18em] mb-2">
                  {pillars[active].name}
                </p>
                <ul className="space-y-1">
                  {pillars[active].specifics.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground">{s}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: stacked cards */}
        <div className="grid gap-6 md:hidden">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.name} direction="up" delay={i * 0.1}>
              <div className="rounded-xl bg-card border border-border/60 p-6">
                <h3 className="text-base font-bold text-foreground tracking-tight mb-1">{p.name}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent mb-3">{p.sub}</p>
                <ul className="space-y-1.5">
                  {p.specifics.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground">{s}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConvergenceSection;
