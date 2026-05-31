"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function BlackHole() {
  const coreRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.22
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.12
      ringRef.current.rotation.z += delta * 0.18
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshStandardMaterial
          color="#02030a"
          emissive="#111827"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[1.15, 0.25, 0.4]}>
        <torusGeometry args={[1.8, 0.035, 18, 180]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.25}
          roughness={0.12}
          metalness={0.5}
        />
      </mesh>
      <mesh rotation={[1.25, -0.35, -0.2]}>
        <torusGeometry args={[2.28, 0.018, 14, 180]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.75}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}
