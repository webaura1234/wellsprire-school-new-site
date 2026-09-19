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
  CampusLifeStorySection,
  OurTeamSection,
  PrincipalMessage,
} from "@/components/featured-sections";
import {
  EnquiryDialog,
  useEnquiryDialog,
} from "@/components/enquiry-dialog";
import { learningBeyondPrograms } from "@/lib/programmes";

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
        title="Who we are."
        titleEm="Why families trust us."
        deck="Our story, values, and the Wellspire promise for every child."
      />
      <AboutWellspireSection philosophyHref="/#pillars" />
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
