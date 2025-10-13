import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const content = searchParams.get("content") || "Jot it down..."

    // Strip HTML tags and get first 200 characters
    const plainText = content.replace(/<[^>]*>/g, "").substring(0, 200)

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #0A0A0A 100%)",
            position: "relative",
          }}
        >
          {/* Gradient orbs */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "20%",
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              right: "20%",
              width: "350px",
              height: "350px",
              background: "radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "80px",
              maxWidth: "1000px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px)",
              borderRadius: "40px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
                lineHeight: 1.4,
                marginBottom: "40px",
              }}
            >
              {plainText}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: 24,
                color: "rgba(6, 182, 212, 0.8)",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "rgba(6, 182, 212, 0.2)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✨
              </div>
              <span>Created with JotJot</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}
