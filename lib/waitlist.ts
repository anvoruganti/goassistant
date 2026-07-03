// Waitlist data layer — swappable abstraction over Supabase insert/count/position queries.
import { unstable_cache } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { normalizeStoreUrl } from "@/lib/validation";
import type { WaitlistFormData, WaitlistSubmitResult } from "@/types/content";

async function fetchWaitlistCount(): Promise<number> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return 0;

  const { data, error } = await supabase.rpc("get_waitlist_count");
  if (error) {
    console.error("get_waitlist_count error:", error.message);
    return 0;
  }

  return Number(data) || 0;
}

export const getWaitlistCount = unstable_cache(
  fetchWaitlistCount,
  ["waitlist-count"],
  { revalidate: 60 },
);

export async function submitWaitlistEntry(
  data: WaitlistFormData,
): Promise<WaitlistSubmitResult> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error: "Waitlist is temporarily unavailable. Please try again shortly.",
    };
  }

  const { data: inserted, error } = await supabase
    .from("waitlist_signups")
    .insert({
      name: data.name.trim(),
      store_name: data.storeName.trim(),
      store_url: normalizeStoreUrl(data.storeUrl),
      category: data.category,
      monthly_orders: data.monthlyOrders,
      platform: data.platform,
      email: data.email.trim().toLowerCase(),
      email_verified: data.emailVerified,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "This email is already on the waitlist.",
      };
    }

    console.error("waitlist insert error:", error.message);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }

  const { data: position, error: positionError } = await supabase.rpc(
    "get_waitlist_position",
    { signup_id: inserted.id },
  );

  if (positionError) {
    console.error("get_waitlist_position error:", positionError.message);
    return { success: true };
  }

  return {
    success: true,
    queuePosition: Number(position) || undefined,
  };
}
