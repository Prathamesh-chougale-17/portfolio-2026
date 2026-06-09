"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  contactSchema,
  priorityLevels,
  requestTypes,
  type ContactPayload,
} from "@/lib/contact"
import { cn } from "@/lib/utils"

type SuccessState = {
  requestId: string
}

export function TerminalContactForm() {
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
      requestType: "Backend System",
      priority: "Medium",
      website: "",
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
      requestId?: string
      error?: string
    }

    if (!response.ok || !payload.ok || !payload.requestId) {
      setServerError(payload.error ?? "Message failed. Please try again.")
      return
    }

    setSuccess({ requestId: payload.requestId })
    reset()
  }

  if (success) {
    return (
      <div className="border border-emerald-300/30 bg-emerald-300/[0.06] p-4 font-mono">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-5 text-emerald-200" />
          <p className="text-xs tracking-[0.18em] text-emerald-100 uppercase">
            message delivered
          </p>
        </div>
        <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
          <TerminalDatum label="path" value="browser -> api -> inbox" />
          <TerminalDatum label="request id" value={success.requestId} />
          <TerminalDatum label="status" value="delivered" />
        </dl>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-5 border border-emerald-300/35 bg-emerald-300/10 px-3 py-2 text-[10px] tracking-[0.16em] text-emerald-100 uppercase transition hover:bg-emerald-300/15"
        >
          send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-cyan-300/20 bg-black/24 p-4 font-mono"
      data-terminal-contact-form
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs tracking-[0.18em] text-cyan-100 uppercase">
            /contact/message
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            validated on submit and delivered through /api/contact
          </p>
        </div>
        <span className="border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-[10px] tracking-[0.14em] text-emerald-100 uppercase">
          live form
        </span>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("website")}
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <TerminalField label="name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Your name"
            className={fieldClass}
          />
        </TerminalField>
        <TerminalField label="email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </TerminalField>
        <TerminalField label="subject" error={errors.subject?.message}>
          <input
            {...register("subject")}
            placeholder="Backend system, chain product, collaboration"
            className={fieldClass}
          />
        </TerminalField>
        <TerminalField label="request type" error={errors.requestType?.message}>
          <select {...register("requestType")} className={fieldClass}>
            {requestTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </TerminalField>
        <TerminalField label="priority" error={errors.priority?.message}>
          <div className="grid grid-cols-3 gap-2">
            {priorityLevels.map((level) => (
              <label
                key={level}
                className="flex min-h-11 items-center gap-2 border border-white/10 bg-black/28 px-3 text-xs text-slate-300"
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
        </TerminalField>
        <TerminalField
          label="message"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            rows={6}
            placeholder="Project idea, constraints, stack, timeline, and what success should look like."
            className={cn(fieldClass, "min-h-36 resize-y")}
          />
        </TerminalField>
      </div>

      {serverError ? (
        <p className="mt-4 border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-11 items-center gap-2 border border-cyan-300/35 bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        send message
      </button>
    </form>
  )
}

const fieldClass =
  "w-full rounded-none border border-white/10 bg-black/28 px-3 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/15"

function TerminalField({
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
      <span className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs text-rose-200">{error}</span> : null}
    </label>
  )
}

function TerminalDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/22 p-3">
      <dt className="text-[10px] tracking-[0.16em] text-slate-500 uppercase">
        {label}
      </dt>
      <dd className="mt-1 break-words text-emerald-100">{value}</dd>
    </div>
  )
}
