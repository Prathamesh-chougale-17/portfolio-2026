import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"

import type { ResearchLog } from "@/data/event-horizon"

export function ResearchLogCard({ log }: { log: ResearchLog }) {
  return (
    <article className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.045]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="size-4 text-cyan-200" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">
            {log.number}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          {log.readingTime}
        </span>
      </div>
      <Link href={`/blog/${log.slug}`} className="mt-6 block">
        <h3 className="font-heading text-2xl font-semibold text-balance text-slate-50 transition group-hover:text-cyan-100">
          {log.title}
        </h3>
      </Link>
      <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-violet-200 uppercase">
        {log.category} / {log.date}
      </p>
      <p className="mt-5 text-sm leading-7 text-slate-400">{log.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {log.tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-slate-300 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/blog/${log.slug}`}
        className="mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-cyan-200 uppercase transition hover:text-cyan-100"
      >
        Read log
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  )
}
