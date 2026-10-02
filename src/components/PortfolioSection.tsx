import { useEffect, useRef, useState } from "react";
import { workItems } from "@/data/work";
import { prefetchOne, prefetchSamples } from "@/lib/prefetch";
import { clamp, ease, hexToRgb, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

const items = workItems.slice(0, 4);

/** The pinned side-by-side layout needs a real desktop-sized window. Phones (even in landscape) get the stacked layout. */
const PIN_QUERY = "(min-width: 860px) and (min-height: 620px)";

const PortfolioSection = () => {
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pinMq = useRef<MediaQueryList | null>(null);
  // Cached between frames so scrolling never re-reads styles or re-writes unchanged values.
  const paint = useRef({ from: [] as number[], to: [] as number[], col: "", st: "", dark: false });

  useEffect(() => {
    prefetchSamples();
    return () => {
      document.body.style.background = "";
      document.documentElement.style.removeProperty("--bg-now");
      window.dispatchEvent(new CustomEvent("aw:stage", { detail: 0 }));
    };
  }, []);

  useScrollFrame(() => {
    const el = section.current;
    if (!el) return;
    const vh = window.innerHeight;
    const w = el.getBoundingClientRect(); // read first, write after
    const p = paint.current;

    if (!p.from.length) {
      const cs = getComputedStyle(document.documentElement);
      p.from = hexToRgb(cs.getPropertyValue("--paper"));
      p.to = hexToRgb(cs.getPropertyValue("--stage"));
    }

    // paper -> stage handoff (page background), and tell the nav
    const t = ease(clamp((vh * 0.85 - w.top) / (vh * 0.5))) * (1 - ease(clamp((vh * 0.55 - w.bottom) / (vh * 0.5))));
    const col = `rgb(${p.from.map((v, i) => Math.round(v + (p.to[i] - v) * t)).join(",")})`;
    if (col !== p.col) {
      p.col = col;
      document.body.style.background = col;
      document.documentElement.style.setProperty("--bg-now", col);
    }
    // the section text fades in with the dark stage (see .rd-wl in redesign.css)
    const st = t.toFixed(2);
    if (st !== p.st) {
      p.st = st;
      el.style.setProperty("--st", st);
    }
    const dark = t > 0.5;
    if (dark !== p.dark) {
      p.dark = dark;
      window.dispatchEvent(new CustomEvent("aw:stage", { detail: t }));
    }

    // pinned chapters (desktop only)
    if (!pinMq.current) pinMq.current = window.matchMedia(PIN_QUERY);
    if (pinMq.current.matches) {
      const wr = clamp(-w.top / (w.height - vh));
      bar.current?.style.setProperty("--wr", String(wr));
      const i = Math.min(items.length - 1, Math.floor(wr * items.length));
      if (i !== activeRef.current) {
        activeRef.current = i;
        setActive(i);
      }
    }
  });

  const jump = (i: number) => {
    const el = section.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    window.scrollTo({
      top: r.top + window.scrollY + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / items.length,
      behavior: reducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <section id="portfolio" ref={section} aria-labelledby="portfolio-title">
      <div className="rd-pin rd-wrap">
        <div className="rd-wl">
          <div>
            <h2 id="portfolio-title">Featured writing samples</h2>
            <p className="rd-sub">
              Independent research samples across AI, fintech, cybersecurity and technology — researched, structured
              and written exactly as I would deliver for a client.
            </p>
          </div>

          <div className="rd-chs">
            {items.map((it, i) => (
              <article key={it.title} className={`rd-ch${i === active ? " rd-a" : ""}`}>
                {/* Stacked (phone) layout only: each thumbnail sits with its own article. Hidden on desktop. */}
                <figure className="rd-mf">
                  <img src={it.image} alt={`${it.title} thumbnail`} width={800} height={450} loading="lazy" decoding="async" />
                  <figcaption>{it.stat}</figcaption>
                </figure>
                <h3>{it.title}</h3>
                <p><b>Problem: </b>{it.problem}</p>
                <p><b>Approach: </b>{it.approach}</p>
                <p><b>Demonstrates: </b>{it.demonstrates}</p>
                <div className="rd-lk">
                  <a
                    href={it.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => prefetchOne(it.liveUrl)}
                    onFocus={() => prefetchOne(it.liveUrl)}
                    onTouchStart={() => prefetchOne(it.liveUrl)}
                  >
                    View live article
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div>
            <div className="rd-ip"><i ref={bar} /></div>
            <div className="rd-ix">
              {items.map((it, i) => (
                <button key={it.title} type="button" className={i === active ? "rd-a" : ""} onClick={() => jump(i)}>
                  {it.niche}
                </button>
              ))}
              <a className="rd-all" href="/work">View all work</a>
            </div>
          </div>
        </div>

        {/* Desktop pinned stack of thumbnails. Hidden in the stacked layout. */}
        <div className="rd-fw">
          {items.map((it, i) => (
            <div key={it.title} className={`rd-fr${i === active ? " rd-a" : ""}`}>
              <img src={it.image} alt={`${it.title} thumbnail`} width={800} height={450} loading="lazy" decoding="async" />
              <span>{it.stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
