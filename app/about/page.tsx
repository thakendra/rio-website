"use client"

import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import {
  NAVY, DEEP, INK, RED, MUT, MUT2, LINE, LINE2, BG, SORA,
  eyebrow, h2,
  Logo, Photo, Ico, AnimatedH2, PhoneIcon,
  licenseBullets, whoFeatures, missionPoints, chairman, leaders,
  employerBullets, footerCols, SocialLinks,
  type IcoName,
} from "../full-site"

const aboutNavLinks: ScrollNavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "/#demands" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export default function AboutPage() {
  return (
    <div style={{ position: "relative", overflowX: "clip", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      {/* ============ NAV ============ */}
      <MorphingScrollNavbar
        brand={<Logo height={38} />}
        brandHref="/#home"
        links={aboutNavLinks}
        accent={RED}
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        actions={
          <>
            <a className="msn-button msn-icon-button" href="tel:+97714985802" aria-label="Call Rio Overseas"><PhoneIcon /></a>
            <a className="msn-button" href="/#contact" style={{ background: RED, borderColor: RED, color: "#fff" }}>Send Your Demand</a>
          </>
        }
      />

      {/* ============ PAGE HERO ============ */}
      <header style={{ position: "relative", padding: "150px 40px 60px", background: "radial-gradient(1100px 640px at 80% 12%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 25%,black 70%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrow, marginBottom: 10 }}>ABOUT RIO OVERSEAS</div>
          <AnimatedH2 text="Who we are & what we stand for" size="clamp(2.2rem, 5vw, 3.4rem)" />
          <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, maxWidth: 640, margin: "16px auto 0" }}>
            A Government of Nepal licensed recruitment agency connecting skilled Nepalese talent with trusted employers across the Gulf, Europe and Asia.
          </p>
        </div>
      </header>

      {/* ============ WHO WE ARE / COMPANY INTRODUCTION ============ */}
      <section id="about" style={{ background: "linear-gradient(180deg,#fff,#F7FAFE)", padding: "70px 40px 90px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="split2" style={{ gap: 56, alignItems: "center" }}>
            {/* left copy */}
            <div className="reveal">
              <div style={eyebrow}>COMPANY INTRODUCTION</div>
              <h2 style={h2}>Who we are</h2>
              <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, margin: "20px 0 16px" }}>
                Rio Overseas Pvt. Ltd. is a Government of Nepal licensed overseas recruitment agency connecting skilled Nepali professionals with trusted employers across the Middle East, Europe, East Asia and beyond.
              </p>
              <p style={{ fontSize: 17.5, color: MUT, lineHeight: 1.7, margin: 0 }}>
                We believe overseas employment transforms lives, strengthens families and drives Nepal&rsquo;s growth — every deployment handled with care, transparency and full legal compliance.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 26, fontFamily: SORA, fontWeight: 700, letterSpacing: ".18em", fontSize: 13, color: NAVY }}>
                <span style={{ width: 26, height: 3, background: RED, borderRadius: 2 }} /> DREAM · EXPLORE · ACHIEVE
              </div>
            </div>
            {/* right license card */}
            <div className="reveal" style={{ position: "relative", borderRadius: 24, padding: "34px 34px 30px", background: `linear-gradient(160deg,${DEEP},#0A1A30)`, boxShadow: "0 40px 80px -40px rgba(11,36,71,.7)", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(224,30,43,.22),transparent 70%)" }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".2em", color: MUT2 }}>GOVERNMENT LICENSE NO.</div>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 40, color: "#fff", letterSpacing: "-.01em", margin: "6px 0 18px" }}>1667 / 080 / 081</div>
                <div style={{ height: 1, background: "rgba(157,184,218,.2)", marginBottom: 20 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {licenseBullets.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <span style={{ flex: "none", width: 26, height: 26, borderRadius: "50%", background: RED, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="check" size={15} sw={2.4} /></span>
                      <span style={{ fontSize: 15.5, fontWeight: 600, color: "#EAF1FA" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(157,184,218,.2)" }}>
                  <span style={{ flex: "none", width: 44, height: 44, borderRadius: 12, background: RED, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="building" size={22} /></span>
                  <span style={{ fontSize: 13.5, color: MUT2, lineHeight: 1.5 }}>Fully authorized by the Government of Nepal to recruit &amp; deploy manpower abroad.</span>
                </div>
              </div>
            </div>
          </div>

          {/* five feature chips */}
          <div className="cols5" style={{ gap: 16, marginTop: 44 }}>
            {whoFeatures.map((f, i) => (
              <div key={f.label} className="reveal hov-6" style={{ transitionDelay: `${i * 60}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: "26px 20px", textAlign: "center", boxShadow: "0 20px 44px -34px rgba(11,36,71,.5)" }}>
                <span style={{ display: "grid", placeItems: "center", width: 60, height: 60, margin: "0 auto 14px", borderRadius: 16, background: "linear-gradient(135deg,#EAF2FD,#F4F8FD)", border: `1px solid ${LINE2}`, color: RED }}><Ico name={f.icon} size={28} /></span>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 14.5, color: NAVY, lineHeight: 1.3 }}>{f.label}</div>
                <div style={{ height: 3, width: 26, background: RED, borderRadius: 2, margin: "12px auto 0" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section style={{ background: "#fff", padding: "84px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal split2" style={{ gap: 48, alignItems: "center", marginBottom: 44 }}>
            <div>
              <div style={eyebrow}>VISION &amp; MISSION</div>
              <h2 style={h2}>Guided by purpose,<br />driven by people</h2>
              <p style={{ fontSize: 17, color: MUT, lineHeight: 1.7, margin: "18px 0 0", maxWidth: 460 }}>The direction that shapes every decision we make — for the workers we deploy and the employers we serve.</p>
            </div>
            <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${LINE2}`, boxShadow: "0 34px 70px -40px rgba(11,36,71,.6)" }}>
              <Photo src="/gallery/office-front.jpg" alt="Rio Overseas office and team in Kathmandu" style={{ width: "100%", height: 460, objectPosition: "top" }} />
            </div>
          </div>
          <div className="split2" style={{ gap: 24 }}>
            {/* vision */}
            <div className="reveal" style={{ position: "relative", borderRadius: 22, padding: "34px 32px", background: `linear-gradient(160deg,${DEEP},#0A1A30)`, overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: -60, right: -40, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(157,184,218,.14)" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <span style={{ flex: "none", width: 52, height: 52, borderRadius: 14, background: RED, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="eye" size={26} /></span>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: "#fff" }}>Our Vision</div>
              </div>
              <p style={{ position: "relative", fontSize: 16.5, color: "#DCE7F4", lineHeight: 1.7, margin: 0 }}>
                To become Nepal&rsquo;s most trusted global manpower recruitment company — connecting world-class employers with Nepalese talent through ethical recruitment and exceptional service.
              </p>
            </div>
            {/* mission */}
            <div className="reveal" style={{ borderRadius: 22, padding: "34px 32px", background: BG, border: `1px solid ${LINE}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <span style={{ flex: "none", width: 52, height: 52, borderRadius: 14, background: NAVY, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="target" size={26} /></span>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: NAVY }}>Our Mission</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {missionPoints.map((m) => (
                  <div key={m} style={{ display: "flex", alignItems: "center", gap: 13, paddingBottom: 12, borderBottom: `1px dashed ${LINE2}` }}>
                    <span style={{ flex: "none", color: RED }}><Ico name="check" size={18} sw={2.4} /></span>
                    <span style={{ fontSize: 15.5, fontWeight: 600, color: INK }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEADERSHIP MESSAGES ============ */}
      <section id="leadership" style={{ background: "linear-gradient(180deg,#F7FAFE,#fff)", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 50px" }}>
            <div style={eyebrow}>MESSAGE FROM LEADERSHIP</div>
            <AnimatedH2 text="The people behind Rio Overseas" />
          </div>

          {/* featured chairman */}
          <div className="reveal split2" style={{ gap: 40, alignItems: "stretch", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 24, overflow: "hidden", boxShadow: "0 34px 70px -44px rgba(11,36,71,.55)", marginBottom: 24 }}>
            <div style={{ position: "relative", minHeight: 380 }}>
              <Photo src={chairman.img} alt={`${chairman.name}, ${chairman.role}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
              <div style={{ position: "absolute", left: 0, bottom: 0, padding: "10px 18px", background: RED, color: "#fff", fontFamily: SORA, fontWeight: 700, fontSize: 13, letterSpacing: ".08em", borderTopRightRadius: 12 }}>{chairman.role.toUpperCase()}</div>
            </div>
            <div style={{ padding: "40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ color: RED, opacity: .9 }}><Ico name="quote" size={38} sw={1.4} /></span>
              <p style={{ fontSize: 17, color: INK, lineHeight: 1.75, margin: "14px 0 22px", fontStyle: "italic" }}>&ldquo;{chairman.quote}&rdquo;</p>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: NAVY }}>{chairman.name}</div>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: RED, marginBottom: 14 }}>{chairman.role} · Rio Overseas Pvt. Ltd.</div>
              <div style={{ display: "flex", gap: 22, flexWrap: "wrap", fontSize: 13.5, color: MUT, fontWeight: 600 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ color: NAVY }}><Ico name="phone" size={16} /></span>{chairman.phone}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ color: NAVY }}><Ico name="mail" size={16} /></span>{chairman.email}</span>
              </div>
            </div>
          </div>

          {/* other three leaders */}
          <div className="cols3" style={{ gap: 24 }}>
            {leaders.map((l, i) => (
              <div key={l.name} className="reveal hov-6" style={{ transitionDelay: `${i * 70}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 54px -40px rgba(11,36,71,.5)" }}>
                <div style={{ position: "relative", height: 240 }}>
                  <Photo src={l.img} alt={`${l.name}, ${l.role}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectPosition: "center 22%" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(10,26,48,.82))" }} />
                  <div style={{ position: "absolute", left: 20, bottom: 16, color: "#fff" }}>
                    <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 19 }}>{l.name}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#FFC2C7", letterSpacing: ".04em" }}>{l.role}</div>
                  </div>
                </div>
                <div style={{ padding: "22px 24px 26px" }}>
                  <span style={{ color: RED, opacity: .85 }}><Ico name="quote" size={24} sw={1.4} /></span>
                  <p style={{ fontSize: 14.5, color: MUT, lineHeight: 1.65, margin: "8px 0 0" }}>&ldquo;{l.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>

          {/* back to home */}
          <div style={{ textAlign: "center", marginTop: 46 }}>
            <a href="/#home" className="btn-red" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: RED, color: "#fff", padding: "15px 28px", borderRadius: 999, fontSize: 15.5, fontWeight: 700, boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>← Back to Home</a>
          </div>
        </div>
      </section>

      {/* ============ EMPLOYERS ============ */}
      <section id="employers" style={{ background: BG, padding: "90px 40px" }}>
        <div className="split2" style={{ maxWidth: 1280, margin: "0 auto", gap: 56, alignItems: "center" }}>
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${LINE2}`, boxShadow: "0 34px 70px -40px rgba(11,36,71,.6)" }}>
              <Photo src="/gallery/team-2.jpg" alt="Rio Overseas team ready to serve employers" style={{ width: "100%", height: 380 }} />
            </div>
            <div style={{ position: "absolute", bottom: -22, right: -14, background: NAVY, borderRadius: 16, padding: "18px 22px", boxShadow: "0 24px 50px -22px rgba(11,36,71,.6)", animation: "floaty2 6s ease-in-out infinite" }}>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: "#fff" }}>14 days</div>
              <div style={{ fontSize: 12, color: MUT2, fontWeight: 600 }}>avg. deployment time</div>
            </div>
          </div>
          <div className="reveal">
            <div style={eyebrow}>FOR EMPLOYERS</div>
            <h2 style={{ ...h2, fontSize: 40, margin: "0 0 16px" }}>Submit your manpower demand</h2>
            <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "0 0 22px" }}>From demand letter to arrival on site — one accountable channel. Send us your requirement and receive a screened, trade-tested shortlist, with every step handled compliantly.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
              {[["Reply within 24 hours", "clock"], ["Shortlist within 72 hours", "search"]].map(([t, ic]) => (
                <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 999, padding: "9px 16px", fontSize: 13.5, fontWeight: 700, color: NAVY }}>
                  <span style={{ color: RED }}><Ico name={ic as IcoName} size={16} /></span>{t}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {employerBullets.map((b) => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ flex: "none", width: 30, height: 30, borderRadius: 9, background: "#EAF2FD", color: NAVY, display: "grid", placeItems: "center", fontSize: 15 }}>{b.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: INK }}>{b.text}</span>
                </div>
              ))}
            </div>
            <a href="/#contact" className="btn-navy" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: NAVY, color: "#fff", padding: "16px 30px", borderRadius: 999, fontSize: 16, fontWeight: 700, transition: "transform .2s ease" }}>Submit Your Demand <span>→</span></a>
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
