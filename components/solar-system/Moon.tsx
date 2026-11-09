"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader, Mesh, Group } from "three"
import { MOON_DATA } from "@/data/planets"
import { getTexturePath } from "@/lib/asset-path"

type MoonProps = {
  speedMultiplier: number
  paused: boolean
  isSelected: boolean
  onSelect: (name: string) => void
}

export function Moon({ speedMultiplier, paused, isSelected, onSelect }: MoonProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const texture = useLoader(TextureLoader, getTexturePath(MOON_DATA.texture))

  useFrame((_, delta) => {
    if (paused) return

    angleRef.current += delta * MOON_DATA.orbitSpeed * speedMultiplier * 0.3
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * MOON_DATA.orbitRadius
      groupRef.current.position.z = Math.sin(angleRef.current) * MOON_DATA.orbitRadius
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * MOON_DATA.rotationSpeed * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(MOON_DATA.name)
        }}
      >
        <sphereGeometry args={[MOON_DATA.radius, 16, 16]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  )
}
