import type { Metadata } from "next";
import { PublicDisclosurePage } from "@/components/public-disclosure";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure — Wellspire School",
  description:
    "CBSE mandatory public disclosure for Wellspire School — general information, documents, results, staff, and infrastructure.",
};

export default function MandatoryPublicDisclosureRoute() {
  return <PublicDisclosurePage />;
}
