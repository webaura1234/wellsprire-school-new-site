import type { Metadata } from "next";
import { AboutMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "About Wellspire — Wellspire School",
  description:
    "About Wellspire School — mission, values, and the promise for every child.",
};

export default function AboutPage() {
  return <AboutMobilePage />;
}
