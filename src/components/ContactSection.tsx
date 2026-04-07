import { useState } from "react";
import { Mail, Phone, Instagram, Linkedin, MessageCircle, FileText, Video } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

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

const forms = [
  {
    icon: FileText,
    label: "SEO Blog Inquiry",
    description: "Fill out the form to get a custom SEO blog",
    src: "https://docs.google.com/forms/d/e/1FAIpQLSegRQLlOSz3FnVBjm2atVgRX3HALSXbwUOugWiA0ACFSV3kNg/viewform?embedded=true",
    height: 1907,
  },
  {
    icon: Video,
    label: "YouTube Script Inquiry",
    description: "Fill out the form to get a custom YouTube script",
    src: "https://docs.google.com/forms/d/e/1FAIpQLSf0iTe4F1qWNsoIvHK0IPjE7EBMTO_2XttIWdwHTX4djBhScg/viewform?embedded=true",
    height: 1990,
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

        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          {forms.map((form, i) => (
            <ScrollReveal key={form.label} delay={i * 0.1}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center gap-5 rounded-2xl border-2 border-[hsl(25,95%,53%)]/40 bg-[hsl(25,95%,53%)]/10 px-6 py-5 hover:border-[hsl(25,95%,53%)] hover:bg-[hsl(25,95%,53%)]/20 transition-all duration-200 group cursor-pointer text-left shadow-[0_0_20px_hsl(25,95%,53%,0.08)]">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(25,95%,53%)]/20 flex items-center justify-center shrink-0 group-hover:bg-[hsl(25,95%,53%)]/30 transition-colors">
                      <form.icon size={22} className="text-[hsl(25,95%,53%)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-base font-bold text-foreground group-hover:text-[hsl(25,95%,53%)] transition-colors block">
                        {form.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{form.description}</span>
                    </div>
                    <span className="text-xs font-semibold text-[hsl(25,95%,53%)] bg-[hsl(25,95%,53%)]/15 px-3 py-1.5 rounded-full shrink-0 group-hover:bg-[hsl(25,95%,53%)]/25 transition-colors animate-pulse">
                      Open Form →
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
                  <DialogHeader className="p-6 pb-0">
                    <DialogTitle>{form.label}</DialogTitle>
                  </DialogHeader>
                  <iframe
                    src={form.src}
                    width="100%"
                    height={form.height}
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title={form.label}
                    className="w-full"
                  >
                    Loading…
                  </iframe>
                </DialogContent>
              </Dialog>
            </ScrollReveal>
          ))}
        </div>

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
