import { Mail, RadioTower, Shield, Sparkles } from "lucide-react"

import { TransmissionForm } from "@/components/contact/TransmissionForm"
import { SectionHeader } from "@/components/hud/SectionHeader"
import { profile } from "@/data/event-horizon"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Deep Space Transmission - Contact Me",
  description:
    "Send a transmission for collaborations, backend systems, blockchain products, or ambitious digital experiences.",
  path: "/contact",
})

const routes = [
  { label: "Browser", icon: Sparkles },
  { label: "API", icon: Shield },
  { label: "Mail Service", icon: RadioTower },
  { label: "Developer Inbox", icon: Mail },
]

export default function ContactPage() {
  return (
    <div id="contact-transmission" className="px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionHeader
              label="Deep Space Transmission"
              title="Send a signal for ambitious systems."
              description="Send a transmission for collaborations, backend systems, blockchain products, or ambitious digital experiences."
            />
            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-cyan-200 uppercase">
                Route preview
              </p>
              <div className="mt-5 grid gap-3">
                {routes.map((route, index) => {
                  const Icon = route.icon
                  return (
                    <div
                      key={route.label}
                      className="flex items-center justify-between border border-white/10 bg-black/20 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 text-cyan-200" />
                        <span className="font-mono text-xs tracking-[0.16em] text-slate-300 uppercase">
                          {route.label}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-yellow-300/15 bg-yellow-300/[0.055] p-5">
              <p className="font-heading text-xl font-semibold text-slate-50">
                {profile.alternativeHeroLine}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                For backend platforms, blockchain products, Web3 systems,
                cinematic interfaces, and full-stack product missions.
              </p>
            </div>
          </div>

          <TransmissionForm />
        </div>
      </div>
    </div>
  )
}
