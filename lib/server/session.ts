import crypto from "node:crypto"

export type SessionPayload = {
  email: string
  isGuest: boolean
  iat: number
}

function base64UrlEncode(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function base64UrlDecode(str: string) {
  const normalized = str.replace(/-/g, "+").replace(/_/g, "/")
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4))
  return Buffer.from(normalized + pad, "base64")
}

function getSessionSecret() {
  // Prefer a dedicated secret, but fall back to API key to avoid extra setup.
  return process.env.GLAZYR_SESSION_SECRET ?? process.env.GLAZYR_API_KEY ?? null
}

function sign(payloadB64: string, secret: string) {
  const mac = crypto.createHmac("sha256", secret).update(payloadB64).digest()
  return base64UrlEncode(mac)
}

export function createSessionToken(input: { email: string; isGuest: boolean }) {
  const secret = getSessionSecret()
  if (!secret) return null

  const payload: SessionPayload = { email: input.email, isGuest: input.isGuest, iat: Date.now() }
  const payloadB64 = base64UrlEncode(Buffer.from(JSON.stringify(payload), "utf8"))
  const sig = sign(payloadB64, secret)
  return `${payloadB64}.${sig}`
}

export function verifySessionToken(token: string | null | undefined): SessionPayload | null {
  const secret = getSessionSecret()
  if (!secret || !token) return null

  const [payloadB64, sig] = token.split(".")
  if (!payloadB64 || !sig) return null

  const expected = sign(payloadB64, secret)
  // constant-time compare
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return null
  if (!crypto.timingSafeEqual(a, b)) return null

  try {
    const payload = JSON.parse(base64UrlDecode(payloadB64).toString("utf8")) as SessionPayload
    if (!payload?.email || typeof payload.email !== "string") return null
    if (typeof payload.isGuest !== "boolean") return null
    if (typeof payload.iat !== "number") return null
    return payload
  } catch {
    return null
  }
}


