import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <SiteHeader />

        <div className="mt-6 glass rounded-2xl border border-border/50 p-6">
          <h1 className="text-3xl font-bold text-gradient">Market</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
            AI agents are moving from “assist” to “act.” The market demand shifts to governance: policy, monitoring,
            enforcement, and auditability for automation at scale.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>$16.7B+</CardTitle>
              <CardDescription>Security automation market signal (2030).</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Safety-first automation overlaps with security, compliance, and governance budgets.
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Governance gap</CardTitle>
              <CardDescription>Power without oversight creates operational risk.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Teams need clear controls: allowlists, budgets, permissions, and human review thresholds.
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>MCP-native</CardTitle>
              <CardDescription>Designed for the evolving agent ecosystem.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Glazyr positions as mission control for agent safety, not a monolithic automation suite.
            </CardContent>
          </Card>
        </div>

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Why this is investable</CardTitle>
            <CardDescription>Safety guarantees are a defensible architecture choice.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              Glazyr separates configuration/monitoring (web UI) from enforcement/execution (extension + runtime). That
              separation reduces operator risk, keeps the UI predictable, and enables “hard stops” when policies are
              violated.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/investors">Investor hub</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/how-it-works">Architecture</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

