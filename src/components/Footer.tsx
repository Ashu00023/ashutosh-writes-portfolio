import logo from "@/assets/logo-new.png";
import ScrollReveal from "./ScrollReveal";
import { contacts } from "./ContactSection";

const contactLabels = ["ashutosh@mail.ashutoshwrites.online", "WhatsApp", "Ashutosh Mahapatra", "@ashutosh.writes"];

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
      { label: "YouTube Scripts", href: "/#services" },
      { label: "Content Strategy", href: "/#services" },
    ],
  },
  {
    title: "Connect",
    links: contacts
      .filter((contact) => contactLabels.includes(contact.label))
      .sort((a, b) => contactLabels.indexOf(a.label) - contactLabels.indexOf(b.label))
      .map((contact) => ({
        label: contact.label === "ashutosh@mail.ashutoshwrites.online" ? "Email" : contact.label === "Ashutosh Mahapatra" ? "LinkedIn" : contact.label,
        href: contact.href,
      })),
  },
  {
    title: "Site",
    links: [
      { label: "Home", href: "/#home" },
      { label: "About", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border/50 py-10">
    <ScrollReveal>
      <div className="container mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-10">
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
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Ashutosh Writes logo" className="h-7 w-7 object-contain" />
            <span className="text-sm font-bold tracking-tight">
              <span className="text-foreground">ashutoshwrites.</span>
              <span className="text-accent">online</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ashutosh Mahapatra
          </p>
        </div>
      </div>
    </ScrollReveal>
  </footer>
);

export default Footer;
