import { useRef, useState } from "react";
import { clamp, ease, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

type Pillar = { name: string; sub: string; specifics: string[] };

const pillars: Pillar[] = [
  {
    name: "Research",
    sub: "Primary-source research, evidence checking, source traceability and original synthesis.",
    specifics: ["18 sourced statistics in the finance authority piece", "Primary sources over aggregator lists", "Every claim traceable to a report, filing or CVE"],
  },
  {
    name: "Search Strategy",
    sub: "Search intent, content gaps, topical structure and pages designed to answer real questions.",
    specifics: ["Question-based headings mapped to real queries", "Answer blocks sized for featured snippets", "Internal-link architecture planned up front"],
  },
  {
    name: "Editorial Craft",
    sub: "Clear arguments, strong pacing, precise language and rigorous editing.",
    specifics: ["Line-by-line editing passes", "Narrative pacing that holds past 2,000 words", "Precise language over filler"],
  },
];

const ConvergenceSection = () => {
  const [active, setActive] = useState(0);
  const venn = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const el = venn.current;
    if (!el) return;
    const p = reducedMotion() ? 1 : ease(clamp((window.innerHeight * 0.92 - el.getBoundingClientRect().top) / (window.innerHeight * 0.6)));
    el.style.setProperty("--p", String(p));
  });

  return (
    <section id="approach" className="rd-sec">
      <div className="rd-wrap">
        <div className="rd-hd">
          <h2 className="rd-big">Where research meets the reader</h2>
          <p>AI can accelerate research and SEO workflows. Human judgment decides what is true, useful and worth publishing.</p>
        </div>

        <div className="rd-vn" ref={venn}>
          {pillars.map((p, i) => (
            <div className="rd-cw" key={p.name}>
              <button
                type="button"
                className={`rd-cb${i === active ? " rd-a" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {p.name}
              </button>
            </div>
          ))}
          <span className="rd-vc">Every piece<br />I ship</span>
        </div>

        <div className="rd-vd" aria-live="polite">
          {pillars.map((p, i) => (
            <div key={p.name} className={`rd-d${i === active ? " rd-a" : ""}`}>
              <h3>{p.name}</h3>
              <p>{p.sub}</p>
              <ul>
                {p.specifics.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {i === 0 && (
                <div className="rd-q">
                  CVE-2025-32711, better known as EchoLeak, carries a CVSS score of 9.3 and stands as the first fully
                  documented zero-click attack against a production AI agent.
                  <a className="rd-mk" href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711" target="_blank" rel="noopener noreferrer" aria-label="Source 1">1</a>
                  <small className="rd-src">1. NIST National Vulnerability Database, CVE-2025-32711</small>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConvergenceSection;
