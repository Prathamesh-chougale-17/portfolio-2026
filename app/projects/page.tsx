import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { projects } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Projects - PWSH Studio",
  description: `${projects.length} project case studies across backend, blockchain, frontend, full-stack, and experimental systems.`,
  path: "/projects",
})

export default function ProjectsPage() {
  return <TerminalPortfolioApp initialView="projects" />
}
