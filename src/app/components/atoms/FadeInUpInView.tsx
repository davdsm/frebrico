import React from "react";
import { motion } from "framer-motion";

const defaultEase = [0.22, 1, 0.36, 1];

interface FadeInUpInViewProps {
  children?: React.ReactNode;
  className?: string;
  /** Vertical offset for "from below" (px). */
  y?: number;
  duration?: number;
  /** Delay before animation starts (seconds). */
  delay?: number;
  /** Viewport amount (0-1) that must be visible to trigger. */
  amount?: number;
}

/**
 * Fade in up when the element enters the viewport: opacity 0 → 1, y → 0.
 */
export function FadeInUpInView({
  children,
  className,
  y = 40,
  duration = 1,
  delay = 0,
  amount = 0.4,
}: FadeInUpInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: defaultEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
