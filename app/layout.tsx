import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import RouteTransition from "@/components/route-transition";
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
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
