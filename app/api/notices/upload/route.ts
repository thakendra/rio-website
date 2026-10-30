import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/admin-auth"
import { contentTypeForPath, isThumbPath, MAX_FILE_BYTES, MAX_THUMB_BYTES } from "@/lib/notices"

/**
 * Hands the signed-in browser a short-lived token so the file goes straight to
 * Blob storage. Vercel functions cap request bodies at 4.5 MB, which a scanned
 * A4 page easily exceeds, so uploads cannot pass through this route.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Please sign in again." }, { status: 401 })

  try {
    const body = (await request.json()) as HandleUploadBody
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        const contentType = contentTypeForPath(pathname)
        if (!contentType) throw new Error("This file name or type is not allowed.")
        return {
          allowedContentTypes: [contentType],
          maximumSizeInBytes: isThumbPath(pathname) ? MAX_THUMB_BYTES : MAX_FILE_BYTES,
          addRandomSuffix: false,
          allowOverwrite: false,
        }
      },
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload could not start." }, { status: 400 })
  }
}
