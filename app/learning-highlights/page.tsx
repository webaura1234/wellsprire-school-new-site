import type { Metadata } from "next";
import {
  LearningHighlightsCollection,
  learningHighlightsMetadata,
} from "@/components/collection-pages";

export const metadata: Metadata = learningHighlightsMetadata;

export default function LearningHighlightsPage() {
  return <LearningHighlightsCollection />;
}
