const steps = [
  { title: "Brief & Audience", description: "Understand the business, reader, search intent and desired outcome" },
  { title: "Research & Verification", description: "Gather primary sources and verify important claims before drafting" },
  { title: "Search & Editorial Architecture", description: "Build the article around search intent, information hierarchy and the strongest original angle" },
  { title: "Writing & Refinement", description: "Write, edit, tighten and test the argument for clarity and flow" },
  { title: "Delivery & Handoff", description: "Deliver the finished article, source list, SEO structure and useful implementation notes" },
];

const ProcessSection = () => (
  <section id="process" className="py-24 bg-card/40">
    <div className="container mx-auto px-6 max-w-5xl">
      <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-14">
        How a piece actually gets made
      </h2>

      <ol className="grid md:grid-cols-5 gap-8 md:gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="border-t-2 border-foreground/80 pt-4">
            <span className="font-heading text-2xl text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-sm font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;