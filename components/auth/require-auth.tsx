"use client"

import Link from "next/link"
import { useLocalStorageState } from "@/hooks/use-local-storage-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type AuthState = { email: string; isGuest?: boolean } | null

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [auth, setAuth, mounted] = useLocalStorageState<AuthState>("glazyr-auth", null)

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Loading…</CardTitle>
            <CardDescription>Preparing your dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!auth) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Continue</CardTitle>
            <CardDescription>Sign in, or use a guest session (local only).</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setAuth({ email: "guest@local", isGuest: true })}
              aria-label="Continue as guest"
            >
              Continue as guest
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

