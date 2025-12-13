import { DEFAULT_CONTROL_PLANE_CONFIG, DEFAULT_EXTENSION_STATUS } from "@/lib/control-plane-defaults"
import type { ControlPlaneConfig, ExtensionStatus, TaskSummary } from "@/lib/control-plane-types"
import {
  ControlPlaneConfigSchema,
  ExtensionStatusSchema,
  ExtensionStatusUpdateSchema,
  TaskSummaryCreateSchema,
  TaskSummarySchema,
  type TaskSummaryCreateInput,
} from "@/lib/control-plane-schemas"

type AuthState = { email: string; isGuest?: boolean; createdAt: number }

type StoreState = {
  config: ControlPlaneConfig
  extensionStatus: ExtensionStatus
  tasks: TaskSummary[]
  sessions: Map<string, AuthState>
}

function applyKillSwitchEngaged(prev: ControlPlaneConfig): ControlPlaneConfig {
  return {
    ...prev,
    killSwitchEngaged: true,
    agentMode: "observe",
    safety: {
      ...prev.safety,
      actionBudget: 0,
      runtimeBudgetMinutes: 0,
      humanInLoopThreshold: "always_confirm",
    },
  }
}

function normalizeDomains(domains: string[]): string[] {
  const cleaned = domains.map((d) => d.trim()).filter(Boolean)
  return Array.from(new Set(cleaned))
}

function normalizeActions(actions: string[]): string[] {
  const cleaned = actions.map((a) => a.trim()).filter(Boolean)
  return Array.from(new Set(cleaned))
}

function normalizeConfig(config: ControlPlaneConfig): ControlPlaneConfig {
  const next: ControlPlaneConfig = {
    ...config,
    safety: {
      ...config.safety,
      allowedDomains: normalizeDomains(config.safety.allowedDomains),
      disallowedActions: normalizeActions(config.safety.disallowedActions),
      runtimeBudgetMinutes: Math.max(0, Math.trunc(config.safety.runtimeBudgetMinutes)),
      actionBudget: Math.max(0, Math.trunc(config.safety.actionBudget)),
    },
  }

  // If kill switch is engaged, enforce conservative overrides.
  if (next.killSwitchEngaged) return applyKillSwitchEngaged(next)
  return next
}

function getGlobalStore(): StoreState {
  const g = globalThis as unknown as { __glazyrStore?: StoreState }

  if (!g.__glazyrStore) {
    g.__glazyrStore = {
      config: DEFAULT_CONTROL_PLANE_CONFIG,
      extensionStatus: DEFAULT_EXTENSION_STATUS,
      tasks: [],
      sessions: new Map(),
    }
  }

  return g.__glazyrStore
}

export const store = {
  // --- Config ---
  getConfig(): ControlPlaneConfig {
    return getGlobalStore().config
  },

  setConfig(next: unknown): ControlPlaneConfig {
    const parsed = ControlPlaneConfigSchema.parse(next)
    const normalized = normalizeConfig(parsed)
    getGlobalStore().config = normalized
    return normalized
  },

  engageKillSwitch(): ControlPlaneConfig {
    const s = getGlobalStore()
    s.config = applyKillSwitchEngaged(s.config)
    return s.config
  },

  disengageKillSwitch(): ControlPlaneConfig {
    const s = getGlobalStore()
    s.config = { ...s.config, killSwitchEngaged: false }
    return s.config
  },

  // --- Tasks ---
  listTasks(): TaskSummary[] {
    return getGlobalStore().tasks.slice().sort((a, b) => b.timestamp - a.timestamp)
  },

  addTask(input: unknown): TaskSummary {
    const parsed: TaskSummaryCreateInput = TaskSummaryCreateSchema.parse(input)
    const task: TaskSummary = TaskSummarySchema.parse({
      id: parsed.id ?? crypto.randomUUID(),
      name: parsed.name,
      outcome: parsed.outcome,
      timestamp: parsed.timestamp ?? Date.now(),
      summary: parsed.summary,
    })

    const s = getGlobalStore()
    s.tasks.unshift(task)
    // Cap growth for dev store.
    s.tasks = s.tasks.slice(0, 200)
    return task
  },

  clearTasks(): void {
    getGlobalStore().tasks = []
  },

  // --- Extension status ---
  getExtensionStatus(): ExtensionStatus {
    return getGlobalStore().extensionStatus
  },

  updateExtensionStatus(update: unknown): ExtensionStatus {
    const parsed = ExtensionStatusUpdateSchema.parse(update)
    const now = Date.now()

    const prev = getGlobalStore().extensionStatus
    const next: ExtensionStatus = ExtensionStatusSchema.parse({
      ...prev,
      ...parsed,
      connected: parsed.connected ?? true,
      lastHeartbeat: parsed.lastHeartbeat ?? now,
      permissionsGranted: parsed.permissionsGranted ? Array.from(new Set(parsed.permissionsGranted.map((p) => p.trim()).filter(Boolean))) : prev.permissionsGranted,
    })

    getGlobalStore().extensionStatus = next
    return next
  },

  // --- Auth sessions (dev-only) ---
  createSession(email: string, isGuest: boolean): string {
    const id = crypto.randomUUID()
    getGlobalStore().sessions.set(id, { email, isGuest, createdAt: Date.now() })
    return id
  },

  getSession(id: string | undefined | null): AuthState | null {
    if (!id) return null
    return getGlobalStore().sessions.get(id) ?? null
  },

  deleteSession(id: string | undefined | null): void {
    if (!id) return
    getGlobalStore().sessions.delete(id)
  },
}
