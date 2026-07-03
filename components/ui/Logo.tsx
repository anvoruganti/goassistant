// GO Assistant wordmark — inline SVG tuned for dark backgrounds (brand green + white).
interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className = "", height = 36 }: LogoProps) {
  const width = Math.round(height * (220 / 56));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 56"
      width={width}
      height={height}
      fill="none"
      role="img"
      aria-label="GO Assistant"
      className={className}
    >
      {/* Chat bubble */}
      <rect x="2" y="4" width="44" height="44" rx="10" stroke="#45A055" strokeWidth="3" />
      <path
        d="M2 38 L2 48 L12 38"
        stroke="#45A055"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="22" r="2.5" fill="#45A055" />
      <circle cx="32" cy="22" r="2.5" fill="#45A055" />
      <path
        d="M14 32 Q24 40 34 32"
        stroke="#45A055"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* GO */}
      <text
        x="58"
        y="30"
        fill="#FFFFFF"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        GO
      </text>

      {/* ASSISTANT */}
      <text
        x="58"
        y="50"
        fill="#45A055"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.16em"
      >
        ASSISTANT
      </text>
    </svg>
  );
}
