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

        {/* Hero Section */}
        <section className="glass rounded-2xl border border-border/50 p-8 md:p-10 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <Image src="/glazyr-logo.png" alt="Glazyr eye mark" width={64} height={64} priority className="rounded-xl" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Glazyr | Mission Control for AI Agents</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight mb-4">
                See Everything, Control Everything
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Real-time observability and safety controls for AI agents using Model Context Protocol (MCP).
                Mission control, not the cockpit. Govern, monitor, and scale AI automation with confidence.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href="/login">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-base px-8 py-6">
              <Link href="https://youtu.be/mb7rNFjLTD8?si=k4vgubTFWwRMXhTq" target="_blank" rel="noopener noreferrer">
                🎬 Watch 1-minute Demo
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href="https://github.com/mcpmessenger/glazyr" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>MCP Compatible</span>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="mb-10">
          <div className="glass rounded-2xl border border-border/50 p-8">
            <h2 className="text-3xl font-bold mb-2">Why Mission Control?</h2>
            <p className="text-muted-foreground mb-6">Safety-first automation with complete visibility and control</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "🛡️",
                  title: "Safety First",
                  description: "Pause, modify, or block agent actions in real-time",
                },
                {
                  icon: "👁️",
                  title: "Complete Visibility",
                  description: "Watch every tool call, API request, and decision",
                },
                {
                  icon: "🐛",
                  title: "Debug Faster",
                  description: "Understand exactly where agents fail or hallucinate",
                },
                {
                  icon: "🚀",
                  title: "Production Ready",
                  description: "MCP-compliant, extensible, and open-source",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="glass-subtle rounded-xl border border-border/40 p-4">
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <div className="font-semibold text-foreground mb-1">{benefit.title}</div>
                  <div className="text-sm text-muted-foreground">{benefit.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/how-it-works">See How It Works →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* User Pathways Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Get Started in Minutes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "👥",
                title: "For AI Engineers & Developers",
                description: "Build safer, more observable agents with our SDK and MCP server",
                cta: "Read Docs",
                ctaLink: "/docs",
                secondaryCta: "Try Demo",
                secondaryCtaLink: "/dashboard",
              },
              {
                icon: "🔧",
                title: "For DevOps & Platform Teams",
                description: "Deploy mission control for your organization's AI infrastructure",
                cta: "Enterprise Inquiries",
                ctaLink: "/about",
                secondaryCta: "Self-Host Guide",
                secondaryCtaLink: "/docs",
              },
              {
                icon: "🧪",
                title: "For Researchers & Experimenters",
                description: "Try Glazyr with our hosted Chrome extension - no setup required",
                cta: "Install Chrome Extension",
                ctaLink: "https://chromewebstore.google.com/detail/gikplhegdelcmbflmnjnecfkmfpiiddc",
                secondaryCta: "View Demo",
                secondaryCtaLink: "https://youtu.be/mb7rNFjLTD8?si=k4vgubTFWwRMXhTq",
              },
            ].map((pathway) => (
              <Card key={pathway.title} className="glass">
                <CardHeader>
                  <div className="text-3xl mb-2">{pathway.icon}</div>
                  <CardTitle>{pathway.title}</CardTitle>
                  <CardDescription>{pathway.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link href={pathway.ctaLink} target={pathway.ctaLink.startsWith("http") ? "_blank" : undefined} rel={pathway.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {pathway.cta}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={pathway.secondaryCtaLink} target={pathway.secondaryCtaLink.startsWith("http") ? "_blank" : undefined} rel={pathway.secondaryCtaLink.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {pathway.secondaryCta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="mb-10">
          <div className="glass rounded-2xl border border-border/50 p-8">
            <h2 className="text-3xl font-bold mb-2">See It in Action</h2>
            <p className="text-muted-foreground mb-6">Experience our mission control dashboard with live demos</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle>Live Control Panel Demo</CardTitle>
                  <CardDescription>Experience our mission control dashboard with a pre-configured agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Launch Demo Dashboard →</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass-subtle">
                <CardHeader>
                  <CardTitle>Video Walkthrough</CardTitle>
                  <CardDescription>Watch how to monitor and control an AI research agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="https://youtu.be/mb7rNFjLTD8?si=k4vgubTFWwRMXhTq" target="_blank" rel="noopener noreferrer">
                      🎬 Watch All Demos
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Integration & Social Proof Section */}
        <section className="mb-10">
          <div className="glass rounded-2xl border border-border/50 p-8">
            <h2 className="text-3xl font-bold mb-2">Built on Standards, Trusted by Developers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glass-subtle rounded-xl border border-border/40 p-4 text-center">
                <div className="font-semibold text-foreground mb-1">MCP Compatible</div>
                <div className="text-sm text-muted-foreground">Works with Claude, OpenAI, and any MCP-compliant agent</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-4 text-center">
                <div className="font-semibold text-foreground mb-1">Open Source</div>
                <div className="text-sm text-muted-foreground">100% transparent, MIT licensed</div>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-4 text-center">
                <div className="font-semibold text-foreground mb-1">Active Community</div>
                <div className="text-sm text-muted-foreground">Join developers in the MCP ecosystem</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="https://github.com/mcpmessenger/glazyr" target="_blank" rel="noopener noreferrer">
                  ⭐ Star on GitHub
                </Link>
              </Button>
            </div>
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
              <Button asChild variant="outline" className="w-full bg-transparent mt-4">
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

        {/* Enhanced Footer */}
        <footer className="glass-subtle rounded-2xl border border-border/40 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-foreground font-semibold mb-2">Stay in Control</div>
              <div className="text-sm text-muted-foreground mb-4">
                Mission control, not the cockpit. Outcomes over reasoning. Configuration over interaction.
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="ghost">
                  <Link href="https://github.com/mcpmessenger/glazyr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    GitHub
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    Twitter
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <div className="text-foreground font-semibold mb-2">Get Started</div>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </div>
                <div>
                  <Link href="/install-extension" className="text-muted-foreground hover:text-foreground transition-colors">
                    Install Extension
                  </Link>
                </div>
                <div>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </div>
                <div>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-semibold mb-2">Resources</div>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </div>
                <div>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <Link href="/status" className="text-muted-foreground hover:text-foreground transition-colors">
                    Status
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-semibold mb-2">Newsletter</div>
              <p className="text-sm text-muted-foreground mb-3">
                Get AI safety tips and updates delivered to your inbox.
              </p>
              <div className="text-xs text-muted-foreground">
                Newsletter signup coming soon
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Glazyr. Open source, MIT licensed.
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="sm">
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
