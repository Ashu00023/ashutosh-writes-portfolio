import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// The form pulls in zod + the Select widget (~100 KB). It loads in its own chunk, just before it is needed.
const SeoBlogInquiryForm = lazy(() => import("@/components/forms/SeoBlogInquiryForm"));

export const contacts = [
  { label: "ashutosh@mail.ashutoshwrites.online", href: "mailto:ashutosh@mail.ashutoshwrites.online" },
  { label: "+91 9040451510", href: "tel:+919040451510" },
  { label: "WhatsApp", href: "https://wa.me/919040451510" },
  { label: "@ashutosh.writes", href: "https://instagram.com/ashutosh.writes" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ashutosh-mahapatra" },
];

/** Reserves the form's space so nothing jumps while its chunk loads. */
const FormSpace = () => <div aria-hidden="true" className="min-h-[1360px] md:min-h-[1100px]" />;

const ContactSection = () => {
  const holder = useRef<HTMLDivElement>(null);
  const [mountForm, setMountForm] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const show = () => setMountForm(true);
    const timer = window.setTimeout(show, 4000); // warm it up shortly after load
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => entry.isIntersecting && show(), { rootMargin: "1200px 0px" });
      io.observe(el);
    }
    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  return (
    <section id="contact" className="tempo-std pt-[clamp(3rem,6vw,4.5rem)]">
      <div className="wrap grid grid-cols-12 gap-x-0 gap-y-12 md:gap-x-8">
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
        <div ref={holder} className="col-span-12 md:col-span-6 md:col-start-7">
          {mountForm ? (
            <Suspense fallback={<FormSpace />}>
              <SeoBlogInquiryForm />
            </Suspense>
          ) : (
            <FormSpace />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
