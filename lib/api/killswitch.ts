import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { ControlPlaneConfigSchema } from "@/lib/control-plane-schemas"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"

export function setKillSwitch(engaged: boolean) {
  return apiFetch<ControlPlaneConfig>(GLAZYR_API_ROUTES.killSwitch, {
    method: "POST",
    body: { engaged },
    schema: ControlPlaneConfigSchema,
  })
}
