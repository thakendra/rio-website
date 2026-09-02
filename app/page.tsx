"use client"

import { useState, useEffect } from "react"

const RIO_NAVY = "#0A2E52"
const RIO_DARK_NAVY = "#071A2E"
const RIO_RED = "#E01E2B"
const RIO_RED_HOVER = "#FF2E3C"
const RIO_MUTED = "#9DB8DA"

export default function UnderConstructionPage() {
  const [progress, setProgress] = useState(0)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(82), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "32px 36px",
        boxSizing: "border-box",
        color: "#ffffff",
        fontFamily: "var(--font-manrope), system-ui, -apple-system, sans-serif",
        background: `radial-gradient(circle at 50% 35%, ${RIO_NAVY} 0%, ${RIO_DARK_NAVY} 70%, #040e1a 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Ambient Red Glow in Background */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(224, 30, 43, 0.14) 0%, rgba(10, 46, 82, 0) 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* TOP HEADER */}
      <header
        style={{
          width: "100%",
          maxWidth: "1280px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              background: "#ffffff",
              padding: "6px 14px",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Rio Overseas Pvt. Ltd."
              style={{ height: 38, width: "auto", display: "block" }}
            />
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#ffffff",
              textTransform: "uppercase",
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            Rio Overseas <span style={{ color: RIO_RED }}>Pvt. Ltd.</span>
          </span>
        </div>
        <a
          href="#home"
          style={{
            color: RIO_RED,
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            background: "rgba(224, 30, 43, 0.12)",
            border: `1px solid rgba(224, 30, 43, 0.3)`,
            padding: "8px 18px",
            borderRadius: "999px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = RIO_RED
            e.currentTarget.style.color = "#ffffff"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(224, 30, 43, 0.12)"
            e.currentTarget.style.color = RIO_RED
          }}
        >
          HOME
        </a>
      </header>

      {/* CENTER HERO CONTENT */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          margin: "auto 0",
          maxWidth: "780px",
          width: "100%",
          padding: "40px 20px",
        }}
      >
        {/* MAIN TYPOGRAPHY */}
        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 24px",
            color: "#ffffff",
            fontFamily: "var(--font-sora), sans-serif",
            textShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          UNDER
          <br />
          <span style={{ color: RIO_RED }}>CONSTRUCTION</span>
        </h1>

        {/* SUBTITLE WITH FLANKING RED LINES */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "36px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <div style={{ height: "2px", width: "50px", background: `linear-gradient(90deg, transparent, ${RIO_RED})` }} />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#ffffff",
              fontFamily: "var(--font-sora), sans-serif",
            }}
          >
            SITE NEARLY READY
          </span>
          <div style={{ height: "2px", width: "50px", background: `linear-gradient(90deg, ${RIO_RED}, transparent)` }} />
        </div>

        {/* PROGRESS BAR WITH RIO RED ACCENT */}
        <div style={{ width: "100%", maxWidth: "360px", marginBottom: "38px" }}>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(255, 255, 255, 0.14)",
              borderRadius: "999px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${RIO_RED} 0%, #FF525F 100%)`,
                borderRadius: "999px",
                transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: `0 0 16px ${RIO_RED}`,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              fontWeight: 700,
              color: RIO_MUTED,
              marginTop: "8px",
              letterSpacing: "0.06em",
            }}
          >
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* NOTIFY ME BUTTON */}
        <button
          onClick={() => setShowNotifyModal(true)}
          style={{
            background: RIO_RED,
            color: "#ffffff",
            border: "none",
            padding: "14px 38px",
            borderRadius: "6px",
            fontSize: "13.5px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 10px 28px -6px rgba(224, 30, 43, 0.65)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = RIO_RED_HOVER
            e.currentTarget.style.transform = "translateY(-2px)"
            e.currentTarget.style.boxShadow = "0 14px 34px -4px rgba(224, 30, 43, 0.8)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = RIO_RED
            e.currentTarget.style.transform = "none"
            e.currentTarget.style.boxShadow = "0 10px 28px -6px rgba(224, 30, 43, 0.65)"
          }}
        >
          Notify Me
        </button>
      </main>

      {/* FOOTER & SOCIAL ICONS */}
      <footer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "22px",
          zIndex: 10,
        }}
      >
        {/* CIRCULAR SOCIAL BUTTONS WITH BRAND ACCENTS */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "f", title: "Facebook" },
            { label: "in", title: "LinkedIn" },
            { label: "📷", title: "Instagram" },
            { label: "𝕏", title: "Twitter / X" },
          ].map((item, idx) => (
            <a
              key={idx}
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                setShowNotifyModal(true)
              }}
              title={item.title}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 255, 255, 0.3)",
                display: "grid",
                placeItems: "center",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = RIO_RED
                e.currentTarget.style.color = "#ffffff"
                e.currentTarget.style.background = RIO_RED
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
                e.currentTarget.style.color = "#ffffff"
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.transform = "none"
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* COPYRIGHT LINE */}
        <div
          style={{
            fontSize: "12px",
            color: RIO_MUTED,
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} by Rio Overseas Pvt. Ltd. Under Construction.
        </div>
      </footer>

      {/* CHAT BUBBLE BUTTON (BOTTOM RIGHT IN RIO RED) */}
      <button
        onClick={() => setShowNotifyModal(true)}
        aria-label="Contact Rio Overseas"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: RIO_RED,
          border: "none",
          color: "#ffffff",
          fontSize: "20px",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          boxShadow: "0 10px 28px rgba(224, 30, 43, 0.6)",
          zIndex: 20,
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬
      </button>

      {/* NOTIFY ME / CONTACT MODAL */}
      {showNotifyModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 26, 46, 0.85)",
            backdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: RIO_NAVY,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "18px",
              padding: "34px 30px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
              position: "relative",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <button
              onClick={() => {
                setShowNotifyModal(false)
                setSubmitted(false)
              }}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ background: "#fff", padding: "4px 10px", borderRadius: "6px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Rio Overseas" style={{ height: 28, width: "auto" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#fff" }}>
                Rio Overseas <span style={{ color: RIO_RED }}>Pvt. Ltd.</span>
              </h3>
            </div>

            <p style={{ margin: "0 0 20px", fontSize: "14px", color: RIO_MUTED, lineHeight: 1.5 }}>
              हाम्रो आधिकारिक वेब पोर्टल निर्माणाधीन अवस्थामा छ। नयाँ अपडेट र रोजगारीको सूचना प्राप्त गर्न इमेल वा फोन नम्बर छाड्नुहोस्।
            </p>

            {submitted ? (
              <div
                style={{
                  background: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  color: "#4ADE80",
                  padding: "16px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                ✓ धन्यवाद! तपाईंको विवरण प्राप्त भयो। हामी छिट्टै सम्पर्क गर्नेछौं।
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSubmitted(true)
                }}
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <input
                  type="text"
                  required
                  placeholder="इमेल वा फोन नम्बर (Email / Phone)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(7, 26, 46, 0.9)",
                    color: "#fff",
                    fontSize: "14.5px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: RIO_RED,
                    color: "#ffffff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "14.5px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px -4px rgba(224, 30, 43, 0.6)",
                  }}
                >
                  Notify Me / जानकारी दिनुहोस्
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
