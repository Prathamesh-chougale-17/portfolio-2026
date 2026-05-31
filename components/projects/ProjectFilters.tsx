"use client"

import { useMemo, useState } from "react"
import { Filter } from "lucide-react"

import { ProjectGalaxy } from "@/components/projects/ProjectGalaxy"
import {
  projectFilters,
  projects,
  type ProjectFilter,
} from "@/data/event-horizon"
import { cn } from "@/lib/utils"

export function ProjectFilters() {
  const [active, setActive] = useState<ProjectFilter>("All")

  const filtered = useMemo(() => {
    if (active === "All") return projects
    return projects.filter((project) => project.categories.includes(active))
  }, [active])

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 border border-white/10 bg-white/[0.035] p-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 px-2">
          <Filter className="size-4 text-cyan-200" />
          <p className="font-mono text-xs tracking-[0.18em] text-slate-300 uppercase">
            Mission filters
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "border px-3 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition",
                active === filter
                  ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                  : "border-white/10 bg-black/20 text-slate-400 hover:border-white/25 hover:text-slate-100"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <ProjectGalaxy projects={filtered} />
    </div>
  )
}
