import Link from "next/link"
import { ArrowUpRight, Database, Satellite, ServerCog } from "lucide-react"

import { ArchitectureSpider } from "@/components/hud/ArchitectureSpider"
import { BackendFlow } from "@/components/hud/BackendFlow"
import { HudPanel } from "@/components/hud/HudPanel"
import { LaunchHero } from "@/components/hud/LaunchHero"
import { SectionHeader } from "@/components/hud/SectionHeader"
import { ProjectGalaxy } from "@/components/projects/ProjectGalaxy"
import { ResearchLogCard } from "@/components/blog/ResearchLogCard"
import {
  achievements,
  featuredProjects,
  profile,
  researchLogs,
} from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title:
    "Event Horizon OS - Backend, Blockchain & Full-Stack Developer Portfolio",
  description:
    "A cinematic spacecraft OS portfolio for backend systems, blockchain protocols, and frontend galaxies.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <LaunchHero />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            label="Developer identity"
            title="Backend systems that survive pressure."
            description="I design APIs, databases, protocols, and interfaces for products that need to scale. Frontend creates the surface. Backend creates the gravity."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.Icon
              return (
                <HudPanel key={achievement.title} className="p-5">
                  <Icon className="size-6 text-cyan-200" />
                  <h3 className="mt-5 font-heading text-lg font-semibold text-slate-50">
                    {achievement.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {achievement.description}
                  </p>
                </HudPanel>
              )
            })}
          </div>
        </div>
      </section>

      <section id="architecture-spider" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10">
          <SectionHeader
            label="Architecture spider"
            title="Stack choices mapped to system responsibility."
            description="A relational view of where frameworks, databases, chain tooling, and operations fit inside an actual product architecture."
          />
          <ArchitectureSpider />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Backend engine"
            title="A request should move through the system like a controlled launch."
            description="Every layer has a job: validate, protect, orchestrate, persist, observe, and return a trustworthy response."
          />
          <div className="mt-10">
            <BackendFlow />
          </div>
        </div>
      </section>

      <section id="featured-missions" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              label="Featured missions"
              title="Every project is documented like a mission, not displayed like a screenshot."
              description="Selected systems and experiments from the Galactic Archive."
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase hover:text-cyan-100"
            >
              Open full archive
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10">
            <ProjectGalaxy projects={featuredProjects} />
          </div>
        </div>
      </section>

      <section id="research-logs" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              label="Research logs"
              title="Notes from the edge of backend engineering and product imagination."
              description="Research logs from backend architecture, blockchain systems, frontend experiments, and space-inspired product thinking."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase hover:text-cyan-100"
            >
              Read all logs
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {researchLogs.slice(0, 3).map((log) => (
              <ResearchLogCard key={log.slug} log={log} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact-transmission" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-lg border border-cyan-300/20 bg-cyan-300/[0.055] p-6 sm:p-10">
            <div className="absolute top-6 right-6 hidden gap-4 text-cyan-100/60 sm:flex">
              <Database className="size-7" />
              <ServerCog className="size-7" />
              <Satellite className="size-7" />
            </div>
            <p className="font-mono text-xs tracking-[0.24em] text-cyan-200 uppercase">
              Deep Space Transmission
            </p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold text-balance text-slate-50 sm:text-5xl">
              Send a transmission for collaborations, backend systems,
              blockchain products, or ambitious digital experiences.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              {profile.alternativeHeroLine}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Send Transmission
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
