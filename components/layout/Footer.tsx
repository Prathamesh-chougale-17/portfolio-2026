import Link from "next/link"
import { RadioTower } from "lucide-react"

import { Icons } from "@/components/icons"
import { navItems, profile } from "@/data/event-horizon"

export function Footer() {
  const github = profile.socials.find((link) => link.label === "GitHub")
  const linkedin = profile.socials.find((link) => link.label === "LinkedIn")
  const GitHubIcon = Icons.gitHub
  const LinkedInIcon = Icons.linkedin

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#02030a]/88">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
              <RadioTower className="size-4" />
            </span>
            <p className="font-heading text-lg font-semibold text-slate-50">
              Event Horizon OS
            </p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            {profile.tagline} A mission-control archive for backend systems,
            blockchain protocols, frontend galaxies, and experiments in orbit.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-200 uppercase">
            Navigation
          </p>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-400 transition hover:text-cyan-100"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-cyan-200 uppercase">
            Signal links
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={github?.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href={linkedin?.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>
          <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">
            STATUS: ONLINE / BUILD: 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
