"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

export default function AccountPage() {
  const router = useRouter()
  const { auth, loading, signOut } = useAuth()

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground mt-1">Authentication & account settings.</p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Signed in</CardTitle>
          <CardDescription>Account information and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Email:</span>{" "}
            <span className="font-medium text-foreground">{loading ? "…" : auth?.email || "—"}</span>
            {!loading && auth?.isGuest ? <span className="ml-2 text-xs text-muted-foreground">(guest)</span> : null}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {!loading && auth?.isGuest ? (
              <Button onClick={() => router.push("/login")}>Sign in</Button>
            ) : null}
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => {
                void signOut().then(() => router.push("/"))
              }}
              disabled={loading}
            >
              Sign out
            </Button>
            <Button asChild variant="ghost">
              <Link href="/privacy-policy">Privacy policy</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

