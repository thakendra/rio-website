"use client"

import Link from "next/link"
import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import {
  NAVY, INK, RED, MUT, MUT2, LINE, SORA,
  eyebrow, Logo, Photo, AnimatedH2, PhoneIcon,
  footerCols, SocialLinks,
} from "../full-site"
import { posts } from "./posts"

const blogNavLinks: ScrollNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "/#demands" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function BlogPage() {
  const [featured, ...rest] = posts

  return (
    <div style={{ position: "relative", overflowX: "clip", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      {/* ============ NAV ============ */}
      <MorphingScrollNavbar
        brand={<Logo height={38} />}
        brandHref="/#home"
        links={blogNavLinks}
        accent={RED}
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        actions={
          <>
            <a className="msn-button msn-icon-button" href="tel:+97714985802" aria-label="Call Rio Overseas"><PhoneIcon /></a>
            <a className="msn-button" href="/#contact" style={{ background: RED, borderColor: RED, color: "#fff" }}>Send Your Demand</a>
          </>
        }
      />

      {/* ============ HERO ============ */}
      <header style={{ position: "relative", padding: "150px 40px 50px", background: "radial-gradient(1100px 640px at 80% 12%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrow, marginBottom: 10 }}>RIO OVERSEAS BLOG</div>
          <AnimatedH2 text="Insights for working abroad" size="clamp(2.2rem, 5vw, 3.4rem)" />
          <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, maxWidth: 620, margin: "16px auto 0" }}>
            Guides, tips and updates on foreign employment — helping Nepali workers make informed, confident decisions.
          </p>
        </div>
      </header>

      {/* ============ FEATURED ============ */}
      <section style={{ background: "#fff", padding: "40px 40px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link href={`/blog/${featured.slug}`} className="reveal hov-6" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 24, overflow: "hidden", boxShadow: "0 28px 60px -40px rgba(11,36,71,.5)", textDecoration: "none" }}>
            <div style={{ position: "relative", minHeight: 320 }}>
              <Photo src={featured.image} alt={featured.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <span style={{ position: "absolute", top: 18, left: 18, background: RED, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999 }}>{featured.category}</span>
            </div>
            <div style={{ padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: MUT, marginBottom: 12 }}>{featured.date} · {featured.readTime}</div>
              <h2 style={{ fontFamily: SORA, fontWeight: 800, fontSize: 30, lineHeight: 1.15, color: NAVY, margin: "0 0 14px" }}>{featured.title}</h2>
              <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, margin: "0 0 20px" }}>{featured.excerpt}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: RED, fontWeight: 700, fontSize: 15 }}>Read article <span>→</span></span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============ POSTS GRID ============ */}
      <section style={{ background: "#fff", padding: "30px 40px 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="cols3" style={{ gap: 24 }}>
            {rest.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="reveal hov-6" style={{ transitionDelay: `${i * 60}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 46px -34px rgba(11,36,71,.5)", textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 190 }}>
                  <Photo src={p.image} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(10,46,82,.92)", color: "#fff", fontSize: 11.5, fontWeight: 700, padding: "5px 11px", borderRadius: 999 }}>{p.category}</span>
                </div>
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 10 }}>{p.date} · {p.readTime}</div>
                  <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 18, color: NAVY, lineHeight: 1.25, marginBottom: 10 }}>{p.title}</div>
                  <p style={{ fontSize: 14, color: MUT, lineHeight: 1.6, margin: "0 0 16px" }}>{p.excerpt}</p>
                  <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: RED, fontWeight: 700, fontSize: 14 }}>Read more <span>→</span></span>
                </div>
              </Link>
            ))}
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
    </div>
  )
}
