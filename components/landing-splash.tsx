"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  /** sessionStorage key controlling whether splash shows */
  storageKey?: string
}

export function LandingSplash({ storageKey = "glazyr:splash-dismissed" }: Props) {
  const [visible, setVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

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

  // Fallback: if autoplay is blocked or metadata never loads, don't trap the user.
  useEffect(() => {
    if (!visible) return
    const id = window.setTimeout(() => dismiss(), 6000)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const v = videoRef.current
    if (!v) return
    // Best-effort: restart from beginning and try play.
    try {
      v.currentTime = 0
    } catch {
      // ignore
    }
    void v.play().catch(() => {
      // Autoplay blocked: fallback timer will dismiss.
    })
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
    <div className="fixed inset-0 z-50 bg-background" onClick={dismiss}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-contain sm:object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={dismiss}
      >
        <source src="/splash-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
        <source src="/splash-desktop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/15" />
    </div>
  )
}

