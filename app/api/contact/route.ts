import { Resend } from "resend"

import { contactSchema, createRequestId } from "@/lib/contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        {
          ok: false,
          error:
            result.error.issues[0]?.message ?? "Invalid message payload.",
        },
        { status: 400 }
      )
    }

    const requestId = createRequestId()
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL

    if (apiKey && to) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "PWSH Studio <onboarding@resend.dev>",
        to,
        subject: `[${result.data.priority}] ${result.data.subject}`,
        text: [
          `Request ID: ${requestId}`,
          `Name: ${result.data.name}`,
          `Email: ${result.data.email}`,
          `Request Type: ${result.data.requestType}`,
          `Priority: ${result.data.priority}`,
          "",
          result.data.message,
        ].join("\n"),
        replyTo: result.data.email,
      })
    }

    return Response.json({
      ok: true,
      requestId,
      delivered: Boolean(apiKey && to),
    })
  } catch {
    return Response.json(
      { ok: false, error: "Message delivery failed. Please try again." },
      { status: 500 }
    )
  }
}
