"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Plus,
  Minus,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { Brand, QuadrantIcon } from "./brand";
import { photos, stages } from "@/lib/content";
import { startHomeMotion } from "./motion";
import Hero from "./hero";
import CrestIntro, { startCrestIntro } from "./intro";
import { Heading } from "./heading";
import {
  CampusExperienceSection,
  GlobalHorizons,
  TrustSection,
} from "./featured-sections";
import {
  programmeDialogCopy,
  founderDialogCopy,
} from "@/lib/programmes";
import { school } from "@/lib/school";
import { DesktopNavDock } from "./desktop-nav-dock";
import { MobileMenuNav } from "./mobile-menu-nav";
import { SiteFooter } from "./site-footer";
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
const pillars = [
  [
    "Learning",
    "Enjoy learning.",
    "Joy of discovery — when children are curious, learning becomes self-driven.",
    photos.classroom,
  ],
  [
    "Independence",
    "Think independently.",
    "Analyse, question, evaluate, and reflect — conceptual understanding, not memorisation.",
    photos.computerLab,
  ],
  [
    "Life skills",
    "Build essential life skills.",
    "Communication, collaboration, resilience, adaptability, and responsibility.",
    photos.storytellers,
  ],
  [
    "Balance",
    "Grow into balanced individuals.",
    "Academics, arts, sports, and character — valued equally.",
    photos.earlyYears,
  ],
];
export default function School() {
  const [menu, setMenu] = useState(false);
  const [stage, setStage] = useState(0);
  const [dialog, setDialog] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [story, setStory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => startHomeMotion(), []);

  // Crest intro → 2s idle → auto-open homepage (scroll still skips).
  useEffect(() => {
    let stop = () => {};
    const id = requestAnimationFrame(() => {
      stop = startCrestIntro();
    });
    return () => {
      cancelAnimationFrame(id);
      stop();
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const delta = currentY - lastScrollY.current;

      // Check whether we have scrolled past/left the hero section
      const heroSection =
        document.querySelector<HTMLElement>(".hero-scroll-track") ||
        document.querySelector<HTMLElement>(".hero.prospectus-hero") ||
        document.querySelector<HTMLElement>(".hero");

      const headerEl = document.querySelector<HTMLElement>(".header");
      const headerHeight = headerEl?.offsetHeight ?? 96;

      let leftHero = false;
      if (heroSection) {
        // When bottom of hero track passes the header, the user has exited the hero
        leftHero = heroSection.getBoundingClientRect().bottom <= headerHeight + 30;
      } else {
        leftHero = currentY > 1200;
      }

      if (!leftHero) {
        // While within the hero section: navbar remains in its normal, full-sized, static state
        setScrolled(false);
        setHidden(false);
        setActiveSection("");
      } else {
        // After leaving the hero section: navbar becomes dynamic!
        setScrolled(true);

        // Hide on scroll down, show on scroll up
        if (heroSection && heroSection.getBoundingClientRect().bottom > -120) {
          // Grace zone immediately upon exiting hero: reveal compact navbar
          setHidden(false);
        } else if (Math.abs(delta) > 6) {
          if (delta > 0) {
            // Scrolling down away from hero: slide up
            setHidden(true);
          } else if (delta < 0) {
            // Scrolling up towards hero: slide down
            setHidden(false);
          }
        }

        // Active section scroll spy
        if (docHeight > 0 && currentY >= docHeight - 120) {
          setActiveSection("contact");
        } else {
          const sectionIds = [
            "academics",
            "campus",
            "learning-beyond",
            "admissions",
            "contact",
          ];
          let found = "";
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 260 && rect.bottom > 120) {
                found = id;
              }
            }
          }
          setActiveSection(found);
        }
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

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
    const timer = setInterval(() => {
      if (bindLenis()) clearInterval(timer);
    }, 150);

    return () => {
      clearInterval(timer);
      lenisCleanup();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setHidden(false);
  };

  useEffect(() => {
    if (dialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [dialog]);

  useEffect(() => {
    const lock = Boolean(menu || dialog);
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, dialog]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  function openDialog(value: string) {
    setSaved(false);
    try {
      setDraft(JSON.parse(localStorage.getItem("wellspire-enquiry") || "{}"));
    } catch {
      setDraft({});
    }
    setDialog(value);
  }
  const stories = [
    {
      label: "THE CLASSROOM",
      quote:
        "Conceptual understanding, not memorisation — with inquiry, literacy, and numeracy at the core.",
      by: "Curriculum at Wellspire",
      image: photos.classroom,
    },
    {
      label: "STUDENT VOICE",
      quote:
        "Podcast studio: articulation, storytelling, listening, and responsible digital communication.",
      by: "Learning Beyond Classrooms",
      image: photos.storytellers,
    },
    {
      label: "CAMPUS ENVIRONMENT",
      quote:
        "Well-being and inspiration together — we nurture mind, body, and spirit.",
      by: "About Wellspire",
      image: photos.building,
    },
  ];
  return (
    <>
      <CrestIntro />
      <header
        className={`header ${scrolled ? "is-scrolled" : ""} ${hidden && !menu ? "is-hidden" : ""} ${menu ? "is-menu-open" : ""}`}
      >
        <div className="header-brand-group">
          <Brand />
        </div>
        <DesktopNavDock
          activeSection={activeSection}
          onHashClick={handleNavClick}
        />
        <a
          className="button nav-apply"
          href="/admissions"
          aria-label="Explore admissions"
        >
          <span className="nav-apply-label-full">Explore Admissions</span>
          <span className="nav-apply-label-short">Admissions</span>
          <ArrowUpRight size={15} className="nav-apply-arrow" />
        </a>
        <a
          className="mobile-admissions-btn"
          href="/admissions"
          onClick={() => setMenu(false)}
        >
          Admissions
          <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? (
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? { opacity: 1 }
                : { opacity: 0, y: -12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? { opacity: 0 }
                : { opacity: 0, y: -12 }
            }
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <MobileMenuNav
              activeSection={activeSection}
              onNavigate={() => setMenu(false)}
              onHashClick={handleNavClick}
            />

            <div className="mobile-menu-ctas">
              <a
                className="mobile-menu-cta mobile-menu-cta--primary"
                href="/admissions"
                onClick={() => setMenu(false)}
              >
                Apply for Admissions
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="mobile-menu-cta mobile-menu-cta--secondary"
                onClick={() => {
                  setMenu(false);
                  openDialog("Plan a campus visit");
                }}
              >
                Book a Campus Visit
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            {(school.city || school.phone) && (
              <div className="mobile-menu-contact">
                {school.city && (
                  <p>
                    <MapPin size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.city}</span>
                  </p>
                )}
                {school.phone && (
                  <a href={`tel:${school.phone.replace(/\s/g, "")}`}>
                    <Phone size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>{school.phone}</span>
                  </a>
                )}
              </div>
            )}

            <p className="mobile-menu-tagline">LEARN · GROW · BELONG</p>
          </motion.div>
        )}
      </AnimatePresence>
      <main id="main">
        <Hero
          onEnquire={() => openDialog("Start an admissions enquiry")}
          onVisit={() => openDialog("Plan a campus visit")}
        />
        <TrustSection />
        <GlobalHorizons />
        <section className="section pillars" id="pillars">
          <div className="section-heading">
            <div>
              <Eyebrow>04 — OUR PHILOSOPHY</Eyebrow>
              <Heading>
                Education that inspires.
                <br />
                <em>Not pressurises.</em>
              </Heading>
            </div>
            <p>
              Confidence. Curiosity. Character. Capability.
            </p>
          </div>
          <div className="pillar-grid">
            {pillars.map(([title, heading, copy, img], i) => (
              <a
                className="pillar"
                href={i === 0 ? "#academics" : "#campus"}
                key={title}
              >
                <div className="pillar-image">
                  <Image
                    src={img}
                    alt={`${title} learning experience`}
                    fill
                    sizes="(max-width:1023px) 90vw, 55vw"
                  />
                  <span className="pillar-number">0{i + 1}</span>
                  <span className="round-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="pillar-copy">
                  <QuadrantIcon kind={i} />
                  <p className="eyebrow">
                    0{i + 1} — {title}
                  </p>
                  <Heading as="h3">{heading}</Heading>
                  <p>{copy}</p>
                </div>
                <div className="pillar-dimmer" />
              </a>
            ))}
          </div>
        </section>
        <section className="academics section" id="academics">
          <div className="academic-title">
            <Eyebrow>05 — CURRICULUM</Eyebrow>
            <Heading>
              Designed for today.
              <br />
              <em>Ready for tomorrow.</em>
            </Heading>
            <p>
              A CBSE curriculum built for conceptual understanding, not
              memorisation — with strong academics, values, creativity, and
              culture.
            </p>
            <div className="curriculum-framework">
              <div>
                <strong>NCF-SE 2023</strong>
                <span>Foundational framework for school education</span>
              </div>
              <div>
                <strong>CBSE</strong>
                <span>Structured academic and competency-based learning</span>
              </div>
              <div>
                <strong>5+3+3+4</strong>
                <span>Age-appropriate stages of learning</span>
              </div>
              <div>
                <strong>Indian Context</strong>
                <span>Values, culture, traditions and real-life learning</span>
              </div>
            </div>
            <p className="curriculum-outcomes">
              Strong Academics · Conceptual Clarity · Global Exposure ·
              Cultural Grounding
            </p>
            <Link className="text-link" href="/curriculum">
              Explore Curriculum <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="stages">
            {stages.map((s, i) => (
              <div
                className={`stage ${stage === i ? "active" : ""}`}
                key={s.name}
              >
                <h3>
                  <button
                    aria-expanded={stage === i}
                    aria-controls={`stage-${i}`}
                    id={`stage-button-${i}`}
                    onClick={() => setStage(stage === i ? -1 : i)}
                  >
                    <span className="stage-number">0{i + 1}</span>
                    <span>
                      {s.name}
                      <small>{s.range}</small>
                    </span>
                    {stage === i ? <Minus size={19} /> : <Plus size={19} />}
                  </button>
                </h3>
                <div
                  id={`stage-${i}`}
                  role="region"
                  aria-labelledby={`stage-button-${i}`}
                  hidden={stage !== i}
                >
                  <div className="stage-content">
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                      <small>{s.subjects}</small>
                    </div>
                    <Image
                      src={s.image}
                      alt={`${s.name} learning materials`}
                      width={240}
                      height={220}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <CampusExperienceSection />
        <section className="admissions section" id="admissions">
          <div className="admission-top">
            <Eyebrow>09 — YOUR NEXT CHAPTER</Eyebrow>
            <span>NURSERY — GRADE 7</span>
          </div>
          <Heading>
            Give your child a
            <br />
            <em>confident start.</em>
          </Heading>
          <div className="admission-description">
            <p>
              Choosing a school is a big decision.
              <br />
              Let’s start with a conversation.
            </p>
            <div className="admission-cta-row">
              <button
                className="button light"
                onClick={() => openDialog("Start an admissions enquiry")}
              >
                Enquire Now <ArrowUpRight size={18} />
              </button>
              <button
                className="button ghost"
                onClick={() => openDialog("Plan a campus visit")}
              >
                Schedule a Visit <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="timeline-wrap">
            <svg
              className="timeline-svg"
              viewBox="0 0 1000 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className="timeline-line" pathLength="1" d="M0 1H1000" />
            </svg>
            <ol className="timeline">
              {[
                "Enquiry",
                "Registration",
                "Interaction",
                "Document verification",
                "Welcome to Wellspire",
              ].map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="admissions-bottom">
            <p>
              Keep handy: birth certificate, previous report card, transfer
              certificate,
              <br />
              identity documents, and recent photographs. Requirements vary by
              class.
            </p>
            <button onClick={() => openDialog("Admissions guide")}>
              Admissions guide <ArrowUpRight size={16} />
            </button>
            <button onClick={() => openDialog("Fee structure")}>
              Fee structure <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
      </main>
      <SiteFooter openDialog={openDialog} />
      <dialog
        aria-label={dialog || "Wellspire information"}
        ref={dialogRef}
        className="enquiry-dialog"
        onCancel={() => setDialog(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setDialog(null);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => setDialog(null)}
        >
          <X />
        </button>
        <Eyebrow>WELLSPIRE — LET’S TALK</Eyebrow>
        <Heading>{dialog}</Heading>
        {dialog?.includes("enquiry") || dialog?.includes("visit") ? (
          <>
            {saved ? (
              <div className="success" role="status">
                <Check size={32} />
                <h3>Your enquiry has been saved on this device.</h3>
                <p>
                  This preview is not connected to the admissions office. Your
                  details have not been sent. You can return and edit them
                  below.
                </p>
                <button className="button" onClick={() => setSaved(false)}>
                  Edit details <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );
                  try {
                    localStorage.setItem(
                      "wellspire-enquiry",
                      JSON.stringify(data),
                    );
                    setDraft(data as Record<string, string>);
                    setSaved(true);
                  } catch {
                    alert(
                      "Your browser could not save this enquiry. Please allow local storage and retry.",
                    );
                  }
                }}
              >
                <p className="form-note">
                  Save an enquiry draft. Online submissions will open when the
                  school connects its admissions service.
                </p>
                <label>
                  Parent or guardian’s name
                  <input
                    name="name"
                    defaultValue={draft.name || ""}
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Phone number
                  <input
                    name="phone"
                    defaultValue={draft.phone || ""}
                    type="tel"
                    autoComplete="tel"
                    pattern="[+0-9 ()-]{10,18}"
                    title="Enter a valid phone number, 10–18 characters"
                    required
                  />
                </label>
                <div className="form-row">
                  <label>
                    Class applying for
                    <select
                      name="class"
                      required
                      defaultValue={draft.class || ""}
                    >
                      <option value="" disabled>
                        Select class
                      </option>
                      {[
                        "Nursery",
                        "PP1",
                        "PP2",
                        ...Array.from(
                          { length: 7 },
                          (_, i) => `Grade ${i + 1}`,
                        ),
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    City
                    <input
                      name="city"
                      defaultValue={draft.city || ""}
                      autoComplete="address-level2"
                      required
                      maxLength={100}
                    />
                  </label>
                </div>
                <p className="form-note">
                  Stored only in this browser. No information is transmitted.
                </p>
                <button className="button" type="submit">
                  Save enquiry draft <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="information-panel">
            {dialog === "Message from our Principal" ? (
              <>
                <p>
                  At Wellspire, education is never about numbers—it is about
                  each child. It is about their curiosity, courage,
                  creativity, emotions, challenges, strengths, and dreams. We
                  believe that every child has their own pace and purpose,
                  and our role is to guide them with encouragement,
                  understanding, and trust.
                </p>
                <p>
                  With 15 years of experience in leading schools, shaping
                  academics, and designing curriculum, I have seen firsthand
                  that children flourish best when they feel safe, valued,
                  and inspired. This belief lives at the heart of Wellspire.
                </p>
                <p>
                  Our school spaces speak the language of care and purpose.
                  Every classroom, every learning area, every open corner has
                  been created to nurture the mind, body, and soul. Children
                  walk into Wellspire with enthusiasm, confidence, and the
                  freedom to express themselves.
                </p>
                <p>
                  Through a curriculum that nurtures expression, creativity,
                  emotional strength, physical fitness, and social awareness,
                  supported by experiential and joyful learning, our children
                  grow into balanced, compassionate, and confident
                  individuals—ready for the world and for themselves.
                </p>
                <p>
                  At Wellspire, we do not merely educate minds—we shape
                  lives.
                </p>
              </>
            ) : (
              <>
                {(dialog && programmeDialogCopy[dialog]
                  ? programmeDialogCopy[dialog]
                  : dialog && founderDialogCopy[dialog]
                    ? founderDialogCopy[dialog]
                    : dialog === "Fee structure"
                      ? "The school’s approved, class-wise fee schedule has not yet been supplied. Tuition, transport, one-time charges, and payment dates must be confirmed in the official schedule."
                      : dialog === "Admissions guide"
                        ? "The admissions journey begins with an enquiry, followed by registration, an interaction, document checks, and confirmation. Opening dates, eligibility, and the official prospectus are awaiting approval from the school."
                        : dialog === "Privacy & your data"
                          ? "This preview uses browser storage only when you save an enquiry draft. It does not send the draft to a server or use analytics. Clear the saved draft below to remove your information from this device."
                          : "The name Wellspire reflects our belief that well-being and inspiration together create meaningful education. We nurture mind, body, and spirit through academics, values, creativity, communication, reading, and care."
                )
                  .split("\n\n")
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </>
            )}
            {dialog === "Privacy & your data" ? (
              <button
                className="button"
                onClick={() => {
                  localStorage.removeItem("wellspire-enquiry");
                  setSaved(true);
                }}
              >
                {saved ? "Saved draft removed" : "Remove saved enquiry draft"}
              </button>
            ) : (
              <button
                className="button"
                onClick={() => openDialog("Start an admissions enquiry")}
              >
                Start a conversation <ArrowUpRight size={16} />
              </button>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
