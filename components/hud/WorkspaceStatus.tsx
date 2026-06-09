import { Activity, Database, Mail, ShieldCheck } from "lucide-react"

const rows = [
  {
    label: "Backend Core",
    value: "Online",
    icon: Database,
    color: "text-emerald-300",
  },
  {
    label: "Blockchain Node",
    value: "Synced",
    icon: ShieldCheck,
    color: "text-cyan-200",
  },
  {
    label: "Frontend Interface",
    value: "Rendered",
    icon: Activity,
    color: "text-violet-200",
  },
  {
    label: "Messages",
    value: "Open",
    icon: Mail,
    color: "text-yellow-200",
  },
]

export function WorkspaceStatus() {
  return (
    <div className="grid gap-3">
      {rows.map((row) => {
        const Icon = row.icon
        return (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.03] px-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Icon className={`size-4 ${row.color}`} />
              <span className="truncate font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase">
                {row.label}
              </span>
            </div>
            <span className="font-mono text-[11px] tracking-[0.16em] text-slate-100 uppercase">
              {row.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
