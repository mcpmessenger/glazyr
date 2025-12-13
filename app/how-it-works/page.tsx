import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
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
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The website is mission control: it configures behavior, defines safety boundaries, and displays outcomes and
              summaries. It does not execute automation.
            </p>
            <p>
              Execution is owned by the orchestrator + extension. This separation keeps the UI calm, predictable, and
              safe.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

