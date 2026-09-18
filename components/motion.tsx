"use client";

/** Skip GSAP targets inside CSS IA gates when that gate is currently hidden. */
function isAnimatable(el: Element | null | undefined) {
  if (!el) return false;
  const gate = el.closest(".home-desktop-only, .home-mobile-only");
  if (!gate) return true;
  return getComputedStyle(gate as HTMLElement).display !== "none";
}

/**
 * Boot Lenis + GSAP ScrollTrigger home animations.
 * Plain function (no React hooks) — called from School's useEffect so it
 * always mounts even if a null-returning MotionSetup effect is skipped.
 */
export function startHomeMotion(): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMq = matchMedia("(max-width: 767px)");
  let cleanup = () => {};
  let mqTimer = 0;
  let generation = 0;

  const setup = () => {
    cleanup();
    const gen = ++generation;
    if (reduced.matches) {
      document.documentElement.dataset.motion = "reduced";
      return;
    }
    document.documentElement.dataset.motion = "setup";

    let cancelled = false;
    let desktopCleanup = () => {};
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
    document.querySelectorAll("[data-count]").forEach((el) => {
      if (!isAnimatable(el)) return;
      counterObserver.observe(el);
    });

    // Same GSAP/Lenis/ScrollTrigger path on all viewports so mobile matches
    // desktop animation style (including philosophy sticky pillar stack).
    const desktop = async () => {
      try {
        if (gen !== generation || cancelled) return;
        document.documentElement.dataset.motion = "importing";
        const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
          await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
            import("lenis"),
          ]);
        // Stale Strict-Mode / rebuild pass — do not touch live state.
        if (gen !== generation || cancelled) return;
        document.documentElement.dataset.motion = "ready";
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ duration: 1.05, anchors: false });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        (window as unknown as { lenis: typeof lenis }).lenis = lenis;
        (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger =
          ScrollTrigger;

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
        const onStRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onStRefresh);

        // Prefer the visible duplicate when desktop/mobile IA gates both exist.
        const handleAnchorClick = (e: MouseEvent) => {
          const anchor = (e.target as HTMLElement)?.closest?.(
            'a[href^="#"]',
          );
          if (!anchor) return;
          const href = anchor.getAttribute("href");
          if (!href || href === "#" || href.length < 2) return;
          const id = href.slice(1);
          let target: Element | null = null;
          try {
            const nodes = document.querySelectorAll(
              `[id="${CSS.escape(id)}"]`,
            );
            target =
              Array.from(nodes).find(
                (el) =>
                  getComputedStyle(el as HTMLElement).display !== "none",
              ) || document.getElementById(id);
          } catch {
            target = document.getElementById(id);
          }
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target as HTMLElement, { offset: -70 });
          }
        };
        document.addEventListener("click", handleAnchorClick);

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        document.fonts?.ready?.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });

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
        const delayed: number[] = [];
        const ctx = gsap.context(() => {
          ScrollTrigger.refresh();

          gsap.utils
            .toArray<HTMLElement>("h1,h2:not(.manifesto),h3,h4")
            .forEach((el) => {
              if (!isAnimatable(el)) return;
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
                    (l) =>
                      ((l as HTMLElement).style.willChange = "transform"),
                  ),
                onComplete: () =>
                  lines.forEach((l) => {
                    (l as HTMLElement).style.removeProperty("will-change");
                    (l as HTMLElement).style.removeProperty("transform");
                  }),
              });
            });

          const manifesto =
            document.querySelector<HTMLElement>(".manifesto");
          if (isAnimatable(manifesto)) {
            gsap.fromTo(
              manifesto!.querySelectorAll(".manifesto-word"),
              { opacity: 0.3 },
              {
                opacity: 1,
                stagger: 0.07,
                ease: "none",
                scrollTrigger: {
                  trigger: manifesto!,
                  start: "top 80%",
                  end: "bottom 35%",
                  scrub: true,
                },
              },
            );
          }

          const cards = gsap.utils
            .toArray<HTMLElement>(".pillar-grid .pillar")
            .filter((card) => isAnimatable(card));
          // Same sticky stack + scale/dim scrub on all viewports. End offset
          // follows each card's CSS `top` (108px desktop, header var on mobile).
          if (cards.length > 1) {
            const stickyOffset = () => {
              const t = parseFloat(getComputedStyle(cards[0]).top);
              return Number.isFinite(t) ? t : 108;
            };
            cards.slice(0, -1).forEach((card, i) => {
              const next = cards[i + 1];
              const dimmer = card.querySelector(".pillar-dimmer");
              const triggerOpts = {
                trigger: next,
                start: "top bottom",
                end: () => `top ${stickyOffset()}px`,
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

          refreshPillars = () => {
            if (!cancelled) ScrollTrigger.refresh();
          };
          window.addEventListener("load", refreshPillars);
          document
            .querySelectorAll<HTMLImageElement>(".pillar-grid img")
            .forEach((img) => {
              if (img.complete) return;
              img.addEventListener("load", refreshPillars, { once: true });
            });
          requestAnimationFrame(refreshPillars);
          delayed.push(
            window.setTimeout(refreshPillars, 120),
            window.setTimeout(refreshPillars, 400),
          );

          gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((el) => {
            if (!isAnimatable(el)) return;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true,
              },
            });
            tl.fromTo(
              el,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0 0)",
                duration: 0.9,
                ease: "expo.out",
              },
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

          const timeline = document.querySelector<HTMLElement>(".timeline");
          const timelineLine =
            document.querySelector<SVGPathElement>(".timeline-line");
          if (isAnimatable(timeline) && timelineLine) {
            gsap.fromTo(
              timelineLine,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: timeline!,
                  start: "top 80%",
                  once: true,
                },
              },
            );
          }
        });

        desktopCleanup = () => {
          delayed.forEach(clearTimeout);
          ctx.revert();
          gsap.ticker.remove(tick);
          ScrollTrigger.removeEventListener("refresh", onStRefresh);
          window.removeEventListener("wellspire:gate", onGate);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("load", refreshPillars);
          document.removeEventListener("click", handleAnchorClick);
          lenis.destroy();
          const w = window as unknown as { lenis?: typeof lenis };
          if (w.lenis === lenis) delete w.lenis;
        };
      } catch (err) {
        document.documentElement.dataset.motion = "error";
        console.error("[wellspire-motion]", err);
      }
    };

    void desktop();
    cleanup = () => {
      cancelled = true;
      desktopCleanup();
      counterObserver.disconnect();
      rafs.forEach(cancelAnimationFrame);
    };
  };

  const onMobileChange = () => {
    window.clearTimeout(mqTimer);
    mqTimer = window.setTimeout(setup, 50);
  };

  setup();
  reduced.addEventListener("change", setup);
  mobileMq.addEventListener("change", onMobileChange);

  return () => {
    reduced.removeEventListener("change", setup);
    mobileMq.removeEventListener("change", onMobileChange);
    window.clearTimeout(mqTimer);
    cleanup();
  };
}
