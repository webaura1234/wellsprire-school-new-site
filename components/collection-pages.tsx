import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { Heading } from "@/components/heading";
import {
  homeLearningHighlights,
  learningBeyondPrograms,
} from "@/lib/programmes";

export const learningHighlightsMetadata: Metadata = {
  title: "Learning Highlights — Wellspire International School",
  description:
    "Explore all learning highlights at Wellspire International School — values, campus, innovation, STEAM, arts, and more.",
};

export const learningBeyondMetadata: Metadata = {
  title: "Learning Beyond Classrooms — Wellspire International School",
  description:
    "Hands-on programmes at Wellspire — farming, STEAM, values, podcasting, biophilic spaces, and more.",
};

function CollectionShell({
  eyebrow,
  title,
  titleEm,
  intro,
  backHref,
  backLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  titleEm: string;
  intro: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="collection-page">
      <header className="collection-page-header">
        <Brand />
        <Link className="collection-back" href={backHref}>
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          {backLabel}
        </Link>
      </header>

      <div className="collection-page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <Heading>
          {title}
          <br />
          <em>{titleEm}</em>
        </Heading>
        <p className="collection-page-deck">{intro}</p>
      </div>

      {children}
    </main>
  );
}

export function LearningHighlightsCollection() {
  return (
    <CollectionShell
      eyebrow="03 — LEARNING HIGHLIGHTS"
      title="Learning designed"
      titleEm="for the future."
      intro="All programme highlights at Wellspire — explore every space and experience."
      backHref="/#global"
      backLabel="Back to home"
    >
      <div className="global-grid global-grid--highlights collection-page-grid">
        {homeLearningHighlights.map((card) => (
          <article
            className="global-card global-card--title-only"
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
          </article>
        ))}
      </div>
    </CollectionShell>
  );
}

export function LearningBeyondCollection() {
  return (
    <CollectionShell
      eyebrow="LEARNING BEYOND CLASSROOMS"
      title="Soil to soul."
      titleEm="Studio to stage."
      intro="All hands-on programmes — farming, STEAM, values, voice, and more."
      backHref="/#learning-beyond"
      backLabel="Back to home"
    >
      <div className="journal-grid journal-grid--programs collection-page-grid">
        {learningBeyondPrograms.map(({ tag, title, image, body }) => (
          <article className="journal-card journal-card--static" key={title}>
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
              <ArrowUpRight size={20} aria-hidden="true" />
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </CollectionShell>
  );
}
