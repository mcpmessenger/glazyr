import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ArchitectureDiagram from "@/assets/architecture.png"

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
            <p>Execution and orchestration live outside the control plane:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="text-foreground font-medium">Browser extension</span>: senses the page (context/captures),
                enforces policy (allowed domains, kill switch, mode), and performs browser actions.
              </li>
              <li>
                <span className="text-foreground font-medium">Orchestrator / runtime</span>: plans and coordinates tasks
                and applies safety enforcement beyond the UI.
              </li>
              <li>
                <span className="text-foreground font-medium">Control plane (this site)</span>: config + monitoring only
                (no chat UI, no task execution).
              </li>
            </ul>
            <div className="pt-2">
              <div className="text-foreground font-medium mb-2">Architecture diagram</div>
              <div className="glass-subtle rounded-xl border border-border/40 p-3">
                <Image
                  src={ArchitectureDiagram}
                  alt="Glazyr architecture diagram"
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>
            <p>
              The separation keeps the UI calm and predictable while execution stays contained and stoppable (kill
              switch).
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/install-extension">Install Extension</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

