"use client"

import { useActionState } from "react"
import { BG, LINE, LINE2, Logo, MUT, NAVY, RED, SORA } from "../full-site"
import { login, type LoginState } from "./actions"

const initial: LoginState = { error: null }

export function LoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(login, initial)

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 20, background: BG, fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div style={{ width: "min(420px, 100%)", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, padding: "34px 30px", boxShadow: "0 30px 70px -44px rgba(11,36,71,.6)" }}>
        <Logo height={44} />
        <h1 style={{ fontFamily: SORA, fontWeight: 800, fontSize: 24, color: NAVY, margin: "22px 0 6px" }}>Notice dashboard</h1>

        {configured ? (
          <form action={action}>
            <p style={{ fontSize: 14.5, color: MUT, lineHeight: 1.6, margin: "0 0 20px" }}>Sign in to publish and manage notices.</p>
            <label htmlFor="password" style={{ display: "block", fontSize: 13.5, fontWeight: 700, color: NAVY, marginBottom: 7 }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? "login-error" : undefined}
              style={{ width: "100%", boxSizing: "border-box", height: 48, padding: "0 14px", border: `1px solid ${state.error ? RED : LINE2}`, borderRadius: 10, fontSize: 16, font: "inherit", color: NAVY }}
            />
            {state.error && <div id="login-error" role="alert" style={{ color: RED, fontSize: 13.5, fontWeight: 600, marginTop: 8 }}>{state.error}</div>}
            <button type="submit" disabled={pending} style={{ width: "100%", height: 48, marginTop: 18, border: 0, borderRadius: 10, background: NAVY, color: "#fff", font: "inherit", fontSize: 15, fontWeight: 700, cursor: pending ? "default" : "pointer", opacity: pending ? 0.7 : 1 }}>
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        ) : (
          <p role="alert" style={{ fontSize: 14.5, color: MUT, lineHeight: 1.6, margin: 0 }}>
            Sign-in is not set up yet. Add an <b>ADMIN_PASSWORD</b> environment variable of at least 12 characters in the Vercel project, then redeploy.
          </p>
        )}
      </div>
    </main>
  )
}
