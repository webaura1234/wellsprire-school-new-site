import type { Metadata } from "next";
import { CurriculumMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Curriculum — Wellspire School",
  description:
    "A CBSE-aligned curriculum for holistic learning — our core belief, the three pillars of learning, stage-by-stage academic programs, teaching pedagogies, and assessments.",
};

export default function CurriculumPage() {
  return <CurriculumMobilePage />;
}
