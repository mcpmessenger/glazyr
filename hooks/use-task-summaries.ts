"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { TaskSummary } from "@/lib/control-plane-types"
import { clearTaskSummaries, createTaskSummary, listTaskSummaries } from "@/lib/api/tasks"

export function useTaskSummaries(): {
  tasks: TaskSummary[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  addTask: (task: { id?: string; name: string; outcome: TaskSummary["outcome"]; timestamp?: number; summary: string }) => Promise<void>
  clear: () => Promise<void>
} {
  const [tasks, setTasks] = useState<TaskSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const next = await listTaskSummaries()
      setTasks(next)
      setError(null)
    } catch (e: any) {
      setError(e?.message ?? "Failed to load task summaries")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addTask = useCallback(async (task: { id?: string; name: string; outcome: TaskSummary["outcome"]; timestamp?: number; summary: string }) => {
    try {
      await createTaskSummary(task)
      await refresh()
    } catch (e: any) {
      setError(e?.message ?? "Failed to add task")
    }
  }, [refresh])

  const clear = useCallback(async () => {
    try {
      await clearTaskSummaries()
      await refresh()
    } catch (e: any) {
      setError(e?.message ?? "Failed to clear tasks")
    }
  }, [refresh])

  return useMemo(
    () => ({
      tasks,
      loading,
      error,
      refresh,
      addTask,
      clear,
    }),
    [tasks, loading, error, refresh, addTask, clear],
  )
}
