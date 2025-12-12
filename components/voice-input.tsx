"use client"

import { Button } from "@/components/ui/button"
import { Mic, Square, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VoiceInputProps {
  onStart: () => void
  onEnd: (transcript: string) => void
  isListening: boolean
  isSupported: boolean
  currentTranscript?: string
}

export function VoiceInput({ onStart, onEnd, isListening, isSupported, currentTranscript }: VoiceInputProps) {
  const handleClick = () => {
    if (isListening) {
      onEnd(currentTranscript || "")
    } else {
      onStart()
    }
  }

  if (!isSupported) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Button
        size="lg"
        onClick={handleClick}
        className={`h-32 w-32 rounded-full transition-all duration-300 ${
          isListening ? "bg-destructive hover:bg-destructive/90 animate-pulse" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isListening ? <Square className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
      </Button>
      <p className="mt-6 text-sm text-muted-foreground">
        {isListening ? "Listening... Click to stop" : "Click to start voice command"}
      </p>

      {isListening && currentTranscript && (
        <div className="mt-4 p-4 glass-subtle rounded-lg max-w-md">
          <p className="text-sm text-muted-foreground mb-1">You said:</p>
          <p className="text-foreground leading-relaxed">{currentTranscript}</p>
        </div>
      )}
    </div>
  )
}
