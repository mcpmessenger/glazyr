"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavItem = { href: string; label: string }

const operatorNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
  { href: "/status", label: "Status" },
]

const investorNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/market", label: "Market" },
  { href: "/pricing", label: "Pricing" },
  { href: "/investors", label: "Investors" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="glass rounded-2xl border border-border/50 px-4 py-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Glazyr home">
            <Image src="/glazyr-logo.png" alt="Glazyr eye mark" width={36} height={36} priority className="rounded-xl" />
            <div className="leading-tight">
              <div className="text-xs text-muted-foreground">Glazyr</div>
              <div className="text-sm font-semibold">Mission Control</div>
            </div>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="h-9">
              <Link href="/login">Sign in</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Wrapped nav (container-width aware, not viewport-width) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {operatorNav.map((item) => (
              <Button
                key={item.href}
                asChild
                size="sm"
                variant={isActive(pathname, item.href) ? "secondary" : "ghost"}
                className={cn(isActive(pathname, item.href) ? "" : "text-muted-foreground")}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>

          <div className="h-6 w-px bg-border/70 mx-1" />

          <div className="flex flex-wrap items-center gap-2">
            {investorNav.map((item) => (
              <Button
                key={item.href}
                asChild
                size="sm"
                variant={isActive(pathname, item.href) ? "secondary" : "ghost"}
                className={cn(isActive(pathname, item.href) ? "" : "text-muted-foreground")}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

