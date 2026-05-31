import { BookOpen, Database, Network, PenTool } from "lucide-react"

import { ResearchLogCard } from "@/components/blog/ResearchLogCard"
import { SectionHeader } from "@/components/hud/SectionHeader"
import { blogCategories, researchLogs } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Research Logs - Backend, Blockchain & System Design Notes",
  description:
    "Research logs from backend architecture, blockchain systems, frontend experiments, and space-inspired product thinking.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <div className="px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader
            label="Research Logs"
            title="A scientific space archive for engineering notes."
            description="Research logs from the edge of backend engineering, blockchain systems, frontend experiments, and space-inspired product thinking."
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-white/10 bg-white/[0.035] p-4">
              <BookOpen className="size-5 text-cyan-200" />
              <p className="mt-4 font-heading text-3xl font-semibold text-slate-50">
                {researchLogs.length}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Logs
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.035] p-4">
              <Database className="size-5 text-emerald-200" />
              <p className="mt-4 font-heading text-3xl font-semibold text-slate-50">
                6
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Systems themes
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.035] p-4">
              <Network className="size-5 text-violet-200" />
              <p className="mt-4 font-heading text-3xl font-semibold text-slate-50">
                MDX
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
                Content mode
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase"
            >
              <PenTool className="size-3 text-cyan-200" />
              {category}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {researchLogs.map((log) => (
            <ResearchLogCard key={log.slug} log={log} />
          ))}
        </div>
      </div>
    </div>
  )
}
