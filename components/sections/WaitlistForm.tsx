// Waitlist form — inline validation, phone OTP verification (Supabase), and server action submission.
"use client";

import { useState, useTransition } from "react";
import { submitWaitlistAction } from "@/app/actions/waitlist";
import {
  categoryOptions,
  monthlyOrderOptions,
  platformOptions,
} from "@/content/form-options";
import { normalizePhone, validatePhone, validateWaitlistForm } from "@/lib/validation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { WaitlistFieldErrors, WaitlistFormData } from "@/types/content";

const emptyForm: WaitlistFormData = {
  name: "",
  storeName: "",
  storeUrl: "",
  category: "",
  monthlyOrders: "",
  platform: "",
  email: "",
  phone: "",
  phoneVerified: false,
};

type OtpStep = "collect" | "sent" | "verified";

export function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>(emptyForm);
  const [errors, setErrors] = useState<WaitlistFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Phone OTP state
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState<OtpStep>("collect");
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));

    // Editing the phone invalidates any prior verification.
    if (name === "phone") {
      setOtpStep("collect");
      setOtp("");
      setOtpMessage(null);
      setForm((prev) => ({ ...prev, phone: value, phoneVerified: false }));
    }
  };

  const sendOtp = async () => {
    const phoneError = validatePhone(form.phone);
    if (phoneError) {
      setErrors((prev) => ({ ...prev, phone: phoneError }));
      return;
    }

    setOtpBusy(true);
    setOtpMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        phone: normalizePhone(form.phone),
      });
      if (error) {
        setOtpMessage(error.message);
      } else {
        setOtpStep("sent");
        setOtpMessage(`We sent a 6-digit code to ${normalizePhone(form.phone)}.`);
      }
    } catch {
      setOtpMessage("Phone verification is not configured yet. Please try again later.");
    } finally {
      setOtpBusy(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.trim().length < 4) {
      setOtpMessage("Enter the code we sent you.");
      return;
    }

    setOtpBusy(true);
    setOtpMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.verifyOtp({
        phone: normalizePhone(form.phone),
        token: otp.trim(),
        type: "sms",
      });
      if (error) {
        setOtpMessage(error.message);
      } else {
        setOtpStep("verified");
        setOtpMessage(null);
        setForm((prev) => ({ ...prev, phoneVerified: true }));
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
    } catch {
      setOtpMessage("Could not verify the code. Please try again.");
    } finally {
      setOtpBusy(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateWaitlistForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!form.phoneVerified) {
      setErrors({ phone: "Verify your phone number to continue." });
      return;
    }

    startTransition(async () => {
      const result = await submitWaitlistAction(form);

      if (result.success) {
        setQueuePosition(result.queuePosition ?? null);
        setSubmitted(true);
        return;
      }

      if (result.error?.toLowerCase().includes("email")) {
        setErrors({ email: result.error });
      } else if (result.error?.toLowerCase().includes("phone")) {
        setErrors({ phone: result.error });
      } else {
        setErrors({ form: result.error });
      }
    });
  };

  return (
    <SectionShell id="waitlist">
      <div className="mx-auto max-w-xl">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Reserve your spot"
            title="Join the waitlist"
            subtitle="Tell us about your store. We'll reach out when your spot opens up."
            align="center"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          {submitted ? (
            <div className="mt-10 overflow-hidden rounded-2xl border border-cobalt/30 glass-strong p-10 text-center card-glow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-400">
                ✓
              </div>
              {queuePosition !== null ? (
                <p className="font-display text-5xl font-bold text-gradient-cobalt">
                  You&apos;re #{queuePosition}
                </p>
              ) : (
                <p className="font-display text-3xl font-bold text-sky">
                  You&apos;re on the waitlist
                </p>
              )}
              <p className="mt-3 text-lg text-offwhite/70">
                {queuePosition !== null ? "on the waitlist" : "We'll be in touch soon."}
              </p>
              <p className="mt-4 text-sm text-offwhite/50">
                We&apos;ll reach out at {form.email} with next steps.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 rounded-2xl border border-white/10 glass-strong p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <TextField
                  label="Store name"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  error={errors.storeName}
                  required
                />
              </div>

              <TextField
                label="Store URL"
                name="storeUrl"
                type="url"
                placeholder="yourstore.com"
                value={form.storeUrl}
                onChange={handleChange}
                error={errors.storeUrl}
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  value={form.category}
                  onChange={handleChange}
                  error={errors.category}
                  required
                />
                <SelectField
                  label="Monthly order volume"
                  name="monthlyOrders"
                  options={monthlyOrderOptions}
                  value={form.monthlyOrders}
                  onChange={handleChange}
                  error={errors.monthlyOrders}
                  required
                />
              </div>

              <SelectField
                label="Platform"
                name="platform"
                options={platformOptions}
                value={form.platform}
                onChange={handleChange}
                error={errors.platform}
                required
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
              />

              {/* Phone + OTP verification */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-offwhite/80">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={otpStep === "verified"}
                    className="flex-1 rounded-lg border border-offwhite/15 bg-navy/60 px-4 py-3 text-offwhite placeholder:text-offwhite/40 focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt disabled:opacity-60"
                  />
                  {otpStep === "verified" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 text-sm font-medium text-emerald-300">
                      Verified ✓
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={sendOtp}
                      disabled={otpBusy}
                      className="whitespace-nowrap px-4 py-3"
                    >
                      {otpBusy && otpStep === "collect"
                        ? "Sending…"
                        : otpStep === "sent"
                          ? "Resend"
                          : "Send code"}
                    </Button>
                  )}
                </div>
                {errors.phone ? (
                  <p className="text-sm text-red-400" role="alert">
                    {errors.phone}
                  </p>
                ) : null}

                {otpStep === "sent" ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      id="otp"
                      name="otp"
                      inputMode="numeric"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="flex-1 rounded-lg border border-offwhite/15 bg-navy/60 px-4 py-3 tracking-[0.3em] text-offwhite placeholder:tracking-normal placeholder:text-offwhite/40 focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt"
                    />
                    <Button
                      variant="primary"
                      onClick={verifyOtp}
                      disabled={otpBusy}
                      className="whitespace-nowrap px-4 py-3"
                    >
                      {otpBusy ? "Verifying…" : "Verify"}
                    </Button>
                  </div>
                ) : null}

                {otpMessage ? (
                  <p className="mt-1 text-sm text-sky/80">{otpMessage}</p>
                ) : null}
              </div>

              {errors.form ? (
                <p className="text-sm text-red-400" role="alert">
                  {errors.form}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Reserving…" : "Reserve my spot"}
              </Button>
              {!form.phoneVerified ? (
                <p className="text-center text-xs text-offwhite/40">
                  We verify your number so we can reach you when your spot opens.
                </p>
              ) : null}
            </form>
          )}
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
