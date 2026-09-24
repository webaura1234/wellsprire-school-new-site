import type { Metadata } from "next";
import { CampusGalleryPage } from "@/components/mobile-pages";

export const metadata: Metadata = {
  title: "Campus Gallery — Wellspire School",
  description:
    "Browse Wellspire School campus photography — exterior grounds, sports facilities, specialised labs, and indoor learning spaces.",
};

export default function CampusGalleryRoutePage() {
  return <CampusGalleryPage />;
}
