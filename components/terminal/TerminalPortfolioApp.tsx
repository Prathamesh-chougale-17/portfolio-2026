"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  type FormEvent,
  type KeyboardEvent,
  type WheelEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { TerminalSquare } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { getProject, getResearchLog } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

import { getTerminalSuggestions, INITIAL_STAMP } from "./portfolio/constants"
import { runTerminalCommand } from "./portfolio/command-runner"
import {
  isTerminalLanguage,
  languagePacks,
  storeTerminalLanguage,
} from "./portfolio/i18n"
import {
  initialEntries,
  isValidRoute,
  normalizeRoute,
  resolveRoute,
} from "./portfolio/routes"
import { terminalPreferences, terminalSession } from "./portfolio/session"
import { entryId, stamp } from "./portfolio/shell-utils"
import {
  LANGUAGE_STORAGE_KEY,
  PENDING_COMMAND_KEY,
  SIDEBAR_STORAGE_KEY,
  THEME_STORAGE_KEY,
  storeSidebarOpen,
} from "./portfolio/storage"
import {
  isTerminalTheme,
  storeTerminalTheme,
  terminalThemes,
} from "./portfolio/theme"
import { EntryBlock } from "./portfolio/TerminalEntry"
import { TerminalHeader } from "./portfolio/TerminalHeader"
import { TerminalInspector } from "./portfolio/TerminalInspector"
import { MatrixTelemetry, PwshLabPanel } from "./portfolio/TerminalPrimitives"
import { TerminalQuickAccess } from "./portfolio/TerminalQuickAccess"
import type {
  Entry,
  TerminalLanguage,
  TerminalPortfolioAppProps,
  TerminalTheme,
} from "./portfolio/types"

export type { TerminalView } from "./portfolio/types"

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
  const [history, setHistory] = useState<string[]>(
    () => terminalSession.history
  )
  const [, setHistoryIndex] = useState<number | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(
    () => terminalPreferences.inspectorOpen
  )
  const [sidebarOpen, setSidebarOpen] = useState(
    () => terminalPreferences.sidebarOpen
  )
  const [theme, setTheme] = useState<TerminalTheme>(
    () => terminalPreferences.theme
  )
  const [language, setLanguage] = useState<TerminalLanguage>(
    () => terminalPreferences.language
  )
  const [matrixMode, setMatrixMode] = useState(() => terminalSession.matrixMode)
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
          terminalPreferences.theme = storedTheme
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
          terminalPreferences.language = storedLanguage
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
          terminalPreferences.sidebarOpen = nextValue
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
          terminalPreferences.sidebarOpen = nextValue
          storeSidebarOpen(nextValue)
          return nextValue
        })
      }

      if (key === "i") {
        event.preventDefault()
        setInspectorOpen((current) => {
          const nextValue = !current
          terminalPreferences.inspectorOpen = nextValue
          return nextValue
        })
      }
    }

    window.addEventListener("keydown", onWindowKeyDown)
    return () => window.removeEventListener("keydown", onWindowKeyDown)
  }, [])

  function recordCommand(command: string) {
    const value = command.trim()
    if (!value) return

    const nextHistory = [...terminalSession.history, value]
    terminalSession.history = nextHistory
    setHistory(nextHistory)
    setHistoryIndex(null)
  }

  function applyTheme(
    nextTheme: TerminalTheme,
    options: { recordHistory?: boolean } = {}
  ) {
    const changed = terminalPreferences.theme !== nextTheme
    terminalPreferences.theme = nextTheme
    setTheme(nextTheme)
    storeTerminalTheme(nextTheme)

    if (options.recordHistory && changed) {
      recordCommand(`theme ${nextTheme}`)
    }
  }

  function applyLanguage(
    nextLanguage: TerminalLanguage,
    options: { recordHistory?: boolean } = {}
  ) {
    const changed = terminalPreferences.language !== nextLanguage
    terminalPreferences.language = nextLanguage
    terminalSession.language = nextLanguage
    setLanguage(nextLanguage)
    storeTerminalLanguage(nextLanguage)

    if (options.recordHistory && changed) {
      recordCommand(`lang ${nextLanguage}`)
    }
  }

  function applySidebarOpen(nextValue: boolean) {
    terminalPreferences.sidebarOpen = nextValue
    setSidebarOpen(nextValue)
    storeSidebarOpen(nextValue)
  }

  function applyInspectorOpen(nextValue: boolean) {
    terminalPreferences.inspectorOpen = nextValue
    setInspectorOpen(nextValue)
  }

  function navigateTo(
    path: string,
    command = `cd ${path}`,
    options: { recordHistory?: boolean } = {}
  ) {
    if (options.recordHistory ?? true) {
      recordCommand(command)
    }

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
    if (
      terminalSession.hasStarted &&
      terminalSession.lastRouteKey !== routeKey
    ) {
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
    const command = pending ?? routeState.command
    terminalSession.lastRouteKey = routeKey
    window.setTimeout(() => {
      if (!pending) {
        recordCommand(command)
      }
      appendEntry({
        command,
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
    return getTerminalSuggestions(input)
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
    runTerminalCommand(rawCommand, {
      appendEntry,
      applyLanguage,
      applyTheme,
      clearHistory: () => setHistory([]),
      clearTerminal: () => {
        terminalSession.pendingScrollEntryId = undefined
        terminalSession.shouldPrimeOutputToEnd = false
        terminalSession.entries = []
        setEntries([])
        terminalSession.matrixMode = false
        setMatrixMode(false)
        terminalSession.workbenchOpen = false
        setWorkbenchOpen(false)
      },
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
    })
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
      const match = getTerminalSuggestions(input, 1)[0]
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
