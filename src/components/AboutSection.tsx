const highlights = [
  "Long-form content built around search intent, not word count",
  "Structured for featured snippets and AI-generated answers",
  "Original research, primary sources, and a clear point of view",
  "Editorial judgment and final decisions made by a human editor",
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-6 max-w-2xl">
      <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-8">
        Research first. Writing second.
      </h2>

      <div className="space-y-5 text-muted-foreground leading-relaxed mb-10">
        <p>
          I am <span className="text-foreground font-medium">Ashutosh</span> — an independent writer focused on AI, fintech, cybersecurity and SaaS. Most online content is written to be skimmed. I write to be read.
        </p>
        <p>
          I specialize in long-form content where the difficult part is not filling a page — it is understanding the subject, finding reliable evidence, identifying what existing coverage misses, and turning that research into something people can actually understand.
        </p>
        <p>
          I use AI where it improves research and workflow efficiency, but the argument, judgment, structure and final editorial decisions remain mine.
        </p>
      </div>

      <ul className="border-t border-border/60 pt-6 space-y-3">
        {highlights.map((h) => (
          <li key={h} className="text-sm text-foreground pl-4 border-l border-accent/50">
            {h}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default AboutSection;