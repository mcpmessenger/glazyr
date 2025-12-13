export type AgentMode = "observe" | "assist" | "automate"

export type TaskOutcome = "success" | "failed" | "cancelled"

export interface SafetyConfig {
  allowedDomains: string[]
  disallowedActions: string[]
  humanInLoopThreshold: "always_confirm" | "high_risk_only" | "never" // UI-only; enforcement belongs to orchestrator/extension
  runtimeBudgetMinutes: number
  actionBudget: number
}

export interface ControlPlaneConfig {
  agentMode: AgentMode
  safety: SafetyConfig
  killSwitchEngaged: boolean
}

export interface TaskSummary {
  id: string
  name: string
  outcome: TaskOutcome
  timestamp: number
  summary: string
}

export interface ExtensionStatus {
  connected: boolean
  browserType: "chrome" | "edge" | "brave" | "other"
  permissionsGranted: string[]
  lastHeartbeat: number | null
}

