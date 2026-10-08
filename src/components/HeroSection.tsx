import { useEffect, useState } from "react";
import { workItems } from "@/data/work";

const anchor = workItems[0];

const HeroSection = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="home" className={`rd-hero${ready ? " rd-ld" : ""}`}>
      <div className="rd-wrap">
        <p className="rd-mut" data-h style={{ "--d": 0, fontSize: 14 } as React.CSSProperties}>
          Ashutosh Writes: on-page SEO, GEO and AEO for B2B SaaS and fintech teams
        </p>
        <h1>
          <span className="rd-ln"><span>On-page SEO, GEO and AEO</span></span>
          <span className="rd-ln"><span>for SaaS and fintech teams.</span></span>
        </h1>

        <div className="rd-hg">
          <div>
            <p className="rd-lede" data-h style={{ "--d": 1 } as React.CSSProperties}>
              We research, write and code each page so it ranks in Google and gets cited in AI answers. Every claim is traced to a primary source, and the limits are stated.
            </p>
            <div className="rd-btns" data-h style={{ "--d": 2 } as React.CSSProperties}>
              <a className="rd-b1" href="#contact">Start a project</a>
              <a className="rd-b2" href="#portfolio">See the proof</a>
            </div>
            <a
              className="rd-anc"
              href={anchor.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-h
              style={{ "--d": 3 } as React.CSSProperties}
            >
              <img
                src={anchor.image}
                alt={anchor.thumbAlt}
                width={800}
                height={450}
                fetchPriority="high"
                decoding="async"
              />
              <div>
                <small>Anchor piece</small>
                <div className="rd-at">{anchor.title}</div>
                <p>{anchor.approach}</p>
              </div>
            </a>
          </div>

          <div>
            <div className="rd-arch">
              <img src="/profile.webp" alt="Portrait of Ashutosh Mahapatra" width={576} height={576} loading="eager" decoding="async" />
            </div>
            <p className="rd-cap" data-h style={{ "--d": 4 } as React.CSSProperties}>
              Ashutosh Mahapatra, Founder, Content Strategy &amp; Lead Editorial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
