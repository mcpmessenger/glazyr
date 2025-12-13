import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import { LoginRequestSchema } from "@/lib/control-plane-schemas"
import { store } from "@/lib/server/store"
import { errorJson, json, optionsResponse } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorJson(req, "Invalid JSON", 400)
  }

  try {
    const { email } = LoginRequestSchema.parse(body)

    // Dev-only: accept any email/password.
    const sessionId = store.createSession(email, false)

    const res = json(req, { email, isGuest: false })
    res.cookies.set("glazyr_session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })
    return res
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid login request", 422)
    return errorJson(req, "Login failed", 500)
  }
}
