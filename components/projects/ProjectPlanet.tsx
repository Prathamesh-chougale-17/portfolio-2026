import Link from "next/link"
import { ExternalLink, Orbit } from "lucide-react"

import { Icons } from "@/components/icons"
import type { MissionProject } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

export function ProjectPlanet({
  project,
  index = 0,
}: {
  project: MissionProject
  index?: number
}) {
  const GitHubIcon = Icons.gitHub

  return (
    <article className="group relative min-h-[310px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.055]">
      <div
        aria-hidden="true"
        className={cn(
          "absolute -top-14 -right-14 size-40 rounded-full border opacity-70 transition group-hover:scale-110",
          index % 3 === 0 && "border-cyan-300/25 bg-cyan-300/10",
          index % 3 === 1 && "border-violet-300/25 bg-violet-300/10",
          index % 3 === 2 && "border-yellow-200/20 bg-yellow-200/10"
        )}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">
            {project.signal}
          </span>
          <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
            {project.category}
          </span>
        </div>
        <Link href={`/projects/${project.slug}`} className="mt-7 block">
          <h3 className="font-heading text-2xl font-semibold text-slate-50 transition group-hover:text-cyan-100">
            {project.missionName}
          </h3>
        </Link>
        <p className="mt-2 font-mono text-xs tracking-[0.16em] text-violet-200 uppercase">
          {project.type}
        </p>
        <p className="mt-5 line-clamp-4 text-sm leading-7 text-slate-400">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-7 flex items-center justify-between gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase transition hover:text-cyan-100"
          >
            <Orbit className="size-4" />
            Open mission
          </Link>
          <div className="flex gap-2">
            {project.githubLink ? (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.missionName} GitHub`}
                className="text-slate-400 transition hover:text-cyan-100"
              >
                <GitHubIcon className="size-4" />
              </a>
            ) : null}
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.missionName} live demo`}
                className="text-slate-400 transition hover:text-cyan-100"
              >
                <ExternalLink className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
