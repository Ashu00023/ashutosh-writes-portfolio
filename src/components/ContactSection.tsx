import { useState } from "react";
import { Mail, Phone, Instagram, Linkedin, MessageCircle, FileText, Video } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import SeoBlogInquiryForm from "./forms/SeoBlogInquiryForm";
import YouTubeScriptInquiryForm from "./forms/YouTubeScriptInquiryForm";

const contacts = [
  {
    icon: Mail,
    label: "ashutosh@mail.ashutoshwrites.online",
    href: "mailto:ashutosh@mail.ashutoshwrites.online",
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

type InquiryKind = "seo" | "yt";

const inquiryCards: {
  kind: InquiryKind;
  icon: typeof FileText;
  title: string;
  copy: string;
  cta: string;
}[] = [
  {
    kind: "seo",
    icon: FileText,
    title: "SEO Blog Inquiry",
    copy: "Tell me about your brand, target keywords, and goals. I'll reply within 24 hours with a scope and quote.",
    cta: "Start inquiry",
  },
  {
    kind: "yt",
    icon: Video,
    title: "YouTube Script Inquiry",
    copy: "Share your channel, niche, and video vision. You'll get a tailored script proposal in your inbox.",
    cta: "Start inquiry",
  },
];

const InquiryCard = ({
  card,
  index,
  onOpen,
}: {
  card: (typeof inquiryCards)[number];
  index: number;
  onOpen: (kind: InquiryKind) => void;
}) => (
  <ScrollReveal delay={index * 0.1}>
    <button
      onClick={() => onOpen(card.kind)}
      className="w-full flex items-center gap-5 rounded-2xl border-2 border-accent/40 bg-accent/10 px-6 py-5 hover:border-accent hover:bg-accent/20 transition-all duration-200 group cursor-pointer text-left shadow-[0_0_20px_hsl(var(--accent)/0.08)]"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/30 transition-colors">
        <card.icon size={22} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-base font-bold text-foreground group-hover:text-accent transition-colors block">
          {card.title}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-2">{card.copy}</span>
      </div>
      <span className="text-xs font-semibold text-accent bg-accent/15 px-3 py-1.5 rounded-full shrink-0 group-hover:bg-accent/25 transition-colors">
        {card.cta} →
      </span>
    </button>
  </ScrollReveal>
);

const ContactSection = () => {
  const [openKind, setOpenKind] = useState<InquiryKind | null>(null);
  const active = inquiryCards.find((c) => c.kind === openKind);

  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
            Let&rsquo;s Work <span className="font-display italic text-accent font-normal">Together</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Ready to grow your traffic with premium, human-written content? Reach out through any channel below.
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          {inquiryCards.map((card, i) => (
            <InquiryCard key={card.kind} card={card} index={i} onOpen={setOpenKind} />
          ))}
        </div>

        <Dialog open={!!openKind} onOpenChange={(o) => !o && setOpenKind(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {active && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{active.title}</DialogTitle>
                  <DialogDescription>{active.copy}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {active.kind === "seo" ? (
                    <SeoBlogInquiryForm />
                  ) : (
                    <YouTubeScriptInquiryForm />
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

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
