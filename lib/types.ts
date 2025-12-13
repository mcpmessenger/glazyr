// Core types for Glazyr orchestration

export type AgentState = "idle" | "listening" | "seeing" | "understanding" | "acting"

export interface VisionContext {
  screenshot: string
  ocr_text?: string
  elements?: UIElement[]
  timestamp: number
}

export interface UIElement {
  id: string
  type: string
  text?: string
  bounds: { x: number; y: number; width: number; height: number }
  clickable: boolean
}

export interface ActionPlan {
  id: string
  intent: string
  steps: ActionStep[]
  confidence: number
  created_at: number
}

export interface ActionStep {
  id: string
  type: "click" | "type" | "wait" | "screenshot" | "verify" | "api_call"
  target?: string
  value?: string
  description: string
  status: "pending" | "executing" | "completed" | "failed"
}

export interface ActionLog {
  id: string
  timestamp: number
  type: string
  description: string
  status: "success" | "error" | "in_progress"
}

export interface OrchestrationContext {
  voiceCommand: string
  visionContext?: VisionContext
  actionPlan?: ActionPlan
  actionLogs: ActionLog[]
}
