import type { Metadata } from "next";
import { CampusLifeMobilePage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Campus Life — Wellspire International School",
  description:
    "Campus experience, safety, sports, arts, and creative life at Wellspire International School.",
};

export default function CampusLifePage() {
  return <CampusLifeMobilePage />;
}
