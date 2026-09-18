"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Heading } from "./heading";
import { exampleResults } from "@/lib/school";
export function ExampleNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="example-note">
      <span>ILLUSTRATIVE DATA</span>{" "}
      {children ||
        "Design examples only. These are not verified Wellspire figures."}
    </p>
  );
}
export function Stats() {
  return (
    <section
      className="school-stats"
      aria-label="Campus and curriculum snapshot"
    >
      <ExampleNote>
        Campus size, values, spaces, and curriculum strengths from the school
        brief.
      </ExampleNote>
      <div className="stats-grid">
        {[
          [10, "Acre green campus", "Where children thrive"],
          [6, "Core values", "Integrity to excellence"],
          [8, "Signature spaces", "Labs, farm, studio, field"],
          [4, "Curriculum strengths", "CBSE · Values · Skills · Character"],
        ].map(([n, label, copy]) => (
          <div key={String(label)}>
            <span className="stat-value" data-count={n}>
              {n}
            </span>
            <h3>{label}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Results() {
  const [year, setYear] = useState("2025–26");
  return (
    <section className="results-new section" id="results">
      <div className="section-heading">
        <div>
          <p className="eyebrow">06 — PROGRESS, PRESENTED PLAINLY</p>
          <Heading>
            Progress, not
            <br />
            <em>pressure.</em>
          </Heading>
        </div>
        <label className="year-picker">
          Academic year
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {["2025–26", "2024–25", "2023–24"].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <ExampleNote>
        Wellspire currently offers Nursery–Grade 7. Class X/XII figures below
        are format samples only — not school board results.
      </ExampleNote>
      <div className="board-grid" key={year}>
        {exampleResults
          .filter((r) => r.year === year)
          .map((r) => (
            <article key={r.class}>
              <span className="eyebrow">
                CLASS {r.class} / {r.year}
              </span>
              <div className="pass-number">
                <span
                  data-count={Number(
                    ((r.passed / r.registered) * 100).toFixed(1),
                  )}
                >
                  {((r.passed / r.registered) * 100).toFixed(1)}
                </span>
                <span>%</span>
              </div>
              <p>Pass percentage</p>
              <dl>
                <div>
                  <dt>Registered / passed</dt>
                  <dd>
                    {r.registered} / {r.passed}
                  </dd>
                </div>
                <div>
                  <dt>Students above 90%</dt>
                  <dd>{r.above90}</dd>
                </div>
                <div>
                  <dt>Highest score</dt>
                  <dd>{r.topper}%</dd>
                </div>
              </dl>
            </article>
          ))}
      </div>
      <div className="subject-chart">
        <div>
          <h3>Subject averages</h3>
          <p>Illustrative percentages · {year}</p>
        </div>
        {["English", "Mathematics", "Science", "Social Science"].map(
          (subject, i) => {
            const values =
              year === "2025–26"
                ? [88, 86, 89, 91]
                : year === "2024–25"
                  ? [86, 84, 87, 89]
                  : [84, 82, 85, 87];
            return (
              <div className="subject-row" key={subject}>
                <span>{subject}</span>
                <div className="bar-track">
                  <div style={{ transform: `scaleX(${values[i] / 100})` }} />
                </div>
                <span>{values[i]}%</span>
              </div>
            );
          },
        )}
      </div>
      <a className="text-link" href="/mandatory-public-disclosure">
        Read the official disclosure register <ArrowUpRight size={18} />
      </a>
    </section>
  );
}

const quotes = [
  {
    quote:
      "She used to tell us what she finished. Now she tells us what she wants to find out next.",
    name: "A parent’s perspective",
    role: "EXAMPLE · PARENT, PRIMARY",
  },
  {
    quote:
      "Progress against yesterday, not against someone else — that is how children grow here.",
    name: "A teacher’s perspective",
    role: "EXAMPLE · TEACHER",
  },
  {
    quote:
      "Academics, arts, sports, and character — valued equally. That is the difference families feel.",
    name: "A parent’s perspective",
    role: "EXAMPLE · PARENT, MIDDLE SCHOOL",
  },
];
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const start = useRef(0);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setAuto(!media.matches);
    const update = () => setAuto(!media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || !auto) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      7000,
    );
    return () => clearInterval(id);
  }, [paused, auto]);
  return (
    <section
      className="testimonials section"
      aria-roledescription="carousel"
      aria-label="Community perspectives"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          setPaused(false);
      }}
      onTouchStart={(e) => {
        start.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - start.current;
        if (Math.abs(dx) > 40) setIndex((i) => (i + (dx < 0 ? 1 : 2)) % 3);
        setPaused(false);
      }}
    >
      <div>
        <p className="eyebrow">08 — THE VOICES AROUND US</p>
        <ExampleNote>
          Sample quotations for design review; these are not collected
          testimonials.
        </ExampleNote>
      </div>
      <div className="quote-window">
        <div
          key={index}
          className="quote-slide"
          aria-live={paused || !auto ? "polite" : "off"}
        >
          <blockquote>“{quotes[index].quote}”</blockquote>
          <p>{quotes[index].name}</p>
          <span className="eyebrow">{quotes[index].role}</span>
        </div>
        <div className="story-controls">
          <span>0{index + 1} / 03</span>
          <button
            aria-label={auto ? "Pause testimonials" : "Play testimonials"}
            onClick={() => setAuto(!auto)}
          >
            {auto ? "Pause" : "Play"}
          </button>
          <button
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i + 2) % 3)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % 3)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
