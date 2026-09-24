"use client";

import Image from "next/image";

const DRAW_END = 1500;
const BREATHE_END = DRAW_END + 250;
const MARKER_DELAY = BREATHE_END + 150;
const MARKER_DURATION = 300;
const SETTLED_AT = MARKER_DELAY + MARKER_DURATION;
/** Hold the settled logo briefly, then open into the homepage (~4s total). */
const IDLE_BEFORE_HOME = 900;
const EXIT_DURATION = 900;
const INTRO_SEEN_KEY = "wellspire-intro";
/** Full-color lockup on cream — same draw motion as the former navy phase. */
const LOGO_SRC = "/images/wellspire-intro-logo-color.png?v=2";

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "seen");
  } catch {}
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "seen";
  } catch {
    return true;
  }
}

let activeStop: (() => void) | null = null;

/**
 * Play the logo intro on cream, then after a short idle open the homepage.
 * Scroll / keys still skip early. Safe to call from School's useEffect.
 */
export function startCrestIntro(): () => void {
  // Replace any prior run (React Strict Mode remount).
  activeStop?.();
  activeStop = null;

  const panel = document.querySelector<HTMLDivElement>(".crest-intro");
  if (!panel) return () => {};

  const connection = (
    navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    }
  ).connection;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const forceIntro = new URLSearchParams(window.location.search).has(
    "forceIntro",
  );
  if (
    !forceIntro &&
    (hasSeenIntro() ||
      reduced ||
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType || ""))
  ) {
    panel.removeAttribute("data-playing");
    delete document.documentElement.dataset.intro;
    document.documentElement.style.removeProperty("overflow");
    window.dispatchEvent(
      new CustomEvent("wellspire:gate", { detail: { active: false } }),
    );
    return () => {};
  }

  const counter = panel.querySelector<HTMLElement>(".intro-counter");
  const marker = panel.querySelector<HTMLElement>(".intro-marker");
  const logo = panel.querySelector<HTMLElement>(".intro-logo");
  if (!counter || !marker || !logo) return () => {};

  panel.dataset.playing = "true";
  document.documentElement.dataset.intro = "playing";
  document.documentElement.style.overflow = "hidden";
  const gateEvent = (active: boolean) =>
    window.dispatchEvent(
      new CustomEvent("wellspire:gate", { detail: { active } }),
    );
  gateEvent(true);

  let state: "drawing" | "settled" | "breaking" | "done" = "drawing";
  const animations: Animation[] = [];
  const run = (
    el: Element | null,
    frames: Keyframe[],
    opts: KeyframeAnimationOptions,
  ) => {
    if (!el) return;
    animations.push(el.animate(frames, { fill: "both", ...opts }));
  };
  const EASE_DRAW = "cubic-bezier(.16,1,.3,1)";
  const EASE_OUT = "cubic-bezier(.22,1,.36,1)";

  // Same draw / breathe motion as before — on cream with the color lockup.
  run(
    logo,
    [
      { opacity: 0, transform: "scale(0.88)", offset: 0 },
      { opacity: 1, transform: "scale(1)", offset: 0.58 },
      { transform: "scale(1.035)", offset: 0.8 },
      { opacity: 1, transform: "scale(1)", offset: 1 },
    ],
    { duration: DRAW_END, easing: EASE_DRAW },
  );

  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    counter.textContent = String(
      Math.min(100, Math.round(((now - start) / DRAW_END) * 100)),
    );
    if (now - start < DRAW_END) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  run(counter, [{ opacity: 1 }, { opacity: 0 }], {
    delay: DRAW_END - 40,
    duration: 160,
  });

  run(marker, [{ opacity: 0 }, { opacity: 1 }], {
    delay: MARKER_DELAY,
    duration: MARKER_DURATION,
  });

  let settleTimer = 0;
  let advanceTimer = 0;
  let doneTimer = 0;

  const breakApart = () => {
    if (state !== "settled") return;
    state = "breaking";
    window.clearTimeout(advanceTimer);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("keydown", onKey);

    run(
      logo,
      [
        { transform: "scale(1)", opacity: 1, offset: 0 },
        { transform: "scale(1.08)", opacity: 1, offset: 0.55 },
        { transform: "scale(1.18)", opacity: 0, offset: 1 },
      ],
      { duration: 700, easing: EASE_OUT },
    );
    run(marker, [{ opacity: 1 }, { opacity: 0 }], { duration: 140 });
    run(
      panel.querySelector(".intro-field"),
      [{ opacity: 1 }, { opacity: 0 }],
      { delay: 80, duration: 550, easing: EASE_OUT },
    );
    doneTimer = window.setTimeout(() => {
      state = "done";
      panel.removeAttribute("data-playing");
      delete document.documentElement.dataset.intro;
      document.documentElement.style.removeProperty("overflow");
      gateEvent(false);
      markIntroSeen();
      if (activeStop === stop) activeStop = null;
    }, EXIT_DURATION);
  };

  const onWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      if (state === "settled") breakApart();
      else onSkip();
    }
  };
  let touchY = 0;
  const onTouchStart = (e: TouchEvent) => {
    touchY = e.touches[0]?.clientY ?? 0;
  };
  const onTouchMove = (e: TouchEvent) => {
    const y = e.touches[0]?.clientY ?? touchY;
    if (touchY - y > 12) {
      if (state === "settled") breakApart();
      else onSkip();
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onSkip();
      return;
    }
    if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) {
      e.preventDefault();
      if (state === "settled") breakApart();
      else onSkip();
    }
  };

  const teardown = (markSeen: boolean) => {
    window.clearTimeout(settleTimer);
    window.clearTimeout(advanceTimer);
    window.clearTimeout(doneTimer);
    cancelAnimationFrame(raf);
    animations.forEach((a) => a.cancel());
    panel.removeEventListener("click", onSkip);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("keydown", onKey);
    panel.removeAttribute("data-playing");
    delete document.documentElement.dataset.intro;
    document.documentElement.style.removeProperty("overflow");
    gateEvent(false);
    state = "done";
    if (markSeen) markIntroSeen();
  };

  const onSkip = () => {
    teardown(true);
    if (activeStop === stop) activeStop = null;
  };

  const stop = () => {
    // React unmount / remount — do not mark as seen.
    teardown(false);
    if (activeStop === stop) activeStop = null;
  };

  panel.addEventListener("click", onSkip);
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("keydown", onKey);

  settleTimer = window.setTimeout(() => {
    state = "settled";
    advanceTimer = window.setTimeout(() => {
      if (state === "settled") breakApart();
    }, IDLE_BEFORE_HOME);
  }, SETTLED_AT);

  activeStop = stop;
  return stop;
}

/** Presentational logo intro shell — playback is started from School. */
export default function CrestIntro() {
  return (
    <div className="crest-intro" aria-hidden="true">
      <div className="intro-field" />
      <div className="intro-crest">
        <Image
          src={LOGO_SRC}
          alt=""
          width={320}
          height={280}
          className="intro-logo"
          unoptimized
          priority
        />
      </div>
      <span className="intro-counter">0</span>
      <span className="intro-marker">
        <span className="intro-marker-dot" />
      </span>
    </div>
  );
}
