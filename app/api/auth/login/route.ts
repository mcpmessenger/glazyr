import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import { LoginRequestSchema } from "@/lib/control-plane-schemas"
import { errorJson, json, optionsResponse } from "@/lib/server/http"
import { createSessionToken } from "@/lib/server/session"

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
    const token = createSessionToken({ email, isGuest: false })

    const res = json(req, { email, isGuest: false })
    if (token) {
      res.cookies.set("glazyr_session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }
    return res
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid login request", 422)
    return errorJson(req, "Login failed", 500)
  }
}
