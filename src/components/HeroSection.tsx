import { useEffect, useState } from "react";
import { Linkedin, Mail } from "lucide-react";
import { workItems } from "@/data/work";
import { EMAIL, LINKEDIN } from "@/data/site";

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
          An editorial studio for fintech and AI-security teams
        </p>
        <h1 className="st-h1">
          <span className="rd-ln"><span>Fintech and AI-security articles</span></span>
          <span className="rd-ln"><span>that rank, and get cited.</span></span>
        </h1>

        <div className="rd-hg">
          <div>
            <p className="rd-lede" data-h style={{ "--d": 1 } as React.CSSProperties}>
              A boutique editorial studio. Every article is researched to primary sources, structured for search and answer engines, and delivered with the evidence behind each claim.
            </p>
            <div className="rd-btns" data-h style={{ "--d": 2 } as React.CSSProperties}>
              <a className="rd-b1" href="/contact">Get a free Article Check</a>
              <a className="rd-b2" href="#ledger">See the evidence</a>
            </div>
            <p className="st-small" data-h style={{ "--d": 3, marginTop: -24, marginBottom: 36, maxWidth: "34em" } as React.CSSProperties}>
              Send one article. We verify its claims, review it for search and answer engines, and test whether AI engines cite it. A few per month.
            </p>
            <a
              className="rd-anc"
              href={anchor.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-h
              style={{ "--d": 4 } as React.CSSProperties}
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
                <small>Latest research</small>
                <div className="rd-at">{anchor.title}</div>
                <p>{anchor.approach}</p>
              </div>
            </a>
          </div>

          <div>
            <div className="rd-arch">
              <img src="/profile.webp" alt="Portrait of Ashutosh Mahapatra" width={576} height={576} loading="eager" decoding="async" />
            </div>
            <p className="rd-cap" data-h style={{ "--d": 5 } as React.CSSProperties}>
              Ashutosh Mahapatra, Founder, Content Strategy &amp; Lead Editorial
            </p>
            <div className="st-soc" data-h style={{ "--d": 6 } as React.CSSProperties}>
              <a className="st-ic" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Ashutosh Mahapatra on LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a className="st-mail" href={`mailto:${EMAIL}`}>
                <Mail size={16} aria-hidden="true" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
