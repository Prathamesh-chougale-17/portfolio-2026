"use client"

import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { Command, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { projects, skills } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

type TerminalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Entry = {
  command: string
  response: string
}

const initialEntries: Entry[] = [
  {
    command: "boot",
    response:
      "Event Horizon OS terminal ready. Try whoami, skills, projects, blog, contact, or sudo enter-black-hole.",
  },
]

export function Terminal({ open, onOpenChange }: TerminalProps) {
  const [input, setInput] = useState("")
  const [entries, setEntries] = useState<Entry[]>(initialEntries)
  const [singularity, setSingularity] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const backendProjects = useMemo(
    () => projects.filter((project) => project.categories.includes("Backend")),
    []
  )
  const blockchainProjects = useMemo(
    () =>
      projects.filter((project) => project.categories.includes("Blockchain")),
    []
  )

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function responseFor(command: string) {
    const normalized = command.trim().toLowerCase()

    switch (normalized) {
      case "whoami":
        return "You are viewing the mission-control portfolio of a backend-first full-stack and blockchain developer."
      case "skills":
        scrollTo("skill-orbit")
        return `Opening skill orbit: ${skills.slice(0, 8).join(", ")} and more.`
      case "projects":
        scrollTo("featured-missions")
        return `Opening mission archive: ${projects.length} systems, protocols, interfaces, and experiments.`
      case "projects --backend":
        scrollTo("featured-missions")
        return `Opening backend mission archive: ${backendProjects
          .slice(0, 5)
          .map((project) => project.missionName)
          .join(", ")}.`
      case "projects --blockchain":
        scrollTo("blockchain-orbit")
        return `Opening blockchain mission archive: ${blockchainProjects
          .slice(0, 5)
          .map((project) => project.missionName)
          .join(", ")}.`
      case "blog":
        scrollTo("research-logs")
        return "Opening Research Logs: backend architecture, blockchain systems, frontend experiments, and developer philosophy."
      case "contact":
        scrollTo("contact-transmission")
        return "Opening Deep Space Transmission console."
      case "sudo enter-black-hole":
        setSingularity(true)
        return "Access granted. Singularity Lab is now visible inside this terminal session."
      case "clear":
        setEntries([])
        return ""
      default:
        return "Unknown command. Available: whoami, skills, projects, projects --backend, projects --blockchain, blog, contact, sudo enter-black-hole."
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const command = input.trim()
    if (!command) return

    const response = responseFor(command)
    if (command.toLowerCase() !== "clear") {
      setEntries((value) => [...value, { command, response }])
    }
    setInput("")
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] bg-[#02030a]/70 backdrop-blur-sm transition",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="flex min-h-svh items-end justify-center p-3 sm:items-center sm:p-6">
        <section
          role="dialog"
          aria-modal="true"
          aria-label="Event Horizon OS command terminal"
          className={cn(
            "hud-panel w-full max-w-3xl rounded-lg transition duration-300",
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <Command className="size-4 text-cyan-200" />
              <p className="font-mono text-xs tracking-[0.18em] text-slate-200 uppercase">
                Command Terminal
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close terminal"
              onClick={() => onOpenChange(false)}
              className="text-slate-300"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="max-h-[52svh] overflow-y-auto px-4 py-4 font-mono text-sm">
            {entries.map((entry, index) => (
              <div key={`${entry.command}-${index}`} className="mb-4">
                <p className="text-cyan-200">&gt; {entry.command}</p>
                {entry.response ? (
                  <p className="mt-2 leading-7 text-slate-300">
                    {entry.response}
                  </p>
                ) : null}
              </div>
            ))}
            {singularity ? (
              <div className="mt-5 border border-violet-300/30 bg-violet-400/10 p-4">
                <p className="font-mono text-xs tracking-[0.18em] text-violet-100 uppercase">
                  Singularity Lab
                </p>
                <p className="mt-3 leading-7 text-slate-300">
                  Experimental ideas: protocol visualizers, blockchain indexer
                  observability, architecture simulations, and WebGL interfaces
                  that explain system state instead of hiding it.
                </p>
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="border-t border-white/10 p-4">
            <label className="sr-only" htmlFor="terminal-command">
              Terminal command
            </label>
            <div className="flex items-center gap-3 border border-cyan-300/20 bg-black/35 px-3 py-2">
              <span className="font-mono text-cyan-200">&gt;</span>
              <input
                ref={inputRef}
                id="terminal-command"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="whoami"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
