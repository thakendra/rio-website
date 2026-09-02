"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { HeroGlobe } from "@/components/rio/hero-globe"
import { UnderConstructionTopBar, UnderConstructionHeroBanner } from "@/components/rio/under-construction-banner"

/* ---------------- palette ---------------- */
const NAVY = "#0A2E52"
const INK = "#0A2540"
const RED = "#E01E2B"
const BLUE2 = "#5CA0FF"
const MUT = "#5C6B80"
const MUT2 = "#9DB8DA"
const LINE = "#E9F0F8"
const LINE2 = "#E2EAF3"
const BG = "#F4F8FD"
const SORA = "var(--font-sora), sans-serif"

/* ---------------- brand logo ---------------- */
function Logo({ height = 46 }: { height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Rio Overseas Pvt. Ltd."
      style={{ height, width: "auto", display: "block", mixBlendMode: "multiply" }}
    />
  )
}

/* ---------------- flag image (flagcdn — renders on every OS, unlike flag emoji) ---------------- */
function Flag({ code, h, title }: { code: string; h: number; title?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      alt={title || code}
      title={title}
      style={{ height: h, width: "auto", borderRadius: 3, boxShadow: "0 0 0 1px rgba(0,0,0,.1)", display: "inline-block", verticalAlign: "middle" }}
    />
  )
}

/* ---------------- count-up ---------------- */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [text, setText] = useState("0")
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false
    const run = () => {
      if (done) return
      done = true
      const dur = 2000
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur)
        const e = 1 - Math.pow(1 - t, 3)
        setText(Math.round(value * e).toLocaleString("en-US") + suffix)
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
    const check = () => el.getBoundingClientRect().top < window.innerHeight * 0.9 && run()
    check()
    window.addEventListener("scroll", check, { passive: true })
    const t = setTimeout(run, 1600) // safety net
    return () => {
      window.removeEventListener("scroll", check)
      clearTimeout(t)
    }
  }, [value, suffix])
  return <span ref={ref}>{text}</span>
}

/* ---------------- data ---------------- */
const heroFeatures = [
  { icon: "👥", title: "RIGHT PEOPLE", desc: "Skilled & reliable talent" },
  { icon: "🛡️", title: "TRUST & INTEGRITY", desc: "Committed to ethics" },
  { icon: "⚙️", title: "RIGHT JOBS", desc: "Matched to the right role" },
  { icon: "🌍", title: "GLOBAL REACH", desc: "Gulf, Europe & Asia" },
  { icon: "📈", title: "BETTER FUTURES", desc: "A stronger tomorrow" },
]
const countries = [
  { code: "ae", name: "UAE" },
  { code: "qa", name: "Qatar" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "kw", name: "Kuwait" },
  { code: "om", name: "Oman" },
  { code: "bh", name: "Bahrain" },
  { code: "hr", name: "Croatia" },
  { code: "ro", name: "Romania" },
]
const counters = [
  { value: 25, suffix: "+", label: "Destination Countries" },
  { value: 10000, suffix: "+", label: "Workers Deployed" },
  { value: 500, suffix: "+", label: "Employer Companies" },
  { value: 15, suffix: "+", label: "Years of Experience" },
]
const licenses = ["Dept. of Foreign Employment", "Foreign Employment Board", "ISO Certified", "NAFEA Member"]
const countryStats = [
  { code: "sa", name: "Saudi Arabia", workers: "5,000+", workersLabel: "Workers deployed", tag: "High Demand" },
  { code: "ae", name: "United Arab Emirates", workers: "3,200+", workersLabel: "Workers deployed", tag: "Popular" },
  { code: "qa", name: "Qatar", workers: "2,100+", workersLabel: "Workers deployed", tag: "Active" },
  { code: "kw", name: "Kuwait", workers: "1,400+", workersLabel: "Workers deployed", tag: "Active" },
  { code: "om", name: "Oman", workers: "900+", workersLabel: "Workers deployed", tag: "Steady" },
  { code: "bh", name: "Bahrain", workers: "600+", workersLabel: "Workers deployed", tag: "Steady" },
  { code: "hr", name: "Croatia", workers: "New", workersLabel: "Europe expansion", tag: "Europe" },
  { code: "ro", name: "Romania", workers: "Growing", workersLabel: "Rising demand", tag: "Europe" },
]
const industries = [
  { icon: "👷", name: "Construction", desc: "Masons, helpers, foremen & site crews." },
  { icon: "🏥", name: "Healthcare", desc: "Nurses, caregivers & support staff." },
  { icon: "🏨", name: "Hospitality", desc: "Hotel, kitchen & service teams." },
  { icon: "🏭", name: "Manufacturing", desc: "Factory operators & technicians." },
  { icon: "🛠️", name: "Skilled Trade", desc: "Welders, electricians & plumbers." },
  { icon: "🚛", name: "Logistics", desc: "Drivers, warehouse & delivery." },
  { icon: "🛢️", name: "Oil & Gas", desc: "Rig crews & field specialists." },
  { icon: "🌾", name: "Agriculture", desc: "Farm & greenhouse workers." },
]
type Job = { title: string; country: string; code: string; salary: string; salaryNum: number; industry: string }
const jobs: Job[] = [
  { title: "Welder", country: "Saudi Arabia", code: "sa", salary: "$1,200", salaryNum: 1200, industry: "Skilled Trade" },
  { title: "Electrician", country: "Qatar", code: "qa", salary: "$1,400", salaryNum: 1400, industry: "Skilled Trade" },
  { title: "Hotel Staff", country: "Croatia", code: "hr", salary: "€1,600", salaryNum: 1600, industry: "Hospitality" },
  { title: "Plumber", country: "UAE", code: "ae", salary: "$1,100", salaryNum: 1100, industry: "Construction" },
  { title: "Mason", country: "Kuwait", code: "kw", salary: "$950", salaryNum: 950, industry: "Construction" },
  { title: "Nurse", country: "Oman", code: "om", salary: "$1,500", salaryNum: 1500, industry: "Healthcare" },
  { title: "Heavy Driver", country: "Qatar", code: "qa", salary: "$1,300", salaryNum: 1300, industry: "Logistics" },
  { title: "Security Guard", country: "Saudi Arabia", code: "sa", salary: "$900", salaryNum: 900, industry: "Hospitality" },
]
const processSteps = [
  { num: "1", name: "Demand", desc: "Employer submits manpower request." },
  { num: "2", name: "Apply", desc: "Candidates sourced & shortlisted." },
  { num: "3", name: "Interview", desc: "Skill & language screening." },
  { num: "4", name: "Medical", desc: "Certified health check-up." },
  { num: "5", name: "Visa", desc: "Documentation & stamping." },
  { num: "6", name: "Orientation", desc: "Pre-departure training." },
  { num: "7", name: "Flight", desc: "Ticketing & travel arranged." },
  { num: "8", name: "Deployment", desc: "On-site & ongoing support." },
]
const employerBullets = [
  { icon: "🔍", text: "Candidate Screening" },
  { icon: "🔧", text: "Trade Testing" },
  { icon: "📄", text: "Documentation" },
  { icon: "🛂", text: "Visa Processing" },
  { icon: "⚡", text: "Fast Deployment" },
]
const seekerServices = [
  { icon: "💬", name: "Career Consultation", desc: "Guidance to match your skills abroad." },
  { icon: "🛂", name: "Visa Assistance", desc: "End-to-end visa handling." },
  { icon: "🩺", name: "Medical Coordination", desc: "Certified pre-departure checks." },
  { icon: "📄", name: "Documentation", desc: "Paperwork prepared & verified." },
  { icon: "✈️", name: "Air Ticketing", desc: "Flights booked & confirmed." },
  { icon: "🎓", name: "Pre-Departure", desc: "Orientation before you fly." },
  { icon: "📞", name: "Ongoing Support", desc: "We stay with you on arrival." },
  { icon: "🤝", name: "Fair Placement", desc: "Transparent, ethical terms." },
]
const whyCards = [
  { icon: "⚖️", title: "Ethical Recruitment", desc: "Zero-exploitation hiring with fair, transparent terms for every worker." },
  { icon: "🏛️", title: "Government Compliance", desc: "Fully licensed and compliant with Nepal and destination regulations." },
  { icon: "⚡", title: "Fast Processing", desc: "Streamlined pipeline gets qualified workers deployed quickly." },
  { icon: "👨‍💼", title: "Professional Team", desc: "Experienced consultants dedicated to every placement." },
  { icon: "🔗", title: "Transparent Communication", desc: "Clear updates for both employers and job seekers, always." },
  { icon: "🛡️", title: "End-to-End Support", desc: "From application to arrival and beyond, we are with you." },
]
const stories = [
  { name: "Ram B.K.", initials: "RB", role: "Electrician", route: "Nepal → Qatar", salary: "$1,400", quote: "Rio Overseas changed my life. The process was honest and smooth, and today I support my whole family from abroad." },
  { name: "Sita Tamang", initials: "ST", role: "Hotel Supervisor", route: "Nepal → Croatia", salary: "€1,600", quote: "From paperwork to my flight, everything was handled with care. I felt supported at every single step." },
  { name: "Bikash Rai", initials: "BR", role: "Welder", route: "Nepal → Saudi Arabia", salary: "$1,200", quote: "A trustworthy team that kept every promise. My skills finally found the opportunity they deserved." },
]
const impactStats = [
  { value: 10000, suffix: "+", label: "Workers" },
  { value: 500, suffix: "+", label: "Employers" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 98, suffix: "%", label: "Visa Success" },
  { value: 15, suffix: "+", label: "Years" },
]
const faqs = [
  { q: "Is Rio Overseas government licensed?", a: "Yes. We are fully licensed by the Department of Foreign Employment, Nepal, and operate in strict compliance with national and destination-country regulations." },
  { q: "How much does it cost a job seeker?", a: "We follow ethical, transparent pricing in line with government guidelines. All fees are explained clearly up front with no hidden charges." },
  { q: "Which countries do you deploy to?", a: "We deploy across the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain) and are expanding into Europe including Croatia and Romania." },
  { q: "How long does the process take?", a: "From selection to deployment typically takes a few weeks depending on visa and medical timelines. Our average deployment time is around 14 days once documents are ready." },
  { q: "Do you support workers after they arrive?", a: "Absolutely. Our support continues after arrival, with coordination between the worker and employer to ensure a smooth transition." },
  { q: "How can employers request workers?", a: "Employers can submit a manpower demand through our contact form or office. We handle screening, testing, documentation and deployment end to end." },
]
const socials = ["f", "in", "📷", "▶"]
const footerCols = [
  { title: "Company", links: ["About Us", "Why Rio Overseas", "Success Stories", "Careers", "Contact"] },
  { title: "For You", links: ["Find Jobs", "For Employers", "Recruitment Process", "Job Seeker Services", "FAQ"] },
  { title: "Countries", links: ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Croatia", "Romania"] },
]
const navLinks = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Services", "#services"],
  ["Jobs", "#jobs"],
  ["Countries", "#countries"],
  ["Employers", "#employers"],
  ["Contact", "#contact"],
]
const eyebrow: React.CSSProperties = { fontFamily: SORA, fontSize: 13, fontWeight: 700, letterSpacing: ".22em", color: RED, marginBottom: 14 }
const h2: React.CSSProperties = { fontFamily: SORA, fontWeight: 800, fontSize: 44, lineHeight: 1.08, letterSpacing: "-.02em", color: NAVY, margin: 0 }

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [filter, setFilter] = useState({ q: "", country: "all", industry: "all", salary: 0 })

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (!filter.q || j.title.toLowerCase().includes(filter.q)) &&
          (filter.country === "all" || j.country === filter.country) &&
          (filter.industry === "all" || j.industry === filter.industry) &&
          j.salaryNum >= filter.salary,
      ),
    [filter],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ position: "relative", overflowX: "hidden", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      <UnderConstructionTopBar />

      {/* ============ NAV ============ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          padding: scrolled ? "10px 40px" : "14px 40px",
          background: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderBottom: `1px solid ${scrolled ? "rgba(226,234,243,1)" : "rgba(226,234,243,0)"}`,
          boxShadow: scrolled ? "0 10px 30px -18px rgba(11,36,71,.35)" : "none",
          transition: "all .35s ease",
        }}
      >
        <a href="#home"><Logo height={46} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className="navlink" style={{ fontSize: 15, fontWeight: 600, color: INK }}>{label}</a>
          ))}
          <a href="#contact" className="btn-red" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: RED, color: "#fff", padding: "12px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, boxShadow: "0 10px 24px -8px rgba(224,30,43,.6)", transition: "all .2s ease" }}>
            Apply Now <span style={{ fontSize: 16 }}>→</span>
          </a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <header id="home" style={{ position: "relative", padding: "150px 40px 90px", background: "radial-gradient(1200px 700px at 78% 18%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 20%,black 60%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 20%,black 60%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, left: 0, fontSize: 26, color: "#9DB4D0", animation: "skyPlane 26s linear infinite", pointerEvents: "none" }}>✈️</div>

        <div className="hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          {/* LEFT */}
          <div>
            <UnderConstructionHeroBanner />
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <span style={{ fontFamily: SORA, fontSize: 14, fontWeight: 700, letterSpacing: ".22em", color: RED }}>YOUR TRUSTED PARTNER IN</span>
              <span style={{ width: 70, height: 2, background: "linear-gradient(90deg,#E01E2B,rgba(224,30,43,0))" }} />
              <span style={{ color: RED, fontSize: 16 }}>✈️</span>
            </div>
            <h1 className="reveal hero-h1" style={{ fontFamily: SORA, fontWeight: 800, fontSize: 78, lineHeight: ".96", letterSpacing: "-.02em", margin: "0 0 6px", color: NAVY }}>
              GLOBAL<br /><span style={{ color: RED }}>OPPORTUNITIES</span>
            </h1>
            <p className="reveal" style={{ fontFamily: SORA, fontWeight: 600, fontSize: 24, color: NAVY, margin: "14px 0" }}>Connecting Nepalese talent. Building brighter futures.</p>
            <p className="reveal" style={{ fontSize: 17.5, lineHeight: 1.6, color: MUT, maxWidth: 490, margin: "0 0 26px" }}>
              Ethical, government-licensed recruitment that opens doors across the Middle East, Europe and beyond — matching the right people with the right opportunities.
            </p>
            <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 26px", maxWidth: 490, marginBottom: 34 }}>
              {["Licensed & Govt. Approved", "Ethical Recruitment", "Global Reach, Local Support", "End-to-End Guidance"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ flex: "none", width: 24, height: 24, borderRadius: "50%", background: NAVY, color: "#fff", display: "grid", placeItems: "center", fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: INK }}>{t}</span>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
              <a href="#jobs" className="btn-red" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: RED, color: "#fff", padding: "17px 30px", borderRadius: 999, fontSize: 16, fontWeight: 700, boxShadow: "0 16px 34px -12px rgba(224,30,43,.65)", transition: "all .2s ease" }}>Explore Jobs <span style={{ fontSize: 18 }}>→</span></a>
              <a href="#employers" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: NAVY, padding: "16px 28px", borderRadius: 999, fontSize: 16, fontWeight: 700, border: `1.5px solid ${NAVY}`, transition: "all .2s ease" }}>Hire Talent</a>
              <a href="#about" style={{ display: "inline-flex", alignItems: "center", gap: 12, color: NAVY, fontWeight: 700, fontSize: 15 }}>
                <span style={{ width: 48, height: 48, borderRadius: "50%", border: `1.5px solid ${NAVY}`, display: "grid", placeItems: "center", fontSize: 14 }}>▶</span>
                <span>Watch Our Video<br /><span style={{ fontWeight: 500, fontSize: 13, color: MUT }}>Who We Are</span></span>
              </a>
            </div>
          </div>

          {/* RIGHT: OUR GLOBE */}
          <div className="reveal hero-globe-col" style={{ position: "relative", height: 560 }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "72%", height: "72%", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,111,224,.18) 0%,rgba(30,111,224,0) 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <HeroGlobe className="w-full max-w-[520px]" />
            </div>
            {/* floating city chips */}
            <div style={{ position: "absolute", top: "34%", left: "2%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)", border: `1px solid ${LINE2}`, borderRadius: 12, padding: "8px 13px", boxShadow: "0 14px 30px -14px rgba(11,36,71,.3)", animation: "floaty 6s ease-in-out infinite" }}>
              <Flag code="ae" h={14} /> <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>Dubai</span>
            </div>
            <div style={{ position: "absolute", top: "12%", left: "42%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)", border: `1px solid ${LINE2}`, borderRadius: 12, padding: "8px 13px", boxShadow: "0 14px 30px -14px rgba(11,36,71,.3)", animation: "floaty2 5s ease-in-out infinite" }}>
              <Flag code="ro" h={14} /> <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>Bucharest</span>
            </div>
            <div style={{ position: "absolute", top: "44%", right: "0%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)", border: `1px solid ${LINE2}`, borderRadius: 12, padding: "8px 13px", boxShadow: "0 14px 30px -14px rgba(11,36,71,.3)", animation: "floaty 7s ease-in-out infinite" }}>
              <Flag code="qa" h={14} /> <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>Doha</span>
            </div>
            <div style={{ position: "absolute", bottom: "10%", left: "8%", display: "flex", flexDirection: "column", gap: 2, background: "rgba(10,46,82,.94)", backdropFilter: "blur(10px)", borderRadius: 14, padding: "12px 16px", boxShadow: "0 18px 40px -16px rgba(11,36,71,.6)", animation: "floaty2 6.5s ease-in-out infinite" }}>
              <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1 }}>98%</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: MUT2, letterSpacing: ".05em" }}>VISA SUCCESS</span>
            </div>
          </div>
        </div>

        {/* features strip */}
        <div className="reveal cols5" style={{ position: "relative", maxWidth: 1280, margin: "60px auto 0", background: "linear-gradient(120deg,#0A2E52,#0B2447)", borderRadius: 22, padding: "30px 26px", gap: 10, boxShadow: "0 34px 70px -30px rgba(11,36,71,.6)" }}>
          {heroFeatures.map((f) => (
            <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "6px 14px", borderRight: "1px solid rgba(255,255,255,.08)" }}>
              <span style={{ flex: "none", width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(157,184,218,.3)", display: "grid", placeItems: "center", fontSize: 20 }}>{f.icon}</span>
              <div>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 14, color: "#fff", letterSpacing: ".02em" }}>{f.title}</div>
                <div style={{ fontSize: 12.5, color: MUT2, lineHeight: 1.4, marginTop: 3 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ============ COUNTRIES STRIP ============ */}
      <section id="countries" style={{ background: "#fff", padding: "48px 40px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 20, color: NAVY, lineHeight: 1.1, flex: "none" }}>COUNTRIES<br />WE SERVE</div>
          <div style={{ display: "flex", gap: 34, flexWrap: "wrap", flex: 1, justifyContent: "space-between" }}>
            {countries.map((c) => (
              <div key={c.name} className="reveal hov-6" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <span style={{ filter: "drop-shadow(0 8px 14px rgba(11,36,71,.25))" }}><Flag code={c.code} h={30} title={c.name} /></span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em", color: MUT, textTransform: "uppercase" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUSTED / COUNTERS ============ */}
      <section id="about" style={{ background: "linear-gradient(180deg,#fff,#F4F8FD)", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 54px" }}>
            <div style={eyebrow}>TRUSTED &amp; LICENSED</div>
            <h2 style={h2}>A gateway built on trust &amp; results</h2>
            <p style={{ fontSize: 17, color: MUT, lineHeight: 1.6, margin: "16px 0 0" }}>Government-licensed by the Department of Foreign Employment and accredited across the Gulf and Europe — delivering ethical recruitment at scale for over 15 years.</p>
          </div>
          <div className="cols4" style={{ gap: 20 }}>
            {counters.map((s, i) => (
              <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 70}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: "34px 26px", textAlign: "center", boxShadow: "0 20px 44px -30px rgba(11,36,71,.4)" }}>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 46, color: NAVY, lineHeight: 1 }}><Counter value={s.value} suffix={s.suffix} /></div>
                <div style={{ height: 3, width: 38, background: RED, borderRadius: 2, margin: "14px auto 12px" }} />
                <div style={{ fontSize: 14.5, fontWeight: 600, color: MUT }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 40 }}>
            {licenses.map((l) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 999, padding: "10px 20px", fontSize: 13.5, fontWeight: 600, color: NAVY, boxShadow: "0 10px 24px -18px rgba(11,36,71,.4)" }}>
                <span style={{ color: "#1E8A5B", fontSize: 15 }}>✓</span>{l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHERE WE DEPLOY ============ */}
      <section style={{ background: NAVY, padding: "90px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 12% 20%,rgba(30,111,224,.22),transparent 40%),radial-gradient(circle at 90% 80%,rgba(224,30,43,.16),transparent 42%)" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ maxWidth: 640, marginBottom: 44 }}>
            <div style={{ ...eyebrow, color: BLUE2 }}>WHERE WE DEPLOY</div>
            <h2 style={{ ...h2, color: "#fff" }}>Careers across the Gulf &amp; Europe</h2>
          </div>
          <div className="cols4" style={{ gap: 18 }}>
            {countryStats.map((c, i) => (
              <div key={c.name} className="reveal hov-8" style={{ transitionDelay: `${i * 70}ms`, background: "rgba(255,255,255,.05)", border: "1px solid rgba(157,184,218,.18)", borderRadius: 18, padding: "26px 22px", backdropFilter: "blur(8px)", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <Flag code={c.code} h={28} title={c.name} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: BLUE2, background: "rgba(30,111,224,.16)", padding: "5px 11px", borderRadius: 999 }}>{c.tag}</span>
                </div>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 19, color: "#fff", marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 26, color: "#fff", lineHeight: 1 }}>{c.workers}</div>
                <div style={{ fontSize: 13, color: MUT2, marginTop: 6 }}>{c.workersLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section id="services" style={{ background: BG, padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
            <div style={eyebrow}>SECTORS WE SERVE</div>
            <h2 style={h2}>Skilled workforce, every industry</h2>
          </div>
          <div className="cols4" style={{ gap: 18 }}>
            {industries.map((it, i) => (
              <div key={it.name} className="reveal hov-8" style={{ transitionDelay: `${i * 70}ms`, position: "relative", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: "30px 24px", overflow: "hidden", cursor: "pointer" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 90, height: 90, borderRadius: "50%", background: "radial-gradient(circle,rgba(224,30,43,.1),transparent 70%)" }} />
                <span style={{ display: "grid", placeItems: "center", width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg,#EAF2FD,#F4F8FD)", border: `1px solid ${LINE2}`, fontSize: 26, marginBottom: 18 }}>{it.icon}</span>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 18, color: NAVY, marginBottom: 6 }}>{it.name}</div>
                <div style={{ fontSize: 13.5, color: MUT, lineHeight: 1.5 }}>{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOBS ============ */}
      <section id="jobs" style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ maxWidth: 600 }}>
              <div style={eyebrow}>OPEN POSITIONS</div>
              <h2 style={h2}>Current job openings</h2>
            </div>
            <div style={{ fontSize: 14, color: MUT, fontWeight: 600 }}><span style={{ color: RED, fontWeight: 800 }}>{filteredJobs.length}</span> roles matching your filters</div>
          </div>
          <div className="reveal filter-grid" style={{ gap: 12, background: BG, border: `1px solid ${LINE}`, borderRadius: 16, padding: 14, marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "0 14px" }}>
              <span style={{ color: "#9DB4D0", fontSize: 15 }}>🔍</span>
              <input onInput={(e) => setFilter((f) => ({ ...f, q: (e.currentTarget.value || "").toLowerCase().trim() }))} placeholder="Search role, e.g. Welder" style={{ border: "none", outline: "none", background: "transparent", padding: "13px 0", width: "100%", fontSize: 14.5, color: INK }} />
            </div>
            <select onChange={(e) => setFilter((f) => ({ ...f, country: e.target.value }))} style={selectStyle}>
              <option value="all">All Countries</option>
              <option>Saudi Arabia</option><option>Qatar</option><option>UAE</option><option>Kuwait</option><option>Oman</option><option>Croatia</option>
            </select>
            <select onChange={(e) => setFilter((f) => ({ ...f, industry: e.target.value }))} style={selectStyle}>
              <option value="all">All Industries</option>
              <option>Construction</option><option>Healthcare</option><option>Hospitality</option><option>Skilled Trade</option><option>Logistics</option>
            </select>
            <select onChange={(e) => setFilter((f) => ({ ...f, salary: parseInt(e.target.value, 10) || 0 }))} style={selectStyle}>
              <option value="0">Any Salary</option>
              <option value="1000">$1,000+</option><option value="1200">$1,200+</option><option value="1400">$1,400+</option>
            </select>
          </div>
          {filteredJobs.length > 0 ? (
            <div className="cols4" style={{ gap: 18 }}>
              {filteredJobs.map((j) => (
                <div key={j.title} className="hov-6" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: 24, boxShadow: "0 18px 40px -30px rgba(11,36,71,.4)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: RED, background: "#FDECEE", padding: "5px 11px", borderRadius: 999 }}>{j.industry}</span>
                    <Flag code={j.code} h={20} title={j.country} />
                  </div>
                  <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 20, color: NAVY, marginBottom: 4 }}>{j.title}</div>
                  <div style={{ fontSize: 13.5, color: MUT, marginBottom: 16 }}>{j.country} · Full-time</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #EEF3F9" }}>
                    <div><span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 19, color: NAVY }}>{j.salary}</span><span style={{ fontSize: 12, color: "#9DB4D0" }}>/mo</span></div>
                    <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: RED, fontWeight: 700, fontSize: 14 }}>Apply <span>→</span></a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: 50, color: MUT, fontSize: 16, fontWeight: 600 }}>No roles match those filters — try broadening your search.</div>
          )}
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section style={{ background: "linear-gradient(180deg,#F4F8FD,#fff)", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 60px" }}>
            <div style={eyebrow}>HOW IT WORKS</div>
            <h2 style={h2}>From demand to deployment</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 32, left: "5%", right: "5%", height: 2, background: "repeating-linear-gradient(90deg,#CFE0F2 0 10px,transparent 10px 20px)" }} />
            <div className="cols8" style={{ position: "relative", gap: 8 }}>
              {processSteps.map((p, i) => (
                <div key={p.num} className="reveal" style={{ transitionDelay: `${i * 70}ms`, textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, margin: "0 auto 16px", borderRadius: "50%", background: "#fff", border: `2px solid ${RED}`, color: RED, display: "grid", placeItems: "center", fontFamily: SORA, fontWeight: 800, fontSize: 20, boxShadow: "0 14px 30px -16px rgba(224,30,43,.5)" }}>{p.num}</div>
                  <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 5 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4, padding: "0 4px" }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EMPLOYERS ============ */}
      <section id="employers" style={{ background: "#fff", padding: "90px 40px" }}>
        <div className="split2" style={{ maxWidth: 1280, margin: "0 auto", gap: 56, alignItems: "center" }}>
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "4 / 3.4", borderRadius: 22, overflow: "hidden", background: "repeating-linear-gradient(135deg,#EAF2FD 0 18px,#F4F8FD 18px 36px)", border: `1px solid ${LINE2}`, display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center", color: "#9DB4D0" }}><div style={{ fontSize: 44, marginBottom: 8 }}>💼</div><div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: ".05em" }}>PHOTO: employer &amp; workforce</div></div>
            </div>
            <div style={{ position: "absolute", bottom: -22, right: -14, background: NAVY, borderRadius: 16, padding: "18px 22px", boxShadow: "0 24px 50px -22px rgba(11,36,71,.6)", animation: "floaty2 6s ease-in-out infinite" }}>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: "#fff" }}>14 days</div>
              <div style={{ fontSize: 12, color: MUT2, fontWeight: 600 }}>avg. deployment time</div>
            </div>
          </div>
          <div className="reveal">
            <div style={eyebrow}>FOR EMPLOYERS</div>
            <h2 style={{ ...h2, fontSize: 40, margin: "0 0 16px" }}>Hire a skilled Nepalese workforce</h2>
            <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "0 0 26px" }}>End-to-end recruitment handled for you — screened, tested and documented candidates, deployed fast and compliantly.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {employerBullets.map((b) => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ flex: "none", width: 30, height: 30, borderRadius: 9, background: "#EAF2FD", color: NAVY, display: "grid", placeItems: "center", fontSize: 15 }}>{b.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: INK }}>{b.text}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-navy" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: NAVY, color: "#fff", padding: "16px 30px", borderRadius: 999, fontSize: 16, fontWeight: 700, transition: "transform .2s ease" }}>Hire Now <span>→</span></a>
          </div>
        </div>
      </section>

      {/* ============ JOB SEEKER SERVICES ============ */}
      <section id="jobseekers" style={{ background: NAVY, padding: "90px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 85% 15%,rgba(30,111,224,.22),transparent 45%),radial-gradient(circle at 5% 90%,rgba(224,30,43,.14),transparent 45%)" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
            <div style={{ ...eyebrow, color: BLUE2 }}>FOR JOB SEEKERS</div>
            <h2 style={{ ...h2, color: "#fff" }}>We walk with you, every step</h2>
          </div>
          <div className="cols4" style={{ gap: 18 }}>
            {seekerServices.map((s, i) => (
              <div key={s.name} className="reveal hov-8" style={{ transitionDelay: `${i * 70}ms`, background: "rgba(255,255,255,.06)", border: "1px solid rgba(157,184,218,.18)", borderRadius: 18, padding: "28px 24px", backdropFilter: "blur(10px)" }}>
                <span style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 14, background: "rgba(92,160,255,.16)", fontSize: 23, marginBottom: 16 }}>{s.icon}</span>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 17, color: "#fff", marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 13.5, color: MUT2, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY RIO ============ */}
      <section style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
            <div style={eyebrow}>WHY RIO OVERSEAS</div>
            <h2 style={h2}>Recruitment done the right way</h2>
          </div>
          <div className="cols3" style={{ gap: 20 }}>
            {whyCards.map((w, i) => (
              <div key={w.title} className="reveal hov-8" style={{ transitionDelay: `${i * 70}ms`, position: "relative", background: "linear-gradient(180deg,#FBFDFF,#F4F8FD)", border: `1px solid ${LINE}`, borderRadius: 20, padding: "32px 28px" }}>
                <span style={{ display: "grid", placeItems: "center", width: 60, height: 60, borderRadius: 16, background: NAVY, color: "#fff", fontSize: 26, marginBottom: 20 }}>{w.icon}</span>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 20, color: NAVY, marginBottom: 8 }}>{w.title}</div>
                <div style={{ fontSize: 14.5, color: MUT, lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORIES ============ */}
      <section style={{ background: BG, padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }}>
            <div style={eyebrow}>SUCCESS STORIES</div>
            <h2 style={h2}>Careers changed, futures built</h2>
          </div>
          <div className="cols3" style={{ gap: 22 }}>
            {stories.map((t, i) => (
              <div key={t.name} className="reveal" style={{ transitionDelay: `${i * 70}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 22px 48px -32px rgba(11,36,71,.4)" }}>
                <div style={{ position: "relative", height: 190, background: "repeating-linear-gradient(135deg,#EAF2FD 0 18px,#F4F8FD 18px 36px)", display: "grid", placeItems: "center" }}>
                  <div style={{ textAlign: "center", color: "#9DB4D0" }}><div style={{ fontSize: 38 }}>👤</div><div style={{ fontFamily: "monospace", fontSize: 11, marginTop: 6 }}>PHOTO: {t.name}</div></div>
                  <span style={{ position: "absolute", top: 14, right: 14, background: RED, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999 }}>{t.salary}/mo</span>
                  <span style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(10,46,82,.92)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 999 }}>{t.route}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ color: RED, fontSize: 15, letterSpacing: 2, marginBottom: 12 }}>★★★★★</div>
                  <p style={{ fontSize: 15.5, color: INK, lineHeight: 1.6, fontStyle: "italic", margin: "0 0 18px" }}>“{t.quote}”</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: NAVY, color: "#fff", display: "grid", placeItems: "center", fontFamily: SORA, fontWeight: 700, fontSize: 15 }}>{t.initials}</div>
                    <div><div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15, color: NAVY }}>{t.name}</div><div style={{ fontSize: 13, color: MUT }}>{t.role}</div></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT STRIP ============ */}
      <section style={{ background: NAVY, padding: "56px 40px" }}>
        <div className="cols5" style={{ maxWidth: 1280, margin: "0 auto", gap: 14 }}>
          {impactStats.map((s) => (
            <div key={s.label} style={{ textAlign: "center", borderRight: "1px solid rgba(157,184,218,.14)", padding: 6 }}>
              <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 38, color: "#fff", lineHeight: 1 }}><Counter value={s.value} suffix={s.suffix} /></div>
              <div style={{ fontSize: 13, color: MUT2, fontWeight: 600, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={eyebrow}>QUESTIONS</div>
            <h2 style={{ ...h2, fontSize: 42 }}>Frequently asked</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((q, i) => {
              const open = openFaq === i
              return (
                <div key={q.q} style={{ background: BG, border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ fontFamily: SORA, fontWeight: 700, fontSize: 16.5, color: NAVY }}>{q.q}</span>
                    <span style={{ flex: "none", fontSize: 22, color: RED, transition: "transform .3s ease", transform: open ? "rotate(180deg)" : "none" }}>{open ? "–" : "+"}</span>
                  </button>
                  <div style={{ maxHeight: open ? 260 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <p style={{ margin: 0, padding: "0 24px 22px", fontSize: 15, color: MUT, lineHeight: 1.65 }}>{q.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ padding: 40 }}>
        <div className="reveal" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", borderRadius: 28, overflow: "hidden", background: "linear-gradient(120deg,#0A2E52,#0B2447 60%,#12386a)", padding: "70px 50px", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 30%,rgba(30,111,224,.3),transparent 40%),radial-gradient(circle at 85% 70%,rgba(224,30,43,.24),transparent 42%)" }} />
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(157,184,218,.14)", animation: "spinSlow 60s linear infinite" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ ...h2, fontSize: 46, color: "#fff", margin: "0 0 14px" }}>Ready to build your career abroad?</h2>
            <p style={{ fontSize: 18, color: MUT2, maxWidth: 560, margin: "0 auto 34px" }}>Whether you are seeking opportunity or seeking talent — Rio Overseas is your trusted gateway to the world.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#jobs" className="btn-red" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: RED, color: "#fff", padding: "17px 34px", borderRadius: 999, fontSize: 16, fontWeight: 700, boxShadow: "0 18px 40px -14px rgba(224,30,43,.7)", transition: "all .2s ease" }}>Apply Today <span>→</span></a>
              <a href="#employers" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.1)", color: "#fff", padding: "16px 32px", borderRadius: 999, fontSize: 16, fontWeight: 700, border: "1.5px solid rgba(157,184,218,.4)" }}>Hire Talent</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" style={{ background: BG, padding: "90px 40px" }}>
        <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", gap: 50 }}>
          <div className="reveal">
            <div style={eyebrow}>GET IN TOUCH</div>
            <h2 style={{ ...h2, fontSize: 42, margin: "0 0 18px" }}>Let&rsquo;s start your journey</h2>
            <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "0 0 30px" }}>Visit our office in Kathmandu or reach out — our team responds within one business day.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[["📍", "Head Office", "Kathmandu, Nepal"], ["📞", "Call Us", "+977 1 000 0000"], ["✉️", "Email", "info@riooverseas.com.np"]].map(([ic, t, v]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: `1px solid ${LINE}`, display: "grid", placeItems: "center", fontSize: 19 }}>{ic}</span>
                  <div><div style={{ fontWeight: 700, color: NAVY, fontSize: 15 }}>{t}</div><div style={{ fontSize: 14, color: MUT }}>{v}</div></div>
                </div>
              ))}
            </div>
            <iframe
              title="Rio Overseas Pvt. Ltd. — Kathmandu, Nepal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.719242118438!2d85.31936689999999!3d27.7362775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19000fb447c1%3A0xf95708610f072f49!2sRio%20Overseas%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1783848136472!5m2!1sen!2snp"
              style={{ marginTop: 26, width: "100%", height: 200, border: 0, borderRadius: 16, display: "block" }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="reveal" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: 34, boxShadow: "0 28px 60px -36px rgba(11,36,71,.4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Field label="Full Name" ph="Your name" />
              <Field label="Phone" ph="+977 ..." />
              <Field label="Email" ph="you@email.com" span />
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={labelStyle}>I am a...</label>
                <select style={{ ...selectStyle, width: "100%" }}><option>Job Seeker</option><option>Employer</option><option>Partner Agency</option></select>
              </div>
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={labelStyle}>Message</label>
                <textarea className="rio-input" rows={4} placeholder="Tell us how we can help" style={{ width: "100%", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "13px 15px", fontSize: 14.5, outline: "none", resize: "vertical" }} />
              </div>
            </div>
            <button className="hov-2" style={{ marginTop: 20, width: "100%", background: RED, color: "#fff", border: "none", padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>Send Message</button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "#071A2E", padding: "64px 40px 30px", color: MUT2 }}>
        <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", gap: 40 }}>
          <div>
            <div style={{ display: "inline-flex", background: "#fff", padding: "10px 16px", borderRadius: 14, marginBottom: 18 }}><Logo height={44} /></div>
            <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: "0 0 18px" }}>Connecting Nepalese talent with global opportunities through ethical, licensed recruitment. Dream. Explore. Achieve.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s, i) => (
                <a key={i} href="#" className="soc" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,.06)", display: "grid", placeItems: "center", fontSize: 16, color: "#fff", fontWeight: 700 }}>{s}</a>
              ))}
            </div>
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#6E8AAE" }}><span style={{ color: "#1E8A5B" }}>✓</span> Govt. Licensed · Dept. of Foreign Employment, Nepal</div>
        </div>
      </footer>
    </div>
  )
}

/* ---------------- small helpers ---------------- */
const selectStyle: React.CSSProperties = { border: `1px solid ${LINE2}`, borderRadius: 11, padding: "13px 14px", background: "#fff", fontSize: 14.5, color: INK, fontWeight: 600, outline: "none", cursor: "pointer" }
const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 7 }

function Field({ label, ph, span }: { label: string; ph: string; span?: boolean }) {
  return (
    <div style={span ? { gridColumn: "1 / 3" } : undefined}>
      <label style={labelStyle}>{label}</label>
      <input className="rio-input" placeholder={ph} style={{ width: "100%", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "13px 15px", fontSize: 14.5, outline: "none" }} />
    </div>
  )
}
