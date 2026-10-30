/**
 * Notices live in Vercel Blob. There is no database: everything about a notice
 * is encoded in its pathname, so listing the store is enough to rebuild the board.
 *
 *   notices/<id>/<YYYY-MM-DD>.<base64url title>.<ext>   the photo or PDF
 *   notices/<id>/thumb.jpg                              first page of a PDF
 */
export type NoticeKind = "image" | "pdf"

export type Notice = {
  id: string
  pathname: string
  src: string
  downloadUrl: string
  /** Picture for the card: the photo itself, or the rendered first page of a PDF. */
  thumb: string | null
  kind: NoticeKind
  title: string
  date: string
  /** "5 October 2026" */
  dateLabel: string
  size: number
  uploadedAt: string
}

type StoredBlob = { pathname: string; url: string; downloadUrl: string; size: number; uploadedAt: Date }

export const MAX_FILE_BYTES = 25 * 1024 * 1024
export const MAX_THUMB_BYTES = 2 * 1024 * 1024
export const MAX_TITLE_LENGTH = 140

export const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
}

const NOTICE_PATH = /^notices\/([a-f0-9]{12})\/(\d{4}-\d{2}-\d{2})\.([A-Za-z0-9_-]{1,800})\.(pdf|jpg|jpeg|png|webp)$/
const THUMB_PATH = /^notices\/([a-f0-9]{12})\/thumb\.jpg$/
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function encodeTitle(title: string) {
  const binary = Array.from(new TextEncoder().encode(title), (b) => String.fromCharCode(b)).join("")
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function decodeTitle(encoded: string) {
  const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"))
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)))
}

export const isNoticeId = (id: string) => /^[a-f0-9]{12}$/.test(id)

export function isValidDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const parsed = new Date(`${date}T00:00:00Z`)
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date
}

export function cleanTitle(title: string) {
  return title.replace(/\s+/g, " ").trim().slice(0, MAX_TITLE_LENGTH)
}

export function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? ""
}

export function noticePath(id: string, date: string, title: string, ext: string) {
  return `notices/${id}/${date}.${encodeTitle(title)}.${ext}`
}

export const thumbPath = (id: string) => `notices/${id}/thumb.jpg`

/** The content type a pathname may be uploaded as, or null if the path is not one of ours. */
export function contentTypeForPath(pathname: string) {
  if (THUMB_PATH.test(pathname)) return "image/jpeg"
  const m = pathname.match(NOTICE_PATH)
  return m && isValidDate(m[2]) ? CONTENT_TYPES[m[4]] : null
}

export const isThumbPath = (pathname: string) => THUMB_PATH.test(pathname)

export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

export function toNotices(blobs: StoredBlob[]): Notice[] {
  const thumbs = new Map<string, string>()
  for (const blob of blobs) {
    const m = blob.pathname.match(THUMB_PATH)
    if (m) thumbs.set(m[1], blob.url)
  }

  const notices: Notice[] = []
  for (const blob of blobs) {
    const m = blob.pathname.match(NOTICE_PATH)
    if (!m || !isValidDate(m[2])) continue
    const [, id, date, encodedTitle, ext] = m
    let title: string
    try {
      title = decodeTitle(encodedTitle)
    } catch {
      continue
    }
    const kind: NoticeKind = ext === "pdf" ? "pdf" : "image"
    notices.push({
      id,
      pathname: blob.pathname,
      src: blob.url,
      downloadUrl: blob.downloadUrl,
      thumb: kind === "pdf" ? thumbs.get(id) ?? null : blob.url,
      kind,
      title,
      date,
      dateLabel: formatDate(date),
      size: blob.size,
      uploadedAt: new Date(blob.uploadedAt).toISOString(),
    })
  }

  // newest notice date first; same day = most recently uploaded first
  return notices.sort((a, b) => b.date.localeCompare(a.date) || b.uploadedAt.localeCompare(a.uploadedAt))
}
