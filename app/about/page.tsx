import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { profile } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About - PWSH Profile",
  description: profile.secondaryCopy,
  path: "/about",
})

export default function AboutPage() {
  return <TerminalPortfolioApp initialView="about" />
}
