"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Wallet } from "lucide-react"

interface MetricsCardProps {
    type: "vision" | "ucp"
}

export function MetricsCard({ type }: MetricsCardProps) {
    if (type === "vision") {
        return (
            <Card className="glass-subtle">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vision Pipeline</CardTitle>
                    <Eye className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,204</div>
                    <p className="text-xs text-muted-foreground">frame tensors processed</p>
                    <div className="mt-2 h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[65%]" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="glass-subtle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">UCP Wallet</CardTitle>
                <Wallet className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$42.50</div>
                <p className="text-xs text-muted-foreground">available balance</p>
                <div className="mt-2 flex text-xs justify-between text-muted-foreground">
                    <span>Spent: $10.20</span>
                    <span>Limit: $100.00</span>
                </div>
            </CardContent>
        </Card>
    )
}
