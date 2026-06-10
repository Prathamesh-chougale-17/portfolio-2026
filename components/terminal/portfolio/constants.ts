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

export const allCommandShortcuts = commandList.map((command) =>
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
