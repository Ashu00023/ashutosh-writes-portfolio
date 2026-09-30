import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { prefetchSamples, prefetchOne } from "@/lib/prefetch";
import { workItems } from "@/data/work";
import TransitionLink from "@/components/TransitionLink";

const featured = workItems.slice(0, 4);

const PortfolioSection = () => {
  const [active, setActive] = useState(0);
  const item = featured[active];

  useEffect(() => {
    prefetchSamples();
  }, []);

  return (
    <section id="portfolio" className="tempo-std border-t border-border">
      <div className="wrap">
        <header className="mb-12 grid grid-cols-12 gap-x-8 md:mb-16">
          <h2 className="col-span-12 text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.02em] md:col-span-5">
            Featured writing samples
          </h2>
          <p className="reading col-span-12 mt-4 text-muted-foreground md:col-span-5 md:col-start-8 md:mt-2">
            Independent research samples across AI, fintech, cybersecurity and technology — researched,
            structured and written exactly as I would deliver for a client.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-x-8">
          <ol className="index-list col-span-12 border-t border-border md:col-span-7">
            {featured.map((b, i) => (
              <li
                key={b.title}
                className="index-row relative border-b border-border"
                onMouseEnter={() => {
                  setActive(i);
                  prefetchOne(b.liveUrl);
                }}
                onFocusCapture={() => setActive(i)}
                onTouchStart={() => prefetchOne(b.liveUrl)}
              >
                <a
                  href={b.liveUrl}
                  className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-6 after:absolute after:inset-0 md:py-8"
                >
                  <span className="folio">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-heading text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.01em] text-foreground transition-transform duration-200 ease-arrive group-hover:translate-x-1 group-focus-visible:translate-x-1">
                      {b.title}
                    </span>
                    <span className="folio mt-2 block">
                      {b.niche} · {b.stat}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-muted-foreground md:hidden">
                      {b.problem}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <aside className="sticky top-28 col-span-5 hidden self-start md:block">
            <div key={active} className="animate-in fade-in duration-200">
              <p className="folio mb-6">{item.format} · Independent research sample</p>
              <dl className="space-y-6">
                {[
                  ["Problem", item.problem],
                  ["Approach", item.approach],
                  ["Demonstrates", item.demonstrates],
                ].map(([term, text]) => (
                  <div key={term}>
                    <dt className="folio">{term}</dt>
                    <dd className="mt-1 text-[1.0625rem] leading-relaxed text-foreground">{text}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <a href={item.liveUrl} className="link-seal">
                  View live article <ArrowUpRight size={14} />
                </a>
                {item.transcriptHref.startsWith("/blog/") ? (
                  <Link to={item.transcriptHref} className="link-seal text-muted-foreground">
                    Read clean transcript
                  </Link>
                ) : (
                  <a href={item.transcriptHref} className="link-seal text-muted-foreground">
                    Read clean transcript
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
          <TransitionLink to="/work" className="link-seal">
            View all work <ArrowUpRight size={14} />
          </TransitionLink>
          <p className="max-w-md text-sm text-muted-foreground">
            Every piece starts with search intent and primary research, then goes through structural and line
            editing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;