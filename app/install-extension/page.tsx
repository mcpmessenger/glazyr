import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InstallExtensionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Install extension</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Install the Glazyr browser extension, then return to the dashboard to confirm connection and permissions.
            </p>
            <p>
              The extension is the execution surface: it can enforce the safety policy you set here (allowed domains, agent mode, kill switch)
              and reports status back to the control plane.
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open your browser’s extension manager.</li>
              <li>Install / load the Glazyr extension.</li>
              <li>Grant required permissions.</li>
              <li>Go to <span className="text-foreground font-medium">Dashboard → Extension status</span>.</li>
            </ol>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/dashboard/extension-status">Extension status</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/privacy-policy">Privacy policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

