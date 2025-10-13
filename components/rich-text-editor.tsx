"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Code2,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title: string
}

const ToolbarButton = ({ onClick, isActive, children, title }: ToolbarButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className={cn(
      "h-9 w-9 p-0 transition-all duration-300 hover:scale-105",
      "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl",
      "hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-cyan-500/20",
      "group relative overflow-hidden",
      isActive && "bg-cyan-500/30 text-white border-cyan-400/50 shadow-lg shadow-cyan-500/30",
    )}
    title={title}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    <div className="relative z-10 text-white/90 group-hover:text-white">{children}</div>
  </Button>
)

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

export default function RichTextEditor() {
  const [content, setContent] = useState("")
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateActiveFormats()
  }, [])

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()

    if (document.queryCommandState("bold")) formats.add("bold")
    if (document.queryCommandState("italic")) formats.add("italic")
    if (document.queryCommandState("underline")) formats.add("underline")
    if (document.queryCommandState("insertUnorderedList")) formats.add("ul")
    if (document.queryCommandState("insertOrderedList")) formats.add("ol")

    setActiveFormats(formats)
  }, [])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
      updateActiveFormats()
    }
  }, [updateActiveFormats])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            execCommand("bold")
            break
          case "i":
            e.preventDefault()
            execCommand("italic")
            break
          case "u":
            e.preventDefault()
            execCommand("underline")
            break
        }
      }
    },
    [execCommand],
  )

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }, [execCommand])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0A0A] relative">
      <AnimatedBackground />

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden relative z-10">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/5 rounded-3xl" />

        <div className="flex items-center gap-2 p-6 bg-white/5 backdrop-blur-xl border-b border-white/10 relative">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 mr-4">
              <div className="p-2 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/30">
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </div>
              <span className="text-sm font-semibold text-white/90 font-sans">Rich Editor</span>
            </div>

            <ToolbarButton
              onClick={() => execCommand("formatBlock", "<h1>")}
              isActive={activeFormats.has("h1")}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand("formatBlock", "<h2>")}
              isActive={activeFormats.has("h2")}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand("formatBlock", "<h3>")}
              isActive={activeFormats.has("h3")}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-3 bg-white/20" />

          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => execCommand("bold")}
              isActive={activeFormats.has("bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand("italic")}
              isActive={activeFormats.has("italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand("underline")}
              isActive={activeFormats.has("underline")}
              title="Underline (Ctrl+U)"
            >
              <Underline className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-3 bg-white/20" />

          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => execCommand("insertUnorderedList")}
              isActive={activeFormats.has("ul")}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => execCommand("insertOrderedList")}
              isActive={activeFormats.has("ol")}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand("formatBlock", "<blockquote>")} title="Quote">
              <Quote className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-3 bg-white/20" />

          <div className="flex items-center gap-1">
            <ToolbarButton onClick={() => execCommand("justifyLeft")} title="Align Left">
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand("justifyCenter")} title="Align Center">
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand("justifyRight")} title="Align Right">
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <Separator orientation="vertical" className="h-6 mx-3 bg-white/20" />

          <div className="flex items-center gap-1">
            <ToolbarButton onClick={insertLink} title="Insert Link">
              <Link2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand("formatBlock", "<pre>")} title="Code Block">
              <Code2 className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseUp={updateActiveFormats}
            onKeyUp={updateActiveFormats}
            className={cn(
              "min-h-[500px] p-8 focus:outline-none relative z-10",
              "prose prose-lg max-w-none font-sans",
              "transition-all duration-300",
              "text-white/95 leading-relaxed",
              "selection:bg-cyan-500/30 selection:text-white",
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
              "hover:[&_a]:decoration-cyan-300 [&_a]:transition-colors",
              "empty:before:content-[attr(data-placeholder)] empty:before:text-white/40 empty:before:pointer-events-none",
            )}
            data-placeholder="Jot it down..."
            suppressContentEditableWarning={true}
          />
        </div>

        <div className="flex items-center justify-between px-8 py-6 bg-white/5 backdrop-blur-xl border-t border-white/10 text-sm text-white/60 relative">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Type className="h-4 w-4 text-cyan-300" />
              Words:{" "}
              <span className="text-white/90 font-medium">
                {
                  content
                    .replace(/<[^>]*>/g, "")
                    .split(/\s+/)
                    .filter(Boolean).length
                }
              </span>
            </span>
            <span className="flex items-center gap-2">
              Characters: <span className="text-white/90 font-medium">{content.replace(/<[^>]*>/g, "").length}</span>
            </span>
          </div>
          <div className="text-xs text-white/50 flex items-center gap-3">
            <kbd className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs border border-white/20">⌘B</kbd>
            <span>Bold</span>
            <kbd className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs border border-white/20">⌘I</kbd>
            <span>Italic</span>
            <kbd className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs border border-white/20">⌘U</kbd>
            <span>Underline</span>
          </div>
        </div>
      </div>
    </div>
  )
}
