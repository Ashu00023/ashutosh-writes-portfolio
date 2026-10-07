import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-new.webp";
import { useScrollFrame } from "@/hooks/useScrollFrame";

const links = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "Work", href: "/work", section: "portfolio" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Pricing", href: "/#pricing", section: "pricing" },
  { label: "Approach", href: "/#process", section: "process" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Team", href: "/#team", section: "team" },
  { label: "Blog", href: "/blog", section: "" },
  { label: "Author", href: "/author/ashutosh-mahapatra", section: "" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

/** Homepage sections in page order. */
const order = ["home", "portfolio", "process", "about", "team", "services", "pricing", "contact"];

const Navbar = () => {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });
  const items = useRef<(HTMLAnchorElement | null)[]>([]);

  useScrollFrame(() => {
    setScrolled(window.scrollY > 20);
    if (!home) {
      setSection(null);
      return;
    }
    const vh = window.innerHeight;
    let current = order[0];
    for (const id of order) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= vh * 0.4) current = id;
    }
    setSection(current);
  }, [pathname]);

  useEffect(() => {
    const onStage = (e: Event) => setDark((e as CustomEvent<number>).detail > 0.5);
    window.addEventListener("aw:stage", onStage);
    return () => window.removeEventListener("aw:stage", onStage);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Mobile menu: Escape closes it, and it closes if the window grows into the desktop nav.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 1180 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isCurrent = (i: number) => {
    const l = links[i];
    if (home) return l.section !== "" && l.section === section;
    return !l.href.includes("#") && (pathname === l.href || pathname.startsWith(`${l.href}/`));
  };
  const activeIndex = links.findIndex((_, i) => isCurrent(i));
  const target = hover ?? (activeIndex >= 0 ? activeIndex : null);

  useEffect(() => {
    const move = () => {
      const el = target === null ? null : items.current[target];
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth, show: true } : (p) => ({ ...p, show: false }));
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [target]);

  const cls = ["rd-nav", scrolled ? "rd-s" : "", dark && !open ? "rd-dk" : ""].join(" ");

  return (
    <>
    <header className={cls}>
      <div className="rd-wrap">
        <Link to="/" className="rd-brand" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logo} alt="" className="h-9 w-9 object-contain" />
          <span>
            ashutoshwrites.<b>online</b>
          </span>
        </Link>

        <nav className="rd-links" aria-label="Primary" onMouseLeave={() => setHover(null)}>
          <i className="rd-pill" style={{ left: pill.left, width: pill.width, opacity: pill.show ? 1 : 0 }} />
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={(el) => (items.current[i] = el)}
              aria-current={isCurrent(i) ? (home ? "location" : "page") : undefined}
              className={isCurrent(i) ? "rd-on" : ""}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a className="rd-cta" href="/#contact">
          Start a Project
        </a>

        <button
          type="button"
          className="rd-bg"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>

      <nav id="mobile-menu" aria-label="Mobile" className={`rd-sheet${open ? " rd-o" : ""}`}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
