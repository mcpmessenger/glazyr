"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import type { AgentMode } from "@/lib/control-plane-types"

const modes: { mode: AgentMode; title: string; description: string }[] = [
  { mode: "observe", title: "Observe", description: "Read-only. No actions." },
  { mode: "assist", title: "Assist", description: "Confirm before action." },
  { mode: "automate", title: "Automate", description: "Pre-approved actions within budgets." },
]

export default function AgentModesPage() {
  const bridge = useExtensionBridge()
  const { config, setConfig, loading } = useControlPlaneConfig()

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Agent modes</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a behavioral envelope. Modes map to safety profiles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {modes.map((m) => {
          const selected = !loading && config.agentMode === m.mode
          return (
            <Card key={m.mode} className={`glass ${selected ? "ring-2 ring-primary/40" : ""}`}>
              <CardHeader>
                <CardTitle>{m.title}</CardTitle>
                <CardDescription>{m.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  variant={selected ? "secondary" : "default"}
                  onClick={() =>
                    setConfig((prev) => {
                      const next = { ...prev, agentMode: m.mode }
                      bridge.sendConfigUpdate(next)
                      return next
                    })
                  }
                  disabled={loading || config.killSwitchEngaged}
                >
                  {selected ? "Selected" : "Select"}
                </Button>
                {!loading && config.killSwitchEngaged ? (
                  <p className="text-xs text-muted-foreground">
                    Kill switch is engaged. Resume first to change mode.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

