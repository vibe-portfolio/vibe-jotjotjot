"use client"

import { useEffect, useState } from "react"
import { Sparkles, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-teal-900/20" />

    {/* Floating orbs with glassmorphism */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-sky-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-2000" />

    {/* Static gradient mesh */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-600/20 via-transparent to-blue-600/20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-600/20 via-transparent to-cyan-600/20" />
    </div>

    {/* Subtle noise texture */}
    <div className="absolute inset-0 opacity-[0.02] bg-noise" />
  </div>
)

export default function SharedView({ id }: { id: string }) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/share/${id}`)

        if (!response.ok) {
          setError(true)
          return
        }

        const data = await response.json()
        setContent(data.content)
      } catch (err) {
        console.error("Error fetching content:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A] relative">
        <AnimatedBackground />
        <div className="text-white/60 text-lg">Loading...</div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A] relative">
        <AnimatedBackground />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold text-white/90 mb-4">Share not found</h1>
          <p className="text-white/60 mb-6">This shared note doesn't exist or has expired.</p>
          <Link href="/">
            <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A] relative">
      <AnimatedBackground />

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden relative z-10">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/5 rounded-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white/5 backdrop-blur-xl border-b border-white/10 relative">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/30">
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>
            <span className="text-sm font-semibold text-white/90 font-sans">Shared from JotJot</span>
          </div>

          <Link href="/">
            <Button
              size="sm"
              className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded-xl"
            >
              <Home className="h-4 w-4 mr-2" />
              Create Your Own
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="relative">
          <div
            className={cn(
              "min-h-[500px] p-8 relative z-10",
              "prose prose-lg max-w-none font-sans",
              "text-white/95 leading-relaxed",
              "[&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mb-6 [&>h1]:mt-8",
              "[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-white/95 [&>h2]:mb-4 [&>h2]:mt-6",
              "[&>h3]:text-2xl [&>h3]:font-medium [&>h3]:text-white/90 [&>h3]:mb-3 [&>h3]:mt-5",
              "[&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-white/90",
              "[&>ul]:mb-6 [&>ul]:pl-6 [&>ul]:text-white/90",
              "[&>ol]:mb-6 [&>ol]:pl-6 [&>ol]:text-white/90",
              "[&>li]:mb-2 [&>li]:text-white/90",
              "[&>blockquote]:border-l-4 [&>blockquote]:border-cyan-400 [&>blockquote]:pl-6 [&>blockquote]:py-3 [&>blockquote]:italic [&>blockquote]:text-white/80 [&>blockquote]:bg-cyan-500/10 [&>blockquote]:backdrop-blur-sm [&>blockquote]:rounded-r-xl [&>blockquote]:my-6",
              "[&>pre]:bg-black/30 [&>pre]:backdrop-blur-sm [&>pre]:p-6 [&>pre]:rounded-xl [&>pre]:font-mono [&>pre]:text-sm [&>pre]:text-green-300 [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-white/10",
              "[&>code]:bg-cyan-500/20 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>code]:text-cyan-200",
              "[&_a]:text-cyan-300 [&_a]:underline [&_a]:decoration-cyan-300/50 [&_a]:underline-offset-2",
              "hover:[&_a]:decoration-cyan-300 [&_a]:transition-colors"
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center px-8 py-6 bg-white/5 backdrop-blur-xl border-t border-white/10 text-sm text-white/60 relative">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Created with JotJot - Beautiful writing, beautifully shared
          </span>
        </div>
      </div>
    </div>
  )
}
