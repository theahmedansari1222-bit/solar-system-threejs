"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader, Mesh } from "three"
import { SUN_DATA } from "@/data/planets"
import { getTexturePath } from "@/lib/asset-path"

export function Sun() {
  const meshRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, getTexturePath(SUN_DATA.texture))

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group>
      <pointLight intensity={2} distance={100} decay={0.1} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_DATA.radius, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff6600"
          emissiveIntensity={0.8}
          emissiveMap={texture}
        />
      </mesh>
    </group>
  )
}
