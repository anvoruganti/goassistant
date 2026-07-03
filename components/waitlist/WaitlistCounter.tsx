// Scarcity cue for the founding cohort — soft nudge without a hard count.
export function WaitlistCounter() {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-cobalt/30 glass-strong p-6 glow-cobalt">
      <div className="flex items-center justify-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
        <p className="font-display text-2xl font-bold text-cobalt">Few spots left</p>
      </div>
      <p className="mt-3 text-center text-xs text-offwhite/50">
        Founding pricing locks the moment these fill.
      </p>
    </div>
  );
}
