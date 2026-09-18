import type { Metadata } from "next";
import { AboutMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "About — Wellspire School",
  description:
    "About Wellspire School — mission, values, progress, and community voices.",
};

export default function AboutPage() {
  return <AboutMobilePage />;
}
