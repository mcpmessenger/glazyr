import Link from "next/link"
import Image from "next/image"
import { LandingSplash } from "@/components/landing-splash"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
      <LandingSplash />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-10">
          <SiteHeader />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="glass rounded-2xl border border-border/50 p-6">
            <div className="flex items-start gap-4">
              <Image src="/glazyr-logo.png" alt="Glazyr eye mark" width={56} height={56} priority className="rounded-xl" />
              <div>
                <p className="text-sm text-muted-foreground">Glazyr</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">
                  Safety-First Automation Control Plane for AI Agents
                </h1>
                <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
                  Mission control, not the cockpit. Govern, monitor, and scale AI automation with confidence—without
                  executing actions from the UI.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/investors">Investor Deck</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/install-extension">Install Extension</Link>
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              Orchestration/execution happens in the extension + runtime; this site is configuration + monitoring only.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>For operators</CardTitle>
                <CardDescription>Configure constraints. Monitor outcomes. Keep humans in the loop.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Agent modes, budgets, allowlisted domains</li>
                  <li>Task summaries and enforcement signals</li>
                  <li>Emergency stop and policy broadcast</li>
                </ul>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/how-it-works">How it works</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>For investors</CardTitle>
                <CardDescription>Safety-first automation is a governance market, not a UI gimmick.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-subtle rounded-xl border border-border/40 p-3">
                    <div className="text-xs text-muted-foreground">TAM signal</div>
                    <div className="text-lg font-semibold text-foreground">$16.7B+</div>
                  </div>
                  <div className="glass-subtle rounded-xl border border-border/40 p-3">
                    <div className="text-xs text-muted-foreground">Positioning</div>
                    <div className="text-lg font-semibold text-foreground">MCP-native</div>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/market">Market overview</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass lg:col-span-1">
            <CardHeader>
              <CardTitle>The problem</CardTitle>
              <CardDescription>AI agents are powerful—but autonomy without governance is risk.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>As agents take actions in real systems, teams need safety boundaries, monitoring, and clear review trails.</p>
              <p>Glazyr focuses on governance and outcomes, not “chat UI control.”</p>
            </CardContent>
          </Card>

          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle>The solution</CardTitle>
              <CardDescription>Configuration + monitoring, with enforcement outside the UI.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="glass-subtle rounded-xl border border-border/40 p-4">
                <div className="font-medium text-foreground">Configuration</div>
                <div className="mt-1 text-muted-foreground">Agent modes, budgets, allowlists, action restrictions.</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-4">
                <div className="font-medium text-foreground">Monitoring</div>
                <div className="mt-1 text-muted-foreground">Real-time status, task summaries, extension health.</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-4">
                <div className="font-medium text-foreground">Safety</div>
                <div className="mt-1 text-muted-foreground">Human-in-the-loop thresholds, policy enforcement, kill switch.</div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Three-part architecture</CardTitle>
              <CardDescription>Separation of concerns keeps operators safe and execution contained.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="grid grid-cols-1 gap-2">
                <div className="glass-subtle rounded-xl border border-border/40 p-3">
                  <div className="text-foreground font-medium">Control Plane (Web UI)</div>
                  <div>Configuration & monitoring only.</div>
                </div>
                <div className="glass-subtle rounded-xl border border-border/40 p-3">
                  <div className="text-foreground font-medium">Extension (Browser)</div>
                  <div>Local execution & policy enforcement.</div>
                </div>
                <div className="glass-subtle rounded-xl border border-border/40 p-3">
                  <div className="text-foreground font-medium">Runtime (Backend)</div>
                  <div>Orchestration, state, intent processing.</div>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/how-it-works">See architecture</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Use cases</CardTitle>
              <CardDescription>Safety-critical automation across teams.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              {[
                { title: "Enterprise automation", body: "Guardrails for business workflows." },
                { title: "Security operations", body: "Automation with human oversight." },
                { title: "Customer support", body: "Controlled escalation paths." },
                { title: "Data processing", body: "Budgeted, policy-bound batch work." },
              ].map((u) => (
                <div key={u.title} className="glass-subtle rounded-xl border border-border/40 p-3">
                  <div className="font-medium text-foreground">{u.title}</div>
                  <div className="mt-1">{u.body}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <footer className="mt-12 glass-subtle rounded-2xl border border-border/40 p-5 text-sm text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-foreground font-medium">Mission control, not the cockpit.</div>
            <div>Outcomes over reasoning. Configuration over interaction.</div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/login">Get started free</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
              <Link href="/investors">Schedule a demo</Link>
            </Button>
          </div>
        </footer>
      </div>
    </main>
  )
}
