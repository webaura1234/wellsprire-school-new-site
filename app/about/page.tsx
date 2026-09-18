import type { Metadata } from "next";
import { AboutMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "About — Wellspire International School",
  description:
    "About Wellspire International School — mission, values, progress, and community voices.",
};

export default function AboutPage() {
  return <AboutMobilePage />;
}
