import { ScreenshotMCP } from "./screenshot-mcp"
import { OCRMCP } from "./ocr-mcp"
import { VLMMCP } from "./vlm-mcp"
import type { VisionMCP, VisionResult, CaptureOptions } from "./types"
import type { VisionContext } from "../types"

export class VisionOrchestrator {
  private mcps: VisionMCP[]

  constructor() {
    // Initialize all Vision MCPs
    this.mcps = [new ScreenshotMCP(), new OCRMCP(), new VLMMCP()]
  }

  async captureVision(options?: CaptureOptions): Promise<VisionContext> {
    console.log("[v0] VisionOrchestrator: Starting vision capture pipeline...")

    const results: Record<string, VisionResult> = {}

    // Execute Vision MCPs in parallel for speed
    const capturePromises = this.mcps
      .filter((mcp) => mcp.enabled)
      .map(async (mcp) => {
        const result = await mcp.capture(options)
        results[mcp.type] = result
      })

    await Promise.all(capturePromises)

    // Combine results into VisionContext
    const visionContext: VisionContext = {
      screenshot: results.screenshot?.data?.screenshot || "/computer-screen-with-application.jpg",
      ocr_text: results.ocr?.data?.ocr_text,
      elements: results.vlm?.data?.elements || [],
      timestamp: Date.now(),
    }

    console.log("[v0] VisionOrchestrator: Vision capture complete", visionContext)

    return visionContext
  }

  getMCPs(): VisionMCP[] {
    return this.mcps
  }

  toggleMCP(type: string, enabled: boolean): void {
    const mcp = this.mcps.find((m) => m.type === type)
    if (mcp) {
      mcp.enabled = enabled
      console.log(`[v0] VisionOrchestrator: ${mcp.name} ${enabled ? "enabled" : "disabled"}`)
    }
  }
}
