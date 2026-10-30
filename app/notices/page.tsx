import type { Metadata } from "next"
import { listNotices } from "@/lib/notices-server"
import { NoticeBoard } from "./notice-board"

export const metadata: Metadata = {
  title: "Notices — Rio Overseas Pvt. Ltd.",
  description: "Official notices and announcements from Rio Overseas Pvt. Ltd., a government-licensed foreign employment agency in Kathmandu, Nepal.",
}

// The dashboard refreshes this page the moment a notice changes. The timer is only
// a safety net, kept long because listing the store counts against the Blob quota.
export const revalidate = 21600

export default async function NoticesPage() {
  return <NoticeBoard notices={await listNotices()} />
}
