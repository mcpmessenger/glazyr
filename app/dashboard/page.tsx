"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import { useExtensionStatus } from "@/hooks/use-extension-status"
import { useTaskSummaries } from "@/hooks/use-task-summaries"
import { setKillSwitch } from "@/lib/api/killswitch"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

export default function DashboardOverviewPage() {
  const bridge = useExtensionBridge()
  const configState = useControlPlaneConfig()
  const tasksState = useTaskSummaries()
  const extState = useExtensionStatus()

  const lastTask = useMemo(
    () => (tasksState.tasks.length ? tasksState.tasks.slice().sort((a, b) => b.timestamp - a.timestamp)[0] : null),
    [tasksState.tasks],
  )

  const ready = !configState.loading && !tasksState.loading && !extState.loading
  const config = configState.config
  const setConfig = configState.setConfig
  const extDisplay = bridge.connected ? bridge.status : extState.status

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Outcomes and configuration at a glance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Agent mode</CardTitle>
            <CardDescription>Behavioral envelope (not per-action control).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Current:</span>{" "}
              <span className="font-medium text-foreground">{ready ? config.agentMode : "…"}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Modes map to safety profiles: Observe (read-only), Assist (confirm), Automate (pre-approved).
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Extension status</CardTitle>
            <CardDescription>Connection and last heartbeat (live when extension is present).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Connection:</span>{" "}
              <span className="font-medium text-foreground">
                {!ready ? "…" : extDisplay.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Browser:</span>{" "}
              <span className="font-medium text-foreground">{ready ? extDisplay.browserType : "…"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Last heartbeat:</span>{" "}
              <span className="font-medium text-foreground">
                {ready ? (extDisplay.lastHeartbeat ? formatTime(extDisplay.lastHeartbeat) : "—") : "…"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Last task summary</CardTitle>
            <CardDescription>Summaries only (no screenshots, no traces).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {!ready ? (
              <div className="text-muted-foreground">…</div>
            ) : !lastTask ? (
              <div className="text-muted-foreground">No tasks yet.</div>
            ) : (
              <>
                <div className="font-medium text-foreground">{lastTask.name}</div>
                <div className="text-muted-foreground">{formatTime(lastTask.timestamp)}</div>
                <div className="text-foreground/90 leading-relaxed">{lastTask.summary}</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-strong">
        <CardHeader>
          <CardTitle>Emergency stop</CardTitle>
          <CardDescription>Instantly halt execution (killswitch flag).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {ready && config.killSwitchEngaged
              ? "Kill switch is engaged. Configure and resume only when safe."
              : "Use this to stop everything instantly if something feels wrong."}
          </div>
          <div className="flex gap-3">
            <Button
              variant="destructive"
              onClick={async () => {
                const next = await setKillSwitch(true)
                configState.setConfigImmediate(next)
                bridge.sendConfigUpdate(next)
                bridge.sendKillSwitch(true)
              }}
              disabled={!ready || config.killSwitchEngaged}
            >
              Engage stop
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={async () => {
                const next = await setKillSwitch(false)
                configState.setConfigImmediate(next)
                bridge.sendConfigUpdate(next)
                bridge.sendKillSwitch(false)
              }}
              disabled={!ready || !config.killSwitchEngaged}
            >
              Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

