"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { DEFAULT_EXTENSION_STATUS } from "@/lib/control-plane-defaults"
import type { ExtensionStatus } from "@/lib/control-plane-types"
import { getExtensionStatus } from "@/lib/api/extension"

export function useExtensionStatus(options?: { pollIntervalMs?: number }): {
  status: ExtensionStatus
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
} {
  const pollIntervalMs = options?.pollIntervalMs ?? 5000

  const [status, setStatus] = useState<ExtensionStatus>(DEFAULT_EXTENSION_STATUS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const next = await getExtensionStatus()
      setStatus(next)
      setError(null)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load extension status")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const id = window.setInterval(() => void refresh(), pollIntervalMs)
    return () => window.clearInterval(id)
  }, [refresh, pollIntervalMs])

  return useMemo(
    () => ({
      status,
      loading,
      error,
      refresh,
    }),
    [status, loading, error, refresh],
  )
}
