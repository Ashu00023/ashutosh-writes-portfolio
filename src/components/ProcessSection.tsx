const steps = [
  { title: "Brief & Audience", description: "Understand the business, reader, search intent and desired outcome" },
  { title: "Research & Verification", description: "Gather primary sources and verify important claims before drafting" },
  { title: "Search & Editorial Architecture", description: "Build the article around search intent, information hierarchy and the strongest original angle" },
  { title: "Writing & Refinement", description: "Write, edit, tighten and test the argument for clarity and flow" },
  { title: "Delivery & Handoff", description: "Deliver the finished article, source list, SEO structure and useful implementation notes" },
];

const pillars = [
  { name: "Research", text: "Primary-source research, evidence checking, source traceability and original synthesis." },
  { name: "Search strategy", text: "Search intent, content gaps, topical structure and pages designed to answer real questions." },
  { name: "Editorial craft", text: "Clear arguments, strong pacing, precise language and rigorous editing." },
];

const ProcessSection = () => (
  <section id="process" className="tempo-std border-t border-border">
    <div className="wrap grid grid-cols-12 gap-x-8">
      <div className="col-span-12 md:col-span-4">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em]">
          How a piece actually gets made
        </h2>
        <p className="reading mt-6 text-[1.0625rem] text-muted-foreground">
          AI can accelerate research and SEO workflows. Human judgment decides what is true, useful and worth
          publishing.
        </p>
      </div>

      <div className="col-span-12 mt-12 md:col-span-8 md:mt-0">
        <ol className="border-t border-border">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-b border-border py-6 md:grid-cols-[3.5rem_1fr_1.3fr] md:py-7"
            >
              <span className="folio pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-normal leading-snug text-foreground">{s.title}</h3>
              <p className="col-start-2 text-sm leading-relaxed text-muted-foreground md:col-start-3">
                {s.description}
              </p>
            </li>
          ))}
        </ol>

        <dl className="mt-14 grid gap-8 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.name}>
              <dt className="folio text-foreground">{p.name}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default ProcessSection;