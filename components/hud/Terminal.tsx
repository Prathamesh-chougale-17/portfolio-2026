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
import {
  Command,
  Cpu,
  KeyRound,
  Network,
  Palette,
  RadioTower,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  architectureLayers,
  backendFlow,
  profile,
  projects,
  researchLogs,
  skills,
} from "@/data/event-horizon"
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
  variant?: "system" | "error" | "success" | "egg"
}

type TerminalTheme = "cyan" | "amber" | "violet"

const commandList = [
  "help",
  "whoami",
  "whoami --deep",
  "status",
  "stack-map",
  "architecture",
  "trace request",
  "trace ",
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
  "cat profile.json",
  "scan stack",
  "theme cyan",
  "theme amber",
  "theme violet",
  "matrix",
  "clear matrix",
  "coffee",
  "decrypt signal",
  "sudo make-me-hireable",
  "easter-eggs",
  "history",
  "clear",
  "sudo enter-black-hole",
  "exit",
]

const terminalThemes: Record<
  TerminalTheme,
  {
    label: string
    prompt: string
    glow: string
    activeBorder: string
  }
> = {
  cyan: {
    label: "Cyan",
    prompt: "text-cyan-200",
    glow: "shadow-[0_0_80px_rgba(34,211,238,0.12)]",
    activeBorder: "border-cyan-300/35",
  },
  amber: {
    label: "Amber",
    prompt: "text-yellow-200",
    glow: "shadow-[0_0_80px_rgba(250,204,21,0.13)]",
    activeBorder: "border-yellow-200/35",
  },
  violet: {
    label: "Violet",
    prompt: "text-violet-200",
    glow: "shadow-[0_0_80px_rgba(167,139,250,0.14)]",
    activeBorder: "border-violet-300/35",
  },
}

const eggHints = [
  "sudo enter-black-hole",
  "matrix",
  "coffee",
  "decrypt signal",
  "sudo make-me-hireable",
]

const matrixLines = [
  "0110 api auth cache queue indexer",
  "1011 wallet signature contract event",
  "0101 postgres redis prisma graph",
  "1110 docker ci deploy telemetry",
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
  const [matrixMode, setMatrixMode] = useState(false)
  const [theme, setTheme] = useState<TerminalTheme>("cyan")
  const [unlockedEggs, setUnlockedEggs] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const themeConfig = terminalThemes[theme]

  const backendProjects = useMemo(
    () => projects.filter((project) => project.categories.includes("Backend")),
    []
  )
  const blockchainProjects = useMemo(
    () =>
      projects.filter((project) => project.categories.includes("Blockchain")),
    []
  )
  const suggestions = useMemo(() => {
    const value = input.trim().toLowerCase()
    if (!value) return []
    return commandList
      .filter((command) => command.toLowerCase().startsWith(value))
      .slice(0, 4)
  }, [input])

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
  }, [entries, singularity, matrixMode])

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

  function unlockEgg(name: string) {
    setUnlockedEggs((value) =>
      value.includes(name) ? value : [...value, name]
    )
  }

  function architectureSummary() {
    return architectureLayers.map(
      (layer) =>
        `${layer.label}: ${layer.stacks.slice(0, 5).join(", ")} -> ${layer.flow.join(" -> ")}`
    )
  }

  function traceProject(raw: string) {
    const query = raw
      .replace(/^trace\s+/i, "")
      .trim()
      .toLowerCase()

    if (!query || query === "project") {
      return [
        "Trace target missing.",
        "Try: trace request, trace carbon track, or trace bounty quest.",
      ]
    }

    if (query === "request") {
      return [
        "Request trace:",
        backendFlow.map((step, index) => `${index + 1}. ${step}`).join("\n"),
      ]
    }

    const project = projects.find(
      (item) =>
        item.slug === query ||
        item.missionName.toLowerCase() === query ||
        item.missionName.toLowerCase().includes(query)
    )

    if (!project) {
      return [
        `No mission trace found for "${query}".`,
        "Use projects to inspect available mission names.",
      ]
    }

    return [
      `${project.signal} trace / ${project.missionName}`,
      project.architecture,
      `Backend decisions:\n${project.backendDecisions
        .map((decision) => `- ${decision}`)
        .join("\n")}`,
      `Primary stack: ${project.stack.slice(0, 8).join(", ")}`,
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

    if (normalized.startsWith("trace ")) {
      return { lines: traceProject(command), variant: "success" }
    }

    if (normalized.startsWith("theme ")) {
      const nextTheme = normalized.replace("theme ", "").trim()
      if (!["cyan", "amber", "violet"].includes(nextTheme)) {
        return {
          lines: ["Theme not found. Available: cyan, amber, violet."],
          variant: "error",
        }
      }
      setTheme(nextTheme as TerminalTheme)
      return {
        lines: [`Terminal theme set to ${nextTheme}.`],
        variant: "success",
      }
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
            "Core: whoami, status, stack-map, architecture, projects, blog, contact.",
            "Trace: trace request, trace <mission-name>, project <mission-name>.",
            "Data: skills, skills --json, cat profile.json, scan stack.",
            "Navigation: open /projects, open /blog, open /contact.",
            "Terminal: theme cyan|amber|violet, matrix, clear matrix, history, clear, exit.",
            "Easter eggs: easter-eggs for hints.",
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
      case "whoami --deep":
        return {
          lines: [
            `${profile.name} / ${profile.role}`,
            "Default lens: backend reliability first, UI clarity second, cinematic motion only when it explains state.",
            `Signal: ${profile.alternativeHeroLine}`,
          ],
          variant: "success",
        }
      case "status":
        return {
          lines: [
            "BACKEND CORE: ONLINE",
            "BLOCKCHAIN NODE: SYNCHRONIZED",
            "FRONTEND INTERFACE: RENDERED",
            `ARCHITECTURE SPIDER: ${architectureLayers.length} LAYERS MAPPED`,
            `EASTER EGGS: ${unlockedEggs.length}/${eggHints.length} FOUND`,
            `LATENCY: ${latency}ms`,
            `MISSIONS INDEXED: ${projects.length}`,
          ],
          variant: "success",
        }
      case "stack-map":
      case "architecture":
        scrollTo("architecture-spider")
        return {
          lines: [
            "Opening architecture spider...",
            ...architectureSummary(),
            "Tip: click any layer or stack label in the spider to see its relationships.",
          ],
          variant: "success",
        }
      case "skills":
        scrollTo("architecture-spider")
        return {
          lines: [
            "Opening architecture spider instead of a loose skill cloud.",
            skills.join(" / "),
          ],
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
        scrollTo("architecture-spider")
        return {
          lines: [
            "Blockchain systems opened. Chain tooling is mapped through the Chain Adapter layer.",
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
      case "cat profile.json":
        return {
          lines: [
            JSON.stringify(
              {
                name: profile.name,
                role: profile.role,
                focus: [
                  "Backend systems",
                  "Blockchain infrastructure",
                  "Full-stack product architecture",
                  "Cinematic but useful interfaces",
                ],
                architectureLayers: architectureLayers.map(
                  (layer) => layer.label
                ),
              },
              null,
              2
            ),
          ],
          variant: "success",
        }
      case "scan stack":
        scrollTo("architecture-spider")
        return {
          lines: [
            "Stack scan complete.",
            `Frontend: ${architectureLayers
              .find((layer) => layer.id === "interface")
              ?.stacks.join(", ")}`,
            `Backend: ${architectureLayers
              .filter((layer) => layer.category === "Backend")
              .flatMap((layer) => layer.stacks)
              .filter((stack, index, list) => list.indexOf(stack) === index)
              .join(", ")}`,
            `Data: ${architectureLayers
              .find((layer) => layer.id === "storage")
              ?.stacks.join(", ")}`,
            `Blockchain: ${architectureLayers
              .find((layer) => layer.id === "chain")
              ?.stacks.join(", ")}`,
          ],
          variant: "success",
        }
      case "matrix":
        setMatrixMode(true)
        unlockEgg("matrix")
        return {
          lines: [
            "Matrix telemetry enabled.",
            "The terminal will now show a deterministic system-rain panel. No actual system access, just a visual mode.",
          ],
          variant: "egg",
        }
      case "clear matrix":
        setMatrixMode(false)
        return {
          lines: ["Matrix telemetry disabled."],
          variant: "success",
        }
      case "coffee":
        unlockEgg("coffee")
        return {
          lines: [
            "Brewing developer fuel...",
            "Result: +18 focus, +7 bug tolerance, architecture spider remains stable.",
          ],
          variant: "egg",
        }
      case "decrypt signal":
        unlockEgg("decrypt signal")
        return {
          lines: [
            "Signal decrypted:",
            "Good backend engineering is mostly making invisible state legible before it becomes a production mystery.",
          ],
          variant: "egg",
        }
      case "sudo make-me-hireable":
        unlockEgg("sudo make-me-hireable")
        return {
          lines: [
            "Privilege accepted.",
            "Generated checklist: explain tradeoffs, show shipped systems, keep demos fast, make architecture readable.",
          ],
          variant: "egg",
        }
      case "easter-eggs":
        return {
          lines: [
            `Found: ${unlockedEggs.length}/${eggHints.length}`,
            eggHints
              .map((hint) =>
                unlockedEggs.includes(hint)
                  ? `[found] ${hint}`
                  : `[hint] ${hint.replace(/[a-z]/g, "*")}`
              )
              .join("\n"),
          ],
          variant: "egg",
        }
      case "history":
        return {
          lines: history.length
            ? history.map((item, index) => `${index + 1}  ${item}`)
            : ["No command history yet."],
        }
      case "sudo enter-black-hole":
        setSingularity(true)
        unlockEgg("sudo enter-black-hole")
        return {
          lines: [
            "Access granted.",
            "Singularity Lab mounted at /event-horizon-os/singularity-lab.",
            "Workbench commands unlocked: stack-map, trace request, matrix, decrypt signal.",
          ],
          variant: "egg",
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
            "hud-panel flex max-h-[calc(100svh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-lg transition duration-300 sm:max-h-[calc(100svh-3rem)]",
            themeConfig.glow,
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
          data-terminal-dialog
          data-lenis-prevent
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <Command className={cn("size-4", themeConfig.prompt)} />
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

          <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_250px]">
            <div
              ref={outputRef}
              className={cn(
                "h-[50svh] min-h-[220px] max-h-[520px] min-w-0 [scrollbar-color:#22d3ee33_transparent] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-sm sm:h-[52svh] lg:h-auto lg:max-h-none",
                matrixMode &&
                  "bg-[linear-gradient(180deg,rgba(34,211,238,0.045),transparent_34%),repeating-linear-gradient(90deg,transparent_0_28px,rgba(34,211,238,0.035)_28px_29px)]"
              )}
              data-terminal-output
              data-lenis-prevent
              onWheel={stopWheel}
            >
              {entries.map((entry) => (
                <div key={entry.id} className="mb-5">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.16em] uppercase">
                    <span className="text-slate-600">{entry.time}</span>
                    {entry.command ? (
                      <span className={themeConfig.prompt}>
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
                      entry.variant === "egg" && "text-yellow-100",
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
                    Experimental workbench for protocol visualizers,
                    architecture-spider simulations, blockchain indexer
                    observability, and chain telemetry that makes system state
                    visible.
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-violet-100 uppercase">
                    Try: stack-map / trace request / matrix / decrypt signal
                  </p>
                </div>
              ) : null}
              {matrixMode ? (
                <div className="mt-5 grid gap-2 border border-emerald-300/25 bg-emerald-300/[0.055] p-4">
                  {matrixLines.map((line, index) => (
                    <p
                      key={line}
                      className="font-mono text-[11px] tracking-[0.16em] text-emerald-100 uppercase"
                      style={{ opacity: 1 - index * 0.13 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="hidden min-h-0 overflow-y-auto border-l border-white/10 bg-black/20 p-4 [scrollbar-color:#22d3ee33_transparent] lg:block">
              <StatusRow icon={ShieldCheck} label="Link" value="Stable" />
              <StatusRow icon={RadioTower} label="Route" value="Secure" />
              <StatusRow icon={Cpu} label="Uptime" value={`${uptime}s`} />
              <StatusRow
                icon={Sparkles}
                label="Eggs"
                value={`${unlockedEggs.length}/${eggHints.length}`}
              />
              <StatusRow
                icon={Palette}
                label="Theme"
                value={themeConfig.label}
              />
              <StatusRow
                icon={Network}
                label="Mode"
                value={matrixMode ? "Matrix" : "Shell"}
              />
              <StatusRow
                icon={KeyRound}
                label="Access"
                value={singularity ? "Lab" : "Base"}
              />
              <div className="mt-5 border border-white/10 bg-white/[0.035] p-3">
                <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-200 uppercase">
                  Quick commands
                </p>
                <div className="mt-3 grid gap-2">
                  {[
                    "help",
                    "stack-map",
                    "trace request",
                    "matrix",
                    "easter-eggs",
                  ].map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => runCommand(command)}
                      className={cn(
                        "border bg-black/20 px-2 py-2 text-left font-mono text-[11px] text-slate-300 transition hover:text-cyan-100",
                        themeConfig.activeBorder
                      )}
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
            {suggestions.length ? (
              <div className="mb-2 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-400 transition hover:border-cyan-300/35 hover:text-cyan-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
            <div
              className={cn(
                "flex items-center gap-3 border bg-black/35 px-3 py-2",
                themeConfig.activeBorder
              )}
            >
              <span className={cn("font-mono", themeConfig.prompt)}>
                eh-os:~$
              </span>
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
