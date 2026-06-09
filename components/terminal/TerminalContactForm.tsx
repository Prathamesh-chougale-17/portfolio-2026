"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send, ShieldCheck } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  contactSchema,
  priorityLevels,
  requestTypes,
  type ContactPayload,
} from "@/lib/contact"
import { cn } from "@/lib/utils"
import type { langtype } from "@/types/lang"

type SuccessState = {
  requestId: string
}

export function TerminalContactForm({
  languageData,
}: {
  languageData?: langtype
}) {
  const formCopy = languageData?.contact.form
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [serverError, setServerError] = useState("")
  const {
    control,
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
      <Card className="rounded-md border-emerald-300/35 bg-emerald-300/[0.06] py-0 font-mono text-emerald-50">
        <CardHeader className="px-4 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald-200" />
            <CardTitle className="text-xs tracking-[0.18em] text-emerald-100 uppercase">
              {formCopy?.success ?? "message delivered"}
            </CardTitle>
          </div>
        </CardHeader>
        <Separator className="bg-emerald-300/20" />
        <CardContent className="px-4 py-4">
          <dl className="grid gap-3 text-xs sm:grid-cols-3">
            <TerminalDatum label="path" value="browser -> api -> inbox" />
            <TerminalDatum label="request id" value={success.requestId} />
            <TerminalDatum label="status" value="delivered" />
          </dl>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSuccess(null)}
            className="mt-5 rounded-none border-emerald-300/35 bg-emerald-300/10 font-mono text-[10px] tracking-[0.16em] text-emerald-100 uppercase hover:bg-emerald-300/15"
          >
            {formCopy?.submit ?? "send another message"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-terminal-contact-form>
      <Card className="rounded-md border-[color:var(--shell-border)] bg-[var(--shell-bg)] py-0 font-mono text-slate-100">
        <CardHeader className="px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xs tracking-[0.18em] text-[var(--shell-accent-text)] uppercase">
                /contact/message
              </CardTitle>
              <p className="mt-1 text-[11px] text-slate-500">
                {formCopy?.title ??
                  "validated on submit and delivered through /api/contact"}
              </p>
            </div>
            <Badge
              variant="outline"
              className="rounded-none border-emerald-300/25 bg-emerald-300/10 text-[10px] tracking-[0.14em] text-emerald-100 uppercase"
            >
              live form
            </Badge>
          </div>
        </CardHeader>
        <Separator className="bg-[var(--shell-line)]" />
        <CardContent className="px-4 py-5">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...register("website")}
          />

          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <TerminalField
              label={formCopy?.name.label ?? "name"}
              error={errors.name?.message}
            >
              <Input
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
                placeholder={formCopy?.name.placeholder ?? "Your name"}
                className={fieldClass}
              />
            </TerminalField>
            <TerminalField
              label={formCopy?.email.label ?? "email"}
              error={errors.email?.message}
            >
              <Input
                {...register("email")}
                aria-invalid={Boolean(errors.email)}
                type="email"
                placeholder={formCopy?.email.placeholder ?? "you@example.com"}
                className={fieldClass}
              />
            </TerminalField>
            <TerminalField
              label={formCopy?.subject.label ?? "subject"}
              error={errors.subject?.message}
            >
              <Input
                {...register("subject")}
                aria-invalid={Boolean(errors.subject)}
                placeholder={
                  formCopy?.subject.placeholder ??
                  "Backend system, chain product, collaboration"
                }
                className={fieldClass}
              />
            </TerminalField>
            <TerminalField
              label="request type"
              error={errors.requestType?.message}
            >
              <Controller
                control={control}
                name="requestType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      aria-invalid={Boolean(errors.requestType)}
                      className={cn(fieldClass, "h-11 w-full rounded-none")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      align="start"
                      className="rounded-md border-[color:var(--shell-border)] bg-[var(--shell-panel)] font-mono text-slate-100"
                    >
                      {requestTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="rounded-sm text-xs"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </TerminalField>
            <TerminalField label="priority" error={errors.priority?.message}>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid gap-2 sm:grid-cols-3"
                  >
                    {priorityLevels.map((level) => (
                      <FieldLabel
                        key={level}
                        className="flex min-h-11 items-center gap-2 rounded-none border border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 text-xs text-slate-300 transition hover:border-[color:var(--shell-border-strong)]"
                      >
                        <RadioGroupItem
                          value={level}
                          aria-label={level}
                          className="border-[color:var(--shell-border-strong)] bg-[var(--shell-bg)] data-checked:bg-[var(--shell-accent)]"
                        />
                        {level}
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                )}
              />
            </TerminalField>
            <TerminalField
              label={formCopy?.message.label ?? "message"}
              error={errors.message?.message}
              className="sm:col-span-2"
            >
              <Textarea
                {...register("message")}
                aria-invalid={Boolean(errors.message)}
                rows={6}
                placeholder={
                  formCopy?.message.placeholder ??
                  "Project idea, constraints, stack, timeline, and what success should look like."
                }
                className={cn(fieldClass, "min-h-36 resize-y")}
              />
            </TerminalField>
          </FieldGroup>

          {serverError ? (
            <p className="mt-4 border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
              {serverError}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 rounded-none border-[color:var(--shell-accent)] bg-[var(--shell-accent)] px-4 py-2 text-sm font-semibold text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            {formCopy?.submit ?? "send message"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

const fieldClass =
  "rounded-none border-[color:var(--shell-border)] bg-[var(--shell-panel-soft)] px-3 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus-visible:border-[color:var(--shell-border-strong)] focus-visible:ring-2 focus-visible:ring-[color:var(--shell-accent-soft)]"

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
    <Field data-invalid={Boolean(error)} className={cn("gap-2", className)}>
      <FieldLabel className="text-[11px] tracking-[0.16em] text-slate-400 uppercase">
        {label}
      </FieldLabel>
      {children}
      <FieldError className="text-xs text-rose-200">{error}</FieldError>
    </Field>
  )
}

function TerminalDatum({ label, value }: { label: string; value: string }) {
  return (
    <Card
      size="sm"
      className="gap-1 rounded-md border-emerald-300/20 bg-black/22 py-3"
    >
      <CardContent className="px-3">
        <dt className="text-[10px] tracking-[0.16em] text-emerald-200/70 uppercase">
          {label}
        </dt>
        <dd className="mt-1 break-words text-emerald-100">{value}</dd>
      </CardContent>
    </Card>
  )
}
