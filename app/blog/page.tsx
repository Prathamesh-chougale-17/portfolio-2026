import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { researchLogs } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Research Logs - Terminal Archive",
  description: `${researchLogs.length} terminal-rendered research logs on backend architecture, blockchain systems, frontend experiments, and product engineering.`,
  path: "/blog",
})

export default function BlogPage() {
  return <TerminalPortfolioApp initialView="blog" />
}
