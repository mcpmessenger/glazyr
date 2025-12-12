"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload } from "lucide-react"

interface ScreenshotDisplayProps {
  screenshot: string | null
}

export function ScreenshotDisplay({ screenshot }: ScreenshotDisplayProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(screenshot)

  useEffect(() => {
    setPreviewUrl(screenshot)
  }, [screenshot])

  const handleCapture = () => {
    // Simulate screenshot capture
    setPreviewUrl("/computer-screen-with-application.jpg")
  }

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50">
          <img src={previewUrl || "/placeholder.svg"} alt="Screenshot preview" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2">
            <Button size="sm" variant="secondary" onClick={handleCapture} className="glass">
              <Camera className="w-4 h-4 mr-2" />
              Recapture
            </Button>
          </div>
        </div>
      ) : (
        <div className="aspect-video rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-4 bg-muted/30">
          <div className="p-4 rounded-full bg-accent/10">
            <Upload className="w-8 h-8 text-accent" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground mb-1">No screenshot yet</p>
            <p className="text-xs text-muted-foreground">Capture will happen automatically with voice command</p>
          </div>
          <Button onClick={handleCapture} variant="outline" size="sm" className="glass bg-transparent">
            <Camera className="w-4 h-4 mr-2" />
            Capture Now
          </Button>
        </div>
      )}
    </div>
  )
}
