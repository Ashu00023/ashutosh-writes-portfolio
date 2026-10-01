import { useEffect, useRef, useState } from "react";
import { workItems } from "@/data/work";
import { prefetchOne, prefetchSamples } from "@/lib/prefetch";
import { clamp, ease, hexToRgb, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

const items = workItems.slice(0, 4);

const PortfolioSection = () => {
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

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
    const w = el.getBoundingClientRect();

    // paper -> stage handoff (page background), and tell the nav
    const t = ease(clamp((vh * 0.85 - w.top) / (vh * 0.5))) * (1 - ease(clamp((vh * 0.55 - w.bottom) / (vh * 0.5))));
    const cs = getComputedStyle(document.documentElement);
    const a = hexToRgb(cs.getPropertyValue("--paper"));
    const b = hexToRgb(cs.getPropertyValue("--stage"));
    const col = `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
    document.body.style.background = col;
    document.documentElement.style.setProperty("--bg-now", col);
    window.dispatchEvent(new CustomEvent("aw:stage", { detail: t }));

    // pinned chapters (desktop only)
    if (window.innerWidth >= 860) {
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
    <section id="portfolio" ref={section}>
      <div className="rd-pin rd-wrap">
        <div className="rd-wl">
          <div>
            <h2>Featured writing samples</h2>
            <p className="rd-sub">
              Independent research samples across AI, fintech, cybersecurity and technology — researched, structured
              and written exactly as I would deliver for a client.
            </p>
          </div>

          <div className="rd-chs">
            {items.map((it, i) => (
              <article key={it.title} className={`rd-ch${i === active ? " rd-a" : ""}`}>
                <h3>{it.title}</h3>
                <p><b>Problem: </b>{it.problem}</p>
                <p><b>Approach: </b>{it.approach}</p>
                <p><b>Demonstrates: </b>{it.demonstrates}</p>
                <div className="rd-lk">
                  <a href={it.liveUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={() => prefetchOne(it.liveUrl)}>
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
