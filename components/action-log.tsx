"use client"

import { CheckCircle2, Clock, XCircle } from "lucide-react"
import type { ActionLog as ActionLogType } from "@/lib/types"

interface ActionLogProps {
  logs: ActionLogType[]
}

export function ActionLog({ logs }: ActionLogProps) {
  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds} sec ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    return `${hours} hr ago`
  }

  const getStatusIcon = (status: ActionLogType["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-chart-2" />
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-primary animate-pulse" />
    }
  }

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {logs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No actions yet</p>
          <p className="text-xs mt-1">Actions will appear here as Glazyr works</p>
        </div>
      ) : (
        logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg glass-subtle">
            <div className="mt-0.5">{getStatusIcon(log.status)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-relaxed">{log.description}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{formatTimestamp(log.timestamp)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
