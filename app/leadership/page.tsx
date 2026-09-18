import type { Metadata } from "next";
import { LeadershipMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Management & Leadership — Wellspire School",
  description:
    "Meet the founders, management, and principal of Wellspire School.",
};

export default function LeadershipPage() {
  return <LeadershipMobilePage />;
}
