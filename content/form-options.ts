// Waitlist form dropdown options — keeps form field enums out of WaitlistForm.tsx.
import type { FormSelectOption } from "@/types/content";

export const categoryOptions: FormSelectOption[] = [
  { value: "fashion", label: "Fashion" },
  { value: "electronics", label: "Electronics" },
  { value: "beauty", label: "Beauty" },
  { value: "home", label: "Home & Furniture" },
  { value: "other", label: "Other" },
];

export const monthlyOrderOptions: FormSelectOption[] = [
  { value: "0-100", label: "0 – 100 orders/month" },
  { value: "100-500", label: "100 – 500 orders/month" },
  { value: "500-2000", label: "500 – 2,000 orders/month" },
  { value: "2000+", label: "2,000+ orders/month" },
];

export const platformOptions: FormSelectOption[] = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "other", label: "Other" },
];

export const foundingCohortCopy = {
  title: "Founding 50",
  subtitle: "Early access for operators who get it first",
  benefits: [
    "Locked-in pricing for life",
    "Priority onboarding before public launch",
    "Direct line to the founding team",
  ],
  spotsTotal: 50,
} as const;
