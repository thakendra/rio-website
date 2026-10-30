"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import {
  NAVY, INK, RED, MUT, MUT2, LINE, LINE2, BG, SORA,
  eyebrow, Logo, Ico, AnimatedH2, PhoneIcon,
  footerCols, SocialLinks,
} from "../full-site"
import type { Notice } from "@/lib/notices"
import { PdfPages } from "./pdf-pages"

const noticeNavLinks: ScrollNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "/#demands" },
  { label: "Notices", href: "/notices" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

/* ---------- tiny inline icons ---------- */
const svg = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const
const CloseIcon = () => <svg {...svg}><path d="M6 6l12 12M18 6L6 18" /></svg>
const PrevIcon = () => <svg {...svg}><path d="M15 5l-7 7 7 7" /></svg>
const NextIcon = () => <svg {...svg}><path d="M9 5l7 7-7 7" /></svg>
const DownloadIcon = () => <svg {...svg}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
const ExpandIcon = () => <svg {...svg} width={16} height={16}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
const ExternalIcon = () => <svg {...svg}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>

const STYLES = `
.nb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 26px; }
.nb-card { display: flex; flex-direction: column; text-align: left; padding: 0; background: #fff; border: 1px solid ${LINE}; border-radius: 18px; overflow: hidden; cursor: pointer; font: inherit; color: inherit; box-shadow: 0 20px 46px -36px rgba(11,36,71,.55); transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
.nb-card:focus-visible { outline: 3px solid ${RED}; outline-offset: 3px; }
.nb-thumb { position: relative; display: block; aspect-ratio: 210 / 297; background: #EEF3F9; overflow: hidden; border-bottom: 1px solid ${LINE}; }
.nb-thumb img { object-fit: contain; transition: transform .6s cubic-bezier(.22,1,.36,1); }
.nb-tags { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 8px; }
.nb-latest { background: ${RED}; color: #fff; font-size: 10.5px; font-weight: 800; letter-spacing: .1em; padding: 3px 8px; border-radius: 6px; }
.nb-view { position: absolute; right: 12px; bottom: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 7px; background: rgba(10,46,82,.92); color: #fff; font-size: 12.5px; font-weight: 700; padding: 8px 13px; border-radius: 999px; transition: background .25s ease, transform .25s ease, opacity .25s ease; }
.nb-pdf-tile { position: absolute; inset: 0; display: grid; place-items: center; color: ${NAVY}; }
.nb-kind { background: ${NAVY}; color: #fff; font-size: 10.5px; font-weight: 800; letter-spacing: .08em; padding: 3px 8px; border-radius: 6px; }
.nb-meta { display: flex; flex-direction: column; gap: 6px; padding: 16px 18px 20px; }
.nb-date { font-size: 12.5px; font-weight: 700; letter-spacing: .02em; color: ${RED}; }
.nb-title { font-family: ${SORA}; font-weight: 700; font-size: 16.5px; line-height: 1.3; color: ${NAVY}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
@media (hover: hover) {
  .nb-view { opacity: 0; transform: translateY(6px); }
  .nb-card:hover .nb-view, .nb-card:focus-visible .nb-view { opacity: 1; transform: none; }
  .nb-card:hover { transform: translateY(-6px); border-color: #C9D7E8; box-shadow: 0 30px 56px -34px rgba(11,36,71,.6); }
  .nb-card:hover .nb-thumb img { transform: scale(1.05); }
}

.nv-overlay { position: fixed; inset: 0; z-index: 300; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(7,26,46,.88); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); animation: nvFade .25s ease both; }
.nv-panel { display: flex; flex-direction: column; width: min(1040px, 100%); height: min(920px, 100%); background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 40px 100px -30px rgba(0,0,0,.7); animation: nvPop .35s cubic-bezier(.22,1,.36,1) both; }
.nv-head { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-bottom: 1px solid ${LINE}; }
.nv-title { flex: 1; min-width: 0; }
.nv-title b { display: block; font-family: ${SORA}; font-weight: 800; font-size: 17px; color: ${NAVY}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nv-title span { font-size: 12.5px; font-weight: 600; color: ${MUT}; }
.nv-count { font-size: 13px; font-weight: 700; color: ${MUT}; white-space: nowrap; }
.nv-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; min-width: 40px; padding: 0 12px; border: 1px solid ${LINE2}; background: #fff; color: ${NAVY}; border-radius: 10px; font: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; text-decoration: none; transition: background .2s ease, border-color .2s ease; }
.nv-btn:hover { background: ${BG}; border-color: #C9D7E8; }
.nv-btn:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; }
.nv-stage { position: relative; flex: 1; min-height: 0; background: #EEF3F9; touch-action: pan-y pinch-zoom; }
.nv-stage img { object-fit: contain; }
.nv-nav { position: absolute; top: 50%; z-index: 3; transform: translateY(-50%); width: 46px; height: 46px; border-radius: 50%; border: 1px solid ${LINE2}; background: rgba(255,255,255,.95); color: ${NAVY}; display: grid; place-items: center; cursor: pointer; box-shadow: 0 12px 26px -12px rgba(11,36,71,.5); transition: background .2s ease, color .2s ease, opacity .2s ease; }
.nv-nav:hover:not(:disabled) { background: ${NAVY}; color: #fff; }
.nv-nav:disabled { opacity: .35; cursor: default; }
.nv-nav:focus-visible { outline: 3px solid ${RED}; outline-offset: 2px; }
.nv-pdf { position: absolute; inset: 0; overflow: auto; -webkit-overflow-scrolling: touch; padding: 18px; }
.nv-pdf-pages { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.nv-pdf-pages canvas { display: block; width: 100%; max-width: 860px; height: auto; background: #fff; box-shadow: 0 12px 30px -18px rgba(11,36,71,.55); }
.nv-pdf-msg { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 26px 16px; text-align: center; font-size: 14.5px; font-weight: 600; color: ${MUT}; }
.nv-pdf-msg a { color: ${RED}; font-weight: 700; }
@keyframes nvFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes nvPop { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: none; } }

@media (max-width: 640px) {
  .nb-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .nb-meta { padding: 12px 12px 16px; }
  .nb-title { font-size: 14.5px; }
  .nb-view span { display: none; }
  .nb-view { padding: 8px; }
  .nv-overlay { padding: 0; }
  .nv-panel { border-radius: 0; height: 100%; }
  .nv-head { padding: 10px 12px; gap: 8px; }
  .nv-title b { font-size: 15px; }
  .nv-btn.nv-label span { display: none; }
  .nv-nav { width: 40px; height: 40px; }
  .nv-pdf { padding: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .nv-overlay, .nv-panel { animation: none; }
  .nb-card, .nb-thumb img, .nb-view { transition: none; }
}
`

/* ---------- full-screen viewer ---------- */
function Viewer({ notices, index, onClose, onGo }: { notices: Notice[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  const n = notices[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const last = notices.length - 1

  // keep the latest handlers in a ref so the key listener is attached once
  const api = useRef({ index, last, onClose, onGo })
  useEffect(() => { api.current = { index, last, onClose, onGo } })

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      const { index: i, last: l, onClose: close, onGo: go } = api.current
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight" && i < l) go(i + 1)
      else if (e.key === "ArrowLeft" && i > 0) go(i - 1)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [])

  return (
    <div className="nv-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="nv-panel" role="dialog" aria-modal="true" aria-label={n.title}>
        <div className="nv-head">
          <div className="nv-title">
            <b>{n.title}</b>
            <span>{n.dateLabel}</span>
          </div>
          {notices.length > 1 && <span className="nv-count">{index + 1} / {notices.length}</span>}
          <a className="nv-btn nv-label" href={n.src} target="_blank" rel="noopener noreferrer" title="Open the original in a new tab (pinch / zoom to read small print)">
            <ExternalIcon /><span>Full size</span>
          </a>
          <a className="nv-btn nv-label" href={n.downloadUrl} title="Download this notice">
            <DownloadIcon /><span>Download</span>
          </a>
          <button ref={closeRef} type="button" className="nv-btn" onClick={onClose} aria-label="Close notice"><CloseIcon /></button>
        </div>
        <div
          className="nv-stage"
          onTouchStart={(e) => { touchX.current = e.touches.length === 1 ? e.touches[0].clientX : null }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            // a pinched-in page pans instead of changing notice
            if ((window.visualViewport?.scale ?? 1) > 1.05) return
            if (dx < -60 && index < last) onGo(index + 1)
            else if (dx > 60 && index > 0) onGo(index - 1)
          }}
        >
          {n.kind === "pdf"
            ? <PdfPages key={n.src} src={n.src} title={n.title} />
            : <Image key={n.src} src={n.src} alt={n.title} fill sizes="(max-width: 1040px) 100vw, 1040px" quality={85} priority />}
          {notices.length > 1 && (
            <>
              <button type="button" className="nv-nav" style={{ left: 14 }} onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous notice"><PrevIcon /></button>
              <button type="button" className="nv-nav" style={{ right: 14 }} onClick={() => onGo(index + 1)} disabled={index === last} aria-label="Next notice"><NextIcon /></button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ position: "relative", overflowX: "clip", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      <style>{STYLES}</style>

      {/* ============ NAV ============ */}
      <MorphingScrollNavbar
        brand={<Logo height={38} />}
        brandHref="/#home"
        links={noticeNavLinks}
        accent={RED}
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        actions={
          <>
            <a className="msn-button msn-icon-button" href="tel:+97714985802" aria-label="Call Rio Overseas"><PhoneIcon /></a>
            <Link className="msn-button" href="/#contact" style={{ background: RED, borderColor: RED, color: "#fff" }}>Send Your Demand</Link>
          </>
        }
      />

      {/* ============ HERO ============ */}
      <header style={{ position: "relative", padding: "150px 40px 50px", background: "radial-gradient(1100px 640px at 80% 12%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrow, marginBottom: 10 }}>NOTICE BOARD</div>
          <AnimatedH2 text="Official notices & announcements" size="clamp(2.2rem, 5vw, 3.4rem)" />
          <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, maxWidth: 620, margin: "16px auto 0" }}>
            Important notices from Rio Overseas for job seekers and employers. Tap any notice to read it in full.
          </p>
        </div>
      </header>

      {/* ============ NOTICES ============ */}
      <section style={{ background: "#fff", padding: "40px 40px 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {notices.length > 0 ? (
            <>
              <div style={{ fontSize: 14, color: MUT, fontWeight: 600, marginBottom: 22 }}>
                <span style={{ color: RED, fontWeight: 800 }}>{notices.length}</span> {notices.length === 1 ? "notice" : "notices"} published
              </div>
              <div className="nb-grid">
                {notices.map((n, i) => (
                  <button
                    key={n.src}
                    type="button"
                    className="nb-card reveal"
                    style={{ transitionDelay: `${Math.min(i, 8) * 50}ms` }}
                    onClick={() => setOpen(i)}
                    aria-label={`Open ${n.kind === "pdf" ? "PDF " : ""}notice: ${n.title}, ${n.dateLabel}`}
                  >
                    <span className="nb-thumb">
                      {n.thumb
                        ? <Image src={n.thumb} alt="" fill sizes="(max-width: 640px) 50vw, 300px" />
                        : <span className="nb-pdf-tile"><Ico name="file" size={54} /></span>}
                      <span className="nb-view"><ExpandIcon /><span>View notice</span></span>
                    </span>
                    <span className="nb-meta">
                      <span className="nb-date">{n.dateLabel}</span>
                      {(i === 0 || n.kind === "pdf") && (
                        <span className="nb-tags">
                          {i === 0 && <span className="nb-latest">LATEST</span>}
                          {n.kind === "pdf" && <span className="nb-kind">PDF</span>}
                        </span>
                      )}
                      <span className="nb-title">{n.title}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="reveal" style={{ maxWidth: 640, margin: "20px auto 0", textAlign: "center", padding: "56px 30px", border: `1.5px dashed ${LINE2}`, borderRadius: 24, background: BG }}>
              <span style={{ display: "grid", placeItems: "center", width: 64, height: 64, margin: "0 auto 18px", borderRadius: 18, background: NAVY, color: "#fff" }}><Ico name="file" size={30} /></span>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: NAVY, marginBottom: 8 }}>No notices published yet</div>
              <p style={{ fontSize: 15.5, color: MUT, lineHeight: 1.65, margin: "0 auto 22px", maxWidth: 420 }}>
                New notices will appear here as soon as they are issued. For the latest updates, please contact our office.
              </p>
              <a href="tel:+97714985802" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: "#fff", padding: "13px 24px", borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>Call 01-4985802</a>
            </div>
          )}

          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 56, padding: "22px 26px", background: BG, border: `1px solid ${LINE}`, borderRadius: 18 }}>
            <div>
              <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 17, color: NAVY }}>Questions about a notice?</div>
              <div style={{ fontSize: 14.5, color: MUT, marginTop: 3 }}>Our team in Kathmandu is happy to help — call 01-4985802 or send us a message.</div>
            </div>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: RED, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Contact us <span>→</span></a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "#071A2E", padding: "64px 40px 30px", color: MUT2 }}>
        <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", gap: 40 }}>
          <div>
            <div style={{ display: "inline-flex", background: "#fff", padding: "10px 16px", borderRadius: 14, marginBottom: 18 }}><Logo height={44} /></div>
            <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: "0 0 18px" }}>Connecting Nepalese talent with global opportunities through ethical, licensed recruitment. Dream. Explore. Achieve.</p>
            <SocialLinks />
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map((lk) => (<a key={lk} href="#" className="flink" style={{ fontSize: 14, color: MUT2 }}>{lk}</a>))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1280, margin: "44px auto 0", paddingTop: 24, borderTop: "1px solid rgba(157,184,218,.14)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontSize: 13, color: "#6E8AAE" }}>© 2026 Rio Overseas Pvt. Ltd. All rights reserved.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#6E8AAE" }}><span style={{ color: "#1E8A5B" }}>✓</span> Govt. Licensed · License No. 1667/080/081 · Dept. of Foreign Employment, Nepal</div>
        </div>
      </footer>

      {open !== null && notices[open] && (
        <Viewer notices={notices} index={open} onClose={() => setOpen(null)} onGo={setOpen} />
      )}
    </div>
  )
}
