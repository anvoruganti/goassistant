// Typing message effect — character-by-character reveal for demo conversations.
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingMessageProps {
  message: string;
  active: boolean;
  speedMs?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingMessage({
  message,
  active,
  speedMs = 35,
  onComplete,
  className = "",
}: TypingMessageProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }

    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(message.slice(0, index));
      if (index >= message.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [active, message, speedMs, onComplete]);

  if (!active && displayed.length === 0) return null;

  return (
    <motion.div
      className={`max-w-[90%] rounded-2xl rounded-bl-sm bg-cobalt/20 px-4 py-3 text-sm leading-relaxed text-offwhite ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayed}
      {active && displayed.length < message.length ? (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-sky align-middle" />
      ) : null}
    </motion.div>
  );
}
