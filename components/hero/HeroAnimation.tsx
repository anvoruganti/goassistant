// Hero animation orchestrator — runs the 14s loop timeline; subcomponents handle each visual beat.
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroAnimationBeats } from "@/content/hero";
import { ChatFrame } from "@/components/hero/ChatFrame";
import { TypingMessage } from "@/components/hero/TypingMessage";
import { ThinkingIndicator } from "@/components/hero/ThinkingIndicator";
import { ProductResultCard } from "@/components/hero/ProductResultCard";

type Phase =
  | "frameIn"
  | "typingEn"
  | "thinkingEn"
  | "productEn"
  | "holdEn"
  | "typingHi"
  | "productHi";

export function HeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("frameIn");

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    const runLoop = () => {
      setPhase("frameIn");
      schedule(() => setPhase("typingEn"), 2000);
      schedule(() => setPhase("thinkingEn"), 5000);
      schedule(() => setPhase("productEn"), 6000);
      schedule(() => setPhase("holdEn"), 9000);
      schedule(() => setPhase("typingHi"), 9500);
      schedule(() => setPhase("productHi"), 12000);
      schedule(runLoop, 14000);
    };

    runLoop();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  const enBeat = heroAnimationBeats[0];
  const hiBeat = heroAnimationBeats[1];

  if (prefersReducedMotion) {
    return (
      <ChatFrame visible className="mx-auto w-full max-w-sm">
        <div className="rounded-2xl rounded-bl-sm bg-cobalt/20 px-4 py-3 text-sm leading-relaxed">
          {enBeat.customerMessage}
        </div>
        <ProductResultCard
          productName={enBeat.productName}
          productDetail={enBeat.productDetail}
          imageSrc={enBeat.imageSrc}
          imageAlt={enBeat.imageAlt}
          visible
        />
      </ChatFrame>
    );
  }

  const showEnMessage =
    phase === "typingEn" ||
    phase === "thinkingEn" ||
    phase === "productEn" ||
    phase === "holdEn";
  const showEnThinking = phase === "thinkingEn";
  const showEnProduct =
    phase === "productEn" || phase === "holdEn" || phase === "typingHi" || phase === "productHi";
  const showHiMessage = phase === "typingHi" || phase === "productHi";
  const showHiProduct = phase === "productHi";

  return (
    <div className="mx-auto w-full max-w-sm">
      <ChatFrame visible>
        <AnimatePresence mode="wait">
          {showEnMessage && !showHiMessage ? (
            <motion.div key="en-sequence" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <TypingMessage
                message={enBeat.customerMessage}
                active={phase === "typingEn"}
                speedMs={30}
              />
              <ThinkingIndicator visible={showEnThinking} />
              <ProductResultCard
                productName={enBeat.productName}
                productDetail={enBeat.productDetail}
                imageSrc={enBeat.imageSrc}
                imageAlt={enBeat.imageAlt}
                visible={showEnProduct && !showHiMessage}
              />
            </motion.div>
          ) : null}

          {showHiMessage ? (
            <motion.div
              key="hi-sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <TypingMessage
                message={hiBeat.customerMessage}
                active={phase === "typingHi"}
                speedMs={28}
              />
              <ProductResultCard
                productName={hiBeat.productName}
                productDetail={hiBeat.productDetail}
                imageSrc={hiBeat.imageSrc}
                imageAlt={hiBeat.imageAlt}
                visible={showHiProduct}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ChatFrame>
    </div>
  );
}
