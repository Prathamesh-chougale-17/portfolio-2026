"use client"

import { skills } from "@/data/event-horizon"

export function SkillOrbit() {
  const visibleSkills = skills.slice(0, 22)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-lg border border-cyan-300/15 bg-[#050816]/70 p-6">
      <div className="orbital-ring absolute inset-8 rounded-full opacity-70" />
      <div className="absolute inset-20 rounded-full border border-violet-300/20" />
      <div className="absolute inset-32 rounded-full border border-yellow-200/10" />
      <div className="absolute top-1/2 left-1/2 z-10 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-center shadow-[0_0_80px_rgba(34,211,238,0.25)] sm:size-36">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-200 uppercase">
            Core
          </p>
          <p className="mt-2 font-heading text-lg font-semibold text-slate-50">
            Developer
          </p>
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{ animation: "orbit-spin 44s linear infinite" }}
      >
        {visibleSkills.map((skill, index) => {
          const angle = (360 / visibleSkills.length) * index
          const radius = index % 3 === 0 ? 43 : index % 3 === 1 ? 35 : 27
          const x = 50 + Math.cos((angle * Math.PI) / 180) * radius
          const y = 50 + Math.sin((angle * Math.PI) / 180) * radius

          return (
            <span
              key={skill}
              className="absolute rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-slate-200 uppercase shadow-[0_0_18px_rgba(34,211,238,0.08)]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {skill}
            </span>
          )
        })}
      </div>
    </div>
  )
}
