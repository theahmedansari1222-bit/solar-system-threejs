"use client"

import { useState, useCallback, useRef, Suspense } from "react"
import { SolarScene } from "@/components/solar-system/SolarScene"
import { InfoPanel } from "@/components/ui/InfoPanel"
import { ComparePanel } from "@/components/ui/ComparePanel"
import { ControlBar } from "@/components/ui/ControlBar"
import { LoadingScreen } from "@/components/ui/LoadingScreen"

export default function SolarSystemPage() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [paused, setPaused] = useState(false)
  const [showOrbits, setShowOrbits] = useState(true)
  const [compareMode, setCompareMode] = useState(false)
  const [comparePlanets, setComparePlanets] = useState<string[]>([])
  const [focusedPlanet, setFocusedPlanet] = useState<string | null>(null)
  const wasPausedBeforeFocus = useRef(false)

  const handleToggleCompare = useCallback(() => {
    setCompareMode((prev) => {
      if (prev) {
        setComparePlanets([])
      }
      setSelectedPlanet(null)
      return !prev
    })
  }, [])

  const handleSelectPlanet = useCallback(
    (name: string | null) => {
      if (!compareMode) {
        setSelectedPlanet(name)
        return
      }

      if (name === null) return

      setComparePlanets((prev) => {
        if (prev.includes(name)) {
          return prev.filter((p) => p !== name)
        }
        if (prev.length < 2) {
          return [...prev, name]
        }
        return [prev[1], name]
      })
    },
    [compareMode]
  )

  const handleFocusEarth = useCallback(() => {
    wasPausedBeforeFocus.current = paused
    setPaused(true)
    setFocusedPlanet("Earth")
  }, [paused])

  const handleUnfocus = useCallback(() => {
    setFocusedPlanet(null)
    setPaused(wasPausedBeforeFocus.current)
  }, [])

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black">
      <h1 className="absolute top-4 left-4 z-10 text-lg font-bold text-white/80">
        Solar System
      </h1>

      {compareMode && (
        <p className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-violet-500/20 px-3 py-1 text-xs text-violet-300 backdrop-blur-md">
          Select 2 planets to compare ({comparePlanets.length}/2)
        </p>
      )}

      <Suspense fallback={<LoadingScreen />}>
        <SolarScene
          selectedPlanet={selectedPlanet}
          onSelectPlanet={handleSelectPlanet}
          speedMultiplier={speedMultiplier}
          paused={paused}
          showOrbits={showOrbits}
          comparePlanets={comparePlanets}
          focusedPlanet={focusedPlanet}
        />
      </Suspense>

      {focusedPlanet && (
        <button
          onClick={handleUnfocus}
          className="absolute top-4 right-4 z-10 rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 active:bg-white/20"
        >
          Back
        </button>
      )}

      {focusedPlanet && (
        <div className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-black/70 px-4 py-2 text-center text-xs text-white/60 backdrop-blur-md border border-white/10">
          Viewing Earth&apos;s day/night side — rotate the camera to explore
        </div>
      )}

      {!compareMode && selectedPlanet && !focusedPlanet && (
        <InfoPanel
          planetName={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
          onFocus={selectedPlanet === "Earth" ? handleFocusEarth : undefined}
        />
      )}

      {compareMode && comparePlanets.length === 2 && (
        <ComparePanel
          planetNames={comparePlanets as [string, string]}
          onClose={() => setComparePlanets([])}
        />
      )}

      {!focusedPlanet && (
        <ControlBar
          speedMultiplier={speedMultiplier}
          onSpeedChange={setSpeedMultiplier}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
          showOrbits={showOrbits}
          onToggleOrbits={() => setShowOrbits((s) => !s)}
          compareMode={compareMode}
          onToggleCompare={handleToggleCompare}
        />
      )}
    </div>
  )
}
