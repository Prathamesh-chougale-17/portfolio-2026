import { Activity, Command } from "lucide-react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  profile,
  type PortfolioProject,
  type ResearchLog,
} from "@/data/event-horizon"
import { cn } from "@/lib/utils"
import type { langtype } from "@/types/lang"

import { localizedProject } from "./i18n"
import { Telemetry } from "./TerminalPrimitives"
import type { RouteState, ShellThemeConfig } from "./types"

export function TerminalHeader({
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
  themeConfig: ShellThemeConfig
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
