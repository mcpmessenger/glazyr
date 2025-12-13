import type { NextRequest } from "next/server"
import { json, optionsResponse } from "@/lib/server/http"
import { verifySessionToken } from "@/lib/server/session"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("glazyr_session")?.value ?? null
  const session = verifySessionToken(token)

  if (!session) return json(req, null)

  return json(req, { email: session.email, isGuest: session.isGuest ?? false })
}
