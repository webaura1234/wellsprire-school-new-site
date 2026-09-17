"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function RouteTransition() {
  const panel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const animation = el.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      {
        duration: busy.current ? 450 : 0,
        easing: "cubic-bezier(.87,0,.13,1)",
        fill: "forwards",
      },
    );
    busy.current = false;
    return () => animation.cancel();
  }, [pathname]);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let failSafe: ReturnType<typeof setTimeout>;
    let animation: Animation | undefined;
    const click = (event: MouseEvent) => {
      const a = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (
        !a ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        a.target ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href);
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      if (busy.current) return;
      busy.current = true;
      animation = panel.current?.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
          duration: 450,
          fill: "forwards",
          easing: "cubic-bezier(.87,0,.13,1)",
        },
      );
      router.prefetch(url.pathname);
      timer = setTimeout(() => {
        window.scrollTo(0, 0);
        router.push(url.pathname + url.search + url.hash);
      }, 450);
      failSafe = setTimeout(() => {
        animation?.cancel();
        busy.current = false;
      }, 1800);
    };
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("click", click, true);
      clearTimeout(timer);
      clearTimeout(failSafe);
      animation?.cancel();
    };
  }, [router]);
  return <div ref={panel} className="route-panel" aria-hidden="true" />;
}
