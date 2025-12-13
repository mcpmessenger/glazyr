import { ZodType } from "zod"
import { GLAZYR_API_KEY_HEADER } from "@/lib/api/contract"

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

type ApiFetchOptions<T> = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: unknown
  schema?: ZodType<T>
  headers?: Record<string, string>
  credentials?: RequestCredentials
}

function apiKeyHeader(): Record<string, string> {
  const key = process.env.NEXT_PUBLIC_GLAZYR_API_KEY
  return key ? { [GLAZYR_API_KEY_HEADER]: key } : {}
}

export async function apiFetch<T = unknown>(path: string, opts?: ApiFetchOptions<T>): Promise<T> {
  const res = await fetch(path, {
    method: opts?.method ?? "GET",
    headers: {
      ...apiKeyHeader(),
      ...(opts?.body !== undefined ? { "content-type": "application/json" } : {}),
      ...(opts?.headers ?? {}),
    },
    body: opts?.body !== undefined ? JSON.stringify(opts.body) : undefined,
    credentials: opts?.credentials ?? "include",
  })

  const contentType = res.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "")

  if (!res.ok) {
    const msg = typeof (data as any)?.error === "string" ? (data as any).error : `Request failed (${res.status})`
    throw new ApiError(msg, res.status, data)
  }

  if (opts?.schema) return opts.schema.parse(data)
  return data as T
}
