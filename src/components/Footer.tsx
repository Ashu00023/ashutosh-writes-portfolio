import { Link } from "react-router-dom";
import logo from "@/assets/logo-new.png";
import ScrollReveal from "./ScrollReveal";
import { contacts } from "./ContactSection";

const connectOrder = [
  (href: string) => href.startsWith("mailto:"),
  (href: string) => href.includes("wa.me"),
  (href: string) => href.includes("linkedin.com"),
  (href: string) => href.includes("instagram.com"),
];

const connectLinks = connectOrder
  .map((matches) => contacts.find((contact) => matches(contact.href)))
  .filter((contact): contact is (typeof contacts)[number] => Boolean(contact))
  .map((contact) => ({
    label: contact.href.startsWith("mailto:")
      ? "Email"
      : contact.href.includes("linkedin.com")
        ? "LinkedIn"
        : contact.label,
    href: contact.href,
  }));

const columns = [
  {
    title: "Work",
    links: [
      { label: "Featured Work", href: "/#portfolio" },
      { label: "All Work", href: "/work" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SEO Blogs", href: "/#services" },
      { label: "Content Strategy", href: "/#services" },
    ],
  },
  {
    title: "Connect",
    links: connectLinks,
  },
  {
    title: "Site",
    links: [
      { label: "Home", href: "/#home" },
      { label: "About", href: "/#about" },
      { label: "Author", href: "/author/ashutosh-mahapatra" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const Footer = () => (
  <footer className="border-t border-border/50 py-10">
    <ScrollReveal>
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.3fr] sm:grid-cols-2 pb-10">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground mb-4">Newsletter</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              An occasional note when a new long-form piece goes live. Sign-ups open soon.
            </p>
            <form
              className="flex flex-col gap-2.5 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
              aria-describedby="newsletter-note"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                disabled
                className="w-full rounded-lg border border-border/60 bg-card/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled
                className="inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-xs font-semibold text-background disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Notify me
              </button>
            </form>
            <p id="newsletter-note" className="mt-2.5 text-xs text-muted-foreground">
              Not accepting sign-ups yet — email me directly in the meantime.
            </p>
          </div>
        </div>

        <nav aria-label="Legal" className="border-t border-border/50 pt-8">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Ashutosh Writes logo" className="h-7 w-7 object-contain" />
            <span className="text-sm font-bold tracking-tight">
              <span className="text-foreground">ashutoshwrites.</span>
              <span className="text-accent">online</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ashutosh Mahapatra. All rights reserved.
          </p>
        </div>
      </div>
    </ScrollReveal>
  </footer>
);

export default Footer;
