// Hero section — narrative, thesis line, product intro, CTA, and the cinematic demo centerpiece.
import { siteConfig } from "@/content/site";
import { heroProductIntro } from "@/content/hero";
import { foundingCohortCopy } from "@/content/form-options";
import { CinematicDemo } from "@/components/hero/CinematicDemo";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute left-1/2 top-[-10%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cobalt/25 blur-[120px] animate-aurora" />
        <div className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-sky/15 blur-[120px] animate-aurora" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Copy column */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 glass px-3.5 py-1.5 text-xs font-medium text-offwhite/70">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
              Now onboarding the {foundingCohortCopy.title}
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="text-gradient">Your best salesperson,</span>
              <br />
              <span className="text-gradient-cobalt">on every product page.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/70">
              In a store, a customer says{" "}
              <span className="text-offwhite">
                &ldquo;something lighter, brighter, with a smaller border,&rdquo;
              </span>{" "}
              and a good associate knows what to bring. Online, that conversation never happens.
            </p>

            <blockquote className="mt-6 border-l-2 border-cobalt pl-5 font-display text-lg font-semibold leading-snug text-offwhite/90 sm:text-xl">
              {siteConfig.thesisLine}
            </blockquote>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/60">
              <span className="font-semibold text-cobalt">That&apos;s GO Assistant.</span>{" "}
              {heroProductIntro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#waitlist" variant="primary" className="text-base">
                Reserve my spot
              </Button>
              <Button href="#how" variant="secondary" className="text-base">
                See how it works
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-offwhite/45">
              <span>No code</span>
              <span className="h-1 w-1 rounded-full bg-offwhite/20" />
              <span>Native Shopify and WooCommerce</span>
              <span className="h-1 w-1 rounded-full bg-offwhite/20" />
              <span>Speaks your customers&apos; language</span>
            </div>
          </div>

          {/* Demo column */}
          <div className="lg:pt-4">
            <CinematicDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
