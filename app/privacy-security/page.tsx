import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacySecurityPage() {
  return (
    <main className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <SiteHeader />

        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle>Privacy & security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The control plane focuses on configuration and outcomes. It does not show screenshots, model reasoning, or
              internal traces.
            </p>
            <p>
              Safety enforcement happens in the extension/runtime. The control plane can broadcast policy (agent mode,
              allowed domains, disallowed actions, budgets, kill switch) and shows enforcement signals reported back by
              the extension.
            </p>
            <p>
              Use “Safety & permissions” to set allowed domains, disallowed actions, human-in-the-loop thresholds, and
              budgets.
            </p>
            <p>
              Looking for the Chrome extension privacy policy URL? See{" "}
              <Link className="underline text-foreground" href="/privacy-policy">
                Privacy Policy (extension)
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

