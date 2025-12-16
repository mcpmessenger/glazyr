"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useControlPlaneConfig } from "@/hooks/use-control-plane-config"
import { SafetyConfigSchema } from "@/lib/control-plane-schemas"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
}

function validateDomains(domains: string[]): string[] {
  const bad: string[] = []
  for (const d of domains) {
    if (d.includes("://") || d.includes("/") || d.includes(" ")) {
      bad.push(d)
      continue
    }
    if (d !== "localhost" && !d.includes(".")) {
      bad.push(d)
      continue
    }
  }
  return bad
}

function validateActionNames(actions: string[]): string[] {
  const bad: string[] = []
  const re = /^[a-z0-9_]+$/i
  for (const a of actions) {
    if (!re.test(a)) bad.push(a)
  }
  return bad
}

export default function SafetyPermissionsPage() {
  const bridge = useExtensionBridge()
  const { config, setConfig, loading } = useControlPlaneConfig()

  const [domainsDraft, setDomainsDraft] = useState("")
  const [disallowedDraft, setDisallowedDraft] = useState("")
  const [domainsTouched, setDomainsTouched] = useState(false)
  const [actionsTouched, setActionsTouched] = useState(false)

  const canApply = useMemo(() => !loading && !config.killSwitchEngaged, [loading, config.killSwitchEngaged])

  const domainsText = useMemo(() => {
    if (loading) return ""
    return domainsTouched ? domainsDraft : config.safety.allowedDomains.join("\n")
  }, [loading, domainsTouched, domainsDraft, config.safety.allowedDomains])

  const actionsText = useMemo(() => {
    if (loading) return ""
    return actionsTouched ? disallowedDraft : config.safety.disallowedActions.join("\n")
  }, [loading, actionsTouched, disallowedDraft, config.safety.disallowedActions])

  const domainsNext = useMemo(() => splitLines(domainsText), [domainsText])
  const disallowedNext = useMemo(() => splitLines(actionsText), [actionsText])
  const badDomains = useMemo(() => validateDomains(domainsNext), [domainsNext])
  const badActions = useMemo(() => validateActionNames(disallowedNext), [disallowedNext])

  const domainsChanged = useMemo(
    () => !loading && domainsNext.join("\n") !== config.safety.allowedDomains.join("\n"),
    [loading, domainsNext, config.safety.allowedDomains],
  )
  const actionsChanged = useMemo(
    () => !loading && disallowedNext.join("\n") !== config.safety.disallowedActions.join("\n"),
    [loading, disallowedNext, config.safety.disallowedActions],
  )

  const domainsValid = badDomains.length === 0
  const actionsValid = badActions.length === 0

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
              value={domainsText}
              onChange={(e) => {
                setDomainsTouched(true)
                setDomainsDraft(e.target.value)
              }}
              placeholder={loading ? "…" : ""}
            />
            {!domainsValid ? (
              <div className="text-xs text-destructive">
                Invalid domain entries (no protocol/path/spaces; use `example.com`): {badDomains.slice(0, 5).join(", ")}
                {badDomains.length > 5 ? ` (+${badDomains.length - 5} more)` : ""}
              </div>
            ) : null}
            <Button
              onClick={() =>
                setConfig((prev) => {
                  const parsed = SafetyConfigSchema.safeParse({
                    ...prev.safety,
                    allowedDomains: domainsNext,
                  })
                  if (!parsed.success) return prev
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: parsed.data,
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply || !domainsChanged || !domainsValid}
            >
              Apply
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setDomainsTouched(false)}
              disabled={loading || !domainsChanged}
            >
              Reset
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
              value={actionsText}
              onChange={(e) => {
                setActionsTouched(true)
                setDisallowedDraft(e.target.value)
              }}
              placeholder={loading ? "…" : ""}
            />
            {!actionsValid ? (
              <div className="text-xs text-destructive">
                Invalid action names (letters/numbers/underscore only): {badActions.slice(0, 5).join(", ")}
                {badActions.length > 5 ? ` (+${badActions.length - 5} more)` : ""}
              </div>
            ) : null}
            <Button
              onClick={() =>
                setConfig((prev) => {
                  const parsed = SafetyConfigSchema.safeParse({
                    ...prev.safety,
                    disallowedActions: disallowedNext,
                  })
                  if (!parsed.success) return prev
                  const next: ControlPlaneConfig = {
                    ...prev,
                    safety: parsed.data,
                  }
                  bridge.sendConfigUpdate(next)
                  return next
                })
              }
              disabled={!canApply || !actionsChanged || !actionsValid}
            >
              Apply
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setActionsTouched(false)}
              disabled={loading || !actionsChanged}
            >
              Reset
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

