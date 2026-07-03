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
  { value: "0-100", label: "0 to 100 orders/month" },
  { value: "100-500", label: "100 to 500 orders/month" },
  { value: "500-2000", label: "500 to 2,000 orders/month" },
  { value: "2000+", label: "2,000+ orders/month" },
];

export const platformOptions: FormSelectOption[] = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "other", label: "Other" },
];

export const foundingCohortCopy = {
  title: "Founding 15",
  subtitle: "First access for 15 stores that move early",
  benefits: [
    "Founding price, locked for life",
    "You onboard before we open to everyone",
    "A direct line to the founders",
  ],
  spotsTotal: 15,
} as const;
