import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <video
        className="absolute inset-0 h-full w-full object-contain sm:object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/splash-mobile.mp4" type="video/mp4" media="(max-width: 640px)" />
        <source src="/splash-desktop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/45 backdrop-blur-[1px]" />

      <div className="relative h-full w-full flex items-center justify-center px-6">
        <div className="glass-strong rounded-2xl border border-border/50 p-6 flex items-center gap-4">
          <Image src="/glazyr-logo.png" alt="Glazyr logo" width={40} height={40} className="rounded-xl" priority />
          <div>
            <div className="text-sm text-muted-foreground">Glazyr</div>
            <div className="text-base font-medium text-foreground">Loading…</div>
          </div>
        </div>
      </div>
    </div>
  )
}

