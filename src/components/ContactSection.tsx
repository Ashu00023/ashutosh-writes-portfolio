import { ArrowUpRight } from "lucide-react";
import SeoBlogInquiryForm from "@/components/forms/SeoBlogInquiryForm";

export const contacts = [
  { label: "ashutosh@mail.ashutoshwrites.online", href: "mailto:ashutosh@mail.ashutoshwrites.online" },
  { label: "+91 9040451510", href: "tel:+919040451510" },
  { label: "WhatsApp", href: "https://wa.me/919040451510" },
  { label: "@ashutosh.writes", href: "https://instagram.com/ashutosh.writes" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ashutosh-mahapatra" },
];

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight mb-6">
            Let&rsquo;s Work Together
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Ready to grow your traffic with premium, human-written content? Reach out through any channel below.
          </p>

          <ul className="border-t border-border/60 divide-y divide-border/60">
            {contacts.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between gap-3 py-3.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    <span className="break-all">{c.label}</span>
                    {external && <ArrowUpRight size={14} className="shrink-0" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="md:col-span-3">
          <SeoBlogInquiryForm />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;