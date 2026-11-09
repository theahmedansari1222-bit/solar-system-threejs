"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Vector3, AmbientLight as ThreeAmbientLight, PointLight as ThreePointLight } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Sun } from "./Sun"
import { Planet } from "./Planet"
import { Moon } from "./Moon"
import { OrbitRing } from "./OrbitRing"
import { PLANETS } from "@/data/planets"
import { ErrorBoundary } from "./ErrorBoundary"

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
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const earthPositionRef = useRef(new Vector3())
  const { size, viewport } = useThree()
  const isFocused = focusedPlanet === "Earth"

  // Add ambient light so planets are visible even without direct sunlight
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} distance={100} decay={0.1} />
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

function CanvasFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px",
      }}
      role="status"
      aria-label="Loading solar system"
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "4px solid #333",
            borderTopColor: "#fff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 12px",
          }}
        />
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <p>Loading Solar System…</p>
        <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
          Initializing WebGL…
        </p>
      </div>
    </div>
  )
}

function CanvasErrorFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
        textAlign: "center",
      }}
      role="alert"
    >
      <div>
        <h2 style={{ margin: "0 0 12px", fontSize: "18px" }}>
          Unable to load 3D scene
        </h2>
        <p style={{ margin: "0 0 16px", color: "#aaa", fontSize: "14px" }}>
          WebGL may not be supported or the textures failed to load.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            background: "#4488ff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

export function SolarScene(props: SolarSceneProps) {
  return (
    <ErrorBoundary fallback={<CanvasErrorFallback />}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        aria-label="Interactive 3D Solar System"
      >
        <Canvas
          camera={{ position: [0, 20, 25], fov: 60 }}
          onPointerMissed={() => props.onSelectPlanet(null)}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <Suspense fallback={<CanvasFallback />}>
            <SceneContent {...props} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  )
}
