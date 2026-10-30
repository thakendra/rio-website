import "server-only"
import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

/**
 * One shared office password, kept in the ADMIN_PASSWORD env var.
 * The session cookie is signed with a key derived from that password, so
 * changing the password signs everyone out.
 */
const COOKIE = "rio_admin"
const SESSION_SECONDS = 60 * 60 * 24 * 7
const MIN_PASSWORD_LENGTH = 12

const sha256 = (value: string) => createHash("sha256").update(value).digest()

function adminPassword() {
  const password = process.env.ADMIN_PASSWORD ?? ""
  return password.length >= MIN_PASSWORD_LENGTH ? password : null
}

function sign(expires: string, password: string) {
  return createHmac("sha256", sha256(`rio-admin-session:${password}`)).update(expires).digest("hex")
}

export const adminConfigured = () => adminPassword() !== null

export function passwordMatches(attempt: string) {
  const password = adminPassword()
  return password !== null && timingSafeEqual(sha256(attempt), sha256(password))
}

export async function startSession() {
  const password = adminPassword()
  if (!password) return
  const expires = String(Date.now() + SESSION_SECONDS * 1000)
  const store = await cookies()
  store.set(COOKIE, `${expires}.${sign(expires, password)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  })
}

export async function endSession() {
  const store = await cookies()
  store.delete(COOKIE)
}

export async function isAdmin() {
  const password = adminPassword()
  if (!password) return false
  const store = await cookies()
  const [expires, signature] = (store.get(COOKIE)?.value ?? "").split(".")
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return timingSafeEqual(sha256(signature), sha256(sign(expires, password)))
}
