"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { DEFAULT_EXTENSION_STATUS } from "@/lib/control-plane-defaults"
import type { ControlPlaneConfig, ExtensionStatus } from "@/lib/control-plane-types"
import { postExtensionStatus } from "@/lib/api/extension"

const WEB_SOURCE = "glazyr-web" as const
const EXT_SOURCE = "glazyr-extension" as const

type WebToExtensionMessage =
  | { source: typeof WEB_SOURCE; type: "glazyr:ping"; requestId: string; ts: number }
  | { source: typeof WEB_SOURCE; type: "glazyr:config:update"; requestId: string; ts: number; payload: ControlPlaneConfig }
  | { source: typeof WEB_SOURCE; type: "glazyr:killswitch"; requestId: string; ts: number; payload: { engaged: boolean } }

type ExtensionToWebMessage =
  | { source: typeof EXT_SOURCE; type: "glazyr:pong"; requestId?: string; ts: number }
  | { source: typeof EXT_SOURCE; type: "glazyr:status"; ts: number; payload: Partial<ExtensionStatus> }

function randomId() {
  // Short, non-crypto id: good enough for correlating pings.
  return Math.random().toString(36).slice(2, 10)
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isExtensionMessage(data: unknown): data is ExtensionToWebMessage {
  if (!isObject(data)) return false
  if (data.source !== EXT_SOURCE) return false
  if (typeof data.type !== "string") return false
  return data.type === "glazyr:pong" || data.type === "glazyr:status"
}

export interface ExtensionBridge {
  /** True if we have heard from the extension recently. */
  connected: boolean
  /** Last known status reported by the extension (best-effort). */
  status: ExtensionStatus
  /** When we last heard from the extension (ms since epoch). */
  lastSeen: number | null
  /** Ask the extension to respond with status (best-effort). */
  ping: () => void
  /** Broadcast the current control-plane config to the extension cockpit (best-effort). */
  sendConfigUpdate: (config: ControlPlaneConfig) => void
  /** Broadcast a kill switch change to the extension cockpit (best-effort). */
  sendKillSwitch: (engaged: boolean) => void
}

export function useExtensionBridge(options?: { pingIntervalMs?: number; staleAfterMs?: number }): ExtensionBridge {
  const pingIntervalMs = options?.pingIntervalMs ?? 5000
  const staleAfterMs = options?.staleAfterMs ?? 15000

  const [status, setStatus] = useState<ExtensionStatus>(DEFAULT_EXTENSION_STATUS)
  const [lastSeen, setLastSeen] = useState<number | null>(null)

  // A small clock so `connected` can decay even without new messages.
  const [nowMs, setNowMs] = useState(0)
  useEffect(() => {
    if (typeof window === "undefined") return
    const update = () => setNowMs(Date.now())
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])

  const post = useCallback((msg: WebToExtensionMessage) => {
    if (typeof window === "undefined") return
    window.postMessage(msg, "*")
  }, [])

  const ping = useCallback(() => {
    post({ source: WEB_SOURCE, type: "glazyr:ping", requestId: randomId(), ts: Date.now() })
  }, [post])

  const sendConfigUpdate = useCallback(
    (config: ControlPlaneConfig) => {
      post({ source: WEB_SOURCE, type: "glazyr:config:update", requestId: randomId(), ts: Date.now(), payload: config })
    },
    [post],
  )

  const sendKillSwitch = useCallback(
    (engaged: boolean) => {
      post({
        source: WEB_SOURCE,
        type: "glazyr:killswitch",
        requestId: randomId(),
        ts: Date.now(),
        payload: { engaged },
      })
    },
    [post],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const onMessage = (event: MessageEvent<unknown>) => {
      const data = event.data
      if (!isExtensionMessage(data)) return

      const now = Date.now()
      setLastSeen(now)

      if (data.type === "glazyr:pong") {
        setStatus((prev) => {
          const next = { ...prev, connected: true, lastHeartbeat: now }
          void postExtensionStatus({ connected: true, lastHeartbeat: now }).catch(() => {})
          return next
        })
        return
      }

      if (data.type === "glazyr:status") {
        setStatus((prev) => {
          const merged: ExtensionStatus = {
            ...prev,
            ...data.payload,
            // If extension reports a heartbeat, use it; otherwise keep existing.
            lastHeartbeat: data.payload.lastHeartbeat ?? prev.lastHeartbeat ?? now,
            connected: true,
          }
          void postExtensionStatus(merged).catch(() => {})
          return merged
        })
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  // Periodic ping: best-effort discovery/heartbeat.
  useEffect(() => {
    if (typeof window === "undefined") return
    ping()
    const id = window.setInterval(() => ping(), pingIntervalMs)
    return () => window.clearInterval(id)
  }, [ping, pingIntervalMs])

  const connected = useMemo(() => {
    if (!lastSeen) return false
    return nowMs - lastSeen < staleAfterMs
  }, [lastSeen, staleAfterMs, nowMs])

  // If we go stale, reflect disconnected in status without discarding last known fields.
  useEffect(() => {
    if (connected) return
    setStatus((prev) => (prev.connected ? { ...prev, connected: false } : prev))
  }, [connected])

  return { connected, status, lastSeen, ping, sendConfigUpdate, sendKillSwitch }
}
