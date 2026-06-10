import type { ReactNode } from "react"

import {
  getProject,
  getResearchLog,
  projects,
  researchLogs,
} from "@/data/event-horizon"

import type { Entry, RouteState, TerminalView } from "./types"

export function routeEntry(
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

export function initialEntries(route: RouteState, articleContent?: ReactNode) {
  return [routeEntry(route, articleContent)]
}

export function normalizeRoute(path: string) {
  const value = path.trim() || "/"
  if (value === "/project") return "/projects"
  if (value.startsWith("/project/")) {
    return value.replace(/^\/project\//, "/projects/")
  }
  return value
}

export function resolveRoute(
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

export function isValidRoute(path: string) {
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

export function findProject(query: string) {
  const normalized = query.trim().toLowerCase()
  return projects.find(
    (project) =>
      project.slug === normalized ||
      project.title.toLowerCase() === normalized ||
      project.title.toLowerCase().includes(normalized)
  )
}

export function findResearchLog(query: string) {
  const normalized = query.trim().toLowerCase()
  return researchLogs.find(
    (log) =>
      log.slug === normalized ||
      log.title.toLowerCase() === normalized ||
      log.title.toLowerCase().includes(normalized) ||
      log.number.toLowerCase() === normalized
  )
}

export function resolveLocationTarget(rawTarget: string, currentPath: string) {
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

export function resolveNaturalRouteCommand(command: string) {
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
