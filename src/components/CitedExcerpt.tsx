import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { workItems } from "@/data/work";
import { heroExcerpt, sources } from "@/data/citations";
import { distance, duration, easeArrive } from "@/lib/motion";

/** Numbers sources in order of first appearance. */
const numbered = heroExcerpt.parts.reduce<string[]>((acc, p) => {
  if (p.source && !acc.includes(p.source)) acc.push(p.source);
  return acc;
}, []);

const FIGURE_DELAY = 0.2;

const CitedExcerpt = () => {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const article = workItems.find((w) => w.liveUrl.includes(heroExcerpt.articleMatch));

  return (
    <motion.figure
      initial={{ opacity: 0, y: reduce ? 0 : distance.md }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: easeArrive, delay: FIGURE_DELAY }}
      className="grid grid-cols-12 gap-x-8 gap-y-8 border-t border-border pt-6"
    >
      <figcaption className="folio col-span-12 md:col-span-3">
        From the work
        {article && (
          <>
            <br />
            <a
              href={article.liveUrl}
              className="text-foreground underline underline-offset-4 transition-colors duration-120 ease-cross hover:text-accent"
            >
              {article.title}
            </a>
          </>
        )}
      </figcaption>

      <blockquote className="reading col-span-12 md:col-span-5">
        {heroExcerpt.parts.map((part, i) => {
          const id = part.source;
          const n = id ? numbered.indexOf(id) + 1 : 0;
          return (
            <span key={i} className="cite-claim" data-active={id ? active === id : false}>
              {part.text}
              {id && (
                <button
                  type="button"
                  className="cite-marker"
                  style={{ "--cite-delay": `${FIGURE_DELAY + duration.base + 0.12}s` } as React.CSSProperties}
                  aria-label={`Source ${n}: ${sources[id].label}`}
                  aria-pressed={active === id}
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(id)}
                >
                  {n}
                </button>
              )}
            </span>
          );
        })}
      </blockquote>

      <ol className="col-span-12 space-y-5 md:col-span-4">
        {numbered.map((id, i) => {
          const s = sources[id as keyof typeof sources];
          const isActive = active === id;
          return (
            <li
              key={id}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              className={`folio grid grid-cols-[1.5rem_1fr] border-l pl-3 transition-colors duration-120 ease-cross ${
                isActive ? "border-ledger text-foreground" : "border-border"
              }`}
            >
              <span className="text-ledger">{i + 1}</span>
              <span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {s.label} <ArrowUpRight size={12} />
                </a>
                <br />
                {s.publisher}
              </span>
            </li>
          );
        })}
      </ol>
    </motion.figure>
  );
};

export default CitedExcerpt;
