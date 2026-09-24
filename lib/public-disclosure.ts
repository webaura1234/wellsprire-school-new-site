/** CBSE Mandatory Public Disclosure — hardcoded register.
 *  Document hrefs point at files in /public/disclosure when available.
 *  Text values are taken only from school-provided certificates / confirmed details.
 */
export type DisclosureLink = {
  label: string;
  /** Leave empty until the document URL is provided. */
  href: string;
};

export type DisclosureCell =
  | { kind: "text"; value: string }
  | { kind: "link"; link: DisclosureLink }
  | { kind: "na"; value?: string };

export type DisclosureRow = {
  sno: number | string;
  info: string;
  detail: DisclosureCell;
};

export type StaffTeacherBreakdown = {
  label: string;
  count: string;
  link: DisclosureLink;
};

/** From building-safety / recognition / fire certificates + principal confirmation. */
export const disclosureSchool = {
  name: "Wellspire School",
  city: "Hyderabad, Telangana",
  /** Recognition certificate + building-safety certificate address */
  address:
    "Sy. No. 45p, 45/b3/a, Muneerabad Rd., Kandlakoya (v), Medchal Mandal, Medchal–Malkajgiri District, Telangana",
  phone: "+91 9988331711",
  email: "info@wellspireschool.com",
  principal: "Ms. M. Vijaya Lakshmi",
  principalQualification: "MBA, M.Com, B.Ed, M.Ed (Pursuing)",
  principalAdminExp: "8 Years",
  principalTeachingExp: "8 Years",
  board: "CBSE",
  /** Building-safety certificate — Total Land Area */
  campusAreaSqM: "8093.54",
  /**
   * classrooms,washrooms & lab data.pdf — total classrooms 44.
   * Building-safety certificate — size 46.45 sq. mtr (500 sq ft) and above.
   * Display kept short (CBSE-style one-line format).
   */
  classrooms: "Class Room – 44 & Size – 46.45 (IN SQ MTR)",
  builtUpAreaSqM: "6729.78",
  /**
   * classrooms,washrooms & lab data.pdf — 6 labs
   * (Composite, Robotics, Math, Computer, Value Ed, Art Studio).
   * Display kept short (CBSE-style one-line format).
   */
  laboratories: "LABS – 6 & Size – 66.42–118.39 (IN SQ MTR)",
  /** classrooms,washrooms & lab data.pdf — total 48 */
  girlsToilets: "48",
  /** classrooms,washrooms & lab data.pdf — total 48 */
  boysToilets: "48",
  /** Recognition certificate — opening permission year / classes */
  recognitionClasses: "Pre-Primary to VIII (E.M)",
  recognitionYear: "2026-2027",
  societyName: "S Cube Educational Society",
} as const;

const click = (href = ""): DisclosureLink => ({
  label: "Click Here",
  href,
});

/** Official documents served from /public/disclosure */
export const disclosureDocs = {
  societyRegistration: "/disclosure/society-registration-certificate.pdf",
  recognition: "/disclosure/recognition-certificate.pdf",
  buildingSafety: "/disclosure/building-safety-certificate.jpg",
  fireSafety: "/disclosure/fire-safety-certificate.pdf",
  waterHealthSanitation: "/disclosure/water-health-sanitation-certificate.pdf",
} as const;

export const disclosureGeneral: DisclosureRow[] = [
  {
    sno: 1,
    info: "NAME OF THE SCHOOL",
    detail: { kind: "text", value: disclosureSchool.name },
  },
  {
    sno: 2,
    info: "AFFILIATION NO. (IF APPLICABLE)",
    detail: { kind: "text", value: "NA" },
  },
  {
    sno: 3,
    info: "SCHOOL CODE (IF APPLICABLE)",
    detail: { kind: "text", value: "NA" },
  },
  {
    sno: 4,
    info: "COMPLETE ADDRESS WITH PIN CODE",
    detail: { kind: "text", value: disclosureSchool.address },
  },
  {
    sno: 5,
    info: "PRINCIPAL NAME",
    detail: { kind: "text", value: disclosureSchool.principal },
  },
  {
    sno: 6,
    info: "PRINCIPAL QUALIFICATION",
    detail: {
      kind: "text",
      value: `${disclosureSchool.principalQualification} | Administrative Exp: ${disclosureSchool.principalAdminExp} | Teaching Exp: ${disclosureSchool.principalTeachingExp}`,
    },
  },
  {
    sno: 7,
    info: "SCHOOL EMAIL ID",
    detail: { kind: "text", value: disclosureSchool.email },
  },
  {
    sno: 8,
    info: "CONTACT DETAILS (LANDLINE / MOBILE)",
    detail: { kind: "text", value: disclosureSchool.phone },
  },
];

export const disclosureDocuments: DisclosureRow[] = [
  {
    sno: 1,
    info: "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 2,
    info: "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
    detail: {
      kind: "link",
      link: click(disclosureDocs.societyRegistration),
    },
  },
  {
    sno: 3,
    info: "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 4,
    info: "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND ITS RENEWAL IF APPLICABLE",
    detail: {
      kind: "link",
      link: click(disclosureDocs.recognition),
    },
  },
  {
    sno: 5,
    info: "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
    detail: {
      kind: "link",
      link: click(disclosureDocs.buildingSafety),
    },
  },
  {
    sno: 6,
    info: "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
    detail: {
      kind: "link",
      link: click(disclosureDocs.fireSafety),
    },
  },
  {
    sno: 7,
    info: "COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 8,
    info: "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES",
    detail: {
      kind: "link",
      link: click(disclosureDocs.waterHealthSanitation),
    },
  },
];

export const disclosureDocumentsNote =
  "Note: the schools need to upload the self-attested copies of above listed documents by chairman/manager/secretary and principal. In case, it is noticed at later stage that uploaded documents are not genuine then school shall be liable for action as per norms.";

export const disclosureResultsAcademics: DisclosureRow[] = [
  {
    sno: 1,
    info: "FEE STRUCTURE OF THE SCHOOL",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 2,
    info: "ANNUAL ACADEMIC CALENDER",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 3,
    info: "LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 4,
    info: "LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 5,
    info: "LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY",
    detail: { kind: "text", value: "NA" },
  },
];

export const disclosureStaff = {
  principal: `${disclosureSchool.principal} — Administrative Exp: ${disclosureSchool.principalAdminExp}; Teaching Exp: ${disclosureSchool.principalTeachingExp}`,
  totalTeachers: "15",
  teachers: [] as StaffTeacherBreakdown[],
  teacherSectionRatio: "1:20",
  specialEducator: "Ms. Rajashree B.A, B.Ed in Special Education",
  counsellor: "Ms. Bhavya Rathore, Masters in counselling Psychology",
};

export const disclosureInfrastructure: DisclosureRow[] = [
  {
    sno: 1,
    info: "TOTAL CAMPUS AREA OF THE SCHOOL (IN SQUARE MTR)",
    detail: { kind: "text", value: disclosureSchool.campusAreaSqM },
  },
  {
    sno: 2,
    info: "NO. AND SIZE OF THE CLASS ROOMS (IN SQUARE MTR)",
    detail: { kind: "text", value: disclosureSchool.classrooms },
  },
  {
    sno: 3,
    info: "NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQUARE MTR)",
    detail: { kind: "text", value: disclosureSchool.laboratories },
  },
  {
    sno: 4,
    info: "INTERNET FACILITY (Y/N)",
    detail: { kind: "text", value: "Yes" },
  },
  {
    sno: 5,
    info: "NO. OF GIRLS TOILETS",
    detail: { kind: "text", value: disclosureSchool.girlsToilets },
  },
  {
    sno: 6,
    info: "NO. OF BOYS TOILETS",
    detail: { kind: "text", value: disclosureSchool.boysToilets },
  },
  {
    sno: 7,
    info: "LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL",
    detail: { kind: "link", link: click() },
  },
  {
    sno: 8,
    info: "BOOK LIST",
    detail: { kind: "link", link: click() },
  },
];
