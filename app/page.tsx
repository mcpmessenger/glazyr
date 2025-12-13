import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-start gap-4">
            <div className="glass-subtle rounded-2xl p-2 border border-border/40">
              <Image src="/glazyr-logo.png" alt="Glazyr logo" width={56} height={56} priority className="rounded-xl" />
            </div>
            <div>
            <p className="text-sm text-muted-foreground">Glazyr</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">Web Control Plane</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
              Configure agent behavior, safety boundaries, and view outcomes. This site does not execute actions.
            </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Get started</CardTitle>
              <CardDescription>Install the extension, then sign in to configure behavior.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/install-extension">Install Extension</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Learn</CardTitle>
              <CardDescription>Understand how Glazyr works and what data is used.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/how-it-works">How it works</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/privacy-security">Privacy & security</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-xs text-muted-foreground">
          Mission control, not the cockpit. Outcomes over reasoning. Configuration over interaction.
        </footer>
      </div>
    </main>
  )
}
