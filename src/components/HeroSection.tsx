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
          Ashutosh Writes: a three-person editorial and engineering team in Bhubaneswar, India
        </p>
        <h1>
          <span className="rd-ln"><span>Fully coded editorial web pages</span></span>
          <span className="rd-ln"><span>for AI, fintech, and SaaS.</span></span>
        </h1>

        <div className="rd-hg">
          <div>
            <p className="rd-lede" data-h style={{ "--d": 1 } as React.CSSProperties}>
              We build interactive, fully coded editorial web assets, from deep B2B research and clear copy to front-end design, custom HTML/CSS and Schema markup, ready to publish.
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
