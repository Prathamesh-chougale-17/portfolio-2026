"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  type CSSProperties,
  type ComponentType,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  type WheelEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Activity,
  Archive,
  BookOpen,
  Braces,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Command,
  Cpu,
  FolderGit2,
  Home,
  Mail,
  Network,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UserRound,
  Zap,
} from "lucide-react"

import { Icons } from "@/components/icons"
import { TerminalContactForm } from "@/components/terminal/TerminalContactForm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  architectureLayers,
  getProject,
  getResearchLog,
  initSequence,
  profile,
  projects,
  researchLogs,
  skills,
  type PortfolioProject,
  type ResearchLog,
} from "@/data/event-horizon"
import { en } from "@/data/en"
import { hi } from "@/data/hi"
import { mr } from "@/data/mr"
import { cn } from "@/lib/utils"
import type { langtype } from "@/types/lang"

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

type EntryContent =
  | {
      articleContent?: ReactNode
      route: RouteState
      type: "route"
    }
  | {
      type: "skills"
    }
  | {
      type: "architecture"
    }
  | {
      projects: PortfolioProject[]
      title: string
      type: "project-list"
    }

type Entry = {
  id: string
  command?: string
  content?: EntryContent
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
type TerminalLanguage = "en" | "hi" | "mr"

type TerminalSessionState = {
  entries: Entry[]
  hasStarted: boolean
  history: string[]
  language: TerminalLanguage
  lastRouteKey?: string
  matrixMode: boolean
  pendingScrollEntryId?: string
  shouldPrimeOutputToEnd: boolean
  unlockedEggs: string[]
  uptime: number
  workbenchOpen: boolean
}

type ShellThemeConfig = {
  accent: string
  border: string
  glow: string
  label: string
  marker: string
  soft: string
  text: string
  vars: CSSProperties & Record<`--shell-${string}`, string>
}

const INITIAL_STAMP = "--:--:--"
const PENDING_COMMAND_KEY = "pwsh-studio-pending-command"
const LANGUAGE_STORAGE_KEY = "pwsh-studio-language"
const SIDEBAR_STORAGE_KEY = "pwsh-studio-sidebar-open"
const THEME_STORAGE_KEY = "pwsh-studio-theme"
let rememberedInspectorOpen = false
let rememberedSidebarOpen = true
let rememberedTerminalTheme: TerminalTheme = "cyan"
let rememberedTerminalLanguage: TerminalLanguage = "en"
const terminalSession: TerminalSessionState = {
  entries: [],
  hasStarted: false,
  history: [],
  language: "en",
  matrixMode: false,
  shouldPrimeOutputToEnd: false,
  unlockedEggs: [],
  uptime: 0,
  workbenchOpen: false,
}

const languagePacks: Record<TerminalLanguage, langtype> = { en, hi, mr }
const languageLabels: Record<TerminalLanguage, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
}

const routeItems = [
  { label: "Home", href: "/", command: "cd /", icon: Home, meta: "boot" },
  {
    label: "About",
    href: "/about",
    command: "cd /about",
    icon: UserRound,
    meta: "profile",
  },
  {
    label: "Projects",
    href: "/projects",
    command: "cd /projects",
    icon: Archive,
    meta: `${projects.length} cases`,
  },
  {
    label: "Blog",
    href: "/blog",
    command: "cd /blog",
    icon: BookOpen,
    meta: `${researchLogs.length} notes`,
  },
  {
    label: "Contact",
    href: "/contact",
    command: "cd /contact",
    icon: Mail,
    meta: "message",
  },
]

const coreCommands = [
  "help",
  "man",
  "cd /projects",
  "whoami",
  "status",
  "ls -la",
  "cat profile.json",
  "grep backend",
  "projects",
  "contact",
]

const commandList = [
  "help",
  "man",
  "commands",
  "home",
  "about",
  "whoami",
  "uname -a",
  "status",
  "skills",
  "architecture",
  "projects",
  "projects --backend",
  "projects --blockchain",
  "project ",
  "blog",
  "notes",
  "note ",
  "contact",
  "lang en",
  "lang hi",
  "lang mr",
  "cd /",
  "cd /about",
  "cd /projects",
  "cd /blog",
  "cd /contact",
  "cd ..",
  "ls",
  "ls -la",
  "tree",
  "pwd",
  "date",
  "uptime",
  "ping pwsh-core",
  "ps",
  "ps aux",
  "env",
  "which cd",
  "cat profile.json",
  "cat projects.json",
  "cat notes.json",
  "cat architecture.map",
  "grep ",
  "find ",
  "curl /api/contact",
  "xdg-open workbench",
  "theme cyan",
  "theme amber",
  "theme violet",
  "./matrix",
  "pkill matrix",
  "make coffee",
  "base64 -d state.txt",
  "sudo ./ship-it",
  "easter-eggs",
  "history",
  "history -c",
  "clear",
]

const allCommandShortcuts = commandList.map((command) =>
  command === "project "
    ? "project oorja-ai"
    : command === "note "
      ? "note production reliability"
      : command === "grep "
        ? "grep backend"
        : command === "find "
          ? "find projects -name backend"
          : command
)

const terminalThemes: Record<TerminalTheme, ShellThemeConfig> = {
  cyan: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Cyan",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#050505",
      "--shell-bg": "#0c0c0c",
      "--shell-bg-elevated": "#111111",
      "--shell-panel": "#141414",
      "--shell-panel-soft": "#191919",
      "--shell-muted": "#9ca3af",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(34 211 238 / 0.58)",
      "--shell-accent": "rgb(34 211 238)",
      "--shell-accent-text": "rgb(165 243 252)",
      "--shell-accent-soft": "rgb(34 211 238 / 0.13)",
      "--shell-glow":
        "0 0 0 1px rgb(34 211 238 / 0.16), 0 24px 80px rgb(34 211 238 / 0.10)",
    },
  },
  amber: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Amber",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#060504",
      "--shell-bg": "#0f0d08",
      "--shell-bg-elevated": "#151108",
      "--shell-panel": "#181309",
      "--shell-panel-soft": "#20180b",
      "--shell-muted": "#a8a29e",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(250 204 21 / 0.58)",
      "--shell-accent": "rgb(250 204 21)",
      "--shell-accent-text": "rgb(254 240 138)",
      "--shell-accent-soft": "rgb(250 204 21 / 0.14)",
      "--shell-glow":
        "0 0 0 1px rgb(250 204 21 / 0.16), 0 24px 80px rgb(250 204 21 / 0.10)",
    },
  },
  violet: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Violet",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#05040a",
      "--shell-bg": "#0d0b14",
      "--shell-bg-elevated": "#131020",
      "--shell-panel": "#171225",
      "--shell-panel-soft": "#1d1730",
      "--shell-muted": "#a1a1aa",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(196 181 253 / 0.60)",
      "--shell-accent": "rgb(196 181 253)",
      "--shell-accent-text": "rgb(221 214 254)",
      "--shell-accent-soft": "rgb(196 181 253 / 0.15)",
      "--shell-glow":
        "0 0 0 1px rgb(196 181 253 / 0.18), 0 24px 80px rgb(167 139 250 / 0.12)",
    },
  },
}

function isTerminalTheme(value: string | null): value is TerminalTheme {
  return value === "cyan" || value === "amber" || value === "violet"
}

function isTerminalLanguage(value: string | null): value is TerminalLanguage {
  return value === "en" || value === "hi" || value === "mr"
}

function resolveLanguage(value: string) {
  const normalized = value.trim().toLowerCase()
  const aliases: Record<string, TerminalLanguage> = {
    en: "en",
    english: "en",
    hi: "hi",
    hindi: "hi",
    mr: "mr",
    marathi: "mr",
  }

  return aliases[normalized] ?? null
}

function storeTerminalTheme(value: TerminalTheme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // Theme persistence is a preference; the terminal still works without it.
  }
}

function storeTerminalLanguage(value: TerminalLanguage) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value)
  } catch {
    // Language persistence is a preference; English remains the fallback.
  }
}

function storeSidebarOpen(value: boolean) {
  try {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
  } catch {
    // Sidebar persistence is a preference; the terminal still works without it.
  }
}

const eggHints = [
  "xdg-open workbench",
  "./matrix",
  "make coffee",
  "base64 -d state.txt",
  "sudo ./ship-it",
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

function routeEntry(
  route: RouteState,
  articleContent?: ReactNode,
  command = route.command,
  time = "route"
): Entry {
  const routeId = route.path === "/" ? "home" : route.path.replace(/\W+/g, "-")

  return {
    id: `route-initial-${routeId}`,
    command,
    content: {
      articleContent,
      route,
      type: "route",
    },
    time,
    variant: "success",
  }
}

function initialEntries(route: RouteState, articleContent?: ReactNode) {
  return [routeEntry(route, articleContent)]
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
    return { command: "cd /", label: "Home", path: "/", view: "home" }
  }

  if (path === "/about") {
    return {
      command: "cd /about",
      label: "About",
      path,
      view: "about",
    }
  }

  if (path === "/projects") {
    return {
      command: "cd /projects",
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
    return { command: "cd /blog", label: "Blog", path, view: "blog" }
  }

  if (path.startsWith("/blog/")) {
    const selectedSlug = path.replace("/blog/", "")
    return {
      command: `note ${selectedSlug}`,
      label: "Engineering Note",
      path,
      selectedSlug,
      view: "blog-detail",
    }
  }

  if (path === "/contact") {
    return { command: "cd /contact", label: "Contact", path, view: "contact" }
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
      project.title.toLowerCase() === normalized ||
      project.title.toLowerCase().includes(normalized)
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

function localizedRouteLabel(
  languageData: langtype,
  href: string,
  fallback: string
) {
  return (
    languageData.navItems.find((item) => item.href === href)?.title ?? fallback
  )
}

function localizedProject(project: PortfolioProject, languageData: langtype) {
  const index = projects.findIndex((item) => item.slug === project.slug)
  const localized = index >= 0 ? languageData.projects[index] : undefined

  return {
    description: localized?.description ?? project.description,
    title: localized?.title ?? project.title,
  }
}

function resolveLocationTarget(rawTarget: string, currentPath: string) {
  const target = rawTarget.trim()

  if (!target || target === "~" || target === "/") {
    return "/"
  }

  if (target === ".") {
    return currentPath
  }

  if (target === "..") {
    const segments = currentPath.split("/").filter(Boolean)
    if (segments.length <= 1) return "/"
    return `/${segments.slice(0, -1).join("/")}`
  }

  const routeAliases: Record<string, string> = {
    home: "/",
    about: "/about",
    project: "/projects",
    projects: "/projects",
    blog: "/blog",
    notes: "/blog",
    contact: "/contact",
  }

  if (routeAliases[target.toLowerCase()]) {
    return routeAliases[target.toLowerCase()]
  }

  return target.startsWith("/") ? target : `/${target}`
}

function resolveNaturalRouteCommand(command: string) {
  const match = command.match(/^(show(?: me)?|go(?: to)?|take me to)\s+(.+)$/i)
  if (!match) return null

  const target = match[2]
    .trim()
    .replace(/^the\s+/i, "")
    .replace(/\s+page$/i, "")
    .trim()
    .toLowerCase()

  if (["/", "home", "homepage", "root"].includes(target)) return "/"
  if (["about", "profile", "whoami"].includes(target)) return "/about"
  if (["project", "projects", "case studies", "work"].includes(target)) {
    return "/projects"
  }
  if (["blog", "notes", "logs", "writing"].includes(target)) return "/blog"
  if (["contact", "message"].includes(target)) return "/contact"

  if (target.startsWith("/")) return target

  if (target.startsWith("project ")) {
    const project = findProject(target.replace(/^project\s+/i, ""))
    return project ? `/projects/${project.slug}` : null
  }

  if (target.startsWith("note ") || target.startsWith("blog ")) {
    const log = findResearchLog(target.replace(/^(note|blog)\s+/i, ""))
    return log ? `/blog/${log.slug}` : null
  }

  return null
}

function workspaceTree() {
  return [
    "total 8",
    "drwxr-xr-x  5 prath studio   160 now .",
    "drwxr-xr-x  3 prath studio    96 now ..",
    "drwxr-xr-x  2 prath studio    64 now about",
    "drwxr-xr-x  2 prath studio    64 now projects",
    "drwxr-xr-x  2 prath studio    64 now blog",
    "drwxr-xr-x  2 prath studio    64 now contact",
    "-rw-r--r--  1 prath studio  1.2k now profile.json",
    "-rw-r--r--  1 prath studio  5.4k now projects.json",
    "-rw-r--r--  1 prath studio  2.1k now notes.json",
    "-rw-r--r--  1 prath studio  928B now architecture.map",
  ]
}

function workspaceTreeGraph() {
  return [
    ".",
    "|-- about/",
    "|-- projects/",
    "|   |-- <project-slug>/",
    "|-- blog/",
    "|   |-- <note-slug>/",
    "|-- contact/",
    "|-- profile.json",
    "|-- projects.json",
    "|-- notes.json",
    "`-- architecture.map",
  ]
}

function profileJson(languageData: langtype) {
  return JSON.stringify(
    {
      name: languageData.hero.name,
      role: languageData.hero.title,
      focus: languageData.hero.description,
      workspace: "PWSH Studio",
      skills: skills.slice(0, 10),
    },
    null,
    2
  )
}

function projectsJson() {
  return JSON.stringify(
    projects.slice(0, 10).map((project) => ({
      id: project.projectId,
      title: project.title,
      route: `/projects/${project.slug}`,
      category: project.category,
      stack: project.stack.slice(0, 5),
    })),
    null,
    2
  )
}

function notesJson() {
  return JSON.stringify(
    researchLogs.map((log) => ({
      id: log.number,
      title: log.title,
      route: `/blog/${log.slug}`,
      read: log.readingTime,
    })),
    null,
    2
  )
}

function architectureMap() {
  return architectureLayers
    .map(
      (layer) =>
        `${layer.id.padEnd(10)} ${layer.category.padEnd(10)} ${layer.flow.join(" -> ")}`
    )
    .join("\n")
}

function commandIndexLines() {
  return [
    "Navigation",
    "  cd /, cd /about, cd /projects, cd /blog, cd /contact, cd ..",
    "  project <name>, note <name>",
    "Workspace",
    "  ls, ls -la, tree, pwd, date, uptime, env",
    "  cat profile.json|projects.json|notes.json|architecture.map",
    "Discovery",
    "  whoami, uname -a, status, skills, architecture, projects, blog",
    "  grep <query>, find projects -name <query>",
    "Actions",
    "  contact, curl /api/contact, ping pwsh-core",
    "Preferences",
    "  theme cyan|amber|violet, lang en|hi|mr",
    "Extras",
    "  ./matrix, pkill matrix, make coffee, base64 -d state.txt, sudo ./ship-it, xdg-open workbench",
  ]
}

function processLines(latency: number, routePath: string) {
  return [
    "USER       PID  %CPU %MEM COMMAND",
    `prath      101  0.${latency}  2.1  next-router --route=${routePath}`,
    "prath      118  0.2  1.4  contact-api --listen=/api/contact",
    "prath      124  0.1  1.2  project-index --watch",
    "prath      137  0.1  0.9  notes-reader --mdx",
    "prath      149  0.0  0.6  theme-service --persist",
  ]
}

function searchWorkspace(query: string) {
  const needle = query.trim().toLowerCase()

  if (!needle) {
    return ["grep requires a query.", "Try: grep backend"]
  }

  const projectMatches = projects
    .filter((project) =>
      [
        project.title,
        project.description,
        project.category,
        project.type,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
    .slice(0, 6)
    .map((project) => `project  ${project.projectId}  ${project.title}`)

  const noteMatches = researchLogs
    .filter((log) =>
      [log.title, log.excerpt, log.category, ...log.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
    .slice(0, 6)
    .map((log) => `note     ${log.number}  ${log.title}`)

  const skillMatches = skills
    .filter((skill) => skill.toLowerCase().includes(needle))
    .slice(0, 8)
    .map((skill) => `skill    ${skill}`)

  const matches = [...projectMatches, ...noteMatches, ...skillMatches]

  return matches.length
    ? [`Matches for "${query}":`, ...matches]
    : [`No workspace matches for "${query}".`]
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
  const [uptime, setUptime] = useState(() => terminalSession.uptime)
  const [history, setHistory] = useState<string[]>(() => terminalSession.history)
  const [, setHistoryIndex] = useState<number | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(
    () => rememberedInspectorOpen
  )
  const [sidebarOpen, setSidebarOpen] = useState(() => rememberedSidebarOpen)
  const [theme, setTheme] = useState<TerminalTheme>(
    () => rememberedTerminalTheme
  )
  const [language, setLanguage] = useState<TerminalLanguage>(
    () => rememberedTerminalLanguage
  )
  const [matrixMode, setMatrixMode] = useState(
    () => terminalSession.matrixMode
  )
  const [workbenchOpen, setWorkbenchOpen] = useState(
    () => terminalSession.workbenchOpen
  )
  const [unlockedEggs, setUnlockedEggs] = useState<string[]>(
    () => terminalSession.unlockedEggs
  )
  const themeConfig = terminalThemes[theme]
  const languageData = languagePacks[language]

  const routeState = useMemo(
    () => resolveRoute(pathname, initialView, selectedSlug),
    [initialView, pathname, selectedSlug]
  )
  const routeKey = `${routeState.view}:${routeState.selectedSlug ?? ""}:${routeState.path}`
  const [entries, setEntries] = useState<Entry[]>(() => {
    if (terminalSession.hasStarted) {
      return terminalSession.entries
    }

    const nextEntries = initialEntries(routeState, articleContent)
    terminalSession.entries = nextEntries
    terminalSession.hasStarted = true
    terminalSession.lastRouteKey = routeKey
    return nextEntries
  })

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

  useEffect(() => {
    const restoreLanguage = window.setTimeout(() => {
      try {
        const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
        if (isTerminalLanguage(storedLanguage)) {
          rememberedTerminalLanguage = storedLanguage
          terminalSession.language = storedLanguage
          setLanguage(storedLanguage)
        }
      } catch {
        // Ignore blocked storage; English remains the fallback language.
      }
    }, 0)

    return () => window.clearTimeout(restoreLanguage)
  }, [])

  useEffect(() => {
    const restoreSidebar = window.setTimeout(() => {
      try {
        const storedSidebarOpen =
          window.localStorage.getItem(SIDEBAR_STORAGE_KEY)
        if (storedSidebarOpen === "true" || storedSidebarOpen === "false") {
          const nextValue = storedSidebarOpen === "true"
          rememberedSidebarOpen = nextValue
          setSidebarOpen(nextValue)
        }
      } catch {
        // Ignore blocked storage; the sidebar falls back to open.
      }
    }, 0)

    return () => window.clearTimeout(restoreSidebar)
  }, [])

  useEffect(() => {
    function onWindowKeyDown(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if (isEditable || !(event.ctrlKey || event.metaKey)) return

      const key = event.key.toLowerCase()

      if (key === "b") {
        event.preventDefault()
        setSidebarOpen((current) => {
          const nextValue = !current
          rememberedSidebarOpen = nextValue
          storeSidebarOpen(nextValue)
          return nextValue
        })
      }

      if (key === "i") {
        event.preventDefault()
        setInspectorOpen((current) => {
          const nextValue = !current
          rememberedInspectorOpen = nextValue
          return nextValue
        })
      }
    }

    window.addEventListener("keydown", onWindowKeyDown)
    return () => window.removeEventListener("keydown", onWindowKeyDown)
  }, [])

  function applyTheme(nextTheme: TerminalTheme) {
    rememberedTerminalTheme = nextTheme
    setTheme(nextTheme)
    storeTerminalTheme(nextTheme)
  }

  function applyLanguage(nextLanguage: TerminalLanguage) {
    rememberedTerminalLanguage = nextLanguage
    terminalSession.language = nextLanguage
    setLanguage(nextLanguage)
    storeTerminalLanguage(nextLanguage)
  }

  function applySidebarOpen(nextValue: boolean) {
    rememberedSidebarOpen = nextValue
    setSidebarOpen(nextValue)
    storeSidebarOpen(nextValue)
  }

  function applyInspectorOpen(nextValue: boolean) {
    rememberedInspectorOpen = nextValue
    setInspectorOpen(nextValue)
  }

  function navigateTo(path: string, command = `cd ${path}`) {
    const target = normalizeRoute(path)
    if (!isValidRoute(target)) {
      appendEntry({
        command,
        lines: [`Route ${target} is not in the workspace map.`],
        variant: "error",
      })
      return
    }

    if (target === pathname) {
      appendEntry({
        command,
        content: {
          articleContent,
          route: routeState,
          type: "route",
        },
        variant: "success",
      })
      return
    }

    terminalSession.shouldPrimeOutputToEnd = true
    window.sessionStorage.setItem(PENDING_COMMAND_KEY, command)
    router.push(target, { scroll: false })
  }

  useLayoutEffect(() => {
    if (terminalSession.hasStarted && terminalSession.lastRouteKey !== routeKey) {
      terminalSession.shouldPrimeOutputToEnd = true
    }

    const output = outputRef.current
    if (!output) {
      return
    }

    const outputElement = output

    const scrollBehavior: ScrollBehavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
      ? "auto"
      : "smooth"

    function scrollEntryIntoView(
      entryId: string,
      behavior: ScrollBehavior = "auto"
    ) {
      const target = outputElement.querySelector<HTMLElement>(
        `[data-terminal-entry-id="${entryId}"]`
      )

      if (!target) {
        return false
      }

      const outputRect = outputElement.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const nextTop = outputElement.scrollTop + targetRect.top - outputRect.top
      const maxTop = outputElement.scrollHeight - outputElement.clientHeight
      outputElement.scrollTo({
        behavior,
        top: Math.max(0, Math.min(nextTop, maxTop)),
      })
      return true
    }

    const pendingEntryId = terminalSession.pendingScrollEntryId
    if (pendingEntryId) {
      const didScroll = scrollEntryIntoView(pendingEntryId, scrollBehavior)
      const frame = window.requestAnimationFrame(() => {
        scrollEntryIntoView(pendingEntryId, scrollBehavior)
        terminalSession.pendingScrollEntryId = undefined
      })

      if (didScroll) {
        terminalSession.shouldPrimeOutputToEnd = false
      }

      return () => window.cancelAnimationFrame(frame)
    }

    if (!terminalSession.shouldPrimeOutputToEnd) {
      return
    }

    outputElement.scrollTop = outputElement.scrollHeight
    const frame = window.requestAnimationFrame(() => {
      outputElement.scrollTop = outputElement.scrollHeight
      terminalSession.shouldPrimeOutputToEnd = false
    })

    return () => window.cancelAnimationFrame(frame)
  }, [entries.length, routeKey])

  useEffect(() => {
    if (terminalSession.lastRouteKey === routeKey) {
      return
    }

    const pending = window.sessionStorage.getItem(PENDING_COMMAND_KEY)
    window.sessionStorage.removeItem(PENDING_COMMAND_KEY)
    terminalSession.lastRouteKey = routeKey
    window.setTimeout(() => {
      appendEntry({
        command: pending ?? routeState.command,
        content: {
          articleContent,
          route: routeState,
          type: "route",
        },
        variant: "success",
      })
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey])

  useEffect(() => {
    terminalSession.entries = entries
  }, [entries])

  useEffect(() => {
    terminalSession.history = history
  }, [history])

  useEffect(() => {
    terminalSession.matrixMode = matrixMode
  }, [matrixMode])

  useEffect(() => {
    terminalSession.workbenchOpen = workbenchOpen
  }, [workbenchOpen])

  useEffect(() => {
    terminalSession.unlockedEggs = unlockedEggs
  }, [unlockedEggs])

  useEffect(() => {
    const initialSync = window.setTimeout(() => setClock(stamp()), 0)
    const interval = window.setInterval(() => {
      setClock(stamp())
      setLatency(14 + Math.round(Math.random() * 22))
      setUptime((value) => {
        const nextValue = value + 1
        terminalSession.uptime = nextValue
        return nextValue
      })
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
    const nextEntry = { ...entry, id: entryId(), time: stamp() }
    terminalSession.pendingScrollEntryId = nextEntry.id
    setEntries((current) => {
      const nextEntries = [...current, nextEntry]
      terminalSession.entries = nextEntries
      terminalSession.hasStarted = true
      return nextEntries
    })
  }

  function unlockEgg(name: string) {
    setUnlockedEggs((current) => {
      const nextEggs = current.includes(name) ? current : [...current, name]
      terminalSession.unlockedEggs = nextEggs
      return nextEggs
    })
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim()
    if (!command) return

    setHistory((current) => {
      const nextHistory = [...current, command]
      terminalSession.history = nextHistory
      return nextHistory
    })
    setHistoryIndex(null)

    const normalized = command.toLowerCase()
    const naturalRoute = resolveNaturalRouteCommand(command)

    if (naturalRoute) {
      navigateTo(naturalRoute, command)
      return
    }

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
            `Project not found for "${query}".`,
            "Try: project oorja ai, project carbon track, or projects --backend.",
          ],
          variant: "error",
        })
        return
      }
      navigateTo(`/projects/${project.slug}`, command)
      return
    }

    if (
      normalized === "blog" ||
      normalized === "logs" ||
      normalized === "notes"
    ) {
      navigateTo("/blog", command)
      return
    }

    if (normalized.startsWith("log ") || normalized.startsWith("note ")) {
      const query = command.replace(/^(log|note)\s+/i, "")
      const log = findResearchLog(query)
      if (!log) {
        appendEntry({
          command,
          lines: [`Engineering note not found for "${query}".`],
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

    if (/^(cd|set-location|sl)(\s|$)/i.test(command)) {
      const target = command.replace(/^(cd|set-location|sl)\s*/i, "")
      navigateTo(resolveLocationTarget(target, routeState.path), command)
      return
    }

    if (normalized.startsWith("open ")) {
      navigateTo(command.replace(/^open\s+/i, ""), command)
      return
    }

    if (
      normalized.startsWith("theme ") ||
      normalized.startsWith("set-theme ")
    ) {
      const nextTheme = normalized.replace(/^(theme|set-theme)\s+/i, "").trim()
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
        lines: [`Workspace theme set to ${nextTheme}.`],
        variant: "success",
      })
      return
    }

    if (
      normalized.startsWith("lang ") ||
      normalized.startsWith("language ") ||
      normalized.startsWith("locale ")
    ) {
      const nextLanguage = resolveLanguage(
        command.replace(/^(lang|language|locale)\s+/i, "")
      )
      if (!nextLanguage) {
        appendEntry({
          command,
          lines: [
            "Language not found. Available: en, hi, mr.",
            "Aliases: english, hindi, marathi.",
          ],
          variant: "error",
        })
        return
      }
      applyLanguage(nextLanguage)
      appendEntry({
        command,
        lines: [`Language set to ${languageLabels[nextLanguage]}.`],
        variant: "success",
      })
      return
    }

    switch (normalized) {
      case "help":
      case "get-help":
      case "man":
      case "man pwsh":
        appendEntry({
          command,
          lines: [
            "Navigation: home, about, projects, project <name>, blog, note <name>, contact.",
            "Routes: cd /about, cd /projects, cd /projects/<slug>, cd /blog/<slug>, cd ...",
            "Linux: ls, tree, pwd, cat <file>, grep <query>, find projects -name <query>.",
            "Data: whoami, status, skills, architecture, projects --backend, projects --blockchain.",
            "Shell: ps, uname -a, env, ping pwsh-core, curl /api/contact.",
            "Language: lang en, lang hi, lang mr.",
            "Extras: easter-eggs for hidden commands.",
          ],
        })
        return
      case "get-command":
      case "commands":
        appendEntry({
          command,
          lines: commandIndexLines(),
          variant: "success",
        })
        return
      case "uname":
      case "uname -a":
        appendEntry({
          command,
          lines: [
            "Linux pwsh-studio 6.9.0-terminal x86_64 GNU/Linux",
            `${languageData.hero.name} / ${languageData.hero.title}`,
          ],
          variant: "success",
        })
        return
      case "whoami":
        appendEntry({
          command,
          lines: [
            `${languageData.hero.name} / ${languageData.hero.title}`,
            languageData.hero.description,
            profile.alternativeHeroLine,
          ],
          variant: "success",
        })
        return
      case "status":
        appendEntry({
          command,
          lines: [
            "PWSH STUDIO: PRIMARY WORKSPACE",
            "SHELL: POWERSHELL-INSPIRED",
            `ROUTE: ${routeState.path}`,
            `PROJECTS INDEXED: ${projects.length}`,
            `ENGINEERING NOTES: ${researchLogs.length}`,
            `ARCHITECTURE LAYERS: ${architectureLayers.length}`,
            `LATENCY: ${latency}ms`,
            `EXTRAS UNLOCKED: ${unlockedEggs.length}/${eggHints.length}`,
          ],
          variant: "success",
        })
        return
      case "skills":
        appendEntry({
          command,
          content: { type: "skills" },
          variant: "success",
        })
        return
      case "architecture":
      case "stack-map":
        appendEntry({
          command,
          content: { type: "architecture" },
          variant: "success",
        })
        return
      case "projects --backend":
        appendEntry({
          command,
          content: {
            projects: projects.filter((project) =>
              project.categories.includes("Backend")
            ),
            title: "Backend systems",
            type: "project-list",
          },
          variant: "success",
        })
        return
      case "projects --blockchain":
        appendEntry({
          command,
          content: {
            projects: projects.filter((project) =>
              project.categories.includes("Blockchain")
            ),
            title: "Blockchain systems",
            type: "project-list",
          },
          variant: "success",
        })
        return
      case "ls":
      case "ls -l":
      case "ls -la":
      case "dir":
      case "gci":
      case "get-childitem":
        appendEntry({
          command,
          lines: workspaceTree(),
        })
        return
      case "tree":
        appendEntry({
          command,
          lines: workspaceTreeGraph(),
        })
        return
      case "pwd":
      case "get-location":
        appendEntry({ command, lines: [routeState.path] })
        return
      case "date":
      case "get-date":
        appendEntry({ command, lines: [new Date().toString()] })
        return
      case "uptime":
      case "get-uptime":
        appendEntry({ command, lines: [`Workspace uptime: ${uptime}s`] })
        return
      case "ping":
      case "ping pwsh-core":
      case "test-connection":
      case "test-connection pwsh-core":
        appendEntry({
          command,
          lines: [`PING pwsh-core: seq=1 ttl=64 time=${latency}ms`],
          variant: "success",
        })
        return
      case "ps":
      case "ps aux":
      case "get-process":
        appendEntry({
          command,
          lines: processLines(latency, routeState.path),
          variant: "success",
        })
        return
      case "cat profile.json":
      case "type profile.json":
      case "gc profile.json":
      case "get-content profile.json":
        appendEntry({
          command,
          lines: [profileJson(languageData)],
          variant: "success",
        })
        return
      case "cat projects.json":
      case "type projects.json":
      case "gc projects.json":
      case "get-content projects.json":
        appendEntry({
          command,
          lines: [projectsJson()],
          variant: "success",
        })
        return
      case "cat notes.json":
      case "type notes.json":
      case "gc notes.json":
      case "get-content notes.json":
        appendEntry({
          command,
          lines: [notesJson()],
          variant: "success",
        })
        return
      case "cat architecture.map":
      case "type architecture.map":
      case "gc architecture.map":
      case "get-content architecture.map":
        appendEntry({
          command,
          lines: [architectureMap()],
          variant: "success",
        })
        return
      case "env":
      case "printenv":
        appendEntry({
          command,
          lines: [
            "SHELL=/bin/bash",
            `PWD=${routeState.path}`,
            `USER=${profile.name.split(" ")[0].toLowerCase()}`,
            `THEME=${theme}`,
            `LANG=${language}`,
            "APP=PWSH Studio",
          ],
        })
        return
      case "curl /api/contact":
        appendEntry({
          command,
          lines: [
            "HTTP/1.1 200 OK",
            "content-type: application/json",
            "",
            JSON.stringify(
              {
                route: "/api/contact",
                method: "POST",
                schema: "contactSchema",
              },
              null,
              2
            ),
          ],
          variant: "success",
        })
        return
      case "matrix":
      case "./matrix":
        setMatrixMode(true)
        unlockEgg("matrix")
        appendEntry({
          command,
          lines: ["Matrix telemetry enabled."],
          variant: "egg",
        })
        return
      case "clear matrix":
      case "pkill matrix":
        setMatrixMode(false)
        appendEntry({
          command,
          lines: ["Matrix telemetry disabled."],
          variant: "success",
        })
        return
      case "coffee":
      case "make coffee":
        unlockEgg("coffee")
        appendEntry({
          command,
          lines: [
            "Brewing developer fuel...",
            "Result: +18 focus, +7 bug tolerance, workspace stays online.",
          ],
          variant: "egg",
        })
        return
      case "decode state":
      case "base64 -d state.txt":
        unlockEgg("decode state")
        appendEntry({
          command,
          lines: [
            "State decoded:",
            "Good backend engineering is mostly making invisible state legible before it becomes a production mystery.",
          ],
          variant: "egg",
        })
        return
      case "sudo ship-it":
      case "sudo ./ship-it":
        unlockEgg("sudo ship-it")
        appendEntry({
          command,
          lines: [
            "Privilege accepted.",
            "Generated checklist: explain tradeoffs, show shipped systems, keep demos fast, make architecture readable.",
          ],
          variant: "egg",
        })
        return
      case "start-process workbench":
      case "open workbench":
      case "xdg-open workbench":
        setWorkbenchOpen(true)
        unlockEgg("xdg-open workbench")
        appendEntry({
          command,
          lines: [
            "Workbench opened.",
            "PWSH Labs is ready for experiments and system notes.",
            "Useful commands: architecture, matrix, decode state.",
          ],
          variant: "egg",
        })
        return
      case "easter-eggs":
        appendEntry({
          command,
          lines: [
            `Extras unlocked: ${unlockedEggs.length}/${eggHints.length}`,
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
      case "get-history":
        appendEntry({
          command,
          lines: history.length
            ? history.map((item, index) => `${index + 1}  ${item}`)
            : ["No command history yet."],
        })
        return
      case "clear-history":
      case "history -c":
        setHistory([])
        appendEntry({
          command,
          lines: ["Command history cleared."],
          variant: "success",
        })
        return
      case "clear":
      case "cls":
      case "clear-host":
        terminalSession.pendingScrollEntryId = undefined
        terminalSession.shouldPrimeOutputToEnd = false
        terminalSession.entries = []
        setEntries([])
        terminalSession.matrixMode = false
        setMatrixMode(false)
        terminalSession.workbenchOpen = false
        setWorkbenchOpen(false)
        return
      default:
        if (/^(grep|rg|select-string|sls)\s+/i.test(command)) {
          const query = command.replace(/^(grep|rg|select-string|sls)\s+/i, "")
          appendEntry({
            command,
            lines: searchWorkspace(query),
            variant: "success",
          })
          return
        }

        if (/^find\s+/i.test(command)) {
          const query =
            command.match(/-name\s+(.+)$/i)?.[1] ??
            command.replace(/^find\s+/i, "")
          appendEntry({
            command,
            lines: searchWorkspace(query),
            variant: "success",
          })
          return
        }

        if (/^which\s+/i.test(command)) {
          const name = command.replace(/^which\s+/i, "").trim()
          const knownCommands = new Set(
            commandList.map((item) => item.split(" ")[0].toLowerCase())
          )
          const isBuiltin = ["cd", "history", "clear"].includes(
            name.toLowerCase()
          )
          appendEntry({
            command,
            lines: isBuiltin
              ? [`${name}: shell built-in`]
              : knownCommands.has(name.toLowerCase())
                ? [`/usr/bin/${name}`]
                : [`${name} not found`],
            variant:
              isBuiltin || knownCommands.has(name.toLowerCase())
                ? "success"
                : "error",
          })
          return
        }

        if (/^(get-content|cat|type|gc)\s+/i.test(command)) {
          const target = command
            .replace(/^(get-content|cat|type|gc)\s+/i, "")
            .trim()
          appendEntry({
            command,
            lines: [
              `cat: ${target}: No such file or directory`,
              "Available: profile.json, projects.json, notes.json, architecture.map.",
            ],
            variant: "error",
          })
          return
        }

        appendEntry({
          command,
          lines: [
            `Command not recognized: ${command}`,
            "Type help for the shell command index.",
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
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--shell-page)] text-slate-100 transition-colors duration-300 lg:h-svh lg:overflow-hidden"
      style={themeConfig.vars}
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,var(--shell-accent-soft),transparent_28rem),linear-gradient(180deg,var(--shell-page),var(--shell-bg)_48%,var(--shell-page))] opacity-80" />
      <div className="hud-grid pointer-events-none fixed inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)] opacity-20" />
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1680px] flex-col p-3 sm:p-4 lg:h-svh lg:min-h-0">
          <TerminalHeader
            activeLog={activeLog}
            activeProject={activeProject}
            clock={clock}
            inspectorOpen={inspectorOpen}
            latency={latency}
            languageData={languageData}
            onInspectorOpenChange={applyInspectorOpen}
            route={routeState}
            themeConfig={themeConfig}
        />

        <div
          className={cn(
            "grid min-h-0 flex-1 gap-3 lg:h-full lg:overflow-hidden",
            sidebarOpen && inspectorOpen
              ? "lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px]"
              : null,
            !sidebarOpen && inspectorOpen
              ? "lg:grid-cols-[72px_minmax(0,1fr)_300px] xl:grid-cols-[72px_minmax(0,1fr)_320px]"
              : null,
            sidebarOpen && !inspectorOpen
              ? "lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]"
              : null,
            !sidebarOpen && !inspectorOpen
              ? "lg:grid-cols-[72px_minmax(0,1fr)]"
              : null
          )}
        >
          <TerminalQuickAccess
            activePath={routeState.path}
            languageData={languageData}
            open={sidebarOpen}
            onCommand={runCommand}
            onOpenChange={applySidebarOpen}
            onNavigate={navigateTo}
            themeConfig={themeConfig}
          />

          <Card
            size="sm"
            className={cn(
              "flex min-h-[72svh] gap-0 overflow-hidden rounded-lg border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-0 text-slate-100 ring-1 ring-white/10 lg:h-full lg:min-h-0",
              themeConfig.glow
            )}
            aria-label="Shell output"
            onWheel={onTerminalPanelWheel}
          >
            <CardHeader className="border-b border-[color:var(--shell-line)] bg-[var(--shell-bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-3">
                <TerminalSquare className={cn("size-5", themeConfig.text)} />
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] text-slate-200 uppercase">
                    shell output
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
                    route: {routeState.path}
                  </p>
                </div>
              </div>
              <CardAction>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-7 rounded-none border px-2 font-mono text-[10px] tracking-[0.14em] uppercase",
                    themeConfig.border,
                    themeConfig.soft
                  )}
                >
                  {routeState.label}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardContent
              ref={outputRef}
              className={cn(
                "min-h-0 flex-1 [scrollbar-color:var(--shell-border-strong)_transparent] overflow-y-auto overscroll-contain bg-[var(--shell-bg)] px-4 py-4 sm:px-5",
                matrixMode &&
                  "bg-[linear-gradient(180deg,var(--shell-accent-soft),transparent_34%),repeating-linear-gradient(90deg,transparent_0_28px,var(--shell-accent-soft)_28px_29px)]"
              )}
              data-terminal-output
            >
              {entries.map((entry) => (
                <EntryBlock
                  entry={entry}
                  key={entry.id}
                  languageData={languageData}
                  onNavigate={navigateTo}
                  themeConfig={themeConfig}
                />
              ))}

              {workbenchOpen ? <PwshLabPanel /> : null}
              {matrixMode ? <MatrixTelemetry /> : null}
            </CardContent>

            <CardFooter className="border-t border-[color:var(--shell-line)] bg-[var(--shell-bg-elevated)] px-4 py-4">
              <form onSubmit={onSubmit} className="w-full">
                <label className="sr-only" htmlFor="terminal-command">
                  Shell command
                </label>
                {suggestions.length ? (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setInput(suggestion)}
                        className="border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-400 transition hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
                <div
                  className={cn(
                    "flex items-center gap-3 border bg-[var(--shell-bg)] px-3 py-2 shadow-inner",
                    themeConfig.border
                  )}
                >
                  <span className={cn("font-mono", themeConfig.text)}>
                    prath@pwsh:{routeState.path === "/" ? "~" : routeState.path}
                    $
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
            </CardFooter>
          </Card>

          {inspectorOpen ? (
            <TerminalInspector
              clock={clock}
              history={history}
              language={language}
              latency={latency}
              setLanguage={applyLanguage}
              onOpenChange={applyInspectorOpen}
              route={routeState}
              setTheme={applyTheme}
              theme={theme}
              themeConfig={themeConfig}
              unlockedEggs={unlockedEggs}
              uptime={uptime}
            />
          ) : null}
        </div>
      </div>
    </main>
  )
}

function TerminalHeader({
  activeLog,
  activeProject,
  clock,
  inspectorOpen,
  languageData,
  latency,
  onInspectorOpenChange,
  route,
  themeConfig,
}: {
  activeLog?: ResearchLog
  activeProject?: PortfolioProject
  clock: string
  inspectorOpen: boolean
  languageData: langtype
  latency: number
  onInspectorOpenChange: (open: boolean) => void
  route: RouteState
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  const github = profile.socials.find((link) => link.label === "GitHub")
  const linkedin = profile.socials.find((link) => link.label === "LinkedIn")
  const GitHubIcon = Icons.gitHub
  const LinkedInIcon = Icons.linkedin
  const localizedActiveProject = activeProject
    ? localizedProject(activeProject, languageData).title
    : undefined

  return (
    <header className="mb-3 shrink-0">
      <Card className="gap-0 rounded-lg border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100 ring-1 ring-white/10 backdrop-blur-xl">
        <CardContent className="px-4 py-3">
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
                  PWSH Studio
                </p>
                <p className="mt-1 truncate font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  {localizedActiveProject ??
                    activeLog?.title ??
                    "developer workspace"}{" "}
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
                className="flex size-9 items-center justify-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-200 transition hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={linkedin?.url ?? "#"}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-200 transition hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <Button
                type="button"
                size="lg"
                aria-pressed={inspectorOpen}
                aria-label={
                  inspectorOpen ? "Close inspector" : "Open inspector"
                }
                onClick={() => onInspectorOpenChange(!inspectorOpen)}
                className={cn(
                  "h-9 rounded-none border px-3 text-sm font-semibold transition",
                  inspectorOpen
                    ? cn(themeConfig.border, themeConfig.soft)
                    : themeConfig.accent
                )}
              >
                <Activity className="size-4" />
                Inspect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  )
}

function TerminalQuickAccess({
  activePath,
  languageData,
  open,
  onCommand,
  onOpenChange,
  onNavigate,
  themeConfig,
}: {
  activePath: string
  languageData: langtype
  open: boolean
  onCommand: (command: string) => void
  onOpenChange: (open: boolean) => void
  onNavigate: (path: string, command?: string) => void
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  const [commandTab, setCommandTab] = useState<"core" | "all">("core")
  const [commandQuery, setCommandQuery] = useState("")
  const visibleCommands = useMemo(() => {
    const source = commandTab === "core" ? coreCommands : allCommandShortcuts
    const normalizedQuery = commandQuery.trim().toLowerCase()

    if (!normalizedQuery || commandTab === "core") {
      return source
    }

    return source.filter((command) =>
      command.toLowerCase().includes(normalizedQuery)
    )
  }, [commandQuery, commandTab])

  if (!open) {
    return (
      <aside className="min-h-0 rounded-lg lg:h-full" data-sidebar-open="false">
        <Card className="h-full gap-0 rounded-lg border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100 ring-1 ring-white/10">
          <CardContent className="flex min-h-0 flex-col items-center gap-2 px-2 py-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open sidebar"
              title="Open sidebar"
              onClick={() => onOpenChange(true)}
              className={cn(
                "rounded-md border bg-[var(--shell-panel-soft)]",
                themeConfig.border,
                themeConfig.soft
              )}
            >
              <ChevronRight data-icon="inline-start" />
            </Button>

            <Separator className="bg-[var(--shell-line)]" />

            {routeItems.map((item) => {
              const Icon = item.icon
              const active =
                item.href === "/"
                  ? activePath === "/"
                  : activePath === item.href ||
                    activePath.startsWith(`${item.href}/`)
              const label = localizedRouteLabel(
                languageData,
                item.href,
                item.label
              )

              return (
                <Button
                  key={item.href}
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-current={active ? "page" : undefined}
                  aria-label={label}
                  data-terminal-route={item.href}
                  title={`${label} - ${item.meta}`}
                  onClick={() => onNavigate(item.href, item.command)}
                  className={cn(
                    "relative rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-300 hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] hover:text-[var(--shell-accent-text)]",
                    active && cn(themeConfig.border, themeConfig.soft)
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1.5 bottom-1.5 left-0 w-0.5 opacity-0 transition",
                      active && "opacity-100",
                      themeConfig.marker
                    )}
                  />
                  <Icon data-icon="inline-start" />
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </aside>
    )
  }

  return (
    <aside className="min-h-0 rounded-lg lg:h-full" data-sidebar-open="true">
      <Card className="h-full gap-0 rounded-lg border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100 ring-1 ring-white/10">
        <CardHeader className="px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Network className={cn("size-4", themeConfig.text)} />
              <CardTitle className="font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase">
                start menu
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="rounded-none border-[color:var(--shell-border)] font-mono text-[10px] text-slate-400"
            >
              {routeItems.length} pages
            </Badge>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Close sidebar"
              title="Close sidebar"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-400 hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
            >
              <ChevronLeft data-icon="inline-start" />
            </Button>
          </div>
        </CardHeader>
        <Separator className="bg-[var(--shell-line)]" />
        <CardContent className="min-h-0 flex-1 px-3 py-3">
          <ScrollArea className="h-full pr-2 [&_[data-slot=scroll-area-scrollbar]]:hidden">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {routeItems.map((item) => {
                const Icon = item.icon
                const active =
                  item.href === "/"
                    ? activePath === "/"
                    : activePath === item.href ||
                      activePath.startsWith(`${item.href}/`)
                const label = localizedRouteLabel(
                  languageData,
                  item.href,
                  item.label
                )

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
                        : "border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-300 hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
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
                          {label}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-[10px] text-slate-500">
                          {item.meta}
                        </span>
                      </span>
                    </span>
                    <Badge
                      variant="outline"
                      className="hidden shrink-0 rounded-none border-[color:var(--shell-border)] font-mono text-[10px] text-slate-500 xl:inline-flex"
                    >
                      {item.href}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>

        <Separator className="bg-[var(--shell-line)]" />
        <CardContent className="min-h-0 shrink-0 px-3 py-3">
          <Tabs
            value={commandTab}
            onValueChange={(value) => setCommandTab(value as "core" | "all")}
            className="flex min-h-0 flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                commands
              </p>
              <TabsList className="rounded-none border border-[color:var(--shell-border)] bg-[var(--shell-bg)]">
                <TabsTrigger
                  value="core"
                  className="rounded-none px-2 font-mono text-[9px] tracking-[0.14em] uppercase"
                >
                  Core
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="rounded-none px-2 font-mono text-[9px] tracking-[0.14em] uppercase"
                >
                  All
                </TabsTrigger>
              </TabsList>
            </div>

            {commandTab === "all" ? (
              <label className="flex items-center gap-2 border border-[color:var(--shell-border)] bg-[var(--shell-bg)] px-2">
                <Search className={cn("size-3.5 shrink-0", themeConfig.text)} />
                <Input
                  value={commandQuery}
                  onChange={(event) => setCommandQuery(event.target.value)}
                  placeholder="filter commands"
                  className="h-8 rounded-none border-0 bg-transparent px-0 font-mono text-[11px] text-slate-200 shadow-none ring-0 placeholder:text-slate-600 focus-visible:border-0 focus-visible:ring-0"
                  data-command-filter
                />
              </label>
            ) : null}

            <div
              className="max-h-[min(38svh,390px)] min-h-0 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-command-scroll
              onWheel={(event) => event.stopPropagation()}
            >
              <div className="grid gap-2">
                {visibleCommands.length ? (
                  visibleCommands.map((command) => (
                    <Button
                      key={command}
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onCommand(command)}
                      className="h-auto justify-start rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2 py-2 text-left font-mono text-[11px] whitespace-normal text-slate-300 transition hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] hover:text-[var(--shell-accent-text)]"
                    >
                      {command}
                    </Button>
                  ))
                ) : (
                  <p className="border border-[color:var(--shell-border)] bg-[var(--shell-bg)] px-2 py-2 font-mono text-[11px] text-slate-500">
                    No matching commands.
                  </p>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </aside>
  )
}

function TerminalInspector({
  clock,
  history,
  language,
  latency,
  onOpenChange,
  route,
  setLanguage,
  setTheme,
  theme,
  themeConfig,
  unlockedEggs,
  uptime,
}: {
  clock: string
  history: string[]
  language: TerminalLanguage
  latency: number
  onOpenChange: (open: boolean) => void
  route: RouteState
  setLanguage: (language: TerminalLanguage) => void
  setTheme: (theme: TerminalTheme) => void
  theme: TerminalTheme
  themeConfig: (typeof terminalThemes)[TerminalTheme]
  unlockedEggs: string[]
  uptime: number
}) {
  return (
    <aside className="min-h-0 rounded-lg lg:h-full" data-inspector-open="true">
      <Card className="h-full gap-0 rounded-lg border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100 ring-1 ring-white/10">
        <CardHeader className="px-3 py-3">
          <div className="flex items-center gap-2">
            <Activity className={cn("size-4", themeConfig.text)} />
            <CardTitle className="font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase">
              inspector
            </CardTitle>
          </div>
          <CardAction>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Close inspector"
              title="Close inspector"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] text-slate-400 hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
            >
              <ChevronRight data-icon="inline-start" />
            </Button>
          </CardAction>
        </CardHeader>
        <Separator className="bg-[var(--shell-line)]" />
        <CardContent className="min-h-0 flex-1 px-3 py-3">
          <ScrollArea className="h-full pr-2">
            <div className="grid gap-2">
              <StatusRow icon={ShieldCheck} label="route" value={route.path} />
              <StatusRow icon={Clock} label="clock" value={clock} />
              <StatusRow icon={Cpu} label="latency" value={`${latency}ms`} />
              <StatusRow
                icon={Command}
                label="language"
                value={languageLabels[language]}
              />
              <StatusRow icon={Zap} label="uptime" value={`${uptime}s`} />
              <StatusRow
                icon={Sparkles}
                label="eggs"
                value={`${unlockedEggs.length}/${eggHints.length}`}
              />
            </div>

            <Card
              size="sm"
              className="mt-4 gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
            >
              <CardHeader className="px-3">
                <CardTitle className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  theme
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <Tabs
                  value={theme}
                  onValueChange={(value) => setTheme(value as TerminalTheme)}
                >
                  <TabsList className="grid h-auto w-full grid-cols-3 rounded-none border border-[color:var(--shell-border)] bg-[var(--shell-panel)]">
                    {(["cyan", "amber", "violet"] as TerminalTheme[]).map(
                      (item) => (
                        <TabsTrigger
                          key={item}
                          value={item}
                          data-terminal-theme={item}
                          className="rounded-none px-2 py-2 font-mono text-[10px] uppercase"
                        >
                          {terminalThemes[item].label}
                        </TabsTrigger>
                      )
                    )}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card
              size="sm"
              className="mt-4 gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
            >
              <CardHeader className="px-3">
                <CardTitle className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  language
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <Tabs
                  value={language}
                  onValueChange={(value) =>
                    setLanguage(value as TerminalLanguage)
                  }
                >
                  <TabsList className="grid h-auto w-full grid-cols-3 rounded-none border border-[color:var(--shell-border)] bg-[var(--shell-panel)]">
                    {(["en", "hi", "mr"] as TerminalLanguage[]).map((item) => (
                      <TabsTrigger
                        key={item}
                        value={item}
                        className="rounded-none px-2 py-2 font-mono text-[10px] uppercase"
                      >
                        {item}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card
              size="sm"
              className="mt-4 gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
            >
              <CardHeader className="px-3">
                <CardTitle className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  recent commands
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3">
                <div className="grid gap-2">
                  {history.slice(-6).length ? (
                    history.slice(-6).map((item, index) => (
                      <p
                        key={`${item}-${index}`}
                        className="font-mono text-[11px] leading-5 break-words text-slate-300"
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
              </CardContent>
            </Card>
          </ScrollArea>
        </CardContent>
      </Card>
    </aside>
  )
}

function EntryBlock({
  entry,
  languageData,
  onNavigate,
  themeConfig,
}: {
  entry: Entry
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  themeConfig: (typeof terminalThemes)[TerminalTheme]
}) {
  return (
    <div className="mb-5 font-mono" data-terminal-entry-id={entry.id}>
      <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[0.16em]">
        <span className="text-slate-600 uppercase">{entry.time}</span>
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
            entry.variant === "system" && "text-[var(--shell-accent-text)]",
            entry.variant === "egg" && "text-yellow-100",
            !entry.variant && "text-slate-300"
          )}
        >
          {entry.lines.join("\n")}
        </pre>
      ) : null}
      {entry.content ? (
        <div className="mt-3">
          <EntryContentView
            content={entry.content}
            languageData={languageData}
            onNavigate={onNavigate}
          />
        </div>
      ) : null}
    </div>
  )
}

function EntryContentView({
  content,
  languageData,
  onNavigate,
}: {
  content: EntryContent
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
}) {
  switch (content.type) {
    case "route":
      return (
        <RouteOutput
          articleContent={content.articleContent}
          languageData={languageData}
          onNavigate={onNavigate}
          route={content.route}
        />
      )
    case "skills":
      return <SkillOutput />
    case "architecture":
      return <ArchitectureOutput />
    case "project-list":
      return (
        <ProjectList
          languageData={languageData}
          onNavigate={onNavigate}
          projects={content.projects}
          title={content.title}
        />
      )
  }
}

function RouteOutput({
  articleContent,
  languageData,
  onNavigate,
  route,
}: {
  articleContent?: ReactNode
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  route: RouteState
}) {
  switch (route.view) {
    case "about":
      return <AboutOutput languageData={languageData} />
    case "projects":
      return (
        <ProjectList
          languageData={languageData}
          onNavigate={onNavigate}
          projects={projects}
          title={languageData.projectsPage.title}
        />
      )
    case "project-detail":
      return (
        <ProjectDetailOutput
          languageData={languageData}
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
      return <ContactOutput languageData={languageData} />
    case "home":
    default:
      return <HomeOutput languageData={languageData} onNavigate={onNavigate} />
  }
}

function HomeOutput({
  languageData,
  onNavigate,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
}) {
  return (
    <TerminalSection
      icon={Rocket}
      label="home"
      title={`${languageData.hero.name} - PWSH Studio`}
    >
      <TerminalLines
        lines={[
          ...initSequence,
          `${languageData.hero.name} / ${languageData.hero.title}`,
          languageData.hero.description,
          "Use the start menu or commands to explore projects, writing, and contact.",
        ]}
      />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Metric label="projects" value={String(projects.length)} />
        <Metric label="notes" value={String(researchLogs.length)} />
        <Metric label="skills" value={String(skills.length)} />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {routeItems
          .filter((item) => item.href !== "/")
          .map((item) => (
            <Button
              key={item.href}
              type="button"
              variant="ghost"
              data-terminal-home-route={item.href}
              onClick={() => onNavigate(item.href, item.command)}
              className="h-auto justify-start rounded-md border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:text-[var(--shell-accent-text)]"
            >
              <span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  cd
                </span>
                <span className="mt-1 block font-heading text-lg text-slate-50">
                  {localizedRouteLabel(languageData, item.href, item.label)}
                </span>
              </span>
            </Button>
          ))}
      </div>
    </TerminalSection>
  )
}

function AboutOutput({ languageData }: { languageData: langtype }) {
  const aboutCopy = languageData.about

  return (
    <TerminalSection icon={UserRound} label="about" title={aboutCopy.hero.title}>
      <TerminalLines
        lines={[
          aboutCopy.hero.subtitle,
          aboutCopy.hero.description,
          `LeetCode rating: ${aboutCopy.stats.leetcodeRating}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {aboutCopy.stats.statItems.map((item) => (
          <Metric key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="mt-6">
        <TerminalSubheading>experience</TerminalSubheading>
        <div className="mt-3 grid gap-3">
          {aboutCopy.experiences.map((experience) => (
            <Card
              key={`${experience.company}-${experience.title}`}
              size="sm"
              className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
            >
              <CardHeader className="px-4">
                <CardTitle className="text-lg text-slate-50">
                  {experience.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="w-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
                >
                  {experience.company} / {experience.period}
                </Badge>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-sm leading-7 text-slate-300">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <TerminalSubheading>technical stack</TerminalSubheading>
        <div className="mt-3 flex flex-wrap gap-2">
          {aboutCopy.techSkills.map((skill) => (
            <Badge
              key={skill.name}
              variant="outline"
              className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
            >
              {skill.name} / lvl {skill.level}
            </Badge>
          ))}
        </div>
      </div>
    </TerminalSection>
  )
}

function ProjectList({
  languageData,
  onNavigate,
  projects: projectItems,
  title,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  projects: PortfolioProject[]
  title: string
}) {
  return (
    <TerminalSection icon={Archive} label="projects" title={title}>
      <TerminalLines
        lines={[
          `${projectItems.length} projects available.`,
          "Select a row to inspect its case study at /projects/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {projectItems.map((project) => {
          const localized = localizedProject(project, languageData)

          return (
            <button
              key={project.slug}
              type="button"
              data-project-slug={project.slug}
              onClick={() =>
                onNavigate(
                  `/projects/${project.slug}`,
                  `project ${project.slug}`
                )
              }
              className="grid gap-3 border border-[color:var(--shell-border)] bg-[var(--shell-bg)] p-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
            >
              <Badge
                variant="outline"
                className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] text-[var(--shell-accent-text)]"
              >
                {project.projectId}
              </Badge>
              <span className="min-w-0">
                <span className="block font-heading text-base text-slate-50">
                  {localized.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-400">
                  {localized.description}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="h-auto rounded-none border-[color:var(--shell-border)] px-1.5 py-1 font-mono text-[9px] tracking-[0.1em] text-slate-500 uppercase"
                    >
                      {item}
                    </Badge>
                  ))}
                </span>
              </span>
              <Badge
                variant="outline"
                className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase"
              >
                {project.category}
              </Badge>
            </button>
          )
        })}
      </div>
    </TerminalSection>
  )
}

function ProjectDetailOutput({
  languageData,
  onNavigate,
  project,
}: {
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  project?: PortfolioProject | null
}) {
  if (!project) {
    return (
      <TerminalSection
        icon={FolderGit2}
        label="project"
        title="Project not found"
      >
        <TerminalLines
          lines={["Use projects to inspect available case studies."]}
        />
      </TerminalSection>
    )
  }

  const localized = localizedProject(project, languageData)

  return (
    <TerminalSection
      icon={FolderGit2}
      label={project.projectId}
      title={localized.title}
    >
      <TerminalLines
        lines={[
          `Type: ${project.type}`,
          `Route: /projects/${project.slug}`,
          localized.description,
          `Role: ${project.role}`,
        ]}
      />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="category" value={project.category} />
        <Metric label="project id" value={project.projectId} />
        <Metric label="stack size" value={String(project.stack.length)} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <DetailBlock title="problem" text={project.problem} />
        <DetailBlock title="architecture" text={project.architecture} />
        <DetailBlock title="blockchain logic" text={project.blockchainLogic} />
        <DetailBlock title="database design" text={project.databaseDesign} />
        <DetailBlock title="security notes" text={project.securityNotes} />
        <DetailBlock
          title="performance notes"
          text={project.performanceNotes}
        />
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
        <Button
          type="button"
          variant="outline"
          onClick={() => onNavigate("/projects", "projects")}
          className="rounded-none border-[color:var(--shell-border-strong)] bg-[var(--shell-accent-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
        >
          back to projects
        </Button>
        {project.githubLink ? (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-[var(--shell-accent-text)]"
          >
            github
          </a>
        ) : null}
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase hover:text-[var(--shell-accent-text)]"
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
    <TerminalSection icon={BookOpen} label="blog" title="Engineering notes">
      <TerminalLines
        lines={[
          `${researchLogs.length} notes available.`,
          "Select a note to inspect it at /blog/<slug>.",
        ]}
      />
      <div className="mt-5 grid gap-2">
        {researchLogs.map((log) => (
          <button
            key={log.slug}
            type="button"
            data-log-slug={log.slug}
            onClick={() => onNavigate(`/blog/${log.slug}`, `note ${log.title}`)}
            className="grid gap-3 border border-[color:var(--shell-border)] bg-[var(--shell-bg)] p-3 text-left transition hover:border-[color:var(--shell-border-strong)] hover:bg-[var(--shell-accent-soft)] sm:grid-cols-[96px_minmax(0,1fr)_auto]"
          >
            <Badge
              variant="outline"
              className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[11px] text-[var(--shell-accent-text)]"
            >
              {log.number}
            </Badge>
            <span>
              <span className="block font-heading text-base text-slate-50">
                {log.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">
                {log.excerpt}
              </span>
            </span>
            <Badge
              variant="outline"
              className="h-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase"
            >
              {log.readingTime}
            </Badge>
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
      <TerminalSection
        icon={BookOpen}
        label="note"
        title="Engineering note not found"
      >
        <TerminalLines lines={["Use blog to inspect available notes."]} />
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
          <Badge
            key={tag}
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Card
        size="sm"
        className="mt-6 gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
      >
        <CardContent className="px-4">
          <TerminalSubheading>reading view</TerminalSubheading>
          <div className="mt-2 max-w-none font-sans">{articleContent}</div>
        </CardContent>
      </Card>
      <Button
        type="button"
        variant="outline"
        onClick={() => onNavigate("/blog", "blog")}
        className="mt-5 rounded-none border-[color:var(--shell-border-strong)] bg-[var(--shell-accent-soft)] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
      >
        back to notes
      </Button>
    </TerminalSection>
  )
}

function ContactOutput({ languageData }: { languageData: langtype }) {
  return (
    <TerminalSection
      icon={Send}
      label="contact"
      title={languageData.contact.form.title}
    >
      <TerminalLines
        lines={[
          "Path: Browser -> API -> Mail Service -> Developer Inbox.",
          languageData.contact.thoughtText,
        ]}
      />
      <div className="mt-5">
        <TerminalContactForm languageData={languageData} />
      </div>
    </TerminalSection>
  )
}

function SkillOutput() {
  return (
    <TerminalSection icon={Code2} label="skills" title="Stack map">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {skill}
          </Badge>
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
          <Card
            key={layer.id}
            size="sm"
            className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
          >
            <CardHeader className="px-4">
              <CardTitle className="text-lg text-slate-50">
                {layer.label}
              </CardTitle>
              <Badge
                variant="outline"
                className="w-fit rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.14em] text-[var(--shell-accent-text)] uppercase"
              >
                {layer.category} / {layer.flow.join(" -> ")}
              </Badge>
            </CardHeader>
            <CardContent className="px-4">
              <p className="text-sm leading-7 text-slate-300">{layer.role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.stacks.map((stack) => (
                  <Badge
                    key={stack}
                    variant="outline"
                    className="h-auto rounded-none border-[color:var(--shell-border)] px-2 py-1 font-mono text-[10px] text-slate-400"
                  >
                    {stack}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
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
    <Card className="gap-0 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100">
      <CardHeader className="px-4 py-4 sm:px-5">
        <div>
          <Badge
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase"
          >
            {label}
          </Badge>
          <CardTitle className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
            {title}
          </CardTitle>
        </div>
        <CardAction>
          <Icon className="size-5 text-[var(--shell-accent-text)]" />
        </CardAction>
      </CardHeader>
      <Separator className="bg-[var(--shell-line)]" />
      <CardContent className="px-4 py-5 sm:px-5">{children}</CardContent>
    </Card>
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
    <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase">
      {children}
    </p>
  )
}

function DetailBlock({ text, title }: { text: string; title: string }) {
  return (
    <Card
      size="sm"
      className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
    >
      <CardHeader className="px-4">
        <TerminalSubheading>{title}</TerminalSubheading>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm leading-7 text-slate-300">{text}</p>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card
      size="sm"
      className="gap-1 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
    >
      <CardContent className="px-3">
        <p className="font-heading text-2xl font-semibold text-slate-50">
          {value}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
          {label}
        </p>
      </CardContent>
    </Card>
  )
}

function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <Card
      size="sm"
      className="hidden gap-0 rounded-none border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-2 font-mono sm:block"
    >
      <CardContent className="px-3">
        <p className="text-[9px] tracking-[0.16em] text-slate-600 uppercase">
          {label}
        </p>
        <p className="mt-1 text-[11px] text-[var(--shell-accent-text)]">
          {value}
        </p>
      </CardContent>
    </Card>
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
    <Card
      size="sm"
      className="gap-0 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
    >
      <CardContent className="flex items-center justify-between gap-3 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0 text-[var(--shell-accent-text)]" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
            {label}
          </span>
        </div>
        <Badge
          variant="outline"
          className="min-w-0 truncate rounded-none border-[color:var(--shell-border)] text-right font-mono text-[11px] text-slate-200"
        >
          {value}
        </Badge>
      </CardContent>
    </Card>
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

function PwshLabPanel() {
  return (
    <div className="mt-5 border border-violet-300/30 bg-violet-400/10 p-4">
      <p className="font-mono text-xs tracking-[0.18em] text-violet-100 uppercase">
        PWSH Labs
      </p>
      <p className="mt-3 leading-7 text-slate-300">
        Experimental workspace for protocol visualizers, PowerShell-inspired
        navigation, blockchain indexer observability, and system telemetry that
        makes state visible.
      </p>
    </div>
  )
}
