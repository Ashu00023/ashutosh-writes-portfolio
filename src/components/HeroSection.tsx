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
          Ashutosh Writes — a three-person editorial and engineering team, Bhubaneswar, India
        </p>
        <h1>
          <span className="rd-ln"><span>Fully coded editorial web pages</span></span>
          <span className="rd-ln"><span>for AI, fintech, and SaaS.</span></span>
        </h1>

        <div className="rd-hg">
          <div>
            <p className="rd-lede" data-h style={{ "--d": 1 } as React.CSSProperties}>
              We build interactive, fully coded editorial web assets. From deep B2B research and high-converting copy
              to front-end design, custom HTML/CSS, and Schema markup—we deliver publish-ready digital assets that rank
              and convert.
            </p>
            <div className="rd-btns" data-h style={{ "--d": 2 } as React.CSSProperties}>
              <a className="rd-b1" href="#portfolio">View Portfolio</a>
              <a className="rd-b2" href="#pricing">See Pricing</a>
            </div>
            <a
              className="rd-anc"
              href={anchor.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-h
              style={{ "--d": 3 } as React.CSSProperties}
            >
              <img src={anchor.image} alt={`Thumbnail for ${anchor.title}`} width={800} height={450} />
              <div>
                <small>Anchor piece</small>
                <h3>{anchor.title}</h3>
                <p>{anchor.approach}</p>
              </div>
            </a>
          </div>

          <div>
            <div className="rd-arch">
              <img src="/profile.webp" alt="Ashutosh Mahapatra — Founder, Ashutosh Writes" width={576} height={576} loading="eager" decoding="async" />
            </div>
            <p className="rd-cap" data-h style={{ "--d": 4 } as React.CSSProperties}>
              Ashutosh Mahapatra, Founder — Content Strategy &amp; Lead Editorial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
