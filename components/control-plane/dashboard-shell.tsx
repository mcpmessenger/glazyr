"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/agent-modes", label: "Agent modes" },
  { href: "/dashboard/safety-permissions", label: "Safety & permissions" },
  { href: "/dashboard/task-history", label: "Task history" },
  { href: "/dashboard/extension-status", label: "Extension status" },
  { href: "/dashboard/account", label: "Account" },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen glazyr-backlight bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="glass-subtle rounded-2xl p-2 border border-border/40 hover:border-border/70 transition-colors"
              aria-label="Glazyr home"
            >
              <Image src="/glazyr-logo.png" alt="Glazyr eye mark" width={40} height={40} priority className="rounded-xl" />
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">Glazyr</p>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <aside className="glass rounded-xl border border-border/50 p-3">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition-colors",
                      active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </aside>

          <section>{children}</section>
        </div>
      </div>
    </div>
  )
}

