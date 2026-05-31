"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, RadioTower, Send, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  contactSchema,
  priorityLevels,
  signalTypes,
  type ContactPayload,
} from "@/lib/contact"
import { cn } from "@/lib/utils"

type SuccessState = {
  transmissionId: string
}

export function TransmissionForm() {
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [serverError, setServerError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      signalType: "Backend System",
      priority: "Medium",
      orbitCheck: "",
    },
  })

  async function onSubmit(values: ContactPayload) {
    setServerError("")
    setSuccess(null)

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const payload = (await response.json()) as {
      ok?: boolean
      transmissionId?: string
      error?: string
    }

    if (!response.ok || !payload.ok || !payload.transmissionId) {
      setServerError(payload.error ?? "Signal failed. Please try again.")
      return
    }

    setSuccess({ transmissionId: payload.transmissionId })
    reset()
  }

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-emerald-300/25 bg-emerald-300/[0.06] p-6">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-48 w-10 -translate-x-1/2 bg-gradient-to-t from-emerald-300/40 to-transparent blur-xl"
          style={{ animation: "beam-rise 2.8s ease-in-out infinite" }}
        />
        <div className="relative">
          <div className="flex size-12 items-center justify-center border border-emerald-300/40 bg-emerald-300/10 text-emerald-200">
            <ShieldCheck className="size-5" />
          </div>
          <h2 className="mt-5 font-heading text-3xl font-semibold text-slate-50">
            SIGNAL SENT
          </h2>
          <dl className="mt-6 grid gap-3 font-mono text-xs tracking-[0.16em] uppercase">
            <div className="border border-white/10 bg-black/20 p-3">
              <dt className="text-slate-500">Route</dt>
              <dd className="mt-1 text-emerald-100">
                Browser - API - Mail Service - Developer Inbox
              </dd>
            </div>
            <div className="border border-white/10 bg-black/20 p-3">
              <dt className="text-slate-500">Transmission ID</dt>
              <dd className="mt-1 text-emerald-100">
                {success.transmissionId}
              </dd>
            </div>
            <div className="border border-white/10 bg-black/20 p-3">
              <dt className="text-slate-500">Status</dt>
              <dd className="mt-1 text-emerald-100">DELIVERED</dd>
            </div>
          </dl>
          <Button
            className="mt-6 bg-emerald-300 text-slate-950 hover:bg-emerald-200"
            onClick={() => setSuccess(null)}
          >
            Send another signal
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg border border-cyan-300/15 bg-[#050816]/78 p-4 sm:p-6"
    >
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <RadioTower className="size-5 text-cyan-200" />
        <p className="font-mono text-xs tracking-[0.18em] text-slate-300 uppercase">
          Signal console
        </p>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("orbitCheck")}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Your name"
            className={fieldClass}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <input
            {...register("subject")}
            placeholder="Backend system, chain product, or collaboration"
            className={fieldClass}
          />
        </Field>
        <Field label="Signal Type" error={errors.signalType?.message}>
          <select {...register("signalType")} className={fieldClass}>
            {signalTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Priority" error={errors.priority?.message}>
          <div className="grid grid-cols-3 gap-2">
            {priorityLevels.map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 border border-white/10 bg-black/20 px-3 py-3 text-sm text-slate-300"
              >
                <input
                  type="radio"
                  value={level}
                  className="accent-cyan-300"
                  {...register("priority")}
                />
                {level}
              </label>
            ))}
          </div>
        </Field>
        <Field
          label="Message"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            rows={6}
            placeholder="Tell me about the mission, constraints, stack, timeline, and what success should look like."
            className={cn(fieldClass, "min-h-36 resize-y")}
          />
        </Field>
      </div>

      {serverError ? (
        <p className="mt-4 border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
          {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-11 w-full bg-cyan-300 text-slate-950 hover:bg-cyan-200 sm:w-auto"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Send Transmission
      </Button>
    </form>
  )
}

const fieldClass =
  "w-full rounded-none border border-white/10 bg-black/28 px-3 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/15"

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className="font-mono text-[11px] tracking-[0.16em] text-slate-400 uppercase">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs text-rose-200">{error}</span> : null}
    </label>
  )
}
