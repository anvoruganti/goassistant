// Reusable button — primary/secondary/amber variants with premium gradient + glow styling.
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "amber";
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky disabled:opacity-50";

  const variants = {
    primary:
      "bg-gradient-to-r from-cobalt to-[#3b6bff] text-white shadow-lg glow-cobalt hover:-translate-y-0.5 hover:shadow-xl",
    secondary:
      "border border-white/15 glass text-offwhite hover:border-sky/50 hover:text-sky",
    amber:
      "bg-gradient-to-r from-amber to-[#f7b95c] text-navy shadow-lg glow-amber hover:-translate-y-0.5",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
