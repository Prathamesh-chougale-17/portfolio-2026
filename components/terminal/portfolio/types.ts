import type { ComponentType, CSSProperties, ReactNode } from "react"

import type { PortfolioProject } from "@/data/event-horizon"

export type TerminalView =
  | "home"
  | "about"
  | "projects"
  | "project-detail"
  | "blog"
  | "blog-detail"
  | "contact"

export type TerminalPortfolioAppProps = {
  initialView: TerminalView
  selectedSlug?: string
  articleContent?: ReactNode
}

export type EntryContent =
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

export type Entry = {
  id: string
  command?: string
  content?: EntryContent
  lines?: string[]
  time: string
  variant?: "system" | "error" | "success" | "egg"
}

export type RouteState = {
  command: string
  label: string
  path: string
  selectedSlug?: string
  view: TerminalView
}

export type TerminalTheme = "cyan" | "amber" | "violet"
export type TerminalLanguage = "en" | "hi" | "mr"

export type TerminalSessionState = {
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

export type ShellThemeConfig = {
  accent: string
  border: string
  glow: string
  label: string
  marker: string
  soft: string
  text: string
  vars: CSSProperties & Record<`--shell-${string}`, string>
}

export type RouteItem = {
  command: string
  href: string
  icon: ComponentType<{ className?: string }>
  label: string
  meta: string
}
