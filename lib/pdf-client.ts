/** Browser-only PDF helpers. pdf.js is large, so it loads only when a PDF is actually involved. */
export async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.min.mjs", import.meta.url).toString()
  }
  return pdfjs
}

/** Renders page 1 to a JPEG so the notice card can show the paper without loading pdf.js. */
export async function renderPdfThumbnail(file: File, width = 700): Promise<Blob> {
  const pdfjs = await loadPdfjs()
  const task = pdfjs.getDocument({ data: await file.arrayBuffer() })
  try {
    const doc = await task.promise
    const page = await doc.getPage(1)
    const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width })
    const canvas = document.createElement("canvas")
    canvas.width = Math.ceil(viewport.width)
    canvas.height = Math.ceil(viewport.height)
    await page.render({ canvas, viewport }).promise
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create thumbnail"))), "image/jpeg", 0.82)
    })
  } finally {
    await task.destroy()
  }
}
