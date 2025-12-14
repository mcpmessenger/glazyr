import type { NextRequest } from "next/server"
import { errorJson, json, optionsResponse, requireApiKeyOrSession } from "@/lib/server/http"

export const runtime = "nodejs"

function runtimeBaseUrl(): string {
  const raw = process.env.GLAZYR_CONTROL_RUNTIME_URL || ""
  return String(raw).replace(/\/+$/, "")
}

function runtimeHeaders(): HeadersInit {
  const apiKey = process.env.GLAZYR_CONTROL_RUNTIME_API_KEY || ""
  return apiKey ? { "x-glazyr-api-key": apiKey } : {}
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req)
}

export async function GET(req: NextRequest) {
  const unauthorized = requireApiKeyOrSession(req)
  if (unauthorized) return unauthorized

  const base = runtimeBaseUrl()
  if (!base) return errorJson(req, "Missing GLAZYR_CONTROL_RUNTIME_URL", 503)

  const res = await fetch(`${base}/mcp/manifest`, { headers: runtimeHeaders(), cache: "no-store" })
  const contentType = res.headers.get("content-type") ?? ""
  const data = contentType.includes("application/json") ? await res.json().catch(() => null) : await res.text().catch(() => "")

  if (!res.ok) {
    const msg = typeof (data as any)?.error === "string" ? (data as any).error : `Runtime request failed (${res.status})`
    return errorJson(req, msg, res.status)
  }

  return json(req, data)
}

