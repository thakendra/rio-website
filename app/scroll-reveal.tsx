"use client"

import { useEffect } from "react"

/**
 * Site-wide scroll-reveal. Watches every `.reveal` element and adds `.reveal-in`
 * when it scrolls into view, driving the CSS entrance animation. A MutationObserver
 * picks up elements that mount later (modals, form success states, tab content).
 * Respects prefers-reduced-motion by revealing everything immediately.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const revealAll = () =>
      document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)").forEach((el) => el.classList.add("reveal-in"))

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )

    const observe = (root: ParentNode) =>
      root.querySelectorAll?.(".reveal:not(.reveal-in)").forEach((el) => io.observe(el))

    observe(document)

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return
          const el = n as HTMLElement
          if (el.classList?.contains("reveal") && !el.classList.contains("reveal-in")) io.observe(el)
          observe(el)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // safety net: reveal anything still hidden after a moment. If the viewport has
    // zero height (page not being painted — e.g. a hidden/minimized tab where the
    // observer can't fire), reveal everything so content is never stuck invisible.
    const t = setTimeout(() => {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (vh === 0 || (r.top < vh && r.bottom > 0)) el.classList.add("reveal-in")
      })
    }, 1200)

    // when a background/hidden tab becomes visible, make sure in-view content shows
    const onVisible = () => {
      if (document.visibilityState !== "visible") return
      document.querySelectorAll<HTMLElement>(".reveal:not(.reveal-in)").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("reveal-in")
      })
    }
    document.addEventListener("visibilitychange", onVisible)

    return () => {
      io.disconnect()
      mo.disconnect()
      clearTimeout(t)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  return null
}
