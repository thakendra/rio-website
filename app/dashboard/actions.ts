"use server"

import { del, list, rename } from "@vercel/blob"
import { revalidatePath } from "next/cache"
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/admin-auth"
import { cleanTitle, fileExtension, isNoticeId, isThumbPath, isValidDate, noticePath } from "@/lib/notices"

export type LoginState = { error: string | null }
export type ActionResult = { ok: true } | { ok: false; error: string }

const SIGNED_OUT: ActionResult = { ok: false, error: "Your session has ended. Please sign in again." }

function refreshPages() {
  revalidatePath("/notices")
  revalidatePath("/dashboard")
}

function failure(error: unknown): ActionResult {
  console.error("[dashboard]", error)
  return { ok: false, error: "Storage did not respond. Please try again." }
}

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const attempt = form.get("password")
  if (typeof attempt === "string" && passwordMatches(attempt)) {
    await startSession()
    revalidatePath("/dashboard")
    return { error: null }
  }
  // slows down password guessing
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { error: "Incorrect password." }
}

export async function logout() {
  await endSession()
  revalidatePath("/dashboard")
}

/** Called once a batch of browser uploads has finished. */
export async function publishUploads(): Promise<ActionResult> {
  if (!(await isAdmin())) return SIGNED_OUT
  refreshPages()
  return { ok: true }
}

async function blobsOf(id: string) {
  const { blobs } = await list({ prefix: `notices/${id}/` })
  return blobs
}

export async function updateNotice(id: string, title: string, date: string): Promise<ActionResult> {
  if (!(await isAdmin())) return SIGNED_OUT
  const cleaned = cleanTitle(title)
  if (!isNoticeId(id) || !cleaned || !isValidDate(date)) return { ok: false, error: "Please enter a title and a valid date." }

  try {
    const main = (await blobsOf(id)).find((blob) => !isThumbPath(blob.pathname))
    if (!main) return { ok: false, error: "This notice no longer exists." }
    const target = noticePath(id, date, cleaned, fileExtension(main.pathname))
    if (target !== main.pathname) await rename(main.url, target, { access: "public", addRandomSuffix: false })
  } catch (error) {
    return failure(error)
  }
  refreshPages()
  return { ok: true }
}

export async function deleteNotice(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return SIGNED_OUT
  if (!isNoticeId(id)) return { ok: false, error: "This notice no longer exists." }

  try {
    const urls = (await blobsOf(id)).map((blob) => blob.url)
    if (urls.length) await del(urls)
  } catch (error) {
    return failure(error)
  }
  refreshPages()
  return { ok: true }
}
