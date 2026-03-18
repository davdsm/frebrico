import React from "react";
import { Logo } from "./Logo";

/**
 * Full-screen white overlay (no menu), logo centered.
 * Enter/exit animations are applied by the parent motion wrapper in Home.
 */
export function PageLoader() {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-white w-screen h-screen min-w-full min-h-screen"
      aria-live="polite"
      aria-label="A carregar"
    >
      <Logo compact={false} />
    </div>
  );
}
