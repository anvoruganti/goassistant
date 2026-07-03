// Chat widget frame mock — visual container for hero/store animation sequences.
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ChatFrameProps {
  children: ReactNode;
  visible?: boolean;
  className?: string;
}

export function ChatFrame({ children, visible = true, className = "" }: ChatFrameProps) {
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border border-offwhite/10 bg-[#111827] shadow-2xl shadow-black/40 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 border-b border-offwhite/10 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-cobalt" />
        <span className="text-xs font-medium text-offwhite/60">GO Assistant</span>
      </div>
      <div className="space-y-3 p-4">{children}</div>
      <div className="border-t border-offwhite/10 px-4 py-3">
        <div className="rounded-lg border border-offwhite/10 bg-navy/50 px-3 py-2 text-xs text-offwhite/30">
          Describe what you&apos;re looking for…
        </div>
      </div>
    </motion.div>
  );
}
