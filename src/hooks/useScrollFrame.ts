import { useEffect, useRef } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const ease = (t: number) => t * t * (3 - 2 * t);
export const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.trim().slice(i, i + 2), 16));
export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs `callback` once on mount, again whenever `deps` change,
 * and then at most once per animation frame while the page scrolls or resizes.
 */
export const useScrollFrame = (callback: () => void, deps: unknown[] = []) => {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    let queued = false;
    const run = () => {
      queued = false;
      ref.current();
    };
    const request = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(run);
      }
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  useEffect(() => {
    ref.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
