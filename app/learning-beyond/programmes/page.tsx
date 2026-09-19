import type { Metadata } from "next";
import { HashRedirect } from "@/components/hash-redirect";

export const metadata: Metadata = {
  title: "All Learning Beyond Programmes — Wellspire School",
};

export default function Page() {
  return <HashRedirect href="/learning-beyond" />;
}
