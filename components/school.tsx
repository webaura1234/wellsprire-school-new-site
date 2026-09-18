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
import { Stats, Results, Testimonials } from "./school-facts";
import {
  PrincipalMessage,
  GlobalHorizons,
  AdmissionsCallout,
  UniversityDestinations,
  TrustSection,
  OurTeamSection,
  AboutWellspireSection,
  CampusExperienceSection,
} from "./featured-sections";
import {
  learningBeyondPrograms,
  programmeDialogCopy,
  founderDialogCopy,
} from "@/lib/programmes";
import { school } from "@/lib/school";
import { mobileNavItems } from "@/lib/mobile-nav";
const nav = [
  "About",
  "Curriculum",
  "Campus",
  "Learning Beyond",
  "Contact",
];
const navHref: Record<string, string> = {
  About: "about",
  Curriculum: "academics",
  Academics: "academics",
  Campus: "campus",
  "Learning Beyond": "learning-beyond",
  Contact: "contact",
  Results: "results",
};
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
const facilities = [
  ["Academic spaces", "Smart classrooms, mini libraries till Grade 5, computer, maths, and science labs.", photos.classroom],
  ["Specialised labs", "AI & Robotics for coding and innovation. Value Education for ethics, empathy, and leadership.", photos.computerLab],
  ["Creative studios", "Art, music, dance, and a dedicated podcast studio for voice and digital expression.", photos.storytellers],
  ["Sports facilities", "Football, basketball, skating, martial arts, indoor games, and a 200-metre running track.", photos.building],
  ["Biophilic campus", "Green corridors, plant-filled rooms, open-air classrooms, and outdoor exploration.", photos.earlyYears],
];
export default function School() {
  const [menu, setMenu] = useState(false);
  const [stage, setStage] = useState(0);
  const [facility, setFacility] = useState(0);
  const [dialog, setDialog] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [story, setStory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const syncAdmissionsAnchor = () => {
      const desktop = document.querySelector<HTMLElement>(
        ".home-desktop-only .admissions-callout-strip",
      );
      const mobile = document.querySelector<HTMLElement>(
        ".home-mobile-only .admissions-callout-strip",
      );
      const isMob = window.matchMedia("(max-width: 767px)").matches;
      if (desktop) desktop.id = isMob ? "" : "admissions";
      if (mobile) mobile.id = isMob ? "admissions" : "";
    };
    syncAdmissionsAnchor();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", syncAdmissionsAnchor);
    return () => mq.removeEventListener("change", syncAdmissionsAnchor);
  }, []);

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
            "about",
            "team",
            "academics",
            "campus",
            "learning-beyond",
            "results",
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
        <nav className="header-nav-dock" aria-label="Main navigation">
          {nav.map((n) => {
            const id = navHref[n];
            const isActive = activeSection === id;
            return (
              <a
                key={n}
                href={`#${id}`}
                className={`nav-dock-link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleNavClick(id)}
              >
                <span>{n}</span>
              </a>
            );
          })}
        </nav>
        <a
          className="button nav-apply"
          href="#admissions"
          onClick={() => handleNavClick("admissions")}
          aria-label="Explore admissions"
        >
          <span>Explore Admissions</span>
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
            <nav className="mobile-menu-nav" aria-label="Mobile navigation">
              {mobileNavItems.map(({ label, href, sectionId, Icon }) => {
                const isHome = href === "/";
                const isRoute = href.startsWith("/") && !href.includes("#");
                const isActive = isHome
                  ? !activeSection || activeSection === "main"
                  : Boolean(sectionId && activeSection === sectionId);
                const className = `mobile-menu-link ${isActive ? "is-active" : ""}`;
                const icon = (
                  <>
                    <span className="mobile-menu-link-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="mobile-menu-link-label">{label}</span>
                    <ChevronRight
                      className="mobile-menu-link-chevron"
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </>
                );

                if (isRoute) {
                  return (
                    <Link
                      key={label}
                      href={href}
                      className={className}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenu(false)}
                    >
                      {icon}
                    </Link>
                  );
                }

                const hashId = isHome
                  ? "main"
                  : href.includes("#")
                    ? href.split("#")[1]
                    : sectionId || "";

                return (
                  <a
                    key={label}
                    href={isHome ? "#main" : `#${hashId}`}
                    className={className}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      if (isHome) {
                        setActiveSection("");
                        setHidden(false);
                        const lenis = (
                          window as Window & {
                            lenis?: { scrollTo?: Function };
                          }
                        ).lenis;
                        if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 0.85 });
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                      } else if (hashId) {
                        handleNavClick(hashId);
                      }
                      setMenu(false);
                    }}
                  >
                    {icon}
                  </a>
                );
              })}
            </nav>

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
        <Hero onVisit={()=>openDialog('Plan a campus visit')}/>
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
              A balanced Global–Indian curriculum: UK National Curriculum,
              Cambridge International, and key CBSE strengths — with conceptual
              understanding, not memorisation.
            </p>
            <a className="text-link" href="#admissions">
              Explore curriculum <ArrowUpRight size={17} />
            </a>
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
        <section className="campus section" id="campus">
          <div className="section-heading">
            <div>
              <Eyebrow>06 — CAMPUS &amp; FACILITIES</Eyebrow>
              <Heading>
                A campus where
                <br />
                <em>children thrive.</em>
              </Heading>
            </div>
            <button
              className="text-link"
              onClick={() => openDialog("Plan a campus visit")}
            >
              View campus &amp; facilities <ArrowUpRight size={18} />
            </button>
          </div>
          <div
            className="campus-tabs"
            role="tablist"
            aria-label="Explore campus facilities"
          >
            {facilities.map(([name], i) => (
              <button
                key={name}
                role="tab"
                id={`facility-tab-${i}`}
                aria-selected={facility === i}
                aria-controls="facility-panel"
                tabIndex={facility === i ? 0 : -1}
                onClick={() => setFacility(i)}
                onKeyDown={(e) => {
                  if (
                    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const total = facilities.length;
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? total - 1
                          : (i + (e.key === "ArrowRight" ? 1 : total - 1)) %
                            total;
                    setFacility(next);
                    document.getElementById(`facility-tab-${next}`)?.focus();
                  }
                }}
              >
                {name}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <div
            className="campus-picture"
            id="facility-panel"
            role="tabpanel"
            aria-labelledby={`facility-tab-${facility}`}
          >
            <Image
              key={facility}
              src={facilities[facility][2]}
              alt={facilities[facility][0]}
              fill
              sizes="90vw"
            />
            <div className="campus-caption">
              <span>WELLSPIRE / CAMPUS WHERE CHILDREN THRIVE</span>
              <h3>{facilities[facility][1]}</h3>
              <span>
                0{facility + 1} / 0{facilities.length}
              </span>
            </div>
          </div>
          <p className="image-note">
            Photographs are illustrative; arrange a visit to explore the school
            in person.
          </p>
        </section>
        <div className="home-desktop-only">
          <CampusExperienceSection />
          <AdmissionsCallout onOpen={openDialog} />
          <AboutWellspireSection />
          <OurTeamSection onFounder={(name) => openDialog(name)} />
          <PrincipalMessage
            onExplore={() => openDialog("Message from our Principal")}
          />
        </div>
        <section
          className="section journal"
          id="learning-beyond"
          aria-label="Learning beyond classrooms"
        >
          <div className="section-heading">
            <div>
              <Eyebrow>LEARNING BEYOND CLASSROOMS</Eyebrow>
              <Heading>
                Soil to soul.
                <br />
                <em>Studio to stage.</em>
              </Heading>
            </div>
            <span className="journal-label">HANDS-ON PROGRAMMES</span>
          </div>
          <div className="journal-grid journal-grid--programs">
            {learningBeyondPrograms.map(({ tag, title, image, body }) => (
              <button
                className="journal-card"
                key={title}
                type="button"
                onClick={() => openDialog(title)}
              >
                <div>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width:640px) 90vw, 30vw"
                  />
                </div>
                <span className="eyebrow">{tag}</span>
                <h3>
                  {title}
                  <ArrowUpRight size={20} />
                </h3>
                <p>{body}</p>
              </button>
            ))}
          </div>
          <div className="mobile-more-wrap">
            <a className="mobile-more-btn" href="/learning-beyond">
              More programmes
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </section>
        <div className="home-mobile-only">
          <AdmissionsCallout onOpen={openDialog} anchor={false} />
        </div>
        <section className="admissions section" id="admissions-process">
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
            <button
              className="button light"
              onClick={() => openDialog("Start an admissions enquiry")}
            >
              Enquire Now <ArrowUpRight size={18} />
            </button>
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
        <div className="home-desktop-only">
          <Stats />
          <Results />
          <UniversityDestinations
            onEnquire={() => openDialog("Plan a campus visit")}
          />
          <Testimonials />
        </div>
      </main>
      <footer id="contact">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Join a school that educates the whole child.</p>
          </div>
          <div>
            <Eyebrow>COME SAY HELLO</Eyebrow>
            <p>
              {school.city || "Campus location awaiting confirmation"}
              <br />
              {school.phone ? (
                <a href={`tel:${school.phone}`}>{school.phone}</a>
              ) : (
                "Phone number awaiting school confirmation"
              )}
            </p>
            <button
              className="text-link"
              onClick={() => openDialog("Plan a campus visit")}
            >
              Book a campus visit <ArrowUpRight size={15} />
            </button>
            <button
              className="text-link"
              onClick={() => openDialog("Start an admissions enquiry")}
            >
              Speak to admissions <ArrowUpRight size={15} />
            </button>
          </div>
          <div>
            <Eyebrow>TAKE A LOOK AROUND</Eyebrow>
            <a href="#academics">Curriculum</a>
            <a href="#campus">Campus &amp; facilities</a>
            <a href="#learning-beyond">Learning beyond classrooms</a>
            <a href="#admissions">Admissions</a>
          </div>
          <div>
            <Eyebrow>GOOD TO KNOW</Eyebrow>
            <a href="/mandatory-public-disclosure">
              Mandatory Public Disclosure <ArrowUpRight size={13} />
            </a>
            <button onClick={() => openDialog("Fee structure")}>
              Fee structure
            </button>
            <button onClick={() => openDialog("Privacy & your data")}>
              Privacy & your data
            </button>
          </div>
        </div>
        <div className="footer-wordmark">
          wellspire<span>↗</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Wellspire. Educating the whole child.
          </span>
          <span>DESIGNED TO INSPIRE.</span>
        </div>
        <p className="preview-note">
          Design preview · School details, affiliations, policies, and
          admissions dates require verification before publication.
        </p>
      </footer>
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
                  At Wellspire, education is never about numbers—it is about each
                  child: curiosity, courage, creativity, and dreams. With 15
                  years leading schools, I have seen children flourish when they
                  feel safe, valued, and inspired. We do not merely educate
                  minds—we shape lives.
                </p>
              </>
            ) : (
              <p>
                {dialog && programmeDialogCopy[dialog]
                  ? programmeDialogCopy[dialog]
                  : dialog && founderDialogCopy[dialog]
                    ? founderDialogCopy[dialog]
                    : dialog === "Fee structure"
                      ? "The school’s approved, class-wise fee schedule has not yet been supplied. Tuition, transport, one-time charges, and payment dates must be confirmed in the official schedule."
                      : dialog === "Admissions guide"
                        ? "The admissions journey begins with an enquiry, followed by registration, an interaction, document checks, and confirmation. Opening dates, eligibility, and the official prospectus are awaiting approval from the school."
                        : dialog === "Privacy & your data"
                          ? "This preview uses browser storage only when you save an enquiry draft. It does not send the draft to a server or use analytics. Clear the saved draft below to remove your information from this device."
                          : "The name Wellspire reflects our belief that well-being and inspiration together create meaningful education. We nurture mind, body, and spirit through academics, values, creativity, communication, reading, and care."}
              </p>
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
