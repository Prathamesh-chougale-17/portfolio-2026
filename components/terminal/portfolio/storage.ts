import type { TerminalLanguage, TerminalTheme } from "./types"

export const PENDING_COMMAND_KEY = "pwsh-studio-pending-command"
export const LANGUAGE_STORAGE_KEY = "pwsh-studio-language"
export const SIDEBAR_STORAGE_KEY = "pwsh-studio-sidebar-open"
export const THEME_STORAGE_KEY = "pwsh-studio-theme"

export function storeTerminalTheme(value: TerminalTheme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value)
  } catch {
    // Theme persistence is a preference; the terminal still works without it.
  }
}

export function storeTerminalLanguage(value: TerminalLanguage) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value)
  } catch {
    // Language persistence is a preference; English remains the fallback.
  }
}

export function storeSidebarOpen(value: boolean) {
  try {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value))
  } catch {
    // Sidebar persistence is a preference; the terminal still works without it.
  }
}
