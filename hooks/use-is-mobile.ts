"use client";

import { useSyncExternalStore } from "react";

function subscribeMobile(breakpoint: number, onStoreChange: () => void) {
  const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

/** True when viewport is ≤767px. SSR snapshot is false (desktop-first). */
export function useIsMobile(breakpoint = 767) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMobile(breakpoint, onStoreChange),
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
    () => false,
  );
}
