import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { ExtensionStatusSchema, ExtensionStatusUpdateSchema } from "@/lib/control-plane-schemas"
import type { ExtensionStatus } from "@/lib/control-plane-types"

export function getExtensionStatus() {
  return apiFetch<ExtensionStatus>(GLAZYR_API_ROUTES.extensionStatus, { schema: ExtensionStatusSchema })
}

export function postExtensionStatus(update: unknown) {
  const body = ExtensionStatusUpdateSchema.parse(update)
  return apiFetch<ExtensionStatus>(GLAZYR_API_ROUTES.extensionStatus, { method: "POST", body, schema: ExtensionStatusSchema })
}
