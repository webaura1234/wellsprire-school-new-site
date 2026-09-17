"use client";
import { useEffect, useRef } from "react";
import { Crest } from "./brand";
const DRAW_END = 2380;
const BREATHE_END = DRAW_END + 370;
const SETTLE_DURATION = 900;
const SETTLE_START = BREATHE_END;
const WORD_DELAY = SETTLE_START + 300;
const MARKER_DELAY = SETTLE_START + 950;
const MARKER_DURATION = 400;
const SETTLED_AT = MARKER_DELAY + MARKER_DURATION;
const AUTO_ADVANCE_AFTER = 15000;
export default function CrestIntro() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panel = root.current;
    if (!panel) return;
    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;
    let played = true;
    try {
      played = sessionStorage.getItem("wellspire-intro") === "seen";
      sessionStorage.setItem("wellspire-intro", "seen");
    } catch {}
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      played ||
      reduced ||
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType || "")
    ) {
      panel.removeAttribute("data-playing");
      delete document.documentElement.dataset.intro;
      document.documentElement.style.removeProperty("overflow");
      window.dispatchEvent(
        new CustomEvent("wellspire:gate", { detail: { active: false } }),
      );
      return;
    }
    const counter = panel.querySelector<HTMLElement>(".intro-counter");
    const word = panel.querySelector<HTMLElement>(".intro-word");
    const marker = panel.querySelector<HTMLElement>(".intro-marker");
    const reveal = panel.querySelector<HTMLElement>(".intro-reveal");
    if (!counter || !word || !marker || !reveal) return;
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
    // Phase A — the crest draws itself in.
    panel.querySelectorAll(".crest-laurel path").forEach((el) =>
      run(
        el,
        [
          { strokeDasharray: "1", strokeDashoffset: "1" },
          { strokeDasharray: "1", strokeDashoffset: "0" },
        ],
        { duration: 1300, easing: EASE_DRAW },
      ),
    );
    run(
      panel.querySelector(".crest-shield"),
      [
        { opacity: 0, transform: "scale(.94)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { delay: 1200, duration: 150 },
    );
    panel.querySelectorAll(".crest-quadrant").forEach((el, i) =>
      run(
        el,
        [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { delay: 1320 + i * 160, duration: 260, easing: EASE_DRAW },
      ),
    );
    run(
      panel.querySelector(".crest-sun"),
      [
        { opacity: 0, transform: "scale(.7)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { delay: 2060, duration: 320, easing: EASE_DRAW },
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
      delay: DRAW_END - 60,
      duration: 220,
    });
    // Phase B — the field drains to cream, and the name surfaces.
    run(
      panel.querySelector(".intro-field"),
      [{ backgroundColor: "#1c3b7e" }, { backgroundColor: "#faf8f4" }],
      { delay: SETTLE_START, duration: SETTLE_DURATION, easing: "ease" },
    );
    run(
      panel.querySelector(".intro-crest"),
      [{ color: "#faf8f4" }, { color: "#1c3b7e" }],
      { delay: SETTLE_START, duration: SETTLE_DURATION, easing: "ease" },
    );
    run(word, [{ color: "#faf8f4" }, { color: "#1c3b7e" }], {
      delay: SETTLE_START,
      duration: SETTLE_DURATION,
      easing: "ease",
    });
    const wordLines = word.querySelectorAll(".intro-word-line");
    wordLines.forEach((el, i) =>
      run(
        el,
        [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
        { delay: WORD_DELAY + i * 150, duration: 650, easing: EASE_DRAW },
      ),
    );
    run(marker, [{ opacity: 0 }, { opacity: 1 }], {
      delay: MARKER_DELAY,
      duration: MARKER_DURATION,
    });
    let settleTimer = 0;
    let advanceTimer = 0;
    settleTimer = window.setTimeout(() => {
      state = "settled";
    }, SETTLED_AT);
    // Phase C — the shield opens on the first invitation to scroll.
    const breakApart = () => {
      if (state !== "settled") return;
      state = "breaking";
      window.clearTimeout(advanceTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      const corners: [number, number][] = [
        [-58, -52],
        [58, -52],
        [-58, 52],
        [58, 52],
      ];
      const origins: [number, number, string][] = [
        [33, 37, ".6"],
        [63, 37, ".6"],
        [34, 73, ".57"],
        [63, 73, ".57"],
      ];
      panel.querySelectorAll(".crest-quadrant").forEach((el, i) => {
        const [tx, ty, scale] = origins[i];
        const [dx, dy] = corners[i];
        run(
          el,
          [
            { transform: `translate(${tx}px,${ty}px) scale(${scale})`, opacity: 1 },
            {
              transform: `translate(${tx + dx}px,${ty + dy}px) scale(${scale})`,
              opacity: 0,
            },
          ],
          { delay: i * 70, duration: 620, easing: EASE_OUT },
        );
      });
      run(panel.querySelector(".crest-shield"), [{ opacity: 1 }, { opacity: 0 }], {
        delay: 60,
        duration: 700,
        easing: EASE_OUT,
      });
      run(panel.querySelector(".crest-sun"), [{ opacity: 1 }, { opacity: 0 }], {
        delay: 40,
        duration: 500,
        easing: EASE_OUT,
      });
      run(
        panel.querySelector(".crest-laurel"),
        [
          { transform: "scale(1)", opacity: 1, offset: 0 },
          { transform: "scale(1.05)", opacity: 1, offset: 0.7 },
          { transform: "scale(1.06)", opacity: 0, offset: 1 },
        ],
        { duration: 950, easing: EASE_OUT },
      );
      run(word, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
      run(marker, [{ opacity: 1 }, { opacity: 0 }], { duration: 180 });
      run(
        panel.querySelector(".intro-field"),
        [{ opacity: 1 }, { opacity: 0 }],
        { delay: 120, duration: 700, easing: EASE_OUT },
      );
      const revealLines = reveal.querySelectorAll(".intro-reveal-line");
      revealLines.forEach((el, i) =>
        run(
          el,
          [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
          { delay: 300 + i * 120, duration: 650, easing: EASE_DRAW },
        ),
      );
      run(reveal, [{ opacity: 1 }, { opacity: 0 }], {
        delay: 1370,
        duration: 250,
      });
      window.setTimeout(() => {
        state = "done";
        panel.removeAttribute("data-playing");
        delete document.documentElement.dataset.intro;
        document.documentElement.style.removeProperty("overflow");
        gateEvent(false);
      }, 1650);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        if (state === "settled") breakApart();
        else finish();
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
        else finish();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finish();
        return;
      }
      if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) {
        e.preventDefault();
        if (state === "settled") breakApart();
        else finish();
      }
    };
    const finish = () => {
      window.clearTimeout(settleTimer);
      window.clearTimeout(advanceTimer);
      cancelAnimationFrame(raf);
      animations.forEach((a) => a.cancel());
      panel.removeEventListener("click", finish);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      panel.removeAttribute("data-playing");
      delete document.documentElement.dataset.intro;
      document.documentElement.style.removeProperty("overflow");
      gateEvent(false);
      state = "done";
    };
    panel.addEventListener("click", finish);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    advanceTimer = window.setTimeout(() => {
      if (state === "settled") breakApart();
    }, AUTO_ADVANCE_AFTER);
    return finish;
  }, []);
  return (
    <div ref={root} className="crest-intro" aria-hidden="true">
      <div className="intro-field" />
      <div className="intro-crest">
        <Crest />
      </div>
      <span className="intro-counter">0</span>
      <div className="intro-word">
        <span className="intro-word-mask">
          <span className="intro-word-line intro-name">wellspire</span>
        </span>
        <span className="intro-word-mask">
          <span className="intro-word-line intro-tagline">
            Inspiring Lifelong Learners
          </span>
        </span>
      </div>
      <span className="intro-marker">
        <span className="intro-marker-dot" />
      </span>
      <div className="intro-reveal">
        <span className="intro-reveal-mask">
          <span className="intro-reveal-line">Learn deeply.</span>
        </span>
        <span className="intro-reveal-mask">
          <span className="intro-reveal-line">
            Live <em>fully.</em>
          </span>
        </span>
      </div>
    </div>
  );
}
