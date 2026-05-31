import { Archive, Binary, Orbit, ServerCog } from "lucide-react"

import { ProjectFilters } from "@/components/projects/ProjectFilters"
import { SectionHeader } from "@/components/hud/SectionHeader"
import { projects } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Galactic Archive - Developer Projects",
  description:
    "Developer projects presented as backend systems, blockchain missions, frontend satellites, and experimental star systems.",
  path: "/projects",
})

const stats = [
  { label: "Missions indexed", value: projects.length, icon: Archive },
  {
    label: "Backend systems",
    value: projects.filter((project) => project.categories.includes("Backend"))
      .length,
    icon: ServerCog,
  },
  {
    label: "Blockchain orbits",
    value: projects.filter((project) =>
      project.categories.includes("Blockchain")
    ).length,
    icon: Orbit,
  },
  {
    label: "Experimental signals",
    value: projects.filter((project) =>
      project.categories.includes("Experimental")
    ).length,
    icon: Binary,
  },
]

export default function ProjectsPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            label="Galactic Archive"
            title="Every mission in this archive represents a system, experiment, or protocol."
            description="Explore real projects and product experiments as a constellation of backend systems, blockchain projects, frontend satellites, full-stack star systems, and nebula-like ideas."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="border border-white/10 bg-white/[0.035] p-4"
                >
                  <Icon className="size-5 text-cyan-200" />
                  <p className="mt-4 font-heading text-3xl font-semibold text-slate-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-12">
          <ProjectFilters />
        </div>
      </div>
    </div>
  )
}
