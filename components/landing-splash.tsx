"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  /** sessionStorage key controlling whether splash shows */
  storageKey?: string
}

export function LandingSplash({ storageKey = "glazyr:splash-dismissed" }: Props) {
  const [visible, setVisible] = useState(false)

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(storageKey) === "1"
      setVisible(!dismissed && !reducedMotion)
    } catch {
      setVisible(!reducedMotion)
    }
  }, [reducedMotion, storageKey])

  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  function dismiss() {
    try {
      sessionStorage.setItem(storageKey, "1")
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/splash.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-background/35 backdrop-blur-[1px]" />

      <div className="relative h-full w-full">
        <div className="container mx-auto max-w-6xl px-4 py-8 h-full flex items-end md:items-center">
          <div className="glass-strong rounded-2xl border border-border/50 p-6 md:p-8 max-w-xl">
            <div className="text-sm text-muted-foreground">Glazyr</div>
            <div className="mt-1 text-3xl md:text-4xl font-bold text-gradient leading-tight">Mission control</div>
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Configure safety boundaries and monitor outcomes. Execution stays in the extension + runtime.
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto" onClick={dismiss}>
                Enter
              </Button>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent" onClick={dismiss}>
                Skip
              </Button>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Tip: press Esc to skip.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

