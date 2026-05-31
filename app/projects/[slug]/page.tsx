import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy"
import { getProject, projects } from "@/data/event-horizon"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: "Mission Not Found",
    }
  }

  return {
    title: `${project.missionName} - Mission Case Study`,
    description: project.description,
    openGraph: {
      title: project.missionName,
      description: project.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase hover:text-cyan-100"
        >
          <ArrowLeft className="size-4" />
          Back to Galactic Archive
        </Link>
        <ProjectCaseStudy project={project} />
      </div>
    </div>
  )
}
