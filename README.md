# Welspire

An editorial, responsive school website built with Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS, GSAP / ScrollTrigger, Lenis and Framer Motion. Uses next/image and next/font (Instrument Serif + Inter).

## Run

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm start
```

## Design and content

- `app/globals.css`: responsive layout and four-colour palette; typography and spacing tokens are at the top. Gold is decorative on paper; readable labels use forest green.
- `tailwind.config.ts`: shared Tailwind design tokens.
- `app/layout.tsx`: font pairing and global metadata.
- `lib/content.ts`: stock photo URLs and academic stages.
- `components/school.tsx`: home page sections and interactive UI.
- `components/motion.tsx`: client-only, dynamically imported GSAP / ScrollTrigger and Lenis; all animation resources are cleaned up. Reduced motion bypasses these imports.
- `app/mandatory-public-disclosure/page.tsx`: motion-free disclosure tables.

## Working interactions

Responsive navigation, academic accordion, arrow-key campus tabs, story controls, article dialogs, admissions / campus-visit draft form, input validation, native dialog focus trapping and Escape close, browser-local draft saving, and draft deletion through the privacy dialog. Navigation links reach real page sections. The disclosure page is a real route.

## Before public launch

This is a functional design preview, not a verified school publication. The supplied brief omitted city, contact details, affiliation, founding year, fees, results, faculty biographies, certificates, dates, and real photographs. No credentials, testimonials or results were invented. Sections explicitly identify unavailable records. Illustrative photography comes from Unsplash.

1. Supply and verify school facts, teaching staff, safeguarding policies, results and PDF documents. Replace disclosure status cells with approved values and actual document links.
2. Supply genuine campus images and permission-cleared portraits. Replace stock imagery in `lib/content.ts`. An optional campus video should only be added when a real, optimised asset exists.
3. Connect the enquiry form to an authenticated admissions service with server-side validation, abuse protection, retention policy and consent. The current form is intentionally honest: it stores a draft locally and sends nothing. No database or CRM is needed until that service is selected.
4. Add confirmed phone/email/address links, approved admissions dates and class-wise fees. Add EducationalOrganization structured data only with verified location and contact information.
5. Set production canonical / Open Graph metadata and remove `robots: { index: false, follow: false }` in layout after verification.
6. Run Lighthouse on a production deployment with real assets. Mobile 90+ and sub-200KB initial JS are targets, not claimed results. Image quality, external stock delivery, fonts and interaction dependencies affect this budget.

The design deliberately avoids fake counters, unsupported testimonials, excessive pinned sections, cursor replacements and loading delays. Mobile retains native accessible interactions; reduced-motion visitors receive complete static content.

Hero source: https://images.unsplash.com/photo-1562774053-701939374585 (illustrative campus architecture). The locally optimised AVIF is 96,149 bytes.
