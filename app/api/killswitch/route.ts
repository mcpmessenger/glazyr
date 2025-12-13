import type { NextRequest } from "next/server"
import { ZodError } from "zod"
import { store } from "@/lib/server/store"
import { KillSwitchRequestSchema } from "@/lib/control-plane-schemas"
import { errorJson, json, optionsResponse, requireApiKeyOrSession } from "@/lib/server/http"

export const runtime = "nodejs"

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function POST(req: NextRequest) {
  const unauthorized = requireApiKeyOrSession(req)
  if (unauthorized) return unauthorized

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorJson(req, "Invalid JSON", 400)
  }

  try {
    const { engaged } = KillSwitchRequestSchema.parse(body)
    const next = engaged ? store.engageKillSwitch() : store.disengageKillSwitch()
    return json(req, next)
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid kill switch request", 422)
    return errorJson(req, "Failed to update kill switch", 500)
  }
}
