import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { ControlPlaneConfigSchema } from "@/lib/control-plane-schemas"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"

export function getControlPlaneConfig() {
  return apiFetch<ControlPlaneConfig>(GLAZYR_API_ROUTES.controlPlaneConfig, { schema: ControlPlaneConfigSchema })
}

export function updateControlPlaneConfig(next: ControlPlaneConfig) {
  return apiFetch<ControlPlaneConfig>(GLAZYR_API_ROUTES.controlPlaneConfig, {
    method: "PUT",
    body: next,
    schema: ControlPlaneConfigSchema,
  })
}
