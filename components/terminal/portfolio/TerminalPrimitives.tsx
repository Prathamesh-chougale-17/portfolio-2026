import type { ComponentType, ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { matrixLines } from "./constants"

export function TerminalSection({
  children,
  icon: Icon,
  label,
  title,
}: {
  children: ReactNode
  icon: ComponentType<{ className?: string }>
  label: string
  title: string
}) {
  return (
    <Card className="gap-0 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-panel)] py-0 text-slate-100">
      <CardHeader className="px-4 py-4 sm:px-5">
        <div>
          <Badge
            variant="outline"
            className="h-auto rounded-none border-[color:var(--shell-border)] font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase"
          >
            {label}
          </Badge>
          <CardTitle className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
            {title}
          </CardTitle>
        </div>
        <CardAction>
          <Icon className="size-5 text-[var(--shell-accent-text)]" />
        </CardAction>
      </CardHeader>
      <Separator className="bg-[var(--shell-line)]" />
      <CardContent className="px-4 py-5 sm:px-5">{children}</CardContent>
    </Card>
  )
}

export function TerminalLines({ lines }: { lines: string[] }) {
  return (
    <pre className="font-mono text-sm leading-7 break-words whitespace-pre-wrap text-slate-300">
      {lines.join("\n")}
    </pre>
  )
}

export function TerminalSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--shell-accent-text)] uppercase">
      {children}
    </p>
  )
}

export function DetailBlock({ text, title }: { text: string; title: string }) {
  return (
    <Card
      size="sm"
      className="gap-3 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-4"
    >
      <CardHeader className="px-4">
        <TerminalSubheading>{title}</TerminalSubheading>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm leading-7 text-slate-300">{text}</p>
      </CardContent>
    </Card>
  )
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card
      size="sm"
      className="gap-1 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
    >
      <CardContent className="px-3">
        <p className="font-heading text-2xl font-semibold text-slate-50">
          {value}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate-500 uppercase">
          {label}
        </p>
      </CardContent>
    </Card>
  )
}

export function Telemetry({ label, value }: { label: string; value: string }) {
  return (
    <Card
      size="sm"
      className="hidden gap-0 rounded-none border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-2 font-mono sm:block"
    >
      <CardContent className="px-3">
        <p className="text-[9px] tracking-[0.16em] text-slate-600 uppercase">
          {label}
        </p>
        <p className="mt-1 text-[11px] text-[var(--shell-accent-text)]">
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

export function StatusRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <Card
      size="sm"
      className="gap-0 rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-3"
    >
      <CardContent className="flex items-center justify-between gap-3 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0 text-[var(--shell-accent-text)]" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
            {label}
          </span>
        </div>
        <Badge
          variant="outline"
          className="min-w-0 truncate rounded-none border-[color:var(--shell-border)] text-right font-mono text-[11px] text-slate-200"
        >
          {value}
        </Badge>
      </CardContent>
    </Card>
  )
}

export function MatrixTelemetry() {
  return (
    <div className="mt-5 grid gap-2 border border-emerald-300/25 bg-emerald-300/[0.055] p-4">
      {matrixLines.map((line, index) => (
        <p
          key={line}
          className="font-mono text-[11px] tracking-[0.16em] text-emerald-100 uppercase"
          style={{ opacity: 1 - index * 0.13 }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

export function PwshLabPanel() {
  return (
    <div className="mt-5 border border-violet-300/30 bg-violet-400/10 p-4">
      <p className="font-mono text-xs tracking-[0.18em] text-violet-100 uppercase">
        PWSH Labs
      </p>
      <p className="mt-3 leading-7 text-slate-300">
        Experimental workspace for protocol visualizers, PowerShell-inspired
        navigation, blockchain indexer observability, and system telemetry that
        makes state visible.
      </p>
    </div>
  )
}
