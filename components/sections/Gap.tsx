// The Gap section — contrasts rigid search/filter UI with natural customer language (dark premium).
import { gapCopy } from "@/content/gap";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Gap() {
  return (
    <SectionShell>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="The gap"
            title={gapCopy.headline}
            subtitle={gapCopy.lines[0]}
          />
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-offwhite/60">
            {gapCopy.lines[1]}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="relative">
            {/* Old way */}
            <div className="rounded-2xl border border-white/10 glass p-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/40">
                The old way — keyword search
              </p>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-offwhite/30">
                Search products…
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Category", "Price", "Size", "Color", "Material"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-offwhite/40"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs italic text-offwhite/40">
                The customer has to already know your words.
              </p>
            </div>

            {/* Connector */}
            <div className="my-3 flex items-center justify-center">
              <div className="h-8 w-px bg-gradient-to-b from-white/10 to-cobalt/50" />
            </div>

            {/* New way */}
            <div className="rounded-2xl border border-cobalt/30 glass-strong p-5 card-glow">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-sky/70">
                With GO Assistant — natural description
              </p>
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm bg-gradient-to-r from-cobalt to-[#52B868] px-3.5 py-2.5 text-sm leading-relaxed text-white">
                &ldquo;Something lighter, brighter, with a smaller border design.&rdquo;
              </div>
              <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                  ✓
                </span>
                Matched in seconds — no filters, no exact words.
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
