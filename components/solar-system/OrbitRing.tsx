"use client"

import { useMemo } from "react"
import { Line } from "@react-three/drei"
import { Vector3 } from "three"

type OrbitRingProps = {
  radius: number
  color: string
  visible: boolean
}

export function OrbitRing({ radius, color, visible }: OrbitRingProps) {
  const points = useMemo(() => {
    const pts: Vector3[] = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius])

  if (!visible) return null

  return <Line points={points} color={color} lineWidth={0.5} opacity={0.3} transparent />
}
