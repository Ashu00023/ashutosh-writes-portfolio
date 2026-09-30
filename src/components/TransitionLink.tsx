import { forwardRef, type ComponentProps, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

/** Lazy route chunks are loaded before the transition starts, so the new page is ready when the browser snapshots it. */
const preloaders: Record<string, () => Promise<unknown>> = {
  "/work": () => import("@/pages/Work"),
  "/blog": () => import("@/pages/Blog"),
  "/author/ashutosh-mahapatra": () => import("@/pages/Author"),
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * A normal <Link> that wraps the route change in the browser's View Transitions API.
 * Falls back to a plain client-side navigation when the API is missing
 * or the visitor prefers reduced motion.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
  ({ to, onClick, target, ...rest }, ref) => {
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (target && target !== "_self") return;

      const doc = document as ViewTransitionDocument;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduce) return; // let <Link> navigate normally

      event.preventDefault();
      const path = (typeof to === "string" ? to : to.pathname ?? "").split(/[?#]/)[0];
      const ready = preloaders[path]?.() ?? Promise.resolve();

      ready
        .catch(() => undefined)
        .then(() => {
          doc.startViewTransition?.(() => {
            flushSync(() => navigate(to));
          });
        });
    };

    return <Link ref={ref} to={to} target={target} onClick={handleClick} {...rest} />;
  },
);
TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
