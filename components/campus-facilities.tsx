"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/heading";
import { campusFacilities } from "@/lib/facilities";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function CampusFacilitiesSection({
  exploreHref = "/campus-life#campus-life",
}: {
  exploreHref?: string;
}) {
  const [facility, setFacility] = useState(0);

  return (
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
        <Link className="text-link" href={exploreHref}>
          Explore campus life <ArrowUpRight size={18} />
        </Link>
      </div>
      <div
        className="campus-tabs"
        role="tablist"
        aria-label="Explore campus facilities"
      >
        {campusFacilities.map(([name], i) => (
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
          src={campusFacilities[facility][2]}
          alt={campusFacilities[facility][0]}
          fill
          sizes="90vw"
        />
        <div className="campus-caption">
          <span>WELLSPIRE / CAMPUS WHERE CHILDREN THRIVE</span>
          <h3>{campusFacilities[facility][1]}</h3>
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
