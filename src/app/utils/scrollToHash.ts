/** Smooth-scroll to an element id (with sticky-header offset via CSS scroll-mt). */
export function scrollToHashId(rawId: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = rawId.replace(/^#/, "").trim();
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/**
 * Navigate to `/#id` and scroll. When already on the homepage, forces scroll
 * because React Router often skips hash-only navigations.
 */
export function goToHomeHash(rawId: string, event?: { preventDefault: () => void }): void {
  const id = rawId.replace(/^#/, "").trim();
  if (!id) return;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const onHome = path === "/";

  if (onHome) {
    event?.preventDefault();
    const next = `/#${id}`;
    if (`${window.location.pathname}${window.location.hash}` !== next && window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", next);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    }
    // Retry briefly in case the section just mounted / layout shifted.
    const tryScroll = () => scrollToHashId(id);
    if (!tryScroll()) {
      window.setTimeout(tryScroll, 50);
      window.setTimeout(tryScroll, 200);
    }
    return;
  }

  // Other pages: allow normal navigation; destination page will scroll on mount.
}
