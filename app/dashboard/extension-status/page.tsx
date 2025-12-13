"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtensionBridge } from "@/hooks/use-extension-bridge"
import { useExtensionStatus } from "@/hooks/use-extension-status"

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

export default function ExtensionStatusPage() {
  const bridge = useExtensionBridge()
  const server = useExtensionStatus()
  const status = server.status

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Extension status</h2>
        <p className="text-sm text-muted-foreground mt-1">Connection, browser type, permissions, and heartbeat.</p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Connection</CardTitle>
          <CardDescription>
            Live status is received from the cockpit extension when it is installed and communicating with this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="font-medium text-foreground">
                {server.loading ? "…" : status.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {bridge.lastSeen ? `Last seen: ${formatTime(bridge.lastSeen)}` : "Waiting for extension…"}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Browser type</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : status.browserType}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Policy enforcement</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : status.policyEnforced ? "Enforcing config" : "Not enforcing (unknown)"}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kill switch (extension)</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : status.killSwitchEngaged ? "Engaged" : "Not engaged"}
              </div>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium">Permissions granted</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : status.permissionsGranted.length ? status.permissionsGranted.join(", ") : "—"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Agent mode (extension)</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : status.agentMode}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Allowed domains loaded</label>
              <div className="rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm">
                {server.loading ? "…" : String(status.allowedDomainsCount ?? 0)}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Last heartbeat:</span>{" "}
              <span className="font-medium text-foreground">
                {server.loading ? "…" : status.lastHeartbeat ? formatTime(status.lastHeartbeat) : "—"}
              </span>
            </div>
            <button
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
              onClick={bridge.ping}
              type="button"
            >
              Ping extension
            </button>
          </div>

          <div className="text-xs text-muted-foreground">
            Need the extension? See <Link className="underline" href="/install-extension">Install extension</Link>.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

