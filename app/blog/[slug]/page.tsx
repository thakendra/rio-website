"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import {
  NAVY, INK, RED, MUT, MUT2, LINE, SORA,
  Logo, Photo, PhoneIcon,
  footerCols, SocialLinks,
} from "../../full-site"
import { posts } from "../posts"

const blogNavLinks: ScrollNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "/#demands" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

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

      {/* ============ ARTICLE ============ */}
      <article style={{ background: "linear-gradient(180deg,#FBFDFF,#fff)", padding: "130px 40px 40px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: MUT, fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 22 }}>← Back to Blog</Link>
          <div style={{ display: "inline-block", background: RED, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 13px", borderRadius: 999, marginBottom: 16 }}>{post.category}</div>
          <h1 style={{ fontFamily: SORA, fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.12, letterSpacing: "-.02em", color: NAVY, margin: "0 0 18px" }}>{post.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: MUT, fontWeight: 600, marginBottom: 30 }}>
            <span>{post.author}</span><span style={{ color: "#CFE0F2" }}>•</span><span>{post.date}</span><span style={{ color: "#CFE0F2" }}>•</span><span>{post.readTime}</span>
          </div>
        </div>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: `1px solid ${LINE}`, boxShadow: "0 34px 70px -44px rgba(11,36,71,.55)" }}>
            <Photo src={post.image} alt={post.title} style={{ width: "100%", height: 420 }} />
          </div>
        </div>
      </article>

      <section style={{ background: "#fff", padding: "36px 40px 80px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {post.body.map((para, i) => (
            <p key={i} style={{ fontSize: 17.5, color: "#33455C", lineHeight: 1.8, margin: "0 0 22px" }}>{para}</p>
          ))}

          {/* CTA */}
          <div style={{ marginTop: 36, background: `linear-gradient(150deg,${NAVY},#12386a)`, borderRadius: 20, padding: "30px 32px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 20 }}>Looking for opportunities abroad?</div>
              <div style={{ fontSize: 14.5, color: MUT2, marginTop: 4 }}>Explore our live demands or get in touch with our team.</div>
            </div>
            <a href="/#demands" style={{ flex: "none", background: RED, color: "#fff", padding: "13px 26px", borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>View Demands →</a>
          </div>
        </div>
      </section>

      {/* ============ RELATED ============ */}
      <section style={{ background: "#F4F8FD", padding: "70px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: SORA, fontWeight: 800, fontSize: 26, color: NAVY, margin: "0 0 26px" }}>More from the blog</h2>
          <div className="cols3" style={{ gap: 24 }}>
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="hov-6" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 46px -34px rgba(11,36,71,.5)", textDecoration: "none", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 170 }}>
                  <Photo src={p.image} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(10,46,82,.92)", color: "#fff", fontSize: 11.5, fontWeight: 700, padding: "5px 11px", borderRadius: 999 }}>{p.category}</span>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MUT, marginBottom: 8 }}>{p.date} · {p.readTime}</div>
                  <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 17, color: NAVY, lineHeight: 1.25 }}>{p.title}</div>
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
