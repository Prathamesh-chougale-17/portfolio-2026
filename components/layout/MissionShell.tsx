"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"

import { Terminal } from "@/components/hud/Terminal"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { PageTransition } from "@/components/layout/PageTransition"

export function MissionShell({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
    })

    let frame = 0
    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }

      if (event.key === "`") {
        setTerminalOpen((value) => !value)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="relative min-h-svh overflow-x-clip">
      <a
        href="#mission-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-cyan-300 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip intro
      </a>
      <div className="star-noise pointer-events-none fixed inset-0 z-0 opacity-35" />
      <div className="hud-grid pointer-events-none fixed inset-0 z-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)] opacity-45" />
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <PageTransition />
      <main id="mission-content" className="relative z-10">
        {children}
      </main>
      <Footer />
      <Terminal open={terminalOpen} onOpenChange={setTerminalOpen} />
    </div>
  )
}
