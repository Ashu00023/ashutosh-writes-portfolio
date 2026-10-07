import { useReveal } from "@/hooks/useReveal";

const facts = [
  "4 independent research samples across AI, fintech, cybersecurity & technology",
  "18+ sourced statistics in the finance authority piece",
  "Primary-source research: reports, filings, rules & technical sources",
  "Complex technical and financial topics translated clearly",
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
