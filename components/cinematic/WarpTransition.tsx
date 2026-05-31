"use client"

export function WarpTransition() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-300/60 shadow-[0_0_34px_rgba(34,211,238,0.85)]"
      style={{ animation: "pulse-signal 3s ease-in-out infinite" }}
    />
  )
}
