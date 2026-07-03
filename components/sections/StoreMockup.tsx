// Store mockup section — realistic store page with the widget docked, conversation plays on scroll.
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { heroAnimationBeats } from "@/content/hero";
import { TypingMessage } from "@/components/hero/TypingMessage";
import { ThinkingIndicator } from "@/components/hero/ThinkingIndicator";
import { ProductResultCard } from "@/components/hero/ProductResultCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionHeader } from "@/components/ui/SectionHeader";

type MockPhase = "idle" | "typing" | "thinking" | "product";

const STORE_TILES = [
  "/images/kurta-1.png",
  "/images/kurta-2.png",
  "/images/kurta-3.png",
  "/images/kurta-4.png",
  "/images/kurta-5.png",
];

export function StoreMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<MockPhase>("idle");

  const beat = heroAnimationBeats[0];

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setPhase("product");
      return;
    }
    setPhase("typing");
    const t1 = window.setTimeout(() => setPhase("thinking"), 3200);
    const t2 = window.setTimeout(() => setPhase("product"), 4200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [isInView, prefersReducedMotion]);

  return (
    <SectionShell>
      <RevealOnScroll>
        <SectionHeader
          eyebrow="On your store"
          title="It lives where your customers already are."
          subtitle="GO Assistant sits right on your product pages. Customers talk to it the way they'd talk to someone on the shop floor."
        />
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <div className="relative mt-12">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-cobalt/10 blur-3xl" />
          <div
            ref={ref}
            className="overflow-hidden rounded-2xl border border-white/10 glass-strong card-glow"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-2 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-offwhite/40">
                aurelia.store / collections / kurtas
              </div>
            </div>

            <div className="grid lg:grid-cols-3">
              {/* Store content */}
              <div className="border-b border-white/10 p-6 lg:col-span-2 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-display text-lg font-bold tracking-wide text-offwhite/90">
                    AURELIA
                  </div>
                  <div className="hidden gap-5 text-xs text-offwhite/40 sm:flex">
                    <span>New In</span>
                    <span className="text-offwhite/70">Kurtas</span>
                    <span>Sale</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.03]"
                    >
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={STORE_TILES[n % STORE_TILES.length]}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 45vw, 180px"
                          className="object-cover opacity-85"
                        />
                      </div>
                      <div className="space-y-1.5 p-2.5">
                        <div className="h-2 w-3/4 rounded bg-white/10" />
                        <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Docked widget */}
              <div className="p-5">
                <motion.div
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-cobalt/30 glass-strong shadow-lg"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cobalt text-[10px] font-bold text-white">
                      GO
                    </span>
                    <span className="text-xs font-medium text-offwhite/70">GO Assistant</span>
                    <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online
                    </span>
                  </div>
                  <div className="min-h-[240px] flex-1 space-y-3 p-3">
                    <TypingMessage
                      message={beat.customerMessage}
                      active={phase === "typing"}
                      speedMs={30}
                    />
                    <ThinkingIndicator visible={phase === "thinking"} />
                    <ProductResultCard
                      productName={beat.productName}
                      productDetail={beat.productDetail}
                      imageSrc={beat.imageSrc}
                      imageAlt={beat.imageAlt}
                      visible={phase === "product"}
                    />
                  </div>
                  <div className="border-t border-white/10 p-2.5">
                    <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-offwhite/30">
                      Describe what you&apos;re looking for…
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </SectionShell>
  );
}
