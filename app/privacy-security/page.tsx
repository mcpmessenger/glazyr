import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacySecurityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <header className="flex items-center justify-between mb-8">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <ThemeToggle />
        </header>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Privacy & security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The control plane focuses on configuration and outcomes. It does not show screenshots, model reasoning, or
              internal traces.
            </p>
            <p>
              Use “Safety & permissions” to set allowed domains, disallowed actions, human-in-the-loop thresholds, and
              budgets.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

