"use client"

import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import { useExtensionStatus } from "@/hooks/use-extension-status"
import { useTaskSummaries } from "@/hooks/use-task-summaries"
import { SwarmStatus } from "@/components/control-plane/swarm-status"
import { KillSwitch } from "@/components/control-plane/kill-switch"
import { MetricsCard } from "@/components/control-plane/metrics-card"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function DashboardOverviewPage() {
  // Maintaining hooks for future real-time wiring
  const bridge = useExtensionBridge()
  const configState = useControlPlaneConfig()
  const tasksState = useTaskSummaries()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Mission Control</h1>
        <p className="text-muted-foreground">
          Real-time orchestration and governance for your agent swarm.
        </p>
      </div>

      {/* Top Row: Core Status & Kill Switch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SwarmStatus />
        <KillSwitch />
      </div>

      {/* Middle Row: Metrics & Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard type="vision" />
        <MetricsCard type="ucp" />

        {/* Placeholder for future metrics */}
        <Card className="glass-subtle">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">99.9%</div>
            <p className="text-xs text-muted-foreground">uptime</p>
          </CardContent>
        </Card>
        <Card className="glass-subtle">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">in queue</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Area: Recent Activity (Legacy/Mock) */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Swarm Telemetry</CardTitle>
          <CardDescription>Live event stream from the Neural Cortex</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 bg-muted/20 p-4 h-[200px] font-mono text-xs overflow-y-auto">
            <div className="flex gap-2 text-muted-foreground">
              <span className="text-blue-400">[INFO]</span>
              <span>SwarmController: Dispatching TASK_291 to Agent-Alpha</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <span className="text-green-400">[SUCCESS]</span>
              <span>VisionWorker: Processed frame 8821 in 120ms</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <span className="text-blue-400">[INFO]</span>
              <span>UCPHandler: Negotiated contract 0x22...1A for 0.05 ETH</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <span className="text-yellow-400">[WARN]</span>
              <span>Governance: High latency detected in Sector 7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
