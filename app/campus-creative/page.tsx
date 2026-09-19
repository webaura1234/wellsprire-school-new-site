import type { Metadata } from "next";
import { HashRedirect } from "@/components/hash-redirect";

export const metadata: Metadata = {
  title: "Campus & Creative Life — Wellspire School",
};

export default function Page() {
  return <HashRedirect href="/campus-life#campus-life" />;
}
