import type { Metadata } from "next"
import { DM_Sans, Geist_Mono, Space_Grotesk } from "next/font/google"

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
  metadataBase: new URL("https://pwsh-studio.local"),
  title: {
    default:
      "PWSH Studio - Prathamesh Chougale, Backend & Blockchain Developer",
    template: "%s | PWSH Studio",
  },
  description:
    "A PowerShell-inspired developer workspace for Prathamesh Chougale: backend systems, blockchain products, and polished web experiences.",
  keywords: [
    profile.name,
    "backend developer",
    "blockchain developer",
    "full-stack developer",
    "Next.js developer workspace",
    "PWSH Studio",
    "PowerShell-inspired developer workspace",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "PWSH Studio",
    description: profile.tagline,
    type: "website",
    siteName: "PWSH Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PWSH Studio",
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
      data-scroll-behavior="smooth"
      className={cn(
        "dark antialiased",
        sansFont.variable,
        headingFont.variable,
        monoFont.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
