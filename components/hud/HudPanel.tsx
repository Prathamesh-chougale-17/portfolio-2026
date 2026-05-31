import { cn } from "@/lib/utils"

export function HudPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("hud-panel rounded-lg", className)}>{children}</div>
}
