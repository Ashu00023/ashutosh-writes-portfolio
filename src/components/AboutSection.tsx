const highlights = [
  "Long-form content built around search intent, not word count",
  "Structured for featured snippets and AI-generated answers",
  "Original research, primary sources, and a clear point of view",
  "Editorial judgment and final decisions made by a human editor",
];

const AboutSection = () => (
  <section id="about" className="tempo-std border-t border-border">
    <div className="wrap grid grid-cols-12 gap-x-8">
      <h2 className="col-span-12 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] md:col-span-4">
        Research first. Writing second.
      </h2>

      <div className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
        <div className="reading space-y-6">
          <p>
            I am <span className="font-medium text-foreground">Ashutosh</span> — an independent writer focused
            on AI, fintech, cybersecurity and SaaS. Most online content is written to be skimmed. I write to be
            read.
          </p>
          <p>
            I specialize in long-form content where the difficult part is not filling a page — it is
            understanding the subject, finding reliable evidence, identifying what existing coverage misses, and
            turning that research into something people can actually understand.
          </p>
        </div>

        <ul className="mt-12 border-t border-border">
          {highlights.map((h) => (
            <li key={h} className="border-b border-border py-3.5 text-sm text-foreground">
              {h}
            </li>
          ))}
        </ul>

        <p className="folio mt-8 max-w-[56ch]">
          <span className="text-foreground">Disclosure.</span> I use AI where it improves research and workflow
          efficiency, but the argument, judgment, structure and final editorial decisions remain mine.
        </p>
      </div>
    </div>
  </section>
);

export default AboutSection;