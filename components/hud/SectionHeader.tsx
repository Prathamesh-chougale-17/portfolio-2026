import { cn } from "@/lib/utils"

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: {
  label: string
  title: string
  description?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <p className="font-mono text-xs tracking-[0.24em] text-cyan-200 uppercase">
        {label}
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-balance text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
