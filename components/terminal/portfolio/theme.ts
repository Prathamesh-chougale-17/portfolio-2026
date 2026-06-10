import { THEME_STORAGE_KEY } from "./storage"
import type { ShellThemeConfig, TerminalTheme } from "./types"

export const terminalThemes: Record<TerminalTheme, ShellThemeConfig> = {
  cyan: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Cyan",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#050505",
      "--shell-bg": "#0c0c0c",
      "--shell-bg-elevated": "#111111",
      "--shell-panel": "#141414",
      "--shell-panel-soft": "#191919",
      "--shell-muted": "#9ca3af",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(34 211 238 / 0.58)",
      "--shell-accent": "rgb(34 211 238)",
      "--shell-accent-text": "rgb(165 243 252)",
      "--shell-accent-soft": "rgb(34 211 238 / 0.13)",
      "--shell-glow":
        "0 0 0 1px rgb(34 211 238 / 0.16), 0 24px 80px rgb(34 211 238 / 0.10)",
    },
  },
  amber: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Amber",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#060504",
      "--shell-bg": "#0f0d08",
      "--shell-bg-elevated": "#151108",
      "--shell-panel": "#181309",
      "--shell-panel-soft": "#20180b",
      "--shell-muted": "#a8a29e",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(250 204 21 / 0.58)",
      "--shell-accent": "rgb(250 204 21)",
      "--shell-accent-text": "rgb(254 240 138)",
      "--shell-accent-soft": "rgb(250 204 21 / 0.14)",
      "--shell-glow":
        "0 0 0 1px rgb(250 204 21 / 0.16), 0 24px 80px rgb(250 204 21 / 0.10)",
    },
  },
  violet: {
    accent:
      "border-[color:var(--shell-accent)] bg-[var(--shell-accent)] text-black",
    border: "border-[color:var(--shell-border-strong)]",
    glow: "shadow-[var(--shell-glow)]",
    label: "Violet",
    marker: "bg-[var(--shell-accent)]",
    soft: "bg-[var(--shell-accent-soft)] text-[var(--shell-accent-text)]",
    text: "text-[var(--shell-accent-text)]",
    vars: {
      "--shell-page": "#05040a",
      "--shell-bg": "#0d0b14",
      "--shell-bg-elevated": "#131020",
      "--shell-panel": "#171225",
      "--shell-panel-soft": "#1d1730",
      "--shell-muted": "#a1a1aa",
      "--shell-line": "rgb(255 255 255 / 0.10)",
      "--shell-border": "rgb(255 255 255 / 0.12)",
      "--shell-border-strong": "rgb(196 181 253 / 0.60)",
      "--shell-accent": "rgb(196 181 253)",
      "--shell-accent-text": "rgb(221 214 254)",
      "--shell-accent-soft": "rgb(196 181 253 / 0.15)",
      "--shell-glow":
        "0 0 0 1px rgb(196 181 253 / 0.18), 0 24px 80px rgb(167 139 250 / 0.12)",
    },
  },
}

export function isTerminalTheme(value: string | null): value is TerminalTheme {
  return value === "cyan" || value === "amber" || value === "violet"
}

export function storeTerminalTheme(value: TerminalTheme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // Theme persistence is a preference; the terminal still works without it.
  }
}
