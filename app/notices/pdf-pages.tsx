"use client"

import { useEffect, useRef, useState } from "react"
import { loadPdfjs } from "@/lib/pdf-client"

const MAX_PAGES = 30
// keeps a long PDF from exhausting memory on a phone
const MAX_PIXELS_PER_PAGE = 4_000_000

/**
 * Draws a PDF with pdf.js rather than an <iframe>, because Android Chrome and many
 * phone browsers will not show a PDF inside a page.
 */
export function PdfPages({ src, title }: { src: string; title: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [hiddenPages, setHiddenPages] = useState(0)

  useEffect(() => {
    const el = host.current
    if (!el) return
    let cancelled = false
    let destroy: (() => void) | undefined
    setStatus("loading")
    setHiddenPages(0)
    el.replaceChildren()

    async function draw(container: HTMLDivElement) {
      const pdfjs = await loadPdfjs()
      const task = pdfjs.getDocument({ url: src })
      destroy = () => void task.destroy()
      const doc = await task.promise
      const pages = Math.min(doc.numPages, MAX_PAGES)
      if (!cancelled) setHiddenPages(doc.numPages - pages)

      for (let n = 1; n <= pages && !cancelled; n++) {
        const page = await doc.getPage(n)
        const base = page.getViewport({ scale: 1 })
        const sharpness = (container.clientWidth / base.width) * Math.min(window.devicePixelRatio || 1, 2)
        const scale = Math.min(Math.max(sharpness, 1.5), Math.sqrt(MAX_PIXELS_PER_PAGE / (base.width * base.height)))
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement("canvas")
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        canvas.setAttribute("aria-label", `${title}, page ${n} of ${doc.numPages}`)
        canvas.setAttribute("role", "img")
        await page.render({ canvas, viewport }).promise
        if (cancelled) return
        container.append(canvas)
        setStatus("ready")
      }
    }

    draw(el).catch(() => {
      if (!cancelled) setStatus("error")
    })
    return () => {
      cancelled = true
      destroy?.()
    }
  }, [src, title])

  return (
    <div className="nv-pdf">
      {status === "loading" && <div className="nv-pdf-msg" role="status">Loading PDF…</div>}
      {status === "error" && (
        <div className="nv-pdf-msg" role="alert">
          This PDF could not be shown here.
          <a href={src} target="_blank" rel="noopener noreferrer">Open the PDF</a>
        </div>
      )}
      <div ref={host} className="nv-pdf-pages" />
      {hiddenPages > 0 && (
        <div className="nv-pdf-msg">
          {hiddenPages} more {hiddenPages === 1 ? "page" : "pages"} in this PDF.
          <a href={src} target="_blank" rel="noopener noreferrer">Open the full PDF</a>
        </div>
      )}
    </div>
  )
}
