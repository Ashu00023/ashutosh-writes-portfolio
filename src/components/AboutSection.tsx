import { CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Long-form content built around search intent, not word count",
  "Structured for featured snippets and AI-generated answers",
  "Original research, primary sources, and a clear point of view",
  "Editorial judgment and final decisions made by a human editor",
];

const stats: { value: string; label: string }[] = [
  // Add only verified figures supplied by Ashutosh:
  // { value: "[NEEDS REAL NUMBER]", label: "[NEEDS REAL LABEL]" },
];

const AboutSection = () => (
  <section id="about" className="py-28">
    <div className="container mx-auto px-6 max-w-3xl">
      <ScrollReveal>
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight leading-[1.15]">
          Research first. Writing second.
        </h2>
      </ScrollReveal>

      {stats.length > 0 && (
        <ScrollReveal delay={0.08}>
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {stats.map((stat) => (
              <div key={stat.label} className="sm:flex-1">
                <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground leading-relaxed mb-5">
          I am <span className="font-bold text-foreground">Ashutosh</span> — an independent writer focused on AI, fintech, cybersecurity and SaaS. Most online content is written to be skimmed. I write to be <span className="font-semibold text-foreground">read</span>.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-5">
          I specialize in long-form content where the difficult part is not filling a page — it is understanding the subject, finding reliable evidence, identifying what existing coverage misses, and turning that research into something people can actually understand.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          I use AI where it improves research and workflow efficiency, but the argument, judgment, structure and final editorial decisions remain mine.
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
