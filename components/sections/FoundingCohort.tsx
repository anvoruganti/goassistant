// Founding cohort section — early-bird offer with live scarcity counter (amber accent only here).
import { foundingCohortCopy } from "@/content/form-options";
import { WaitlistCounter } from "@/components/waitlist/WaitlistCounter";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";

export function FoundingCohort() {
  return (
    <SectionShell>
      <div className="relative overflow-hidden rounded-3xl border border-amber/20 glass-strong px-6 py-14 sm:px-12">
        {/* Amber ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber/15 blur-[100px]" />

        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-4 py-1.5 text-sm font-semibold text-amber animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {foundingCohortCopy.title}
            </span>

            <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {foundingCohortCopy.subtitle}
            </h2>

            <ul className="mx-auto mt-8 grid gap-3 text-left sm:max-w-md">
              {foundingCohortCopy.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 rounded-xl border border-white/10 glass px-4 py-3 text-offwhite/85"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/20 text-sm text-amber">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <WaitlistCounter />

            <div className="mt-8">
              <Button href="#waitlist" variant="amber" className="text-base">
                Reserve my spot
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
