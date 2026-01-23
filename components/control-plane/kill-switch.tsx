"use client"

import { useState } from "react"
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function KillSwitch() {
    const [enabled, setEnabled] = useState(true)

    return (
        <Card className={`glass-strong transition-all duration-300 ${enabled ? 'border-primary/20' : 'border-destructive/50'}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            Governance Override
                            {enabled ? <ShieldCheck className="h-5 w-5 text-green-500" /> : <ShieldAlert className="h-5 w-5 text-destructive" />}
                        </CardTitle>
                        <CardDescription>
                            Manual intervention for autonomous agents
                        </CardDescription>
                    </div>
                    <Switch
                        checked={enabled}
                        onCheckedChange={setEnabled}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-destructive"
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="rounded-lg bg-card/50 p-3 text-sm border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Recent Interventions</span>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center text-xs">
                            <span className="text-red-400">Blocked: *.mil access</span>
                            <span className="text-muted-foreground">10:42 AM</span>
                        </li>
                        <li className="flex justify-between items-center text-xs">
                            <span className="text-orange-400">Warn: High Budget Usage</span>
                            <span className="text-muted-foreground">09:15 AM</span>
                        </li>
                    </ul>
                </div>
                <Button variant={enabled ? "outline" : "destructive"} className="w-full">
                    {enabled ? "System Normal" : "EMERGENCY SHUTDOWN ACTIVE"}
                </Button>
            </CardContent>
        </Card>
    )
}
