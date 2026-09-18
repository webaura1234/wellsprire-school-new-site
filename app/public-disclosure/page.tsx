import type { Metadata } from "next";
import { PublicDisclosureMobilePage } from "@/components/public-disclosure";

export const metadata: Metadata = {
  title: "Public Disclosure — Wellspire School",
  description:
    "CBSE mandatory public disclosure for Wellspire School — documents, staff, results, and infrastructure.",
};

export default function PublicDisclosureRoute() {
  return <PublicDisclosureMobilePage />;
}
