import { useRef, useState } from "react";
import { clamp, reducedMotion, useScrollFrame } from "@/hooks/useScrollFrame";

const steps = [
  { title: "Brief & Audience", description: "Understand the business, reader, search intent and desired outcome" },
  { title: "Research & Verification", description: "Gather primary sources and verify important claims before drafting" },
  { title: "Search & Editorial Architecture", description: "Build the article around search intent, information hierarchy and the strongest original angle" },
  { title: "Writing & Refinement", description: "Write, edit, tighten and test the argument for clarity and flow" },
  { title: "Delivery & Handoff", description: "Deliver the finished article, source list, SEO structure and useful implementation notes" },
];

const ProcessSection = () => {
  const row = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useScrollFrame(() => {
    const el = row.current;
    if (!el) return;
    const v = reducedMotion() ? 1 : clamp((window.innerHeight * 0.85 - el.getBoundingClientRect().top) / (window.innerHeight * 0.5));
    el.style.setProperty("--p", String(v));
    setP(v);
  });

  return (
    <section id="process" className="rd-sec rd-sand">
      <div className="rd-wrap">
        <h2 className="rd-big" style={{ maxWidth: "14em" }}>How a piece gets made</h2>
        <div className="rd-pr" ref={row}>
          <div className="rd-pl"><i /></div>
          {steps.map((s, i) => (
            <div key={s.title} className={`rd-st${p >= (i + 0.4) / steps.length ? " rd-on" : ""}`}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
