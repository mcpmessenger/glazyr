"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import type { TaskOutcome, TaskSummary } from "@/lib/control-plane-types"

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
  const [tasks, setTasks, mounted] = useLocalStorageState<TaskSummary[]>("glazyr-task-summaries", [])

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
          <CardTitle>Summaries</CardTitle>
          <CardDescription>Most recent first.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!mounted ? (
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
              onClick={() => {
                const now = Date.now()
                setTasks([
                  {
                    id: crypto.randomUUID(),
                    name: "Update account profile details",
                    outcome: "success",
                    timestamp: now - 1000 * 60 * 12,
                    summary: "Completed successfully. No sensitive fields were accessed.",
                  },
                  {
                    id: crypto.randomUUID(),
                    name: "Schedule meeting with vendor",
                    outcome: "cancelled",
                    timestamp: now - 1000 * 60 * 45,
                    summary: "Cancelled by user during confirmation step.",
                  },
                  {
                    id: crypto.randomUUID(),
                    name: "Export quarterly report",
                    outcome: "failed",
                    timestamp: now - 1000 * 60 * 90,
                    summary: "Failed due to missing permissions for the target domain.",
                  },
                ])
              }}
              disabled={!mounted}
            >
              Load demo data
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setTasks([])}
              disabled={!mounted || tasks.length === 0}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

