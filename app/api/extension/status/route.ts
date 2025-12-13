import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import { store } from "@/lib/server/store"
import { errorJson, json, optionsResponse, requireApiKey } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function GET(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized

  return json(req, store.getExtensionStatus())
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKey(req)
  if (unauthorized) return unauthorized

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorJson(req, "Invalid JSON", 400)
  }

  try {
    const next = store.updateExtensionStatus(body)
    return json(req, next)
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid extension status", 422)
    return errorJson(req, "Failed to update extension status", 500)
  }
}
