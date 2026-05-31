import { ExternalLink, ShieldCheck, Workflow } from "lucide-react"

import { Icons } from "@/components/icons"
import type { MissionProject } from "@/data/event-horizon"

const sections = [
  ["Problem Statement", "problem"],
  ["My Role", "role"],
  ["Architecture", "architecture"],
  ["Blockchain Logic", "blockchainLogic"],
  ["Frontend Experience", "frontendExperience"],
  ["Database Design", "databaseDesign"],
  ["Security Notes", "securityNotes"],
  ["Performance Notes", "performanceNotes"],
  ["Lessons Learned", "lessonsLearned"],
] as const

export function ProjectCaseStudy({ project }: { project: MissionProject }) {
  const GitHubIcon = Icons.gitHub

  return (
    <article>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-cyan-200 uppercase">
            {project.signal} / {project.type}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-semibold text-balance text-slate-50 sm:text-6xl">
            {project.missionName}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.githubLink ? (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
            ) : null}
            {project.liveLink ? (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-cyan-300/30 bg-cyan-300/12 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18"
              >
                <ExternalLink className="size-4" />
                Live demo
              </a>
            ) : null}
          </div>
        </div>
        <aside className="hud-panel rounded-lg p-5">
          <div className="flex items-center gap-3">
            <Workflow className="size-5 text-cyan-200" />
            <p className="font-mono text-xs tracking-[0.18em] text-slate-300 uppercase">
              Mission telemetry
            </p>
          </div>
          <dl className="mt-6 grid gap-4">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Category
              </dt>
              <dd className="mt-1 text-sm text-slate-100">
                {project.category}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Coordinates
              </dt>
              <dd className="mt-1 text-sm text-slate-100">
                {project.coordinates}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Stack
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {sections.map(([title, key]) => (
          <section
            key={key}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-emerald-300" />
              <h2 className="font-heading text-xl font-semibold text-slate-50">
                {title}
              </h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {project[key]}
            </p>
          </section>
        ))}
        <section className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.045] p-5 lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-slate-50">
            Backend Decisions
          </h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {project.backendDecisions.map((decision) => (
              <li
                key={decision}
                className="border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-300"
              >
                {decision}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
