import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-new.webp";
import TransitionLink from "@/components/TransitionLink";

const links = [
  { label: "Work", id: "portfolio" },
  { label: "Method", id: "process" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/** Which home-page section sits in the thin band around 40–45% of the viewport. */
const useActiveSection = (enabled: boolean) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
        setActive(links.map((l) => l.id).filter((id) => seen.has(id)).pop() ?? null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);

  return active;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const active = useActiveSection(pathname === "/");

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between">
        <TransitionLink to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Ashutosh Writes logo" className="h-8 w-8 object-contain" />
          <span className="text-[15px] font-bold tracking-tight">
            <span className="text-foreground">ashutoshwrites.</span>
            <span className="text-accent">online</span>
          </span>
        </TransitionLink>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                to={`/#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className="nav-link"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/#contact"
          className="hidden items-center rounded-sm bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground transition-colors duration-120 ease-cross hover:bg-foreground md:inline-flex"
        >
          Start a Project
        </Link>

        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="animate-in fade-in border-t border-border bg-background pb-6 duration-200 md:hidden"
        >
          <ul className="wrap flex flex-col pt-2">
            {links.map((l) => (
              <li key={l.id} className="border-b border-border">
                <Link
                  to={`/#${l.id}`}
                  aria-current={active === l.id ? "location" : undefined}
                  className="block py-3.5 text-base font-medium text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                to="/#contact"
                className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;