import type { Metadata } from "next";
import AdmissionsMobilePage from "@/components/admissions-mobile";

export const metadata: Metadata = {
  title: "Admissions — Wellspire International School",
  description:
    "Enquire about admissions at Wellspire International School, Hyderabad — Nursery to Grade 7.",
};

export default function AdmissionsPage() {
  return <AdmissionsMobilePage />;
}
