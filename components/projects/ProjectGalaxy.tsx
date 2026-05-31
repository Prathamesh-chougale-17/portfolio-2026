import type { MissionProject } from "@/data/event-horizon"

import { ProjectPlanet } from "./ProjectPlanet"

export function ProjectGalaxy({
  projects,
  limit,
}: {
  projects: MissionProject[]
  limit?: number
}) {
  const visibleProjects =
    typeof limit === "number" ? projects.slice(0, limit) : projects

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-16 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent lg:block"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <ProjectPlanet key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
