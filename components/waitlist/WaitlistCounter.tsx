// Live scarcity display — spots remaining is spotsTotal minus the real Supabase count (revalidates every 60s).
import { getWaitlistCount } from "@/lib/waitlist";
import { foundingCohortCopy } from "@/content/form-options";

export async function WaitlistCounter() {
  const count = await getWaitlistCount();
  const claimed = Math.min(foundingCohortCopy.spotsTotal, count);
  const remaining = Math.max(0, foundingCohortCopy.spotsTotal - count);
  const pct = Math.round((claimed / foundingCohortCopy.spotsTotal) * 100);

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-amber/30 glass-strong p-6 glow-amber">
      <div className="flex items-end justify-between">
        <div className="text-left">
          <p className="font-display text-5xl font-bold text-amber">{remaining}</p>
          <p className="mt-1 text-sm text-offwhite/70">
            {remaining === 1 ? "spot remaining" : "spots remaining"}
          </p>
        </div>
        <div className="text-right text-xs text-offwhite/50">
          <p className="font-mono text-offwhite/80">
            {claimed}/{foundingCohortCopy.spotsTotal}
          </p>
          <p>claimed</p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber to-[#f7b95c] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-offwhite/50">
        {remaining > 0
          ? "Founding pricing locks the moment these fill."
          : "The founding cohort is full. Join the waitlist for launch access."}
      </p>
    </div>
  );
}
