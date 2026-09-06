import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    title: "Brief & Research",
    description:
      "Understand the audience, gather primary sources, verify every stat before writing a word",
  },
  {
    title: "Outline & SEO Mapping",
    description:
      "Structure built around search intent and featured-snippet formatting, not word count targets",
  },
  {
    title: "Draft",
    description: "Written by hand, sentence by sentence — no AI-generated drafts",
  },
  {
    title: "Structural Edit",
    description: "Cut anything that doesn't earn its place; check argument flow and pacing",
  },
  {
    title: "Delivery & Handoff",
    description: "Clean formatting, source list, and a short rationale note on key decisions",
  },
];

const ProcessSection = () => (
  <section id="process" className="py-28">
    <div className="container mx-auto px-6">
      <ScrollReveal className="text-center mb-16">
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Process</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
          How a piece actually gets{" "}
          <span className="font-display italic text-accent font-normal">made</span>
        </h2>
      </ScrollReveal>

      {/* Desktop timeline */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="grid grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.title} direction="up" delay={i * 0.1}>
              <div className="relative pt-8">
                <span className="absolute top-0 left-0 right-0 border-t border-border/60" />
                <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-foreground tracking-tight mb-2">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="md:hidden max-w-md mx-auto border-l border-border/60 pl-6 space-y-8">
        {steps.map((s, i) => (
          <ScrollReveal key={s.title} direction="up" delay={i * 0.1}>
            <div>
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mb-3">
                {i + 1}
              </div>
              <h3 className="text-sm font-bold text-foreground tracking-tight mb-2">{s.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
