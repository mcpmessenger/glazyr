import type { NextRequest } from "next/server"
import { store } from "@/lib/server/store"
import { json, optionsResponse } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("glazyr_session")?.value ?? null
  const session = store.getSession(sessionId)

  if (!session) return json(req, null)

  return json(req, { email: session.email, isGuest: session.isGuest ?? false })
}
