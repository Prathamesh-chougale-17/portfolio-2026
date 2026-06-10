import type {
  TerminalLanguage,
  TerminalSessionState,
  TerminalTheme,
} from "./types"

export const terminalPreferences: {
  inspectorOpen: boolean
  language: TerminalLanguage
  sidebarOpen: boolean
  theme: TerminalTheme
} = {
  inspectorOpen: false,
  language: "en",
  sidebarOpen: true,
  theme: "cyan",
}

export const terminalSession: TerminalSessionState = {
  entries: [],
  hasStarted: false,
  history: [],
  language: "en",
  matrixMode: false,
  shouldPrimeOutputToEnd: false,
  unlockedEggs: [],
  uptime: 0,
  workbenchOpen: false,
}
