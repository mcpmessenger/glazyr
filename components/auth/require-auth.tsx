"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { auth, loading, continueAsGuest } = useAuth()

  if (loading) {
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
              onClick={() => void continueAsGuest()}
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

