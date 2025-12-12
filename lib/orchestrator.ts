import type { OrchestrationContext, ActionPlan, ActionStep, ActionLog, VisionContext } from "./types"
import { VisionOrchestrator } from "./vision/vision-orchestrator"
import { ActionOrchestrator } from "./actions/action-orchestrator"
import type { ActionRequest } from "./actions/types"

export class GlazyrOrchestrator {
  private context: OrchestrationContext
  private visionOrchestrator: VisionOrchestrator
  private actionOrchestrator: ActionOrchestrator

  constructor() {
    this.context = {
      voiceCommand: "",
      actionLogs: [],
    }
    this.visionOrchestrator = new VisionOrchestrator()
    this.actionOrchestrator = new ActionOrchestrator()
  }

  async processVoiceCommand(command: string): Promise<OrchestrationContext> {
    console.log("[v0] Processing voice command:", command)
    this.context.voiceCommand = command

    // Step 1: See - Capture visual context
    const visionContext = await this.captureVision()
    this.context.visionContext = visionContext

    // Step 2: Understand - Generate action plan
    const actionPlan = await this.understand(command, visionContext)
    this.context.actionPlan = actionPlan

    // Step 3: Act - Execute action plan
    await this.executeActionPlan(actionPlan)

    return this.context
  }

  private async captureVision(): Promise<VisionContext> {
    console.log("[v0] Capturing visual context...")

    this.addLog({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: "vision",
      description: "Capturing screen and analyzing UI elements",
      status: "in_progress",
    })

    const visionContext = await this.visionOrchestrator.captureVision({
      includeOCR: true,
      includeElements: true,
      includeAnalysis: true,
    })

    this.updateLastLog("success")
    return visionContext
  }

  private async understand(command: string, vision: VisionContext): Promise<ActionPlan> {
    console.log("[v0] Understanding intent and planning actions...")

    this.addLog({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: "understanding",
      description: "Analyzing command and generating action plan",
      status: "in_progress",
    })

    // Simulate LLM processing
    await this.delay(1500)

    const steps = this.generateSteps(command)

    const actionPlan: ActionPlan = {
      id: crypto.randomUUID(),
      intent: command,
      steps,
      confidence: 0.85,
      created_at: Date.now(),
    }

    this.updateLastLog("success")
    return actionPlan
  }

  private generateSteps(command: string): ActionStep[] {
    // Simple command parsing for demo
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes("book") && lowerCommand.includes("flight")) {
      return [
        {
          id: "step-1",
          type: "click",
          target: "search-flights-button",
          description: "Open flight search",
          status: "pending",
        },
        {
          id: "step-2",
          type: "type",
          target: "destination-input",
          value: "Stockholm",
          description: "Enter destination",
          status: "pending",
        },
        {
          id: "step-3",
          type: "click",
          target: "search-button",
          description: "Search for flights",
          status: "pending",
        },
        {
          id: "step-4",
          type: "wait",
          description: "Wait for results",
          status: "pending",
        },
        {
          id: "step-5",
          type: "screenshot",
          description: "Capture confirmation",
          status: "pending",
        },
      ]
    }

    if (lowerCommand.includes("email") || lowerCommand.includes("send")) {
      return [
        {
          id: "step-1",
          type: "api_call",
          description: "Send email via API",
          status: "pending",
        },
        {
          id: "step-2",
          type: "verify",
          description: "Verify email sent",
          status: "pending",
        },
      ]
    }

    // Default generic steps
    return [
      {
        id: "step-1",
        type: "click",
        description: "Perform action",
        status: "pending",
      },
    ]
  }

  private async executeActionPlan(plan: ActionPlan): Promise<void> {
    console.log("[v0] Executing action plan:", plan)

    for (const step of plan.steps) {
      this.addLog({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        type: "action",
        description: step.description,
        status: "in_progress",
      })

      const actionRequest: ActionRequest = {
        type: step.type,
        target: step.target,
        value: step.value,
      }

      const result = await this.actionOrchestrator.executeAction(actionRequest)

      if (result.success) {
        step.status = "completed"
        this.updateLastLog("success")
      } else {
        step.status = "failed"
        this.updateLastLog("error")
        console.error("[v0] Action step failed:", result.error)
        break
      }

      await this.delay(800)
    }
  }

  private addLog(log: ActionLog): void {
    this.context.actionLogs.push(log)
  }

  private updateLastLog(status: "success" | "error"): void {
    if (this.context.actionLogs.length > 0) {
      this.context.actionLogs[this.context.actionLogs.length - 1].status = status
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  getContext(): OrchestrationContext {
    return this.context
  }

  getActionLogs(): ActionLog[] {
    return this.context.actionLogs
  }
}
