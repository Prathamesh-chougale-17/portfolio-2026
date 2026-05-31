export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-white/10 bg-black/55">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="size-2 rounded-full bg-rose-400" />
        <span className="size-2 rounded-full bg-yellow-300" />
        <span className="size-2 rounded-full bg-emerald-300" />
        <span className="ml-3 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
          research-snippet.ts
        </span>
      </div>
      <div className="overflow-x-auto p-4 text-sm leading-7 text-slate-200">
        {children}
      </div>
    </div>
  )
}
