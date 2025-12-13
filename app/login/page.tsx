"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"

type AuthState = { email: string; isGuest?: boolean } | null

export default function LoginPage() {
  const router = useRouter()
  const [auth, setAuth] = useLocalStorageState<AuthState>("glazyr-auth", null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const canSubmit = useMemo(() => email.trim().length > 3 && password.trim().length > 0, [email, password])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setAuth({ email: email.trim(), isGuest: false })
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-10 max-w-xl">
        <header className="flex items-center justify-between mb-6">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <ThemeToggle />
        </header>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Control-plane access (UI-only demo auth).</CardDescription>
          </CardHeader>
          <CardContent>
            {auth ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Signed in as <span className="text-foreground font-medium">{auth.email}</span>
                  {auth.isGuest ? <span className="ml-2 text-xs">(guest)</span> : null}
                </p>
                <div className="flex flex-col gap-3">
                  <Button onClick={() => router.push("/dashboard")}>Go to dashboard</Button>
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setAuth(null)
                      setEmail("")
                      setPassword("")
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    className="w-full rounded-md border border-border/50 bg-background/40 px-3 py-2 text-sm outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" disabled={!canSubmit} className="w-full">
                  Sign in
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setAuth({ email: "guest@local", isGuest: true })
                    router.push("/dashboard")
                  }}
                  aria-label="Continue as guest"
                >
                  Continue as guest
                </Button>
                <p className="text-xs text-muted-foreground">
                  This is a frontend-only placeholder. Wire to your auth service later.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

