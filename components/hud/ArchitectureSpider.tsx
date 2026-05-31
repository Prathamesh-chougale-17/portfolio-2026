"use client"

import { useMemo, useState } from "react"
import {
  Boxes,
  Braces,
  Cable,
  Database,
  type LucideIcon,
  Network,
  RadioTower,
  ServerCog,
  ShieldCheck,
  WalletCards,
} from "lucide-react"

import { architectureLayers, type ArchitectureLayer } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

type Point = {
  x: number
  y: number
}

const layerPositions: Record<string, Point> = {
  interface: { x: 18, y: 18 },
  boundary: { x: 50, y: 13 },
  services: { x: 82, y: 18 },
  storage: { x: 18, y: 74 },
  chain: { x: 50, y: 84 },
  ops: { x: 82, y: 74 },
}

const stackPositions: Record<string, Point> = {
  "Next.js": { x: 8, y: 40 },
  React: { x: 7, y: 54 },
  TypeScript: { x: 24, y: 93 },
  "Tailwind CSS": { x: 34, y: 7 },
  wagmi: { x: 43, y: 94 },
  "Node.js": { x: 50, y: 2 },
  NestJS: { x: 63, y: 7 },
  "Express.js": { x: 76, y: 8 },
  "REST APIs": { x: 93, y: 37 },
  GraphQL: { x: 94, y: 51 },
  Prisma: { x: 92, y: 66 },
  Redis: { x: 66, y: 94 },
  "System Design": { x: 49, y: 98 },
  PostgreSQL: { x: 7, y: 67 },
  MongoDB: { x: 8, y: 27 },
  Solidity: { x: 35, y: 94 },
  Ethereum: { x: 80, y: 93 },
  viem: { x: 20, y: 7 },
  Web3: { x: 93, y: 24 },
  Docker: { x: 24, y: 2 },
  Kubernetes: { x: 78, y: 2 },
  "CI/CD": { x: 92, y: 79 },
}

const layerIcons: Record<string, LucideIcon> = {
  interface: Braces,
  boundary: ShieldCheck,
  services: ServerCog,
  storage: Database,
  chain: WalletCards,
  ops: Boxes,
}

const categoryClasses = {
  Frontend: "border-cyan-300/45 bg-cyan-300/[0.08] text-cyan-100",
  Backend: "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-100",
  Data: "border-yellow-200/40 bg-yellow-200/[0.08] text-yellow-100",
  Blockchain: "border-violet-300/45 bg-violet-300/[0.08] text-violet-100",
  Operations: "border-slate-300/35 bg-slate-300/[0.07] text-slate-100",
} satisfies Record<ArchitectureLayer["category"], string>

const defaultLayerId = "services"

function stackKey(stack: string) {
  return stack.replace(/[^a-z0-9]+/gi, "-").toLowerCase()
}

export function ArchitectureSpider() {
  const [activeLayerId, setActiveLayerId] = useState(defaultLayerId)
  const [activeStack, setActiveStack] = useState<string | null>(null)

  const activeLayer =
    architectureLayers.find((layer) => layer.id === activeLayerId) ??
    architectureLayers[0]

  const stacks = useMemo(
    () => [...new Set(architectureLayers.flatMap((layer) => layer.stacks))],
    []
  )

  const stackToLayers = useMemo(() => {
    return stacks.reduce<Record<string, ArchitectureLayer[]>>((map, stack) => {
      map[stack] = architectureLayers.filter((layer) =>
        layer.stacks.includes(stack)
      )
      return map
    }, {})
  }, [stacks])

  const visibleLayers = activeStack
    ? stackToLayers[activeStack]
    : [activeLayer]

  const activeStackSet = new Set(
    visibleLayers.flatMap((layer) => layer.stacks)
  )
  const selectedStackLayers = activeStack ? stackToLayers[activeStack] : []

  return (
    <div className="relative overflow-hidden border border-cyan-300/15 bg-[#050816]/78">
      <div className="grid gap-0 xl:grid-cols-[1fr_360px]">
        <div className="relative min-h-[680px] border-b border-white/10 p-4 sm:p-6 xl:border-r xl:border-b-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan-200 uppercase">
                Relational Spider
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-50">
                Stack mapped to architecture responsibility
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveLayerId(defaultLayerId)
                setActiveStack(null)
              }}
              className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              <Network className="size-3.5" />
              Reset View
            </button>
          </div>

          <div className="relative hidden min-h-[560px] md:block">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spider-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgb(34 211 238)" />
                  <stop offset="55%" stopColor="rgb(52 211 153)" />
                  <stop offset="100%" stopColor="rgb(167 139 250)" />
                </linearGradient>
              </defs>

              {architectureLayers.map((layer) => {
                const to = layerPositions[layer.id]
                const selected = visibleLayers.some(
                  (visibleLayer) => visibleLayer.id === layer.id
                )
                return (
                  <line
                    key={`hub-${layer.id}`}
                    x1="50"
                    y1="50"
                    x2={to.x}
                    y2={to.y}
                    stroke={selected ? "url(#spider-edge)" : "rgb(148 163 184)"}
                    strokeOpacity={selected ? 0.68 : 0.13}
                    strokeWidth={selected ? 0.34 : 0.16}
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}

              {visibleLayers.flatMap((layer) =>
                layer.stacks.map((stack) => {
                  const from = stackPositions[stack]
                  const to = layerPositions[layer.id]
                  if (!from || !to) return null
                  const highlighted = !activeStack || activeStack === stack
                  return (
                    <line
                      key={`${layer.id}-${stackKey(stack)}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="url(#spider-edge)"
                      strokeOpacity={highlighted ? 0.72 : 0.2}
                      strokeWidth={highlighted ? 0.4 : 0.2}
                      vectorEffect="non-scaling-stroke"
                    />
                  )
                })
              )}
            </svg>

            <div className="absolute top-1/2 left-1/2 z-20 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border border-cyan-300/35 bg-[#02030a]/92 text-center shadow-[0_0_70px_rgba(34,211,238,0.18)]">
              <Cable className="size-6 text-cyan-200" />
              <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-cyan-100 uppercase">
                System
              </p>
              <p className="mt-1 px-3 text-xs leading-5 text-slate-300">
                architecture
              </p>
            </div>

            {architectureLayers.map((layer) => {
              const position = layerPositions[layer.id]
              const Icon = layerIcons[layer.id]
              const selected =
                activeLayer.id === layer.id ||
                selectedStackLayers.some((item) => item.id === layer.id)
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayerId(layer.id)
                    setActiveStack(null)
                  }}
                  className={cn(
                    "absolute z-30 w-40 -translate-x-1/2 -translate-y-1/2 border bg-[#050816]/94 p-3 text-left shadow-[0_18px_44px_rgba(0,0,0,0.2)] transition",
                    selected
                      ? categoryClasses[layer.category]
                      : "border-white/10 text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100"
                  )}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                >
                  <Icon className="size-4" />
                  <span className="mt-2 block font-mono text-[10px] tracking-[0.14em] uppercase">
                    {layer.label}
                  </span>
                </button>
              )
            })}

            {stacks.map((stack) => {
              const position = stackPositions[stack]
              if (!position) return null
              const related = activeStackSet.has(stack)
              const selected = activeStack === stack
              return (
                <button
                  key={stack}
                  type="button"
                  onClick={() => setActiveStack(selected ? null : stack)}
                  className={cn(
                    "absolute z-20 -translate-x-1/2 -translate-y-1/2 border px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] uppercase transition",
                    selected
                      ? "border-yellow-200/70 bg-yellow-200/15 text-yellow-100 shadow-[0_0_30px_rgba(250,204,21,0.18)]"
                      : related
                        ? "border-cyan-300/35 bg-cyan-300/[0.08] text-cyan-100"
                        : "border-white/10 bg-black/28 text-slate-500 hover:border-white/25 hover:text-slate-300"
                  )}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                >
                  {stack}
                </button>
              )
            })}
          </div>

          <div className="grid gap-3 md:hidden">
            {architectureLayers.map((layer) => {
              const Icon = layerIcons[layer.id]
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayerId(layer.id)
                    setActiveStack(null)
                  }}
                  className={cn(
                    "flex items-center justify-between gap-4 border p-4 text-left",
                    activeLayer.id === layer.id
                      ? categoryClasses[layer.category]
                      : "border-white/10 bg-white/[0.035] text-slate-300"
                  )}
                >
                  <span>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                      {layer.category}
                    </span>
                    <span className="mt-1 block font-heading text-base font-semibold">
                      {layer.label}
                    </span>
                  </span>
                  <Icon className="size-5 shrink-0" />
                </button>
              )
            })}
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <RadioTower className="size-5 text-cyan-200" />
            <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-200 uppercase">
              Inspector
            </p>
          </div>

          {activeStack ? (
            <StackInspector
              stack={activeStack}
              layers={selectedStackLayers}
              onClear={() => setActiveStack(null)}
            />
          ) : (
            <LayerInspector layer={activeLayer} />
          )}
        </aside>
      </div>
    </div>
  )
}

function LayerInspector({ layer }: { layer: ArchitectureLayer }) {
  return (
    <div className="mt-6">
      <p
        className={cn(
          "inline-flex border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase",
          categoryClasses[layer.category]
        )}
      >
        {layer.category}
      </p>
      <h3 className="mt-4 font-heading text-3xl font-semibold text-slate-50">
        {layer.label}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{layer.role}</p>

      <div className="mt-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">
          Stack relation
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {layer.stacks.map((stack) => (
            <span
              key={stack}
              className="border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-slate-300"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {layer.responsibilities.map((item) => (
          <div
            key={item}
            className="border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-6 border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
        <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-200 uppercase">
          Typical path
        </p>
        <p className="mt-3 font-mono text-xs leading-6 text-slate-300">
          {layer.flow.join(" -> ")}
        </p>
      </div>
    </div>
  )
}

function StackInspector({
  stack,
  layers,
  onClear,
}: {
  stack: string
  layers: ArchitectureLayer[]
  onClear: () => void
}) {
  return (
    <div className="mt-6">
      <p className="inline-flex border border-yellow-200/50 bg-yellow-200/10 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-yellow-100 uppercase">
        Stack selected
      </p>
      <h3 className="mt-4 font-heading text-3xl font-semibold text-slate-50">
        {stack}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        This stack item participates in {layers.length} architecture{" "}
        {layers.length === 1 ? "layer" : "layers"}. The graph highlights where
        it sits in the system instead of treating it as a loose badge.
      </p>
      <div className="mt-6 grid gap-3">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              "border p-3",
              categoryClasses[layer.category]
            )}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase">
              {layer.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {layer.role}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        Clear stack focus
      </button>
    </div>
  )
}
