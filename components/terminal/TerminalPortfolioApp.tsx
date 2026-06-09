"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  type ComponentType,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  type WheelEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Activity,
  Archive,
  BookOpen,
  Braces,
  Clock,
  Code2,
  Command,
  Cpu,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Network,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UserRound,
  Zap,
} from "lucide-react"

import { Icons } from "@/components/icons"
import { TerminalContactForm } from "@/components/terminal/TerminalContactForm"
import { Button } from "@/components/ui/button"
import {
  about,
  architectureLayers,
  getProject,
  getResearchLog,
  initSequence,
  profile,
  projects,
  researchLogs,
  skills,
  type MissionProject,
  type ResearchLog,
} from "@/data/event-horizon"
import { cn } from "@/lib/utils"

export type TerminalView =
  | "home"
  | "about"
  | "projects"
  | "project-detail"
  | "blog"
  | "blog-detail"
  | "contact"

type TerminalPortfolioAppProps = {
  initialView: TerminalView
  selectedSlug?: string
  articleContent?: ReactNode
}

type Entry = {
  id: string
  command?: string
  content?: ReactNode
  lines?: string[]
  time: string
  variant?: "system" | "error" | "success" | "egg"
}

type RouteState = {
  command: string
  label: string
  path: string
  selectedSlug?: string
  view: TerminalView
}

type TerminalTheme = "cyan" | "amber" | "violet"

const INITIAL_STAMP = "--:--:--"
const PENDING_COMMAND_KEY = "event-horizon-terminal-pending-command"
const THEME_STORAGE_KEY = "event-horizon-terminal-theme"
let rememberedTerminalTheme: TerminalTheme = "cyan"

const routeItems = [
  { label: "Home", href: "/", command: "open /", icon: Home, meta: "boot" },
  {
    label: "About",
    href: "/about",
    command: "open /about",
    icon: UserRound,
    meta: "profile",
  },
  {
    label: "Projects",
    href: "/projects",
    command: "open /projects",
    icon: Archive,
    meta: `${projects.length} cases`,
  },
  {
    label: "Blog",
    href: "/blog",
    command: "open /blog",
    icon: BookOpen,
    meta: `${researchLogs.length} logs`,
  },
  {
    label: "Contact",
    href: "/contact",
    command: "open /contact",
    icon: Mail,
    meta: "signal",
  },
]

const coreCommands = [
  "help",
  "whoami",
  "status",
  "skills",
  "architecture",
  "projects",
  "contact",
  "matrix",
  "easter-eggs",
]

const commandList = [
  "help",
  "home",
  "about",
  "whoami",
  "status",
  "skills",
  "architecture",
  "projects",
  "projects --backend",
  "projects --blockchain",
  "project ",
  "blog",
  "logs",
  "contact",
  "open /",
  "open /about",
  "open /projects",
  "open /blog",
  "open /contact",
  "ls",
  "pwd",
  "date",
  "uptime",
  "ping",
  "theme cyan",
  "theme amber",
  "theme violet",
  "matrix",
  "clear matrix",
  "coffee",
  "decrypt signal",
  "sudo make-me-hireable",
  "sudo enter-black-hole",
  "easter-eggs",
  "history",
  "clear",
]

const allCommandShortcuts = commandList.map((command) =>
  command === "project " ? "project oorja-ai" : command
)

const terminalThemes: Record<
  TerminalTheme,
  {
    accent: string
    border: string
    glow: string
    label: string
    marker: string
    soft: string
    text: string
  }
> = {
  cyan: {
    accent: "bg-cyan-300 text-slate-950",
    border: "border-cyan-300/35",
    glow: "shadow-[0_0_90px_rgba(34,211,238,0.12)]",
    label: "Cyan",
    marker: "bg-cyan-300",
    soft: "bg-cyan-300/[0.075] text-cyan-100",
    text: "text-cyan-200",
  },
  amber: {
    accent: "bg-yellow-300 text-slate-950",
    border: "border-yellow-200/40",
    glow: "shadow-[0_0_90px_rgba(250,204,21,0.12)]",
    label: "Amber",
    marker: "bg-yellow-300",
    soft: "bg-yellow-300/[0.085] text-yellow-100",
    text: "text-yellow-200",
  },
  violet: {
    accent: "bg-violet-300 text-slate-950",
    border: "border-violet-300/40",
    glow: "shadow-[0_0_90px_rgba(167,139,250,0.13)]",
    label: "Violet",
    marker: "bg-violet-300",
    soft: "bg-violet-300/[0.085] text-violet-100",
    text: "text-violet-200",
  },
}

function isTerminalTheme(value: string | null): value is TerminalTheme {
  return value === "cyan" || value === "amber" || value === "violet"
}

function storeTerminalTheme(value: TerminalTheme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // Theme persistence is a preference; the terminal still works without it.
  }
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

function stamp() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())
}

function entryId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`
}

function normalizeRoute(path: string) {
  const value = path.trim() || "/"
  if (value === "/project") return "/projects"
  if (value.startsWith("/project/")) {
    return value.replace(/^\/project\//, "/projects/")
  }
  return value
}

function resolveRoute(
  pathname: string | null,
  fallbackView: TerminalView,
  fallbackSlug?: string
): RouteState {
  const path = normalizeRoute(pathname ?? "/")

  if (path === "/") {
    return { command: "open /", label: "Home", path: "/", view: "home" }
  }

  if (path === "/about") {
    return {
      command: "open /about",
      label: "About",
      path,
      view: "about",
    }
  }

  if (path === "/projects") {
    return {
      command: "open /projects",
      label: "Projects",
      path,
      view: "projects",
    }
  }

  if (path.startsWith("/projects/")) {
    const selectedSlug = path.replace("/projects/", "")
    return {
      command: `project ${selectedSlug}`,
      label: "Project Detail",
      path,
      selectedSlug,
      view: "project-detail",
    }
  }

  if (path === "/blog") {
    return { command: "open /blog", label: "Blog", path, view: "blog" }
  }

  if (path.startsWith("/blog/")) {
    const selectedSlug = path.replace("/blog/", "")
    return {
      command: `log ${selectedSlug}`,
      label: "Research Log",
      path,
      selectedSlug,
      view: "blog-detail",
    }
  }

  if (path === "/contact") {
    return { command: "open /contact", label: "Contact", path, view: "contact" }
  }

  return {
    command: fallbackSlug
      ? `${fallbackView} ${fallbackSlug}`
      : fallbackView.replace("-detail", ""),
    label: fallbackView,
    path,
    selectedSlug: fallbackSlug,
    view: fallbackView,
  }
}

function isValidRoute(path: string) {
  const route = normalizeRoute(path)
  if (["/", "/about", "/projects", "/blog", "/contact"].includes(route)) {
    return true
  }
  if (route.startsWith("/projects/")) {
    return Boolean(getProject(route.replace("/projects/", "")))
  }
  if (route.startsWith("/blog/")) {
    return Boolean(getResearchLog(route.replace("/blog/", "")))
  }
  return false
}

function findProject(query: string) {
  const normalized = query.trim().toLowerCase()
  return projects.find(
    (project) =>
      project.slug === normalized ||
      project.missionName.toLowerCase() === normalized ||
      project.missionName.toLowerCase().includes(normalized)
  )
}

function findResearchLog(query: string) {
  const normalized = query.trim().toLowerCase()
  return researchLogs.find(
    (log) =>
      log.slug === normalized ||
      log.title.toLowerCase() === normalized ||
      log.title.toLowerCase().includes(normalized) ||
      log.number.toLowerCase() === normalized
  )
}

export function TerminalPortfolioApp({
  initialView,
  selectedSlug,
  articleContent,
}: TerminalPortfolioAppProps) {
  const pathname = usePathname()
  const router = useRouter()
  const outputRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [clock, setClock] = useState(INITIAL_STAMP)
  const [latency, setLatency] = useState(18)
  const [uptime, setUptime] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [, setHistoryIndex] = useState<number | null>(null)
  const [theme, setTheme] = useState<TerminalTheme>(() => rememberedTerminalTheme)
  const [matrixMode, setMatrixMode] = useState(false)
  const [singularity, setSingularity] = useState(false)
  const [unlockedEggs, setUnlockedEggs] = useState<string[]>([])
  const themeConfig = terminalThemes[theme]

  const routeState = useMemo(
    () => resolveRoute(pathname, initialView, selectedSlug),
    [initialView, pathname, selectedSlug]
  )

  useEffect(() => {
    const restoreTheme = window.setTimeout(() => {
      try {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
        if (isTerminalTheme(storedTheme)) {
          rememberedTerminalTheme = storedTheme
          setTheme(storedTheme)
        }
      } catch {
        // Ignore blocked storage; the terminal falls back to the default theme.
      }
    }, 0)

    return () => window.clearTimeout(restoreTheme)
  }, [])

  function applyTheme(nextTheme: TerminalTheme) {
    rememberedTerminalTheme = nextTheme
    setTheme(nextTheme)
    storeTerminalTheme(nextTheme)
  }

  function navigateTo(path: string, command = `open ${path}`) {
    const target = normalizeRoute(path)
    if (!isValidRoute(target)) {
      appendEntry({
        command,
        lines: [`Route ${target} is not in the terminal map.`],
        variant: "error",
      })
      return
    }

    if (target === pathname) {
      appendEntry({
        command,
        lines: [`Already mounted at ${target}.`],
        variant: "system",
      })
      return
    }

    window.sessionStorage.setItem(PENDING_COMMAND_KEY, command)
    router.push(target)
  }

  function routeEntry(nextRoute: RouteState): Entry {
    return {
      id: `route-${nextRoute.path}`,
      command: nextRoute.command,
      content: (
        <RouteOutput
          articleContent={articleContent}
          onNavigate={navigateTo}
          route={nextRoute}
        />
      ),
      time: "route",
      variant: "success",
    }
  }

  const [entries, setEntries] = useState<Entry[]>([])

  const routeKey = `${routeState.view}:${routeState.selectedSlug ?? ""}:${routeState.path}`

  useEffect(() => {
    const pending = window.sessionStorage.getItem(PENDING_COMMAND_KEY)
    if (!pending) return
    window.sessionStorage.removeItem(PENDING_COMMAND_KEY)
    window.setTimeout(() => {
      appendEntry({
        command: pending,
        lines: [`Route synchronized: ${routeState.path}`],
        variant: "success",
      })
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey])

  useEffect(() => {
    outputRef.current?.scrollTo({ top: 0 })
  }, [routeKey])

  useEffect(() => {
    const initialSync = window.setTimeout(() => setClock(stamp()), 0)
    const interval = window.setInterval(() => {
      setClock(stamp())
      setLatency(14 + Math.round(Math.random() * 22))
      setUptime((value) => value + 1)
    }, 1000)

    return () => {
      window.clearTimeout(initialSync)
      window.clearInterval(interval)
    }
  }, [])

  const suggestions = useMemo(() => {
    const value = input.trim().toLowerCase()
    if (!value) return []
    return commandList
      .filter((command) => command.toLowerCase().startsWith(value))
      .slice(0, 5)
  }, [input])

  const activeProject = routeState.selectedSlug
    ? getProject(routeState.selectedSlug)
    : undefined
  const activeLog = routeState.selectedSlug
    ? getResearchLog(routeState.selectedSlug)
    : undefined

  function appendEntry(entry: Omit<Entry, "id" | "time">) {
    setEntries((current) => [
      ...current,
      { ...entry, id: entryId(), time: stamp() },
    ])
    window.setTimeout(() => {
      outputRef.current?.scrollTo({
        top: outputRef.current.scrollHeight,
        behavior: "smooth",
      })
    }, 0)
  }

  function unlockEgg(name: string) {
    setUnlockedEggs((current) =>
      current.includes(name) ? current : [...current, name]
    )
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim()
    if (!command) return

    setHistory((current) => [...current, command])
    setHistoryIndex(null)

    const normalized = command.toLowerCase()

    if (normalized === "home") {
      navigateTo("/", command)
      return
    }

    if (normalized === "about") {
      navigateTo("/about", command)
      return
    }

    if (normalized === "projects" || normalized === "project") {
      navigateTo("/projects", command)
      return
    }

    if (normalized.startsWith("project ")) {
      const query = command.replace(/^project\s+/i, "")
      const project = findProject(query)
      if (!project) {
        appendEntry({
          command,
          lines: [
            `Mission not found for "${query}".`,
            "Try: project oorja ai, project carbon track, or projects --backend.",
          ],
          variant: "error",
        })
        return
      }
      navigateTo(`/projects/${project.slug}`, command)
      return
    }

    if (normalized === "blog" || normalized === "logs") {
      navigateTo("/blog", command)
      return
    }

    if (normalized.startsWith("log ")) {
      const query = command.replace(/^log\s+/i, "")
      const log = findResearchLog(query)
      if (!log) {
        appendEntry({
          command,
          lines: [`Research log not found for "${query}".`],
          variant: "error",
        })
        return
      }
      navigateTo(`/blog/${log.slug}`, command)
      return
    }

    if (normalized === "contact") {
      navigateTo("/contact", command)
      return
    }

    if (normalized.startsWith("open ")) {
      navigateTo(command.replace(/^open\s+/i, ""), command)
      return
    }

    if (normalized.startsWith("theme ")) {
      const nextTheme = normalized.replace("theme ", "").trim()
      if (!["cyan", "amber", "violet"].includes(nextTheme)) {
        appendEntry({
          command,
          lines: ["Theme not found. Available: cyan, amber, violet."],
          variant: "error",
        })
        return
      }
      applyTheme(nextTheme as TerminalTheme)
      appendEntry({
        command,
        lines: [`Terminal theme set to ${nextTheme}.`],
        variant: "success",
      })
      return
    }

    switch (normalized) {
      case "help":
        appendEntry({
          command,
          lines: [
            "Navigation: home, about, projects, project <name>, blog, log <name>, contact.",
            "Routes: open /about, open /projects, open /projects/<slug>, open /blog/<slug>.",
            "Data: whoami, status, skills, architecture, projects --backend, projects --blockchain.",
            "Terminal: theme cyan|amber|violet, history, clear, matrix, clear matrix.",
            "Easter eggs: easter-eggs for hints.",
          ],
        })
        return
      case "whoami":
        appendEntry({
          command,
          lines: [
            `${profile.name} / ${profile.role}`,
            profile.heroCopy,
            profile.alternativeHeroLine,
          ],
          variant: "success",
        })
        return
      case "status":
        appendEntry({
          command,
          lines: [
            "TERMINAL APP: PRIMARY SURFACE",
            `ROUTE: ${routeState.path}`,
            `PROJECTS INDEXED: ${projects.length}`,
            `RESEARCH LOGS: ${researchLogs.length}`,
            `ARCHITECTURE LAYERS: ${architectureLayers.length}`,
            `LATENCY: ${latency}ms`,
            `EASTER EGGS: ${unlockedEggs.length}/${eggHints.length}`,
          ],
          variant: "success",
        })
        return
      case "skills":
        appendEntry({
          command,
          content: <SkillOutput />,
          variant: "success",
        })
        return
      case "architecture":
      case "stack-map":
        appendEntry({
          command,
          content: <ArchitectureOutput />,
          variant: "success",
        })
        return
      case "projects --backend":
        appendEntry({
          command,
          content: (
            <ProjectList
              onNavigate={navigateTo}
              projects={projects.filter((project) =>
                project.categories.includes("Backend")
              )}
              title="Backend missions"
            />
          ),
          variant: "success",
        })
        return
      case "projects --blockchain":
        appendEntry({
          command,
          content: (
            <ProjectList
              onNavigate={navigateTo}
              projects={projects.filter((project) =>
                project.categories.includes("Blockchain")
              )}
              title="Blockchain missions"
            />
          ),
          variant: "success",
        })
        return
      case "ls":
        appendEntry({
          command,
          lines: [
            "home/",
            "about/",
            "projects/",
            "blog/",
            "contact/",
            "profile.json",
            "architecture.map",
          ],
        })
        return
      case "pwd":
        appendEntry({ command, lines: [routeState.path] })
        return
      case "date":
        appendEntry({ command, lines: [new Date().toString()] })
        return
      case "uptime":
        appendEntry({ command, lines: [`Terminal uptime: ${uptime}s`] })
        return
      case "ping":
        appendEntry({
          command,
          lines: [`PING terminal-core: seq=1 ttl=64 time=${latency}ms`],
          variant: "success",
        })
        return
      case "matrix":
        setMatrixMode(true)
        unlockEgg("matrix")
        appendEntry({
          command,
          lines: ["Matrix telemetry enabled."],
          variant: "egg",
        })
        return
      case "clear matrix":
        setMatrixMode(false)
        appendEntry({
          command,
          lines: ["Matrix telemetry disabled."],
          variant: "success",
        })
        return
      case "coffee":
        unlockEgg("coffee")
        appendEntry({
          command,
          lines: [
            "Brewing developer fuel...",
            "Result: +18 focus, +7 bug tolerance, terminal stays online.",
          ],
          variant: "egg",
        })
        return
      case "decrypt signal":
        unlockEgg("decrypt signal")
        appendEntry({
          command,
          lines: [
            "Signal decrypted:",
            "Good backend engineering is mostly making invisible state legible before it becomes a production mystery.",
          ],
          variant: "egg",
        })
        return
      case "sudo make-me-hireable":
        unlockEgg("sudo make-me-hireable")
        appendEntry({
          command,
          lines: [
            "Privilege accepted.",
            "Generated checklist: explain tradeoffs, show shipped systems, keep demos fast, make architecture readable.",
          ],
          variant: "egg",
        })
        return
      case "sudo enter-black-hole":
        setSingularity(true)
        unlockEgg("sudo enter-black-hole")
        appendEntry({
          command,
          lines: [
            "Access granted.",
            "Singularity Lab mounted inside the terminal shell.",
            "Workbench commands: architecture, matrix, decrypt signal.",
          ],
          variant: "egg",
        })
        return
      case "easter-eggs":
        appendEntry({
          command,
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
        })
        return
      case "history":
        appendEntry({
          command,
          lines: history.length
            ? history.map((item, index) => `${index + 1}  ${item}`)
            : ["No command history yet."],
        })
        return
      case "clear":
      case "cls":
        setEntries([])
        return
      default:
        appendEntry({
          command,
          lines: [
            `Command not recognized: ${command}`,
            "Type help for the terminal command index.",
          ],
          variant: "error",
        })
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    runCommand(input)
    setInput("")
  }

  function onTerminalPanelWheel(event: WheelEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("[data-terminal-output]")) {
      return
    }

    const output = outputRef.current
    if (!output || output.scrollHeight <= output.clientHeight) {
      return
    }

    output.scrollBy({ top: event.deltaY })
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
      const match = commandList.find((candidate) =>
        candidate.toLowerCase().startsWith(input.toLowerCase())
      )
      if (match) setInput(match)
    }
  }

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#02030a] text-slate-100 lg:h-svh lg:overflow-hidden">
      <div className="star-noise pointer-events-none fixed inset-0 opacity-20" />
      <div className="hud-grid pointer-events-none fixed inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)] opacity-25" />
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1680px] flex-col p-3 sm:p-4 lg:h-svh lg:min-h-0">
        <TerminalHeader
          activeLog={activeLog}
          activeProject={activeProject}
          clock={clock}
          latency={latency}
          route={routeState}
          themeConfig={themeConfig}
        />

        <div className="grid min-h-0 flex-1 gap-3 lg:h-full lg:grid-cols-[260px_minmax(0,1fr)_300px] lg:overflow-hidden xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <TerminalQuickAccess
            activePath={routeState.path}
            onCommand={runCommand}
            onNavigate={navigateTo}
            themeConfig={themeConfig}
          />

          <section
            className={cn(
              "hud-panel flex min-h-[72svh] flex-col overflow-hidden rounded-lg lg:h-full lg:min-h-0",
              themeConfig.glow
            )}
            aria-label="Terminal output"
            onWheel={onTerminalPanelWheel}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <TerminalSquare className={cn("size-5", themeConfig.text)} />
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] text-slate-200 uppercase">
                    eh-os terminal output
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                    route: {routeState.path}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase",
                  themeConfig.border,
                  themeConfig.soft
                )}
              >
                {routeState.label}
              </span>
            </div>

            <div
              ref={outputRef}
              className={cn(
                "min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-color:#22d3ee33_transparent] sm:px-5",
                matrixMode &&
                  "bg-[linear-gradient(180deg,rgba(34,211,238,0.045),transparent_34%),repeating-linear-gradient(90deg,transparent_0_28px,rgba(34,211,238,0.035)_28px_29px)]"
              )}
              data-terminal-output
            >
              {[
                {
                  id: "terminal-boot",
                  command: "boot --terminal-first",
                  lines: [
                    "Event Horizon terminal app mounted.",
                    "All portfolio routes now render through this shell.",
                  ],
                  time: "boot",
                  variant: "system" as const,
                },
                routeEntry(routeState),
                ...entries,
              ].map((entry) => (
                <EntryBlock
                  entry={entry}
                  key={entry.id}
                  themeConfig={themeConfig}
                />
              ))}

              {singularity ? <SingularityLab /> : null}
              {matrixMode ? <MatrixTelemetry /> : null}
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
                  themeConfig.border
                )}
              >
                <span className={cn("font-mono", themeConfig.text)}>
                  eh-os:~$
                </span>
                <input
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

          <TerminalInspector
            clock={clock}
            history={history}
            latency={latency}
            route={routeState}
            setTheme={applyTheme}
            theme={theme}
            themeConfig={themeConfig}
            unlockedEggs={unlockedEggs}
            uptime={uptime}
          />
        </div>
      </div>
    </main>
  )
}

function TerminalHeader({
  activeLog,
  activeProject,
  clock,
  latency,
  route,
  themeConfig,
}: {
  activeLog?: ResearchLog
  activeProject?: MissionProject
  clock: string
  latency: number
  route: RouteState
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  const github = profile.socials.find((link) => link.label === "GitHub")
  const linkedin = profile.socials.find((link) => link.label === "LinkedIn")
  const GitHubIcon = Icons.gitHub
  const LinkedInIcon = Icons.linkedin

  return (
    <header className="mb-3 shrink-0 rounded-lg border border-white/10 bg-[#02030a]/88 px-4 py-3 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center border",
              themeConfig.border,
              themeConfig.soft
            )}
          >
            <Command className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold tracking-[0.22em] text-slate-50 uppercase">
              Event Horizon Terminal
            </p>
            <p className="mt-1 truncate font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
              {activeProject?.missionName ??
                activeLog?.title ??
                "portfolio shell"}{" "}
              / {route.path}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Telemetry label="Clock" value={clock} />
          <Telemetry label="Ping" value={`${latency}ms`} />
          <a
            href={github?.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-9 items-center justify-center border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={linkedin?.url ?? "#"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-9 items-center justify-center border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href="/resume.pdf"
            className={cn(
              "inline-flex h-9 items-center gap-2 border px-3 text-sm font-semibold transition",
              themeConfig.accent
            )}
          >
            <FileText className="size-4" />
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}

function TerminalQuickAccess({
  activePath,
  onCommand,
  onNavigate,
  themeConfig,
}: {
  activePath: string
  onCommand: (command: string) => void
  onNavigate: (path: string, command?: string) => void
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  const [commandTab, setCommandTab] = useState<"core" | "all">("core")
  const visibleCommands =
    commandTab === "core" ? coreCommands : allCommandShortcuts

  return (
    <aside className="hud-panel min-h-0 rounded-lg p-3 lg:h-full lg:overflow-y-auto">
      <div className="flex min-h-0 flex-col gap-3">
        <div className="rounded-md border border-white/10 bg-white/[0.025] p-3">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Network className={cn("size-4", themeConfig.text)} />
              <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-100 uppercase">
                quick access
              </p>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {routeItems.length} mounts
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {routeItems.map((item) => {
              const Icon = item.icon
              const active =
                item.href === "/"
                  ? activePath === "/"
                  : activePath === item.href ||
                    activePath.startsWith(`${item.href}/`)
              return (
                <Button
                  key={item.href}
                  type="button"
                  variant="ghost"
                  size="lg"
                  aria-current={active ? "page" : undefined}
                  data-terminal-route={item.href}
                  onClick={() => onNavigate(item.href, item.command)}
                  className={cn(
                    "group relative h-auto min-h-12 w-full justify-between overflow-hidden rounded-md border px-3 py-2 text-left transition",
                    active
                      ? cn(themeConfig.border, themeConfig.soft)
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:bg-white/[0.055] hover:text-cyan-100"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-2 bottom-2 left-0 w-0.5 opacity-0 transition",
                      active && "opacity-100",
                      themeConfig.marker
                    )}
                  />
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon data-icon="inline-start" />
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-[0.14em] uppercase">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] text-slate-500">
                        {item.meta}
                      </span>
                    </span>
                  </span>
                  <span className="hidden shrink-0 font-mono text-[10px] text-slate-600 xl:inline">
                    {item.href}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="rounded-md border border-white/10 bg-black/20 p-3">
          <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
            commands
          </p>
          <div
            aria-label="Command shortcut groups"
            className="grid grid-cols-2 border border-white/10 bg-black/25 p-0.5"
            role="tablist"
          >
            {(["core", "all"] as const).map((tab) => (
              <Button
                key={tab}
                type="button"
                variant="ghost"
                size="xs"
                aria-selected={commandTab === tab}
                onClick={() => setCommandTab(tab)}
                role="tab"
                className={cn(
                  "h-6 rounded-none px-2 py-1 font-mono text-[9px] tracking-[0.14em] uppercase transition",
                  commandTab === tab
                    ? cn(themeConfig.soft, themeConfig.border)
                    : "text-slate-500 hover:text-slate-200"
                )}
              >
                {tab === "core" ? "Core" : "All"}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-2">
          {visibleCommands.map((command) => (
            <Button
              key={command}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onCommand(command)}
              className="h-auto justify-start rounded-md border border-white/10 bg-white/[0.035] px-2 py-2 text-left font-mono text-[11px] text-slate-300 transition hover:border-cyan-300/35 hover:bg-white/[0.055] hover:text-cyan-100"
            >
              {command}
            </Button>
          ))}
        </div>
        </div>
      </div>
    </aside>
  )
}

function TerminalInspector({
  clock,
  history,
  latency,
  route,
  setTheme,
  theme,
  themeConfig,
  unlockedEggs,
  uptime,
}: {
  clock: string
  history: string[]
  latency: number
  route: RouteState
  setTheme: (theme: TerminalTheme) => void
  theme: TerminalTheme
  themeConfig: (typeof terminalThemes)[TerminalTheme]
  unlockedEggs: string[]
  uptime: number
}) {
  return (
    <aside className="hud-panel min-h-0 rounded-lg p-3 lg:h-full lg:overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <Activity className={cn("size-4", themeConfig.text)} />
        <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-100 uppercase">
          inspector
        </p>
      </div>

      <div className="mt-3 grid gap-2">
        <StatusRow icon={ShieldCheck} label="route" value={route.path} />
        <StatusRow icon={Clock} label="clock" value={clock} />
        <StatusRow icon={Cpu} label="latency" value={`${latency}ms`} />
        <StatusRow icon={Zap} label="uptime" value={`${uptime}s`} />
        <StatusRow
          icon={Sparkles}
          label="eggs"
          value={`${unlockedEggs.length}/${eggHints.length}`}
        />
      </div>

      <div className="mt-4 border border-white/10 bg-black/20 p-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          theme
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["cyan", "amber", "violet"] as TerminalTheme[]).map((item) => (
            <button
              key={item}
              type="button"
              data-active={theme === item}
              data-terminal-theme={item}
              onClick={() => setTheme(item)}
              className={cn(
                "border px-2 py-2 font-mono text-[10px] uppercase transition",
                theme === item
                  ? cn(terminalThemes[item].border, terminalThemes[item].soft)
                  : "border-white/10 bg-white/[0.035] text-slate-400 hover:text-slate-100"
              )}
            >
              {terminalThemes[item].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 border border-white/10 bg-black/20 p-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          recent commands
        </p>
        <div className="mt-3 grid gap-2">
          {history.slice(-6).length ? (
            history.slice(-6).map((item, index) => (
              <p
                key={`${item}-${index}`}
                className="break-words font-mono text-[11px] leading-5 text-slate-300"
              >
                <span className={themeConfig.text}>$</span> {item}
              </p>
            ))
          ) : (
            <p className="font-mono text-[11px] text-slate-500">
              No commands yet.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}

function EntryBlock({
  entry,
  themeConfig,
}: {
  entry: Entry
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  return (
    <div className="mb-5 font-mono">
      <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.16em] uppercase">
        <span className="text-slate-600">{entry.time}</span>
        {entry.command ? (
          <span className={themeConfig.text}>&gt; {entry.command}</span>
        ) : null}
      </div>
      {entry.lines ? (
        <pre
          className={cn(
            "mt-2 text-sm leading-7 break-words whitespace-pre-wrap",
            entry.variant === "error" && "text-rose-200",
            entry.variant === "success" && "text-emerald-100",
            entry.variant === "system" && "text-cyan-100",
            entry.variant === "egg" && "text-yellow-100",
            !entry.variant && "text-slate-300"
          )}
        >
          {entry.lines.join("\n")}
        </pre>
      ) : null}
      {entry.content ? <div className="mt-3">{entry.content}</div> : null}
    </div>
  )
}

function RouteOutput({
  articleContent,
  onNavigate,
  route,
}: {
  articleContent?: ReactNode
  onNavigate: (path: string, command?: string) => void
  route: RouteState
}) {
  switch (route.view) {
    case "about":
      return <AboutOutput />
    case "projects":
      return (
        <ProjectList
          onNavigate={onNavigate}
          projects={projects}
          title="All indexed missions"
        />
      )
    case "project-detail":
      return (
        <ProjectDetailOutput
          onNavigate={onNavigate}
          project={route.selectedSlug ? getProject(route.selectedSlug) : null}
        />
      )
    case "blog":
      return <BlogOutput onNavigate={onNavigate} />
    case "blog-detail":
      return (
        <BlogDetailOutput
          articleContent={articleContent}
          log={route.selectedSlug ? getResearchLog(route.selectedSlug) : null}
          onNavigate={onNavigate}
        />
      )
    case "contact":
      return <ContactOutput />
    case "home":
    default:
      return <HomeOutput onNavigate={onNavigate} />
  }
}

function HomeOutput({
  onNavigate,
}: {
  onNavigate: (path: string, command?: string) => void
}) {
  return (
    <TerminalSection
      icon={Rocket}
      label="home"
      title="Terminal-first portfolio app"
    >
      <TerminalLines
        lines={[
          ...initSequence,
          `${profile.name} / ${profile.role}`,
          profile.heroCopy,
          "Quick access mounts each route into this output pane.",
        ]}
      />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Metric label="projects" value={String(projects.length)} />
        <Metric label="logs" value={String(researchLogs.length)} />
        <Metric label="skills" value={String(skills.length)} />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {routeItems
          .filter((item) => item.href !== "/")
          .map((item) => (
            <button
              key={item.href}
              type="button"
              data-terminal-home-route={item.href}
              onClick={() => onNavigate(item.href, item.command)}
              className="border border-white/10 bg-white/[0.035] px-3 py-3 text-left transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                open
              </span>
              <span className="mt-1 block font-heading text-lg text-slate-50">
                {item.label}
              </span>
            </button>
          ))}
      </div>
    </TerminalSection>
  )
}

function AboutOutput() {
  return (
    <TerminalSection icon={UserRound} label="about" title={about.hero.title}>
      <TerminalLines
        lines={[
          about.hero.subtitle,
          about.hero.description,
          `LeetCode rating: ${about.stats.leetcodeRating}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {about.stats.statItems.map((item) => (
          <Metric key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="mt-6">
        <TerminalSubheading>experience</TerminalSubheading>
        <div className="mt-3 grid gap-3">
          {about.experiences.map((experience) => (
            <div
              key={`${experience.company}-${experience.title}`}
              className="border border-white/10 bg-black/22 p-4"
            >
              <p className="font-heading text-lg text-slate-50">
                {experience.title}
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-cyan-100 uppercase">
                {experience.company} / {experience.period}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <TerminalSubheading>technical stack</TerminalSubheading>
        <div className="mt-3 flex flex-wrap gap-2">
          {about.techSkills.map((skill) => (
            <span
              key={skill.name}
              className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
            >
              {skill.name} / lvl {skill.level}
            </span>
          ))}
        </div>
      </div>
    </TerminalSection>
  )
}

function ProjectList({
  onNavigate,
  projects: projectItems,
  title,
}: {
  onNavigate: (path: string, command?: string) => void
  projects: MissionProject[]
  title: string
}) {
  return (
    <TerminalSection icon={Archive} label="projects" title={title}>
      <TerminalLines
        lines={[
          `${projectItems.length} missions available.`,
          "Select a row to mount its case study at /projects/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {projectItems.map((project) => (
          <button
            key={project.slug}
            type="button"
            data-project-slug={project.slug}
            onClick={() =>
              onNavigate(`/projects/${project.slug}`, `project ${project.slug}`)
            }
            className="grid gap-3 border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.055] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
          >
            <span className="font-mono text-[11px] text-cyan-100">
              {project.signal}
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-base text-slate-50">
                {project.missionName}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">
                {project.description}
              </span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="border border-white/10 px-1.5 py-1 font-mono text-[9px] tracking-[0.1em] text-slate-500 uppercase"
                  >
                    {item}
                  </span>
                ))}
              </span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
              {project.category}
            </span>
          </button>
        ))}
      </div>
    </TerminalSection>
  )
}

function ProjectDetailOutput({
  onNavigate,
  project,
}: {
  onNavigate: (path: string, command?: string) => void
  project?: MissionProject | null
}) {
  if (!project) {
    return (
      <TerminalSection icon={FolderGit2} label="project" title="Mission not found">
        <TerminalLines lines={["Use projects to inspect available missions."]} />
      </TerminalSection>
    )
  }

  return (
    <TerminalSection icon={FolderGit2} label={project.signal} title={project.missionName}>
      <TerminalLines
        lines={[
          `Type: ${project.type}`,
          `Route: /projects/${project.slug}`,
          project.description,
          `Role: ${project.role}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="category" value={project.category} />
        <Metric label="coordinates" value={project.coordinates} />
        <Metric label="stack size" value={String(project.stack.length)} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <DetailBlock title="problem" text={project.problem} />
        <DetailBlock title="architecture" text={project.architecture} />
        <DetailBlock title="blockchain logic" text={project.blockchainLogic} />
        <DetailBlock title="database design" text={project.databaseDesign} />
        <DetailBlock title="security notes" text={project.securityNotes} />
        <DetailBlock title="performance notes" text={project.performanceNotes} />
      </div>
      <div className="mt-6">
        <TerminalSubheading>backend decisions</TerminalSubheading>
        <TerminalLines
          lines={project.backendDecisions.map(
            (decision, index) => `${index + 1}. ${decision}`
          )}
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onNavigate("/projects", "projects")}
          className="border border-cyan-300/30 bg-cyan-300/[0.08] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-cyan-100 uppercase"
        >
          back to projects
        </button>
        {project.githubLink ? (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-cyan-100"
          >
            github
          </a>
        ) : null}
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-cyan-100"
          >
            live
          </a>
        ) : null}
      </div>
    </TerminalSection>
  )
}

function BlogOutput({
  onNavigate,
}: {
  onNavigate: (path: string, command?: string) => void
}) {
  return (
    <TerminalSection icon={BookOpen} label="blog" title="Research logs">
      <TerminalLines
        lines={[
          `${researchLogs.length} logs indexed.`,
          "Select a log to mount it at /blog/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {researchLogs.map((log) => (
          <button
            key={log.slug}
            type="button"
            data-log-slug={log.slug}
            onClick={() => onNavigate(`/blog/${log.slug}`, `log ${log.slug}`)}
            className="grid gap-3 border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.055] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
          >
            <span className="font-mono text-[11px] text-cyan-100">
              {log.number}
            </span>
            <span>
              <span className="block font-heading text-base text-slate-50">
                {log.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">
                {log.excerpt}
              </span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
              {log.readingTime}
            </span>
          </button>
        ))}
      </div>
    </TerminalSection>
  )
}

function BlogDetailOutput({
  articleContent,
  log,
  onNavigate,
}: {
  articleContent?: ReactNode
  log?: ResearchLog | null
  onNavigate: (path: string, command?: string) => void
}) {
  if (!log) {
    return (
      <TerminalSection icon={BookOpen} label="log" title="Research log not found">
        <TerminalLines lines={["Use blog to inspect available logs."]} />
      </TerminalSection>
    )
  }

  return (
    <TerminalSection icon={BookOpen} label={log.number} title={log.title}>
      <TerminalLines
        lines={[
          `Category: ${log.category}`,
          `Date: ${log.date}`,
          `Read time: ${log.readingTime}`,
          log.excerpt,
        ]}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {log.tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/10 bg-white/[0.035] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 border border-white/10 bg-black/18 p-4">
        <TerminalSubheading>reading view</TerminalSubheading>
        <div className="mt-2 max-w-none font-sans">{articleContent}</div>
      </div>
      <button
        type="button"
        onClick={() => onNavigate("/blog", "blog")}
        className="mt-5 border border-cyan-300/30 bg-cyan-300/[0.08] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-cyan-100 uppercase"
      >
        back to logs
      </button>
    </TerminalSection>
  )
}

function ContactOutput() {
  return (
    <TerminalSection icon={Send} label="contact" title="Deep Space Transmission">
      <TerminalLines
        lines={[
          "Route: Browser -> API -> Mail Service -> Developer Inbox.",
          profile.alternativeHeroLine,
        ]}
      />
      <div className="mt-5">
        <TerminalContactForm />
      </div>
    </TerminalSection>
  )
}

function SkillOutput() {
  return (
    <TerminalSection icon={Code2} label="skills" title="Stack map">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {skill}
          </span>
        ))}
      </div>
    </TerminalSection>
  )
}

function ArchitectureOutput() {
  return (
    <TerminalSection icon={Braces} label="architecture" title="System layers">
      <div className="grid gap-3">
        {architectureLayers.map((layer) => (
          <div key={layer.id} className="border border-white/10 bg-black/22 p-4">
            <p className="font-heading text-lg text-slate-50">{layer.label}</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-cyan-100 uppercase">
              {layer.category} / {layer.flow.join(" -> ")}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {layer.role}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {layer.stacks.map((stack) => (
                <span
                  key={stack}
                  className="border border-white/10 px-2 py-1 font-mono text-[10px] text-slate-400"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TerminalSection>
  )
}

function TerminalSection({
  children,
  icon: Icon,
  label,
  title,
}: {
  children: ReactNode
  icon: ComponentType<{ className?: string }>
  label: string
  title: string
}) {
  return (
    <section className="border border-white/10 bg-white/[0.025] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-200 uppercase">
            {label}
          </p>
          <h1 className="mt-2 font-heading text-2xl font-semibold text-slate-50 sm:text-3xl">
            {title}
          </h1>
        </div>
        <Icon className="size-5 text-cyan-200" />
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function TerminalLines({ lines }: { lines: string[] }) {
  return (
    <pre className="font-mono text-sm leading-7 break-words whitespace-pre-wrap text-slate-300">
      {lines.join("\n")}
    </pre>
  )
}

function TerminalSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-200 uppercase">
      {children}
    </p>
  )
}

function DetailBlock({ text, title }: { text: string; title: string }) {
  return (
    <div className="border border-white/10 bg-black/20 p-4">
      <TerminalSubheading>{title}</TerminalSubheading>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/22 p-3">
      <p className="font-heading text-2xl font-semibold text-slate-50">
        {value}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
        {label}
      </p>
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
    <div className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.035] p-3">
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="size-4 shrink-0 text-cyan-200" />
        <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          {label}
        </span>
      </div>
      <span className="min-w-0 truncate text-right font-mono text-[11px] text-slate-200">
        {value}
      </span>
    </div>
  )
}

function MatrixTelemetry() {
  return (
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
  )
}

function SingularityLab() {
  return (
    <div className="mt-5 border border-violet-300/30 bg-violet-400/10 p-4">
      <p className="font-mono text-xs tracking-[0.18em] text-violet-100 uppercase">
        Singularity Lab
      </p>
      <p className="mt-3 leading-7 text-slate-300">
        Experimental workbench for protocol visualizers, terminal-native
        portfolio routing, blockchain indexer observability, and system
        telemetry that makes state visible.
      </p>
    </div>
  )
}
