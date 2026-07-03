// Shared section wrapper — consistent max-width, padding, and vertical rhythm across sections.
import type { ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
}

export function SectionShell({
  id,
  children,
  className = "",
  variant = "dark",
}: SectionShellProps) {
  const bgClass = variant === "light" ? "bg-offwhite text-navy" : "bg-navy text-offwhite";

  return (
    <section id={id} className={`${bgClass} px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
