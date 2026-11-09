"use client"

import { useRef, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Texture, TextureLoader, Mesh, Color } from "three"
import { SUN_DATA } from "@/data/planets"
import { getTexturePath } from "@/lib/asset-path"
import { useState } from "react"

export function Sun() {
  const meshRef = useRef<Mesh>(null)
  const [textureError, setTextureError] = useState(false)
  const fallbackColor = new Color("#ffcc00")

  const texture = useLoader(TextureLoader, getTexturePath(SUN_DATA.texture))

  useEffect(() => {
    if (texture) {
      texture.colorSpace = "srgb"
    }
  }, [texture])

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
          map={textureError ? null : texture}
          color={textureError ? fallbackColor : "#ffffff"}
          emissive="#ff6600"
          emissiveIntensity={0.8}
          emissiveMap={textureError ? null : texture}
        />
      </mesh>
    </group>
  )
}
