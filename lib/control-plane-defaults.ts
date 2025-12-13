import type { ControlPlaneConfig, ExtensionStatus } from "@/lib/control-plane-types"

export const DEFAULT_CONTROL_PLANE_CONFIG: ControlPlaneConfig = {
  agentMode: "observe",
  killSwitchEngaged: false,
  safety: {
    allowedDomains: [],
    disallowedActions: ["purchase", "transfer_money", "delete_data", "change_security_settings"],
    humanInLoopThreshold: "high_risk_only",
    runtimeBudgetMinutes: 10,
    actionBudget: 25,
  },
}

export const DEFAULT_EXTENSION_STATUS: ExtensionStatus = {
  connected: false,
  browserType: "chrome",
  permissionsGranted: [],
  lastHeartbeat: null,
  policyEnforced: false,
  killSwitchEngaged: false,
  allowedDomainsCount: 0,
  agentMode: "observe",
}

