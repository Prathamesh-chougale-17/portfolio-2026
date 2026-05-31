import type { Metadata } from "next"
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google"

import { MissionShell } from "@/components/layout/MissionShell"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

import "./globals.css"

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://event-horizon-os.local"),
  title: {
    default:
      "Event Horizon OS - Backend, Blockchain & Full-Stack Developer Portfolio",
    template: "%s | Event Horizon OS",
  },
  description:
    "A cinematic mission-control portfolio for Prathamesh Chougale, a backend-first full-stack and blockchain developer.",
  keywords: [
    profile.name,
    "backend developer",
    "blockchain developer",
    "full-stack developer",
    "Next.js portfolio",
    "Event Horizon OS",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Event Horizon OS",
    description: profile.tagline,
    type: "website",
    siteName: "Event Horizon OS",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Horizon OS",
    description: profile.tagline,
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        sansFont.variable,
        headingFont.variable,
        monoFont.variable
      )}
    >
      <body>
        <ThemeProvider>
          <MissionShell>{children}</MissionShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
