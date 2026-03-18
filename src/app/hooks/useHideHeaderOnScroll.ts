import { useEffect, useRef, useState } from 'react';

const SCROLL_THRESHOLD = 40;
const SCROLL_DELTA = 4;

/**
 * Hides header when scrolling down, shows when scrolling up or at top.
 * Returns { showHeader, isScrolled }.
 */
export function useHideHeaderOnScroll() {
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const lastY = lastScrollYRef.current;

      setIsScrolled(currentY > SCROLL_THRESHOLD);

      if (currentY <= 0) {
        setShowHeader(true);
        lastScrollYRef.current = currentY;
        return;
      }

      if (currentY > lastY + SCROLL_DELTA) {
        setShowHeader(false);
      } else if (currentY < lastY - SCROLL_DELTA) {
        setShowHeader(true);
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { showHeader, isScrolled };
}
