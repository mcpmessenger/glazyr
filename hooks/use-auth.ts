"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { AuthState } from "@/lib/api/auth"
import { getMe, guest, login, logout } from "@/lib/api/auth"

export function useAuth(): {
  auth: AuthState
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  signIn: (email: string, password: string) => Promise<boolean>
  continueAsGuest: () => Promise<boolean>
  signOut: () => Promise<boolean>
} {
  const [auth, setAuth] = useState<AuthState>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const me = await getMe()
      setAuth(me)
      setError(null)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load session")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      try {
        const me = await login({ email, password })
        setAuth(me)
        setError(null)
        return Boolean(me)
      } catch (e: any) {
        setError(e?.message ?? "Sign-in failed")
        return false
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const continueAsGuest = useCallback(async () => {
    setLoading(true)
    try {
      const me = await guest()
      setAuth(me)
      setError(null)
      return Boolean(me)
    } catch (e: any) {
      setError(e?.message ?? "Guest session failed")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setLoading(true)
    try {
      await logout()
      setAuth(null)
      setError(null)
      return true
    } catch (e: any) {
      setError(e?.message ?? "Sign-out failed")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return useMemo(
    () => ({
      auth,
      loading,
      error,
      refresh,
      signIn,
      continueAsGuest,
      signOut,
    }),
    [auth, loading, error, refresh, signIn, continueAsGuest, signOut],
  )
}
