import { useEffect, useRef, useState } from 'react';

const MIN_LOADER_MS = 1800;

/**
 * Module-level flag so the loader only ever appears once per browser session
 * (the first cold load that lands on the home page).
 */
let hasShownOnce = false;

/**
 * Full-screen logo loader shown only on the very first visit to the home page
 * (cold / hard refresh). On SPA navigations the loader is skipped entirely.
 *
 * Returns:
 * - `showLoader`  — whether the overlay should be rendered
 * - `loaderDone`  — true once the exit animation has fully completed (or if
 *                   no loader was needed). Content should only mount when this
 *                   is true so that entrance animations are visible.
 * - `onLoaderExitComplete` — callback for AnimatePresence onExitComplete
 */
export function useHomePageLoader(isHome: boolean, loading: boolean) {
  const shouldShow = isHome && !hasShownOnce && loading;
  const [visible, setVisible] = useState(shouldShow);
  const [loaderDone, setLoaderDone] = useState(!shouldShow);
  const startRef = useRef(Date.now());

  // Preload the Home chunk while the loader is visible so it's cached
  // by the time we mount the content.
  useEffect(() => {
    if (visible) import('../pages/Home');
  }, [visible]);

  useEffect(() => {
    if (!visible || loading) return;
    const elapsed = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    const t = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(t);
  }, [visible, loading]);

  const onLoaderExitComplete = () => {
    hasShownOnce = true;
    setLoaderDone(true);
  };

  return { showLoader: visible, loaderDone, onLoaderExitComplete };
}
