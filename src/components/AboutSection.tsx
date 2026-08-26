import { CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Long-form SEO blogs built around search intent, not word count",
  "Structured for featured snippets, AI answers, and page-one rankings",
  "Original research, primary sources, and a clear point of view",
  "Every line written by hand — no AI drafts, no spun copy",
];

const AboutSection = () => (
  <section id="about" className="py-28">
    <div className="container mx-auto px-6 max-w-3xl">
      <ScrollReveal>
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight leading-[1.15]">
          I write the kind of content<br />
          <span className="font-display italic text-accent font-normal">people actually finish.</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground leading-relaxed mb-5">
          I am <span className="font-bold text-foreground">Ashutosh</span> — a freelance writer working with founders, creators, and brands who care more about the reader than the algorithm. Most online content is written to be skimmed. I write to be <span className="font-semibold text-foreground">read</span>.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          My process is slow on purpose: real research, primary sources, a clear argument, and language that respects the reader&rsquo;s time. The result is work that ranks on Google, holds attention to the last line, and sounds like a person &mdash; <span className="font-semibold text-accent">because a person wrote it</span>.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Where it helps, I use AI for structural research and SEO — but every argument, transition, and final line is still written by hand.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-3">
        {highlights.map((h, i) => (
          <ScrollReveal key={h} direction={i % 2 === 0 ? "left" : "right"} delay={0.1 + i * 0.08}>
            <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
              <CheckCircle size={18} className="text-accent mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{h}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
