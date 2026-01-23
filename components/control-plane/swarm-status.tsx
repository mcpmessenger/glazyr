"use client"

import { Activity, Radio, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SwarmStatus() {
    // Mock data - would eventually come from Pulsar websocket
    const activeSwarms = 3
    const agentsOnline = 12
    const status = "operational"

    return (
        <Card className="glass-strong">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Swarm Network
                </CardTitle>
                <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{activeSwarms} Active Swarms</div>
                <p className="text-xs text-muted-foreground">
                    {agentsOnline} agents interconnected
                </p>
                <div className="mt-4 flex gap-2">
                    <Badge variant="outline" className="flex gap-1 bg-primary/10 text-primary border-primary/20">
                        <Radio className="h-3 w-3" /> Pulsar Connected
                    </Badge>
                    <Badge variant="outline" className="flex gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                        <Cpu className="h-3 w-3" /> Neural Cortex OK
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}
