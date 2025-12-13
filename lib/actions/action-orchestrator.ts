import { UIAutomationMCP } from "./ui-automation-mcp"
import { APIIntegrationMCP } from "./api-integration-mcp"
import { SystemOperationsMCP } from "./system-operations-mcp"
import type { ActionMCP, ActionRequest, ActionResult } from "./types"

export class ActionOrchestrator {
  private mcps: ActionMCP[]

  constructor() {
    // Initialize all Action MCPs
    this.mcps = [new UIAutomationMCP(), new APIIntegrationMCP(), new SystemOperationsMCP()]
  }

  async executeAction(request: ActionRequest): Promise<ActionResult> {
    console.log("[v0] ActionOrchestrator: Executing action", request)

    // Find the appropriate MCP to handle this action
    const mcp = this.mcps.find((m) => m.enabled && m.canHandle(request))

    if (!mcp) {
      console.error("[v0] ActionOrchestrator: No MCP found for action", request)
      return {
        success: false,
        error: `No MCP available to handle action type: ${request.type}`,
        timestamp: Date.now(),
        duration: 0,
      }
    }

    console.log(`[v0] ActionOrchestrator: Using ${mcp.name} for ${request.type}`)

    try {
      const result = await mcp.execute(request)
      console.log(`[v0] ActionOrchestrator: Action completed`, result)
      return result
    } catch (error: any) {
      console.error("[v0] ActionOrchestrator: Action failed", error)
      return {
        success: false,
        error: error.message || "Action execution failed",
        timestamp: Date.now(),
        duration: 0,
      }
    }
  }

  async executeActions(requests: ActionRequest[]): Promise<ActionResult[]> {
    console.log(`[v0] ActionOrchestrator: Executing ${requests.length} actions...`)

    const results: ActionResult[] = []

    for (const request of requests) {
      const result = await this.executeAction(request)
      results.push(result)

      // Stop execution if an action fails
      if (!result.success) {
        console.error("[v0] ActionOrchestrator: Stopping execution due to failure")
        break
      }
    }

    return results
  }

  getMCPs(): ActionMCP[] {
    return this.mcps
  }

  toggleMCP(name: string, enabled: boolean): void {
    const mcp = this.mcps.find((m) => m.name === name)
    if (mcp) {
      mcp.enabled = enabled
      console.log(`[v0] ActionOrchestrator: ${mcp.name} ${enabled ? "enabled" : "disabled"}`)
    }
  }
}
