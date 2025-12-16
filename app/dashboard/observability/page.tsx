"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Snapshot = {
  ts: number
  requestsTotal: number
  requests5xx: number
  durationBuckets: Record<string, number> // le -> cumulative count
  durationCount: number
  durationSum: number
  mcpTotal: number
}

type Point = {
  t: string
  rpm: number
  errPct: number
  p95ms: number
  avgms: number
  mcpRpm: number
}

function parseLabels(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const part of raw.split(",")) {
    const idx = part.indexOf("=")
    if (idx === -1) continue
    const k = part.slice(0, idx).trim()
    let v = part.slice(idx + 1).trim()
    if (v.startsWith("\"") && v.endsWith("\"")) v = v.slice(1, -1)
    if (k) out[k] = v
  }
  return out
}

function parsePrometheus(text: string): Snapshot {
  const snap: Snapshot = {
    ts: Date.now(),
    requestsTotal: 0,
    requests5xx: 0,
    durationBuckets: {},
    durationCount: 0,
    durationSum: 0,
    mcpTotal: 0,
  }

  for (const line of text.split("\n")) {
    const s = line.trim()
    if (!s || s.startsWith("#")) continue

    const m = s.match(/^([a-zA-Z_:][a-zA-Z0-9_:]*)(\{([^}]*)\})?\s+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)/)
    if (!m) continue
    const name = m[1]
    const labelsRaw = m[3] ?? ""
    const value = Number(m[4])
    if (!Number.isFinite(value)) continue
    const labels = labelsRaw ? parseLabels(labelsRaw) : {}

    if (name === "glazyr_http_requests_total") {
      snap.requestsTotal += value
      const status = labels.status ?? ""
      if (status.startsWith("5")) snap.requests5xx += value
      continue
    }

    if (name === "glazyr_http_request_duration_seconds_bucket") {
      const le = labels.le ?? ""
      if (!le) continue
      snap.durationBuckets[le] = (snap.durationBuckets[le] ?? 0) + value
      continue
    }

    if (name === "glazyr_http_request_duration_seconds_count") {
      snap.durationCount += value
      continue
    }

    if (name === "glazyr_http_request_duration_seconds_sum") {
      snap.durationSum += value
      continue
    }

    if (name === "glazyr_mcp_invocations_total") {
      snap.mcpTotal += value
      continue
    }
  }

  return snap
}

function deltaMap(next: Record<string, number>, prev: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [k, v] of Object.entries(next)) {
    const d = v - (prev[k] ?? 0)
    out[k] = d >= 0 ? d : 0
  }
  return out
}

function quantileUpperBoundFromBuckets(buckets: Record<string, number>, q: number): number {
  const entries = Object.entries(buckets)
    .map(([le, v]) => ({ le, v }))
    .sort((a, b) => {
      if (a.le === "+Inf") return 1
      if (b.le === "+Inf") return -1
      return Number(a.le) - Number(b.le)
    })

  const total = buckets["+Inf"] ?? entries[entries.length - 1]?.v ?? 0
  if (!total || total <= 0) return 0

  const target = total * q
  for (const e of entries) {
    if (e.v >= target) {
      if (e.le === "+Inf") return 0
      const n = Number(e.le)
      return Number.isFinite(n) ? n : 0
    }
  }
  return 0
}

export default function ObservabilityPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [points, setPoints] = useState<Point[]>([])

  const prevRef = useRef<Snapshot | null>(null)

  useEffect(() => {
    let alive = true

    async function poll() {
      try {
        const res = await fetch("/api/runtime/metrics", { cache: "no-store" })
        if (!res.ok) throw new Error(`Metrics fetch failed (${res.status})`)
        const text = await res.text()
        const snap = parsePrometheus(text)

        const prev = prevRef.current
        prevRef.current = snap

        if (!prev) {
          if (!alive) return
          setLoading(false)
          setError(null)
          return
        }

        const dtSec = Math.max(1, Math.round((snap.ts - prev.ts) / 1000))
        const dReq = Math.max(0, snap.requestsTotal - prev.requestsTotal)
        const dErr = Math.max(0, snap.requests5xx - prev.requests5xx)

        const dCount = Math.max(0, snap.durationCount - prev.durationCount)
        const dSum = Math.max(0, snap.durationSum - prev.durationSum)
        const avgms = dCount > 0 ? (dSum / dCount) * 1000 : 0

        const dBuckets = deltaMap(snap.durationBuckets, prev.durationBuckets)
        const p95s = quantileUpperBoundFromBuckets(dBuckets, 0.95)
        const p95ms = p95s * 1000

        const dMcp = Math.max(0, snap.mcpTotal - prev.mcpTotal)

        const nextPoint: Point = {
          t: new Date(snap.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          rpm: (dReq / dtSec) * 60,
          errPct: dReq > 0 ? (dErr / dReq) * 100 : 0,
          p95ms,
          avgms,
          mcpRpm: (dMcp / dtSec) * 60,
        }

        if (!alive) return
        setLoading(false)
        setError(null)
        setPoints((cur) => [...cur.slice(-59), nextPoint])
      } catch (e: any) {
        if (!alive) return
        setLoading(false)
        const msg = e?.message ?? "Failed to load metrics"
        // Provide helpful error message for 503
        if (msg.includes("503") || msg.includes("Missing")) {
          setError("Metrics endpoint unavailable. Set GLAZYR_CONTROL_RUNTIME_URL environment variable to enable.")
        } else {
          setError(msg)
        }
      }
    }

    void poll()
    const id = window.setInterval(poll, 10_000)
    return () => {
      alive = false
      window.clearInterval(id)
    }
  }, [])

  const latest = points.length ? points[points.length - 1] : null

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Observability</h2>
        <p className="text-sm text-muted-foreground mt-1">Live charts from the deployed runtime metrics endpoint.</p>
      </div>

      {error ? (
        <Card className="glass border-border/50">
          <CardContent className="pt-6">
            <div className="text-sm">
              <div className="font-medium text-foreground">Metrics unavailable</div>
              <div className="text-muted-foreground mt-1">{error}</div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm glass-subtle">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium text-foreground">{loading ? "Loading…" : error ? "Unavailable" : "Live"}</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm glass-subtle">
          <span className="text-muted-foreground">Requests/min</span>
          <span className="font-medium text-foreground">{latest ? latest.rpm.toFixed(1) : "—"}</span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm glass-subtle">
          <span className="text-muted-foreground">p95 latency</span>
          <span className="font-medium text-foreground">{latest ? `${Math.round(latest.p95ms)}ms` : "—"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Request rate</CardTitle>
            <CardDescription>Requests per minute (last ~10 minutes).</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Line type="monotone" dataKey="rpm" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Error rate</CardTitle>
            <CardDescription>5xx as % of requests (last ~10 minutes).</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  width={36}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  formatter={(v: number | string) => [`${Number(v).toFixed(2)}%`, "5xx rate"]}
                  contentStyle={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Line type="monotone" dataKey="errPct" stroke="var(--destructive)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Latency</CardTitle>
            <CardDescription>p95 and average latency (ms) per interval.</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={44} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Line type="monotone" dataKey="p95ms" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="avgms" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>MCP activity</CardTitle>
            <CardDescription>Tool invocations per minute (aggregated).</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.35} vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} width={44} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Line type="monotone" dataKey="mcpRpm" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

