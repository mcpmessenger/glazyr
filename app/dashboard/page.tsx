"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import { useExtensionStatus } from "@/hooks/use-extension-status"
import { useTaskSummaries } from "@/hooks/use-task-summaries"
import { setKillSwitch } from "@/lib/api/killswitch"

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

function formatHeartbeat(ts: number | null, nowMs: number) {
  if (!ts) return "—"
  const deltaMs = nowMs - ts
  const deltaSec = Math.max(0, Math.floor(deltaMs / 1000))
  if (deltaSec < 60) return `${deltaSec}s ago`
  const deltaMin = Math.floor(deltaSec / 60)
  if (deltaMin < 60) return `${deltaMin}m ago`
  const deltaHr = Math.floor(deltaMin / 60)
  return `${deltaHr}h ago`
}

function StatusPill({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "ok" | "warn" | "bad" | "neutral"
}) {
  const toneClass =
    tone === "ok"
      ? "bg-chart-2/15 text-chart-2 border-chart-2/30"
      : tone === "warn"
        ? "bg-primary/10 text-foreground border-border/50"
        : tone === "bad"
          ? "bg-destructive/15 text-destructive border-destructive/30"
          : "bg-muted/40 text-muted-foreground border-border/40"

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm glass-subtle">
      <span className="text-muted-foreground">{label}</span>
      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${toneClass}`}>{value}</span>
    </div>
  )
}

export default function DashboardOverviewPage() {
  const bridge = useExtensionBridge()
  const configState = useControlPlaneConfig()
  const tasksState = useTaskSummaries()
  const extState = useExtensionStatus()

  const [nowMs, setNowMs] = useState(0)
  useEffect(() => {
    const update = () => setNowMs(Date.now())
    update()
    const id = window.setInterval(update, 10_000)
    return () => window.clearInterval(id)
  }, [])

  const lastTask = useMemo(
    () => (tasksState.tasks.length ? tasksState.tasks.slice().sort((a, b) => b.timestamp - a.timestamp)[0] : null),
    [tasksState.tasks],
  )

  const ready = !configState.loading && !tasksState.loading && !extState.loading
  const config = configState.config
  const extDisplay = bridge.connected ? bridge.status : extState.status

  const killSwitchTone = !ready ? "neutral" : config.killSwitchEngaged ? "bad" : "ok"
  const extTone = !ready ? "neutral" : extDisplay.connected ? "ok" : "warn"
  const heartbeatTone =
    !ready || !extDisplay.lastHeartbeat
      ? "neutral"
      : nowMs - extDisplay.lastHeartbeat > 1000 * 60 * 2
        ? "warn"
        : "ok"

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Outcomes and configuration at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StatusPill label="Kill switch" value={!ready ? "…" : config.killSwitchEngaged ? "Engaged" : "Ready"} tone={killSwitchTone} />
        <StatusPill
          label="Extension"
          value={!ready ? "…" : extDisplay.connected ? "Connected" : "Disconnected"}
          tone={extTone}
        />
        <StatusPill label="Heartbeat" value={!ready ? "…" : formatHeartbeat(extDisplay.lastHeartbeat, nowMs)} tone={heartbeatTone} />
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

