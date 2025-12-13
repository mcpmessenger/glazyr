import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { GLAZYR_API_KEY_HEADER } from "@/lib/api/contract"
import { verifySessionToken } from "@/lib/server/session"

export function corsHeaders(req?: NextRequest): Record<string, string> {
  const origin = req?.headers.get("origin")
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": `content-type,${GLAZYR_API_KEY_HEADER},authorization`,
    "Access-Control-Max-Age": "86400",
  }

  // Only set credentials when we echo an Origin (never with '*').
  if (origin) {
    headers["Access-Control-Allow-Credentials"] = "true"
    headers["Vary"] = "Origin"
  }

  return headers
}

export function optionsResponse(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) })
}

export function json(req: NextRequest | undefined, data: unknown, init?: { status?: number; headers?: Record<string, string> }) {
  const headers = { ...(req ? corsHeaders(req) : {}), ...(init?.headers ?? {}) }
  return NextResponse.json(data, { status: init?.status ?? 200, headers })
}

export function errorJson(req: NextRequest | undefined, message: string, status = 400) {
  return json(req, { error: message }, { status })
}

export function requireApiKey(req: NextRequest): NextResponse | null {
  const required = process.env.GLAZYR_API_KEY
  if (!required) return null

  const provided = req.headers.get(GLAZYR_API_KEY_HEADER) ?? req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (!provided || provided !== required) {
    return errorJson(req, "Unauthorized", 401)
  }

  return null
}

/**
 * Allows either:
 * - a valid dev session cookie (browser control-plane), OR
 * - the configured API key (extension/automation).
 *
 * If `GLAZYR_API_KEY` is not set, this is always permissive.
 */
export function requireApiKeyOrSession(req: NextRequest): NextResponse | null {
  const required = process.env.GLAZYR_API_KEY
  if (!required) return null

  const token = req.cookies.get("glazyr_session")?.value ?? null
  const session = verifySessionToken(token)
  if (session) return null

  return requireApiKey(req)
}
