// Category examples section — data-driven customer→product pattern across verticals (premium cards).
import Image from "next/image";
import { categoryExamples } from "@/content/categories";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CategoryExamples() {
  return (
    <SectionShell>
      <RevealOnScroll>
        <SectionHeader
          eyebrow="Works everywhere"
          title="Same conversation. Any category."
          subtitle="Your customers already describe what they want. GO Assistant listens, whether you sell kurtas, phone cases, or sofas."
        />
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryExamples.map((example, index) => (
          <RevealOnScroll key={example.id} delay={index * 0.1}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 glass transition-all duration-300 hover:-translate-y-1 hover:border-sky/30 hover:card-glow">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky/70">
                  {example.category}
                </span>
                <span className="text-[10px] text-offwhite/30">customer says</span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-sm bg-gradient-to-r from-cobalt/90 to-[#52B868]/90 px-3.5 py-2.5 text-sm leading-relaxed text-white">
                  &ldquo;{example.customerMessage}&rdquo;
                </div>
                <div className="mt-auto overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={example.imageSrc}
                      alt={example.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-2 top-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-medium text-emerald-300 backdrop-blur">
                      matched
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-offwhite">{example.productName}</p>
                    <p className="mt-0.5 text-xs text-offwhite/50">{example.productDetail}</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </SectionShell>
  );
}
