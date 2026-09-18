import type { Metadata } from "next";
import { LeadershipMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Management & Leadership — Wellspire International School",
  description:
    "Meet the founders, management, and principal of Wellspire International School.",
};

export default function LeadershipPage() {
  return <LeadershipMobilePage />;
}
