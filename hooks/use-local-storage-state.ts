"use client"

import { useEffect, useState } from "react"

type SetState<T> = (next: T | ((prev: T) => T)) => void

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota/security errors
  }
}

export function useLocalStorageState<T>(key: string, initialValue: T): [T, SetState<T>, boolean] {
  const [mounted, setMounted] = useState(false)
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    setMounted(true)
    setValue(readJson<T>(key, initialValue))
  }, [key, initialValue])

  useEffect(() => {
    if (!mounted) return
    writeJson(key, value)
  }, [key, value, mounted])

  // Keep in sync across tabs
  useEffect(() => {
    if (!mounted) return
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      setValue(readJson<T>(key, initialValue))
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [key, initialValue, mounted])

  return [value, setValue, mounted]
}

