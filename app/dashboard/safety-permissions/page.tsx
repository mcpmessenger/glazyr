"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function SafetyPermissionsPage() {
  const bridge = useExtensionBridge()
  const { config, setConfig, loading } = useControlPlaneConfig()

  const [domainsDraft, setDomainsDraft] = useState("")
  const [disallowedDraft, setDisallowedDraft] = useState("")

  const canApply = useMemo(() => !loading && !config.killSwitchEngaged, [loading, config.killSwitchEngaged])

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Safety & permissions</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Define allowed domains, disallowed actions, thresholds, and budgets. The UI stores intent; enforcement belongs to
          the orchestrator/extension.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Allowed domains</CardTitle>
            <CardDescription>One per line. Example: example.com</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              className="min-h-[160px] w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={domainsDraft}
              onChange={(e) => setDomainsDraft(e.target.value)}
              placeholder={!loading ? config.safety.allowedDomains.join("\n") || "example.com\napp.company.com" : "…"}
            />
            <Button
              onClick={() =>
                setConfig((prev) => {
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: { ...prev.safety, allowedDomains: splitLines(domainsDraft) },
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply}
            >
              Apply
            </Button>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Disallowed actions</CardTitle>
            <CardDescription>One per line. Keep this conservative.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              className="min-h-[160px] w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={disallowedDraft}
              onChange={(e) => setDisallowedDraft(e.target.value)}
              placeholder={!loading ? config.safety.disallowedActions.join("\n") : "…"}
            />
            <Button
              onClick={() =>
                setConfig((prev) => {
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: { ...prev.safety, disallowedActions: splitLines(disallowedDraft) },
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply}
            >
              Apply
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Human-in-the-loop</CardTitle>
            <CardDescription>Confirmation policy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <select
              className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={!loading ? config.safety.humanInLoopThreshold : "high_risk_only"}
              onChange={(e) =>
                setConfig((prev) => {
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: {
                      ...prev.safety,
                      humanInLoopThreshold: e.target.value as ControlPlaneConfig["safety"]["humanInLoopThreshold"],
                    },
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply}
            >
              <option value="always_confirm">Always confirm</option>
              <option value="high_risk_only">High-risk only</option>
              <option value="never">Never (not recommended)</option>
            </select>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Runtime budget</CardTitle>
            <CardDescription>Maximum runtime (minutes).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              type="number"
              min={0}
              value={!loading ? config.safety.runtimeBudgetMinutes : 0}
              onChange={(e) =>
                setConfig((prev) => {
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: { ...prev.safety, runtimeBudgetMinutes: Math.max(0, Number(e.target.value || 0)) },
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply}
            />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Action budget</CardTitle>
            <CardDescription>Maximum actions per task.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              type="number"
              min={0}
              value={!loading ? config.safety.actionBudget : 0}
              onChange={(e) =>
                setConfig((prev) => {
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: { ...prev.safety, actionBudget: Math.max(0, Number(e.target.value || 0)) },
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply}
            />
          </CardContent>
        </Card>
      </div>

      {!loading && config.killSwitchEngaged ? (
        <div className="text-sm text-muted-foreground">
          Kill switch is engaged. Resume from <span className="text-foreground font-medium">Overview</span> to edit safety.
        </div>
      ) : null}
    </div>
  )
}

