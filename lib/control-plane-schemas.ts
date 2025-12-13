import { z } from "zod"

export const AgentModeSchema = z.enum(["observe", "assist", "automate"])
export const TaskOutcomeSchema = z.enum(["success", "failed", "cancelled"])

export const SafetyConfigSchema = z.object({
  allowedDomains: z.array(z.string().min(1)).default([]),
  disallowedActions: z.array(z.string().min(1)).default([]),
  humanInLoopThreshold: z.enum(["always_confirm", "high_risk_only", "never"]),
  runtimeBudgetMinutes: z.number().int().min(0),
  actionBudget: z.number().int().min(0),
})

export const ControlPlaneConfigSchema = z.object({
  agentMode: AgentModeSchema,
  safety: SafetyConfigSchema,
  killSwitchEngaged: z.boolean(),
})

export const ExtensionStatusSchema = z.object({
  connected: z.boolean(),
  browserType: z.enum(["chrome", "edge", "brave", "other"]),
  permissionsGranted: z.array(z.string().min(1)),
  lastHeartbeat: z.number().int().nullable(),
  policyEnforced: z.boolean().default(false),
  killSwitchEngaged: z.boolean().default(false),
  allowedDomainsCount: z.number().int().min(0).default(0),
  agentMode: AgentModeSchema.default("observe"),
})

export const TaskSummarySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  outcome: TaskOutcomeSchema,
  timestamp: z.number().int(),
  summary: z.string().min(1),
})

export const TaskSummaryCreateSchema = z
  .object({
    id: z.string().min(1).optional(),
    name: z.string().min(1),
    outcome: TaskOutcomeSchema,
    timestamp: z.number().int().optional(),
    summary: z.string().min(1),
  })
  .strict()

export const ExtensionStatusUpdateSchema = z
  .object({
    browserType: z.enum(["chrome", "edge", "brave", "other"]).optional(),
    permissionsGranted: z.array(z.string().min(1)).optional(),
    lastHeartbeat: z.number().int().nullable().optional(),
    connected: z.boolean().optional(),
    policyEnforced: z.boolean().optional(),
    killSwitchEngaged: z.boolean().optional(),
    allowedDomainsCount: z.number().int().min(0).optional(),
    agentMode: AgentModeSchema.optional(),
  })
  .strict()

export const KillSwitchRequestSchema = z.object({ engaged: z.boolean() }).strict()

export const LoginRequestSchema = z.object({ email: z.string().email(), password: z.string().optional() }).strict()

export type ControlPlaneConfigInput = z.infer<typeof ControlPlaneConfigSchema>
export type TaskSummaryCreateInput = z.infer<typeof TaskSummaryCreateSchema>
export type ExtensionStatusUpdateInput = z.infer<typeof ExtensionStatusUpdateSchema>
