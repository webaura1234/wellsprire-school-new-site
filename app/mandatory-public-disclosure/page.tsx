import type { Metadata } from "next";
import { Brand } from "@/components/brand";
export const metadata: Metadata = {
  title: "Mandatory Public Disclosure — Wellspire",
  description:
    "School information, document availability, results, staff, and infrastructure disclosure.",
};
const pending = "Awaiting verified school information";
function Table({ title, rows }: { title: string; rows: string[] }) {
  return (
    <section>
      <h2>{title}</h2>
      <table>
        <caption>
          Publication status: records have not yet been supplied by the school.
        </caption>
        <thead>
          <tr>
            <th scope="col">Information</th>
            <th scope="col">Details / status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              <th scope="row">{r}</th>
              <td>{pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default function Disclosure() {
  return (
    <main id="main" className="disclosure">
      <Brand />
      <h1>
        Mandatory
        <br />
        <em>Public Disclosure.</em>
      </h1>
      <p>
        This register is the CBSE public-disclosure place for school
        information. Affiliation, certificates, board results, and
        infrastructure records are published only after verification. Wellspire
        currently offers Nursery–Grade 7.
      </p>
      <section>
        <h2>A. General information</h2>
        <table>
          <caption>
            Confirmed names from school documents; remaining items await
            verification.
          </caption>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Details / status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Registered school name</th>
              <td>Wellspire International School</td>
            </tr>
            <tr>
              <th scope="row">CBSE affiliation number and school code</th>
              <td>{pending}</td>
            </tr>
            <tr>
              <th scope="row">Campus address</th>
              <td>Hyderabad, Telangana — full address awaiting confirmation</td>
            </tr>
            <tr>
              <th scope="row">Principal’s name and qualification</th>
              <td>Ms Vijaya Lakshmi, MBA, M.Com, M.Ed</td>
            </tr>
            <tr>
              <th scope="row">Email and telephone</th>
              <td>{pending}</td>
            </tr>
            <tr>
              <th scope="row">Year of establishment</th>
              <td>{pending}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Table
        title="B. Documents & information"
        rows={[
          "Affiliation certificate",
          "Society / trust registration",
          "No objection certificate (NOC)",
          "Recognition certificate",
          "Building safety certificate",
          "Fire safety certificate",
          "DEO certificate",
          "Water and sanitation certificate",
          "Fee structure",
          "Annual academic calendar",
          "School management committee",
          "Parent teacher association",
        ]}
      />
      <section>
        <h2>C. Board results</h2>
        <table>
          <caption>
            Last three completed academic years. Verified results are pending.
          </caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Class</th>
              <th scope="col">Registered</th>
              <th scope="col">Passed</th>
              <th scope="col">Pass %</th>
            </tr>
          </thead>
          <tbody>
            {["2025–26", "2024–25", "2023–24"].flatMap((year) =>
              ["X", "XII"].map((stage) => (
                <tr key={year + stage}>
                  <th scope="row">{year}</th>
                  <td>{stage}</td>
                  <td>Pending</td>
                  <td>Pending</td>
                  <td>Pending</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </section>
      <Table
        title="D. Staff"
        rows={[
          "Principal",
          "Post Graduate Teachers (PGTs)",
          "Trained Graduate Teachers (TGTs)",
          "Primary Teachers (PRTs)",
          "Counsellor",
          "Special educator",
          "Teacher qualifications and experience",
          "Student–teacher ratio",
        ]}
      />
      <Table
        title="E. Infrastructure"
        rows={[
          "Campus and built-up area",
          "Classrooms and dimensions",
          "Physics, Chemistry, and Biology laboratories",
          "Computer laboratory",
          "Library and number of volumes",
          "Sports ground and courts",
          "Auditorium, art and music rooms",
          "Infirmary",
          "Toilets",
          "Ramps and accessibility",
          "Drinking water",
          "Transport routes and supervision",
        ]}
      />
      <p style={{ marginTop: 40 }}>
        Documents will be linked only after their authenticity and publication
        approval are confirmed.
      </p>
      <a className="button" href="/">
        ← Return to Wellspire
      </a>
    </main>
  );
}
