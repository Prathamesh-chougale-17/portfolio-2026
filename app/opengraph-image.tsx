import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 72,
        background:
          "radial-gradient(circle at 70% 30%, rgba(34,211,238,0.26), transparent 320px), linear-gradient(135deg, #02030A, #050816)",
        color: "#F8FAFC",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          border: "1px solid rgba(34,211,238,0.6)",
          borderRadius: 999,
          marginBottom: 42,
        }}
      />
      <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 0.95 }}>
        Event Horizon OS
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          color: "#22D3EE",
          letterSpacing: 2,
        }}
      >
        Backend systems. Blockchain protocols. Frontend galaxies.
      </div>
    </div>,
    size
  )
}
