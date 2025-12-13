import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Glazyr Extension Privacy Policy",
  description: "Privacy policy for the Glazyr Chrome Extension and Control Plane.",
}

export default function PrivacyPolicyPage() {
  const effectiveDate = "2025-12-13"

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
            <CardTitle>Privacy Policy (Glazyr Chrome Extension)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">Effective date:</span> {effectiveDate}
            </p>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Summary</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The Glazyr extension is a <span className="text-foreground font-medium">vision-first browsing assistant</span>.
                </li>
                <li>
                  The Glazyr website ("Control Plane") is <span className="text-foreground font-medium">mission control</span>: it stores
                  configuration and shows high-level outcomes. It does not orchestrate or execute tasks.
                </li>
                <li>
                  Orchestration/execution occurs in the <span className="text-foreground font-medium">extension + runtime</span>, where safety
                  policy is enforced (allowed domains, kill switch, mode).
                </li>
                <li>
                  We aim to minimize collection and keep users in control. You can engage an <span className="text-foreground font-medium">Emergency Stop</span>
                  at any time.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">What the extension can access</h2>
              <p>
                The extension may run on pages you visit (depending on permissions you grant). It can read limited page context to
                identify UI elements and, when you explicitly invoke it, may capture images (e.g., a screenshot or selected region).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Data the extension may collect or process</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="text-foreground font-medium">Page context</span>: current URL/domain and basic navigation context required
                  for safety checks (e.g., allowed domains).
                </li>
                <li>
                  <span className="text-foreground font-medium">User-initiated captures</span>: screenshots, selected regions, or images you
                  drag-and-drop for analysis.
                </li>
                <li>
                  <span className="text-foreground font-medium">Settings and safety policy</span>: agent mode, kill switch state, allowed domains,
                  disallowed actions.
                </li>
                <li>
                  <span className="text-foreground font-medium">Status telemetry</span>: extension heartbeat, granted permissions, and whether
                  enforcement is enabled.
                </li>
              </ul>
              <p>
                The control plane intentionally displays <span className="text-foreground font-medium">summaries only</span> (no screenshots/traces/reasoning).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">How we use data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide the requested assistive feature (e.g., analyze a user-selected image).</li>
                <li>To enforce safety configuration (allowed domains, budgets, kill switch).</li>
                <li>To show connection status and outcome summaries in the control plane.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">How data is stored</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Extension settings/state are stored using Chrome extension storage (for example, <span className="text-foreground font-medium">chrome.storage.local</span>).
                </li>
                <li>
                  The control plane stores configuration and task summaries via its backend APIs.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Sharing</h2>
              <p>
                We do not sell personal information. If you connect Glazyr to external services, data may be transmitted to those
                services only as required to perform the action you requested.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">User controls</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Use <span className="text-foreground font-medium">Emergency Stop</span> in the control plane dashboard to halt execution.
                </li>
                <li>Limit the extension via allowed domains and disallowed actions.</li>
                <li>Remove the extension at any time via your browser’s extension manager.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-semibold text-foreground">Contact</h2>
              <p>
                For privacy questions, contact: <span className="text-foreground font-medium">greetings@automationalien.com</span>
              </p>
              <p className="text-xs">
                (If you want a different contact email/URL for the Chrome Web Store listing, tell me what it should be and I’ll swap it.)
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/privacy-security">Privacy & security (control plane)</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link href="/install-extension">Install extension</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
