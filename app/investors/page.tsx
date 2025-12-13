import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const INVESTOR_EMAIL = "investors@glazyr.com"

export default function InvestorsPage() {
  const deckHref = `mailto:${INVESTOR_EMAIL}?subject=${encodeURIComponent("Glazyr investor deck")}`
  const demoHref = `mailto:${INVESTOR_EMAIL}?subject=${encodeURIComponent("Glazyr demo request")}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <SiteHeader />

        <div className="mt-6 glass rounded-2xl border border-border/50 p-6">
          <h1 className="text-3xl font-bold text-gradient">Investors</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
            Glazyr is mission control for AI agent safety—governance, monitoring, and enforcement architecture designed
            for the MCP ecosystem.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <a href={deckHref}>Request deck</a>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <a href={demoHref}>Schedule a demo</a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
              <Link href="/market">Market</Link>
            </Button>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Contact: <span className="text-foreground">{INVESTOR_EMAIL}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Safety-first narrative</CardTitle>
              <CardDescription>Mission control, not the cockpit.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The control plane never executes actions. Enforcement lives in the extension + runtime, where it can be
              contained and stopped.
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Defensibility</CardTitle>
              <CardDescription>Architectural separation is hard to replicate.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A clean separation between governance and execution enables clearer guarantees, safer operations, and better
              auditability.
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Revenue model</CardTitle>
              <CardDescription>SaaS + enterprise licensing.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Monetization aligns with governance value: per-agent packaging and enterprise controls/support.
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

