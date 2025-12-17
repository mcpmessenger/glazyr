import Link from "next/link"
import Image from "next/image"
import { LandingSplash } from "@/components/landing-splash"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const CHROME_EXTENSION_URL = "https://chromewebstore.google.com/detail/gikplhegdelcmbflmnjnecfkmfpiiddc"

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
                Install the Chrome extension to get started in minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                Install Chrome Extension
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent text-base px-8 py-6">
              <Link href="https://youtu.be/mb7rNFjLTD8?si=k4vgubTFWwRMXhTq" target="_blank" rel="noopener noreferrer">
                🎬 Watch 1-minute Demo
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto text-base px-8 py-6">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>MCP Compatible</span>
            <span className="hidden sm:inline">•</span>
            <span>Open Source</span>
            <span className="hidden sm:inline">•</span>
            <span>No setup required</span>
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
          </div>
        </section>

        {/* How It Works - Simple */}
        <section className="mb-10">
          <div className="glass rounded-2xl border border-border/50 p-8">
            <h2 className="text-3xl font-bold mb-2">How It Works</h2>
            <p className="text-muted-foreground mb-6">Get started in 3 simple steps</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-subtle rounded-xl border border-border/40 p-6">
                <div className="text-3xl mb-3">1️⃣</div>
                <div className="font-semibold text-foreground mb-2">Install Extension</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Add the Glazyr Chrome extension from the Chrome Web Store. No account required to start.
                </div>
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                    Install Now →
                  </Link>
                </Button>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-6">
                <div className="text-3xl mb-3">2️⃣</div>
                <div className="font-semibold text-foreground mb-2">Open Dashboard</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Access the control plane dashboard to configure safety settings and monitor agent activity.
                </div>
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href="/dashboard">Go to Dashboard →</Link>
                </Button>
              </div>
              <div className="glass-subtle rounded-xl border border-border/40 p-6">
                <div className="text-3xl mb-3">3️⃣</div>
                <div className="font-semibold text-foreground mb-2">Configure & Monitor</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Set allowed domains, agent modes, and safety boundaries. Monitor tasks and extension status.
                </div>
                <Button asChild variant="outline" size="sm" className="bg-transparent">
                  <Link href="/dashboard/safety-permissions">Configure Safety →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-10">
          <div className="glass-strong rounded-2xl border border-border/50 p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Install the Chrome extension and start monitoring your AI agents in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base px-8 py-6">
                <Link href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  Install Chrome Extension
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-base px-8 py-6">
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
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
                  <Link href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Install Extension
                  </Link>
                </div>
                <div>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
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
              <div className="text-foreground font-semibold mb-2">Open Source</div>
              <p className="text-sm text-muted-foreground mb-3">
                Glazyr is open source and MIT licensed. Contribute on GitHub.
              </p>
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href="https://github.com/mcpmessenger/glazyr" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
          <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Glazyr. Open source, MIT licensed.
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="sm">
                <Link href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                  Install Extension
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
