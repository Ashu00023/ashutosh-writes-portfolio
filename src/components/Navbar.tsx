import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-new.png";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Skills", href: "/#skills" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_0_hsl(var(--border)/0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <Link to="/" className="flex items-center gap-2.5 group animate-in fade-in slide-in-from-left-4 duration-700">
          <img
            src={logo}
            alt="Ashutosh Mahapatra — SEO Blog & YouTube Script Writer Logo"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-[15px] font-bold tracking-tight animate-in fade-in duration-700 delay-300 fill-mode-both">
            <span className="text-foreground">ashutoshwrites.</span>
            <span className="text-accent">online</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1 animate-in fade-in duration-500 delay-700 fill-mode-both">
          {links.map((l) => (
            <li key={l.href}>
              {"route" in l && l.route ? (
                <Link
                  to={l.href}
                  className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden md:inline-flex items-center rounded-full bg-accent px-5 py-2 text-[13px] font-semibold text-accent-foreground hover:brightness-110 transition-all duration-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500 delay-1000 fill-mode-both"
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                {"route" in l && l.route ? (
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
            <li className="mt-2">
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
