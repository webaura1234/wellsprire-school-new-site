"use client";
import { useEffect } from "react";
export default function MotionSetup() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (reduced.matches) return;
      let cancelled = false;
      let desktopCleanup = () => {};
      const animations: Animation[] = [];
      const rafs = new Set<number>();
      const counterObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            counterObserver.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            const target = Number(el.dataset.count);
            const formatter = new Intl.NumberFormat("en-IN", {
              maximumFractionDigits: 1,
            });
            const begin = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - begin) / 1500);
              el.textContent = formatter.format(
                target * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)),
              );
              if (p < 1) {
                const id = requestAnimationFrame(step);
                rafs.add(id);
              }
            };
            const id = requestAnimationFrame(step);
            rafs.add(id);
          }),
        { threshold: 0.6 },
      );
      document
        .querySelectorAll("[data-count]")
        .forEach((el) => counterObserver.observe(el));
      const mobile = !matchMedia("(min-width: 768px)").matches;
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            const el = entry.target;
            const isImage = el.matches("[data-curtain]");
            const targets = isImage
              ? [el]
              : Array.from(el.querySelectorAll(".heading-line"));
            targets.forEach((target, i) => {
              const animation = target.animate(
                isImage
                  ? [
                      { clipPath: "inset(0 0 100% 0)" },
                      { clipPath: "inset(0 0 0 0)" },
                    ]
                  : [
                      { transform: "translateY(110%)" },
                      { transform: "translateY(0)" },
                    ],
                {
                  duration: 800,
                  delay: i * 70,
                  easing: "cubic-bezier(.16,1,.3,1)",
                },
              );
              animations.push(animation);
            });
          }),
        { rootMargin: "0px 0px -20% 0px" },
      );
      if (mobile) {
        document
          .querySelectorAll("h2:not(.manifesto),h3,[data-curtain]")
          .forEach((el) => observer.observe(el));
      }
      const desktop = async () => {
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
          await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
            import("lenis"),
          ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, anchors: false });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        (window as unknown as { lenis: typeof lenis }).lenis = lenis;

        const scrollRoot = document.documentElement;
        ScrollTrigger.scrollerProxy(scrollRoot, {
          scrollTop(value) {
            if (arguments.length && typeof value === "number") {
              lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });
        ScrollTrigger.defaults({ scroller: scrollRoot });
        ScrollTrigger.addEventListener("refresh", () => lenis.resize());

        // Smooth scroll for in-page anchor links with header offset
        const handleAnchorClick = (e: MouseEvent) => {
          const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
          if (!anchor) return;
          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -70 });
          }
        };
        document.addEventListener("click", handleAnchorClick);

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        document.fonts?.ready?.then(() => ScrollTrigger.refresh());

        // The crest intro locks scroll while it plays; Lenis drives scroll via
        // JS and ignores plain `overflow: hidden`, so it needs its own pause.
        const onGate = (e: Event) => {
          const active = (e as CustomEvent<{ active: boolean }>).detail
            ?.active;
          if (active) lenis.stop();
          else {
            lenis.start();
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }
        };
        window.addEventListener("wellspire:gate", onGate);
        if (document.documentElement.dataset.intro === "playing") {
          lenis.stop();
        }
        let refreshPillars = () => ScrollTrigger.refresh();
        const ctx = gsap.context(() => {
          ScrollTrigger.refresh();
          gsap.utils
            .toArray<HTMLElement>("h1,h2:not(.manifesto),h3,h4")
            .forEach((el) => {
              const lines = el.querySelectorAll(".heading-line");
              if (!lines.length) return;
              gsap.from(lines, {
                yPercent: 110,
                duration: 0.8,
                stagger: 0.07,
                ease: "expo.out",
                scrollTrigger: el.closest(".hero")
                  ? undefined
                  : { trigger: el, start: "top 80%", once: true },
                onStart: () =>
                  lines.forEach(
                    (l) => ((l as HTMLElement).style.willChange = "transform"),
                  ),
                onComplete: () =>
                  lines.forEach((l) => {
                    (l as HTMLElement).style.removeProperty("will-change");
                    (l as HTMLElement).style.removeProperty("transform");
                  }),
              });
            });
          gsap.fromTo(
            ".manifesto-word",
            { opacity: 0.3 },
            {
              opacity: 1,
              stagger: 0.07,
              ease: "none",
              scrollTrigger: {
                trigger: ".manifesto",
                start: "top 80%",
                end: "bottom 35%",
                scrub: true,
              },
            },
          );
          const cards = gsap.utils.toArray<HTMLElement>(".pillar-grid .pillar");
          const pillarStackEnabled = matchMedia("(min-width: 768px)").matches;
          if (pillarStackEnabled && cards.length > 1) {
            cards.slice(0, -1).forEach((card, i) => {
              const next = cards[i + 1];
              const dimmer = card.querySelector(".pillar-dimmer");
              const triggerOpts = {
                trigger: next,
                start: "top bottom",
                end: "top 108px",
                scrub: 0.35,
                invalidateOnRefresh: true,
              };
              gsap.to(card, {
                scale: 0.94,
                ease: "none",
                scrollTrigger: triggerOpts,
              });
              if (dimmer) {
                gsap.to(dimmer, {
                  opacity: 0.45,
                  ease: "none",
                  scrollTrigger: { ...triggerOpts },
                });
              }
            });
          }
          refreshPillars = () => ScrollTrigger.refresh();
          window.addEventListener("load", refreshPillars);
          document
            .querySelectorAll<HTMLImageElement>(".pillar-grid img")
            .forEach((img) => {
              if (img.complete) return;
              img.addEventListener("load", refreshPillars, { once: true });
            });
          requestAnimationFrame(refreshPillars);
          gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((el) => {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
            tl.fromTo(
              el,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0 0)", duration: 0.9, ease: "expo.out" },
            );
            const img = el.querySelector("img");
            if (img)
              tl.fromTo(
                img,
                { scale: 1.15 },
                { scale: 1, duration: 0.9, ease: "expo.out" },
                0,
              );
          });
          gsap.fromTo(
            ".timeline-line",
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                once: true,
              },
            },
          );

        });
        desktopCleanup = () => {
          ctx.revert();
          gsap.ticker.remove(tick);
          window.removeEventListener("wellspire:gate", onGate);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("load", refreshPillars);
          document.removeEventListener("click", handleAnchorClick);
          lenis.destroy();
        };
      };
      if (!mobile) void desktop();
      // Mobile mission reveal is scroll-position driven without shipping GSAP.
      let scrollRaf = 0;
      const mission = document.querySelector(".manifesto");
      const words = Array.from(
        document.querySelectorAll<HTMLElement>(".manifesto-word"),
      );
      const updateMission = () => {
        if (scrollRaf || !mobile) return;
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          if (!mission) return;
          const box = mission.getBoundingClientRect();
          const progress = Math.max(
            0,
            Math.min(
              1,
              (innerHeight * 0.8 - box.top) / (box.height + innerHeight * 0.45),
            ),
          );
          words.forEach(
            (w, i) =>
              (w.style.opacity = String(
                0.3 +
                  0.7 * Math.max(0, Math.min(1, progress * words.length - i)),
              )),
          );
        });
      };
      if (mobile) {
        window.addEventListener("scroll", updateMission, { passive: true });
        updateMission();
      }
      cleanup = () => {
        cancelled = true;
        desktopCleanup();
        observer.disconnect();
        counterObserver.disconnect();
        animations.forEach((a) => a.cancel());
        rafs.forEach(cancelAnimationFrame);
        cancelAnimationFrame(scrollRaf);
        window.removeEventListener("scroll", updateMission);
        words.forEach((w) => w.style.removeProperty("opacity"));
      };
    };
    setup();
    reduced.addEventListener("change", setup);
    return () => {
      reduced.removeEventListener("change", setup);
      cleanup();
    };
  }, []);
  return null;
}
