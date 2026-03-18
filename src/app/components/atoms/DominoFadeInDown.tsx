import React from "react";
import { motion } from "framer-motion";

interface DominoFadeInDownProps {
  children?: React.ReactNode;
  className?: string;
  /** Delay before the first item animates (seconds). */
  initialDelay?: number;
  /** Delay between each item (seconds). */
  stagger?: number;
  /** Duration of each fade-in-down (seconds). */
  duration?: number;
  /** Vertical distance for "from down" (px). */
  y?: number;
}

const defaultEase = [0.22, 1, 0.36, 1];

/**
 * Wraps each direct child in a motion div with staggered fade-in-down:
 * opacity 0 → 1, y → 0. First item starts after initialDelay (default 0.15s).
 */
export function DominoFadeInDown({
  children,
  className,
  initialDelay = 0.15,
  stagger = 0.05,
  duration = 0.3,
  y = 20,
}: DominoFadeInDownProps) {
  const items = React.Children.toArray(children ?? null);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: initialDelay + index * stagger,
            ease: defaultEase,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
