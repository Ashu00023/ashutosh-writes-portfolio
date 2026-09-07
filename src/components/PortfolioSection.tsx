import { useEffect } from "react";
import { ArrowUpRight, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { prefetchSamples, prefetchOne } from "@/lib/prefetch";
import { workItems, type WorkItem } from "@/data/work";

const featured = workItems.slice(0, 3);

const BlogCard = ({ b }: { b: WorkItem }) => (
  <article
    className="group flex flex-col rounded-xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
    onMouseEnter={() => prefetchOne(b.liveUrl)}
    onTouchStart={() => prefetchOne(b.liveUrl)}
  >
    <div className="relative overflow-hidden bg-muted aspect-[16/9] flex items-center justify-center">
      <img
        src={b.image}
        alt={b.title}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-1 p-6">
      <span className="self-start text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-4">
        {b.niche}
      </span>
      <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-3">
        {b.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
        {b.summary}
      </p>
      <div className="flex flex-wrap gap-3 mt-auto">
       <a 
          href={b.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200"
        >
          View Live Article <ArrowUpRight size={15} />
        </a>
        <Link
          to={b.transcriptHref}
          className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <FileText size={14} /> Read Clean Transcript
        </Link>
      </div>
    </div>
  </article>
);

const PortfolioSection = () => {
  useEffect(() => {
    prefetchSamples();
  }, []);
  return (
    <section id="portfolio" className="py-28 bg-card/40">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
            Featured <span className="font-display italic text-accent font-normal">Writing Samples</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Self-directed samples across AI, fintech, and creator-economy topics — researched, structured, and written exactly as I’d deliver for a client, engineered for ranking, retention, and revenue.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featured.map((b, i) => (
            <ScrollReveal key={b.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
              <BlogCard b={b} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors duration-200"
          >
            View all work <ArrowRight size={15} />
          </Link>
        </ScrollReveal>

        <ScrollReveal className="text-center mt-8 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground italic">
            Every piece starts with search intent and primary research - then gets written by hand, line by line.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
