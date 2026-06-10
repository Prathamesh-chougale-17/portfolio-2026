import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Network, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { langtype } from "@/types/lang"

import { allCommandShortcuts, coreCommands, routeItems } from "./constants"
import { localizedRouteLabel } from "./i18n"
import type { ShellThemeConfig } from "./types"

export function TerminalQuickAccess({
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
  themeConfig: ShellThemeConfig
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
              className="max-h-[min(38svh,390px)] min-h-0 [scrollbar-width:none] overflow-y-auto overscroll-contain pr-2 [&::-webkit-scrollbar]:hidden"
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
