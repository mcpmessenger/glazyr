import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Docs</CardTitle>
            <CardDescription>Operator documentation for installing, configuring, and monitoring Glazyr.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This section is the canonical place for operator docs (setup, policies, troubleshooting). For now, the
              most useful starting points are:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/install-extension">Install extension</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/how-it-works">How it works</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/privacy-security">Privacy & security</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: the control plane is configuration + monitoring only; execution happens in the extension/runtime.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

