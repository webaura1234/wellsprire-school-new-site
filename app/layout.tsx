import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import RouteTransition from "@/components/route-transition";

/** Matches Oakridge body/UI: Source Sans Variable / Source Sans Pro lineage */
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Display / headings: Fraunces — soft optical serif for Wellspire */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Wellspire School — Inspiring Lifelong Learning",
  description:
    "Wellspire School, Hyderabad — a CBSE school that values academics, arts, sports, and character equally.",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <RouteTransition />
      </body>
    </html>
  );
}
