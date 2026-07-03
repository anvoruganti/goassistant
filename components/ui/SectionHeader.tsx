// Section header — consistent eyebrow + title + subtitle across sections (DRY, ISP-friendly).
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  variant?: "dark" | "light";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  variant = "dark",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "items-start";
  const subColor = variant === "light" ? "text-navy/60" : "text-offwhite/60";
  const eyebrowColor = variant === "light" ? "text-cobalt" : "text-sky";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      <span className={`text-xs font-mono font-medium uppercase tracking-[0.2em] ${eyebrowColor}`}>
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className={`text-lg leading-relaxed ${subColor}`}>{subtitle}</p> : null}
    </div>
  );
}
