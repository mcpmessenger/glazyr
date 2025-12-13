import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import { store } from "@/lib/server/store"
import { errorJson, json, optionsResponse, requireApiKeyOrSession } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function GET(req: NextRequest) {
  const unauthorized = requireApiKeyOrSession(req)
  if (unauthorized) return unauthorized

  return json(req, store.getConfig())
}

export async function PUT(req: NextRequest) {
  const unauthorized = requireApiKeyOrSession(req)
  if (unauthorized) return unauthorized

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorJson(req, "Invalid JSON", 400)
  }

  try {
    const next = store.setConfig(body)
    return json(req, next)
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid config", 422)
    return errorJson(req, "Failed to update config", 500)
  }
}
