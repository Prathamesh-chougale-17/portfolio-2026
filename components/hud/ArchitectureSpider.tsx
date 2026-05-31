"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Activity,
  Boxes,
  Braces,
  Cable,
  Database,
  type LucideIcon,
  Network,
  Pause,
  Play,
  RadioTower,
  ServerCog,
  ShieldCheck,
  WalletCards,
  Zap,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { architectureLayers, type ArchitectureLayer } from "@/data/event-horizon"
import { cn } from "@/lib/utils"

type Point = {
  x: number
  y: number
}

type Edge = {
  id: string
  from: Point
  to: Point
  selected: boolean
  delay: number
}

const layerPositions: Record<string, Point> = {
  interface: { x: 18, y: 25 },
  boundary: { x: 50, y: 21 },
  services: { x: 82, y: 25 },
  storage: { x: 18, y: 72 },
  chain: { x: 50, y: 81 },
  ops: { x: 82, y: 72 },
}

const stackPositions: Record<string, Point> = {
  "Next.js": { x: 6, y: 44 },
  React: { x: 6, y: 55 },
  TypeScript: { x: 20, y: 94 },
  "Tailwind CSS": { x: 27, y: 6 },
  wagmi: { x: 46, y: 94 },
  "Node.js": { x: 43, y: 8 },
  NestJS: { x: 62, y: 8 },
  "Express.js": { x: 77, y: 9 },
  "REST APIs": { x: 94, y: 43 },
  GraphQL: { x: 94, y: 54 },
  Prisma: { x: 94, y: 81 },
  Redis: { x: 72, y: 94 },
  "System Design": { x: 59, y: 94 },
  PostgreSQL: { x: 7, y: 88 },
  MongoDB: { x: 7, y: 33 },
  Solidity: { x: 33, y: 94 },
  Ethereum: { x: 87, y: 94 },
  viem: { x: 3, y: 16 },
  Web3: { x: 94, y: 31 },
  Docker: { x: 6, y: 5 },
  Kubernetes: { x: 90, y: 11 },
  "CI/CD": { x: 93, y: 90 },
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
const hubPoint = { x: 50, y: 50 }

function stackKey(stack: string) {
  return stack.replace(/[^a-z0-9]+/gi, "-").toLowerCase()
}

export function ArchitectureSpider() {
  const shouldReduceMotion = useReducedMotion()
  const [activeLayerId, setActiveLayerId] = useState(defaultLayerId)
  const [activeStack, setActiveStack] = useState<string | null>(null)
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null)
  const [hoveredStack, setHoveredStack] = useState<string | null>(null)
  const [scanEnabled, setScanEnabled] = useState(true)

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

  useEffect(() => {
    if (shouldReduceMotion || !scanEnabled || activeStack || hoveredStack) {
      return
    }

    const interval = window.setInterval(() => {
      setActiveLayerId((current) => {
        const index = architectureLayers.findIndex(
          (layer) => layer.id === current
        )
        return architectureLayers[(index + 1) % architectureLayers.length].id
      })
    }, 2800)

    return () => window.clearInterval(interval)
  }, [activeStack, hoveredStack, scanEnabled, shouldReduceMotion])

  const focusedStack = hoveredStack ?? activeStack
  const focusedLayerId = hoveredLayerId ?? activeLayerId
  const activeLayer =
    architectureLayers.find((layer) => layer.id === focusedLayerId) ??
    architectureLayers[0]

  const visibleLayers = focusedStack
    ? stackToLayers[focusedStack]
    : [activeLayer]

  const activeStackSet = new Set(
    visibleLayers.flatMap((layer) => layer.stacks)
  )
  const selectedStackLayers = activeStack ? stackToLayers[activeStack] : []
  const previewStackLayers = hoveredStack ? stackToLayers[hoveredStack] : []

  const hubEdges = architectureLayers.map((layer, index) => {
    const to = layerPositions[layer.id]
    const selected = visibleLayers.some(
      (visibleLayer) => visibleLayer.id === layer.id
    )
    return {
      id: `hub-${layer.id}`,
      from: hubPoint,
      to,
      selected,
      delay: index * 0.06,
    }
  })

  const relationshipEdges = visibleLayers.flatMap((layer, layerIndex) =>
    layer.stacks.map((stack, stackIndex) => {
      const from = stackPositions[stack]
      const to = layerPositions[layer.id]
      if (!from || !to) return null
      return {
        id: `${layer.id}-${stackKey(stack)}`,
        from,
        to,
        selected: !focusedStack || focusedStack === stack,
        delay: (layerIndex + stackIndex) * 0.05,
      }
    })
  ).filter((edge): edge is Edge => Boolean(edge))

  const signalEdges = relationshipEdges
    .filter((edge) => edge.selected)
    .slice(0, 9)

  const inspectedLayer =
    activeStack && selectedStackLayers.length
      ? selectedStackLayers[0]
      : hoveredStack && previewStackLayers.length
        ? previewStackLayers[0]
        : activeLayer

  return (
    <div className="relative overflow-hidden border border-cyan-300/15 bg-[#050816]/78">
      <div className="grid gap-0 xl:grid-cols-[1fr_360px]">
        <div className="relative min-h-[740px] border-b border-white/10 p-4 sm:p-6 xl:border-r xl:border-b-0">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan-200 uppercase">
                Relational Spider
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-slate-50">
                Stack mapped to architecture responsibility
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setScanEnabled((value) => !value)}
                className={cn(
                  "inline-flex items-center gap-2 border px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition",
                  scanEnabled
                    ? "border-emerald-300/35 bg-emerald-300/[0.08] text-emerald-100"
                    : "border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
                )}
              >
                {scanEnabled ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
                Live scan
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveLayerId(defaultLayerId)
                  setActiveStack(null)
                  setHoveredLayerId(null)
                  setHoveredStack(null)
                }}
                className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-slate-300 uppercase transition hover:border-cyan-300/40 hover:text-cyan-100"
              >
                <Network className="size-3.5" />
                Reset View
              </button>
            </div>
          </div>

          <div
            className="relative hidden min-h-[640px] md:block"
            data-spider-graph
          >
            <motion.svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <defs>
                <linearGradient id="spider-edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgb(34 211 238)" />
                  <stop offset="55%" stopColor="rgb(52 211 153)" />
                  <stop offset="100%" stopColor="rgb(167 139 250)" />
                </linearGradient>
                <filter id="spider-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="0.9" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {hubEdges.map((edge) => (
                <AnimatedEdge
                  key={edge.id}
                  edge={edge}
                  muted={!edge.selected}
                  reduceMotion={Boolean(shouldReduceMotion)}
                />
              ))}

              {relationshipEdges.map((edge) => (
                <AnimatedEdge
                  key={edge.id}
                  edge={edge}
                  muted={!edge.selected}
                  reduceMotion={Boolean(shouldReduceMotion)}
                />
              ))}

              {!shouldReduceMotion
                ? signalEdges.map((edge) => (
                    <SignalPacket key={`packet-${edge.id}`} edge={edge} />
                  ))
                : null}
            </motion.svg>

            <motion.div
              className="absolute top-1/2 left-1/2 z-20 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border border-cyan-300/35 bg-[#02030a]/92 text-center shadow-[0_0_70px_rgba(34,211,238,0.18)]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 42px rgba(34,211,238,0.14)",
                        "0 0 88px rgba(34,211,238,0.26)",
                        "0 0 42px rgba(34,211,238,0.14)",
                      ],
                    }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cable className="size-6 text-cyan-200" />
              </motion.div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-cyan-100 uppercase">
                System
              </p>
              <p className="mt-1 px-3 text-xs leading-5 text-slate-300">
                architecture
              </p>
            </motion.div>

            {architectureLayers.map((layer) => {
              const position = layerPositions[layer.id]
              const Icon = layerIcons[layer.id]
              const selected =
                activeLayer.id === layer.id ||
                selectedStackLayers.some((item) => item.id === layer.id) ||
                previewStackLayers.some((item) => item.id === layer.id)
              return (
                <motion.button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayerId(layer.id)
                    setActiveStack(null)
                    setScanEnabled(false)
                  }}
                  onFocus={() => setHoveredLayerId(layer.id)}
                  onBlur={() => setHoveredLayerId(null)}
                  onMouseEnter={() => setHoveredLayerId(layer.id)}
                  onMouseLeave={() => setHoveredLayerId(null)}
                  data-spider-node="layer"
                  className={cn(
                    "absolute z-30 w-36 -translate-x-1/2 -translate-y-1/2 transform-gpu border bg-[#050816]/94 p-3 text-left shadow-[0_18px_44px_rgba(0,0,0,0.2)] transition",
                    selected
                      ? categoryClasses[layer.category]
                      : "border-white/10 text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100"
                  )}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  animate={{
                    scale: selected ? 1.03 : 1,
                    y: shouldReduceMotion ? "-50%" : selected ? "-52%" : "-50%",
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <Icon className="size-4" />
                  <span className="mt-2 block font-mono text-[10px] tracking-[0.14em] uppercase">
                    {layer.label}
                  </span>
                </motion.button>
              )
            })}

            {stacks.map((stack) => {
              const position = stackPositions[stack]
              if (!position) return null
              const related = activeStackSet.has(stack)
              const selected = activeStack === stack || hoveredStack === stack
              return (
                <motion.button
                  key={stack}
                  type="button"
                  onClick={() => {
                    setActiveStack(activeStack === stack ? null : stack)
                    setScanEnabled(false)
                  }}
                  onFocus={() => setHoveredStack(stack)}
                  onBlur={() => setHoveredStack(null)}
                  onMouseEnter={() => setHoveredStack(stack)}
                  onMouseLeave={() => setHoveredStack(null)}
                  data-spider-node="stack"
                  className={cn(
                    "absolute z-20 -translate-x-1/2 -translate-y-1/2 transform-gpu whitespace-nowrap border px-2 py-1 font-mono text-[9px] tracking-[0.1em] uppercase transition",
                    selected
                      ? "z-40 border-yellow-200/70 bg-yellow-200/15 text-yellow-100 shadow-[0_0_30px_rgba(250,204,21,0.18)]"
                      : related
                        ? "border-cyan-300/35 bg-cyan-300/[0.08] text-cyan-100"
                        : "border-white/10 bg-black/28 text-slate-500 hover:border-white/25 hover:text-slate-300"
                  )}
                  style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  animate={{
                    scale: selected ? 1.06 : related ? 1.02 : 1,
                    opacity: related || selected ? 1 : 0.62,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.07 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  {stack}
                </motion.button>
              )
            })}
          </div>

          <div className="grid gap-3 md:hidden">
            {architectureLayers.map((layer) => {
              const Icon = layerIcons[layer.id]
              const selected = activeLayer.id === layer.id
              return (
                <motion.button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    setActiveLayerId(layer.id)
                    setActiveStack(null)
                    setScanEnabled(false)
                  }}
                  className={cn(
                    "flex items-center justify-between gap-4 border p-4 text-left",
                    selected
                      ? categoryClasses[layer.category]
                      : "border-white/10 bg-white/[0.035] text-slate-300"
                  )}
                  animate={{ x: selected && !shouldReduceMotion ? 6 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
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
                </motion.button>
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

          <ActivityPanel
            layer={inspectedLayer}
            stack={focusedStack}
            scanEnabled={scanEnabled}
          />

          {focusedStack ? (
            <StackInspector
              stack={focusedStack}
              layers={hoveredStack ? previewStackLayers : selectedStackLayers}
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

function AnimatedEdge({
  edge,
  muted,
  reduceMotion,
}: {
  edge: Edge
  muted: boolean
  reduceMotion: boolean
}) {
  return (
    <motion.line
      x1={edge.from.x}
      y1={edge.from.y}
      x2={edge.to.x}
      y2={edge.to.y}
      stroke={edge.selected ? "url(#spider-edge)" : "rgb(148 163 184)"}
      strokeOpacity={muted ? 0.14 : 0.74}
      strokeWidth={edge.selected ? 0.4 : 0.18}
      vectorEffect="non-scaling-stroke"
      filter={edge.selected ? "url(#spider-glow)" : undefined}
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: muted ? 0.42 : 1,
        strokeOpacity: muted
          ? 0.14
          : reduceMotion
            ? 0.74
            : [0.42, 0.82, 0.58],
      }}
      transition={{
        pathLength: { duration: 0.55, delay: edge.delay, ease: "easeOut" },
        opacity: { duration: 0.28 },
        strokeOpacity: reduceMotion
          ? { duration: 0.2 }
          : { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  )
}

function SignalPacket({ edge }: { edge: Edge }) {
  return (
    <motion.circle
      r="0.75"
      fill="rgb(250 204 21)"
      filter="url(#spider-glow)"
      initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
      animate={{
        cx: [edge.from.x, edge.to.x],
        cy: [edge.from.y, edge.to.y],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.65,
        delay: edge.delay,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
      }}
    />
  )
}

function ActivityPanel({
  layer,
  stack,
  scanEnabled,
}: {
  layer: ArchitectureLayer
  stack: string | null
  scanEnabled: boolean
}) {
  const events = [
    stack ? `Stack focus: ${stack}` : `Layer focus: ${layer.label}`,
    `Path: ${layer.flow.join(" -> ")}`,
    `Signal: ${scanEnabled ? "live scan active" : "manual inspection"}`,
  ]

  return (
    <div className="mt-5 border border-cyan-300/15 bg-cyan-300/[0.045] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-200 uppercase">
          Live Activity
        </p>
        <Activity className="size-4 text-emerald-200" />
      </div>
      <div className="mt-3 grid gap-2">
        {events.map((event, index) => (
          <motion.div
            key={event}
            className="flex items-start gap-2 font-mono text-[11px] leading-5 text-slate-300"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <Zap className="mt-0.5 size-3 shrink-0 text-yellow-200" />
            <span>{event}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LayerInspector({ layer }: { layer: ArchitectureLayer }) {
  return (
    <motion.div
      key={layer.id}
      className="mt-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
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
    </motion.div>
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
    <motion.div
      key={stack}
      className="mt-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
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
            className={cn("border p-3", categoryClasses[layer.category])}
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
    </motion.div>
  )
}
