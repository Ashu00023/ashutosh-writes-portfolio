import { type ReactNode } from "react";

interface CaseStudyFrameProps {
  niche: string;
  title: string;
  format: string;
  statHighlight: string;
  challenge: string;
  approach: string;
  craftNotes: string[];
  children: ReactNode;
}

const CaseStudyFrame = ({
  niche,
  title,
  format,
  statHighlight,
  challenge,
  approach,
  craftNotes,
  children,
}: CaseStudyFrameProps) => (
  <>
    <section className="pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-5">
          {niche}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15] mb-12">
          {title}
        </h1>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">
                Challenge
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">
                Approach
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{approach}</p>
            </div>
          </div>

          <div className="border border-border/60 rounded-xl p-6 bg-card/50 h-fit">
            <dl className="space-y-4">
              {[
                { label: "Format", value: format },
                { label: "Niche", value: niche },
                { label: "Key stat", value: statHighlight },
              ].map((m) => (
                <div key={m.label}>
                  <dt className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-1">
                    {m.label}
                  </dt>
                  <dd className="text-sm font-semibold text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#full-piece"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all duration-200"
            >
              Jump to full piece ↓
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
            Craft Notes
          </p>
          <ul className="space-y-2.5 max-w-2xl">
            {craftNotes.map((n) => (
              <li key={n} className="text-sm text-muted-foreground flex items-start gap-2.5">
                <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    <div id="full-piece">{children}</div>
  </>
);

export default CaseStudyFrame;
