/**
 * Single source of truth for motion in React/framer-motion.
 * The same numbers exist as CSS variables in index.css (--dur-*, --ease-*).
 * If you change one, change the other.
 */
export const duration = {
  instant: 0.12, // hover, focus, toggles
  fast: 0.2, // small state changes
  base: 0.36, // first appearance of a meaningful unit
  slow: 0.6, // the rare expressive moment
} as const;

// Arrivals: quick start, long soft landing.
export const easeArrive: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Things that cross the screen or cross-fade.
export const easeCross: [number, number, number, number] = [0.65, 0, 0.35, 1];

// Travel distances in px. Nothing on the site moves further than `lg`.
export const distance = { sm: 4, md: 12, lg: 24 } as const;
