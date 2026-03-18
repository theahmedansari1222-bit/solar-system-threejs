"use client"

type ControlBarProps = {
  speedMultiplier: number
  onSpeedChange: (speed: number) => void
  paused: boolean
  onTogglePause: () => void
  showOrbits: boolean
  onToggleOrbits: () => void
  compareMode: boolean
  onToggleCompare: () => void
}

export function ControlBar({
  speedMultiplier,
  onSpeedChange,
  paused,
  onTogglePause,
  showOrbits,
  onToggleOrbits,
  compareMode,
  onToggleCompare,
}: ControlBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-2 border-t border-white/10 bg-black/70 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pt-3">
      {/* Speed controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePause}
          className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg bg-white/10 text-base text-white hover:bg-white/20 active:bg-white/30 sm:min-h-[44px] sm:min-w-[44px]"
        >
          {paused ? "\u25B6" : "\u23F8"}
        </button>

        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={speedMultiplier}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="h-[40px] min-w-0 flex-1 cursor-pointer touch-none sm:h-[44px]"
        />
        <span className="w-10 text-right text-xs text-white sm:w-12 sm:text-sm">
          {speedMultiplier.toFixed(1)}x
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleOrbits}
          className={`flex min-h-[36px] flex-1 items-center justify-center rounded-lg px-2 text-xs sm:min-h-[44px] sm:flex-none sm:px-3 sm:text-sm ${
            showOrbits
              ? "bg-blue-500/30 text-blue-300"
              : "bg-white/10 text-white/50"
          } hover:bg-white/20 active:bg-white/30`}
        >
          Orbits
        </button>

        <button
          onClick={onToggleCompare}
          className={`flex min-h-[36px] flex-1 items-center justify-center rounded-lg px-2 text-xs sm:min-h-[44px] sm:flex-none sm:px-3 sm:text-sm ${
            compareMode
              ? "bg-violet-500/30 text-violet-300"
              : "bg-white/10 text-white/50"
          } hover:bg-white/20 active:bg-white/30`}
        >
          Compare
        </button>
      </div>
    </div>
  )
}
