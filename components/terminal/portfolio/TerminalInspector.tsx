import {
  Activity,
  ChevronRight,
  Clock,
  Command,
  Cpu,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { eggHints } from "./constants"
import { languageLabels } from "./i18n"
import { terminalThemes } from "./theme"
import { StatusRow } from "./TerminalPrimitives"
import type {
  RouteState,
  ShellThemeConfig,
  TerminalLanguage,
  TerminalTheme,
} from "./types"

export function TerminalInspector({
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
  setLanguage: (
    language: TerminalLanguage,
    options?: { recordHistory?: boolean }
  ) => void
  setTheme: (
    theme: TerminalTheme,
    options?: { recordHistory?: boolean }
  ) => void
  theme: TerminalTheme
  themeConfig: ShellThemeConfig
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
                  onValueChange={(value) =>
                    setTheme(value as TerminalTheme, { recordHistory: true })
                  }
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
                    setLanguage(value as TerminalLanguage, {
                      recordHistory: true,
                    })
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
