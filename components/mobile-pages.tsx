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
  curriculumOverviewDoc,
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
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  deck: string;
}) {
  return (
    <div className="mobile-subpage-intro">
      <Link className="collection-back" href="/">
        <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        Back to home
      </Link>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>
        {title}
        <br />
        <em>{titleEm}</em>
      </Heading>
      <p className="mobile-subpage-deck">{deck}</p>
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

  return (
    <MobileChrome activeMatch="/curriculum">
      <SubpageIntro
        eyebrow="CURRICULUM AT WELLSPIRE INTERNATIONAL SCHOOL"
        title="Designed for today."
        titleEm="Ready for tomorrow."
        deck={curriculumOverviewDoc.intro}
      />

      <section className="section curriculum-page-section" aria-label="Curriculum overview">
        <ul className="curriculum-bullet-grid">
          {curriculumOverviewDoc.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="section curriculum-page-section" aria-label="Curriculum framework">
        <p className="eyebrow">{curriculumOverview.heading}</p>
        <ul className="curriculum-bullet-grid">
          {curriculumOverview.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="curriculum-outro">{curriculumOverview.outro}</p>
      </section>

      <section className="section curriculum-page-section" aria-label="Our core belief">
        <p className="eyebrow">{coreBelief.eyebrow}</p>
        <Heading>{coreBelief.heading}</Heading>
        <p className="curriculum-outro">{coreBelief.intro}</p>
        <ul className="curriculum-bullet-grid">
          {coreBelief.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="curriculum-outro">{coreBelief.outro}</p>
      </section>

      <section className="section curriculum-page-section" aria-label="Three pillars of learning">
        <p className="eyebrow">THREE PILLARS OF LEARNING</p>
        <div className="curriculum-pillars">
          {threePillars.map((pillar, i) => (
            <div className="curriculum-pillar" key={pillar.name}>
              <span className="curriculum-pillar-number">0{i + 1}</span>
              <h3>{pillar.name}</h3>
              <p>{pillar.text}</p>
              {pillar.subBullets && (
                <ul>
                  {pillar.subBullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section curriculum-page-section" aria-label="Academic programs">
        <p className="eyebrow">{academicProgramsIntro.heading}</p>
        <p className="curriculum-outro">{academicProgramsIntro.text}</p>
        <p className="curriculum-outro">{academicProgramsIntro.outro}</p>

        {curriculumStages.map((s) => (
          <article className="curriculum-stage" key={s.name}>
            <header>
              <span className="curriculum-pillar-number">{s.number}</span>
              <div>
                <h3>{s.name}</h3>
                <p className="curriculum-stage-meta">
                  {s.range} | {s.ages}
                </p>
              </div>
            </header>
            <p className="curriculum-outro">{s.intro}</p>
            <p className="curriculum-outro">{s.body}</p>
            {s.tagline && <p className="curriculum-tagline">{s.tagline}</p>}
            <div className="curriculum-stage-grid">
              <div>
                <h4>Our Focus</h4>
                <ul>
                  {s.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
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
      </section>

      <section className="section curriculum-page-section" aria-label="Teaching pedagogies">
        <p className="eyebrow">TEACHING PEDAGOGIES</p>
        <div className="curriculum-pedagogy-grid">
          {teachingPedagogies.map((p) => (
            <div className="curriculum-pedagogy-card" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
              {"bullets" in p && p.bullets && (
                <ul className="curriculum-pedagogy-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="curriculum-pedagogy-card curriculum-pedagogy-card--highlight">
            <h3>{holisticDevelopment.name}</h3>
            <p>{holisticDevelopment.text}</p>
          </div>
        </div>
      </section>

      <section className="section curriculum-page-section" aria-label="Beyond the classroom">
        <p className="eyebrow">BEYOND THE CLASSROOM</p>
        <div className="curriculum-beyond-grid">
          {beyondTheClassroom.map((activity) => (
            <div className="curriculum-beyond-card" key={activity.name}>
              <h3>{activity.name}</h3>
              <p>{activity.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section curriculum-page-section" aria-label="Assessments">
        <p className="eyebrow">{assessments.heading}</p>
        <p className="curriculum-outro">{assessments.text}</p>
      </section>
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
