import type { Metadata } from "next";
import { CareersPage } from "@/components/careers-page";

export const metadata: Metadata = {
  title: "Careers — Wellspire School",
  description:
    "Join Wellspire School — apply with your resume for teaching and staff openings in Hyderabad.",
};

export default function Page() {
  return <CareersPage />;
}
