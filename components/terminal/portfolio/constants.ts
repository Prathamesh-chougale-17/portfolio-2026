import { Archive, BookOpen, Home, Mail, UserRound } from "lucide-react"

import { projects, researchLogs } from "@/data/event-horizon"

import type { RouteItem } from "./types"

export const INITIAL_STAMP = "--:--:--"

export const routeItems: RouteItem[] = [
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

export const coreCommands = [
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

export const commandList = [
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

const projectSlugCommands = projects.flatMap((project) => [
  `project ${project.slug}`,
  `cd /projects/${project.slug}`,
])

const blogSlugCommands = researchLogs.flatMap((log) => [
  `blog ${log.slug}`,
  `note ${log.slug}`,
  `cd /blog/${log.slug}`,
])

const dynamicRouteCommands = [...projectSlugCommands, ...blogSlugCommands]

const exampleCommandShortcuts = commandList.map((command) =>
  command === "project "
    ? (dynamicRouteCommands.find((item) => item.startsWith("project ")) ??
      "project oorja-ai")
    : command === "note "
      ? (dynamicRouteCommands.find((item) => item.startsWith("note ")) ??
        "note production reliability")
      : command === "grep "
        ? "grep backend"
        : command === "find "
          ? "find projects -name backend"
          : command
)

export const terminalSuggestionCommands = Array.from(
  new Set([...commandList, ...dynamicRouteCommands])
)

export const allCommandShortcuts = Array.from(
  new Set([...exampleCommandShortcuts, ...dynamicRouteCommands])
)

export function getTerminalSuggestions(input: string, limit = 5) {
  const value = input.trimStart().toLowerCase()

  if (!value.trim()) {
    return []
  }

  return terminalSuggestionCommands
    .filter((command) => command.toLowerCase().startsWith(value))
    .filter(
      (command) => command.toLowerCase() !== value || !value.endsWith(" ")
    )
    .slice(0, limit)
}

export const eggHints = [
  "xdg-open workbench",
  "./matrix",
  "make coffee",
  "base64 -d state.txt",
  "sudo ./ship-it",
]

export const matrixLines = [
  "0110 api auth cache queue indexer",
  "1011 wallet signature contract event",
  "0101 postgres redis prisma graph",
  "1110 docker ci deploy telemetry",
]
