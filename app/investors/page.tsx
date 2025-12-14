import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const INVESTOR_EMAIL = "greetings@automationalien.com"

export default function InvestorsPage() {
  const deckHref = `mailto:${INVESTOR_EMAIL}?subject=${encodeURIComponent("Glazyr investor deck")}`
  const demoHref = `mailto:${INVESTOR_EMAIL}?subject=${encodeURIComponent("Glazyr demo request")}`

  return (
    <main className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
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

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Investor resources & due diligence</CardTitle>
            <CardDescription>GitHub repositories, demos, documentation, and research materials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
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

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Demos & live systems</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://glazyr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">Production site</div>
                  <div className="text-xs text-muted-foreground mt-1">glazyr.com</div>
                </a>
                <a
                  href="https://langchain-agent-mcp-server-554655392699.us-central1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">MCP Runtime</div>
                  <div className="text-xs text-muted-foreground mt-1">LangChain agent server</div>
                </a>
                <a
                  href="https://glazyrval-vtdwckye.manus.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">Validation demo</div>
                  <div className="text-xs text-muted-foreground mt-1">glazyrval.manus.space</div>
                </a>
                <a
                  href="https://glazyrwp-effabcqz.manus.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">WordPress demo</div>
                  <div className="text-xs text-muted-foreground mt-1">glazyrwp.manus.space</div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Documentation & research</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://notebooklm.google.com/notebook/2c41f985-c9aa-4dd5-adbd-15b62f2cc15e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">NotebookLM research</div>
                  <div className="text-xs text-muted-foreground mt-1">Due diligence notebook</div>
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
                <a
                  href="https://chatgpt.com/share/693e4404-0f74-800d-989c-b5857c2494da"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">ChatGPT demo</div>
                  <div className="text-xs text-muted-foreground mt-1">Interactive demonstration</div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Video demonstrations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://youtu.be/wpY1PcFD0L4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">Demo video 1</div>
                  <div className="text-xs text-muted-foreground mt-1">YouTube demonstration</div>
                </a>
                <a
                  href="https://youtu.be/mb7rNFjLTD8?si=dEUo19YMi1C7TmGP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-subtle rounded-xl border border-border/40 p-3 hover:border-border transition-colors"
                >
                  <div className="text-sm font-medium text-foreground">Demo video 2</div>
                  <div className="text-xs text-muted-foreground mt-1">YouTube demonstration</div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

