import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title:
    "Event Horizon Terminal - Backend, Blockchain & Full-Stack Developer Portfolio",
  description:
    "A terminal-first portfolio app for backend systems, blockchain protocols, and full-stack product architecture.",
  path: "/",
})

export default function HomePage() {
  return <TerminalPortfolioApp initialView="home" />
}
