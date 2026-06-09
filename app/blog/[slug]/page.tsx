import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { TerminalPortfolioApp } from "@/components/terminal/TerminalPortfolioApp"
import { getResearchLog, researchLogs } from "@/data/event-horizon"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return researchLogs.map((log) => ({ slug: log.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const log = getResearchLog(slug)

  if (!log) return { title: "Engineering Note Not Found" }

  return {
    title: `${log.number} - ${log.title}`,
    description: log.excerpt,
    alternates: {
      canonical: `/blog/${log.slug}`,
    },
    openGraph: {
      title: log.title,
      description: log.excerpt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: log.title,
      description: log.excerpt,
      images: ["/opengraph-image"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const log = getResearchLog(slug)

  if (!log) {
    notFound()
  }

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)

  return (
    <TerminalPortfolioApp
      articleContent={<Post />}
      initialView="blog-detail"
      selectedSlug={slug}
    />
  )
}
