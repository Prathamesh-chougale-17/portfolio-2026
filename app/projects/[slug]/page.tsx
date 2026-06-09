import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
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
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - PWSH Case Study`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: ["/opengraph-image"],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  if (!getProject(slug)) {
    notFound()
  }

  return <TerminalPortfolioApp initialView="project-detail" selectedSlug={slug} />
}
