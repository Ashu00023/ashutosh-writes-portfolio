import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { workItems } from "@/data/work";
import { prefetchOne, prefetchSamples } from "@/lib/prefetch";
import { clamp, ease, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

const items = workItems.slice(0, 4);

/** The pinned side-by-side layout needs a real desktop-sized window. Phones (even in landscape) get the stacked layout. */
const PIN_QUERY = "(min-width: 860px) and (min-height: 620px)";

const PortfolioSection = () => {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const wl = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pinMq = useRef<MediaQueryList | null>(null);
  // Cached between frames so scrolling never re-writes unchanged values.
  const paint = useRef({ st: "", dark: false });

  useEffect(() => {
    prefetchSamples();
    return () => {
      window.dispatchEvent(new CustomEvent("aw:stage", { detail: 0 }));
    };
  }, []);

  // Stacked (phone) layout: each sample reveals once as it scrolls into view. Skipped for reduced motion
  // and when IntersectionObserver is missing, so content is never left hidden. Styles: #portfolio[data-rv] in redesign.css.
  useLayoutEffect(() => {
    const root = section.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.setAttribute("data-rv", "");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.closest(".rd-ch")?.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll(".rd-mf").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.removeAttribute("data-rv");
    };
  }, []);

  useScrollFrame(() => {
    const el = section.current;
    if (!el) return;
    const vh = window.innerHeight;
    const w = el.getBoundingClientRect(); // read first, write after
    const p = paint.current;

    // paper -> stage handoff: 0 = cream page, 1 = black stage
    const t = ease(clamp((vh * 0.85 - w.top) / (vh * 0.5))) * (1 - ease(clamp((vh * 0.55 - w.bottom) / (vh * 0.5))));

    // The page background itself is never repainted. Only two opacities move, both compositor-only
    // (see .rd-stg and .rd-wl in redesign.css): the fixed black layer, and the section text, which
    // fades in once the stage is about 25% there.
    const st = t.toFixed(3);
    if (st !== p.st) {
      p.st = st;
      if (stage.current) stage.current.style.opacity = st;
      if (wl.current) wl.current.style.opacity = String(clamp((t - 0.25) / 0.35));
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
      {/* Fixed black layer behind the page. Fading its opacity replaces repainting the whole page background. */}
      <div className="rd-stg" ref={stage} aria-hidden="true" />
      <div className="rd-pin rd-wrap">
        <div className="rd-wl" ref={wl}>
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
                <div className="rd-tx">
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
