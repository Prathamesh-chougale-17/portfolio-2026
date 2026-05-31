import { Blocks, CircleDot, Hexagon, Orbit } from "lucide-react"

const nodes = ["Wallet", "Signature", "Contract", "Indexer", "Status", "Audit"]

export function BlockchainOrbit() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-violet-300/15 bg-[#050816]/76 p-6">
      <div className="absolute inset-10 rounded-full border border-violet-300/20" />
      <div className="absolute inset-20 rounded-full border border-cyan-300/15" />
      <div className="absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/30 bg-violet-400/10 text-violet-100 shadow-[0_0_90px_rgba(124,58,237,0.22)]">
        <Hexagon className="size-9" />
      </div>
      {nodes.map((node, index) => {
        const angle = (360 / nodes.length) * index
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 38
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 38
        return (
          <div
            key={node}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 border border-white/10 bg-white/[0.05] px-3 py-2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {index % 2 === 0 ? (
              <CircleDot className="size-4 text-cyan-200" />
            ) : (
              <Blocks className="size-4 text-emerald-200" />
            )}
            <span className="font-mono text-[10px] tracking-[0.16em] text-slate-200 uppercase">
              {node}
            </span>
          </div>
        )
      })}
      <div className="absolute right-6 bottom-6 left-6 flex items-center gap-3 border border-white/10 bg-black/20 px-4 py-3">
        <Orbit className="size-4 text-yellow-200" />
        <p className="text-sm leading-6 text-slate-300">
          Blockchain is not a trend here - it is treated as infrastructure.
        </p>
      </div>
    </div>
  )
}
