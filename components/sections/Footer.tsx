// Footer — logo, contact, parent brand link, and LinkedIn.
import { siteConfig } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-14 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cobalt/50 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <Logo height={36} className="mx-auto sm:mx-0" />
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-3 block text-sm text-offwhite/50 transition-colors hover:text-sky"
          >
            {siteConfig.contactEmail}
          </a>
          <p className="mt-3 text-xs text-offwhite/30">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={siteConfig.parentBrand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-offwhite/60 transition-colors hover:text-sky"
          >
            A {siteConfig.parentBrand.name} product
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-offwhite/50 transition-colors hover:text-sky"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
