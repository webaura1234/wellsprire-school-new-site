"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { QuadrantIcon } from "./brand";
import { Heading } from "./heading";
import { photos } from "@/lib/content";
import {
  chapterFromHeroTrack,
  getHeroHeaderHeight,
  isHeroPinActive,
  paintHeroChapter,
  scrollYForHeroChapter,
} from "@/lib/hero-chapter-sync";

const chapters = [
  {
    name: "Campus",
    word: "grounds",
    image: photos.campus,
    alt: "Wellspire School campus building and green lawn",
    note: "A campus where children thrive.",
    detail: "10 acres. Green, safe, and child-friendly.",
  },
  {
    name: "Classrooms",
    word: "learning",
    image: photos.classroom,
    alt: "Bright modern classroom with natural light and student workstations",
    note: "Smart, sunlit classrooms.",
    detail: "Air-conditioned rooms made for inquiry.",
  },
  {
    name: "Val-Ed Lab",
    word: "values",
    image: photos.storytellers,
    alt: "Value Education Lab for ethics, empathy, and leadership",
    note: "Values, lived — not lectured.",
    detail: "Ethics, empathy, and leadership through real-life situations.",
  },
  {
    name: "Computer Lab",
    word: "innovation",
    image: photos.computerLab,
    alt: "Computer lab with digital workstations and technology teaching stations",
    note: "Code, create, and think ahead.",
    detail: "AI, robotics, and digital literacy — hands-on.",
  },
];

const detailPanels = [
  {
    image: photos.classroom,
    alt: "A classroom inside the Wellspire campus",
  },
  {
    image: photos.earlyYears,
    alt: "Early years learning room",
  },
  {
    image: photos.earlyYears,
    alt: "A calm space for values and conversation",
  },
  {
    image: photos.classroom,
    alt: "Connected classroom learning alongside the computer lab",
  },
];

const currentScrollY = () => {
  const lenis = (window as Window & { lenis?: { scroll?: number } }).lenis;
  if (typeof lenis?.scroll === "number") return lenis.scroll;
  return window.scrollY;
};

export default function Hero() {
  const [chapter, setChapter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chapterRef = useRef(0);

  const current = chapters[chapter];

  const pushChapter = useCallback((next: number) => {
    if (next === chapterRef.current) return;
    chapterRef.current = next;
    paintHeroChapter(next, trackRef.current);
    setChapter(next);
  }, []);

  useEffect(() => {
    chapterRef.current = chapter;
  }, [chapter]);

  useEffect(() => {
    paintHeroChapter(0, trackRef.current);
  }, []);

  useEffect(() => {
    const syncHeaderVar = () => {
      document.documentElement.style.setProperty(
        "--hero-sticky-top",
        `${getHeroHeaderHeight()}px`,
      );
    };
    syncHeaderVar();
    window.addEventListener("resize", syncHeaderVar);
    return () => window.removeEventListener("resize", syncHeaderVar);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (!trackRef.current || !isHeroPinActive(trackRef.current)) return;
      const headerHeight = getHeroHeaderHeight();
      const scrolled =
        headerHeight - trackRef.current.getBoundingClientRect().top;
      if (scrolled > 40 || currentScrollY() > 48) return;
      const next = (chapterRef.current + 1) % chapters.length;
      pushChapter(next);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, pushChapter]);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const apply = () => {
      if (isClickingRef.current || !trackRef.current) return;
      if (!isHeroPinActive(trackRef.current)) return;
      const target = chapterFromHeroTrack(trackRef.current);
      if (target === null) return;
      pushChapter(target);
    };

    const tick = () => {
      if (cancelled) return;
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => apply();

    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let lenisCleanup = () => {};
    const bindLenis = () => {
      const lenis = (window as Window & { lenis?: { on?: Function; off?: Function } })
        .lenis;
      if (!lenis?.on) return false;
      lenis.on("scroll", onScroll);
      lenisCleanup = () => lenis.off?.("scroll", onScroll);
      return true;
    };

    bindLenis();
    let tries = 0;
    const wait = window.setInterval(() => {
      if (bindLenis() || ++tries > 100 || cancelled) window.clearInterval(wait);
    }, 100);

    const onWheel = () => {
      isClickingRef.current = false;
    };
    window.addEventListener("wheel", onWheel, { passive: true });

    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Math.abs(dx) < 48 && Math.abs(dy) < 48) return;
      isClickingRef.current = false;
      const next =
        Math.abs(dx) >= Math.abs(dy)
          ? dx < 0
            ? 1
            : -1
          : dy < 0
            ? 1
            : -1;
      pushChapter(Math.min(3, Math.max(0, chapterRef.current + next)));
    };
    const track = trackRef.current;
    track?.addEventListener("touchstart", onTouchStart, { passive: true });
    track?.addEventListener("touchend", onTouchEnd, { passive: true });

    const onLenisChapter = (event: Event) => {
      const next = (event as CustomEvent<{ chapter: number }>).detail.chapter;
      if (next === chapterRef.current) return;
      chapterRef.current = next;
      setChapter(next);
    };
    window.addEventListener(
      "wellspire:hero-chapter-sync",
      onLenisChapter as EventListener,
    );

    return () => {
      cancelled = true;
      window.clearInterval(wait);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel);
      track?.removeEventListener("touchstart", onTouchStart);
      track?.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener(
        "wellspire:hero-chapter-sync",
        onLenisChapter as EventListener,
      );
      lenisCleanup();
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [pushChapter]);

  const handleTabClick = useCallback(
    (i: number) => {
      pushChapter(i);
      if (typeof window === "undefined" || !trackRef.current) return;
      if (!isHeroPinActive(trackRef.current)) return;

      isClickingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickingRef.current = false;
      }, 900);

      const targetY = scrollYForHeroChapter(
        trackRef.current,
        i,
        currentScrollY(),
      );

      const lenis = (window as Window & { lenis?: { scrollTo?: Function } })
        .lenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(targetY, { duration: 0.85 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [pushChapter],
  );

  const handleScrollButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (chapter < chapters.length - 1) {
      handleTabClick(chapter + 1);
    } else {
      const nextEl =
        document.querySelector(".accreditation-ribbon-wrap") ||
        document.querySelector("#global") ||
        document.querySelector("#pillars");
      if (nextEl) {
        const lenis = (window as Window & { lenis?: { scrollTo?: Function } })
          .lenis;
        if (lenis?.scrollTo) {
          lenis.scrollTo(nextEl as HTMLElement, { offset: -70 });
        } else {
          nextEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="hero-scroll-track" ref={trackRef} data-hero-chapter={chapter}>
      <section
        className="hero prospectus-hero"
        aria-label="Welcome to Wellspire School"
      >
        <div className="hero-edition">
          <span>THE WELLSPIRE YEARS</span>
          <span>
            NURSERY — GRADE 7 <i /> MIND · BODY · SPIRIT
          </span>
        </div>
        <div className="hero-composition">
          <div className="hero-content">
            <p className="hero-kicker">
              <span /> INSPIRING LIFELONG LEARNERS
            </p>
            <Heading as="h1">
              Inspiring lifelong
              <br />
              <em>learners.</em>
            </Heading>
            <p className="hero-deck">Where curiosity meets confidence.</p>
            <div className="hero-introduction">
              <span className="intro-rule" />
              <p>Preparing children for life, not just exams.</p>
            </div>
          </div>
          <div className="hero-architecture">
            <div className="arch-outline" aria-hidden="true" />
            <div
              className="hero-photo-window"
              role="tabpanel"
              id="hero-chapter"
              aria-labelledby={`hero-tab-${chapter}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
            >
              {chapters.map((item, i) => (
                <div
                  key={item.name}
                  className={`hero-photo-panel ${i === chapter ? "is-active" : ""}`}
                  aria-hidden={i !== chapter}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority
                    fetchPriority={i === 0 ? "high" : "auto"}
                    sizes="(max-width:767px) 86vw, 42vw"
                    className="hero-photo"
                  />
                </div>
              ))}
              <span className="arch-footnote">
                A WINDOW INTO {current.name.toUpperCase()}
              </span>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <span>LEARN</span>
              <QuadrantIcon kind={chapter} />
              <span>BELONG · BECOME</span>
            </div>
            <div className="hero-annotation" aria-live="polite">
              <span className="annotation-number">0{chapter + 1}</span>
              <p>{current.note}</p>
            </div>
          </div>
          <div className="hero-marginalia">
            <span className="margin-label">
              ROOM FOR {current.word.toUpperCase()}
            </span>
            <div className="hero-detail-image">
              {detailPanels.map((item, i) => (
                <div
                  key={i}
                  className={`hero-detail-panel ${i === chapter ? "is-active" : ""}`}
                  aria-hidden={i !== chapter}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width:767px) 24vw, 12vw"
                  />
                </div>
              ))}
            </div>
            <span className="detail-caption">
              THE EVERYDAY
              <br />
              EXTRAORDINARY
            </span>
            <span className="margin-rule" />
            <p>{current.detail}</p>
          </div>
        </div>
        <div className="hero-chapters">
          <div className="chapter-invitation">
            <span className="chapter-kicker">
              <span className="kicker-dot" /> FOUR SPACES
            </span>
            <p>
              Rooted in values.
              <br />
              <em>Ready for the world.</em>
            </p>
          </div>
          <div
            className="chapter-tabs"
            role="tablist"
            aria-label="Explore campus, classrooms, Val-Ed Lab, and Computer Lab"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {chapters.map((item, i) => (
              <button
                key={item.name}
                id={`hero-tab-${i}`}
                role="tab"
                type="button"
                className={`pillar-tab ${chapter === i ? "is-active" : ""}`}
                aria-selected={chapter === i}
                aria-controls="hero-chapter"
                tabIndex={chapter === i ? 0 : -1}
                onClick={() => handleTabClick(i)}
                onKeyDown={(e) => {
                  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                    return;
                  e.preventDefault();
                  const total = chapters.length;
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? total - 1
                        : (i + (e.key === "ArrowRight" ? 1 : total - 1)) % total;
                  handleTabClick(next);
                  document.getElementById(`hero-tab-${next}`)?.focus();
                }}
              >
                <span className="tab-accent-line" />
                <div className="tab-icon-wrap">
                  <span className="tab-num">0{i + 1}</span>
                  <QuadrantIcon kind={i} className="tab-icon" />
                </div>
                <div className="tab-meta">
                  <span className="tab-title">{item.name}</span>
                  <span className="tab-sub">{item.word}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="scroll-button-wrap">
            <button
              type="button"
              className="hero-scroll"
              onClick={handleScrollButtonClick}
              aria-label={
                chapter < chapters.length - 1
                  ? `Scroll to ${chapters[chapter + 1].name}`
                  : "Discover the Wellspire approach"
              }
            >
              <ArrowDown size={19} strokeWidth={1.4} />
            </button>
            <span className="scroll-caption">SCROLL</span>
          </div>
        </div>
      </section>
    </div>
  );
}

