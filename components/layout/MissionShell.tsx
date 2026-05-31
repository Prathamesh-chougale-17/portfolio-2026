"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

import { Terminal } from "@/components/hud/Terminal"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { PageTransition } from "@/components/layout/PageTransition"

gsap.registerPlugin(ScrollTrigger)

export function MissionShell({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.15,
      prevent: (node) =>
        node instanceof HTMLElement &&
        Boolean(node.closest("[data-lenis-prevent]")),
    })

    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(
            "[data-cinematic], section:not(:first-of-type), article"
          )
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              {
                autoAlpha: 0,
                y: 54,
                filter: "blur(10px)",
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.95,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 86%",
                  end: "bottom 18%",
                  toggleActions: "play none none reverse",
                  refreshPriority: index,
                },
              }
            )
          })

        gsap.utils
          .toArray<HTMLElement>("[data-parallax-depth]")
          .forEach((element) => {
            const depth = Number(element.dataset.parallaxDepth ?? "24")
            gsap.to(element, {
              y: depth,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            })
          })
      })

      return () => context.revert()
    })

    return () => {
      mm.revert()
      gsap.ticker.remove(tick)
      lenis.off("scroll", ScrollTrigger.update)
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
