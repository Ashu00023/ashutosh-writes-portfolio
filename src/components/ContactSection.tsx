import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-new.webp";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Author", href: "/author/ashutosh-mahapatra" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isCurrent = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-background ${
        scrolled ? "border-b border-border/60" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Ashutosh Writes logo" className="h-8 w-8 object-contain" />
          <span className="font-heading text-[15px] font-medium tracking-tight text-foreground">
            ashutoshwrites.online
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              
                href={l.href}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className={`px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isCurrent(l.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        
          href="/#contact"
          className="hidden md:inline-flex items-center rounded-md bg-foreground px-5 py-2 text-[13px] font-medium text-background hover:bg-accent transition-colors duration-200"
        >
          Start a Project
        </a>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-background border-t border-border/60 px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={`block px-3 py-2.5 text-sm font-medium transition-colors ${
                    isCurrent(l.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              >
                Start a Project
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;