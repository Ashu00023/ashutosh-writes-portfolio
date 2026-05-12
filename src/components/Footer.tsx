import logo from "@/assets/logo-new.png";
import ScrollReveal from "./ScrollReveal";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="border-t border-border/50 py-10">
    <ScrollReveal>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Ashutosh Mahapatra — SEO Blog & YouTube Script Writer Logo" className="h-7 w-7 object-contain" />
          <span className="text-sm font-bold tracking-tight">
            <span className="text-foreground">ashutoshwrites.</span>
            <span className="text-accent">online</span>
          </span>
        </div>
        <ul className="flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ashutosh Mahapatra
        </p>
      </div>
    </ScrollReveal>
  </footer>
);

export default Footer;
