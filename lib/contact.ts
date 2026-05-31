import { z } from "zod"

export const signalTypes = [
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "Blockchain Project",
  "Backend System",
  "Other",
] as const

export const priorityLevels = ["Low", "Medium", "Critical"] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(4, "Subject must be at least 4 characters."),
  signalType: z.enum(signalTypes),
  priority: z.enum(priorityLevels),
  message: z.string().trim().min(12, "Message must be at least 12 characters."),
  orbitCheck: z.string().max(0, "Spam protection triggered.").optional(),
})

export type ContactPayload = z.infer<typeof contactSchema>

export function createTransmissionId() {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)

  return `EH-2026-${random.toUpperCase()}`
}
