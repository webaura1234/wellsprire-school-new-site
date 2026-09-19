import type { Metadata } from "next";
import { LearningBeyondPage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Learning Beyond — Wellspire School",
  description:
    "Hands-on programmes at Wellspire — overview highlights and the full catalogue.",
};

export default function Page() {
  return <LearningBeyondPage />;
}
