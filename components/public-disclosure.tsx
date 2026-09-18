"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Brand } from "@/components/brand";
import { MobileChrome } from "@/components/mobile-chrome";
import {
  disclosureDocuments,
  disclosureDocumentsNote,
  disclosureGeneral,
  disclosureInfrastructure,
  disclosureResultsAcademics,
  disclosureSchool,
  disclosureStaff,
  type DisclosureCell,
  type DisclosureRow,
} from "@/lib/public-disclosure";

function DocLink({ href, label }: { href: string; label: string }) {
  if (!href) {
    return (
      <span className="mpd-link mpd-link--pending" title="PDF link coming soon">
        {label}
      </span>
    );
  }
  return (
    <a
      className="mpd-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

function Cell({ cell }: { cell: DisclosureCell }) {
  if (cell.kind === "link") {
    return <DocLink href={cell.link.href} label={cell.link.label} />;
  }
  if (cell.kind === "na") {
    return <strong className="mpd-na">{cell.value ?? "NOT APPLICABLE"}</strong>;
  }
  return <>{cell.value}</>;
}

function DisclosureTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: DisclosureRow[];
}) {
  return (
    <div className="mpd-table-wrap">
      <table className="mpd-table">
        <thead>
          <tr>
            <th scope="col">{headers[0]}</th>
            <th scope="col">{headers[1]}</th>
            <th scope="col">{headers[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.sno}-${row.info}`}>
              <td className="mpd-sno">{row.sno}</td>
              <td className="mpd-info">{row.info}</td>
              <td className="mpd-detail">
                <Cell cell={row.detail} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StaffTable() {
  return (
    <div className="mpd-table-wrap">
      <table className="mpd-table mpd-table--staff">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">INFORMATION</th>
            <th scope="col">DETAILS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="mpd-sno">1</td>
            <td className="mpd-info">PRINCIPAL</td>
            <td className="mpd-detail">{disclosureStaff.principal}</td>
          </tr>
          <tr className="mpd-staff-group">
            <td className="mpd-sno" rowSpan={disclosureStaff.teachers.length + 1}>
              2
            </td>
            <td className="mpd-info">TOTAL NO. OF TEACHERS</td>
            <td className="mpd-detail">{disclosureStaff.totalTeachers}</td>
          </tr>
          {disclosureStaff.teachers.map((t) => (
            <tr key={t.label} className="mpd-staff-sub">
              <td className="mpd-info">{t.label}</td>
              <td className="mpd-detail mpd-detail--split">
                <span>{t.count}</span>
                <DocLink href={t.link.href} label={t.link.label} />
              </td>
            </tr>
          ))}
          <tr>
            <td className="mpd-sno">3</td>
            <td className="mpd-info">TEACHERS SECTION RATIO</td>
            <td className="mpd-detail">{disclosureStaff.teacherSectionRatio}</td>
          </tr>
          <tr>
            <td className="mpd-sno">4</td>
            <td className="mpd-info">DETAILS OF SPECIAL EDUCATOR</td>
            <td className="mpd-detail">{disclosureStaff.specialEducator}</td>
          </tr>
          <tr>
            <td className="mpd-sno">5</td>
            <td className="mpd-info">DETAILS OF COUNSELLOR AND WELLNESS TEACHER</td>
            <td className="mpd-detail">{disclosureStaff.counsellor}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ScrollTop() {
  return (
    <button
      type="button"
      className="mpd-scroll-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={18} strokeWidth={2.4} aria-hidden="true" />
    </button>
  );
}

function DisclosureBody() {
  return (
    <div className="mpd-page">
      <div className="mpd-inner">
        <Link className="mpd-back" href="/">
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          Back to home
        </Link>

        <header className="mpd-hero">
          <p className="eyebrow">CBSE · MANDATORY PUBLIC DISCLOSURE</p>
          <h1>Mandatory Public Disclosure</h1>
          <p className="mpd-lede">
            Official disclosure register for {disclosureSchool.name},{" "}
            {disclosureSchool.city}. Document PDFs will be linked here as they
            are verified and approved for publication.
          </p>
        </header>

        <section className="mpd-section" aria-labelledby="mpd-a">
          <h2 id="mpd-a">A : GENERAL INFORMATION :</h2>
          <DisclosureTable
            headers={["SNO", "INFORMATION", "DETAILS"]}
            rows={disclosureGeneral}
          />
        </section>

        <section className="mpd-section" aria-labelledby="mpd-b">
          <h2 id="mpd-b">B : DOCUMENTS AND INFORMATION :</h2>
          <DisclosureTable
            headers={["SNO", "DOCUMENTS/INFORMATION", "DETAILS"]}
            rows={disclosureDocuments}
          />
          <p className="mpd-note">
            <strong>Note:</strong>{" "}
            {disclosureDocumentsNote.replace(/^Note:\s*/i, "")}
          </p>
        </section>

        <section className="mpd-section" aria-labelledby="mpd-c">
          <h2 id="mpd-c">C : RESULT AND ACADEMICS :</h2>
          <DisclosureTable
            headers={["SNO", "DOCUMENTS/INFORMATION", "DETAILS"]}
            rows={disclosureResultsAcademics}
          />
        </section>

        <section className="mpd-section" aria-labelledby="mpd-d">
          <h2 id="mpd-d">D : STAFF (TEACHING) :</h2>
          <StaffTable />
        </section>

        <section className="mpd-section" aria-labelledby="mpd-e">
          <h2 id="mpd-e">E : SCHOOL INFRASTRUCTURE :</h2>
          <DisclosureTable
            headers={["SNO", "INFORMATION", "DETAILS"]}
            rows={disclosureInfrastructure}
          />
        </section>
      </div>
      <ScrollTop />
    </div>
  );
}

/** Mobile hamburger destination — also usable as standalone disclosure page. */
export function PublicDisclosureMobilePage() {
  return (
    <MobileChrome
      desktopRedirect="/mandatory-public-disclosure"
      activeMatch="/public-disclosure"
    >
      <DisclosureBody />
    </MobileChrome>
  );
}

/** Full disclosure page for desktop navbar / footer / direct links. */
export function PublicDisclosurePage() {
  const desktopNav = [
    { label: "About", href: "/#about" },
    { label: "Curriculum", href: "/#academics" },
    { label: "Campus", href: "/#campus" },
    { label: "Learning Beyond", href: "/#learning-beyond" },
    { label: "Public Disclosure", href: "/mandatory-public-disclosure" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <main id="main" className="mpd-desktop-shell">
      <header className="header mpd-desktop-site-header">
        <div className="header-brand-group">
          <Brand />
        </div>
        <nav className="header-nav-dock" aria-label="Main navigation">
          {desktopNav.map((item) => {
            const isDisclosure = item.label === "Public Disclosure";
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-dock-link${isDisclosure ? " is-active" : ""}`}
                aria-current={isDisclosure ? "page" : undefined}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <a className="button nav-apply" href="/#admissions">
          <span>Explore Admissions</span>
          <ArrowRight size={15} className="nav-apply-arrow" />
        </a>
      </header>
      <DisclosureBody />
    </main>
  );
}
