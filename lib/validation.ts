// Form validation utilities. Native checks, no zod or react-hook-form for a single-page form.
import type { WaitlistFieldErrors, WaitlistFormData } from "@/types/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRequired(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return `${label} is required`;
  }
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Enter a valid email address";
  }
  return undefined;
}

export function validateUrl(url: string): string | undefined {
  const trimmed = url.trim();
  if (!trimmed) {
    return "Store URL is required";
  }

  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (!parsed.hostname.includes(".")) {
      return "Enter a valid store URL";
    }
    return undefined;
  } catch {
    return "Enter a valid store URL";
  }
}

export function validateWaitlistForm(data: WaitlistFormData): WaitlistFieldErrors {
  const errors: WaitlistFieldErrors = {};

  const nameError = validateRequired(data.name, "Name");
  if (nameError) errors.name = nameError;

  const storeNameError = validateRequired(data.storeName, "Store name");
  if (storeNameError) errors.storeName = storeNameError;

  const storeUrlError = validateUrl(data.storeUrl);
  if (storeUrlError) errors.storeUrl = storeUrlError;

  const categoryError = validateRequired(data.category, "Category");
  if (categoryError) errors.category = categoryError;

  const ordersError = validateRequired(data.monthlyOrders, "Monthly order volume");
  if (ordersError) errors.monthlyOrders = ordersError;

  const platformError = validateRequired(data.platform, "Platform");
  if (platformError) errors.platform = platformError;

  const emailError = validateRequired(data.email, "Email") ?? validateEmail(data.email);
  if (emailError) errors.email = emailError;

  return errors;
}

export function normalizeStoreUrl(url: string): string {
  const trimmed = url.trim();
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}
