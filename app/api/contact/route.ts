import { Resend } from "resend"

import { contactSchema, createTransmissionId } from "@/lib/contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        {
          ok: false,
          error:
            result.error.issues[0]?.message ?? "Invalid transmission payload.",
        },
        { status: 400 }
      )
    }

    const transmissionId = createTransmissionId()
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL

    if (apiKey && to) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "Event Horizon OS <onboarding@resend.dev>",
        to,
        subject: `[${result.data.priority}] ${result.data.subject}`,
        text: [
          `Transmission ID: ${transmissionId}`,
          `Name: ${result.data.name}`,
          `Email: ${result.data.email}`,
          `Signal Type: ${result.data.signalType}`,
          `Priority: ${result.data.priority}`,
          "",
          result.data.message,
        ].join("\n"),
        replyTo: result.data.email,
      })
    }

    return Response.json({
      ok: true,
      transmissionId,
      delivered: Boolean(apiKey && to),
    })
  } catch {
    return Response.json(
      { ok: false, error: "Transmission route failed. Please try again." },
      { status: 500 }
    )
  }
}
