import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import { workItems, nicheFilters, formatFilters, type WorkItem } from "@/data/work";
import { prefetchOne } from "@/lib/prefetch";
import seo from "@/data/seo-data.json";

const canonical = `${seo.siteUrl}/work`;

const pill = (active: boolean) =>
  `px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all duration-200 ${
    active
      ? "bg-foreground text-background border-foreground"
      : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
  }`;

const WorkCard = ({ item }: { item: WorkItem }) => (
  <article
    className="group flex flex-col rounded-xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
    onMouseEnter={() => prefetchOne(item.liveUrl)}
    onTouchStart={() => prefetchOne(item.liveUrl)}
  >
    <div className="relative overflow-hidden bg-muted aspect-[16/9] flex items-center justify-center">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-1 p-6">
      <span className="self-start text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-4">
        {item.niche}
      </span>
      <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{item.summary}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={item.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
        >
          View Live Article <ArrowUpRight size={15} />
        </a>
        <Link
          to={item.transcriptHref}
          className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <FileText size={14} /> Read Clean Transcript
        </Link>
      </div>
      <p className="mt-5 pt-4 border-t border-border/60 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
        {item.format} · {item.stat}
      </p>
    </div>
  </article>
);

const Work = () => {
  const [niche, setNiche] = useState("All");
  const [format, setFormat] = useState("All formats");

  const filtered = useMemo(
    () =>
      workItems.filter(
        (w) =>
          (niche === "All" || w.category === niche) &&
          (format === "All formats" || w.format === format)
      ),
    [niche, format]
  );

  return (
    <>
      <Helmet>
        <title>Selected Work — SEO Blog Case Studies | Ashutosh Mahapatra</title>
        <meta
          name="description"
          content="Selected SEO blog case studies across AI, cybersecurity, fintech, and the creator economy — each engineered for ranking, retention, and revenue."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Selected Work — SEO Blog Case Studies" />
        <meta
          property="og:description"
          content="Selected SEO blog case studies across AI, cybersecurity, fintech, and the creator economy."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-28">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
              Portfolio
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
              Selected <span className="font-display italic text-accent font-normal">Work</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
              Every piece here started with search intent and primary research — then got written by
              hand, line by line.
            </p>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto mb-10 space-y-3">
            <div className="flex flex-wrap gap-2.5">
              {nicheFilters.map((n) => (
                <button key={n} type="button" onClick={() => setNiche(n)} className={pill(niche === n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {formatFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={pill(format === f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.1}>
                <WorkCard item={item} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground mt-10">
              Nothing in this combination yet.
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Work;
