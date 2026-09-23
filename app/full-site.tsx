"use client"

import { useEffect, useRef, useState } from "react"
import { HeroGlobe } from "@/components/rio/hero-globe"
import { TextAnimation } from "@/components/ui/text-animation"
import { MorphingScrollNavbar, type ScrollNavLink } from "@/components/ui/morphing-scroll-navbar"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import HarmonicWave from "@/components/ui/harmonic-wave"
import { ShieldCheck, FileCheck2, BadgeCheck, UserCheck, Zap, HeartPulse, Clock } from "lucide-react"
import { ToolDock, ToolDockTile } from "@/components/ui/techstack"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

/* ---------------- palette ---------------- */
export const NAVY = "#0A2E52"
export const DEEP = "#0B1F3A" // deep navy used on booklet dark panels
export const INK = "#0A2540"
export const RED = "#E01E2B"
export const BLUE2 = "#5CA0FF"
export const MUT = "#5C6B80"
export const MUT2 = "#9DB8DA"
export const LINE = "#E9F0F8"
export const LINE2 = "#E2EAF3"
export const BG = "#F4F8FD"
export const SORA = "var(--font-sora), sans-serif"

/* ---------------- brand logo ---------------- */
export function Logo({ height = 46 }: { height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Rio Overseas Pvt. Ltd."
      style={{ height, width: "auto", display: "block", mixBlendMode: "multiply" }}
    />
  )
}

/* ---------------- photo ---------------- */
export function Photo({ src, alt, style, className }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" className={className} style={{ display: "block", objectFit: "cover", ...style }} />
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

/* ---------------- line-icon set (stroke, currentColor) ---------------- */
export type IcoName =
  | "shield" | "scale" | "users" | "globe" | "trend" | "eye" | "target" | "check"
  | "file" | "badge" | "search" | "arrow" | "medical" | "clock" | "award" | "brief"
  | "heart" | "building" | "quote" | "phone" | "mail" | "pin"
const PATHS: Record<IcoName, React.ReactNode> = {
  shield: <><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  scale: <><path d="M12 3v18" /><path d="M6 21h12" /><path d="M5 7h14l-3-3" /><path d="M5 7l-3 6a3 3 0 0 0 6 0L5 7z" /><path d="M19 7l-3 6a3 3 0 0 0 6 0l-3-6z" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.4a3 3 0 0 1 0 5.2" /><path d="M18.5 20a6 6 0 0 0-3-5.1" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" /></>,
  trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M16 7h5v5" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" /></>,
  check: <path d="M4 12l5 5L20 6" />,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></>,
  badge: <><path d="M12 2.5l2.2 1.7 2.8.2.2 2.8L19.5 9.6l-1.1 2.6 1.1 2.6-2.3 2-.2 2.8-2.8.2L12 21.5l-2.2-1.7-2.8-.2-.2-2.8-2.3-2 1.1-2.6L3.5 9.6 5.8 7.2 6 4.4l2.8-.2z" /><path d="M9 12l2 2 4-4" /></>,
  search: <><circle cx="10" cy="8" r="3.4" /><path d="M3.5 20a6.5 6.5 0 0 1 10.8-4.8" /><circle cx="17" cy="17" r="3" /><path d="M21.5 21.5L19.2 19.2" /></>,
  arrow: <><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></>,
  medical: <><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M12 8.5v5M9.5 11h5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="M8.5 13L7 21l5-2.4L17 21l-1.5-8" /></>,
  brief: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" /><path d="M3 12.5h18" /></>,
  heart: <path d="M12 20.5S3.5 15.5 3.5 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.5 2.8C20.5 15.5 12 20.5 12 20.5z" />,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /><path d="M10 21v-3.5h4V21" /></>,
  quote: <><path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3H4" /><path d="M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3h-3" /></>,
  phone: <path d="M4 5c0 9 6 15 15 15l-1-4-4-1-2 2c-2-1-4-3-5-5l2-2-1-4-4-1z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  pin: <><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
}
export function Ico({ name, size = 22, color = "currentColor", sw = 1.7 }: { name: IcoName; size?: number; color?: string; sw?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name]}
    </svg>
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

/* WHO WE ARE */
export const licenseBullets = ["Government Authorized", "Ethical Recruitment", "Transparent Process", "Global Employer Network"]
export const whoFeatures: { icon: IcoName; label: string }[] = [
  { icon: "shield", label: "Government Licensed" },
  { icon: "scale", label: "Ethical Recruitment" },
  { icon: "users", label: "Skilled Workforce Placement" },
  { icon: "globe", label: "Global Employer Network" },
  { icon: "trend", label: "Better Future" },
]

/* VISION / MISSION */
export const missionPoints = [
  "Ethical, compliant recruitment",
  "Skilled, trade-tested manpower",
  "Long-term employer partnerships",
  "Worker welfare & safety",
  "Complete recruitment solutions",
]

/* CORE VALUES */
const coreValues: { icon: IcoName; title: string; desc: string }[] = [
  { icon: "scale", title: "Integrity", desc: "Honest dealings, always." },
  { icon: "brief", title: "Professionalism", desc: "Skilled, reliable service." },
  { icon: "eye", title: "Transparency", desc: "Clear costs, clear process." },
  { icon: "shield", title: "Responsibility", desc: "Accountable to all." },
  { icon: "award", title: "Global Excellence", desc: "World-class standards." },
  { icon: "heart", title: "People First", desc: "Worker welfare above all." },
]

/* LEADERSHIP */
export type Leader = { name: string; role: string; img: string; quote: string; phone?: string; email?: string }
export const chairman: Leader = {
  name: "Rama Khadka",
  role: "Chairman",
  img: "/gallery/chairman.jpg",
  phone: "+977 9864339769",
  email: "ramakhadka768@gmail.com",
  quote:
    "It is my pleasure to welcome you to Rio Overseas Pvt. Ltd., a government-licensed recruitment agency committed to connecting skilled Nepali professionals with meaningful opportunities across the world. Every individual who chooses to work abroad carries not only personal ambitions, but the hopes and dreams of their family. That is why we do not simply recruit manpower — we build futures, strengthen partnerships, and connect Nepalese talent with global opportunities.",
}
export const leaders: Leader[] = [
  {
    name: "Sanjeev Khadka",
    role: "Deputy Chairman",
    img: "/gallery/deputy-chairman.jpg",
    quote:
      "Every individual deserves the right opportunity to build a better future. We are dedicated to creating a reliable bridge between Nepali talent and global employers — with proper guidance, support, and opportunities that match their skills and aspirations.",
  },
  {
    name: "Niraj Bhandari",
    role: "Global Marketing Director",
    img: "/gallery/marketing-director.jpg",
    quote:
      "We are committed to creating greater opportunities for Nepali talent in the global market — expanding our reach, strengthening partnerships, and ensuring every candidate receives the best guidance and support. Together, we can build a stronger workforce for a better Nepal.",
  },
  {
    name: "Pritam Shrestha",
    role: "Global Marketing Manager",
    img: "/gallery/marketing-manager.jpg",
    quote:
      "With a passion for global opportunities and strategic growth, I lead our marketing initiatives — helping connect skilled Nepali talent with trusted international opportunities.",
  },
]

/* WHY CHOOSE US — orbital nodes */
const whyChoose = [
  { id: 1, title: "Govt. Licensed", date: "Compliance", content: "Fully licensed by Nepal's Department of Foreign Employment (License 1667/080/081) and compliant with every destination's labour law.", category: "Compliance", icon: ShieldCheck, relatedIds: [2, 7], status: "completed" as const, energy: 100, image: "/gallery/office-front.jpg" },
  { id: 2, title: "Transparent", date: "Ethics", content: "Clear costs and an honest process at every step — no hidden charges, ever.", category: "Ethics", icon: FileCheck2, relatedIds: [1, 3], status: "completed" as const, energy: 96, image: "/gallery/meeting.jpg" },
  { id: 3, title: "Verified Employers", date: "Trust", content: "We place workers only with trusted, vetted employers and genuine job orders.", category: "Trust", icon: BadgeCheck, relatedIds: [2, 4], status: "completed" as const, energy: 94, image: "/gallery/meeting-2.jpg" },
  { id: 4, title: "Pre-Screened", date: "Quality", content: "Skilled, trade-tested and interview-ready candidates, matched to the right role.", category: "Quality", icon: UserCheck, relatedIds: [3, 5], status: "completed" as const, energy: 92, image: "/gallery/team.jpg" },
  { id: 5, title: "Fast Deployment", date: "Speed", content: "A streamlined pipeline gets workers deployed quickly — about 14 days once documents are ready.", category: "Speed", icon: Zap, relatedIds: [4, 6], status: "completed" as const, energy: 90, image: "/gallery/director-desk.jpg" },
  { id: 6, title: "Visa & Medical", date: "Support", content: "End-to-end visa, medical and documentation handling, all managed for you.", category: "Support", icon: HeartPulse, relatedIds: [5, 7], status: "completed" as const, energy: 93, image: "/gallery/marketing-manager.jpg" },
  { id: 7, title: "24/7 Support", date: "Care", content: "We stay with workers before, during and after arrival — real, ongoing support.", category: "Care", icon: Clock, relatedIds: [6, 1], status: "completed" as const, energy: 98, image: "/gallery/team-2.jpg" },
]

/* COUNTRIES — 8 destinations */
const destinations = [
  { code: "my", name: "Malaysia", sub: "Federation of Malaysia" },
  { code: "ae", name: "UAE", sub: "United Arab Emirates" },
  { code: "sa", name: "Saudi Arabia", sub: "Kingdom of Saudi Arabia" },
  { code: "qa", name: "Qatar", sub: "State of Qatar" },
  { code: "kw", name: "Kuwait", sub: "State of Kuwait" },
  { code: "om", name: "Oman", sub: "Sultanate of Oman" },
  { code: "bh", name: "Bahrain", sub: "Kingdom of Bahrain" },
  { code: "cy", name: "Cyprus", sub: "Europe — new market" },
]

/* SECTORS — twelve categories we supply, each with a photo */
const sectors = [
  { icon: "🛎️", name: "Hospitality", desc: "Guest service, front-of-house & concierge crews.", photo: "/gallery/types/hospitality.jpg" },
  { icon: "🛡️", name: "Security", desc: "Trained guards & disciplined Gurkha personnel.", photo: "/gallery/team-2.jpg" },
  { icon: "🍽️", name: "Restaurants", desc: "Chefs, cooks, waiters & kitchen stewards.", photo: "/gallery/types/hospitality.jpg" },
  { icon: "🧹", name: "Cleaning", desc: "Facility, hotel & industrial cleaning teams.", photo: "/gallery/types/industrial.jpg" },
  { icon: "🏗️", name: "Construction", desc: "Masons, steel-fixers, carpenters & site labour.", photo: "/gallery/types/construction.jpg" },
  { icon: "🏨", name: "Hotels", desc: "Housekeeping, reception & F&B staff.", photo: "/gallery/office-front.jpg" },
  { icon: "⚙️", name: "Facility Mgmt", desc: "Building maintenance & operations support.", photo: "/gallery/types/welder.jpg" },
  { icon: "🚚", name: "Logistics", desc: "Heavy drivers, movers & delivery crews.", photo: "/gallery/types/logistics.jpg" },
  { icon: "📦", name: "Warehouse", desc: "Pickers, packers, loaders & storekeepers.", photo: "/gallery/types/logistics.jpg" },
  { icon: "🛍️", name: "Retail", desc: "Salesmen, cashiers & merchandisers.", photo: "/gallery/types/professional.jpg" },
  { icon: "🏭", name: "Manufacturing", desc: "Machine operators & assembly-line workers.", photo: "/gallery/types/industrial.jpg" },
  { icon: "🔧", name: "Engineering", desc: "Technicians, welders & site engineers.", photo: "/gallery/types/engineer.jpg" },
]

/* MANPOWER WE SUPPLY — five tiers */
const manpowerTiers: { icon: IcoName; title: string; desc: string; roles: string[]; image: string }[] = [
  { icon: "brief", title: "Professional", desc: "Degree-qualified specialists for senior and technical placements.", roles: ["Engineers", "Healthcare", "IT & Software", "Accountants", "Managers"], image: "/gallery/types/professional.jpg" },
  { icon: "shield", title: "Skilled", desc: "Certified, trade-tested tradespeople for construction and industry.", roles: ["Welders", "Electricians", "Plumbers", "Masons", "Heavy Drivers"], image: "/gallery/types/welder.jpg" },
  { icon: "users", title: "Semi-Skilled", desc: "Vocationally trained workers with real hands-on experience.", roles: ["Hospitality", "Machine Operators", "Technicians", "Salesmen", "Storekeepers"], image: "/gallery/types/hospitality.jpg" },
  { icon: "trend", title: "Unskilled", desc: "Reliable general labour, ready for large-scale bulk demand.", roles: ["General Labour", "Cleaners", "Warehouse", "Factory Hands", "Loaders"], image: "/gallery/types/construction.jpg" },
  { icon: "award", title: "Security & Gurkha", desc: "Disciplined security personnel in the proud Gurkha tradition.", roles: ["Security Guards", "Watchmen", "Camp Security", "Corporate Guards"], image: "/gallery/team.jpg" },
]
const workerBadges = ["Extensive Network", "Quality Manpower", "Ethical Recruitment", "Global Opportunities"]

/* WHAT WE SUPPLY — converging photos of every worker type */
const supplyPhotos = [
  { src: "/gallery/types/construction.jpg", alt: "Construction workers", label: "Construction" },
  { src: "/gallery/types/welder.jpg", alt: "Warehouse crew", label: "Warehouse" },
  { src: "/gallery/types/industrial.jpg", alt: "Factory & manufacturing crew", label: "Manufacturing" },
  { src: "/gallery/types/healthcare.jpg", alt: "Healthcare professional", label: "Healthcare" },
  { src: "/gallery/types/hospitality.jpg", alt: "Hospitality & chef", label: "Hospitality" },
  { src: "/gallery/types/logistics.jpg", alt: "Driver & logistics", label: "Logistics" },
  { src: "/gallery/types/engineer.jpg", alt: "Warehouse crew", label: "Warehouse" },
  { src: "/gallery/team-2.jpg", alt: "Security personnel", label: "Security" },
]


/* WHY NEPAL */
const whyNepal: { icon: IcoName; title: string; desc: string }[] = [
  { icon: "users", title: "A young, willing workforce", desc: "A large working-age population eager to build careers and support families abroad." },
  { icon: "shield", title: "Strong trade training", desc: "Vocational pipelines in construction, hospitality and technical trades produce job-ready hands." },
  { icon: "award", title: "The Gurkha legacy", desc: "A worldwide reputation for discipline, loyalty and grit under pressure." },
  { icon: "badge", title: "Government-vetted", desc: "Every worker DoFE-cleared, medically checked and orientation-trained before departure." },
]

/* CREDENTIALS */
const credentials: { icon: IcoName; label: string; value: string; issuer: string }[] = [
  { icon: "building", label: "Foreign Employment License", value: "1667 / 080 / 081", issuer: "Dept. of Foreign Employment, Nepal" },
  { icon: "file", label: "Company Registration", value: "321717 / 080 / 081", issuer: "Office of the Company Registrar" },
  { icon: "badge", label: "PAN (Tax Registration)", value: "619792118", issuer: "Inland Revenue Department" },
  { icon: "award", label: "NAFEA Membership", value: "No. 1336", issuer: "Nepal Assoc. of Foreign Employment Agencies" },
]

/* JOBS */
type Job = { title: string; country: string; code: string; salary: string; salaryNum: number; industry: string }
const jobs: Job[] = [
  { title: "Welder", country: "Saudi Arabia", code: "sa", salary: "$1,200", salaryNum: 1200, industry: "Skilled Trade" },
  { title: "Electrician", country: "Qatar", code: "qa", salary: "$1,400", salaryNum: 1400, industry: "Skilled Trade" },
  { title: "Hotel Staff", country: "Cyprus", code: "cy", salary: "€1,600", salaryNum: 1600, industry: "Hospitality" },
  { title: "Plumber", country: "UAE", code: "ae", salary: "$1,100", salaryNum: 1100, industry: "Construction" },
  { title: "Mason", country: "Kuwait", code: "kw", salary: "$950", salaryNum: 950, industry: "Construction" },
  { title: "Security Guard", country: "Oman", code: "om", salary: "$900", salaryNum: 900, industry: "Security" },
  { title: "Heavy Driver", country: "Qatar", code: "qa", salary: "$1,300", salaryNum: 1300, industry: "Logistics" },
  { title: "Factory Operator", country: "Malaysia", code: "my", salary: "$800", salaryNum: 800, industry: "Manufacturing" },
]
/* DEMANDS — live manpower demands (poster format, click to open detail) */
export type DemandPosition = { title: string; count: number; salary: string }
export type Demand = {
  id: string
  company: string
  country: string
  code: string
  city: string
  category: string
  gender: string
  ageRange: string
  languages: string
  experience?: string
  interview: string
  positions: DemandPosition[]
  facilities: string[]
}
const demands: Demand[] = [
  {
    id: "dosa-house-qatar",
    company: "Dosa House Restaurant",
    country: "Qatar",
    code: "qa",
    city: "Doha",
    category: "Hospitality",
    gender: "Female",
    ageRange: "19–35 years",
    languages: "Basic English & Hindi",
    experience: "Experienced candidates preferred",
    interview: "20 July (Monday)",
    positions: [
      { title: "Cleaner", count: 5, salary: "QAR 1,200 + 300" },
      { title: "Waitress", count: 5, salary: "QAR 1,300 + 300" },
    ],
    facilities: ["Free accommodation", "Transport provided", "Company medical", "All other benefits as per Qatar labour law"],
  },
  {
    id: "al-rashid-ksa",
    company: "Al Rashid Contracting Co.",
    country: "Saudi Arabia",
    code: "sa",
    city: "Riyadh",
    category: "Construction",
    gender: "Male",
    ageRange: "21–40 years",
    languages: "Basic English / Arabic",
    experience: "Trade-tested experience required",
    interview: "25 July (Saturday)",
    positions: [
      { title: "Mason", count: 20, salary: "SAR 1,200" },
      { title: "Steel Fixer", count: 15, salary: "SAR 1,300" },
      { title: "Shuttering Carpenter", count: 10, salary: "SAR 1,300" },
    ],
    facilities: ["Free accommodation", "Transport provided", "Company medical", "Overtime as per Saudi labour law"],
  },
  {
    id: "gulf-secure-uae",
    company: "Gulf Secure Services",
    country: "UAE",
    code: "ae",
    city: "Dubai",
    category: "Security",
    gender: "Male",
    ageRange: "21–40 years",
    languages: "Basic English",
    experience: "Ex-army / security experience preferred",
    interview: "28 July (Monday)",
    positions: [
      { title: "Security Guard", count: 30, salary: "AED 1,400" },
    ],
    facilities: ["Free accommodation", "Transport provided", "Uniform provided", "Company medical"],
  },
  {
    id: "sunrise-manufacturing-my",
    company: "Sunrise Manufacturing Sdn Bhd",
    country: "Malaysia",
    code: "my",
    city: "Kuala Lumpur",
    category: "Manufacturing",
    gender: "Male & Female",
    ageRange: "18–38 years",
    languages: "Basic English",
    experience: "Freshers welcome; experience a plus",
    interview: "30 July (Wednesday)",
    positions: [
      { title: "Factory Operator", count: 50, salary: "RM 1,500 + OT" },
    ],
    facilities: ["Free accommodation", "Transport provided", "Company medical", "Overtime as per Malaysian labour law"],
  },
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
export const employerBullets = [
  { icon: "📋", text: "Demand Letter Support" },
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
const stories = [
  { name: "Ram B.K.", initials: "RB", role: "Electrician", route: "Nepal → Qatar", salary: "$1,400", quote: "Rio Overseas changed my life. The process was honest and smooth, and today I support my whole family from abroad." },
  { name: "Sita Tamang", initials: "ST", role: "Hotel Supervisor", route: "Nepal → Cyprus", salary: "€1,600", quote: "From paperwork to my flight, everything was handled with care. I felt supported at every single step." },
  { name: "Bikash Rai", initials: "BR", role: "Welder", route: "Nepal → Saudi Arabia", salary: "$1,200", quote: "A trustworthy team that kept every promise. My skills finally found the opportunity they deserved." },
]
const impactStats = [
  { value: 10000, suffix: "+", label: "Workers" },
  { value: 500, suffix: "+", label: "Employers" },
  { value: 8, suffix: "", label: "Countries" },
  { value: 98, suffix: "%", label: "Visa Success" },
  { value: 15, suffix: "+", label: "Years" },
]
const faqs = [
  { q: "Is Rio Overseas government licensed?", a: "Yes. We are fully licensed by the Department of Foreign Employment, Nepal (License No. 1667/080/081), and operate in strict compliance with national and destination-country regulations." },
  { q: "How much does it cost a job seeker?", a: "We follow ethical, transparent pricing in line with government guidelines. All fees are explained clearly up front with no hidden charges." },
  { q: "Which countries do you deploy to?", a: "We deploy across the Gulf (Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain), Malaysia, and are expanding into Europe including Cyprus." },
  { q: "How long does the process take?", a: "From selection to deployment typically takes a few weeks depending on visa and medical timelines. Our average deployment time is around 14 days once documents are ready." },
  { q: "Do you support workers after they arrive?", a: "Absolutely. Our support continues after arrival, with coordination between the worker and employer to ensure a smooth transition." },
  { q: "How can employers request workers?", a: "Employers can submit a manpower demand through our contact form or office. We handle screening, testing, documentation and deployment end to end." },
]
export const socials = ["f", "in", "📷", "▶"]

/* SOCIAL LINKS — replace hrefs with the real Rio Overseas profile URLs */
export const socialLinks: { name: string; href: string; icon: React.ReactNode }[] = [
  { name: "Facebook", href: "https://www.facebook.com/riooverseasnepal", icon: <path d="M14 9h3V5.5h-2.5C12 5.5 11 7 11 9v1.5H8.5V14H11v7h3v-7h2.5l.5-3.5H14V9.5c0-.5.2-.5.7-.5H14z" /> },
  { name: "Instagram", href: "https://www.instagram.com/riooverseasnepal", icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" /></> },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/rio-overseas", icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V17M8 7.6v.01M11.5 17v-3.5c0-1.4 1-2.4 2.2-2.4s2.3 1 2.3 2.4V17" /></> },
  { name: "YouTube", href: "https://www.youtube.com/@riooverseas", icon: <><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" stroke="none" /></> },
  { name: "TikTok", href: "https://www.tiktok.com/@riooverseas", icon: <path d="M14 4c.4 2.2 1.8 3.6 4 3.9V11c-1.5 0-2.9-.5-4-1.3V15a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V13a2 2 0 1 0 2 2V4h2z" /> },
]

/* GOOGLE REVIEWS */
export const googleRating = { score: 4.9, count: 128 }
export const reviews: { name: string; initial: string; color: string; stars: number; date: string; text: string }[] = [
  { name: "Bishal Gurung", initial: "B", color: "#1E6FE0", stars: 5, date: "2 weeks ago", text: "Rio Overseas handled my Qatar deployment start to finish — honest process, no hidden charges. Highly recommended for anyone going to the Gulf." },
  { name: "Anjana Thapa", initial: "A", color: "#E01E2B", stars: 5, date: "1 month ago", text: "Very professional and transparent team. They explained every step of the visa and medical process clearly. I felt supported the whole time." },
  { name: "Deepak Shrestha", initial: "D", color: "#1E8A5B", stars: 5, date: "1 month ago", text: "Got my job in the UAE within a few weeks. Documentation and ticketing were all managed properly. Thank you Rio Overseas." },
  { name: "Sunita Rai", initial: "S", color: "#8A5CFF", stars: 4, date: "2 months ago", text: "Good support throughout the recruitment. The orientation before departure was genuinely helpful for a first-timer like me." },
  { name: "Kamal Bhandari", initial: "K", color: "#E08A1E", stars: 5, date: "3 months ago", text: "A trustworthy, government-licensed agency. They kept every promise and my family in Nepal was kept informed. Ethical recruitment done right." },
  { name: "Manoj Tamang", initial: "M", color: "#0A2E52", stars: 5, date: "3 months ago", text: "Smooth visa process and quick deployment. The team is responsive and answers every question. Would recommend to friends." },
]

export const footerCols = [
  { title: "Company", links: ["About Us", "Leadership", "Why Rio Overseas", "Success Stories", "Contact"] },
  { title: "For You", links: ["Find Jobs", "For Employers", "Recruitment Process", "Worker Categories", "FAQ"] },
  { title: "Destinations", links: ["Saudi Arabia", "UAE", "Qatar", "Kuwait", "Malaysia", "Cyprus"] },
]
const navLinks: ScrollNavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Demands", href: "#demands" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5c0 9 6 15 15 15l-1-4-4-1-2 2c-2-1-4-3-5-5l2-2-1-4-4-1z" />
    </svg>
  )
}
export const eyebrow: React.CSSProperties = { fontFamily: SORA, fontSize: 13, fontWeight: 700, letterSpacing: ".22em", color: RED, marginBottom: 14 }
export const h2: React.CSSProperties = { fontFamily: SORA, fontWeight: 800, fontSize: 44, lineHeight: 1.08, letterSpacing: "-.02em", color: NAVY, margin: 0 }

/* animated section heading — GSAP block-wipe reveal on scroll */
export function AnimatedH2({ text, dark = false, size = "clamp(2rem, 4.6vw, 2.9rem)", delay = 0 }: { text: string; dark?: boolean; size?: string; delay?: number }) {
  return (
    <TextAnimation
      as="h2"
      text={text}
      animateOnScroll
      delay={delay}
      duration={0.6}
      stagger={0.08}
      blockColor={RED}
      size={size}
      style={{ fontFamily: SORA, color: dark ? "#fff" : NAVY }}
    />
  )
}

/* ---------------- social links (branded, real profile URLs) ---------------- */
export function SocialLinks({ light = false }: { light?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {socialLinks.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="soc"
          style={{ width: 40, height: 40, borderRadius: 10, background: light ? "#fff" : "rgba(255,255,255,.07)", border: light ? `1px solid ${LINE}` : "1px solid rgba(255,255,255,.1)", display: "grid", placeItems: "center", color: light ? NAVY : "#fff" }}
        >
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{s.icon}</svg>
        </a>
      ))}
    </div>
  )
}

/* ---------------- Google mark + stars ---------------- */
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden style={{ flex: "none" }}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  )
}
function Stars({ n, size = 15 }: { n: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "#F5A623" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < n ? "currentColor" : "#E2EAF3"} aria-hidden>
          <path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6.1L12 17.9 6.6 19.7l1.2-6.1L3.3 9.4l6.1-.8z" />
        </svg>
      ))}
    </span>
  )
}

/* ---------------- Google reviews section ---------------- */
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Rio+Overseas+Pvt.+Ltd."
function GoogleReviews() {
  return (
    <section id="reviews" style={{ background: "linear-gradient(180deg,#fff,#F7FAFE)", padding: "90px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
          <div style={eyebrow}>REVIEWS</div>
          <AnimatedH2 text="What people say about us" />
        </div>

        {/* summary bar */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, padding: "22px 28px", boxShadow: "0 22px 50px -38px rgba(11,36,71,.5)", marginBottom: 34, maxWidth: 720, marginInline: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <GoogleG size={34} />
            <div>
              <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15, color: NAVY }}>Google Reviews</div>
              <div style={{ fontSize: 12.5, color: MUT }}>Based on {googleRating.count} reviews</div>
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: LINE2 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 40, color: NAVY, lineHeight: 1 }}>{googleRating.score.toFixed(1)}</span>
            <div><Stars n={5} size={18} /><div style={{ fontSize: 12, color: MUT, marginTop: 3 }}>Excellent rating</div></div>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: "#fff", padding: "12px 20px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Write a review <span>→</span></a>
        </div>

        {/* review cards */}
        <div className="cols3" style={{ gap: 22 }}>
          {reviews.map((r, i) => (
            <div key={r.name} className="reveal hov-6" style={{ transitionDelay: `${i * 60}ms`, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: "24px 24px", boxShadow: "0 20px 46px -34px rgba(11,36,71,.5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ flex: "none", width: 44, height: 44, borderRadius: "50%", background: r.color, color: "#fff", display: "grid", placeItems: "center", fontFamily: SORA, fontWeight: 700, fontSize: 18 }}>{r.initial}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15.5, color: NAVY }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{r.date}</div>
                </div>
                <GoogleG size={20} />
              </div>
              <Stars n={r.stars} />
              <p style={{ fontSize: 14.5, color: "#33455C", lineHeight: 1.6, margin: "12px 0 0" }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- interactive sector card (hover reveals detail) ---------------- */
function SectorCard({ icon, name, desc, red, delay }: { icon: string; name: string; desc: string; red: boolean; delay: number }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      style={{
        transitionDelay: `${delay}ms`,
        position: "relative",
        outline: "none",
        borderRadius: 18,
        padding: "22px 22px",
        border: `1px solid ${hover ? "transparent" : LINE}`,
        background: hover ? `linear-gradient(155deg,${NAVY},#12386a)` : "#fff",
        boxShadow: hover ? "0 26px 54px -30px rgba(11,36,71,.7)" : "0 18px 40px -34px rgba(11,36,71,.5)",
        transform: hover ? "translateY(-6px)" : "none",
        transition: "transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, background .3s ease, border-color .3s ease",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ flex: "none", width: 52, height: 52, borderRadius: 14, background: red ? RED : (hover ? "rgba(255,255,255,.14)" : DEEP), display: "grid", placeItems: "center", fontSize: 24, transform: hover ? "scale(1.12) rotate(-6deg)" : "none", transition: "transform .3s cubic-bezier(.22,1,.36,1), background .3s ease" }}>{icon}</span>
        <span style={{ fontFamily: SORA, fontWeight: 700, fontSize: 16.5, color: hover ? "#fff" : NAVY, transition: "color .3s ease" }}>{name}</span>
        <span style={{ marginLeft: "auto", color: hover ? "#fff" : "transparent", transition: "color .3s ease, transform .3s ease", transform: hover ? "translateX(0)" : "translateX(-6px)", fontSize: 18 }}>→</span>
      </div>
      <div style={{ overflow: "hidden", maxHeight: hover ? 64 : 0, opacity: hover ? 1 : 0, marginTop: hover ? 12 : 0, transition: "max-height .34s ease, opacity .3s ease, margin-top .3s ease" }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#DCE7F4" }}>{desc}</p>
      </div>
    </div>
  )
}

/* ---------------- interactive process timeline ---------------- */
function ProcessTimeline() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [started, setStarted] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // begin auto-play once scrolled into view
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % processSteps.length), 1800)
    return () => clearInterval(id)
  }, [started, paused])

  const pct = (active / (processSteps.length - 1)) * 100

  return (
    <div ref={wrapRef} onMouseLeave={() => setPaused(false)} style={{ position: "relative" }}>
      <style>{`@keyframes procPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(224,30,43,.5);} 50% { box-shadow: 0 0 0 12px rgba(224,30,43,0);} }`}</style>
      {/* base + progress line */}
      <div style={{ position: "absolute", top: 32, left: "5%", right: "5%", height: 3, background: "#DCE7F4", borderRadius: 2 }} />
      <div style={{ position: "absolute", top: 32, left: "5%", width: `${pct * 0.9}%`, height: 3, background: `linear-gradient(90deg,${RED},#ff6a72)`, borderRadius: 2, transition: "width .6s cubic-bezier(.22,1,.36,1)" }} />
      <div className="cols8" style={{ position: "relative", gap: 8 }}>
        {processSteps.map((p, i) => {
          const done = i <= active
          const isActive = i === active
          return (
            <button
              key={p.num}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => { setPaused(true); setActive(i) }}
              onFocus={() => { setPaused(true); setActive(i) }}
              style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "center", padding: 0 }}
              aria-pressed={isActive}
            >
              <div style={{
                width: 64, height: 64, margin: "0 auto 16px", borderRadius: "50%",
                background: done ? RED : "#fff",
                border: `2px solid ${RED}`,
                color: done ? "#fff" : RED,
                display: "grid", placeItems: "center", fontFamily: SORA, fontWeight: 800, fontSize: 20,
                transform: isActive ? "scale(1.14)" : "scale(1)",
                transition: "background .35s ease, color .35s ease, transform .35s ease, box-shadow .35s ease",
                animation: isActive ? "procPulse 1.6s ease-in-out infinite" : "none",
                boxShadow: done ? "0 14px 30px -16px rgba(224,30,43,.6)" : "0 8px 20px -14px rgba(11,36,71,.3)",
              }}>{p.num}</div>
              <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 15, color: isActive ? RED : NAVY, transition: "color .3s ease", marginBottom: 5 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4, padding: "0 4px", opacity: isActive ? 1 : 0.75, transition: "opacity .3s ease" }}>{p.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Manpower interactive showcase ---------------- */
function ManpowerInfographic() {
  const [active, setActive] = useState(1)
  const t = manpowerTiers[active]

  return (
    <div className="mp-wrap">
      <style>{`
        .mp-wrap { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.1fr); gap: 30px; align-items: stretch; }
        @media (max-width: 900px) { .mp-wrap { grid-template-columns: 1fr; } }
        .mp-row { position: relative; width: 100%; text-align: left; cursor: pointer; border: 1px solid ${LINE}; background: #fff; border-radius: 16px; padding: 18px 20px; margin-bottom: 12px; display: flex; align-items: center; gap: 14px; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease; }
        .mp-row:hover { transform: translateX(4px); }
        .mp-row.on { border-color: transparent; background: linear-gradient(150deg,${NAVY},#12386a); box-shadow: 0 22px 44px -26px rgba(11,36,71,.6); }
        .mp-row.on .mp-title { color: #fff; }
        .mp-row.on .mp-ico { background: ${RED}; color: #fff; }
        .mp-row.on .mp-arrow { color: #fff; transform: translateX(0); opacity: 1; }
        .mp-title { font-family: ${SORA}; font-weight: 800; font-size: 17px; color: ${NAVY}; flex: 1; }
        .mp-ico { flex: none; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; background: #EAF2FD; color: ${NAVY}; transition: background .25s ease, color .25s ease; }
        .mp-arrow { color: ${MUT}; font-size: 18px; opacity: 0; transform: translateX(-6px); transition: all .25s ease; }
        .mp-panel { border-radius: 22px; overflow: hidden; background: linear-gradient(160deg,${DEEP},#0A1A30); color: #fff; position: relative; display: flex; flex-direction: column; }
        .mp-anim { animation: mpIn .5s cubic-bezier(.22,1,.36,1) both; display: flex; flex-direction: column; flex: 1; }
        @keyframes mpIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .mp-photo { position: relative; height: 240px; overflow: hidden; }
        .mp-photo img { width: 100%; height: 100%; object-fit: cover; display: block; animation: mpZoom 6s ease forwards; }
        @keyframes mpZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        .mp-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,26,48,.15) 0%, rgba(10,26,48,.85) 100%); }
        .mp-chip { display: inline-block; font-size: 13px; font-weight: 600; color: #EAF1FA; background: rgba(255,255,255,.08); border: 1px solid rgba(157,184,218,.22); border-radius: 999px; padding: 8px 14px; opacity: 0; animation: mpChip .45s ease forwards; }
        @keyframes mpChip { from { opacity: 0; transform: translateY(8px) scale(.96); } to { opacity: 1; transform: none; } }
      `}</style>

      {/* LEFT — tier selector */}
      <div>
        {manpowerTiers.map((tier, i) => (
          <button
            key={tier.title}
            type="button"
            className={`mp-row${i === active ? " on" : ""}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
          >
            <span className="mp-ico"><Ico name={tier.icon} size={22} /></span>
            <span className="mp-title">{tier.title}</span>
            <span className="mp-arrow">→</span>
          </button>
        ))}
      </div>

      {/* RIGHT — photo + description panel */}
      <div className="mp-panel">
        <div key={active} className="mp-anim">
          {/* photo with title overlay */}
          <div className="mp-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.image} alt={`${t.title} workers`} />
            <div style={{ position: "absolute", left: 26, right: 26, bottom: 20, zIndex: 1, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ flex: "none", display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 14, background: RED, color: "#fff" }}><Ico name={t.icon} size={26} /></span>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".18em", color: "#FFC2C7" }}>WORKER CATEGORY</div>
                <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 26, color: "#fff", lineHeight: 1.1 }}>{t.title}</div>
              </div>
            </div>
          </div>

          {/* description + roles */}
          <div style={{ padding: "24px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
            <p style={{ fontSize: 16, color: "#DCE7F4", lineHeight: 1.65, margin: "0 0 22px" }}>{t.desc}</p>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", color: MUT2, marginBottom: 12 }}>TYPICAL ROLES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: "auto" }}>
              {t.roles.map((r, ri) => (
                <span key={r} className="mp-chip" style={{ animationDelay: `${ri * 70}ms` }}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Post Your Demand form (employers send their requirement) ---------------- */
function DemandPostForm() {
  const [sent, setSent] = useState(false)
  const inputBase: React.CSSProperties = { width: "100%", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "13px 15px", fontSize: 14.5, outline: "none", color: INK, fontFamily: "inherit" }
  const lbl: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }

  if (sent) {
    return (
      <div className="reveal" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: "48px 34px", boxShadow: "0 28px 60px -36px rgba(11,36,71,.4)", textAlign: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E9F7EF", color: "#1E8A5B", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Ico name="check" size={34} sw={2.6} /></div>
        <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: NAVY, marginBottom: 8 }}>Demand received!</div>
        <p style={{ fontSize: 15, color: MUT, lineHeight: 1.6, maxWidth: 380, margin: "0 auto 24px" }}>Thank you — our team will review your requirement and reply within one business day with a screened, trade-tested shortlist.</p>
        <button type="button" onClick={() => setSent(false)} className="hov-2" style={{ background: RED, color: "#fff", border: "none", padding: "13px 28px", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Post another demand</button>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="reveal" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 22, padding: 34, boxShadow: "0 28px 60px -36px rgba(11,36,71,.4)" }}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 25, color: NAVY }}>Post Your Demand Here!</div>
        <div style={{ width: 66, height: 4, background: RED, borderRadius: 2, margin: "10px auto 0" }} />
      </div>
      <p style={{ textAlign: "center", fontSize: 13.5, color: MUT, margin: "10px 0 22px" }}>Employers — send us your manpower requirement and we&rsquo;ll get back within 24 hours.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><label style={lbl}>Name *</label><input required name="name" placeholder="Your / company name" style={inputBase} /></div>
        <div><label style={lbl}>Email *</label><input required name="email" type="email" placeholder="you@email.com" style={inputBase} /></div>
        <div><label style={lbl}>Phone Number *</label><input required name="phone" type="tel" placeholder="+977 ..." style={inputBase} /></div>
        <div><label style={lbl}>Subject</label><input name="subject" placeholder="e.g. 20 Masons for Qatar" style={inputBase} /></div>
        <div style={{ gridColumn: "1 / 3" }}>
          <label style={lbl}>Message</label>
          <textarea name="message" rows={5} placeholder="Tell us the positions, quantity, country and timeline…" style={{ ...inputBase, resize: "vertical" }} />
        </div>
      </div>
      <button type="submit" className="hov-2" style={{ marginTop: 20, width: "100%", background: RED, color: "#fff", border: "none", padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>Submit Your Demand Now</button>
    </form>
  )
}

export function FullSite() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openDemand, setOpenDemand] = useState<Demand | null>(null)

  // lock scroll + close the demand detail on Escape
  useEffect(() => {
    if (!openDemand) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDemand(null) }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev }
  }, [openDemand])

  return (
    <div style={{ position: "relative", overflowX: "clip", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: INK, background: "#fff" }}>
      {/* ============ NAV — morphing scroll navbar ============ */}
      <MorphingScrollNavbar
        brand={<Logo height={38} />}
        brandHref="#home"
        links={navLinks}
        accent={RED}
        fontFamily="var(--font-manrope), system-ui, sans-serif"
        actions={
          <>
            <a className="msn-button msn-icon-button" href="tel:+97714985802" aria-label="Call Rio Overseas"><PhoneIcon /></a>
            <a className="msn-button" href="#contact" style={{ background: RED, borderColor: RED, color: "#fff" }}>Send Your Demand</a>
          </>
        }
      />

      {/* ============ HERO ============ */}
      <header id="home" style={{ position: "relative", padding: "150px 40px 90px", background: "radial-gradient(1200px 700px at 78% 18%, #EAF2FD 0%, rgba(234,242,253,0) 60%),linear-gradient(180deg,#FBFDFF 0%,#F2F7FE 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(11,36,71,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(11,36,71,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "linear-gradient(180deg,transparent,black 20%,black 60%,transparent)", WebkitMaskImage: "linear-gradient(180deg,transparent,black 20%,black 60%,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 120, left: 0, fontSize: 26, color: "#9DB4D0", animation: "skyPlane 26s linear infinite", pointerEvents: "none" }}>✈️</div>

        <div className="hero-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
          {/* LEFT */}
          <div>
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
              <a href="#contact" aria-label="Send Your Demand">
                <InteractiveHoverButton
                  text="Send Your Demand"
                  className="w-auto px-8 py-4 text-base border-[#0A2E52]/15 bg-white text-[#0A2E52] shadow-[0_16px_34px_-14px_rgba(11,36,71,.4)]"
                  style={{ "--primary": RED, "--primary-foreground": "#fff" } as React.CSSProperties}
                />
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
              <Flag code="cy" h={14} /> <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>Cyprus</span>
            </div>
            <div style={{ position: "absolute", top: "44%", right: "0%", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)", border: `1px solid ${LINE2}`, borderRadius: 12, padding: "8px 13px", boxShadow: "0 14px 30px -14px rgba(11,36,71,.3)", animation: "floaty 7s ease-in-out infinite" }}>
              <Flag code="qa" h={14} /> <span style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>Doha</span>
            </div>
            <div style={{ position: "absolute", bottom: "8%", left: "4%", display: "flex", alignItems: "center", gap: 15, background: "rgba(10,46,82,.94)", backdropFilter: "blur(10px)", borderRadius: 18, padding: "16px 22px", boxShadow: "0 22px 48px -16px rgba(11,36,71,.65)", border: `2px solid ${RED}`, animation: "floaty2 6.5s ease-in-out infinite" }}>
              <span style={{ flex: "none", width: 52, height: 52, borderRadius: 14, background: RED, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="shield" size={28} /></span>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#FF9AA0", letterSpacing: ".08em" }}>GOVT. LICENSED</span>
                <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: "#fff", lineHeight: 1 }}>1667 / 080 / 081</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: MUT2, letterSpacing: ".03em" }}>Dept. of Foreign Employment</span>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* ============ WHY CHOOSE US — radial orbital ============ */}
      <section id="why" style={{ position: "relative", background: "linear-gradient(180deg,#FFFFFF 0%,#EAF2FD 100%)", padding: "84px 40px 40px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={h2}>Why Choose Us</h2>
        </div>
        <div style={{ height: "min(72vh, 660px)", minHeight: 520 }}>
          <RadialOrbitalTimeline timelineData={whyChoose} />
        </div>
      </section>

      {/* ============ WHAT WE SUPPLY — harmonic wave ============ */}
      <div className="dark">
        <HarmonicWave
          images={supplyPhotos}
          scrollLength={320}
          title={(<>What We <span style={{ color: "#FF5A63", fontWeight: 400 }}>Supply</span>.</>)}
          sub="Skilled Nepali workers for every trade and every level — screened, trade-tested and ready to deploy across the Gulf, Europe & Asia."
        />
      </div>

      {/* ============ COUNTRIES WE SERVE ============ */}
      <section id="countries" style={{ background: BG, padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 34 }}>
            <div style={{ maxWidth: 620 }}>
              <div style={eyebrow}>GLOBAL REACH</div>
              <h2 style={h2}>Countries we serve</h2>
              <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "14px 0 0" }}>Connecting Nepalese talent to opportunities across the world.</p>
            </div>
          </div>
          {/* destination flags — interactive dock, country name on hover */}
          <div className="reveal" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, padding: "18px 24px 26px", boxShadow: "0 18px 40px -32px rgba(11,36,71,.5)" }}>
            <ToolDock
              label="Countries we serve"
              size={72}
              items={destinations.map((c) => ({
                label: c.name,
                icon: (
                  <ToolDockTile className="bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://flagcdn.com/w160/${c.code}.png`} alt="" draggable={false} className="size-full object-cover" />
                  </ToolDockTile>
                ),
              }))}
            />
            <div style={{ textAlign: "center", fontSize: 13, color: MUT, marginTop: 4 }}>Hover a flag to see the country.</div>
          </div>
        </div>
      </section>

      {/* ============ MANPOWER WE SUPPLY ============ */}
      <section id="workers" style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <div style={eyebrow}>THE FULL RANGE</div>
            <AnimatedH2 text="Manpower for every level" />
            <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "14px 0 0" }}>From degree-qualified professionals to reliable general labour and disciplined security personnel — sourced, screened and trade-tested for you.</p>
          </div>
          <ManpowerInfographic />

          {/* badges */}
          <div className="reveal cols4" style={{ gap: 16, marginTop: 40 }}>
            {workerBadges.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: BG, border: `1px solid ${LINE}`, borderRadius: 999, padding: "13px 18px", fontFamily: SORA, fontWeight: 700, fontSize: 13.5, color: NAVY, textAlign: "center" }}>
                <span style={{ color: RED }}><Ico name="check" size={16} sw={2.4} /></span>{b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section style={{ background: "linear-gradient(180deg,#F4F8FD,#fff)", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 22px" }}>
            <div style={eyebrow}>HOW IT WORKS</div>
            <AnimatedH2 text="From demand to deployment" />
          </div>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap", marginBottom: 50, fontFamily: SORA, fontWeight: 800, letterSpacing: ".14em", fontSize: 15, color: NAVY }}>
            <span>RECRUIT</span><span style={{ color: RED }}>·</span><span>TRAIN</span><span style={{ color: RED }}>·</span><span>DEPLOY</span>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ============ DEMANDS ============ */}
      <section id="demands" style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ maxWidth: 620 }}>
              <div style={eyebrow}>LIVE DEMANDS</div>
              <h2 style={h2}>Current manpower demands</h2>
              <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "14px 0 0" }}>Active recruitment demands from our verified employers — tap any demand to see the full details.</p>
            </div>
            <div style={{ fontSize: 14, color: MUT, fontWeight: 600 }}><span style={{ color: RED, fontWeight: 800 }}>{demands.length}</span> open demands</div>
          </div>
          <div className="split2" style={{ gap: 20 }}>
            {demands.map((d) => {
              const total = d.positions.reduce((s, p) => s + p.count, 0)
              return (
                <button key={d.id} type="button" onClick={() => setOpenDemand(d)} className="hov-6" style={{ textAlign: "left", cursor: "pointer", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, padding: 26, boxShadow: "0 18px 40px -30px rgba(11,36,71,.4)", transition: "transform .25s ease, box-shadow .25s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: RED, background: "#FDECEE", padding: "5px 12px", borderRadius: 999 }}>{d.category}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: NAVY }}><Flag code={d.code} h={18} title={d.country} /> {d.city}, {d.country}</span>
                  </div>
                  <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 21, color: NAVY, marginBottom: 6 }}>{d.company}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                    {d.positions.map((p) => (
                      <span key={p.title} style={{ fontSize: 12.5, fontWeight: 600, color: NAVY, background: BG, border: `1px solid ${LINE2}`, borderRadius: 999, padding: "6px 12px" }}>{p.title} <strong style={{ color: RED }}>×{p.count}</strong></span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 16, borderTop: "1px solid #EEF3F9" }}>
                    <div style={{ fontSize: 13, color: MUT, fontWeight: 600 }}>
                      <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 18, color: NAVY }}>{total}</span> vacancies · {d.gender}
                      <span style={{ display: "block", fontSize: 12.5, color: RED, fontWeight: 700, marginTop: 2 }}>Interview: {d.interview}</span>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: RED, fontWeight: 700, fontSize: 14 }}>View details <span>→</span></span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section style={{ background: "#fff", padding: "90px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={eyebrow}>QUESTIONS</div>
            <AnimatedH2 text="Frequently asked" />
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

      {/* ============ GOOGLE REVIEWS ============ */}
      <GoogleReviews />

      {/* ============ CONTACT ============ */}
      <section id="contact" style={{ background: BG, padding: "90px 40px" }}>
        <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", gap: 50 }}>
          <div className="reveal">
            <div style={eyebrow}>GET IN TOUCH</div>
            <h2 style={{ ...h2, fontSize: 42, margin: "0 0 18px" }}>Let&rsquo;s start your journey</h2>
            <p style={{ fontSize: 16.5, color: MUT, lineHeight: 1.6, margin: "0 0 30px" }}>Visit our office in Kathmandu or reach out — our team responds within one business day.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[["📍", "Head Office", "Samakhusi, Tokha-10, Kathmandu, Nepal"], ["📞", "Call Us", "01-4985802"], ["✉️", "Email", "riooverseasnepal@gmail.com"], ["🌐", "Website", "riooverseasnepal.com"]].map(([ic, t, v]) => (
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
          <DemandPostForm />
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section style={{ background: "#fff", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 34 }}>
            <div style={eyebrow}>WHAT DRIVES US</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {coreValues.map((v, i) => (
              <div key={v.title} className="reveal" style={{ transitionDelay: `${i * 50}ms`, flex: "1 1 150px", maxWidth: 200, textAlign: "center" }}>
                <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, margin: "0 auto 12px", borderRadius: 15, background: "#EAF2FD", color: RED }}><Ico name={v.icon} size={26} /></span>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 16.5, color: NAVY, marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 13.5, color: MUT, lineHeight: 1.45 }}>{v.desc}</div>
              </div>
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

      {openDemand && <DemandModal demand={openDemand} onClose={() => setOpenDemand(null)} />}
    </div>
  )
}

/* ---------------- demand detail modal ---------------- */
function DemandModal({ demand: d, onClose }: { demand: Demand; onClose: () => void }) {
  const total = d.positions.reduce((s, p) => s + p.count, 0)
  const [applying, setApplying] = useState(false)
  const [sent, setSent] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const inputBase: React.CSSProperties = { width: "100%", border: `1px solid ${LINE2}`, borderRadius: 11, padding: "12px 14px", fontSize: 14.5, outline: "none", color: INK, fontFamily: "inherit" }
  const lbl: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 700, color: NAVY, marginBottom: 6 }
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${d.company} manpower demand`}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", padding: 20, background: "rgba(7,20,38,.6)", backdropFilter: "blur(4px)", animation: "mpFade .25s ease both" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: 620, maxHeight: "88vh", overflowY: "auto", background: "#fff", borderRadius: 22, boxShadow: "0 40px 90px -30px rgba(11,36,71,.7)", animation: "mpUp .3s cubic-bezier(.22,1,.36,1) both" }}
      >
        <style>{`@keyframes mpFade { from { opacity:0;} to {opacity:1;} } @keyframes mpUp { from { opacity:0; transform: translateY(18px) scale(.98);} to {opacity:1; transform:none;} }`}</style>
        {/* header */}
        <div style={{ position: "relative", padding: "26px 28px", background: `linear-gradient(150deg,${NAVY},#12386a)`, color: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22 }}>
          <button type="button" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", fontSize: 20, lineHeight: 1, cursor: "pointer" }}>×</button>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 700, letterSpacing: ".04em", background: "rgba(255,255,255,.12)", borderRadius: 999, padding: "6px 12px", marginBottom: 12 }}><Flag code={d.code} h={16} title={d.country} /> {d.city}, {d.country} · {d.category}</div>
          <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, lineHeight: 1.2 }}>{d.company}</div>
          <div style={{ fontSize: 13.5, color: MUT2, marginTop: 6 }}>Recruitment through Rio Overseas Pvt. Ltd. · {total} vacancies</div>
        </div>

        {sent ? (
          /* ---------- success ---------- */
          <div style={{ padding: "40px 28px 36px", textAlign: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E9F7EF", color: "#1E8A5B", display: "grid", placeItems: "center", margin: "0 auto 18px" }}><Ico name="check" size={34} sw={2.6} /></div>
            <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 22, color: NAVY, marginBottom: 8 }}>Application received!</div>
            <p style={{ fontSize: 15, color: MUT, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>Thank you for applying to <strong style={{ color: NAVY }}>{d.company}</strong>. Our team will review your details{files.length > 0 ? ` and ${files.length} document${files.length > 1 ? "s" : ""}` : ""} and contact you about the interview on {d.interview}.</p>
            <button type="button" onClick={onClose} className="btn-red" style={{ background: RED, color: "#fff", border: "none", padding: "14px 30px", borderRadius: 999, fontSize: 15.5, fontWeight: 700, cursor: "pointer" }}>Done</button>
          </div>
        ) : applying ? (
          /* ---------- apply form ---------- */
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            style={{ padding: "24px 28px 28px" }}
          >
            <button type="button" onClick={() => setApplying(false)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "none", color: MUT, fontWeight: 700, fontSize: 13.5, cursor: "pointer", padding: 0, marginBottom: 16 }}>← Back to demand</button>
            <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 18, color: NAVY, marginBottom: 4 }}>Apply for this demand</div>
            <p style={{ fontSize: 13.5, color: MUT, margin: "0 0 20px" }}>Fill in your details and upload your documents — we&rsquo;ll get in touch.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={lbl}>Full Name *</label><input required name="name" placeholder="Your full name" style={inputBase} /></div>
              <div><label style={lbl}>Phone *</label><input required name="phone" type="tel" placeholder="+977 ..." style={inputBase} /></div>
            </div>
            <div style={{ marginBottom: 14 }}><label style={lbl}>Location</label><input name="location" placeholder="Your city / district" style={inputBase} /></div>
            <div style={{ marginBottom: 14 }}><label style={lbl}>Position applying for</label>
              <select name="position" defaultValue={d.positions[0]?.title} style={{ ...inputBase, cursor: "pointer" }}>
                {d.positions.map((p) => (<option key={p.title}>{p.title}</option>))}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}><label style={lbl}>Details</label><textarea name="details" rows={3} placeholder="Experience, availability, any notes…" style={{ ...inputBase, resize: "vertical" }} /></div>

            {/* documents upload */}
            <label style={lbl}>Documents (passport, CV, certificates)</label>
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", border: `1.5px dashed ${LINE2}`, borderRadius: 14, padding: "22px 18px", background: BG, cursor: "pointer", marginBottom: files.length ? 12 : 20 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "#EAF2FD", color: RED, display: "grid", placeItems: "center" }}><Ico name="file" size={22} /></span>
              <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>Click to upload documents</span>
              <span style={{ fontSize: 12, color: MUT }}>PDF, JPG or PNG — you can select multiple files</span>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} style={{ display: "none" }} />
            </label>
            {files.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {files.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 10, padding: "9px 12px" }}>
                    <span style={{ color: RED }}><Ico name="file" size={16} /></span>
                    <span style={{ fontSize: 13, color: INK, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                    <span style={{ fontSize: 12, color: MUT }}>{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="btn-red" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", background: RED, color: "#fff", border: "none", padding: "15px 24px", borderRadius: 999, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>Submit application <span>→</span></button>
          </form>
        ) : (
          /* ---------- demand details ---------- */
          <div style={{ padding: "24px 28px 28px" }}>
            {/* positions */}
            <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 13, letterSpacing: ".08em", color: RED, marginBottom: 12 }}>POSITIONS &amp; SALARY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {d.positions.map((p) => (
                <div key={p.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: BG, border: `1px solid ${LINE}`, borderRadius: 12, padding: "13px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: SORA, fontWeight: 800, fontSize: 15, color: NAVY }}>{p.title}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: RED, borderRadius: 999, padding: "3px 9px" }}>{p.count} needed</span>
                  </div>
                  <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 15, color: NAVY }}>{p.salary}</div>
                </div>
              ))}
            </div>

            {/* requirements */}
            <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 13, letterSpacing: ".08em", color: RED, marginBottom: 12 }}>REQUIREMENTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px", marginBottom: 24 }}>
              {[["Gender", d.gender], ["Age", d.ageRange], ["Language", d.languages], ...(d.experience ? [["Experience", d.experience] as [string, string]] : [])].map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ flex: "none", color: RED, marginTop: 2 }}><Ico name="check" size={16} sw={2.4} /></span>
                  <div><div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".04em", color: MUT, textTransform: "uppercase" }}>{k}</div><div style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{v}</div></div>
                </div>
              ))}
            </div>

            {/* facilities */}
            <div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 13, letterSpacing: ".08em", color: RED, marginBottom: 12 }}>FACILITIES</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {d.facilities.map((f) => (
                <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: NAVY, background: "#EAF2FD", borderRadius: 999, padding: "8px 14px" }}><span style={{ color: RED }}>✔</span>{f}</span>
              ))}
            </div>

            {/* interview + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: `linear-gradient(150deg,${DEEP},#0A1A30)`, borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
              <span style={{ flex: "none", width: 42, height: 42, borderRadius: 12, background: RED, color: "#fff", display: "grid", placeItems: "center" }}><Ico name="clock" size={22} /></span>
              <div><div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em", color: MUT2 }}>INTERVIEW DATE</div><div style={{ fontFamily: SORA, fontWeight: 800, fontSize: 18, color: "#fff" }}>{d.interview}</div></div>
            </div>
            <button type="button" onClick={() => setApplying(true)} className="btn-red" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", background: RED, color: "#fff", border: "none", padding: "15px 24px", borderRadius: 999, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 34px -14px rgba(224,30,43,.6)" }}>Apply for this demand <span>→</span></button>
          </div>
        )}
      </div>
    </div>
  )
}

