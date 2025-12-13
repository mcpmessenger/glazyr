import type { NextRequest } from "next/server"
import { store } from "@/lib/server/store"
import { json, optionsResponse } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  const email = "guest@local"
  const sessionId = store.createSession(email, true)

  const res = json(req, { email, isGuest: true })
  res.cookies.set("glazyr_session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  })
  return res
}
