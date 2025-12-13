"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { DEFAULT_CONTROL_PLANE_CONFIG } from "@/lib/control-plane-defaults"
import type { ControlPlaneConfig } from "@/lib/control-plane-types"
import { getControlPlaneConfig, updateControlPlaneConfig } from "@/lib/api/control-plane"

type SetState<T> = (next: T | ((prev: T) => T)) => void

export function useControlPlaneConfig(): {
  config: ControlPlaneConfig
  setConfig: SetState<ControlPlaneConfig>
  setConfigImmediate: (next: ControlPlaneConfig) => void
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
} {
  const [config, setConfigState] = useState<ControlPlaneConfig>(DEFAULT_CONTROL_PLANE_CONFIG)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const next = await getControlPlaneConfig()
      setConfigState(next)
      setError(null)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load config")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const setConfig: SetState<ControlPlaneConfig> = useCallback(
    (next) => {
      setConfigState((prev) => {
        const computed = typeof next === "function" ? (next as (p: ControlPlaneConfig) => ControlPlaneConfig)(prev) : next

        void (async () => {
          try {
            const saved = await updateControlPlaneConfig(computed)
            setConfigState(saved)
            setError(null)
          } catch (e: any) {
            setError(e?.message ?? "Failed to save config")
            // Best-effort rollback to server truth.
            try {
              const server = await getControlPlaneConfig()
              setConfigState(server)
            } catch {
              // ignore
            }
          }
        })()

        return computed
      })
    },
    [setConfigState],
  )

  const setConfigImmediate = useCallback((next: ControlPlaneConfig) => setConfigState(next), [])

  return useMemo(
    () => ({
      config,
      setConfig,
      setConfigImmediate,
      loading,
      error,
      refresh,
    }),
    [config, setConfig, setConfigImmediate, loading, error, refresh],
  )
}
