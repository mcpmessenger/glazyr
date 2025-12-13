"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import { DEFAULT_EXTENSION_STATUS } from "@/lib/control-plane-defaults"
import type { ExtensionStatus } from "@/lib/control-plane-types"

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

export default function ExtensionStatusPage() {
  const [status, setStatus, mounted] = useLocalStorageState<ExtensionStatus>("glazyr-extension-status", DEFAULT_EXTENSION_STATUS)

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
            This UI does not talk to MCPs. Wire this to an extension heartbeat endpoint when available.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="font-medium text-foreground">
                {!mounted ? "…" : status.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  setStatus((prev) => ({
                    ...prev,
                    connected: true,
                    lastHeartbeat: Date.now(),
                  }))
                }
                disabled={!mounted || status.connected}
              >
                Mark connected
              </Button>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => setStatus((prev) => ({ ...prev, connected: false }))}
                disabled={!mounted || !status.connected}
              >
                Mark disconnected
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Browser type</label>
              <select
                className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={mounted ? status.browserType : "chrome"}
                onChange={(e) => setStatus((prev) => ({ ...prev, browserType: e.target.value as ExtensionStatus["browserType"] }))}
                disabled={!mounted}
              >
                <option value="chrome">Chrome</option>
                <option value="edge">Edge</option>
                <option value="brave">Brave</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium">Permissions granted</label>
              <input
                className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                value={mounted ? status.permissionsGranted.join(", ") : ""}
                onChange={(e) =>
                  setStatus((prev) => ({
                    ...prev,
                    permissionsGranted: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                disabled={!mounted}
                placeholder="tabs, activeTab, scripting, storage"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Last heartbeat:</span>{" "}
              <span className="font-medium text-foreground">
                {!mounted ? "…" : status.lastHeartbeat ? formatTime(status.lastHeartbeat) : "—"}
              </span>
            </div>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setStatus((prev) => ({ ...prev, lastHeartbeat: Date.now() }))}
              disabled={!mounted}
            >
              Update heartbeat timestamp
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Need the extension? See <Link className="underline" href="/install-extension">Install extension</Link>.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

