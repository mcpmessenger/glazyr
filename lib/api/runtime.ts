import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { z } from "zod"

export const RuntimeTaskSummarySchema = z.object({
  task_id: z.string(),
  status: z.string(),
  updated_at_ms: z.number(),
  input_preview: z.string(),
  output_preview: z.string(),
  output_sha256: z.string(),
  error: z.string().optional().default(""),
})

export type RuntimeTaskSummary = z.infer<typeof RuntimeTaskSummarySchema>

const RuntimeTaskListSchema = z.object({
  tasks: z.array(RuntimeTaskSummarySchema),
})

const RuntimeTaskGetSchema = z.object({
  task: RuntimeTaskSummarySchema,
})

export function listRuntimeTasks(limit = 25) {
  return apiFetch<{ tasks: RuntimeTaskSummary[] }>(`${GLAZYR_API_ROUTES.runtimeTasks}?limit=${encodeURIComponent(limit)}`, {
    schema: RuntimeTaskListSchema,
  })
}

export function getRuntimeTask(taskId: string) {
  const id = String(taskId || "").trim()
  return apiFetch<{ task: RuntimeTaskSummary }>(`${GLAZYR_API_ROUTES.runtimeTasks}/${encodeURIComponent(id)}`, { schema: RuntimeTaskGetSchema })
}

