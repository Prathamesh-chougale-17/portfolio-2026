import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact - Terminal Transmission",
  description:
    "Send a terminal-native transmission for collaborations, backend systems, blockchain products, or ambitious digital experiences.",
  path: "/contact",
})

export default function ContactPage() {
  return <TerminalPortfolioApp initialView="contact" />
}
