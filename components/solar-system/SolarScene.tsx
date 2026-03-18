"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Vector3 } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Sun } from "./Sun"
import { Planet } from "./Planet"
import { Moon } from "./Moon"
import { OrbitRing } from "./OrbitRing"
import { PLANETS } from "@/data/planets"

const DEFAULT_CAMERA_POS = new Vector3(0, 20, 25)
const LERP_SPEED = 0.03

type CameraControllerProps = {
  focusedPlanet: string | null
  earthPositionRef: React.MutableRefObject<Vector3>
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>
}

function CameraController({
  focusedPlanet,
  earthPositionRef,
  controlsRef,
}: CameraControllerProps) {
  const { camera } = useThree()
  const targetCamPos = useRef(new Vector3())
  const targetLookAt = useRef(new Vector3())

  useFrame(() => {
    if (focusedPlanet === "Earth") {
      const ep = earthPositionRef.current
      targetCamPos.current.set(ep.x + 0.8, ep.y + 0.6, ep.z + 1.5)
      targetLookAt.current.copy(ep)
    } else {
      targetCamPos.current.copy(DEFAULT_CAMERA_POS)
      targetLookAt.current.set(0, 0, 0)
    }

    camera.position.lerp(targetCamPos.current, LERP_SPEED)

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, LERP_SPEED)
      controlsRef.current.update()
    }
  })

  return null
}

type SolarSceneProps = {
  selectedPlanet: string | null
  onSelectPlanet: (name: string | null) => void
  speedMultiplier: number
  paused: boolean
  showOrbits: boolean
  comparePlanets: string[]
  focusedPlanet: string | null
}

function SceneContent({
  selectedPlanet,
  onSelectPlanet,
  speedMultiplier,
  paused,
  showOrbits,
  comparePlanets,
  focusedPlanet,
}: SolarSceneProps) {
  const earthPositionRef = useRef(new Vector3(7, 0, 0))
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const isFocused = focusedPlanet !== null

  return (
    <>
      <ambientLight intensity={isFocused ? 0.05 : 0.15} />
      <Stars radius={300} depth={60} count={5000} factor={4} fade speed={0.5} />
      <Sun />
      {PLANETS.map((planet) => (
        <group key={planet.name}>
          <OrbitRing
            radius={planet.orbitRadius}
            color={planet.color}
            visible={showOrbits}
          />
          <Planet
            data={planet}
            speedMultiplier={speedMultiplier}
            paused={paused}
            isSelected={selectedPlanet === planet.name}
            isCompareSelected={comparePlanets.includes(planet.name)}
            onSelect={onSelectPlanet}
            positionRef={planet.name === "Earth" ? earthPositionRef : undefined}
          >
            {planet.name === "Earth" && (
              <Moon
                speedMultiplier={speedMultiplier}
                paused={paused}
                isSelected={selectedPlanet === "Moon"}
                onSelect={onSelectPlanet}
              />
            )}
          </Planet>
        </group>
      ))}
      <CameraController
        focusedPlanet={focusedPlanet}
        earthPositionRef={earthPositionRef}
        controlsRef={controlsRef}
      />
      <OrbitControls
        ref={controlsRef}
        enablePan={!isFocused}
        enableZoom
        enableRotate
        minDistance={isFocused ? 1 : 5}
        maxDistance={isFocused ? 5 : 60}
      />
    </>
  )
}

export function SolarScene(props: SolarSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 20, 25], fov: 60 }}
      onPointerMissed={() => props.onSelectPlanet(null)}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  )
}
