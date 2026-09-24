"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CampusFacilitiesSection } from "@/components/campus-facilities";
import { Heading } from "@/components/heading";
import { MobileChrome } from "@/components/mobile-chrome";
import {
  AboutWellspireSection,
  BiophilicLearningSection,
  CampusLifeStorySection,
  OurTeamSection,
  PhilosophyEssaySection,
  PrincipalMessage,
} from "@/components/featured-sections";
import {
  EnquiryDialog,
  useEnquiryDialog,
} from "@/components/enquiry-dialog";
import { learningBeyondPrograms } from "@/lib/programmes";
import {
  curriculumOverview,
  coreBelief,
  threePillars,
  academicProgramsIntro,
  curriculumStages,
  teachingPedagogies,
  holisticDevelopment,
  beyondTheClassroom,
  assessments,
} from "@/lib/curriculum";

/** Scroll to URL hash after navigation (shared About / Campus / Learning pages). */
function useHashScroll() {
  useEffect(() => {
    const aliases: Record<string, string> = {
      "campus-experience": "campus-life",
      placements: "campus-life",
    };
    const scrollToHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      const id = aliases[raw] || raw;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

function SubpageIntro({
  eyebrow,
  title,
  titleEm,
  deck,
  className,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  deck: string;
  className?: string;
}) {
  return (
    <div className={`mobile-subpage-intro${className ? ` ${className}` : ""}`}>
      <Link className="collection-back" href="/">
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        Back to home
      </Link>
      <div className="mobile-subpage-intro-main">
        <div className="mobile-subpage-intro-title">
          <p className="eyebrow">{eyebrow}</p>
          <Heading>
            {title}
            <br />
            <em>{titleEm}</em>
          </Heading>
        </div>
        <p className="mobile-subpage-deck">{deck}</p>
      </div>
    </div>
  );
}

/** About — /about (#about) */
export function AboutMobilePage() {
  useHashScroll();

  return (
    <MobileChrome activeMatch="/about">
      <SubpageIntro
        eyebrow="ABOUT WELLSPIRE"
        title="Inspiring lifelong"
        titleEm="learners."
        deck="Our story, values, and the Wellspire promise for every child."
      />
      <AboutWellspireSection philosophyHref="#philosophy" teamHref="/leadership" />
      <PhilosophyEssaySection />
    </MobileChrome>
  );
}

/** Leadership — /leadership (#team, #leadership) */
export function LeadershipMobilePage() {
  useHashScroll();
  const dialogState = useEnquiryDialog();

  return (
    <MobileChrome activeMatch="/leadership">
      <SubpageIntro
        eyebrow="MANAGEMENT & LEADERSHIP"
        title="People who lead"
        titleEm="with care."
        deck="Founders, management, and a principal message — one place for leadership."
      />
      <OurTeamSection onFounder={(name) => dialogState.openDialog(name)} />
      <PrincipalMessage
        onExplore={() =>
          dialogState.openDialog("Message from our Principal")
        }
        philosophyHref="/#pillars"
      />
      <EnquiryDialog {...dialogState} />
    </MobileChrome>
  );
}

/** Campus Life — /campus-life (#campus facilities + #campus-life story) */
export function CampusLifeMobilePage() {
  useHashScroll();
  const dialogState = useEnquiryDialog();

  return (
    <MobileChrome activeMatch="/campus-life">
      <SubpageIntro
        eyebrow="CAMPUS"
        title="Where children"
        titleEm="thrive every day."
        deck="Facilities to explore, then campus life — safety, sport, arts, and nature in one place."
      />
      <CampusFacilitiesSection exploreHref="/campus-life#campus-life" />
      <CampusLifeStorySection
        onEnquire={() => dialogState.openDialog("Plan a campus visit")}
      />
      <BiophilicLearningSection />
      <EnquiryDialog {...dialogState} />
    </MobileChrome>
  );
}

/** Learning Beyond — /learning-beyond (single clean catalogue) */
export function LearningBeyondPage() {
  useHashScroll();
  const dialogState = useEnquiryDialog();

  return (
    <MobileChrome activeMatch="/learning-beyond">
      <SubpageIntro
        eyebrow="LEARNING BEYOND CLASSROOMS"
        title="Soil to soul."
        titleEm="Studio to stage."
        deck="Hands-on programmes that take learning beyond the classroom — farming, STEAM, values, voice, and more."
      />
      <section
        id="learning-beyond"
        className="section journal learning-beyond-page"
        aria-label="Learning beyond programmes"
      >
        <div className="journal-grid journal-grid--programs">
          {learningBeyondPrograms.map(({ tag, title, image, body }) => (
            <button
              className="journal-card"
              key={title}
              type="button"
              onClick={() => dialogState.openDialog(title)}
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
      </section>
      <EnquiryDialog {...dialogState} />
    </MobileChrome>
  );
}

/** Curriculum — /curriculum (full academic depth from Academics.doc) */
export function CurriculumMobilePage() {
  useHashScroll();

  const [activeLearning, ...otherPedagogies] = teachingPedagogies;

  return (
    <MobileChrome activeMatch="/curriculum">
      <SubpageIntro
        className="curriculum-hero"
        eyebrow="CURRICULUM"
        title="Designed for today."
        titleEm="Ready for tomorrow."
        deck={curriculumOverview.intro}
      />

      <div className="curriculum-page">
        <section
          className="curriculum-section"
          aria-label="Curriculum overview"
        >
          <p className="curriculum-section-kicker">Our curriculum ensures</p>
          <ul className="curriculum-chip-list">
            {[
              "Conceptual understanding (not memorisation)",
              "Strong literacy and numeracy",
              "Inquiry-based learning",
              "Competency-based learning",
              "Social awareness",
              "Indian cultural grounding",
              "Holistic development",
              "Values and life skills",
            ].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="curriculum-lead">{curriculumOverview.outro}</p>
        </section>

        <section
          className="curriculum-section"
          aria-label="Our core belief"
        >
          <div className="curriculum-belief">
            <div className="curriculum-belief-title">
              <p className="eyebrow">{coreBelief.eyebrow}</p>
              <Heading>{coreBelief.heading}</Heading>
            </div>
            <div className="curriculum-belief-body">
              <p className="curriculum-lead">{coreBelief.intro}</p>
              <ul className="curriculum-chip-list">
                {coreBelief.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="curriculum-lead curriculum-lead--muted">
                {coreBelief.outro}
              </p>
            </div>
          </div>
        </section>

        <section
          className="curriculum-section"
          aria-label="Three pillars of learning"
        >
          <header className="curriculum-section-head">
            <p className="eyebrow">THREE PILLARS OF LEARNING</p>
            <p className="curriculum-section-sub">
              Curiosity, critical thinking, and life skills — woven through every
              stage.
            </p>
          </header>
          <div className="curriculum-pillars">
            {threePillars.map((pillar, i) => (
              <article className="curriculum-pillar" key={pillar.name}>
                <span className="curriculum-pillar-number">0{i + 1}</span>
                <h3>{pillar.name}</h3>
                <p>{pillar.text}</p>
                {pillar.subBullets && (
                  <ul className="curriculum-chip-list curriculum-chip-list--compact">
                    {pillar.subBullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          className="curriculum-section"
          aria-label="Academic programs"
        >
          <header className="curriculum-section-head curriculum-programs-head">
            <div className="curriculum-programs-title">
              <p className="eyebrow">{academicProgramsIntro.heading}</p>
              <Heading>
                Age-appropriate.
                <br />
                <em>Competency-led.</em>
              </Heading>
            </div>
            <div className="curriculum-programs-copy">
              <p className="curriculum-lead">{academicProgramsIntro.text}</p>
              <p className="curriculum-lead curriculum-lead--muted">
                {academicProgramsIntro.outro}
              </p>
            </div>
          </header>

          <div className="curriculum-stages">
            {curriculumStages.map((s) => (
              <article className="curriculum-stage" key={s.name}>
                <header className="curriculum-stage-head">
                  <span className="curriculum-stage-number">{s.number}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p className="curriculum-stage-meta">
                      {s.range}
                      <span aria-hidden="true"> · </span>
                      {s.ages}
                    </p>
                  </div>
                </header>
                <div className="curriculum-stage-copy">
                  <p className="curriculum-lead">{s.intro}</p>
                  <p className="curriculum-lead curriculum-lead--muted">{s.body}</p>
                  {s.tagline && (
                    <p className="curriculum-tagline">{s.tagline}</p>
                  )}
                </div>
                <div className="curriculum-stage-grid">
                  <div className="curriculum-stage-panel">
                    <h4>Our Focus</h4>
                    <ul>
                      {s.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="curriculum-stage-panel">
                    <h4>Our Approach</h4>
                    <ul>
                      {s.approach.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="curriculum-section"
          aria-label="Teaching pedagogies"
        >
          <header className="curriculum-section-head">
            <p className="eyebrow">TEACHING PEDAGOGIES</p>
            <p className="curriculum-section-sub">
              How learning happens in Wellspire classrooms — active, inquiry-led,
              and connected to the real world.
            </p>
          </header>

          <article className="curriculum-featured">
            <div className="curriculum-featured-copy">
              <h3>{activeLearning.name}</h3>
              <p>{activeLearning.text}</p>
            </div>
            {activeLearning.bullets && (
              <ul className="curriculum-featured-list">
                {activeLearning.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </article>

          <div className="curriculum-pedagogy-grid">
            {otherPedagogies.map((p) => (
              <article className="curriculum-pedagogy-card" key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>

          <aside className="curriculum-statement">
            <h3>{holisticDevelopment.name}</h3>
            <p>{holisticDevelopment.text}</p>
          </aside>
        </section>

        <section
          className="curriculum-section"
          aria-label="Beyond the classroom"
        >
          <header className="curriculum-section-head">
            <p className="eyebrow">BEYOND THE CLASSROOM</p>
            <p className="curriculum-section-sub">
              Experiences that grow strength, creativity, and character alongside
              academics.
            </p>
          </header>
          <div className="curriculum-beyond-grid">
            {beyondTheClassroom.map((activity) => (
              <article className="curriculum-beyond-card" key={activity.name}>
                <h3>{activity.name}</h3>
                <p>{activity.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="curriculum-section curriculum-section--last"
          aria-label="Assessments"
        >
          <header className="curriculum-section-head curriculum-assessments">
            <p className="eyebrow">{assessments.heading}</p>
            <p className="curriculum-lead">{assessments.text}</p>
          </header>
        </section>
      </div>
    </MobileChrome>
  );
}

/* —— Legacy exports kept for any leftover imports (redirect pages use these names) —— */
export function ProgressPage() {
  return <AboutMobilePage />;
}
export function VoicesPage() {
  return <AboutMobilePage />;
}
export function PrincipalPage() {
  return <LeadershipMobilePage />;
}
export function CampusFacilitiesPage() {
  return <CampusLifeMobilePage />;
}
export function CampusExperiencePage() {
  return <CampusLifeMobilePage />;
}
export function CampusCreativePage() {
  return <CampusLifeMobilePage />;
}
export function LearningBeyondOverviewPage() {
  return <LearningBeyondPage />;
}
export function LearningBeyondProgrammesPage() {
  return <LearningBeyondPage />;
}
