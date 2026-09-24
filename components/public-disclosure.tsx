"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";
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
    return <span className="mpd-empty">-</span>;
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
    return <span className="mpd-empty">{cell.value?.trim() || "-"}</span>;
  }
  const value = cell.value?.trim();
  return <>{value || "-"}</>;
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
          Back to Home
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

/** Mobile route (/public-disclosure) — redirects desktop to the canonical URL. */
export function PublicDisclosureMobilePage() {
  return (
    <MobileChrome
      desktopRedirect="/mandatory-public-disclosure"
      activeMatch="/public-disclosure"
      hideFooter
    >
      <DisclosureBody />
    </MobileChrome>
  );
}

/** Canonical disclosure page — MobileChrome so hamburger + back work on phones. */
export function PublicDisclosurePage() {
  return (
    <MobileChrome activeMatch="/mandatory-public-disclosure" hideFooter>
      <DisclosureBody />
    </MobileChrome>
  );
}
