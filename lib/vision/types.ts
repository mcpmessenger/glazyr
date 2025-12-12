// Vision MCP types

export interface VisionMCP {
  name: string
  type: "screenshot" | "ocr" | "vlm"
  enabled: boolean
  capture(options?: CaptureOptions): Promise<VisionResult>
}

export interface CaptureOptions {
  includeOCR?: boolean
  includeElements?: boolean
  includeAnalysis?: boolean
}

export interface VisionResult {
  success: boolean
  data?: {
    screenshot?: string
    ocr_text?: string
    elements?: UIElement[]
    analysis?: VLMAnalysis
  }
  error?: string
  timestamp: number
}

export interface UIElement {
  id: string
  type: string
  text?: string
  bounds: { x: number; y: number; width: number; height: number }
  clickable: boolean
  interactable: boolean
}

export interface VLMAnalysis {
  summary: string
  intent_suggestions: string[]
  warnings?: string[]
  confidence: number
}
