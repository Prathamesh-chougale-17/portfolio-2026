import { en } from "@/data/en"
import { hi } from "@/data/hi"
import { mr } from "@/data/mr"
import { projects, type PortfolioProject } from "@/data/event-horizon"
import type { langtype } from "@/types/lang"

import { LANGUAGE_STORAGE_KEY } from "./storage"
import type { TerminalLanguage } from "./types"

export const languagePacks: Record<TerminalLanguage, langtype> = { en, hi, mr }

export const languageLabels: Record<TerminalLanguage, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
}

export function isTerminalLanguage(
  value: string | null
): value is TerminalLanguage {
  return value === "en" || value === "hi" || value === "mr"
}

export function resolveLanguage(value: string) {
  const normalized = value.trim().toLowerCase()
  const aliases: Record<string, TerminalLanguage> = {
    en: "en",
    english: "en",
    hi: "hi",
    hindi: "hi",
    mr: "mr",
    marathi: "mr",
  }

  return aliases[normalized] ?? null
}

export function storeTerminalLanguage(value: TerminalLanguage) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value)
  } catch {
    // Language persistence is a preference; English remains the fallback.
  }
}

export function localizedRouteLabel(
  languageData: langtype,
  href: string,
  fallback: string
) {
  return (
    languageData.navItems.find((item) => item.href === href)?.title ?? fallback
  )
}

export function localizedProject(
  project: PortfolioProject,
  languageData: langtype
) {
  const index = projects.findIndex((item) => item.slug === project.slug)
  const localized = index >= 0 ? languageData.projects[index] : undefined

  return {
    description: localized?.description ?? project.description,
    title: localized?.title ?? project.title,
  }
}
