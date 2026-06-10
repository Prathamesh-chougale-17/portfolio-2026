import {
  architectureLayers,
  profile,
  projects,
  researchLogs,
} from "@/data/event-horizon"
import type { langtype } from "@/types/lang"

import {
  architectureMap,
  commandIndexLines,
  notesJson,
  processLines,
  profileJson,
  projectsJson,
  searchWorkspace,
  workspaceTree,
  workspaceTreeGraph,
} from "./command-output"
import { commandList, eggHints } from "./constants"
import { languageLabels, resolveLanguage } from "./i18n"
import {
  findProject,
  findResearchLog,
  resolveLocationTarget,
  resolveNaturalRouteCommand,
} from "./routes"
import type {
  Entry,
  RouteState,
  TerminalLanguage,
  TerminalTheme,
} from "./types"

type TerminalCommandContext = {
  appendEntry: (entry: Omit<Entry, "id" | "time">) => void
  applyLanguage: (language: TerminalLanguage) => void
  applyTheme: (theme: TerminalTheme) => void
  clearHistory: () => void
  clearTerminal: () => void
  history: string[]
  language: TerminalLanguage
  languageData: langtype
  latency: number
  navigateTo: (
    path: string,
    command?: string,
    options?: { recordHistory?: boolean }
  ) => void
  recordCommand: (command: string) => void
  routeState: RouteState
  setMatrixMode: (enabled: boolean) => void
  setWorkbenchOpen: (open: boolean) => void
  theme: TerminalTheme
  unlockedEggs: string[]
  unlockEgg: (name: string) => void
  uptime: number
}

export function runTerminalCommand(
  rawCommand: string,
  context: TerminalCommandContext
) {
  const {
    appendEntry,
    applyLanguage,
    applyTheme,
    clearHistory,
    clearTerminal,
    history,
    language,
    languageData,
    latency,
    navigateTo,
    recordCommand,
    routeState,
    setMatrixMode,
    setWorkbenchOpen,
    theme,
    unlockedEggs,
    unlockEgg,
    uptime,
  } = context

  const command = rawCommand.trim()
  if (!command) return

  recordCommand(command)

  const normalized = command.toLowerCase()
  const naturalRoute = resolveNaturalRouteCommand(command)

  if (naturalRoute) {
    navigateTo(naturalRoute, command, { recordHistory: false })
    return
  }

  if (normalized === "home") {
    navigateTo("/", command, { recordHistory: false })
    return
  }

  if (normalized === "about") {
    navigateTo("/about", command, { recordHistory: false })
    return
  }

  if (normalized === "projects" || normalized === "project") {
    navigateTo("/projects", command, { recordHistory: false })
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
    navigateTo(`/projects/${project.slug}`, command, { recordHistory: false })
    return
  }

  if (
    normalized === "blog" ||
    normalized === "logs" ||
    normalized === "notes"
  ) {
    navigateTo("/blog", command, { recordHistory: false })
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
    navigateTo(`/blog/${log.slug}`, command, { recordHistory: false })
    return
  }

  if (normalized === "contact") {
    navigateTo("/contact", command, { recordHistory: false })
    return
  }

  if (/^(cd|set-location|sl)(\s|$)/i.test(command)) {
    const target = command.replace(/^(cd|set-location|sl)\s*/i, "")
    navigateTo(resolveLocationTarget(target, routeState.path), command, {
      recordHistory: false,
    })
    return
  }

  if (normalized.startsWith("open ")) {
    navigateTo(command.replace(/^open\s+/i, ""), command, {
      recordHistory: false,
    })
    return
  }

  if (normalized.startsWith("theme ") || normalized.startsWith("set-theme ")) {
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
      clearHistory()
      appendEntry({
        command,
        lines: ["Command history cleared."],
        variant: "success",
      })
      return
    case "clear":
    case "cls":
    case "clear-host":
      clearTerminal()
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
