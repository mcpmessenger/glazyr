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
  /** Whether the extension is enforcing control-plane safety config (best-effort signal). */
  policyEnforced: boolean
  /** Whether the extension currently considers the kill switch engaged. */
  killSwitchEngaged: boolean
  /** Count of allowed domains currently loaded in the extension policy. */
  allowedDomainsCount: number
  /** Extension’s last known agent mode (from latest config). */
  agentMode: AgentMode
}

