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

  return json(req, store.listTasks())
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
    const task = store.addTask(body)
    return json(req, task, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) return errorJson(req, "Invalid task summary", 422)
    return errorJson(req, "Failed to create task summary", 500)
  }
}

export async function DELETE(req: NextRequest) {
  const unauthorized = requireApiKeyOrSession(req)
  if (unauthorized) return unauthorized

  store.clearTasks()
  return json(req, { ok: true })
}
