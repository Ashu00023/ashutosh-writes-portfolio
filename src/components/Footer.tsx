import { Link } from "react-router-dom";
import logo from "@/assets/logo-new.webp";
import TransitionLink from "@/components/TransitionLink";
import { EMAIL, LINKEDIN } from "@/data/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Method", href: "/method" },
      { label: "Research", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Author", href: "/author/ashutosh-mahapatra" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Editorial articles", href: "/services#articles" },
      { label: "Article-level search", href: "/services#search" },
      { label: "Content strategy", href: "/services#strategy" },
      { label: "Free Article Check", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: `mailto:${EMAIL}` },
      { label: "LinkedIn", href: LINKEDIN },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

const linkClass = "text-sm text-muted-foreground transition-colors duration-120 ease-cross hover:text-accent max-md:inline-block max-md:py-1.5";
const isOutside = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
const isRoute = (href: string) => !href.includes("#") && href !== "/";

const Footer = () => (
  <footer className="border-t border-border py-14">
    <div className="wrap">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-14 md:grid-cols-3">
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="folio mb-4 text-foreground">{column.title}</h2>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.href}-${link.label}`}>
                  {isOutside(link.href) ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  ) : isRoute(link.href) ? (
                    <TransitionLink to={link.href} className={linkClass}>
                      {link.label}
                    </TransitionLink>
                  ) : (
                    <Link to={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <nav aria-label="Legal" className="border-t border-border pt-8">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="folio transition-colors duration-120 ease-cross hover:text-accent max-md:inline-block max-md:py-2">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-7 w-7 object-contain" />
          <span className="text-sm font-bold tracking-tight">
            <span className="text-foreground">ashutoshwrites.</span>
            <span className="text-accent">online</span>
          </span>
        </div>
        <p className="folio">© {new Date().getFullYear()} Ashutosh Mahapatra, Bhubaneswar, Odisha, India. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
