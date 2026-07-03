// Form field primitive — label, input/select, and inline error in one composable unit.
import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

interface FieldBaseProps {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
  variant?: "dark" | "light";
}

function FieldWrapper({ label, name, error, children, variant = "dark" }: FieldBaseProps) {
  const labelClass = variant === "light" ? "text-navy/80" : "text-offwhite/80";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={`text-sm font-medium ${labelClass}`}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "dark" | "light";
}

export function TextField({
  label,
  name,
  error,
  variant = "dark",
  className = "",
  ...props
}: TextFieldProps) {
  const inputClass =
    variant === "light"
      ? "rounded-lg border border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt"
      : "rounded-lg border border-offwhite/15 bg-navy/60 px-4 py-3 text-offwhite placeholder:text-offwhite/40 focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt";

  return (
    <FieldWrapper label={label} name={name!} error={error} variant={variant}>
      <input id={name} name={name} className={`${inputClass} ${className}`} {...props} />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  variant?: "dark" | "light";
}

export function SelectField({
  label,
  name,
  error,
  options,
  placeholder = "Select…",
  variant = "dark",
  className = "",
  ...props
}: SelectFieldProps) {
  const selectClass =
    variant === "light"
      ? "rounded-lg border border-navy/15 bg-white px-4 py-3 text-navy focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt"
      : "rounded-lg border border-offwhite/15 bg-navy/60 px-4 py-3 text-offwhite focus:border-cobalt focus:outline-none focus:ring-1 focus:ring-cobalt";

  return (
    <FieldWrapper label={label} name={name!} error={error} variant={variant}>
      <select id={name} name={name} className={`${selectClass} ${className}`} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-navy">
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
