"use client"

import { upload } from "@vercel/blob/client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useTransition } from "react"
import { BG, Ico, LINE, LINE2, Logo, MUT, NAVY, RED, SORA } from "../full-site"
import {
  CONTENT_TYPES, MAX_FILE_BYTES, MAX_TITLE_LENGTH,
  cleanTitle, fileExtension, isValidDate, noticePath, thumbPath, type Notice,
} from "@/lib/notices"
import { renderPdfThumbnail } from "@/lib/pdf-client"
import { deleteNotice, logout, publishUploads, updateNotice } from "./actions"

const UPLOAD_ROUTE = "/api/notices/upload"
const ACCEPT = Object.keys(CONTENT_TYPES).map((ext) => `.${ext}`).join(",")

type Draft = {
  key: string
  file: File
  title: string
  date: string
  preview: string | null
  thumb: Blob | null
  status: "ready" | "uploading" | "error"
  progress: number
  error: string | null
}

const STYLES = `
.db-wrap { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
.db-card { background: #fff; border: 1px solid ${LINE}; border-radius: 18px; padding: 24px; }
.db-h2 { font-family: ${SORA}; font-weight: 800; font-size: 20px; color: ${NAVY}; margin: 0; }
.db-drop { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; box-sizing: border-box; padding: 34px 20px; margin-top: 16px; border: 1.5px dashed ${LINE2}; border-radius: 14px; background: ${BG}; color: ${NAVY}; font: inherit; text-align: center; cursor: pointer; transition: background .2s ease, border-color .2s ease; }
.db-drop:hover, .db-drop.is-over { background: #E9F1FB; border-color: ${NAVY}; }
.db-drop:focus-visible, .db-btn:focus-visible, .db-input:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; }
.db-row { display: grid; grid-template-columns: 74px minmax(0, 1fr) auto; gap: 16px; align-items: center; padding: 14px 0; border-top: 1px solid ${LINE}; }
.db-row:first-child { border-top: 0; }
.db-thumb { position: relative; display: grid; place-items: center; width: 74px; aspect-ratio: 210 / 297; background: #EEF3F9; border: 1px solid ${LINE}; border-radius: 6px; overflow: hidden; color: ${NAVY}; }
.db-thumb img { width: 100%; height: 100%; object-fit: contain; display: block; }
.db-kind { position: absolute; left: 4px; bottom: 4px; background: ${NAVY}; color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; padding: 2px 5px; border-radius: 4px; }
.db-fields { display: grid; grid-template-columns: minmax(0, 1fr) 160px; gap: 10px; }
.db-label { display: block; font-size: 12px; font-weight: 700; color: ${MUT}; margin-bottom: 4px; }
.db-input { width: 100%; box-sizing: border-box; height: 42px; padding: 0 12px; border: 1px solid ${LINE2}; border-radius: 9px; background: #fff; color: ${NAVY}; font: inherit; font-size: 16px; }
.db-title { font-family: ${SORA}; font-weight: 700; font-size: 15.5px; color: ${NAVY}; overflow-wrap: anywhere; }
.db-meta { font-size: 13px; color: ${MUT}; margin-top: 3px; }
.db-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.db-btn { display: inline-flex; align-items: center; justify-content: center; height: 40px; padding: 0 14px; border: 1px solid ${LINE2}; border-radius: 9px; background: #fff; color: ${NAVY}; font: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; text-decoration: none; white-space: nowrap; }
.db-btn:hover:not(:disabled) { background: ${BG}; }
.db-btn:disabled { opacity: .55; cursor: default; }
.db-btn.is-primary { background: ${NAVY}; border-color: ${NAVY}; color: #fff; }
.db-btn.is-primary:hover:not(:disabled) { background: #0B1F3A; }
.db-btn.is-danger { color: ${RED}; }
.db-btn.is-danger-solid { background: ${RED}; border-color: ${RED}; color: #fff; }
.db-bar { height: 5px; margin-top: 8px; border-radius: 99px; background: ${LINE}; overflow: hidden; }
.db-bar > i { display: block; height: 100%; background: ${NAVY}; transition: width .2s ease; }
.db-error { color: ${RED}; font-size: 13.5px; font-weight: 600; margin-top: 8px; }
.db-banner { padding: 14px 16px; border: 1px solid #F3C7CA; border-radius: 12px; background: #FDF2F3; color: ${NAVY}; font-size: 14.5px; line-height: 1.6; }
@media (max-width: 640px) {
  .db-wrap { padding: 0 14px; }
  .db-card { padding: 18px 16px; }
  .db-row { grid-template-columns: 58px minmax(0, 1fr); gap: 12px; align-items: start; }
  .db-thumb { width: 58px; }
  .db-actions { grid-column: 1 / -1; justify-content: flex-start; }
  .db-fields { grid-template-columns: minmax(0, 1fr); }
}
`

const today = () => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

const titleFromFile = (name: string) =>
  cleanTitle(name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ")) || "Notice"

const newId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => b.toString(16).padStart(2, "0")).join("")

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

function Thumb({ src, kind }: { src: string | null; kind: "image" | "pdf" }) {
  return (
    <span className="db-thumb">
      {/* eslint-disable-next-line @next/next/no-img-element -- local object URLs and small admin previews */}
      {src ? <img src={src} alt="" /> : <Ico name="file" size={26} />}
      {kind === "pdf" && <span className="db-kind">PDF</span>}
    </span>
  )
}

/* ---------- one published notice ---------- */
function PublishedRow({ notice, onError }: { notice: Notice; onError: (message: string | null) => void }) {
  const router = useRouter()
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view")
  const [title, setTitle] = useState(notice.title)
  const [date, setDate] = useState(notice.date)
  const [pending, start] = useTransition()

  const save = () => start(async () => {
    onError(null)
    const result = await updateNotice(notice.id, title, date)
    if (!result.ok) return onError(result.error)
    setMode("view")
    router.refresh()
  })

  const remove = () => start(async () => {
    onError(null)
    const result = await deleteNotice(notice.id)
    if (!result.ok) return onError(result.error)
    router.refresh()
  })

  return (
    <div className="db-row">
      <Thumb src={notice.thumb} kind={notice.kind} />
      {mode === "edit" ? (
        <div className="db-fields">
          <div>
            <label className="db-label" htmlFor={`title-${notice.id}`}>Title</label>
            <input id={`title-${notice.id}`} className="db-input" value={title} maxLength={MAX_TITLE_LENGTH} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="db-label" htmlFor={`date-${notice.id}`}>Notice date</label>
            <input id={`date-${notice.id}`} className="db-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
      ) : (
        <div style={{ minWidth: 0 }}>
          <div className="db-title">{notice.title}</div>
          <div className="db-meta">{notice.dateLabel} · {notice.kind === "pdf" ? "PDF" : "Photo"} · {formatSize(notice.size)}</div>
        </div>
      )}
      <div className="db-actions">
        {mode === "view" && (
          <>
            <a className="db-btn" href={notice.src} target="_blank" rel="noopener noreferrer">Open</a>
            <button type="button" className="db-btn" onClick={() => setMode("edit")}>Edit</button>
            <button type="button" className="db-btn is-danger" onClick={() => setMode("delete")}>Delete</button>
          </>
        )}
        {mode === "edit" && (
          <>
            <button type="button" className="db-btn is-primary" disabled={pending || !cleanTitle(title) || !isValidDate(date)} onClick={save}>{pending ? "Saving…" : "Save"}</button>
            <button type="button" className="db-btn" disabled={pending} onClick={() => { setTitle(notice.title); setDate(notice.date); setMode("view") }}>Cancel</button>
          </>
        )}
        {mode === "delete" && (
          <>
            <button type="button" className="db-btn is-danger-solid" disabled={pending} onClick={remove}>{pending ? "Deleting…" : "Yes, delete"}</button>
            <button type="button" className="db-btn" disabled={pending} onClick={() => setMode("view")}>Keep</button>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- dashboard ---------- */
export function Dashboard({ notices, storageConnected }: { notices: Notice[]; storageConnected: boolean }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [rejected, setRejected] = useState<string[]>([])
  const [listError, setListError] = useState<string | null>(null)
  const [over, setOver] = useState(false)
  const [busy, setBusy] = useState(false)

  const patch = (key: string, change: Partial<Draft>) =>
    setDrafts((all) => all.map((d) => (d.key === key ? { ...d, ...change } : d)))

  // release preview memory when a draft goes away
  const previews = useRef(new Map<string, string>())
  useEffect(() => {
    const live = new Set(drafts.map((d) => d.key))
    for (const [key, url] of previews.current) {
      if (!live.has(key)) { URL.revokeObjectURL(url); previews.current.delete(key) }
    }
  }, [drafts])

  function addFiles(files: FileList | File[]) {
    const problems: string[] = []
    const added: Draft[] = []
    for (const file of Array.from(files)) {
      if (!CONTENT_TYPES[fileExtension(file.name)]) { problems.push(`${file.name}: only JPG, PNG, WEBP or PDF files are allowed.`); continue }
      if (file.size > MAX_FILE_BYTES) { problems.push(`${file.name}: larger than ${formatSize(MAX_FILE_BYTES)}.`); continue }
      const key = newId()
      const isPdf = fileExtension(file.name) === "pdf"
      const preview = isPdf ? null : URL.createObjectURL(file)
      if (preview) previews.current.set(key, preview)
      added.push({ key, file, title: titleFromFile(file.name), date: today(), preview, thumb: null, status: "ready", progress: 0, error: null })
      if (isPdf) {
        // a failed thumbnail is not fatal: the card falls back to a PDF icon
        renderPdfThumbnail(file).then((thumb) => {
          const url = URL.createObjectURL(thumb)
          previews.current.set(key, url)
          patch(key, { thumb, preview: url })
        }).catch(() => {})
      }
    }
    setRejected(problems)
    setDrafts((all) => [...all, ...added])
  }

  async function publish() {
    setBusy(true)
    setRejected([])
    let published = 0
    for (const draft of drafts) {
      const title = cleanTitle(draft.title)
      if (!title || !isValidDate(draft.date)) {
        patch(draft.key, { status: "error", error: "Please enter a title and a valid date." })
        continue
      }
      patch(draft.key, { status: "uploading", progress: 0, error: null })
      try {
        const id = newId()
        await upload(noticePath(id, draft.date, title, fileExtension(draft.file.name)), draft.file, {
          access: "public",
          handleUploadUrl: UPLOAD_ROUTE,
          contentType: CONTENT_TYPES[fileExtension(draft.file.name)],
          onUploadProgress: ({ percentage }) => patch(draft.key, { progress: percentage }),
        })
        if (draft.thumb) {
          await upload(thumbPath(id), draft.thumb, { access: "public", handleUploadUrl: UPLOAD_ROUTE, contentType: "image/jpeg" }).catch(() => {})
        }
        published++
        setDrafts((all) => all.filter((d) => d.key !== draft.key))
      } catch (error) {
        patch(draft.key, { status: "error", error: error instanceof Error ? error.message : "Upload failed. Please try again." })
      }
    }
    if (published > 0) {
      const result = await publishUploads()
      if (!result.ok) setListError(result.error)
      router.refresh()
    }
    setBusy(false)
  }

  return (
    <div style={{ minHeight: "100dvh", background: BG, color: NAVY, fontFamily: "var(--font-manrope), system-ui, sans-serif", paddingBottom: 60 }}>
      <style>{STYLES}</style>

      <header style={{ background: "#fff", borderBottom: `1px solid ${LINE}` }}>
        <div className="db-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", paddingTop: 14, paddingBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Logo height={36} />
            <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 16 }}>Notice dashboard</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="db-btn" href="/notices" target="_blank" rel="noopener noreferrer">View notices page</a>
            <form action={logout}><button type="submit" className="db-btn">Sign out</button></form>
          </div>
        </div>
      </header>

      <div className="db-wrap" style={{ display: "grid", gap: 22, marginTop: 26 }}>
        {!storageConnected && (
          <div className="db-banner" role="alert">
            <b>File storage is not connected yet.</b> In the Vercel project, open Storage, create a <b>public Blob store</b> and connect it to this project, then redeploy.
          </div>
        )}

        {/* ---------- upload ---------- */}
        <div className="db-card" role="region" aria-labelledby="upload-heading">
          <h1 id="upload-heading" className="db-h2">Publish a new notice</h1>
          <button
            type="button"
            className={`db-drop${over ? " is-over" : ""}`}
            disabled={!storageConnected}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setOver(true) }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => { e.preventDefault(); setOver(false); if (storageConnected) addFiles(e.dataTransfer.files) }}
          >
            <Ico name="file" size={28} />
            <b style={{ fontSize: 15.5 }}>Choose files or drop them here</b>
            <span style={{ fontSize: 13.5, color: MUT }}>A4 photo or PDF · JPG, PNG, WEBP, PDF · up to {formatSize(MAX_FILE_BYTES)} each</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            hidden
            aria-label="Choose notice files"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = "" }}
          />
          {rejected.map((problem) => <div key={problem} className="db-error" role="alert">{problem}</div>)}

          {drafts.length > 0 && (
            <div style={{ marginTop: 18 }}>
              {drafts.map((draft) => (
                <div className="db-row" key={draft.key}>
                  <Thumb src={draft.preview} kind={fileExtension(draft.file.name) === "pdf" ? "pdf" : "image"} />
                  <div style={{ minWidth: 0 }}>
                    <div className="db-fields">
                      <div>
                        <label className="db-label" htmlFor={`draft-title-${draft.key}`}>Title</label>
                        <input id={`draft-title-${draft.key}`} className="db-input" value={draft.title} maxLength={MAX_TITLE_LENGTH} disabled={busy} onChange={(e) => patch(draft.key, { title: e.target.value })} />
                      </div>
                      <div>
                        <label className="db-label" htmlFor={`draft-date-${draft.key}`}>Notice date</label>
                        <input id={`draft-date-${draft.key}`} className="db-input" type="date" value={draft.date} disabled={busy} onChange={(e) => patch(draft.key, { date: e.target.value })} />
                      </div>
                    </div>
                    {draft.status === "uploading" && <div className="db-bar" role="progressbar" aria-label={`Uploading ${draft.title}`} aria-valuenow={Math.round(draft.progress)}><i style={{ width: `${draft.progress}%` }} /></div>}
                    {draft.error && <div className="db-error" role="alert">{draft.error}</div>}
                  </div>
                  <div className="db-actions">
                    <button type="button" className="db-btn" disabled={busy} onClick={() => setDrafts((all) => all.filter((d) => d.key !== draft.key))}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <button type="button" className="db-btn is-primary" style={{ height: 46, padding: "0 22px", fontSize: 15 }} disabled={busy} onClick={publish}>
                  {busy ? "Publishing…" : `Publish ${drafts.length} ${drafts.length === 1 ? "notice" : "notices"}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- published ---------- */}
        <div className="db-card" role="region" aria-labelledby="published-heading">
          <h2 id="published-heading" className="db-h2">Published notices <span style={{ color: MUT, fontWeight: 600, fontSize: 15 }}>({notices.length})</span></h2>
          {listError && <div className="db-error" role="alert">{listError}</div>}
          {notices.length > 0 ? (
            <div style={{ marginTop: 10 }}>
              {notices.map((notice) => <PublishedRow key={notice.pathname} notice={notice} onError={setListError} />)}
            </div>
          ) : (
            <p style={{ fontSize: 14.5, color: MUT, margin: "12px 0 0" }}>Nothing published yet. Notices you publish appear here and on the public notices page.</p>
          )}
        </div>
      </div>
    </div>
  )
}
