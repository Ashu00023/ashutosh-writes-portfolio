import { useReveal } from "@/hooks/useReveal";

const facts = [
  "4 independent research samples across AI, fintech and cybersecurity",
  "17 sources cited in the Shadow AI piece, with vendor claims labelled as such",
  "20+ sourced statistics in the AI finance piece, with sample sizes and dates",
  "Primary-source research: filings, rules, CVEs and technical documentation",
];

const TrustStrip = () => {
  const [ref, seen] = useReveal<HTMLUListElement>();
  return (
    <div className="rd-wrap">
      <ul ref={ref} className={`rd-ts${seen ? " rd-v" : ""}`}>
        {facts.map((f, i) => (
          <li key={f} style={{ "--d": i } as React.CSSProperties}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrustStrip;
