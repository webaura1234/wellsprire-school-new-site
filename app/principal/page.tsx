import type { Metadata } from "next";
import { HashRedirect } from "@/components/hash-redirect";

export const metadata: Metadata = {
  title: "Principal’s Message — Wellspire School",
};

export default function Page() {
  return <HashRedirect href="/leadership#leadership" />;
}
