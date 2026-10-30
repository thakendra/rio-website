import type { Metadata } from "next"
import { adminConfigured, isAdmin } from "@/lib/admin-auth"
import { listNotices, storageConfigured } from "@/lib/notices-server"
import { Dashboard } from "./dashboard"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Dashboard — Rio Overseas",
  robots: { index: false, follow: false },
}

// sign-in and storage state must be read per request, never frozen at build time
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  if (!adminConfigured() || !(await isAdmin())) return <LoginForm configured={adminConfigured()} />

  const connected = storageConfigured()
  return <Dashboard notices={connected ? await listNotices() : []} storageConnected={connected} />
}
