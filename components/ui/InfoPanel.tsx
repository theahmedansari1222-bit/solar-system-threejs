"use client"

import { PLANETS, MOON_DATA, PlanetData } from "@/data/planets"

type InfoPanelProps = {
  planetName: string
  onClose: () => void
  onFocus?: () => void
}

export function InfoPanel({ planetName, onClose, onFocus }: InfoPanelProps) {
  const planet: PlanetData | undefined =
    planetName === "Moon"
      ? MOON_DATA
      : PLANETS.find((p) => p.name === planetName)

  if (!planet) return null

  return (
    <div className="absolute bottom-20 left-4 right-4 z-10 max-w-sm rounded-xl border border-white/10 bg-black/70 p-4 text-white backdrop-blur-md sm:right-auto sm:w-72">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">{planet.name}</h2>
        <button
          onClick={onClose}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-lg text-white/50 hover:bg-white/10 hover:text-white active:bg-white/20"
          aria-label="Close info panel"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1 text-sm text-white/80">
        <p>Diameter: {planet.info.diameter}</p>
        <p>Distance: {planet.info.distance}</p>
        <p>Temperature: {planet.info.temperature}</p>
        <p>Moons: {planet.info.moons}</p>
        <p>Day length: {planet.info.dayLength}</p>
        <p>Year length: {planet.info.yearLength}</p>
      </div>
      <p className="mt-3 border-t border-white/10 pt-2 text-xs text-white/60">
        {planet.info.funFact}
      </p>
      {planetName === "Earth" && onFocus && (
        <button
          onClick={onFocus}
          className="mt-3 w-full rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/30 active:bg-blue-500/40"
        >
          View Day/Night Side
        </button>
      )}
    </div>
  )
}
