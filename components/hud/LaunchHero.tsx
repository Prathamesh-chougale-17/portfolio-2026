"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Archive, BookOpen, RadioTower, Rocket } from "lucide-react"
import { motion } from "motion/react"

import { SpaceCanvas } from "@/components/cinematic/SpaceCanvas"
import { MissionStatus } from "@/components/hud/MissionStatus"
import { buttonVariants } from "@/components/ui/button"
import { initSequence, profile } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

export function LaunchHero() {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroComplete(true), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <SpaceCanvas />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#02030a_0%,rgba(2,3,10,0.86)_42%,rgba(2,3,10,0.35)_100%)]" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 max-w-xl border border-cyan-300/20 bg-black/30 p-4 font-mono text-xs tracking-[0.16em] text-cyan-100 uppercase">
            {(introComplete ? initSequence : initSequence.slice(0, 4)).map(
              (line) => (
                <p key={line} className="py-1">
                  {line}
                </p>
              )
            )}
            <button
              type="button"
              onClick={() => setIntroComplete(true)}
              className="mt-3 text-[11px] text-slate-400 underline-offset-4 hover:text-cyan-100 hover:underline"
            >
              Skip intro
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="max-w-5xl font-heading text-5xl leading-[0.95] font-semibold text-balance text-slate-50 sm:text-7xl lg:text-8xl">
              Event Horizon OS
            </h1>
            <p className="mt-5 max-w-2xl font-mono text-sm tracking-[0.22em] text-cyan-200 uppercase">
              {profile.tagline}
            </p>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-200">
              {profile.heroCopy}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
              {profile.secondaryCopy}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#featured-missions"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
                )}
              >
                <Rocket className="size-4" />
                Explore Missions
              </Link>
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                )}
              >
                <Archive className="size-4" />
                Open Galactic Archive
              </Link>
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                )}
              >
                <BookOpen className="size-4" />
                Read Research Logs
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-yellow-300/25 bg-yellow-300/10 text-yellow-100 hover:bg-yellow-300/15"
                )}
              >
                <RadioTower className="size-4" />
                Send Transmission
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hud-panel rounded-lg p-4 sm:p-6"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan-200 uppercase">
                Pilot identity
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-50">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{profile.role}</p>
            </div>
            <span className="size-3 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.9)]" />
          </div>
          <MissionStatus />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-white/[0.035] p-3"
              >
                <p className="font-heading text-2xl font-semibold text-slate-50">
                  {stat.value}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
