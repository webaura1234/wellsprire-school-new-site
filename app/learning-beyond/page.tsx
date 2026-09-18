import type { Metadata } from "next";
import {
  LearningBeyondCollection,
  learningBeyondMetadata,
} from "@/components/collection-pages";

export const metadata: Metadata = learningBeyondMetadata;

export default function LearningBeyondPage() {
  return <LearningBeyondCollection />;
}
