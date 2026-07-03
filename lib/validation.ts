// Form validation utilities — native checks without zod/react-hook-form for a single-page form.
import type { WaitlistFieldErrors, WaitlistFormData } from "@/types/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// E.164: a leading + and 8 to 15 digits, e.g. +919876543210.
const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

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

export function normalizePhone(phone: string): string {
  const trimmed = phone.trim().replace(/[^\d+]/g, "");
  return trimmed;
}

export function validatePhone(phone: string): string | undefined {
  const normalized = normalizePhone(phone);
  if (!normalized) {
    return "Phone number is required";
  }
  if (!PHONE_PATTERN.test(normalized)) {
    return "Use the full number with country code, e.g. +919876543210";
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

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  return errors;
}

export function normalizeStoreUrl(url: string): string {
  const trimmed = url.trim();
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}
