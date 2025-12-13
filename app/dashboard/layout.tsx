import type React from "react"
import { RequireAuth } from "@/components/auth/require-auth"
import { DashboardShell } from "@/components/control-plane/dashboard-shell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <DashboardShell>{children}</DashboardShell>
    </RequireAuth>
  )
}

