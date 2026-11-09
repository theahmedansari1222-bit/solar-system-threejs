"use client"

import { useRef, MutableRefObject, useState, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Texture, TextureLoader, Mesh, Group, Vector3, Color } from "three"
import { PlanetData } from "@/data/planets"
import { getTexturePath } from "@/lib/asset-path"

type PlanetProps = {
  data: PlanetData
  speedMultiplier: number
  paused: boolean
  isSelected: boolean
  isCompareSelected: boolean
  onSelect: (name: string) => void
  positionRef?: MutableRefObject<Vector3>
  children?: React.ReactNode
}

function SaturnRing() {
  const [ringError, setRingError] = useState(false)
  const ringTexture = useLoader(TextureLoader, getTexturePath("2k_saturn_ring_alpha.png"))

  useEffect(() => {
    if (ringTexture) {
      ringTexture.colorSpace = "srgb"
    }
  }, [ringTexture])

  return (
    <mesh rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[1.2, 2.0, 64]} />
      <meshStandardMaterial
        map={ringError ? null : ringTexture}
        transparent
        opacity={0.8}
        side={2}
      />
    </mesh>
  )
}

export function Planet({
  data,
  speedMultiplier,
  paused,
  isSelected,
  isCompareSelected,
  onSelect,
  positionRef,
  children,
}: PlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const [textureError, setTextureError] = useState(false)
  const fallbackColor = new Color(data.color)

  const texture = useLoader(TextureLoader, getTexturePath(data.texture))

  useEffect(() => {
    if (texture) {
      texture.colorSpace = "srgb"
    }
  }, [texture])

  useFrame((_, delta) => {
    if (paused) return

    angleRef.current += delta * data.orbitSpeed * speedMultiplier * 0.3
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * data.orbitRadius
      groupRef.current.position.z = Math.sin(angleRef.current) * data.orbitRadius

      if (positionRef) {
        positionRef.current.copy(groupRef.current.position)
      }
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * data.rotationSpeed * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(data.name)
        }}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          map={textureError ? null : texture}
          color={textureError ? fallbackColor : "#ffffff"}
        />
      </mesh>
      {data.name === "Saturn" && <SaturnRing />}
      {isCompareSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius + 0.15, data.radius + 0.25, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} side={2} />
        </mesh>
      )}
      {children}
    </group>
  )
}
