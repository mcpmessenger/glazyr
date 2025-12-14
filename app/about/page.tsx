import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>About Glazyr</CardTitle>
            <CardDescription>Safety-first automation governance for AI agents.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Glazyr is built around a simple idea: as AI agents become capable of taking real actions, teams need a calm,
              auditable control plane that governs behavior, enforces policies, and shows outcomes—without turning the UI
              into an execution surface.
            </p>
            <p>
              The control plane configures constraints (modes, domains, budgets, thresholds) and monitors what happened.
              Enforcement lives in the extension and runtime, where actions can be contained and stopped.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/how-it-works">How it works</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/pricing">Pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

