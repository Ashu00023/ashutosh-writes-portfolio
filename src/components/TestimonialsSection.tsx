import ScrollReveal from "./ScrollReveal";
import { Quote } from "lucide-react";

type Testimonial = {
  quoteLead: string;
  highlight: string;
  quoteTail: string;
  name: string;
  role: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quoteLead:
      "We had been burning budget on generic AI content for months. One long-form piece replaced six of them and ",
    highlight: "drove a 3.2x lift in organic signups within 60 days.",
    quoteTail: " The research depth is what our competitors simply do not match.",
    name: "Client Name",
    role: "Marketing Director, AI Fintech SaaS",
    initials: "MD",
  },
  {
    quoteLead: "The script structure is built for retention, not just word count. Our last video ",
    highlight: "held 58% average view duration on a 9-minute upload",
    quoteTail: " — the highest we have ever seen on the channel.",
    name: "Client Name",
    role: "Head of Content, 150k Productivity Channel",
    initials: "HC",
  },
  {
    quoteLead: "Working with this team feels less like outsourcing and more like adding a senior strategist. They ",
    highlight: "took us from page 4 to a featured snippet in two months",
    quoteTail: " on a keyword we had been chasing for a year.",
    name: "Client Name",
    role: "Founder, B2B Automation Startup",
    initials: "FB",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
            What <span className="font-display italic text-accent font-normal">Clients Say</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Real outcomes from founders, marketers, and creators we have shipped work for.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.role} delay={i * 0.1}>
              <article className="group h-full flex flex-col rounded-2xl bg-card/60 border border-border/60 p-7 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                <Quote className="text-accent/60 mb-5" size={28} />
                <p className="text-[15px] text-foreground/85 leading-relaxed flex-1">
                  {t.quoteLead}
                  <span className="font-semibold text-foreground bg-accent/10 px-1 rounded">
                    {t.highlight}
                  </span>
                  {t.quoteTail}
                </p>
                <div className="mt-7 pt-5 border-t border-border/60 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent to-accent/70 text-accent-foreground flex items-center justify-center text-sm font-bold shadow-sm">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;