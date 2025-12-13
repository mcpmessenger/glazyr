import { apiFetch } from "@/lib/api/client"
import { GLAZYR_API_ROUTES } from "@/lib/api/contract"
import { TaskSummarySchema, TaskSummaryCreateSchema } from "@/lib/control-plane-schemas"
import type { TaskSummary } from "@/lib/control-plane-types"
import { z } from "zod"

const TaskSummaryListSchema = z.array(TaskSummarySchema)

export function listTaskSummaries() {
  return apiFetch<TaskSummary[]>(GLAZYR_API_ROUTES.tasks, { schema: TaskSummaryListSchema })
}

export function createTaskSummary(input: unknown) {
  const body = TaskSummaryCreateSchema.parse(input)
  return apiFetch<TaskSummary>(GLAZYR_API_ROUTES.tasks, { method: "POST", body, schema: TaskSummarySchema })
}

export function clearTaskSummaries() {
  return apiFetch<{ ok: boolean }>(GLAZYR_API_ROUTES.tasks, { method: "DELETE" })
}
