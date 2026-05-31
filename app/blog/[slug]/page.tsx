import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"

import {
  getAdjacentResearchLogs,
  getResearchLog,
  researchLogs,
} from "@/data/event-horizon"

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

  if (!log) return { title: "Research Log Not Found" }

  return {
    title: `${log.number} - ${log.title}`,
    description: log.excerpt,
    openGraph: {
      title: log.title,
      description: log.excerpt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
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
  const adjacent = getAdjacentResearchLogs(slug)

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase hover:text-cyan-100"
        >
          <ArrowLeft className="size-4" />
          Back to Research Logs
        </Link>
        <header className="border-b border-white/10 pb-10">
          <p className="font-mono text-xs tracking-[0.24em] text-cyan-200 uppercase">
            {log.number} / {log.category}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-semibold text-balance text-slate-50 sm:text-6xl">
            {log.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span>{log.date}</span>
            <span className="text-slate-700">/</span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-cyan-200" />
              {log.readingTime}
            </span>
          </div>
          <p className="mt-6 text-lg leading-9 text-slate-300">{log.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {log.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10">
          <div className="mb-10 rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-200 uppercase">
              Table of contents
            </p>
            <ol className="mt-4 grid gap-2 font-mono text-xs tracking-[0.12em] text-slate-400 uppercase sm:grid-cols-3">
              <li>01 Mission premise</li>
              <li>02 System architecture</li>
              <li>03 Field notes</li>
            </ol>
          </div>
          <div className="prose-invert max-w-none">
            <Post />
          </div>
        </div>

        <nav className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          {adjacent.previous ? (
            <Link
              href={`/blog/${adjacent.previous.slug}`}
              className="border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Previous
              </span>
              <span className="mt-2 block font-heading text-lg text-slate-50">
                {adjacent.previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link
              href={`/blog/${adjacent.next.slug}`}
              className="border border-white/10 bg-white/[0.035] p-4 text-right text-sm text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Next
              </span>
              <span className="mt-2 flex items-center justify-end gap-2 font-heading text-lg text-slate-50">
                {adjacent.next.title}
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  )
}
