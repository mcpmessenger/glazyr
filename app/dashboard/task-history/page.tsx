"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskSummaries } from "@/hooks/use-task-summaries"
import { listRuntimeTasks, type RuntimeTaskSummary } from "@/lib/api/runtime"
import { createTaskSummary } from "@/lib/api/tasks"
import type { TaskOutcome } from "@/lib/control-plane-types"
import { format, startOfDay, subDays } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function formatTime(ts: number) {
  return new Date(ts).toLocaleString()
}

function badge(outcome: TaskOutcome) {
  switch (outcome) {
    case "success":
      return "bg-chart-2/15 text-chart-2"
    case "failed":
      return "bg-destructive/15 text-destructive"
    case "cancelled":
      return "bg-muted text-muted-foreground"
  }
}

export default function TaskHistoryPage() {
  const { tasks, loading, refresh, clear } = useTaskSummaries()
  const [runtimeTasks, setRuntimeTasks] = useState<RuntimeTaskSummary[]>([])
  const [runtimeLoading, setRuntimeLoading] = useState(true)
  const [runtimeError, setRuntimeError] = useState<string | null>(null)

  async function refreshRuntime() {
    setRuntimeLoading(true)
    try {
      const res = await listRuntimeTasks(25)
      setRuntimeTasks(res.tasks)
      setRuntimeError(null)
    } catch (e: any) {
      setRuntimeError(e?.message ?? "Failed to load runtime tasks")
    } finally {
      setRuntimeLoading(false)
    }
  }

  useEffect(() => {
    void refreshRuntime()
  }, [])

  const daily = (() => {
    const days = 14
    const today = startOfDay(new Date())
    const byDay = new Map<number, { success: number; failed: number; cancelled: number }>()
    for (const t of tasks) {
      const key = startOfDay(new Date(t.timestamp)).getTime()
      const prev = byDay.get(key) ?? { success: 0, failed: 0, cancelled: 0 }
      prev[t.outcome]++
      byDay.set(key, prev)
    }
    const out = []
    for (let i = days - 1; i >= 0; i--) {
      const d = subDays(today, i)
      const key = d.getTime()
      const v = byDay.get(key) ?? { success: 0, failed: 0, cancelled: 0 }
      const total = v.success + v.failed + v.cancelled
      out.push({
        day: format(d, "MMM d"),
        total,
        success: v.success,
        failed: v.failed,
        cancelled: v.cancelled,
        successRate: total === 0 ? 0 : Math.round((v.success / total) * 100),
      })
    }
    return out
  })()

  const runtimeSorted = useMemo(() => {
    return runtimeTasks.slice().sort((a, b) => (b.updated_at_ms || 0) - (a.updated_at_ms || 0))
  }, [runtimeTasks])

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Task history</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Shows name, outcome, timestamp, and summary. Screenshots, reasoning, and traces are intentionally hidden.
        </p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Trends</CardTitle>
          <CardDescription>Last 14 days (counts and success rate).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="text-sm text-muted-foreground">…</div>
          ) : tasks.length === 0 ? (
            <div className="text-sm text-muted-foreground">No data yet.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[220px] rounded-lg border border-border/30 bg-background/20 p-3">
                <div className="text-xs text-muted-foreground mb-2">Task volume</div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={daily} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval={2} />
                    <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={28} allowDecimals={false} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        color: "white",
                      }}
                    />
                    <Bar dataKey="success" stackId="a" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="failed" stackId="a" fill="var(--destructive)" />
                    <Bar dataKey="cancelled" stackId="a" fill="var(--muted-foreground)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[220px] rounded-lg border border-border/30 bg-background/20 p-3">
                <div className="text-xs text-muted-foreground mb-2">Success rate</div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={daily} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval={2} />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                      width={32}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      formatter={(v: number | string) => [`${v}%`, "Success rate"]}
                      contentStyle={{
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        color: "white",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="successRate"
                      stroke="var(--color-chart-2)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Runtime (glazyr-control)</CardTitle>
          <CardDescription>
            Live task summaries from the orchestration runtime via <code className="px-1 py-0.5 rounded bg-background/30">/api/runtime/tasks</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {runtimeLoading ? (
            <div className="text-sm text-muted-foreground">…</div>
          ) : runtimeError ? (
            <div className="space-y-2">
              <div className="text-sm text-destructive font-medium">Runtime unavailable</div>
              <div className="text-xs text-muted-foreground">
                {runtimeError.includes("Missing") || runtimeError.includes("503")
                  ? "Set GLAZYR_CONTROL_RUNTIME_URL environment variable to enable runtime task monitoring."
                  : runtimeError}
              </div>
              <Button variant="outline" size="sm" onClick={refreshRuntime} disabled={runtimeLoading} className="mt-2">
                Refresh runtime
              </Button>
            </div>
          ) : runtimeSorted.length === 0 ? (
            <div className="text-sm text-muted-foreground">No runtime tasks yet.</div>
          ) : (
            runtimeSorted.map((t) => (
              <div key={t.task_id} className="glass-subtle rounded-lg p-4 border border-border/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-foreground truncate">{t.task_id}</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatTime(t.updated_at_ms)}</div>
                  </div>
                  <span className="shrink-0 text-xs rounded-full px-2 py-1 bg-muted text-muted-foreground">{t.status}</span>
                </div>
                <div className="mt-3 text-sm text-foreground/90 leading-relaxed space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Input</div>
                    <div className="whitespace-pre-wrap break-words">{t.input_preview}</div>
                  </div>
                  {t.output_preview ? (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Output</div>
                      <div className="whitespace-pre-wrap break-words">{t.output_preview}</div>
                    </div>
                  ) : null}
                  {t.error ? (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Error</div>
                      <div className="whitespace-pre-wrap break-words text-destructive">{t.error}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="bg-transparent" onClick={() => void refreshRuntime()} disabled={runtimeLoading}>
              Refresh runtime
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Summaries</CardTitle>
          <CardDescription>Most recent first.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="text-sm text-muted-foreground">…</div>
          ) : tasks.length === 0 ? (
            <div className="text-sm text-muted-foreground">No tasks recorded yet.</div>
          ) : (
            tasks
              .slice()
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((t) => (
                <div key={t.id} className="glass-subtle rounded-lg p-4 border border-border/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{formatTime(t.timestamp)}</div>
                    </div>
                    <span className={`shrink-0 text-xs rounded-full px-2 py-1 ${badge(t.outcome)}`}>{t.outcome}</span>
                  </div>
                  <div className="mt-3 text-sm text-foreground/90 leading-relaxed">{t.summary}</div>
                </div>
              ))
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={async () => {
                const now = Date.now()
                await Promise.all([
                  createTaskSummary({
                    id: crypto.randomUUID(),
                    name: "Update account profile details",
                    outcome: "success",
                    timestamp: now - 1000 * 60 * 12,
                    summary: "Completed successfully. No sensitive fields were accessed.",
                  }),
                  createTaskSummary({
                    id: crypto.randomUUID(),
                    name: "Schedule meeting with vendor",
                    outcome: "cancelled",
                    timestamp: now - 1000 * 60 * 45,
                    summary: "Cancelled by user during confirmation step.",
                  }),
                  createTaskSummary({
                    id: crypto.randomUUID(),
                    name: "Export quarterly report",
                    outcome: "failed",
                    timestamp: now - 1000 * 60 * 90,
                    summary: "Failed due to missing permissions for the target domain.",
                  }),
                ])
                await refresh()
              }}
              disabled={loading}
            >
              Load demo data
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => void clear()}
              disabled={loading || tasks.length === 0}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

