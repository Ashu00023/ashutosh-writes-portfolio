import ScrollReveal from "./ScrollReveal";
import { Quote } from "lucide-react";

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

        <ScrollReveal>
          <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-border/70 bg-card/40 p-12 text-center">
            <Quote className="text-accent/60 mx-auto mb-4" size={32} />
            <p className="text-sm text-muted-foreground italic">
              Client testimonials coming soon.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;