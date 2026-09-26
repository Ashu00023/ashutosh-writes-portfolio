import { useEffect } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { prefetchSamples, prefetchOne } from "@/lib/prefetch";
import { workItems, type WorkItem } from "@/data/work";

const featured = workItems.slice(0, 4);

const isSpaRoute = (href: string) => href.startsWith("/blog/");

const BlogCard = ({ b }: { b: WorkItem }) => (
  <article
    className="group flex flex-col border-b border-border/60 pb-10"
    onMouseEnter={() => prefetchOne(b.liveUrl)}
    onTouchStart={() => prefetchOne(b.liveUrl)}
  >
    <div className="grid sm:grid-cols-[1fr_1.4fr] gap-6 items-start">
      <div className="overflow-hidden bg-muted aspect-[16/10]">
        <img
          src={b.image}
          alt={b.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">{b.niche} — Independent research sample</p>
        <h3 className="font-heading text-xl text-foreground leading-snug mb-3">{b.title}</h3>

        <div className="space-y-2.5 mb-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Problem: </span>{b.problem}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Approach: </span>{b.approach}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Demonstrates: </span>{b.demonstrates}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          
            href={b.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            View live article <ArrowUpRight size={14} />
          </a>
          {isSpaRoute(b.transcriptHref) ? (
            <Link
              to={b.transcriptHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              <FileText size={14} /> Read clean transcript
            </Link>
          ) : (
            
              href={b.transcriptHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              <FileText size={14} /> Read clean transcript
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

const PortfolioSection = () => {
  useEffect(() => {
    prefetchSamples();
  }, []);
  return (
    <section id="portfolio" className="py-24 bg-card/40">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-4">
            Featured writing samples
          </h2>
          <p className="text-base text-muted-foreground max-w-xl">
            Independent research samples across AI, fintech, cybersecurity and technology — researched, structured and written exactly as I would deliver for a client.
          </p>
        </div>

        <div className="space-y-10">
          {featured.map((b) => (
            <BlogCard key={b.title} b={b} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            View all work <ArrowUpRight size={14} />
          </Link>
          <p className="text-sm text-muted-foreground italic max-w-md">
            Every piece starts with search intent and primary research, then goes through structural and line editing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;