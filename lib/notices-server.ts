import "server-only"
import { list, type ListBlobResultBlob } from "@vercel/blob"
import { toNotices, type Notice } from "./notices"

export const storageConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

export async function listNotices(): Promise<Notice[]> {
  // no store connected yet: the board is simply empty, and the build still passes
  if (!storageConfigured()) return []

  const blobs: ListBlobResultBlob[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: "notices/", cursor })
    blobs.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  return toNotices(blobs)
}
