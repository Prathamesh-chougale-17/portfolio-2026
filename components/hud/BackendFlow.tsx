import { backendFlow } from "@/data/event-horizon"

export function BackendFlow() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-cyan-300/15 bg-[#050816]/76 p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-8 left-8 h-px bg-cyan-300/25"
        style={{ animation: "pulse-flow 3.4s ease-in-out infinite" }}
      />
      <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {backendFlow.map((node, index) => (
          <li
            key={node}
            className="group relative min-h-28 border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 font-heading text-base font-semibold text-slate-50">
              {node}
            </p>
            <span className="absolute right-3 bottom-3 size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
          </li>
        ))}
      </ol>
    </div>
  )
}
