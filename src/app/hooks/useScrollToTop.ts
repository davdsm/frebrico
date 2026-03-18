import { useEffect } from 'react';

/**
 * Scrolls window to top when pathname changes.
 */
export function useScrollToTop(pathname: string, delayMs = 150): void {
  useEffect(() => {
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, delayMs);
    return () => clearTimeout(t);
  }, [pathname, delayMs]);
}
