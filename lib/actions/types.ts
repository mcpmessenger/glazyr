// Action MCP types

export interface ActionMCP {
  name: string
  type: "ui" | "api" | "system"
  enabled: boolean
  execute(action: ActionRequest): Promise<ActionResult>
  canHandle(action: ActionRequest): boolean
}

export interface ActionRequest {
  type: "click" | "type" | "wait" | "screenshot" | "api_call" | "verify" | "navigate"
  target?: string
  value?: string
  payload?: any
  metadata?: Record<string, any>
}

export interface ActionResult {
  success: boolean
  data?: any
  error?: string
  timestamp: number
  duration: number
}
