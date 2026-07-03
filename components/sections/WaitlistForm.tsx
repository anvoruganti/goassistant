// Waitlist form. Inline validation, email OTP verification (Supabase), and server action submission.
"use client";

import { useState, useTransition } from "react";
import { submitWaitlistAction } from "@/app/actions/waitlist";
import {
  categoryOptions,
  monthlyOrderOptions,
  platformOptions,
} from "@/content/form-options";
import { validateEmail, validateWaitlistForm } from "@/lib/validation";
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
  emailVerified: false,
};

type OtpStep = "collect" | "sent" | "verified";

export function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>(emptyForm);
  const [errors, setErrors] = useState<WaitlistFieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

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

    // Editing the email invalidates any prior verification.
    if (name === "email") {
      setOtpStep("collect");
      setOtp("");
      setOtpMessage(null);
      setForm((prev) => ({ ...prev, email: value, emailVerified: false }));
    }
  };

  const sendCode = async () => {
    const emailError = validateEmail(form.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setOtpBusy(true);
    setOtpMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const email = form.email.trim().toLowerCase();
      const tempPassword = `Ga-${crypto.randomUUID()}9`;

      // Confirm signup template — new waitlist emails.
      let { error } = await supabase.auth.signUp({ email, password: tempPassword });

      // Returning email — resend via magic-link/OTP template.
      if (error?.message?.toLowerCase().includes("already")) {
        ({ error } = await supabase.auth.signInWithOtp({ email }));
      }

      if (error) {
        setOtpMessage(error.message);
      } else {
        setOtpStep("sent");
        setOtpMessage(`We sent a 6-digit code to ${email}.`);
      }
    } catch {
      setOtpMessage("Could not send the code right now. Please try again.");
    } finally {
      setOtpBusy(false);
    }
  };

  const verifyCode = async () => {
    if (otp.trim().length < 6) {
      setOtpMessage("Enter the 6-digit code we emailed you.");
      return;
    }

    setOtpBusy(true);
    setOtpMessage(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const email = form.email.trim().toLowerCase();
      const token = otp.trim();

      // Confirm signup OTP first, then magic-link/OTP fallback for returning emails.
      let { error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
      if (error) {
        ({ error } = await supabase.auth.verifyOtp({ email, token, type: "email" }));
      }

      if (error) {
        setOtpMessage(error.message);
      } else {
        setOtpStep("verified");
        setOtpMessage(null);
        setForm((prev) => ({ ...prev, emailVerified: true }));
        setErrors((prev) => ({ ...prev, email: undefined }));
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

    if (!form.emailVerified) {
      setErrors({ email: "Verify your email to continue." });
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
            subtitle="Tell us about your store and we'll reach out when your spot opens."
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

              {/* Email + verification */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-offwhite/80">
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    placeholder="you@yourstore.com"
                    autoComplete="email"
                    value={form.email}
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
                      onClick={sendCode}
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
                {errors.email ? (
                  <p className="text-sm text-red-400" role="alert">
                    {errors.email}
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
                      onClick={verifyCode}
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
              {!form.emailVerified ? (
                <p className="text-center text-xs text-offwhite/40">
                  We verify your email so we can reach you when your spot opens.
                </p>
              ) : null}
            </form>
          )}
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
