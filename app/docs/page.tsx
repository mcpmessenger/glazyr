import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <main className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Docs</CardTitle>
            <CardDescription>Operator documentation for installing, configuring, and monitoring Glazyr.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
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
            </div>

            <div className="border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">GitHub repositories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://github.com/mcpmessenger/glazyr-control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">glazyr-control</div>
                  <div className="text-xs text-muted-foreground mt-1">Control plane repository</div>
                </a>
                <a
                  href="https://github.com/mcpmessenger/glazyr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">glazyr</div>
                  <div className="text-xs text-muted-foreground mt-1">Main repository</div>
                </a>
                <a
                  href="https://github.com/mcpmessenger/glazyr-chrome-extension"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">glazyr-chrome-extension</div>
                  <div className="text-xs text-muted-foreground mt-1">Browser extension</div>
                </a>
                <a
                  href="https://github.com/mcpmessenger/LangchainMCP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">LangchainMCP</div>
                  <div className="text-xs text-muted-foreground mt-1">MCP server implementation</div>
                </a>
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Research & documentation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://notebooklm.google.com/notebook/2c41f985-c9aa-4dd5-adbd-15b62f2cc15e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">NotebookLM research</div>
                  <div className="text-xs text-muted-foreground mt-1">Due diligence & technical documentation</div>
                </a>
                <a
                  href="https://glazyr2026.blogspot.com/2025/12/glazyr-safety-first-mission-control-for.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">Blog post</div>
                  <div className="text-xs text-muted-foreground mt-1">Safety-first mission control</div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

