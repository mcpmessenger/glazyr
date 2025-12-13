import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { LoginRequestSchema } from "@/lib/control-plane-schemas"
import { z } from "zod"

export type AuthState = { email: string; isGuest: boolean } | null

const AuthStateSchema = z.object({ email: z.string(), isGuest: z.boolean() }).nullable()

export function getMe() {
  return apiFetch<AuthState>(GLAZYR_API_ROUTES.authMe, { schema: AuthStateSchema })
}

export function login(input: unknown) {
  const body = LoginRequestSchema.parse(input)
  return apiFetch<AuthState>(GLAZYR_API_ROUTES.authLogin, { method: "POST", body, schema: AuthStateSchema })
}

export function guest() {
  return apiFetch<AuthState>(GLAZYR_API_ROUTES.authGuest, { method: "POST", body: {}, schema: AuthStateSchema })
}

export function logout() {
  return apiFetch<{ ok: boolean }>(GLAZYR_API_ROUTES.authLogout, { method: "POST", body: {} })
}
