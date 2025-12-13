import type { NextRequest } from "next/server"
import { store } from "@/lib/server/store"
import { json, optionsResponse } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("glazyr_session")?.value ?? null
  store.deleteSession(sessionId)

  const res = json(req, { ok: true })
  res.cookies.set("glazyr_session", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 })
  return res
}
