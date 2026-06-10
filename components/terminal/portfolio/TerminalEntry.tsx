import { cn } from "@/lib/utils"
import type { langtype } from "@/types/lang"

import {
  ArchitectureOutput,
  ProjectList,
  RouteOutput,
  SkillOutput,
} from "./TerminalOutputs"
import type { Entry, EntryContent, ShellThemeConfig } from "./types"

export function EntryBlock({
  entry,
  languageData,
  onNavigate,
  themeConfig,
}: {
  entry: Entry
  languageData: langtype
  onNavigate: (path: string, command?: string) => void
  themeConfig: ShellThemeConfig
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

export function EntryContentView({
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
