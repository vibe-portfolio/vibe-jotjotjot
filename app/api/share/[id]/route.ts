import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Retrieve content from Vercel KV
    const content = await kv.get(`jot:${id}`)

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching share:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
