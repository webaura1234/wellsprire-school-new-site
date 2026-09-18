"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";
import { Heading } from "@/components/heading";
import { MobileChrome } from "@/components/mobile-chrome";
import {
  AboutWellspireSection,
  CampusExperienceSection,
  OurTeamSection,
  PrincipalMessage,
  UniversityDestinations,
} from "@/components/featured-sections";
import { Stats, Results, Testimonials } from "@/components/school-facts";
import {
  EnquiryDialog,
  useEnquiryDialog,
} from "@/components/enquiry-dialog";

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

export function AboutMobilePage() {
  return (
    <MobileChrome desktopRedirect="/#about" activeMatch="/about">
      <SubpageIntro
        eyebrow="ABOUT WELLSPIRE"
        title="Who we are."
        titleEm="Why families trust us."
        deck="Our story, values, progress, and the voices around our community."
      />
      <AboutWellspireSection philosophyHref="/#pillars" />
      <Stats />
      <Results />
      <Testimonials />
      <footer className="mobile-subpage-footer">
        <Brand />
        <Link href="/#contact">Contact</Link>
        <Link href="/admissions">Admissions</Link>
      </footer>
    </MobileChrome>
  );
}

export function LeadershipMobilePage() {
  const dialogState = useEnquiryDialog();

  return (
    <MobileChrome desktopRedirect="/#team" activeMatch="/leadership">
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
      <footer className="mobile-subpage-footer">
        <Brand />
        <Link href="/about">About</Link>
        <Link href="/admissions">Admissions</Link>
      </footer>
      <EnquiryDialog {...dialogState} />
    </MobileChrome>
  );
}

export function CampusLifeMobilePage() {
  const dialogState = useEnquiryDialog();

  return (
    <MobileChrome desktopRedirect="/#campus" activeMatch="/campus-life">
      <SubpageIntro
        eyebrow="CAMPUS LIFE"
        title="Safe. Creative."
        titleEm="Alive every day."
        deck="Campus experience, safety, sports, arts, and spaces beyond the facilities grid."
      />
      <CampusExperienceSection />
      <UniversityDestinations
        onEnquire={() => dialogState.openDialog("Plan a campus visit")}
      />
      <footer className="mobile-subpage-footer">
        <Brand />
        <Link href="/#campus">Campus & Facilities</Link>
        <Link href="/admissions">Admissions</Link>
      </footer>
      <EnquiryDialog {...dialogState} />
    </MobileChrome>
  );
}
