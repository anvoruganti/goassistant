// How-it-works steps and credibility strip — editable without touching HowItWorks.tsx.
import type { StepItem } from "@/types/content";

export const howItWorksSteps: StepItem[] = [
  {
    number: "01",
    title: "Learns your catalog",
    description:
      "GO Assistant ingests your product data — titles, descriptions, attributes, images — and builds a deep understanding of what you sell.",
  },
  {
    number: "02",
    title: "Understands what customers mean",
    description:
      "When a customer describes what they want in their own words — comparative, vague, multilingual — GO Assistant interprets intent, not keywords.",
  },
  {
    number: "03",
    title: "Recommends and converts",
    description:
      "The right product surfaces in conversation. The customer feels understood. You capture a sale that keyword search would have lost.",
  },
];

export const credibilityItems = [
  "RAG",
  "Vector Search",
  "Multilingual",
  "Native Shopify/WooCommerce integration",
] as const;
