import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Generate a unique ID
    const id = nanoid(10)

    // Store in Vercel KV with 30 day expiration
    await kv.set(`jot:${id}`, content, { ex: 60 * 60 * 24 * 30 })

    // Return the shareable URL
    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/s/${id}`

    return NextResponse.json({ id, shareUrl })
  } catch (error) {
    console.error("Error creating share:", error)
    return NextResponse.json({ error: "Failed to create share" }, { status: 500 })
  }
}
