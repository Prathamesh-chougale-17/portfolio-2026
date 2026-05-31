"use client"

import {
  type ComponentType,
  FormEvent,
  KeyboardEvent,
  WheelEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Command, Cpu, RadioTower, ShieldCheck, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { projects, researchLogs, skills } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

type TerminalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Entry = {
  id: string
  command?: string
  lines: string[]
  time: string
  variant?: "system" | "error" | "success"
}

const commandList = [
  "help",
  "whoami",
  "status",
  "skills",
  "skills --json",
  "projects",
  "projects --backend",
  "projects --blockchain",
  "project ",
  "blog",
  "logs",
  "contact",
  "open /projects",
  "open /blog",
  "open /contact",
  "ls",
  "pwd",
  "date",
  "uptime",
  "ping",
  "history",
  "clear",
  "sudo enter-black-hole",
  "exit",
]

const INITIAL_STAMP = "--:--:--"

const BOOT_ENTRY: Entry = {
  id: "terminal-boot",
  command: "boot",
  time: "boot",
  variant: "system",
  lines: [
    "Event Horizon OS terminal attached.",
    "Telemetry stream online. Type help for available commands.",
  ],
}

function stamp() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())
}

function id() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`
}

export function Terminal({ open, onOpenChange }: TerminalProps) {
  const [input, setInput] = useState("")
  const [entries, setEntries] = useState<Entry[]>(() => [BOOT_ENTRY])
  const [singularity, setSingularity] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [, setHistoryIndex] = useState<number | null>(null)
  const [processing, setProcessing] = useState(false)
  const [clock, setClock] = useState(INITIAL_STAMP)
  const [latency, setLatency] = useState(18)
  const [uptime, setUptime] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

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
    if (!open) return

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    window.setTimeout(() => inputRef.current?.focus(), 80)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const initialSync = window.setTimeout(() => {
      setClock(stamp())
    }, 0)

    const interval = window.setInterval(() => {
      setClock(stamp())
      setLatency(14 + Math.round(Math.random() * 22))
      setUptime((value) => value + 1)
    }, 1000)

    return () => {
      window.clearTimeout(initialSync)
      window.clearInterval(interval)
    }
  }, [open])

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [entries, singularity])

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function pushEntry(entry: Omit<Entry, "id" | "time">) {
    setEntries((value) => [...value, { ...entry, id: id(), time: stamp() }])
  }

  function openRoute(path: string) {
    window.location.assign(path)
  }

  function projectLookup(raw: string) {
    const query = raw
      .replace(/^project\s+/i, "")
      .trim()
      .toLowerCase()
    const project = projects.find(
      (item) =>
        item.slug === query ||
        item.missionName.toLowerCase() === query ||
        item.missionName.toLowerCase().includes(query)
    )

    if (!project) {
      return [
        `Mission not found for "${query}".`,
        "Try: project carbon track, project bounty quest, or projects --backend.",
      ]
    }

    return [
      `${project.signal} / ${project.missionName}`,
      `Type: ${project.type}`,
      `Stack: ${project.stack.slice(0, 7).join(", ")}`,
      `Route: /projects/${project.slug}`,
      project.description,
    ]
  }

  function linesFor(command: string): {
    lines: string[]
    variant?: Entry["variant"]
    after?: () => void
  } {
    const normalized = command.trim().toLowerCase()

    if (normalized.startsWith("project ")) {
      return { lines: projectLookup(command), variant: "success" }
    }

    if (normalized.startsWith("open ")) {
      const route = normalized.replace("open ", "").trim()
      const allowed = ["/", "/projects", "/blog", "/contact"]
      if (!allowed.includes(route)) {
        return {
          lines: [`Route ${route} is not in the mission map.`],
          variant: "error",
        }
      }
      return {
        lines: [`Opening route ${route}...`],
        variant: "success",
        after: () => openRoute(route),
      }
    }

    switch (normalized) {
      case "help":
        return {
          lines: [
            "Core commands: whoami, status, skills, projects, blog, contact.",
            "Filters: projects --backend, projects --blockchain, skills --json.",
            "Navigation: open /projects, open /blog, open /contact.",
            "Inspection: project <mission-name>, ls, pwd, uptime, date, ping, history.",
            "System: clear, exit, sudo enter-black-hole.",
          ],
        }
      case "whoami":
        return {
          lines: [
            "You are viewing the mission-control portfolio of a backend-first full-stack and blockchain developer.",
            "Identity vector: APIs, databases, blockchain protocols, system architecture, cinematic frontend interfaces.",
          ],
          variant: "success",
        }
      case "status":
        return {
          lines: [
            "BACKEND CORE: ONLINE",
            "BLOCKCHAIN NODE: SYNCHRONIZED",
            "FRONTEND INTERFACE: RENDERED",
            `LATENCY: ${latency}ms`,
            `MISSIONS INDEXED: ${projects.length}`,
          ],
          variant: "success",
        }
      case "skills":
        scrollTo("skill-orbit")
        return {
          lines: ["Opening skill orbit...", skills.join(" / ")],
          variant: "success",
        }
      case "skills --json":
        return {
          lines: [JSON.stringify({ skills }, null, 2)],
        }
      case "projects":
        scrollTo("featured-missions")
        return {
          lines: [
            `Opening mission archive: ${projects.length} systems, protocols, interfaces, and experiments.`,
            projects
              .slice(0, 8)
              .map((project) => `${project.signal}: ${project.missionName}`)
              .join("\n"),
          ],
          variant: "success",
        }
      case "projects --backend":
        scrollTo("featured-missions")
        return {
          lines: [
            "Backend archive opened.",
            backendProjects
              .slice(0, 8)
              .map((project) => `${project.signal}: ${project.missionName}`)
              .join("\n"),
          ],
          variant: "success",
        }
      case "projects --blockchain":
        scrollTo("blockchain-orbit")
        return {
          lines: [
            "Blockchain archive opened.",
            blockchainProjects
              .map((project) => `${project.signal}: ${project.missionName}`)
              .join("\n"),
          ],
          variant: "success",
        }
      case "blog":
      case "logs":
        scrollTo("research-logs")
        return {
          lines: [
            "Research Logs opened.",
            researchLogs
              .slice(0, 6)
              .map((log) => `${log.number}: ${log.title}`)
              .join("\n"),
          ],
          variant: "success",
        }
      case "contact":
        scrollTo("contact-transmission")
        return {
          lines: [
            "Deep Space Transmission console located.",
            "Route: Browser -> API -> Mail Service -> Developer Inbox.",
          ],
          variant: "success",
        }
      case "ls":
        return {
          lines: [
            "home/",
            "projects/",
            "blog/",
            "contact/",
            "singularity-lab/",
            "telemetry.json",
            "profile.json",
          ],
        }
      case "pwd":
        return { lines: ["/event-horizon-os/mission-control"] }
      case "date":
        return { lines: [new Date().toString()] }
      case "uptime":
        return { lines: [`Terminal uptime: ${uptime}s`] }
      case "ping":
        return {
          lines: [`PING developer-core: seq=1 ttl=64 time=${latency}ms`],
          variant: "success",
        }
      case "history":
        return {
          lines: history.length
            ? history.map((item, index) => `${index + 1}  ${item}`)
            : ["No command history yet."],
        }
      case "sudo enter-black-hole":
        setSingularity(true)
        return {
          lines: [
            "Access granted.",
            "Singularity Lab mounted at /event-horizon-os/singularity-lab.",
          ],
          variant: "success",
        }
      case "clear":
      case "cls":
        setEntries([])
        return { lines: [] }
      case "exit":
        return {
          lines: ["Closing terminal session..."],
          after: () => onOpenChange(false),
        }
      default:
        return {
          lines: [
            `Command not recognized: ${command}`,
            "Type help for the mission command index.",
          ],
          variant: "error",
        }
    }
  }

  function runCommand(command: string) {
    const trimmed = command.trim()
    if (!trimmed) return

    setHistory((value) => [...value, trimmed])
    setHistoryIndex(null)
    setProcessing(true)

    pushEntry({
      command: trimmed,
      lines: ["routing command through mission bus..."],
      variant: "system",
    })

    window.setTimeout(() => {
      const result = linesFor(trimmed)
      if (result.lines.length) {
        pushEntry({
          command: trimmed,
          lines: result.lines,
          variant: result.variant,
        })
      }
      setProcessing(false)
      result.after?.()
    }, 260)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runCommand(input)
    setInput("")
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setHistoryIndex((current) => {
        const next =
          current === null ? history.length - 1 : Math.max(0, current - 1)
        setInput(history[next] ?? input)
        return next
      })
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHistoryIndex((current) => {
        if (current === null) return null
        const next = current + 1
        if (next >= history.length) {
          setInput("")
          return null
        }
        setInput(history[next] ?? "")
        return next
      })
    }

    if (event.key === "Tab") {
      event.preventDefault()
      const match = commandList.find((command) =>
        command.toLowerCase().startsWith(input.toLowerCase())
      )
      if (match) setInput(match)
    }
  }

  function stopWheel(event: WheelEvent) {
    event.stopPropagation()
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] bg-[#02030a]/78 backdrop-blur-sm transition",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
      onWheel={stopWheel}
      data-lenis-prevent
    >
      <div className="flex min-h-svh items-end justify-center p-3 sm:items-center sm:p-6">
        <section
          role="dialog"
          aria-modal="true"
          aria-label="Event Horizon OS command terminal"
          className={cn(
            "hud-panel w-full max-w-4xl overflow-hidden rounded-lg transition duration-300",
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
          data-terminal-dialog
          data-lenis-prevent
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <Command className="size-4 text-cyan-200" />
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-slate-200 uppercase">
                  Event Horizon Shell
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  /mission-control/live-terminal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Telemetry label="Clock" value={clock} />
              <Telemetry label="Ping" value={`${latency}ms`} />
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
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_230px]">
            <div
              ref={outputRef}
              className="max-h-[58svh] min-h-[420px] [scrollbar-color:#22d3ee33_transparent] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-sm"
              data-terminal-output
              data-lenis-prevent
              onWheel={stopWheel}
            >
              {entries.map((entry) => (
                <div key={entry.id} className="mb-5">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.16em] uppercase">
                    <span className="text-slate-600">{entry.time}</span>
                    {entry.command ? (
                      <span className="text-cyan-200">
                        &gt; {entry.command}
                      </span>
                    ) : null}
                  </div>
                  <pre
                    className={cn(
                      "mt-2 leading-7 break-words whitespace-pre-wrap",
                      entry.variant === "error" && "text-rose-200",
                      entry.variant === "success" && "text-emerald-100",
                      entry.variant === "system" && "text-cyan-100",
                      !entry.variant && "text-slate-300"
                    )}
                  >
                    {entry.lines.join("\n")}
                  </pre>
                </div>
              ))}
              {processing ? (
                <p className="mb-5 text-cyan-200">
                  <span className="inline-block animate-pulse">processing</span>
                  <span className="text-slate-600"> ...</span>
                </p>
              ) : null}
              {singularity ? (
                <div className="mt-5 border border-violet-300/30 bg-violet-400/10 p-4">
                  <p className="font-mono text-xs tracking-[0.18em] text-violet-100 uppercase">
                    Singularity Lab
                  </p>
                  <p className="mt-3 leading-7 text-slate-300">
                    Experimental ideas: protocol visualizers, blockchain indexer
                    observability, architecture simulations, WebGL interfaces,
                    and chain telemetry that explains system state instead of
                    hiding it.
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="hidden border-l border-white/10 bg-black/20 p-4 lg:block">
              <StatusRow icon={ShieldCheck} label="Link" value="Stable" />
              <StatusRow icon={RadioTower} label="Route" value="Secure" />
              <StatusRow icon={Cpu} label="Uptime" value={`${uptime}s`} />
              <div className="mt-5 border border-white/10 bg-white/[0.035] p-3">
                <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-200 uppercase">
                  Quick commands
                </p>
                <div className="mt-3 grid gap-2">
                  {[
                    "help",
                    "status",
                    "projects --backend",
                    "skills",
                    "ping",
                  ].map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => runCommand(command)}
                      className="border border-white/10 bg-black/20 px-2 py-2 text-left font-mono text-[11px] text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <form onSubmit={onSubmit} className="border-t border-white/10 p-4">
            <label className="sr-only" htmlFor="terminal-command">
              Terminal command
            </label>
            <div className="flex items-center gap-3 border border-cyan-300/20 bg-black/35 px-3 py-2">
              <span className="font-mono text-cyan-200">eh-os:~$</span>
              <input
                ref={inputRef}
                id="terminal-command"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="help"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="hidden font-mono text-[10px] tracking-[0.16em] text-slate-600 uppercase sm:inline">
                tab completes
              </span>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden border border-white/10 bg-white/[0.035] px-3 py-2 font-mono sm:block">
      <p className="text-[9px] tracking-[0.16em] text-slate-600 uppercase">
        {label}
      </p>
      <p className="mt-1 text-[11px] text-cyan-100">{value}</p>
    </div>
  )
}

function StatusRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 border border-white/10 bg-white/[0.035] p-3">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-cyan-200" />
        <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          {label}
        </span>
      </div>
      <span className="font-mono text-[11px] text-slate-200">{value}</span>
    </div>
  )
}
