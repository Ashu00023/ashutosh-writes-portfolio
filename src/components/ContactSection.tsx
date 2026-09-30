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
  <section id="contact" className="tempo-std pt-[clamp(3rem,6vw,4.5rem)]">
    <div className="wrap grid grid-cols-12 gap-x-8 gap-y-12">
      <div className="col-span-12 md:col-span-5">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em]">
          Let&rsquo;s Work Together
        </h2>
        <p className="reading mt-6 text-[1.0625rem] text-muted-foreground">
          Ready to grow your traffic with premium, human-written content? Reach out through any channel below.
        </p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {contacts.map((c) => {
            const external = c.href.startsWith("http");
            return (
              <li key={c.href}>
                <a
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between gap-3 py-3.5 font-mono text-[13px] text-muted-foreground transition-colors duration-120 ease-cross hover:text-accent"
                >
                  <span className="break-all">{c.label}</span>
                  {external && <ArrowUpRight size={14} className="shrink-0" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 md:col-start-7">
        <SeoBlogInquiryForm />
      </div>
    </div>
  </section>
);

export default ContactSection;