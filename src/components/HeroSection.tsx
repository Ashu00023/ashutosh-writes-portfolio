import CitedExcerpt from "@/components/CitedExcerpt";

const HeroSection = () => (
  <section id="home" className="pt-32 pb-16 md:pt-44 md:pb-24">
    <div className="wrap">
      <div className="mb-10 flex items-center gap-4 md:mb-16">
        <img
          src="/profile.webp"
          alt="Ashutosh Mahapatra — SEO Blog Writer"
          width={56}
          height={56}
          loading="eager"
          decoding="async"
          className="h-14 w-14 object-cover"
        />
        <p className="folio">
          <span className="text-foreground">Ashutosh Mahapatra</span>
          <br />
          Freelance writer — AI, fintech &amp; cybersecurity · Bhubaneswar, India
        </p>
      </div>

      <div className="grid grid-cols-12 gap-x-8">
        <h1 className="col-span-12 text-[clamp(2.75rem,8.5vw,6.25rem)] font-normal leading-[0.98] tracking-[-0.03em] text-foreground md:col-span-11">
          Research-driven content for AI, fintech, and SaaS.
        </h1>

        <div className="col-span-12 mt-10 md:col-span-6 md:mt-14">
          <p className="reading text-muted-foreground">
            I turn complex industry topics into authoritative long-form content built around search intent,
            primary research, and editorial judgment — not word count.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors duration-120 ease-cross hover:bg-foreground"
            >
              View Portfolio
            </a>
            <a href="#contact" className="link-seal">
              Start a Project
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <CitedExcerpt />
      </div>
    </div>
  </section>
);

export default HeroSection;