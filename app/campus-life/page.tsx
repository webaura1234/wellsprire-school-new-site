import type { Metadata } from "next";
import { CampusLifeMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Campus Life — Wellspire School",
  description:
    "Campus experience, safety, sports, arts, and creative life at Wellspire School.",
};

export default function CampusLifePage() {
  return <CampusLifeMobilePage />;
}
