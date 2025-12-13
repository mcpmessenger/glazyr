"use client"

import { Circle } from "lucide-react"

type AgentState = "idle" | "listening" | "seeing" | "understanding" | "acting"

interface AgentStatusProps {
  state: AgentState
}

const stateConfig = {
  idle: {
    label: "Idle",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    description: "Ready for commands",
  },
  listening: {
    label: "Listening",
    color: "text-primary",
    bgColor: "bg-primary/20",
    description: "Processing voice input",
  },
  seeing: {
    label: "Seeing",
    color: "text-accent",
    bgColor: "bg-accent/20",
    description: "Analyzing visual context",
  },
  understanding: {
    label: "Understanding",
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
    description: "Processing with VLM",
  },
  acting: {
    label: "Acting",
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
    description: "Executing actions",
  },
}

export function AgentStatus({ state }: AgentStatusProps) {
  const config = stateConfig[state]

  return (
    <div className="space-y-6">
      {/* Current State */}
      <div className={`p-6 rounded-xl ${config.bgColor} transition-all duration-300`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${config.color}`}>{config.label}</span>
          <Circle
            className={`w-3 h-3 ${config.color} ${state !== "idle" ? "animate-pulse" : ""}`}
            fill="currentColor"
          />
        </div>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pipeline</p>
        {Object.entries(stateConfig)
          .filter(([key]) => key !== "idle")
          .map(([key, conf]) => (
            <div key={key} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${state === key ? conf.color : "bg-border"} transition-colors`} />
              <span className={`text-sm ${state === key ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {conf.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
