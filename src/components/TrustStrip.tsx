const facts = [
  { number: "4 research samples", label: "AI, fintech, cybersecurity & technology" },
  { number: "18+ sourced statistics", label: "used in the finance authority piece" },
  { number: "Primary-source research", label: "reports, filings, rules & technical sources" },
  { number: "Technical + financial topics", label: "complex subjects translated clearly" },
];

const TrustStrip = () => (
  <section className="border-y border-border/50">
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="text-center lg:text-left">
            <p className="text-base font-bold text-foreground tracking-tight">{f.number}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
