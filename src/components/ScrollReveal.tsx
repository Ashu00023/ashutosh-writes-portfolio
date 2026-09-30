import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { distance, duration as dur, easeArrive } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: distance.md },
  down: { x: 0, y: -distance.md },
  left: { x: distance.md, y: 0 },
  right: { x: -distance.md, y: 0 },
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = dur.base,
  className,
  once = true,
}: ScrollRevealProps) => {
  const offset = offsets[direction];
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 0, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduceMotion
        ? { duration: dur.fast, delay: 0 }
        : { duration, delay, ease: easeArrive },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;