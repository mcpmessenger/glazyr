import type { NextRequest } from "next/server"
import { json, optionsResponse } from "@/lib/server/http"
import { createSessionToken } from "@/lib/server/session"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  const email = "guest@local"
  const token = createSessionToken({ email, isGuest: true })

  const res = json(req, { email, isGuest: true })
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
}
