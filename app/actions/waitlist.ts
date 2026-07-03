// Server Action wrapper — keeps form components decoupled from Supabase implementation details.
"use server";

import { submitWaitlistEntry as submitEntry } from "@/lib/waitlist";
import { validateWaitlistForm } from "@/lib/validation";
import type { WaitlistFormData, WaitlistSubmitResult } from "@/types/content";

export async function submitWaitlistAction(
  data: WaitlistFormData,
): Promise<WaitlistSubmitResult> {
  const errors = validateWaitlistForm(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      error: "Please fix the highlighted fields.",
    };
  }

  if (!data.phoneVerified) {
    return {
      success: false,
      error: "Please verify your phone number first.",
    };
  }

  return submitEntry(data);
}
