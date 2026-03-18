"use client"

import { PLANETS, MOON_DATA, PlanetData } from "@/data/planets"

type ComparePanelProps = {
  planetNames: [string, string]
  onClose: () => void
}

function findPlanet(name: string): PlanetData | undefined {
  if (name === "Moon") return MOON_DATA
  return PLANETS.find((p) => p.name === name)
}

function parseNumeric(value: string): number | null {
  const cleaned = value.replace(/,/g, "")
  const match = cleaned.match(/^-?[\d.]+/)
  return match ? parseFloat(match[0]) : null
}

type CompareRow = {
  label: string
  key: keyof PlanetData["info"]
  numeric?: boolean
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "Diameter", key: "diameter", numeric: true },
  { label: "Distance", key: "distance", numeric: true },
  { label: "Temperature", key: "temperature" },
  { label: "Moons", key: "moons", numeric: true },
  { label: "Day length", key: "dayLength", numeric: true },
  { label: "Year length", key: "yearLength", numeric: true },
]

export function ComparePanel({ planetNames, onClose }: ComparePanelProps) {
  const planetA = findPlanet(planetNames[0])
  const planetB = findPlanet(planetNames[1])

  if (!planetA || !planetB) return null

  return (
    <div className="absolute top-14 left-4 right-4 z-10 mx-auto max-w-lg rounded-xl border border-white/10 bg-black/70 p-4 text-white backdrop-blur-md sm:left-auto sm:right-4 sm:max-w-md">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold">Compare Planets</h2>
        <button
          onClick={onClose}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-lg text-white/50 hover:bg-white/10 hover:text-white active:bg-white/20"
          aria-label="Close compare panel"
        >
          ✕
        </button>
      </div>

      {/* Column headers */}
      <div className="mb-2 grid grid-cols-3 gap-2 text-center">
        <div className="text-xs text-white/40" />
        <div className="text-sm font-semibold text-violet-300">
          {planetA.name}
        </div>
        <div className="text-sm font-semibold text-violet-300">
          {planetB.name}
        </div>
      </div>

      {/* Comparison rows */}
      <div className="space-y-0">
        {COMPARE_ROWS.map((row) => {
          const valA =
            row.key === "moons"
              ? String(planetA.info.moons)
              : planetA.info[row.key]
          const valB =
            row.key === "moons"
              ? String(planetB.info.moons)
              : planetB.info[row.key]

          let highlightA = false
          let highlightB = false

          if (row.numeric) {
            const numA =
              row.key === "moons"
                ? planetA.info.moons
                : parseNumeric(String(planetA.info[row.key]))
            const numB =
              row.key === "moons"
                ? planetB.info.moons
                : parseNumeric(String(planetB.info[row.key]))
            if (numA !== null && numB !== null) {
              if (numA > numB) highlightA = true
              else if (numB > numA) highlightB = true
            }
          }

          return (
            <div
              key={row.key}
              className="grid grid-cols-3 gap-2 border-t border-white/5 py-1.5 text-center"
            >
              <div className="flex items-center text-left text-xs text-white/50">
                {row.label}
              </div>
              <div
                className={`text-xs ${
                  highlightA
                    ? "font-semibold text-green-300"
                    : "text-white/80"
                }`}
              >
                {valA}
              </div>
              <div
                className={`text-xs ${
                  highlightB
                    ? "font-semibold text-green-300"
                    : "text-white/80"
                }`}
              >
                {valB}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-center text-xs text-white/30">
        Select other planets to change the comparison
      </p>
    </div>
  )
}
