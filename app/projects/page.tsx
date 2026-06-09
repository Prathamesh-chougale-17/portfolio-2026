import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { projects } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Projects - Terminal Mission Index",
  description: `${projects.length} projects rendered as a terminal mission index for backend, blockchain, frontend, full-stack, and experimental systems.`,
  path: "/projects",
})

export default function ProjectsPage() {
  return <TerminalPortfolioApp initialView="projects" />
}
