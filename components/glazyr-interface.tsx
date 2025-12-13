"use client"

import { Card } from "@/components/ui/card"
import { Mic, MicOff, Eye, Cpu, Zap } from "lucide-react"
import { VoiceInput } from "@/components/voice-input"
import { ScreenshotDisplay } from "@/components/screenshot-display"
import { AgentStatus } from "@/components/agent-status"
import { ActionLog } from "@/components/action-log"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useOrchestrator } from "@/hooks/use-orchestrator"
import { useState } from "react"

export function GlazyrInterface() {
  const [finalTranscript, setFinalTranscript] = useState("")
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition()
  const { agentState, actionLogs, screenshot, processCommand } = useOrchestrator()

  const handleVoiceStart = () => {
    startListening()
  }

  const handleVoiceEnd = (text: string) => {
    stopListening()
    setFinalTranscript(text)

    if (text.trim()) {
      processCommand(text)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <header className="text-center mb-12 relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-gradient leading-tight">Glazyr</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Vision-first AI automation. See → Understand → Act.
        </p>
      </header>

      {/* Main Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Voice & Screenshot */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Input Card */}
          <Card className="glass p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${isListening ? "bg-primary/20" : "bg-muted"}`}>
                  {isListening ? (
                    <Mic className="w-6 h-6 text-primary" />
                  ) : (
                    <MicOff className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Voice Command</h2>
                  <p className="text-sm text-muted-foreground">Speak naturally to guide Glazyr</p>
                </div>
              </div>
            </div>
            <VoiceInput
              onStart={handleVoiceStart}
              onEnd={handleVoiceEnd}
              isListening={isListening}
              isSupported={isSupported}
              currentTranscript={transcript}
            />
            {finalTranscript && (
              <div className="mt-6 p-4 glass-subtle rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last command:</p>
                <p className="text-foreground leading-relaxed">{finalTranscript}</p>
              </div>
            )}
          </Card>

          {/* Screenshot Display Card */}
          <Card className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/20">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Visual Context</h2>
                <p className="text-sm text-muted-foreground">What Glazyr sees</p>
              </div>
            </div>
            <ScreenshotDisplay screenshot={screenshot} />
          </Card>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          {/* Agent Status Card */}
          <Card className="glass-strong p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/20">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Agent Status</h2>
                <p className="text-sm text-muted-foreground">Current state</p>
              </div>
            </div>
            <AgentStatus state={agentState} />
          </Card>

          {/* Action Log Card */}
          <Card className="glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/20">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Action Log</h2>
                <p className="text-sm text-muted-foreground">Recent activity</p>
              </div>
            </div>
            <ActionLog logs={actionLogs} />
          </Card>
        </div>
      </div>
    </div>
  )
}
