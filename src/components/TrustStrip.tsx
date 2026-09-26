const facts = [
  "4 independent research samples across AI, fintech, cybersecurity & technology",
  "18+ sourced statistics in the finance authority piece",
  "Primary-source research — reports, filings, rules & technical sources",
  "Complex technical and financial topics translated clearly",
];

const TrustStrip = () => (
  <section className="border-y border-border/60 py-5">
    <div className="container mx-auto px-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center">
        {facts.map((f) => (
          <li key={f} className="text-xs text-muted-foreground max-w-[220px]">
            {f}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TrustStrip;