"use client"

import { useState, useCallback, useRef } from "react"
import { GlazyrOrchestrator } from "@/lib/orchestrator"
import type { AgentState, ActionLog } from "@/lib/types"

export function useOrchestrator() {
  const [agentState, setAgentState] = useState<AgentState>("idle")
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([])
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const orchestratorRef = useRef<GlazyrOrchestrator | null>(null)

  if (!orchestratorRef.current) {
    orchestratorRef.current = new GlazyrOrchestrator()
  }

  const processCommand = useCallback(async (command: string) => {
    if (!orchestratorRef.current || !command.trim()) return

    setAgentState("seeing")
    setActionLogs([])

    try {
      const context = await orchestratorRef.current.processVoiceCommand(command)

      // Update logs in real-time
      const logUpdateInterval = setInterval(() => {
        const currentLogs = orchestratorRef.current?.getActionLogs() || []
        setActionLogs([...currentLogs])

        // Update agent state based on logs
        const lastLog = currentLogs[currentLogs.length - 1]
        if (lastLog) {
          if (lastLog.type === "vision") {
            setAgentState("seeing")
          } else if (lastLog.type === "understanding") {
            setAgentState("understanding")
          } else if (lastLog.type === "action") {
            setAgentState("acting")
          }
        }

        // Stop updating when all actions are complete
        const allComplete = currentLogs.every((log) => log.status !== "in_progress")
        if (allComplete && currentLogs.length > 0) {
          clearInterval(logUpdateInterval)
          setAgentState("idle")
        }
      }, 200)

      // Update screenshot when available
      if (context.visionContext?.screenshot) {
        setScreenshot(context.visionContext.screenshot)
      }
    } catch (error) {
      console.error("[v0] Orchestration error:", error)
      setAgentState("idle")
    }
  }, [])

  return {
    agentState,
    actionLogs,
    screenshot,
    processCommand,
  }
}
