import { Metadata } from "next"
import SharedView from "./shared-view"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  try {
    // Fetch content for metadata
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/share/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return {
        title: "JotJot - Share not found",
        description: "This shared note could not be found.",
      }
    }

    const { content } = await response.json()
    const plainText = content.replace(/<[^>]*>/g, "").substring(0, 160)

    return {
      title: `${plainText.substring(0, 60)}... | JotJot`,
      description: plainText,
      openGraph: {
        title: `${plainText.substring(0, 60)}...`,
        description: plainText,
        images: [
          {
            url: `/api/og?content=${encodeURIComponent(content)}`,
            width: 1200,
            height: 630,
            alt: "Shared note from JotJot",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${plainText.substring(0, 60)}...`,
        description: plainText,
        images: [`/api/og?content=${encodeURIComponent(content)}`],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "JotJot - Beautiful writing, beautifully shared",
      description: "A minimalist rich text editor with beautiful sharing.",
    }
  }
}

export default function SharedPage({ params }: Props) {
  return <SharedView id={params.id} />
}
