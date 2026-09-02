"use client"

import { useState, useEffect } from "react"

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
        padding: "36px 40px",
        boxSizing: "border-box",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "radial-gradient(circle at 50% 40%, #1e2936 0%, #0d1217 75%, #080b0e 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(92, 160, 255, 0.09) 0%, rgba(0, 0, 0, 0) 65%)",
          filter: "blur(80px)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Rio Overseas"
            style={{ height: 42, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
            }}
          >
            Rio Overseas Pvt. Ltd.
          </span>
        </div>
        <a
          href="#home"
          style={{
            color: "#60A5FA",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
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
          maxWidth: "760px",
          width: "100%",
          padding: "40px 20px",
        }}
      >
        {/* MAIN TYPOGRAPHY */}
        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 78px)",
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 26px",
            color: "#ffffff",
            fontFamily: "var(--font-sora), 'Arial Narrow', sans-serif",
            textShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          UNDER
          <br />
          CONSTRUCTION
        </h1>

        {/* SUBTITLE WITH FLANKING LINES */}
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
          <div style={{ height: "1px", width: "50px", background: "rgba(255,255,255,0.2)" }} />
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            SITE NEARLY READY
          </span>
          <div style={{ height: "1px", width: "50px", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* PROGRESS BAR */}
        <div style={{ width: "100%", maxWidth: "360px", marginBottom: "38px" }}>
          <div
            style={{
              width: "100%",
              height: "7px",
              background: "rgba(255, 255, 255, 0.16)",
              borderRadius: "999px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%)",
                borderRadius: "999px",
                transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 0 14px rgba(96, 165, 250, 0.7)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.45)",
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
            background: "#60A5FA",
            color: "#0F172A",
            border: "none",
            padding: "13px 36px",
            borderRadius: "4px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 8px 24px -6px rgba(96, 165, 250, 0.45)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#7CBDFF"
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#60A5FA"
            e.currentTarget.style.transform = "none"
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
        {/* CIRCULAR SOCIAL BUTTONS */}
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
                border: "1.5px solid rgba(255, 255, 255, 0.28)",
                display: "grid",
                placeItems: "center",
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#60A5FA"
                e.currentTarget.style.color = "#60A5FA"
                e.currentTarget.style.background = "rgba(96, 165, 250, 0.12)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.28)"
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)"
                e.currentTarget.style.background = "transparent"
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
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} by Rio Overseas Pvt. Ltd. Under Construction.
        </div>
      </footer>

      {/* CHAT BUBBLE BUTTON (BOTTOM RIGHT) */}
      <button
        onClick={() => setShowNotifyModal(true)}
        aria-label="Contact Rio Overseas"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#60A5FA",
          border: "none",
          color: "#0F172A",
          fontSize: "20px",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(96, 165, 250, 0.45)",
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
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#1E293B",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "18px",
              padding: "32px 28px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
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
                background: "rgba(255,255,255,0.08)",
                border: "none",
                color: "rgba(255,255,255,0.7)",
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

            <h3 style={{ margin: "0 0 8px", fontSize: "22px", fontWeight: 700, color: "#fff" }}>
              Rio Overseas Pvt. Ltd.
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
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
                    padding: "13px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(15, 23, 42, 0.9)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#60A5FA",
                    color: "#0F172A",
                    border: "none",
                    padding: "13px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 20px rgba(96, 165, 250, 0.4)",
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
