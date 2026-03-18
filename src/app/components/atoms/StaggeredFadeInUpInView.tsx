import React from "react";
import { motion } from "framer-motion";

const defaultEase = [0.22, 1, 0.36, 1];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: defaultEase as unknown as number[] },
  },
};

interface StaggeredFadeInUpInViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  /** Stagger delay between each item (seconds). */
  stagger?: number;
  /** Viewport amount (0-1) that must be visible to trigger. */
  amount?: number;
}

/**
 * When in view, each direct child fades in up with a stagger (default 0.1s per item).
 */
export const StaggeredFadeInUpInView = React.forwardRef<HTMLDivElement, StaggeredFadeInUpInViewProps>(
  function StaggeredFadeInUpInView(
    { children, className, stagger = 0.1, amount = 0.4, ...rest },
    ref
  ) {
    const items = React.Children.toArray(children ?? null);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={{
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: 0,
            },
          },
        }}
        className={className}
        {...rest}
      >
        {items.map((child, index) => (
          <motion.div key={index} variants={itemVariants} className="shrink-0">
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }
);
