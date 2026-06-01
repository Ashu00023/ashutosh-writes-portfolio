import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const highlights = [
  "Specializing in high-performance SEO blog writing",
  "YouTube script writing optimized for retention & virality",
  "Deep keyword research & strategic content planning",
  "Quality over quantity — top 0.1% content positioning",
];

const AboutSection = () => (
  <section id="about" className="py-28">
    <div className="container mx-auto px-6 max-w-3xl">
      <ScrollReveal>
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight leading-[1.15]">
          Crafting Content That<br />
          <span className="font-display italic text-accent font-normal">Ranks &amp; Converts</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-muted-foreground leading-relaxed mb-5">
          I am <span className="font-bold text-foreground">Ashutosh</span>, a freelance content writer who helps creators and businesses generate real traffic from Google and YouTube. My approach combines deep research, strategic keyword targeting, and compelling storytelling to produce content that not only ranks but also converts readers into loyal audiences.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Every piece of content is crafted manually with deep research and strategic intent — <span className="font-semibold text-accent">no AI shortcuts</span>. I believe in quality over quantity, delivering work that positions my clients in the top 0.1%.
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
