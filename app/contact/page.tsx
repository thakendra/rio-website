"use client"

import { useState } from "react"
import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import {
  NAVY, INK, RED, MUT, MUT2, LINE, LINE2, BG, SORA,
  eyebrow, h2, Logo, Ico, AnimatedH2, PhoneIcon,
  footerCols, SocialLinks,
} from "../full-site"

const contactNavLinks: ScrollNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "/#demands" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const contactRows: { icon: import("../full-site").IcoName; label: string; value: string; href?: string }[] = [
  { icon: "pin", label: "Head Office", value: "Samakhusi, Tokha-10, Kathmandu, Nepal" },
  { icon: "phone", label: "Call Us", value: "01-4985802", href: "tel:+97714985802" },
  { icon: "mail", label: "Email", value: "riooverseasnepal@gmail.com", href: "mailto:riooverseasnepal@gmail.com" },
  { icon: "globe", label: "Website", value: "riooverseasnepal.com" },
]

function ContactForm() {
  const [sent, setSent] = useState(false)
  const inputBase: React.CSSProperties = { width: "100%", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "13px 15px", fontSize: 14.5, outline: "none", color: INK, fontFamily: "inherit" }
  const lbl: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }

  if (sent) {
    return (
      <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: "48px 34px", boxShadow: "0 28px 60px -36px rgba(11,36,71,.4)", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E9F7EF", color: "#1E8A5B", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Ico name="check" size={34} sw={2.6} /></div>
        <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: NAVY, marginBottom: 8 }}>Message sent!</div>
        <p style={{ fontSize: 15, color: MUT, lineHeight: 1.6, maxWidth: 380, margin: "0 auto 24px" }}>Thank you for reaching out — our team will get back to you within one business day.</p>
        <button type="button" onClick={() => setSent(false)} style={{ background: RED, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Send another message</button>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: 34, boxShadow: "0 28px 60px -36px rgba(11,36,71,.4)" }}>
      <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: NAVY, marginBottom: 6 }}>Send us a message</div>
      <p style={{ fontSize: 13.5, color: MUT, margin: "0 0 22px" }}>Whether you are a job seeker or an employer, we&rsquo;d love to hear from you.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={lbl}>Name *</label><input required name="name" placeholder="Your name" style={inputBase} /></div>
        <div><label style={lbl}>Email *</label><input required name="email" type="email" placeholder="you@email.com" style={inputBase} /></div>
        <div><label style={lbl}>Phone *</label><input required name="phone" type="tel" placeholder="+977 ..." style={inputBase} /></div>
        <div><label style={lbl}>Subject</label><input name="subject" placeholder="How can we help?" style={inputBase} /></div>
        <div style={{ gridColumn: "1 / 3" }}>
          <label style={lbl}>Message</label>
          <textarea name="message" rows={5} placeholder="Write your message…" style={{ ...inputBase, resize: "vertical" }} />
        </div>
      </div>
      <button type="submit" className="hov-2" style={{ marginTop: 20, width: "100%", background: RED, color: "#fff", border: "none", padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>Send Message</button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div style={{ position: "relative", overflowX: "clip", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      {/* ============ NAV ============ */}
      <MorphingScrollNavbar
        brand={<Logo height={38} />}
        brandHref="/#home"
        links={contactNavLinks}
        accent={RED}
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        actions={
          <>
            <a className="msn-button msn-icon-button" href="tel:+97714985802" aria-label="Call Rio Overseas"><PhoneIcon /></a>
            <a className="msn-button" href="/#demands" style={{ background: RED, borderColor: RED, color: "#fff" }}>Send Your Demand</a>
          </>
        }
      />

      {/* ============ HERO ============ */}
      <header style={{ position: "relative", padding: "150px 40px 40px", background: "radial-gradient(1100px 640px at 80% 12%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrow, marginBottom: 10 }}>CONTACT US</div>
          <AnimatedH2 text="Let's start your journey" size="clamp(2.2rem, 5vw, 3.4rem)" />
          <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, maxWidth: 620, margin: "16px auto 0" }}>
            Visit our office in Kathmandu or reach out — our team responds within one business day.
          </p>
        </div>
      </header>

      {/* ============ CONTACT ============ */}
      <section style={{ background: "#fff", padding: "40px 40px 90px" }}>
        <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", gap: 50 }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contactRows.map((r) => {
                const inner = (
                  <>
                    <span style={{ flex: "none", width: 48, height: 48, borderRadius: 13, background: "#EAF2FD", color: RED, display: "grid", placeItems: "center" }}><Ico name={r.icon} size={22} /></span>
                    <div><div style={{ fontWeight: 700, color: NAVY, fontSize: 15.5 }}>{r.label}</div><div style={{ fontSize: 14.5, color: MUT }}>{r.value}</div></div>
                  </>
                )
                return r.href ? (
                  <a key={r.label} href={r.href} style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>{inner}</a>
                ) : (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>{inner}</div>
                )
              })}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 26, background: BG, border: `1px solid ${LINE}`, borderRadius: 12, padding: "12px 16px", fontSize: 13.5, fontWeight: 600, color: NAVY }}>
              <span style={{ color: "#1E8A5B" }}>✓</span> Govt. Licensed · License No. 1667 / 080 / 081
            </div>
            <div style={{ marginTop: 26 }}>
              <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 14, color: NAVY, marginBottom: 12 }}>Follow us</div>
              <SocialLinks light />
            </div>
            <iframe
              title="Rio Overseas Pvt. Ltd. — Kathmandu, Nepal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.719242118438!2d85.31936689999999!3d27.7362775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000fb447c1%3A0xf95708610f072f49!2sRio%20Overseas%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1783848136472!5m2!1sen!2snp"
              style={{ marginTop: 26, width: "100%", height: 260, border: 0, borderRadius: 16, display: "block" }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <ContactForm />
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
