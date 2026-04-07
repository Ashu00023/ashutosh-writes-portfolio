import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contacts = [
  {
    icon: Mail,
    label: "For Blogs — ashutoshwrites.online@gmail.com",
    href: "mailto:ashutoshwrites.online@gmail.com",
  },
  {
    icon: Mail,
    label: "For YouTube Script — ashutoshwrites.online0@gmail.com",
    href: "mailto:ashutoshwrites.online0@gmail.com",
  },
  {
    icon: Phone,
    label: "+91 9040451510",
    href: "tel:+919040451510",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/919040451510",
  },
  {
    icon: Instagram,
    label: "@ashutosh.writes",
    href: "https://instagram.com/ashutosh.writes",
  },
  {
    icon: Linkedin,
    label: "Ashutosh Mahapatra",
    href: "https://linkedin.com/in/ashutosh-mahapatra",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Let's Work Together</h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Ready to grow your traffic with premium, human-written content? Reach out through any channel below.
          </p>
        </ScrollReveal>

        <ScrollReveal className="max-w-2xl mx-auto mb-12">
          <div className="rounded-2xl border border-border/60 bg-card/50 overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSegRQLlOSz3FnVBjm2atVgRX3HALSXbwUOugWiA0ACFSV3kNg/viewform?embedded=true"
              width="100%"
              height="1907"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Contact Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </ScrollReveal>

        <div className="max-w-lg mx-auto space-y-4">
          {contacts.map((c, i) => (
            <ScrollReveal key={c.label} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/50 px-6 py-4 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <c.icon size={18} className="text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {c.label}
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
