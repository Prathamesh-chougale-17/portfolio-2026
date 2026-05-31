const steps = ["Request", "Validate", "Queue", "Persist", "Observe", "Respond"]

export function ArchitectureDiagram({
  title = "Mission Flow",
}: {
  title?: string
}) {
  return (
    <div className="not-prose my-8 rounded-lg border border-cyan-300/15 bg-[#050816]/80 p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">
        {title}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => (
          <div
            key={step}
            className="border border-white/10 bg-white/[0.04] p-3 text-center"
          >
            <span className="font-mono text-[10px] text-slate-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-medium text-slate-100">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
