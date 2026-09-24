import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { school } from "@/lib/school";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * Shared site footer — final CTA, contact, and sitemap.
 * Rendered on every page (WIS layout doc: "Final CTA — Footer — All Pages").
 */
export function SiteFooter({
  openDialog,
}: {
  openDialog: (value: string) => void;
}) {
  return (
    <footer id="contact">
      <div className="footer-top">
        <div>
          <Brand />
          <p>Join a school that educates the whole child.</p>
        </div>
        <div>
          <Eyebrow>COME SAY HELLO</Eyebrow>
          <p>
            {school.city || "Campus location awaiting confirmation"}
            <br />
            {school.phone ? (
              <a href={`tel:${school.phone}`}>{school.phone}</a>
            ) : (
              "Phone number awaiting school confirmation"
            )}
          </p>
          <button
            className="text-link"
            onClick={() => openDialog("Start an admissions enquiry")}
          >
            Enquire Now <ArrowUpRight size={15} />
          </button>
          <button
            className="text-link"
            onClick={() => openDialog("Plan a campus visit")}
          >
            Book a Campus Visit <ArrowUpRight size={15} />
          </button>
          <button
            className="text-link"
            onClick={() => openDialog("Start an admissions enquiry")}
          >
            Speak to Our Admissions Team <ArrowUpRight size={15} />
          </button>
        </div>
        <div>
          <Eyebrow>TAKE A LOOK AROUND</Eyebrow>
          <a href="/">Home</a>
          <a href="/about">About Wellspire</a>
          <a href="/leadership">Management &amp; Leadership</a>
          <a href="/leadership#leadership">Principal&apos;s Message</a>
          <a href="/curriculum">Curriculum</a>
          <a href="/campus-life#campus">Campus &amp; Facilities</a>
          <a href="/campus-gallery">Campus gallery</a>
          <a href="/campus-life#campus-life">Campus Life</a>
          <a href="/learning-beyond">Learning Beyond</a>
          <a href="/admissions">Admissions</a>
          <a href="/careers">Careers</a>
          <a href="/#contact">Contact</a>
        </div>
        <div>
          <Eyebrow>GOOD TO KNOW</Eyebrow>
          <a href="/mandatory-public-disclosure">
            Public Disclosure <ArrowUpRight size={13} />
          </a>
          <button onClick={() => openDialog("Fee structure")}>
            Fee structure
          </button>
          <button onClick={() => openDialog("Privacy & your data")}>
            Privacy & your data
          </button>
        </div>
      </div>
      <div className="footer-wordmark">
        wellspire<span>↗</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Wellspire. Educating the whole child.
        </span>
        <span>DESIGNED TO INSPIRE.</span>
      </div>
      <p className="preview-note">
        Design preview · School details, affiliations, policies, and
        admissions dates require verification before publication.
      </p>
    </footer>
  );
}
