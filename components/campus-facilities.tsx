"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/heading";
import { campusFacilities, facilitiesHeader } from "@/lib/facilities";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function CampusFacilitiesSection({
  exploreHref = "/campus-life#campus-life",
}: {
  exploreHref?: string;
}) {
  const [facility, setFacility] = useState(0);
  const active = campusFacilities[facility];

  return (
    <section className="campus section" id="campus">
      <div className="section-heading">
        <div>
          <Eyebrow>06 — CAMPUS &amp; FACILITIES</Eyebrow>
          <Heading>
            Infrastructure that
            <br />
            <em>supports learning.</em>
          </Heading>
        </div>
        <Link className="text-link" href={exploreHref}>
          Explore campus life <ArrowUpRight size={18} />
        </Link>
      </div>
      <p className="campus-facilities-header">{facilitiesHeader}</p>
      <div
        className="campus-tabs"
        role="tablist"
        aria-label="Explore campus facilities"
      >
        {campusFacilities.map(({ name }, i) => (
          <button
            key={name}
            type="button"
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
                const total = campusFacilities.length;
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? total - 1
                      : (i + (e.key === "ArrowRight" ? 1 : total - 1)) % total;
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
          src={active.image}
          alt={active.name}
          fill
          sizes="90vw"
        />
        <div className="campus-caption">
          <span>WELLSPIRE / CAMPUS &amp; FACILITIES</span>
          <h3>{active.name}</h3>
          <ul className="campus-caption-list">
            {active.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span>
            0{facility + 1} / 0{campusFacilities.length}
          </span>
        </div>
      </div>
      <p className="image-note">
        Photographs are illustrative; arrange a visit to explore the school in
        person.
      </p>
    </section>
  );
}
