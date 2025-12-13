import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "month",
    description: "Explore the mission-control workflow and safety model.",
    bullets: ["Install the extension", "Configure safety boundaries", "View summaries + outcomes"],
    cta: { label: "Install Extension", href: "/install-extension" },
    emphasized: false,
  },
  {
    name: "Team",
    price: "Contact",
    cadence: "",
    description: "For real workflows with governance and monitoring.",
    bullets: ["Policy presets and review flows", "Monitoring + task history insights", "Support for deployment needs"],
    cta: { label: "Sign in", href: "/login" },
    emphasized: true,
  },
  {
    name: "Enterprise",
    price: "Contact",
    cadence: "",
    description: "Security reviews, custom constraints, and dedicated support.",
    bullets: ["Custom safety constraints", "Audit-friendly monitoring outputs", "Priority support + SLAs"],
    cta: { label: "Go to dashboard", href: "/dashboard" },
    emphasized: false,
  },
] as const

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <SiteHeader />

        <div className="glass rounded-xl border border-border/50 p-6 mb-6 mt-6">
          <h1 className="text-3xl font-bold text-gradient">Pricing</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
            Glazyr is mission control for safety-first web automation. Pricing reflects governance, monitoring, and safe
            configuration—not a “chatbot cockpit.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={tier.emphasized ? "glass-strong" : "glass"}>
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between gap-3">
                  <span>{tier.name}</span>
                  <span className="text-lg text-foreground">
                    {tier.price}
                    {tier.cadence ? <span className="text-xs text-muted-foreground">/{tier.cadence}</span> : null}
                  </span>
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  {tier.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={tier.cta.href}>{tier.cta.label}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Need a walkthrough of the trust model? Start with{" "}
          <Link className="underline text-foreground" href="/how-it-works">
            How it works
          </Link>
          .
        </div>
      </div>
    </main>
  )
}

