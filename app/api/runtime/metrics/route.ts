import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { corsHeaders, errorJson, optionsResponse, requireApiKeyOrSession } from "@/lib/server/http"

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

  const res = await fetch(`${base}/metrics`, { headers: runtimeHeaders(), cache: "no-store" })
  const text = await res.text().catch(() => "")

  if (!res.ok) {
    return errorJson(req, `Runtime metrics request failed (${res.status})`, res.status)
  }

  return new NextResponse(text, {
    status: 200,
    headers: {
      ...corsHeaders(req),
      "content-type": res.headers.get("content-type") ?? "text/plain; charset=utf-8",
    },
  })
}

