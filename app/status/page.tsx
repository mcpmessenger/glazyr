import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>High-level availability for Glazyr services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-subtle rounded-xl border border-border/40 p-3">
                <div className="text-xs text-muted-foreground">Control plane</div>
                <div className="text-foreground font-semibold">Operational</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-3">
                <div className="text-xs text-muted-foreground">Extension</div>
                <div className="text-foreground font-semibold">See dashboard</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-3">
                <div className="text-xs text-muted-foreground">Runtime</div>
                <div className="text-foreground font-semibold">Operational</div>
              </div>
            </div>

            <p>
              Detailed extension connectivity and enforcement signals are available in{" "}
              <Link className="underline text-foreground" href="/dashboard/extension-status">
                Dashboard → Extension status
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/install-extension">Install extension</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

