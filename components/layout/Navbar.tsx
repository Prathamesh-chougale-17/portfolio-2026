"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Command, FileText, Menu, Satellite, X } from "lucide-react"
import { useState } from "react"

import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { navItems, profile } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const github = profile.socials.find((link) => link.label === "GitHub")
  const linkedin = profile.socials.find((link) => link.label === "LinkedIn")
  const GitHubIcon = Icons.gitHub
  const LinkedInIcon = Icons.linkedin

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#02030a]/78 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
            <Satellite className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block font-heading text-sm font-semibold tracking-[0.22em] text-slate-50 uppercase">
              Event Horizon OS
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-cyan-200/70 uppercase sm:block">
              Mission control portfolio
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 font-mono text-xs tracking-[0.18em] text-slate-400 uppercase transition hover:text-cyan-100",
                pathname === item.href && "text-cyan-200"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            aria-label="Open command terminal"
            onClick={onOpenTerminal}
            title="Open command terminal"
            className="border-cyan-300/20 bg-cyan-300/5 text-cyan-100 hover:bg-cyan-300/10"
          >
            <Command className="size-4" />
          </Button>
          <a
            href={github?.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            )}
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={linkedin?.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            )}
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href="/resume.pdf"
            aria-label="Resume placeholder"
            className={cn(
              buttonVariants({ size: "default" }),
              "h-9 border border-yellow-300/30 bg-yellow-300 text-slate-950 hover:bg-yellow-200"
            )}
          >
            <FileText className="size-4" />
            Resume
          </a>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="border-white/10 bg-white/5 text-slate-200 lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#02030a]/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border border-white/10 px-3 py-3 font-mono text-xs tracking-[0.18em] text-slate-300 uppercase",
                  pathname === item.href && "border-cyan-300/30 text-cyan-200"
                )}
              >
                {item.title}
              </Link>
            ))}
            <Button onClick={onOpenTerminal} className="mt-2">
              <Command className="size-4" />
              Command Palette
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
