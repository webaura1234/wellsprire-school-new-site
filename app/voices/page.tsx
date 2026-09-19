import type { Metadata } from "next";
import { HashRedirect } from "@/components/hash-redirect";

export const metadata: Metadata = {
  title: "Community Voices — Wellspire School",
};

/** Removed from site IA — redirect to About. */
export default function Page() {
  return <HashRedirect href="/about" />;
}
