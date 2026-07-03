// Cinematic store demo — code-driven "video": cursor enters, opens the widget, view zooms in,
// customer types, and matching results scroll. Single timeline state machine (SRP: visuals only).
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Stage =
  | "browse"
  | "reach"
  | "open"
  | "type"
  | "think"
  | "results"
  | "scroll"
  | "reset";

interface DemoResult {
  name: string;
  detail: string;
  image: string;
  match: string;
}

const KURTAS = [
  "/images/kurta-1.png",
  "/images/kurta-2.png",
  "/images/kurta-3.png",
  "/images/kurta-4.png",
  "/images/kurta-5.png",
];

const RESULTS_EN: DemoResult[] = [
  { name: "Blush Block-Print Kurta", detail: "Light cotton · Soft pink · Fine block print", image: KURTAS[1], match: "98% match" },
  { name: "Sage Self-Design Kurta", detail: "Airy weave · Muted sage · Slim placket", image: KURTAS[4], match: "94% match" },
  { name: "Monochrome Leaf Kurta", detail: "Lightweight · Crisp print · Minimal trim", image: KURTAS[2], match: "91% match" },
];

const QUERY_EN = "This is nice, but I want something lighter, brighter, with a smaller print.";
const QUERY_HI = "यह अच्छा है, पर मुझे कुछ हल्का, चमकीला, छोटे प्रिंट वाला चाहिए।";

// Timeline in ms; the sum defines one loop.
const TIMELINE: { stage: Stage; at: number }[] = [
  { stage: "browse", at: 0 },
  { stage: "reach", at: 1400 },
  { stage: "open", at: 2800 },
  { stage: "type", at: 3600 },
  { stage: "think", at: 7000 },
  { stage: "results", at: 7900 },
  { stage: "scroll", at: 9800 },
  { stage: "reset", at: 12400 },
];
const LOOP_MS = 13200;

export function CinematicDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("browse");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [typed, setTyped] = useState("");

  const query = lang === "en" ? QUERY_EN : QUERY_HI;

  // Typing effect driven by stage.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (stage !== "type") {
      if (stage === "browse" || stage === "reach" || stage === "open") setTyped("");
      return;
    }
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i += 1;
      setTyped(query.slice(0, i));
      if (i >= query.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [stage, query, prefersReducedMotion]);

  const runLoop = useCallback(() => {
    const timeouts = TIMELINE.map(({ stage: s, at }) =>
      setTimeout(() => setStage(s), at),
    );
    const loopId = setTimeout(() => {
      setLang((l) => (l === "en" ? "hi" : "en"));
    }, LOOP_MS - 200);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loopId);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStage("results");
      setTyped(QUERY_EN);
      return;
    }
    const cleanup = runLoop();
    const interval = setInterval(runLoop, LOOP_MS);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [runLoop, prefersReducedMotion]);

  const chatOpen =
    stage === "open" || stage === "type" || stage === "think" || stage === "results" || stage === "scroll";
  const zoomed = stage === "type" || stage === "think" || stage === "results" || stage === "scroll";
  const showResults = stage === "results" || stage === "scroll";

  const cursorPos =
    stage === "browse" || stage === "reset"
      ? { x: 250, y: 300, opacity: 0 }
      : stage === "reach"
        ? { x: 300, y: 250, opacity: 1 }
        : { x: 322, y: 236, opacity: chatOpen && zoomed ? 0 : 1 };

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-cobalt/20 blur-3xl animate-pulse-glow" />

      <div className="overflow-hidden rounded-2xl border border-white/10 glass-strong card-glow">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-[11px] text-offwhite/40">
            aurelia.store / kurtas
          </div>
        </div>

        {/* Stage viewport */}
        <div className="relative h-[420px] overflow-hidden bg-navy-800">
          <motion.div
            className="absolute inset-0 origin-bottom-right"
            animate={
              prefersReducedMotion
                ? { scale: 1 }
                : { scale: zoomed ? 1.35 : 1, x: zoomed ? -18 : 0, y: zoomed ? -8 : 0 }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Store page mock */}
            <div className="absolute inset-0 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-display text-sm font-bold tracking-wide text-offwhite/80">
                  AURELIA
                </div>
                <div className="flex gap-3 text-[10px] text-offwhite/40">
                  <span>New In</span>
                  <span>Kurtas</span>
                  <span>Sale</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.03]">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={KURTAS[n % KURTAS.length]}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover opacity-80"
                      />
                    </div>
                    <div className="space-y-1 p-1.5">
                      <div className="h-1.5 w-3/4 rounded bg-white/10" />
                      <div className="h-1.5 w-1/2 rounded bg-white/[0.06]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-0 bg-navy/70"
              animate={{ opacity: zoomed ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Chat launcher */}
            <AnimatePresence>
              {!chatOpen && (
                <motion.div
                  className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-cobalt text-white shadow-lg glow-cobalt"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: stage === "reach" ? 1.08 : 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-1L3 20l1-4.5a8.38 8.38 0 0 1-1-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  className="absolute bottom-4 right-4 flex h-[300px] w-[270px] flex-col overflow-hidden rounded-2xl border border-white/12 glass-strong shadow-2xl"
                  initial={{ scale: 0.4, opacity: 0, originX: 1, originY: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cobalt text-[10px] font-bold text-white">
                      GO
                    </span>
                    <span className="text-[11px] font-medium text-offwhite/70">GO Assistant</span>
                    <span className="ml-auto flex items-center gap-1 text-[9px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online
                    </span>
                  </div>

                  <div className="flex-1 space-y-2 overflow-hidden p-2.5">
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-cobalt px-3 py-2 text-[11px] leading-snug text-white">
                      {typed || (stage === "type" ? "" : query)}
                      {stage === "type" && typed.length < query.length && (
                        <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white align-middle" />
                      )}
                    </div>

                    <AnimatePresence>
                      {stage === "think" && (
                        <motion.div
                          className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-white/8 px-3 py-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-sky"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {showResults && (
                      <div className="relative h-[150px] overflow-hidden">
                        <motion.div
                          className="space-y-2"
                          animate={{ y: stage === "scroll" ? -104 : 0 }}
                          transition={{ duration: 1.6, ease: "easeInOut" }}
                        >
                          {RESULTS_EN.map((r, i) => (
                            <motion.div
                              key={r.name}
                              className="flex gap-2 rounded-xl border border-sky/20 bg-white/[0.04] p-1.5"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.18, duration: 0.4 }}
                            >
                              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                                <Image src={r.image} alt="" fill sizes="44px" className="object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[10px] font-semibold text-offwhite">{r.name}</p>
                                <p className="truncate text-[9px] text-offwhite/50">{r.detail}</p>
                                <span className="mt-0.5 inline-block rounded-full bg-emerald-500/15 px-1.5 py-px text-[8px] font-medium text-emerald-300">
                                  {r.match}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 p-2">
                    <div className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-offwhite/30">
                      Describe what you&apos;re looking for…
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Animated cursor */}
          {!prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute z-20"
              animate={cursorPos}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" className="drop-shadow-lg">
                <path
                  d="M4 2l6 16 2.5-6.5L19 9 4 2z"
                  fill="#ffffff"
                  stroke="#0b1220"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-offwhite/50">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live demo, understanding {lang === "en" ? "English" : "Hindi"} right now
      </div>
    </div>
  );
}
