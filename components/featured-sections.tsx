"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Award,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Bus,
  HeartPulse,
  Users,
} from "lucide-react";
import { Spire } from "./brand";
import { Heading } from "./heading";
import { photos } from "@/lib/content";
import { homeLearningHighlights } from "@/lib/programmes";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const recognitions = [
    {
      badge: "CURRICULUM",
      title: "Global Curriculum",
      org: "UK, Cambridge & key CBSE strengths",
      icon: GraduationCap,
    },
    {
      badge: "VALUES",
      title: "Strong Values",
      org: "Integrity, wellness, inspiration, excellence",
      icon: Sparkles,
    },
    {
      badge: "CAMPUS",
      title: "Safe Green Campus",
      org: "10 acres, child-friendly",
      icon: CheckCircle2,
    },
    {
      badge: "LEADERSHIP",
      title: "Experienced Leadership",
      org: "Values, excellence, and genuine care",
      icon: Award,
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const desktop = matchMedia("(min-width: 768px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    let scrollCleanup = () => {};

    const teardown = () => {
      observer?.disconnect();
      observer = null;
      scrollCleanup();
      scrollCleanup = () => {};
      section.classList.remove("trust-cards-animate");
      section
        .querySelectorAll(".trust-card.is-revealed")
        .forEach((el) => el.classList.remove("is-revealed"));
    };

    const revealIfVisible = (card: HTMLElement) => {
      if (card.classList.contains("is-revealed")) return;
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible = Math.max(
        0,
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0),
      );
      const visibleRatio = visible / Math.max(rect.height, 1);
      if (visibleRatio >= 0.2) {
        card.classList.add("is-revealed");
      }
    };

    const setup = () => {
      teardown();
      if (desktop.matches || reduced.matches) return;

      section.classList.add("trust-cards-animate");
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".trust-card"),
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );
      cards.forEach((card) => observer?.observe(card));

      const onScroll = () => {
        cards.forEach((card) => {
          if (!card.classList.contains("is-revealed")) revealIfVisible(card);
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      let lenisOff = () => {};
      const bindLenis = () => {
        const lenis = (
          window as Window & { lenis?: { on?: Function; off?: Function } }
        ).lenis;
        if (!lenis?.on) return false;
        lenis.on("scroll", onScroll);
        lenisOff = () => lenis.off?.("scroll", onScroll);
        return true;
      };
      bindLenis();
      let tries = 0;
      const wait = window.setInterval(() => {
        if (bindLenis() || ++tries > 40) window.clearInterval(wait);
      }, 100);

      requestAnimationFrame(onScroll);
      scrollCleanup = () => {
        window.clearInterval(wait);
        window.removeEventListener("scroll", onScroll);
        lenisOff();
      };
    };

    setup();
    desktop.addEventListener("change", setup);
    reduced.addEventListener("change", setup);
    return () => {
      desktop.removeEventListener("change", setup);
      reduced.removeEventListener("change", setup);
      teardown();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section trust-section"
      id="trust"
      aria-label="What makes Wellspire different"
    >
      <div className="section-heading">
        <div>
          <Eyebrow>WHY WELLSPIRE</Eyebrow>
          <Heading>
            What Families
            <br />
            <em>Trust Us With.</em>
          </Heading>
        </div>
        <div className="section-subtext">
          <p>
            A commitment to excellence across curriculum, values, campus, and
            leadership.
          </p>
        </div>
      </div>

      <div className="trust-grid">
        {recognitions.map((item, index) => {
          const Icon = item.icon;
          const fromRight = index % 2 === 0;
          return (
            <div
              className="trust-card"
              key={item.title}
              data-enter={fromRight ? "right" : "left"}
            >
              <div className="trust-card-icon">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <div className="trust-card-content">
                <span className="trust-badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.org}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function AboutWellspireSection({
  philosophyHref = "#pillars",
}: {
  philosophyHref?: string;
}) {
  return (
    <section className="intro section" id="about">
      <div>
        <Eyebrow>ABOUT WELLSPIRE</Eyebrow>
        <p className="side-note">
          Integrity · Wellness · Innovation
          <br />
          Inspiration · Global Citizenship · Excellence
        </p>
        <Spire className="intro-spire" />
      </div>
      <div>
        <h2 className="manifesto">
          {"To shape a generation of well-rounded individuals — bright in intellect, bold in sport, alive in the arts, rooted in culture, and driven by values — who will rise to lead with balance, empathy, and excellence."
            .split(" ")
            .map((w, i) => (
              <span className="manifesto-word" key={i}>
                {w}{" "}
              </span>
            ))}
        </h2>
        <div className="intro-bottom">
          <p>
            The name Wellspire joins well-being and inspiration. We empower
            every child to learn deeply, live fully, and lead with purpose —
            through a balanced education that values academics, arts, sports,
            and character equally.
          </p>
          <a href={philosophyHref} className="text-link">
            Our philosophy <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CampusExperienceSection() {
  return (
    <section className="safety section">
      <div>
        <Eyebrow>CAMPUS EXPERIENCE</Eyebrow>
        <Heading>
          Safe. Green.
          <br />
          <em>Child-friendly.</em>
        </Heading>
        <p>Nature is part of everyday learning — not an add-on.</p>
      </div>
      <div className="safety-grid">
        {(
          [
            [
              ShieldCheck,
              "10-acre green campus",
              "Open grounds and green exploration, built for children to thrive.",
            ],
            [
              Bus,
              "GPS-enabled transport",
              "Tracked routes and child-friendly travel to and from campus.",
            ],
            [
              HeartPulse,
              "Air-conditioned classrooms",
              "Calm, comfortable rooms with natural light and ventilation.",
            ],
            [
              Users,
              "Safe infrastructure",
              "A child-friendly campus designed for everyday care and belonging.",
            ],
          ] as const
        ).map(([Icon, title, text]) => (
          <div key={title}>
            <Icon size={27} strokeWidth={1.25} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PrincipalMessage({
  onExplore,
  philosophyHref = "#pillars",
}: {
  onExplore: () => void;
  philosophyHref?: string;
}) {
  return (
    <section
      className="section principal-section"
      id="leadership"
      aria-label="Message from the Head of School"
    >
      <div className="principal-grid">
        <div className="principal-visual">
          <div className="gold-bracket-frame">
            <div className="principal-photo-wrap">
              <Image
                src={photos.building}
                alt="Wellspire International School campus"
                fill
                sizes="(max-width: 768px) 88vw, 40vw"
                className="principal-photo"
              />
              <div className="photo-corner-tag">
                <Sparkles size={11} className="text-gold" />
                <span>LEADERSHIP</span>
              </div>
              <aside className="principal-signature-card">
                <span className="signature-monogram" aria-hidden="true">
                  VL
                </span>
                <div className="signature-copy">
                  <div className="signature-header">
                    <span className="signature-name">Ms Vijaya Lakshmi</span>
                    <span className="signature-degree">MBA, M.Com, M.Ed</span>
                  </div>
                  <p className="signature-title">
                    Principal, Wellspire International School
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="principal-content">
          <Eyebrow>LEADERSHIP</Eyebrow>
          <Heading as="h2">
            A message from
            <br />
            <em>our Principal.</em>
          </Heading>

          <blockquote className="principal-quote">
            “At Wellspire, education is never about numbers—it is about each child.
            Their curiosity, courage, creativity, and dreams.”
          </blockquote>

          <div className="principal-text">
            <p>
              With 15 years leading schools and shaping curriculum, I have seen
              children flourish when they feel safe, valued, and inspired. Every
              classroom and open corner is made to nurture mind, body, and soul.
            </p>
          </div>

          <div className="principal-commitments">
            <div className="commitment-item">
              <span className="commitment-bullet">✦</span>
              <div>
                <strong>15 years</strong>
                <p>Leading schools. Shaping academics.</p>
              </div>
            </div>
            <div className="commitment-item">
              <span className="commitment-bullet">✦</span>
              <div>
                <strong>A pace of their own</strong>
                <p>Guided with trust, not pressure.</p>
              </div>
            </div>
            <div className="commitment-item">
              <span className="commitment-bullet">✦</span>
              <div>
                <strong>We shape lives</strong>
                <p>We do not merely educate minds.</p>
              </div>
            </div>
          </div>

          <div className="principal-actions">
            <button className="button dark" onClick={onExplore}>
              Connect with our leadership <ArrowUpRight size={16} />
            </button>
            <a href={philosophyHref} className="text-link">
              Explore our philosophy <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GlobalHorizons() {
  return (
    <section
      className="section global-section"
      id="global"
      aria-label="Learning highlights"
    >
      <div className="section-heading">
        <div>
          <Eyebrow>03 — LEARNING HIGHLIGHTS</Eyebrow>
          <Heading>
            Learning designed
            <br />
            <em>for the future.</em>
          </Heading>
        </div>
        <div className="section-subtext">
          <p>
            Programme titles only on the home page — tap a card to explore
            Learning Beyond Classrooms.
          </p>
          <a className="text-link" href="#learning-beyond">
            Learning beyond classrooms <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="global-grid global-grid--highlights">
        {homeLearningHighlights.map((card) => (
          <a
            className="global-card global-card--title-only"
            href="#learning-beyond"
            key={card.title}
          >
            <div className="global-card-image">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width:768px) 90vw, (max-width:1200px) 45vw, 24vw"
              />
              <span className="global-card-badge">{card.badge}</span>
              <span className="global-card-stat">{card.tag}</span>
            </div>
            <div className="global-card-body">
              <h3>{card.title}</h3>
            </div>
          </a>
        ))}
      </div>
      <div className="mobile-more-wrap">
        <a className="mobile-more-btn" href="/learning-highlights">
          More highlights
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function OurTeamSection({
  onFounder,
}: {
  onFounder: (name: string) => void;
}) {
  const founders = [
    {
      name: "Mr Chamakura Bhoopal Reddy",
      degree: "B.Tech, MBA (London)",
      role: "Co-Founder & Chairperson",
      note: "Vice Chairman, CMR Engineering College — building Wellspire on decades of educational leadership.",
      image: photos.building,
    },
    {
      name: "Ms Shruthi Reddy",
      degree: "M.Tech",
      role: "Co-Founder & Director",
      note: "Potential is Limitless — a balanced, holistic learning ecosystem for every child.",
      image: photos.campus,
    },
  ];

  return (
    <section className="section team-section" id="team" aria-label="Our team">
      <div className="section-heading">
        <div>
          <Eyebrow>OUR TEAM</Eyebrow>
          <Heading>
            Management &
            <br />
            <em>leadership.</em>
          </Heading>
        </div>
        <p>
          A team rooted in strong values, professional excellence, and genuine
          care for children.
        </p>
      </div>
      <div className="team-founder-grid">
        {founders.map((person) => (
          <article className="team-founder-card" key={person.name}>
            <div className="team-founder-photo">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width:768px) 90vw, 42vw"
              />
            </div>
            <div className="team-founder-copy">
              <span className="eyebrow">MANAGEMENT</span>
              <h3>{person.name}</h3>
              <p className="team-founder-meta">
                {person.degree}
                <br />
                {person.role}
              </p>
              <p>{person.note}</p>
              <button
                type="button"
                className="text-link"
                onClick={() => onFounder(person.name)}
              >
                Read profile <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function UniversityDestinations({ onEnquire }: { onEnquire: () => void }) {
  const [filter, setFilter] = useState<"all" | "sports" | "arts" | "campus">("all");

  const activities = [
    {
      name: "Football & Basketball",
      country: "Fitness, teamwork & discipline",
      region: "sports",
      discipline: "Outdoor games and match play",
      rank: "SPORTS",
      stat: "Daily",
    },
    {
      name: "Martial Arts & Skating",
      country: "Strength, balance & focus",
      region: "sports",
      discipline: "Track, indoor games, specialised training",
      rank: "SPORTS",
      stat: "Weekly",
    },
    {
      name: "Art Studio",
      country: "Creativity & self-expression",
      region: "arts",
      discipline: "Visual making and looking closely",
      rank: "ARTS",
      stat: "Weekly",
    },
    {
      name: "Music & Dance",
      country: "Rhythm, confidence & culture",
      region: "arts",
      discipline: "Studio practice and performance",
      rank: "ARTS",
      stat: "Weekly",
    },
    {
      name: "Podcast Studio",
      country: "Storytelling & digital voice",
      region: "arts",
      discipline: "Listening, teamwork, articulation",
      rank: "ARTS",
      stat: "Guided",
    },
    {
      name: "Biophilic Learning Spaces",
      country: "Green corridors & calm corners",
      region: "campus",
      discipline: "Bird corners, open-air classrooms, farm",
      rank: "CAMPUS",
      stat: "Every Day",
    },
  ];

  const filteredActivities = activities.filter(
    (a) => filter === "all" || a.region === filter
  );

  return (
    <section className="section uni-section" id="placements" aria-label="Campus and creative life">
      <div className="section-heading">
        <div>
          <Eyebrow>08 — CAMPUS &amp; CREATIVE LIFE</Eyebrow>
          <Heading>
            Creative and sports
            <br />
            <em>excellence.</em>
          </Heading>
        </div>
        <div className="section-subtext">
          <p>
            Art, music, dance, sport, and biophilic spaces — every child finds
            a place to grow.
          </p>
          <button className="text-link" onClick={onEnquire}>
            Explore campus &amp; creative life <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div className="uni-kpi-grid">
        <div className="uni-kpi-card">
          <span className="uni-kpi-val">8</span>
          <strong>Signature Spaces</strong>
          <p>Labs, libraries, studios, farm, and field — in daily learning.</p>
        </div>
        <div className="uni-kpi-card">
          <span className="uni-kpi-val">10-Acre</span>
          <strong>Green Campus</strong>
          <p>Safe, child-friendly grounds where nature is part of the day.</p>
        </div>
        <div className="uni-kpi-card">
          <span className="uni-kpi-val">CBSE</span>
          <strong>Strengths Integrated</strong>
          <p>UK, Cambridge, and key CBSE strengths — with Indian values.</p>
        </div>
        <div className="uni-kpi-card">
          <span className="uni-kpi-val">Grade 1</span>
          <strong>STEAM Onwards</strong>
          <p>Creative problem-solving from Grade 1 onwards.</p>
        </div>
      </div>

      <div className="uni-filter-bar">
        <span className="uni-filter-title">Explore by category:</span>
        <div className="uni-filter-buttons">
          {[
            { id: "all", label: "All Activities" },
            { id: "sports", label: "Sports & Fitness" },
            { id: "arts", label: "Creative Arts" },
            { id: "campus", label: "Campus & Nature" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`uni-filter-btn ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id as typeof filter)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="uni-cards-grid">
        {filteredActivities.map((activity) => (
          <div className="uni-card" key={activity.name}>
            <div className="uni-card-header">
              <span className="uni-crest-icon">
                <GraduationCap size={16} />
              </span>
              <span className="uni-stat-pill">{activity.stat}</span>
            </div>
            <h3 className="uni-card-name">{activity.name}</h3>
            <p className="uni-card-country">{activity.country}</p>
            <div className="uni-card-footer">
              <span className="uni-discipline">{activity.discipline}</span>
              <span className="uni-rank-badge">{activity.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdmissionsCallout({
  onOpen,
  anchor = true,
}: {
  onOpen: (title: string) => void;
  /** When false, omit id so a mobile/desktop twin can own #admissions. */
  anchor?: boolean;
}) {
  return (
    <section
      className="admissions-callout-strip"
      id={anchor ? "admissions" : undefined}
      aria-label="Admissions priority enquiry"
    >
      <div className="callout-inner">
        <div className="callout-glow-orb" aria-hidden="true" />
        <div className="callout-text">
          <span className="callout-kicker">
            <span className="callout-dot" /> BEGIN THE JOURNEY · ACADEMIC SESSION 2026–27
          </span>
          <h2>Give your child a confident start.</h2>
          <p>
            Enquire now, book a campus visit, or speak with admissions.
          </p>
        </div>
        <div className="callout-actions">
          <button
            className="button callout-btn-primary"
            onClick={() => onOpen("Start an admissions enquiry")}
          >
            Enquire Now <ArrowUpRight size={16} />
          </button>
          <button
            className="button callout-btn-outline"
            onClick={() => onOpen("Plan a campus visit")}
          >
            Schedule a Visit <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
