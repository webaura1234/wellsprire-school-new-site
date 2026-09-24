"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Heading } from "@/components/heading";
import {
  campusGalleryFilters,
  campusGalleryItems,
  type CampusGalleryFilter,
} from "@/lib/campus-gallery";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function CampusGallerySection({
  standalone = false,
}: {
  /** When true, skip the in-section title (page intro already provides it). */
  standalone?: boolean;
}) {
  const labelId = useId();
  const [filter, setFilter] = useState<CampusGalleryFilter>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const items =
    filter === "all"
      ? campusGalleryItems
      : campusGalleryItems.filter((item) => item.category === filter);

  const activeIndex = activeId
    ? items.findIndex((item) => item.id === activeId)
    : -1;
  const active = activeIndex >= 0 ? items[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);

  const showPrev = useCallback(() => {
    if (items.length === 0 || activeIndex < 0) return;
    const next = (activeIndex - 1 + items.length) % items.length;
    setActiveId(items[next].id);
  }, [activeIndex, items]);

  const showNext = useCallback(() => {
    if (items.length === 0 || activeIndex < 0) return;
    const next = (activeIndex + 1) % items.length;
    setActiveId(items[next].id);
  }, [activeIndex, items]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, showPrev, showNext]);

  return (
    <section
      className={`section campus-gallery${standalone ? " campus-gallery--standalone" : ""}`}
      id="campus-gallery"
      aria-labelledby={standalone ? undefined : labelId}
      aria-label={standalone ? "Campus photo gallery" : undefined}
    >
      {standalone ? null : (
        <div className="section-heading">
          <div>
            <Eyebrow>CAMPUS GALLERY</Eyebrow>
            <Heading id={labelId}>
              A closer look at
              <br />
              <em>our campus.</em>
            </Heading>
          </div>
          <p className="campus-gallery-deck">
            Exterior grounds, sports facilities, specialised labs, and indoor
            learning spaces — browse by category or open any photo.
          </p>
        </div>
      )}

      <div
        className="campus-gallery-filters"
        role="tablist"
        aria-label="Filter campus gallery"
      >
        {campusGalleryFilters.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={filter === tab.id}
            className={`campus-gallery-filter${filter === tab.id ? " is-active" : ""}`}
            onClick={() => {
              setFilter(tab.id);
              setActiveId(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="campus-gallery-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`campus-gallery-tile campus-gallery-tile--${item.category}${item.portrait ? " is-portrait" : ""}`}
            onClick={() => setActiveId(item.id)}
            aria-label={`Open photo: ${item.caption}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width:768px) 90vw, (max-width:1200px) 45vw, 30vw"
              className="campus-gallery-tile-img"
            />
            <span className="campus-gallery-tile-meta">
              <span className="campus-gallery-tile-cat">
                {item.category}
              </span>
              <span className="campus-gallery-tile-caption">
                {item.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="campus-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button
            type="button"
            className="campus-gallery-lightbox-close"
            aria-label="Close gallery"
            onClick={close}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="campus-gallery-lightbox-nav campus-gallery-lightbox-nav--prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <ArrowLeft size={20} strokeWidth={1.75} />
          </button>
          <figure
            className="campus-gallery-lightbox-figure"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="campus-gallery-lightbox-frame">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="92vw"
                className="campus-gallery-lightbox-img"
                priority
              />
            </div>
            <figcaption>
              <span>{active.category}</span>
              <strong>{active.caption}</strong>
              <em>
                {activeIndex + 1} / {items.length}
              </em>
            </figcaption>
          </figure>
          <button
            type="button"
            className="campus-gallery-lightbox-nav campus-gallery-lightbox-nav--next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ArrowRight size={20} strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
