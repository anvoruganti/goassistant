// How It Works section — 3 steps plus monospace credibility strip (dark premium).
import { credibilityItems, howItWorksSteps } from "@/content/how-it-works";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HowItWorks() {
  return (
    <SectionShell id="how">
      <RevealOnScroll>
        <SectionHeader
          eyebrow="How it works"
          title="Built by people who know what they're doing."
          subtitle="Connect your store and GO Assistant handles the rest, from reading your catalog to keeping up as it changes."
        />
      </RevealOnScroll>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {howItWorksSteps.map((step, index) => (
          <RevealOnScroll key={step.number} delay={index * 0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 glass p-6 transition-all duration-300 hover:border-cobalt/40 hover:card-glow">
              <span className="font-display text-5xl font-bold text-white/[0.06]">
                {step.number}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-offwhite">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-offwhite/60">{step.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-white/10 glass px-5 py-4">
          {credibilityItems.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-sky/40" />}
              <span className="font-mono text-xs tracking-wide text-offwhite/60">{item}</span>
            </span>
          ))}
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
