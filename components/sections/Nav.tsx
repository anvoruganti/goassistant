// Top navigation — minimal sticky glass bar with logo and primary CTA.
import { foundingCohortCopy } from "@/content/form-options";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 glass px-4 py-2.5 sm:px-5">
        <a href="#top" className="shrink-0">
          <Logo height={32} />
        </a>
        <div className="hidden items-center gap-7 text-sm text-offwhite/60 md:flex">
          <a href="#how" className="transition-colors hover:text-offwhite">
            How it works
          </a>
          <a href="#waitlist" className="transition-colors hover:text-offwhite">
            {foundingCohortCopy.title}
          </a>
        </div>
        <Button href="#waitlist" variant="primary" className="px-4 py-2 text-xs">
          Reserve my spot
        </Button>
      </nav>
    </header>
  );
}
