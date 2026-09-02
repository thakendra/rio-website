"use client"

import { useState } from "react"

export function UnderConstructionTopBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      style={{
        position: "relative",
        zIndex: 102,
        background: "linear-gradient(90deg, #0A2E52 0%, #154675 50%, #0A2E52 100%)",
        color: "#fff",
        borderBottom: "2px solid #F59E0B",
        boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
        fontSize: "13px",
        fontWeight: 500,
        padding: "8px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        fontFamily: "var(--font-manrope), sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <span
          style={{
            background: "#F59E0B",
            color: "#0F172A",
            fontSize: "11px",
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: "4px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>🚧</span> UNDER CONSTRUCTION
        </span>
        <span style={{ textAlign: "center" }}>
          वेबसाइट हाल निर्माणाधीन छ | Our official website is currently being updated.
        </span>
        <a
          href="#contact"
          style={{
            color: "#F59E0B",
            fontWeight: 700,
            textDecoration: "underline",
            marginLeft: "4px",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          Contact Office <span>→</span>
        </a>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        title="Hide banner"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
          lineHeight: 1,
          padding: "4px 8px",
          borderRadius: "4px",
          flexShrink: 0,
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        ✕
      </button>
    </div>
  )
}

export function UnderConstructionHeroBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(224, 30, 43, 0.05) 100%)",
        border: "1px solid rgba(245, 158, 11, 0.3)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "24px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 10px 30px -10px rgba(245, 158, 11, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top hazard stripes accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "repeating-linear-gradient(45deg, #F59E0B, #F59E0B 12px, #0A2E52 12px, #0A2E52 24px)",
        }}
      />
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div
          style={{
            fontSize: "28px",
            lineHeight: 1,
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: "12px",
            padding: "10px",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          🚧
        </div>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                color: "#B45309",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Website Under Construction / निर्माणाधीन
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#D97706",
                background: "#FEF3C7",
                padding: "2px 9px",
                borderRadius: "999px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#D97706",
                  display: "inline-block",
                }}
              />
              In Progress
            </span>
          </div>
          <p
            style={{
              fontSize: "14.5px",
              lineHeight: 1.5,
              color: "#374151",
              margin: 0,
            }}
          >
            हाम्रो आधिकारिक वेबसाइट निर्माणको क्रममा छ। नयाँ सूचना, वैदेशिक रोजगारीका अवसरहरू र सेवाहरू चाँडै नै पूर्ण रूपमा उपलब्ध हुनेछन्।
            <br />
            <span style={{ fontSize: "13.5px", color: "#6B7280" }}>
              Our official portal is currently under active development. For urgent recruitment inquiries or candidate submissions, please contact our office directly.
            </span>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "12px",
              flexWrap: "wrap",
              fontSize: "13.5px",
              fontWeight: 600,
            }}
          >
            <a
              href="#contact"
              style={{
                color: "#E01E2B",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "none",
              }}
            >
              <span>📞</span> Contact Office <span>→</span>
            </a>
            <span style={{ color: "#D1D5DB" }}>|</span>
            <span style={{ color: "#4B5563" }}>📧 info@riooverseas.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}
